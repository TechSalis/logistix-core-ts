import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  BILLING_CONFIG,
  DATA_RETENTION,
  CHANNEL_FEES,
  DEDICATED_TIERS,
  KOBO_PER_NAIRA,
  getSubscriptionPrice,
  formatAmount,
  formatNaira,
  isBillableTier,
  shouldBillNow,
  shouldRetryPayment,
  computeAllocationTargets,
  computeAccessLevel,
} from '../src/billing.js';
import {
  getTotalPaidForDeliveries,
  applyPaymentStatusUpdate,
  processPaymentAllocation,
} from '../src/payments.js';
import type { PaymentAllocationTransaction } from '../src/payments.js';
import {
  SubscriptionTier,
  SubscriptionStatus,
  ApprovalStatus,
  CompanyAccessLevel,
  ChannelType,
} from '../src/enums.js';
import {
  deliveries,
  deliveryAllocations,
  companySettings,
  ledgerTransactions,
} from '../src/drizzle/schema.js';

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

describe('getSubscriptionPrice', () => {
  it('returns STARTER price for STARTER tier', () => {
    expect(getSubscriptionPrice(SubscriptionTier.STARTER)).toBe(1_500_000);
  });

  it('returns PROFESSIONAL price for PROFESSIONAL tier', () => {
    expect(getSubscriptionPrice(SubscriptionTier.PROFESSIONAL)).toBe(3_000_000);
  });

  it('falls back to STARTER for unknown tier', () => {
    expect(getSubscriptionPrice('UNKNOWN' as SubscriptionTier)).toBe(1_500_000);
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
    updatedRows?: Array<{ id: string }>;
  } = {},
) {
  const deliveryRows = opts.deliveryRows ?? [];
  const paidRows = opts.paidRows ?? [];
  const updatedRows = opts.updatedRows ?? [];

  const sets: Array<{ table: unknown; value: unknown }> = [];
  const insertValues: Array<{ table: unknown; values: unknown }> = [];
  const wheres: Array<{ table: unknown; args: unknown[] }> = [];

  const tx = {
    select: vi.fn(() => {
      const chain = makeBuilderChain();
      chain.from = vi.fn((table: unknown) =>
        table === deliveries ? makeBuilderChain(deliveryRows) : makeBuilderChain(paidRows),
      );
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

  it('routes pool payment to the fulfiller minus the fixed kobo outsource cut', async () => {
    const { tx } = mockTx({
      deliveryRows: [
        {
          id: 'D1',
          price: 1000,
          companyId: 'C1',
          createdAt: new Date('2026-01-01'),
          metadata: { fulfilledByCompanyId: 'C2', outsourcedCut: 200_00 },
        },
      ],
      paidRows: [],
      updatedRows: [{ id: 'D1' }],
    });
    const transaction: PaymentAllocationTransaction = {
      id: 'T1',
      amount: 1000,
      companyId: 'C1',
      deliveryAllocations: [{ deliveryId: 'D1' }],
    };

    const result = await processPaymentAllocation(tx as never, transaction);

    expect(result.creditedCompanyIds).toEqual(['C2']);
    expect(tx.update).toHaveBeenCalledWith(companySettings);
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
    expect((chFee!.values as { amount: number }).amount).toBe(-200);
  });

  it('spreads leftover across all deliveries via proportional fallback', async () => {
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

  it('does nothing when there are no linked allocations', async () => {
    const { tx } = mockTx({});

    const result = await processPaymentAllocation(tx as never, {
      id: 'T1',
      amount: 500,
      companyId: 'C1',
      deliveryAllocations: [],
    });

    expect(result).toEqual({ fullyPaidIds: [], updatedDeliveryIds: [], creditedCompanyIds: [] });
    expect(tx.select).not.toHaveBeenCalled();
    expect(tx.update).not.toHaveBeenCalled();
    expect(tx.insert).not.toHaveBeenCalled();
  });
});
