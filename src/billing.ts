import { SubscriptionTier, ChannelType, Currency } from './enums.js';
import { REGIONAL_CONFIG } from './regional.js';

/**
 * 1 Naira = 100 Kobo.
 * Use this constant for ALL kobo ↔ naira conversions.
 */
export const KOBO_PER_NAIRA = 100;

/**
 * Milliseconds in one day.
 * Use this constant for ALL day-in-ms calculations.
 */
export const MS_PER_DAY = 86_400_000;

/**
 * Milliseconds in one hour.
 */
export const MS_PER_HOUR = 3_600_000;

/**
 * Milliseconds in one minute.
 */
export const MS_PER_MINUTE = 60_000;

/** 5 minutes in milliseconds — standard cache TTL across the codebase. */
export const FIVE_MINUTES_MS = 5 * 60_000;

/**
 * Data retention in days per tier
 */
export const DATA_RETENTION: Record<SubscriptionTier, number> = {
  [SubscriptionTier.STARTER]: 45,
  [SubscriptionTier.PROFESSIONAL]: 90,
};

/**
 * Per-delivery channel fees (in Kobo).
 * Billed per-delivery when delivery is created from a channel conversation.
 * Deducted from wallet in real-time, reconciled on monthly invoice.
 */
export const CHANNEL_FEES: Record<ChannelType, number> = {
  [ChannelType.LOGISTIX_NETWORK]: 200_00, // ₦200 — covers network number + routing + AI
  [ChannelType.MY_CHANNEL]: 200_00, // ₦200 — covers AI only
};

/**
 * Tiers that get a dedicated Squad virtual settlement account AND can
 * provision their own dedicated communication channels (MY_CHANNEL type).
 * STARTER uses the shared platform number and ledger.
 */
export const DEDICATED_TIERS: SubscriptionTier[] = [SubscriptionTier.PROFESSIONAL];

/**
 * Billing configuration constants
 */
export const BILLING_CONFIG = {
  /**
   * Currency to use across the system
   */
  CURRENCY: Currency.NGN,

  /**
   * Monthly subscription pricing (in Kobo - Nigerian currency)
   * 1 Naira = 100 Kobo
   */
  PRICING: {
    [SubscriptionTier.STARTER]: 1_500_000, // ₦15,000
    [SubscriptionTier.PROFESSIONAL]: 3_000_000, // ₦30,000
  },

  /**
   * Billing cycle in days
   */
  BILLING_CYCLE_DAYS: 30,

  /**
   * Days after PAST_DUE before company data is cancelled
   */
  PAST_DUE_CANCEL_DAYS: 14,

  /**
   * Days of free trial for new companies
   */
  TRIAL_DAYS: 14,

  /**
   * Days after CANCELLED before company data is purged
   */
  PURGE_AFTER_CANCELLED_DAYS: 30,

  /**
   * Message retention in days (archived after this period)
   */
  MESSAGE_RETENTION_DAYS: 30,

  /**
   * Payment timeout for AWAITING_PAYMENT deliveries (in hours)
   */
  PAYMENT_TIMEOUT_HOURS: 0.5,

  /**
   * Logistix AI's default cut (percentage) when a delivery is outsourced to
   * a partner company via the pool. Configurable per-company in the future.
   */
  OUTSOURCE_DEFAULT_CUT: 10,

  /**
   * Minimum balance required to avoid grace period (in Kobo)
   */
  MINIMUM_BALANCE: 1000, // ₦10.00

  /**
   * Per-delivery overage charge when monthly limit exceeded (in Kobo)
   */
  OVERAGE_PRICE_PER_DELIVERY_KOBO: 5_000, // ₦50

  /**
   * Maximum ledger deduction attempts before locking
   */
  MAX_LEDGER_DEDUCTION_ATTEMPTS: 3,

  /**
   * Number of days after purchase within which a refund may be requested.
   */
  REFUND_WINDOW_DAYS: 14,

  /**
   * HTTP timeout (ms) for Squad API calls.
   */
  SQUAD_HTTP_TIMEOUT: 30_000,

  /**
   * Retry configuration for failed payments.
   * Retries on specific days after failure (1, 3, 7 days).
   * If all retries fail, moves to PAST_DUE. After PAST_DUE window, cancels.
   */
  PAYMENT_RETRY: {
    MAX_ATTEMPTS: 3,
    INTERVALS_DAYS: [1, 3, 7] as const,
  },
} as const;

/**
 * Get subscription price for a tier with validation
 */
export function getSubscriptionPrice(tier: SubscriptionTier): number {
  return BILLING_CONFIG.PRICING[tier] ?? BILLING_CONFIG.PRICING[SubscriptionTier.STARTER];
}

/**
 * Format amount from Kobo to Naira string
 */
export function formatAmount(kobo: number): string {
  const value = kobo / KOBO_PER_NAIRA;
  return `${REGIONAL_CONFIG.currencySymbol}${value.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Format a Naira amount (already in Naira, not kobo) to a display string.
 * Use this for values already converted from kobo, or raw naira amounts.
 */
export function formatNaira(amount: number, decimals = 2): string {
  return `${REGIONAL_CONFIG.currencySymbol}${amount.toLocaleString('en-NG', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

/**
 * Check if a tier is billable (has a positive subscription price)
 */
export function isBillableTier(tier: SubscriptionTier): boolean {
  return getSubscriptionPrice(tier) > 0;
}

/**
 * Check if we should bill based on last billing date.
 * First billing triggers after BILLING_CYCLE_DAYS from activation.
 * Subsequent billings trigger after BILLING_CYCLE_DAYS from last billing.
 */
export function shouldBillNow(lastBillingDate: Date | null, activationDate: Date): boolean {
  const referenceDate = lastBillingDate || activationDate;
  const daysSinceReference = Math.floor((Date.now() - referenceDate.getTime()) / MS_PER_DAY);
  return daysSinceReference >= BILLING_CONFIG.BILLING_CYCLE_DAYS;
}

/**
 * Check if we should retry a failed payment.
 * Retries on specific days: 1, 3, 7 after the last billing attempt.
 */
export function shouldRetryPayment(lastBillingDate: Date, retryAttempt: number): boolean {
  if (retryAttempt >= BILLING_CONFIG.PAYMENT_RETRY.MAX_ATTEMPTS) {
    return false;
  }

  const intervals = BILLING_CONFIG.PAYMENT_RETRY.INTERVALS_DAYS;
  const daysToWait = intervals[retryAttempt] ?? intervals[intervals.length - 1];
  const daysSinceLastAttempt = Math.floor((Date.now() - lastBillingDate.getTime()) / MS_PER_DAY);

  return daysSinceLastAttempt >= daysToWait;
}

/**
 * Get the next retry date for a failed payment.
 * Uses the interval schedule: day 1, day 3, day 7.
 * Returns null if max retry attempts have been exhausted.
 */
export function getNextRetryDate(lastBillingDate: Date, retryAttempt: number): Date | null {
  if (retryAttempt >= BILLING_CONFIG.PAYMENT_RETRY.MAX_ATTEMPTS) {
    return null;
  }

  const intervals = BILLING_CONFIG.PAYMENT_RETRY.INTERVALS_DAYS;
  const daysToWait = intervals[retryAttempt] ?? intervals[intervals.length - 1];
  const nextRetryDate = new Date(lastBillingDate);
  nextRetryDate.setDate(nextRetryDate.getDate() + daysToWait);
  return nextRetryDate;
}

/**
 * Input for a single delivery's allocation calculation.
 */
export interface AllocationDeliveryInput {
  id: string;
  price: number | null;
}

/**
 * Result of allocation: a target with delivery ID and amount to apply.
 */
export interface AllocationTarget {
  deliveryId: string;
  amountToApply: number;
}

/**
 * Pure allocation algorithm: splits `remainingAmount` across deliveries
 * sorted by createdAt (oldest first), filling outstanding balances greedily.
 *
 * Returns the allocation targets and any fully-paid delivery IDs.
 * Does NOT perform DB writes — callers handle persistence.
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

    if (alreadyPaid + amountToApply >= price) {
      fullyPaidIds.push(delivery.id);
    }
  }

  return { targets, fullyPaidIds, leftover };
}
