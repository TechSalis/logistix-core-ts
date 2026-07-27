import {
  SubscriptionTier,
  ChannelType,
  Currency,
  ApprovalStatus,
  SubscriptionStatus,
  CompanyAccessLevel,
} from './enums.js';
import { REGIONAL_CONFIG, REGIONAL_LOCALE } from './regional.js';

// Re-export time constants from time.ts for backward compatibility
export {
  MS_PER_DAY,
  MS_PER_HOUR,
  MS_PER_MINUTE,
  FIVE_MINUTES_MS,
  TEN_MINUTES_MS,
  FIFTEEN_MINUTES_MS,
} from './time.js';

import { MS_PER_DAY } from './time.js';

/**
 * 1 Naira = 100 Kobo.
 * Use this constant for ALL kobo ↔ naira conversions.
 */
export const KOBO_PER_NAIRA = 100;

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
  [ChannelType.PLATFORM_POOL]: 200_00, // ₦200 — covers network number + routing + AI
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
   * Fixed outsource cut (in Kobo) charged to the originating company when a
   * pool delivery is fulfilled by a different company's rider.
   * ₦200 = 20000 kobo.
   */
  OUTSOURCE_CUT_KOBO: 200_00,

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
  return `${REGIONAL_CONFIG.currencySymbol}${value.toLocaleString(REGIONAL_LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Format a Naira amount (already in Naira, not kobo) to a display string.
 * Use this for values already converted from kobo, or raw naira amounts.
 */
export function formatNaira(amount: number, decimals = 2): string {
  return `${REGIONAL_CONFIG.currencySymbol}${amount.toLocaleString(REGIONAL_LOCALE, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
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
 * Returns the Date when the next retry attempt should occur, or null if max attempts exceeded.
 */
export function getNextRetryDate(lastBillingDate: Date, retryAttempt: number): Date | null {
  if (retryAttempt >= BILLING_CONFIG.PAYMENT_RETRY.MAX_ATTEMPTS) {
    return null;
  }
  const intervals = BILLING_CONFIG.PAYMENT_RETRY.INTERVALS_DAYS;
  const daysToWait = intervals[retryAttempt] ?? intervals[intervals.length - 1];
  return new Date(lastBillingDate.getTime() + daysToWait * MS_PER_DAY);
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

/**
 * Compute a single access level from the approval × subscription matrix.
 *
 *  ApprovalStatus × SubscriptionStatus  →  CompanyAccessLevel
 *  ─────────────────────────────────────────────────────────────
 *  APPROVED + ACTIVE      →  FULL
 *  APPROVED + TRIAL       →  TRIAL
 *  APPROVED + PAST_DUE    →  PAST_DUE
 *  anything else          →  RESTRICTED
 */
export function computeAccessLevel(
  verificationStatus: ApprovalStatus | null | undefined,
  subscriptionStatus: SubscriptionStatus | null | undefined,
): CompanyAccessLevel {
  if (verificationStatus !== ApprovalStatus.APPROVED) {
    return CompanyAccessLevel.RESTRICTED;
  }
  if (subscriptionStatus === SubscriptionStatus.ACTIVE) {
    return CompanyAccessLevel.FULL;
  }
  if (subscriptionStatus === SubscriptionStatus.TRIAL) {
    return CompanyAccessLevel.TRIAL;
  }
  if (subscriptionStatus === SubscriptionStatus.PAST_DUE) {
    return CompanyAccessLevel.PAST_DUE;
  }
  return CompanyAccessLevel.RESTRICTED;
}
