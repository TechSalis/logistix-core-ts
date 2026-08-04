import { and, asc, eq, inArray, sql, sum } from 'drizzle-orm';
import type { PgDatabase } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';
import { computeAllocationTargets } from '../config/billing.config.js';
import {
  PaymentStatus,
  DeliveryStatus,
  TransactionStatus,
  LedgerAdjustmentType,
} from '../enums/enums.js';
import { LIMITS_CONFIG } from '../config/limits.config.js';
import {
  deliveries,
  deliveryAllocations,
  companySettings,
  ledgerTransactions,
  paymentTransactions,
} from '../drizzle/schema.js';

// ─── Shared payment allocation (backend webhook + workers reconciliation) ────
//
// Single implementation used by BOTH the backend webhook success path and the
// workers cron reconciliation, so the two can never drift again.

// Accepts both NodePgDatabase (workers) and PgDatabase<postgres-js> (backend).
// The three `any` params are for TQueryResult, TFullSchema, and TSchema generics —
// each project uses a different concrete PgQueryResultHKT and schema shape,
// and drizzle-orm does not export a unifying base type for PgDatabase.
// PgDatabase type params are unused; kept as any for compatibility with drizzle-orm v0.45.
type DrizzleDB = PgDatabase<any, any, any>;

export interface PaymentAllocationTransaction {
  id: string;
  amount: number;
  companyId: string | null;
  deliveryAllocations?: Array<{ deliveryId: string }>;
  metadata?: unknown;
}

export interface PaymentAllocationResult {
  fullyPaidIds: string[];
  updatedDeliveryIds: string[];
  /** Company IDs whose ledgers were credited — callers invalidate caches on these. */
  creditedCompanyIds: string[];
}

/**
 * Total amount already successfully paid per delivery (across ALL transactions).
 * Must run inside the same transaction that holds the `FOR UPDATE` locks.
 */
export async function getTotalPaidForDeliveries(
  deliveryIds: string[],
  conn: DrizzleDB,
): Promise<Map<string, number>> {
  const safeDeliveryIds = deliveryIds.slice(0, LIMITS_CONFIG.dbBatchSize);

  const results = await conn
    .select({
      deliveryId: deliveryAllocations.deliveryId,
      totalAmount: sum(deliveryAllocations.amount),
    })
    .from(deliveryAllocations)
    .innerJoin(paymentTransactions, eq(deliveryAllocations.transactionId, paymentTransactions.id))
    .where(
      and(
        inArray(deliveryAllocations.deliveryId, safeDeliveryIds),
        eq(paymentTransactions.status, TransactionStatus.SUCCESS),
      ),
    )
    .groupBy(deliveryAllocations.deliveryId);

  const map = new Map<string, number>();
  for (const res of results) {
    map.set(res.deliveryId, Number(res.totalAmount) || 0);
  }
  return map;
}

/**
 * Mark fully-paid deliveries' `paymentStatus` → COMPLETED and restore their
 * status (ASSIGNED when a rider is attached, else PENDING). Only touches
 * deliveries still flagged `paymentStatus = AWAITING`.
 */
export async function applyPaymentStatusUpdate(
  tx: DrizzleDB,
  deliveryIds: string[],
  companyId: string | null,
): Promise<string[]> {
  const whereConditions = [
    inArray(deliveries.id, deliveryIds),
    sql`${deliveries.metadata}->>'paymentStatus' = ${PaymentStatus.AWAITING}`,
  ];
  if (companyId) {
    whereConditions.push(eq(deliveries.companyId, companyId));
  }
  const result = await tx
    .update(deliveries)
    .set({
      status: sql`CASE WHEN ${deliveries.riderId} IS NOT NULL THEN ${DeliveryStatus.ASSIGNED} ELSE ${DeliveryStatus.PENDING} END`,
      metadata: sql`jsonb_set(
        COALESCE(${deliveries.metadata}, '{}'::jsonb),
        '{paymentStatus}',
        to_jsonb(${PaymentStatus.COMPLETED}::text)
      )`,
    })
    .where(and(...whereConditions))
    .returning({ id: deliveries.id });
  return result.map((r) => r.id);
}

type AllocationDeliveryRow = {
  id: string;
  price: number | null;
  companyId: string | null;
  createdAt: Date;
  metadata: unknown;
};

/**
 * Consolidates a successful payment transaction into delivery allocations and
 * company ledger balances, atomically. This is the single shared implementation
 * for both the backend webhook path and the workers reconciliation cron.
 *
 * Behavior:
 * - Lock linked deliveries (`FOR UPDATE`), compute targets via
 *   `computeAllocationTargets`, rewrite `delivery_allocations` for the tx.
 * - Credit ledgers: the delivery owner, or the pool fulfiller minus the fixed
 *   kobo `outsourcedCut` fee; leftover overpayment credits the payer's ledger.
 * - Write explicit CHANNEL_FEE ledger entries when `metadata.channelFeePerDelivery`.
 * - Restore fully-paid deliveries via `applyPaymentStatusUpdate`.
 *
 * Callers must invalidate caches for `creditedCompanyIds` AFTER the tx commits.
 */
export async function processPaymentAllocation(
  tx: DrizzleDB,
  transaction: PaymentAllocationTransaction,
): Promise<PaymentAllocationResult> {
  const fullyPaidIds: string[] = [];
  const creditedCompanyIds = new Set<string>();
  let updatedDeliveryIds: string[] = [];

  const existingAllocations = transaction.deliveryAllocations || [];
  const deliveryIds = existingAllocations.map((a) => a.deliveryId);

  if (deliveryIds.length > 0) {
    let remainingAmount = transaction.amount;

    for (let i = 0; i < deliveryIds.length; i += LIMITS_CONFIG.dbBatchSize) {
      const batch = deliveryIds.slice(i, i + LIMITS_CONFIG.dbBatchSize);
      if (remainingAmount <= 0) break;

      await tx
        .select({ id: deliveries.id })
        .from(deliveries)
        .where(inArray(deliveries.id, batch))
        .for('update');

      const deliveryRows = (await tx
        .select({
          id: deliveries.id,
          price: deliveries.price,
          companyId: deliveries.companyId,
          createdAt: deliveries.createdAt,
          metadata: deliveries.metadata,
        })
        .from(deliveries)
        .where(inArray(deliveries.id, batch))
        .orderBy(asc(deliveries.createdAt))) as AllocationDeliveryRow[];

      if (deliveryRows.length === 0) continue;

      const paymentTotals = await getTotalPaidForDeliveries(batch, tx);

      const {
        targets,
        fullyPaidIds: batchFullyPaidIds,
        leftover,
      } = computeAllocationTargets(
        deliveryRows.map((d) => ({ id: d.id, price: d.price })),
        paymentTotals,
        remainingAmount,
      );
      fullyPaidIds.push(...batchFullyPaidIds);
      remainingAmount = leftover;

      const channelFeePerDelivery =
        ((transaction.metadata as Record<string, unknown> | null)
          ?.channelFeePerDelivery as number) ?? 0;

      let allocations = targets;
      if (allocations.length === 0 && remainingAmount > 0) {
        const totalPrice = deliveryRows.reduce((s, d) => s + (d.price || 0), 0);
        allocations = deliveryRows.map((d) => {
          const share =
            totalPrice > 0
              ? Math.round(((d.price || 0) / totalPrice) * remainingAmount)
              : Math.floor(remainingAmount / deliveryRows.length);
          return { deliveryId: d.id, amountToApply: share };
        });
        const allocated = allocations.reduce((s, a) => s + a.amountToApply, 0);
        const drift = allocated - remainingAmount;
        if (drift > 0 && allocations.length > 0) {
          allocations[allocations.length - 1].amountToApply -= drift;
        } else if (drift < 0 && allocations.length > 0) {
          allocations[allocations.length - 1].amountToApply += -drift;
        }
        remainingAmount = 0;
      }

      if (allocations.length > 0) {
        await tx
          .delete(deliveryAllocations)
          .where(
            and(
              eq(deliveryAllocations.transactionId, transaction.id),
              inArray(deliveryAllocations.deliveryId, batch),
            ),
          );

        await tx.insert(deliveryAllocations).values(
          allocations.map((a) => ({
            transactionId: transaction.id,
            deliveryId: a.deliveryId,
            amount: a.amountToApply,
          })),
        );

        await applyLedgerCredits(
          tx,
          deliveryRows,
          allocations,
          channelFeePerDelivery,
          creditedCompanyIds,
        );
      }
    }

    if (remainingAmount > 0 && transaction.companyId) {
      await tx
        .update(companySettings)
        .set({ ledgerBalance: sql`${companySettings.ledgerBalance} + ${remainingAmount}` })
        .where(eq(companySettings.companyId, transaction.companyId));
      creditedCompanyIds.add(transaction.companyId);
    }
  }

  if (fullyPaidIds.length > 0) {
    updatedDeliveryIds = await applyPaymentStatusUpdate(tx, fullyPaidIds, transaction.companyId);
  }

  return { fullyPaidIds, updatedDeliveryIds, creditedCompanyIds: [...creditedCompanyIds] };
}

async function applyLedgerCredits(
  tx: DrizzleDB,
  deliveryRows: AllocationDeliveryRow[],
  allocations: Array<{ deliveryId: string; amountToApply: number }>,
  channelFeePerDelivery: number,
  creditedCompanyIds: Set<string>,
) {
  const deliveryById = new Map(deliveryRows.map((d) => [d.id, d]));
  const ledgerCredits = new Map<string, number>();
  for (const target of allocations) {
    const delivery = deliveryById.get(target.deliveryId);
    if (!delivery?.companyId) continue;

    const meta = delivery.metadata as Record<string, unknown> | null;
    const fulfillerId = meta?.fulfilledByCompanyId as string | undefined;
    const outsourcedCut = meta?.outsourcedCut as number | undefined;

    if (fulfillerId && outsourcedCut != null) {
      // outsourcedCut is a FIXED fee in kobo (e.g. ₦200 = 20000), not a percentage.
      const logistixFee = Math.min(outsourcedCut, target.amountToApply);
      const fulfillerShare = target.amountToApply - logistixFee;
      ledgerCredits.set(fulfillerId, (ledgerCredits.get(fulfillerId) || 0) + fulfillerShare);
    } else {
      ledgerCredits.set(
        delivery.companyId,
        (ledgerCredits.get(delivery.companyId) || 0) + target.amountToApply,
      );
    }
  }
  const companyCounts = new Map<string, number>();
  for (const d of deliveryRows) {
    if (d.companyId) companyCounts.set(d.companyId, (companyCounts.get(d.companyId) || 0) + 1);
  }
  for (const [cId, amount] of ledgerCredits.entries()) {
    const companyDeliveryCount = companyCounts.get(cId) || 0;
    await tx
      .update(companySettings)
      .set({ ledgerBalance: sql`${companySettings.ledgerBalance} + ${amount}` })
      .where(eq(companySettings.companyId, cId));
    creditedCompanyIds.add(cId);
    const totalFee = channelFeePerDelivery * companyDeliveryCount;
    if (totalFee > 0) {
      await tx.insert(ledgerTransactions).values({
        companyId: cId,
        amount: -totalFee,
        adjustmentType: LedgerAdjustmentType.CHANNEL_FEE,
        reference: `CHFEE-${randomUUID().slice(0, 8)}`,
        reason: `Channel fee for ${companyDeliveryCount} delivery(ies)`,
        metadata: {
          feePerDelivery: channelFeePerDelivery,
          deliveryCount: companyDeliveryCount,
          totalFee,
        },
        createdAt: new Date(),
      });
    }
  }
}
