import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  BILLING_CONFIG,
  DATA_RETENTION,
  CHANNEL_FEES,
  DEDICATED_TIERS,
  SUPPORT_SLA,
  KOBO_PER_NAIRA,
  getSubscriptionPrice,
  formatAmount,
  formatNaira,
  isBillableTier,
  shouldBillNow,
  shouldRetryPayment,
  computeAccessLevel,
} from '../src/shared/config/billing.config.js';
import {
  getTotalPaidForDeliveries,
  applyPaymentStatusUpdate,
  processPaymentAllocation,
  computeAllocationTargets,
  computePoolSplit,
} from '../src/services/payments.js';
import type { PaymentAllocationTransaction } from '../src/services/payments.js';
import {
  SubscriptionTier,
  SubscriptionStatus,
  ApprovalStatus,
  CompanyAccessLevel,
  ChannelType,
} from '../src/shared/enums/enums.js';
import {
  deliveries,
  deliveryAllocations,
  companySettings,
  ledgerTransactions,
} from '../src/services/drizzle/schema.js';

describe('BILLING_CONFIG', () => {
  it('has valid currency', () => {
    expect(BILLING_CONFIG.CURRENCY).toBe('NGN');
  });

  it('has positive pricing for STARTER', () => {
    expect(BILLING_CONFIG.PRICING[SubscriptionTier.STARTER]).toBeGreaterThan(0);
  });

  it('has higher pricing for PROFESSIONAL', () => {
    expect(BILLING_CONFIG.PRICING[SubscriptionTier.PROFESSIONAL]).toBeGreaterThan(
      BILLING_CONFIG.PRICING[SubscriptionTier.STARTER],
    );
  });

  it('has 30 day billing cycle', () => {
    expect(BILLING_CONFIG.BILLING_CYCLE_DAYS).toBe(30);
  });

  it('has valid retry intervals', () => {
    expect(BILLING_CONFIG.PAYMENT_RETRY.INTERVALS_DAYS).toEqual([1, 3, 7]);
  });

  it('has max total attempts equal to 1 initial + retry intervals', () => {
    expect(BILLING_CONFIG.PAYMENT_RETRY.MAX_ATTEMPTS).toBe(4);
  });
});

describe('KOBO_PER_NAIRA', () => {
  it('is 100', () => {
    expect(KOBO_PER_NAIRA).toBe(100);
  });
});

describe('DATA_RETENTION', () => {
  it('STARTER has 1 month retention', () => {
    expect(DATA_RETENTION[SubscriptionTier.STARTER]).toBe(1);
  });

  it('PROFESSIONAL has 3 months retention', () => {
    expect(DATA_RETENTION[SubscriptionTier.PROFESSIONAL]).toBe(3);
  });
});

describe('CHANNEL_FEES', () => {
  it('SYSTEM_POOL fee is 20000 kobo', () => {
    expect(CHANNEL_FEES[ChannelType.SYSTEM_POOL]).toBe(200_00);
  });

  it('MY_CHANNEL fee is 20000 kobo', () => {
    expect(CHANNEL_FEES[ChannelType.MY_CHANNEL]).toBe(200_00);
  });
});

describe('DEDICATED_TIERS', () => {
  it('includes PROFESSIONAL', () => {
    expect(DEDICATED_TIERS).toContain(SubscriptionTier.PROFESSIONAL);
  });

  it('does not include STARTER', () => {
    expect(DEDICATED_TIERS).not.toContain(SubscriptionTier.STARTER);
  });
});

describe('SUPPORT_SLA', () => {
  it('gives STARTER the email SLA', () => {
    expect(SUPPORT_SLA[SubscriptionTier.STARTER]).toBe('Email (48hr SLA)');
  });

  it('gives PROFESSIONAL the priority SLA', () => {
    expect(SUPPORT_SLA[SubscriptionTier.PROFESSIONAL]).toBe('Priority (4hr SLA)');
  });

  it('offers a faster SLA on the higher tier', () => {
    expect(SUPPORT_SLA[SubscriptionTier.PROFESSIONAL]).not.toBe(
      SUPPORT_SLA[SubscriptionTier.STARTER],
    );
  });
});

describe('getSubscriptionPrice', () => {
  it('returns STARTER price for STARTER tier', () => {
    expect(getSubscriptionPrice(SubscriptionTier.STARTER)).toBe(1_500_000);
  });

  it('returns PROFESSIONAL price for PROFESSIONAL tier', () => {
    expect(getSubscriptionPrice(SubscriptionTier.PROFESSIONAL)).toBe(3_000_000);
  });

  it('throws for an unknown tier', () => {
    expect(() => getSubscriptionPrice('UNKNOWN' as SubscriptionTier)).toThrow();
  });
});

describe('formatAmount', () => {
  it('formats kobo to naira string', () => {
    const result = formatAmount(150_000);
    expect(result).toMatch(/₦/);
    expect(result).toMatch(/1,500\.00/);
  });

  it('formats zero', () => {
    const result = formatAmount(0);
    expect(result).toMatch(/₦0\.00/);
  });

  it('formats large amounts', () => {
    const result = formatAmount(10_000_000);
    expect(result).toMatch(/₦/);
    expect(result).toMatch(/100,000\.00/);
  });
});

describe('formatNaira', () => {
  it('formats naira amount with default decimals', () => {
    expect(formatNaira(1500)).toMatch(/₦1,500\.00/);
  });

  it('formats with custom decimals', () => {
    expect(formatNaira(1500, 0)).toMatch(/₦1,500/);
  });

  it('formats zero', () => {
    expect(formatNaira(0)).toMatch(/₦0\.00/);
  });
});

describe('isBillableTier', () => {
  it('returns true for STARTER', () => {
    expect(isBillableTier(SubscriptionTier.STARTER)).toBe(true);
  });

  it('returns true for PROFESSIONAL', () => {
    expect(isBillableTier(SubscriptionTier.PROFESSIONAL)).toBe(true);
  });
});

describe('shouldBillNow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true when lastBillingDate is null and activationDate is beyond cycle', () => {
    const activation = new Date('2024-01-01T00:00:00Z');
    vi.setSystemTime(new Date('2024-02-01T00:00:00Z'));
    expect(shouldBillNow(null, activation)).toBe(true);
  });

  it('returns false when lastBillingDate is null and activationDate is recent', () => {
    const activation = new Date('2024-01-01T00:00:00Z');
    vi.setSystemTime(new Date('2024-01-15T00:00:00Z'));
    expect(shouldBillNow(null, activation)).toBe(false);
  });

  it('returns true when last billing was 30+ days ago', () => {
    const lastBilling = new Date('2024-01-01T00:00:00Z');
    const activation = new Date('2023-01-01T00:00:00Z');
    vi.setSystemTime(new Date('2024-02-01T00:00:00Z'));
    expect(shouldBillNow(lastBilling, activation)).toBe(true);
  });

  it('returns false when last billing was less than 30 days ago', () => {
    const lastBilling = new Date('2024-01-20T00:00:00Z');
    const activation = new Date('2023-01-01T00:00:00Z');
    vi.setSystemTime(new Date('2024-02-01T00:00:00Z'));
    expect(shouldBillNow(lastBilling, activation)).toBe(false);
  });
});

describe('shouldRetryPayment', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true when retry attempt is due (attempt 0, 1 day)', () => {
    const lastBilling = new Date('2024-01-01T00:00:00Z');
    vi.setSystemTime(new Date('2024-01-03T00:00:00Z'));
    expect(shouldRetryPayment(lastBilling, 0)).toBe(true);
  });

  it('returns false when retry attempt is not yet due', () => {
    const lastBilling = new Date('2024-01-01T12:00:00Z');
    vi.setSystemTime(new Date('2024-01-01T18:00:00Z'));
    expect(shouldRetryPayment(lastBilling, 0)).toBe(false);
  });

  it('returns false when max attempts exceeded', () => {
    const lastBilling = new Date('2024-01-10T00:00:00Z');
    vi.setSystemTime(new Date('2024-01-20T00:00:00Z'));
    expect(shouldRetryPayment(lastBilling, 3)).toBe(false);
  });

  it('uses correct intervals per attempt number', () => {
    const lastBilling = new Date('2024-01-01T00:00:00Z');
    vi.setSystemTime(new Date('2024-01-02T12:00:00Z'));
    expect(shouldRetryPayment(lastBilling, 0)).toBe(true);
    expect(shouldRetryPayment(lastBilling, 1)).toBe(false);
  });
});

describe('computeAllocationTargets', () => {
  it('allocates fully to a single delivery', () => {
    const rows = [{ id: 'd1', price: 1000 }];
    const paid = new Map<string, number>();
    const result = computeAllocationTargets(rows, paid, 1000);
    expect(result.targets).toEqual([{ deliveryId: 'd1', amountToApply: 1000 }]);
    expect(result.fullyPaidIds).toEqual(['d1']);
    expect(result.leftover).toBe(0);
  });

  it('partially pays a delivery when amount is insufficient', () => {
    const rows = [{ id: 'd1', price: 1000 }];
    const paid = new Map<string, number>();
    const result = computeAllocationTargets(rows, paid, 500);
    expect(result.targets).toEqual([{ deliveryId: 'd1', amountToApply: 500 }]);
    expect(result.fullyPaidIds).toEqual([]);
    expect(result.leftover).toBe(0);
  });

  it('allocates across multiple deliveries oldest first', () => {
    const rows = [
      { id: 'd1', price: 1000 },
      { id: 'd2', price: 2000 },
    ];
    const paid = new Map<string, number>();
    const result = computeAllocationTargets(rows, paid, 2500);
    expect(result.targets).toEqual([
      { deliveryId: 'd1', amountToApply: 1000 },
      { deliveryId: 'd2', amountToApply: 1500 },
    ]);
    expect(result.fullyPaidIds).toEqual(['d1']);
    expect(result.leftover).toBe(0);
  });

  it('handles already partially paid deliveries', () => {
    const rows = [{ id: 'd1', price: 1000 }];
    const paid = new Map<string, number>([['d1', 600]]);
    const result = computeAllocationTargets(rows, paid, 1000);
    expect(result.targets).toEqual([{ deliveryId: 'd1', amountToApply: 400 }]);
    expect(result.fullyPaidIds).toEqual(['d1']);
    expect(result.leftover).toBe(600);
  });

  it('skips fully paid deliveries', () => {
    const rows = [
      { id: 'd1', price: 500 },
      { id: 'd2', price: 1000 },
    ];
    const paid = new Map<string, number>([['d1', 500]]);
    const result = computeAllocationTargets(rows, paid, 1000);
    expect(result.targets).toEqual([{ deliveryId: 'd2', amountToApply: 1000 }]);
    expect(result.fullyPaidIds).toEqual(['d2']);
    expect(result.leftover).toBe(0);
  });

  it('returns leftover when amount exceeds all deliveries', () => {
    const rows = [{ id: 'd1', price: 500 }];
    const paid = new Map<string, number>();
    const result = computeAllocationTargets(rows, paid, 1000);
    expect(result.targets).toEqual([{ deliveryId: 'd1', amountToApply: 500 }]);
    expect(result.fullyPaidIds).toEqual(['d1']);
    expect(result.leftover).toBe(500);
  });

  it('skips deliveries with null price (treated as zero outstanding)', () => {
    const rows = [{ id: 'd1', price: null }];
    const paid = new Map<string, number>();
    const result = computeAllocationTargets(rows, paid, 500);
    expect(result.targets).toEqual([]);
    expect(result.fullyPaidIds).toEqual([]);
    expect(result.leftover).toBe(500);
  });

  it('handles empty delivery rows', () => {
    const result = computeAllocationTargets([], new Map(), 1000);
    expect(result.targets).toEqual([]);
    expect(result.fullyPaidIds).toEqual([]);
    expect(result.leftover).toBe(1000);
  });

  it('stops early when leftover is zero', () => {
    const rows = [
      { id: 'd1', price: 500 },
      { id: 'd2', price: 1000 },
    ];
    const paid = new Map<string, number>();
    const result = computeAllocationTargets(rows, paid, 500);
    expect(result.targets).toEqual([{ deliveryId: 'd1', amountToApply: 500 }]);
    expect(result.leftover).toBe(0);
  });
});

describe('computeAccessLevel', () => {
  it('returns FULL for APPROVED + ACTIVE', () => {
    expect(computeAccessLevel(ApprovalStatus.APPROVED, SubscriptionStatus.ACTIVE)).toBe(
      CompanyAccessLevel.FULL,
    );
  });

  it('returns TRIAL for APPROVED + TRIAL', () => {
    expect(computeAccessLevel(ApprovalStatus.APPROVED, SubscriptionStatus.TRIAL)).toBe(
      CompanyAccessLevel.TRIAL,
    );
  });

  it('returns PAST_DUE for APPROVED + PAST_DUE', () => {
    expect(computeAccessLevel(ApprovalStatus.APPROVED, SubscriptionStatus.PAST_DUE)).toBe(
      CompanyAccessLevel.PAST_DUE,
    );
  });

  it('returns RESTRICTED for non-approved statuses', () => {
    expect(computeAccessLevel(ApprovalStatus.PENDING, SubscriptionStatus.ACTIVE)).toBe(
      CompanyAccessLevel.RESTRICTED,
    );
    expect(computeAccessLevel(ApprovalStatus.REJECTED, SubscriptionStatus.ACTIVE)).toBe(
      CompanyAccessLevel.RESTRICTED,
    );
    expect(computeAccessLevel(ApprovalStatus.SUSPENDED, SubscriptionStatus.ACTIVE)).toBe(
      CompanyAccessLevel.RESTRICTED,
    );
    expect(computeAccessLevel(ApprovalStatus.DISABLED, SubscriptionStatus.ACTIVE)).toBe(
      CompanyAccessLevel.RESTRICTED,
    );
  });

  it('returns RESTRICTED for APPROVED + CANCELLED', () => {
    expect(computeAccessLevel(ApprovalStatus.APPROVED, SubscriptionStatus.CANCELLED)).toBe(
      CompanyAccessLevel.RESTRICTED,
    );
  });

  it('returns RESTRICTED when both are null', () => {
    expect(computeAccessLevel(null, null)).toBe(CompanyAccessLevel.RESTRICTED);
  });

  it('returns RESTRICTED when both are undefined', () => {
    expect(computeAccessLevel(undefined, undefined)).toBe(CompanyAccessLevel.RESTRICTED);
  });
});

// ─── Shared payment allocation (backend webhook + workers reconciliation) ────

function makeBuilderChain(result?: unknown) {
  const chain: Record<string, unknown> = {};
  for (const m of [
    'set',
    'where',
    'returning',
    'from',
    'orderBy',
    'limit',
    'for',
    'groupBy',
    'innerJoin',
    'values',
  ] as const) {
    chain[m] = vi.fn().mockReturnValue(chain);
  }
  (chain as { then?: unknown }).then = (resolve: (v: unknown) => void) => resolve(result);
  return chain;
}

function mockTx(
  opts: {
    deliveryRows?: Array<Record<string, unknown>>;
    paidRows?: Array<{ deliveryId: string; total: string | number | null }>;
    existingAllocations?: Array<Record<string, unknown>>;
    updatedRows?: Array<{ id: string }>;
  } = {},
) {
  const deliveryRows = opts.deliveryRows ?? [];
  const paidRows = opts.paidRows ?? [];
  const existingAllocations = opts.existingAllocations ?? [];
  const updatedRows = opts.updatedRows ?? [];

  const sets: Array<{ table: unknown; value: unknown }> = [];
  const insertValues: Array<{ table: unknown; values: unknown }> = [];
  const wheres: Array<{ table: unknown; args: unknown[] }> = [];

  const tx = {
    select: vi.fn((columns?: Record<string, unknown>) => {
      const chain = makeBuilderChain();
      chain.from = vi.fn((table: unknown) => {
        if (table === deliveries) return makeBuilderChain(deliveryRows);
        if (columns && Object.keys(columns).length === 1 && 'deliveryId' in columns) {
          return makeBuilderChain(existingAllocations);
        }
        return makeBuilderChain(paidRows);
      });
      return chain;
    }),
    update: vi.fn((table: unknown) => {
      const chain = makeBuilderChain();
      chain.set = vi.fn((value: unknown) => {
        sets.push({ table, value });
        return chain;
      });
      chain.where = vi.fn((...args: unknown[]) => {
        wheres.push({ table, args });
        return chain;
      });
      chain.returning = vi.fn().mockResolvedValue(table === deliveries ? updatedRows : []);
      return chain;
    }),
    delete: vi.fn(() => makeBuilderChain()),
    insert: vi.fn((table: unknown) => {
      const chain = makeBuilderChain();
      chain.values = vi.fn((values: unknown) => {
        insertValues.push({ table, values });
        return chain;
      });
      return chain;
    }),
  };

  return { tx, sets, insertValues, wheres };
}

function sqlNumberValues(value: unknown): number[] {
  if (typeof value !== 'object' || value === null) return [];
  const chunks = ((value as { queryChunks?: unknown[] }).queryChunks ?? []) as unknown[];
  const direct = chunks.filter((c): c is number => typeof c === 'number');
  if (direct.length > 0) return direct;
  for (const v of Object.values(value as Record<string, unknown>)) {
    const nested = sqlNumberValues(v);
    if (nested.length > 0) return nested;
  }
  return [];
}

describe('getTotalPaidForDeliveries', () => {
  it('sums only SUCCESS allocations per delivery', async () => {
    const { tx } = mockTx({
      paidRows: [
        { deliveryId: 'D1', totalAmount: '1500' },
        { deliveryId: 'D2', totalAmount: null },
      ],
    });

    const map = await getTotalPaidForDeliveries(['D1', 'D2'], tx as never);

    expect(map.get('D1')).toBe(1500);
    expect(map.get('D2')).toBe(0);
  });

  it('returns empty map when no allocations exist', async () => {
    const { tx } = mockTx({ paidRows: [] });

    const map = await getTotalPaidForDeliveries(['D1'], tx as never);

    expect(map.size).toBe(0);
  });
});

describe('computePoolSplit', () => {
  it('splits a company-owned pool fare: platform fee, owner share, fulfiller remainder', () => {
    expect(computePoolSplit(100_000, true)).toEqual({
      platformFee: 100_00,
      ownerShare: 500_00,
      fulfillerShare: 40_000,
    });
  });

  it('retains the owner share implicitly for system-owned pool deliveries', () => {
    expect(computePoolSplit(100_000, false)).toEqual({
      platformFee: 100_00,
      ownerShare: 0,
      fulfillerShare: 90_000,
    });
  });

  it('clamps gracefully when the fare cannot cover the full split', () => {
    expect(computePoolSplit(5_000, true)).toEqual({
      platformFee: 5_000,
      ownerShare: 0,
      fulfillerShare: 0,
    });
    expect(computePoolSplit(60_000, true)).toEqual({
      platformFee: 100_00,
      ownerShare: 50_000,
      fulfillerShare: 0,
    });
  });

  it('returns all zeros for a zero amount', () => {
    expect(computePoolSplit(0, true)).toEqual({
      platformFee: 0,
      ownerShare: 0,
      fulfillerShare: 0,
    });
  });
});

describe('applyPaymentStatusUpdate', () => {
  it('updates fully-paid deliveries and returns updated ids', async () => {
    const { tx } = mockTx({ updatedRows: [{ id: 'D1' }] });

    const updated = await applyPaymentStatusUpdate(tx as never, ['D1', 'D2'], 'C1');

    expect(updated).toEqual(['D1']);
    expect(tx.update).toHaveBeenCalledWith(deliveries);
  });
});

describe('processPaymentAllocation', () => {
  it('allocates across deliveries and credits the owner ledger', async () => {
    const { tx } = mockTx({
      deliveryRows: [
        {
          id: 'D1',
          price: 1000,
          companyId: 'C1',
          createdAt: new Date('2026-01-01'),
          metadata: null,
        },
        {
          id: 'D2',
          price: 2000,
          companyId: 'C1',
          createdAt: new Date('2026-01-02'),
          metadata: null,
        },
      ],
      paidRows: [],
      updatedRows: [{ id: 'D1' }],
    });
    const transaction: PaymentAllocationTransaction = {
      id: 'T1',
      amount: 1500,
      companyId: 'C1',
      deliveryAllocations: [{ deliveryId: 'D1' }, { deliveryId: 'D2' }],
    };

    const result = await processPaymentAllocation(tx as never, transaction);

    expect(result.fullyPaidIds).toEqual(['D1']);
    expect(result.updatedDeliveryIds).toEqual(['D1']);
    expect(result.creditedCompanyIds).toEqual(['C1']);
    expect(tx.update).toHaveBeenCalledWith(companySettings);
    expect(tx.insert).toHaveBeenCalledWith(deliveryAllocations);
    expect(tx.insert).not.toHaveBeenCalledWith(ledgerTransactions);
  });

  it('splits company-owned pool payment: platform fee implicit, owner share, fulfiller remainder', async () => {
    const { tx } = mockTx({
      deliveryRows: [
        {
          id: 'D1',
          price: 100_000,
          companyId: 'C1',
          createdAt: new Date('2026-01-01'),
          metadata: { fulfilledByCompanyId: 'C2' },
        },
      ],
      paidRows: [],
      updatedRows: [{ id: 'D1' }],
    });
    const transaction: PaymentAllocationTransaction = {
      id: 'T1',
      amount: 100_000,
      companyId: 'C1',
      deliveryAllocations: [{ deliveryId: 'D1' }],
    };

    const result = await processPaymentAllocation(tx as never, transaction);

    expect(result.creditedCompanyIds).toEqual(['C1', 'C2']);
    expect(tx.update).toHaveBeenCalledWith(companySettings);
  });

  it('credits only the fulfiller for system-owned pool deliveries', async () => {
    const { tx } = mockTx({
      deliveryRows: [
        {
          id: 'D1',
          price: 100_000,
          companyId: null,
          createdAt: new Date('2026-01-01'),
          metadata: { fulfilledByCompanyId: 'C2' },
        },
      ],
      paidRows: [],
      updatedRows: [{ id: 'D1' }],
    });
    const transaction: PaymentAllocationTransaction = {
      id: 'T1',
      amount: 100_000,
      companyId: 'C2',
      deliveryAllocations: [{ deliveryId: 'D1' }],
    };

    const result = await processPaymentAllocation(tx as never, transaction);

    expect(result.creditedCompanyIds).toEqual(['C2']);
  });

  it('credits leftover overpayment to the payer ledger', async () => {
    const { tx } = mockTx({
      deliveryRows: [
        {
          id: 'D1',
          price: 500,
          companyId: 'C1',
          createdAt: new Date('2026-01-01'),
          metadata: null,
        },
      ],
      paidRows: [],
    });

    const result = await processPaymentAllocation(tx as never, {
      id: 'T1',
      amount: 700,
      companyId: 'C1',
      deliveryAllocations: [{ deliveryId: 'D1' }],
    });

    expect(result.fullyPaidIds).toEqual(['D1']);
    expect(result.creditedCompanyIds).toEqual(['C1']);
  });

  it('writes CHANNEL_FEE ledger entries when channelFeePerDelivery is set', async () => {
    const { tx, insertValues } = mockTx({
      deliveryRows: [
        {
          id: 'D1',
          price: 1000,
          companyId: 'C1',
          createdAt: new Date('2026-01-01'),
          metadata: null,
        },
      ],
      paidRows: [],
    });

    await processPaymentAllocation(tx as never, {
      id: 'T1',
      amount: 1000,
      companyId: 'C1',
      deliveryAllocations: [{ deliveryId: 'D1' }],
      metadata: { channelFeePerDelivery: 200 },
    });

    const chFee = insertValues.find((v) => v.table === ledgerTransactions);
    expect(chFee).toBeDefined();
    const feeEntry = Array.isArray(chFee!.values) ? chFee!.values[0] : chFee!.values;
    expect((feeEntry as { amount: number }).amount).toBe(-200);
  });

  it('spreads leftover across unpriced deliveries via equal-share fallback', async () => {
    const { tx, insertValues } = mockTx({
      deliveryRows: [
        {
          id: 'D1',
          price: null,
          companyId: 'C1',
          createdAt: new Date('2026-01-01'),
          metadata: null,
        },
        {
          id: 'D2',
          price: null,
          companyId: 'C1',
          createdAt: new Date('2026-01-02'),
          metadata: null,
        },
      ],
      paidRows: [],
    });

    const result = await processPaymentAllocation(tx as never, {
      id: 'T1',
      amount: 100,
      companyId: 'C1',
      deliveryAllocations: [{ deliveryId: 'D1' }, { deliveryId: 'D2' }],
    });

    expect(result.fullyPaidIds).toEqual([]);
    const alloc = insertValues.find((v) => v.table === deliveryAllocations);
    expect(alloc!.values).toEqual([
      { transactionId: 'T1', deliveryId: 'D1', amount: 50 },
      { transactionId: 'T1', deliveryId: 'D2', amount: 50 },
    ]);
  });

  it('credits the full amount to the payer ledger for allocation-less wallet top-ups', async () => {
    const { tx, sets } = mockTx({});

    const result = await processPaymentAllocation(tx as never, {
      id: 'T1',
      amount: 500,
      companyId: 'C1',
      deliveryAllocations: [],
    });

    expect(result).toEqual({
      fullyPaidIds: [],
      updatedDeliveryIds: [],
      creditedCompanyIds: ['C1'],
    });
    expect(tx.select).not.toHaveBeenCalled();
    expect(tx.insert).not.toHaveBeenCalled();
    const payerUpdate = sets.filter((s) => s.table === companySettings);
    expect(payerUpdate).toHaveLength(1);
    expect(sqlNumberValues(payerUpdate[0].value)).toContain(500);
  });

  it('skips the ledger credit when an allocation-less transaction has no company', async () => {
    const { tx, sets } = mockTx({});

    const result = await processPaymentAllocation(tx as never, {
      id: 'T1',
      amount: 500,
      companyId: null,
      deliveryAllocations: [],
    });

    expect(result).toEqual({ fullyPaidIds: [], updatedDeliveryIds: [], creditedCompanyIds: [] });
    expect(tx.update).not.toHaveBeenCalled();
    expect(tx.insert).not.toHaveBeenCalled();
    expect(sets).toHaveLength(0);
  });

  it('is idempotent: re-processing an already-allocated transaction is a no-op', async () => {
    const transaction: PaymentAllocationTransaction = {
      id: 'T1',
      amount: 1000,
      companyId: 'C1',
      deliveryAllocations: [{ deliveryId: 'D1' }],
    };

    const first = mockTx({
      deliveryRows: [
        {
          id: 'D1',
          price: 1000,
          companyId: 'C1',
          createdAt: new Date('2026-01-01'),
          metadata: null,
        },
      ],
      paidRows: [],
      updatedRows: [{ id: 'D1' }],
    });
    const firstResult = await processPaymentAllocation(first.tx as never, transaction);
    expect(firstResult.fullyPaidIds).toEqual(['D1']);
    expect(first.insertValues.filter((v) => v.table === deliveryAllocations)).toHaveLength(1);
    expect(first.sets.filter((s) => s.table === companySettings)).toHaveLength(1);

    const second = mockTx({
      deliveryRows: [
        {
          id: 'D1',
          price: 1000,
          companyId: 'C1',
          createdAt: new Date('2026-01-01'),
          metadata: null,
        },
      ],
      existingAllocations: [{ deliveryId: 'D1', amount: 1000 }],
    });
    const secondResult = await processPaymentAllocation(second.tx as never, transaction);

    expect(secondResult).toEqual({
      fullyPaidIds: [],
      updatedDeliveryIds: [],
      creditedCompanyIds: [],
    });
    expect(second.insertValues.filter((v) => v.table === deliveryAllocations)).toHaveLength(0);
    expect(second.sets.filter((s) => s.table === companySettings)).toHaveLength(0);
    expect(second.tx.insert).not.toHaveBeenCalled();
    expect(second.tx.update).not.toHaveBeenCalled();
  });

  it('keeps leftover intact when all deliveries are already fully priced and credits the payer ledger', async () => {
    const { tx, insertValues, sets } = mockTx({
      deliveryRows: [
        {
          id: 'D1',
          price: 500,
          companyId: 'C1',
          createdAt: new Date('2026-01-01'),
          metadata: null,
        },
      ],
      paidRows: [{ deliveryId: 'D1', totalAmount: '500' }],
    });

    const result = await processPaymentAllocation(tx as never, {
      id: 'T1',
      amount: 700,
      companyId: 'C1',
      deliveryAllocations: [{ deliveryId: 'D1' }],
    });

    expect(result).toEqual({
      fullyPaidIds: [],
      updatedDeliveryIds: [],
      creditedCompanyIds: ['C1'],
    });
    expect(insertValues.filter((v) => v.table === deliveryAllocations)).toHaveLength(0);
    const payerUpdate = sets.filter((s) => s.table === companySettings);
    expect(payerUpdate).toHaveLength(1);
    expect(sqlNumberValues(payerUpdate[0].value)).toContain(700);
  });
});
