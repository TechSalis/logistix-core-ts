import { and, asc, eq, gt, inArray, sql, sum } from 'drizzle-orm';
import type { DrizzleDB } from './queue.service.js';
import { randomUUID } from 'node:crypto';
import {
  PaymentStatus,
  DeliveryStatus,
  TransactionStatus,
  LedgerAdjustmentType,
} from '../shared/enums/enums.js';
import { LIMITS_CONFIG } from '../shared/config/limits.config.js';
import { BILLING_CONFIG } from '../shared/config/billing.config.js';
import {
  deliveries,
  deliveryAllocations,
  companySettings,
  ledgerTransactions,
  paymentTransactions,
} from './drizzle/schema.js';

// ─── Shared payment allocation (backend webhook + workers reconciliation) ────
//
// Single implementation used by BOTH the backend webhook success path and the
// workers cron reconciliation, so the two can never drift again.

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

// ─── Allocation algorithm (moved from billing.config) ───────────────────────

export interface AllocationDeliveryInput {
  id: string;
  price: number | null;
}

export interface AllocationTarget {
  deliveryId: string;
  amountToApply: number;
}

/**
 * Pure allocation algorithm: splits `remainingAmount` across deliveries
 * sorted by createdAt (oldest first), filling outstanding balances greedily.
 */
export function computeAllocationTargets(
  deliveryRows: AllocationDeliveryInput[],
  paidAmounts: Map<string, number>,
  remainingAmount: number,
): { targets: AllocationTarget[]; fullyPaidIds: string[]; leftover: number } {
  const targets: AllocationTarget[] = [];
  const fullyPaidIds: string[] = [];
  let leftover = remainingAmount;

  for (const delivery of deliveryRows) {
    if (leftover <= 0) break;
    const price = delivery.price ?? 0;
    const alreadyPaid = paidAmounts.get(delivery.id) || 0;
    const outstanding = Math.max(0, price - alreadyPaid);
    if (outstanding <= 0) continue;
    const amountToApply = Math.min(leftover, outstanding);
    leftover -= amountToApply;
    targets.push({ deliveryId: delivery.id, amountToApply });
    if (alreadyPaid + amountToApply >= price) fullyPaidIds.push(delivery.id);
  }

  return { targets, fullyPaidIds, leftover };
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
 * - Credit ledgers: the delivery owner, or the configured pool split
 *   (platform fee → owner share → fulfiller remainder) when a pool fulfiller
 *   is stamped; system-owned pool deliveries credit only the fulfiller.
 *   Leftover overpayment credits the payer's ledger.
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
  let remainingAmount = transaction.amount;

  if (deliveryIds.length > 0) {
    // Idempotency guard (CT-C-01): init-time allocation rows carry amount 0,
    // so processed rows are detectable by amount > 0. Re-processing a
    // completed transaction must be a safe no-op — no re-allocation, no
    // double ledger credits.
    const processed = await tx
      .select({ deliveryId: deliveryAllocations.deliveryId })
      .from(deliveryAllocations)
      .where(
        and(
          eq(deliveryAllocations.transactionId, transaction.id),
          gt(deliveryAllocations.amount, 0),
        ),
      )
      .limit(1);
    if (processed.length > 0) {
      return { fullyPaidIds: [], updatedDeliveryIds: [], creditedCompanyIds: [] };
    }

    for (let i = 0; i < deliveryIds.length; i += LIMITS_CONFIG.dbBatchSize) {
      const batch = deliveryIds.slice(i, i + LIMITS_CONFIG.dbBatchSize);
      if (remainingAmount <= 0) break;

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
        .orderBy(asc(deliveries.createdAt))
        .for('update')) as AllocationDeliveryRow[];

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
        // CT-C-02: the leftover fallback applies ONLY to unpriced rows
        // (price 0/null). When every delivery is already priced — even fully
        // paid — the leftover must stay intact so it flows to the payer's
        // ledger balance below instead of being misallocated onto paid rows.
        const unpriced = deliveryRows.filter((d) => !d.price);
        if (unpriced.length > 0) {
          const share = Math.floor(remainingAmount / unpriced.length);
          allocations = unpriced.map((d) => ({ deliveryId: d.id, amountToApply: share }));
          const allocated = allocations.reduce((s, a) => s + a.amountToApply, 0);
          const drift = allocated - remainingAmount;
          if (drift > 0 && allocations.length > 0) {
            allocations[allocations.length - 1].amountToApply -= drift;
          } else if (drift < 0 && allocations.length > 0) {
            allocations[allocations.length - 1].amountToApply += -drift;
          }
          remainingAmount = 0;
        }
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
  }

  // Any amount not consumed by delivery allocations flows to the payer's ledger
  // balance. Allocation-less transactions (e.g. `fundWallet` wallet top-ups)
  // credit the full amount here.
  if (remainingAmount > 0 && transaction.companyId) {
    await tx
      .update(companySettings)
      .set({ ledgerBalance: sql`${companySettings.ledgerBalance} + ${remainingAmount}` })
      .where(eq(companySettings.companyId, transaction.companyId));
    creditedCompanyIds.add(transaction.companyId);
  }

  if (fullyPaidIds.length > 0) {
    updatedDeliveryIds = await applyPaymentStatusUpdate(tx, fullyPaidIds, transaction.companyId);
  }

  return { fullyPaidIds, updatedDeliveryIds, creditedCompanyIds: [...creditedCompanyIds] };
}

/**
 * Cross-company pool fulfillment split for a single allocation target.
 * Order: platform fee first, then the owner share (only when an owner company
 * exists — system-owned deliveries retain it implicitly), fulfiller takes the
 * rest. Every step clamps to what remains, so tiny fares degrade gracefully.
 */
export function computePoolSplit(
  amountToApply: number,
  hasOwnerCompany: boolean,
): { platformFee: number; ownerShare: number; fulfillerShare: number } {
  const { platformFeeKobo, ownerShareKobo } = BILLING_CONFIG.POOL_SPLIT_KOBO;
  const platformFee = Math.min(platformFeeKobo, amountToApply);
  const remainingAfterFee = amountToApply - platformFee;
  const ownerShare = hasOwnerCompany ? Math.min(ownerShareKobo, remainingAfterFee) : 0;
  return { platformFee, ownerShare, fulfillerShare: remainingAfterFee - ownerShare };
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
  const companyDeliveryCounts = new Map<string, number>();
  for (const target of allocations) {
    const delivery = deliveryById.get(target.deliveryId);
    if (!delivery) continue;

    const meta = delivery.metadata as Record<string, unknown> | null;
    const fulfillerId = meta?.fulfilledByCompanyId as string | undefined;
    if (!delivery.companyId && !fulfillerId) continue;

    let creditedCompanyId: string;
    if (fulfillerId) {
      const { ownerShare, fulfillerShare } = computePoolSplit(
        target.amountToApply,
        delivery.companyId != null,
      );
      if (delivery.companyId != null) {
        ledgerCredits.set(
          delivery.companyId,
          (ledgerCredits.get(delivery.companyId) || 0) + ownerShare,
        );
      }
      ledgerCredits.set(fulfillerId, (ledgerCredits.get(fulfillerId) || 0) + fulfillerShare);
      creditedCompanyId = fulfillerId;
    } else if (delivery.companyId != null) {
      ledgerCredits.set(
        delivery.companyId,
        (ledgerCredits.get(delivery.companyId) || 0) + target.amountToApply,
      );
      creditedCompanyId = delivery.companyId;
    } else {
      continue;
    }
    companyDeliveryCounts.set(
      creditedCompanyId,
      (companyDeliveryCounts.get(creditedCompanyId) || 0) + 1,
    );
  }
  for (const [cId, amount] of ledgerCredits.entries()) {
    const companyDeliveryCount = companyDeliveryCounts.get(cId) || 0;
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
