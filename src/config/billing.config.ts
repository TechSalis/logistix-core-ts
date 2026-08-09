import {
  SubscriptionTier,
  ChannelType,
  Currency,
  ApprovalStatus,
  SubscriptionStatus,
  CompanyAccessLevel,
} from '../enums/enums.js';
import { REGIONAL_CONFIG, REGIONAL_LOCALE } from './regional.config.js';
import { RETENTION_CONFIG } from './retention.config.js';

/**
 * 1 Naira = 100 Kobo.
 * All money in the system is stored in Kobo ("kobo everywhere").
 * This constant is retained only for display formatting (see `formatAmount`)
 * and for documenting the legacy naira → kobo ×100 migration.
 */
export const KOBO_PER_NAIRA = 100;

/**
 * Data retention in months per tier — controls dashboard visibility, export window, and archival
 */
export const DATA_RETENTION: Record<SubscriptionTier, number> = {
  [SubscriptionTier.STARTER]: 1,
  [SubscriptionTier.PROFESSIONAL]: 3,
};

/**
 * Per-delivery channel fees (in Kobo).
 * Billed per-delivery when delivery is created from a channel conversation.
 * Deducted from wallet in real-time, reconciled on monthly invoice.
 */
export const CHANNEL_FEES: Record<ChannelType, number> = {
  [ChannelType.SYSTEM_POOL]: 200_00, // ₦200 — covers network number + routing + AI
  [ChannelType.MY_CHANNEL]: 200_00, // ₦200 — covers AI only
};

/**
 * Tiers that get a dedicated Squad virtual settlement account AND can
 * provision their own dedicated communication channels (MY_CHANNEL type).
 * STARTER uses the shared platform number and ledger.
 */
export const DEDICATED_TIERS: SubscriptionTier[] = [SubscriptionTier.PROFESSIONAL];

/**
 * Support SLA per tier, as shown on the subscription plans and used as the
 * support feature value. SSOT — never duplicate these strings elsewhere.
 */
export const SUPPORT_SLA: Record<SubscriptionTier, string> = {
  [SubscriptionTier.STARTER]: 'Email (48hr SLA)',
  [SubscriptionTier.PROFESSIONAL]: 'Priority (4hr SLA)',
};

/**
 * Billing configuration constants
 */
export const BILLING_CONFIG = {
  /**
   * Currency to use across the system
   */
  CURRENCY: Currency.NGN,

  /**
   * Monthly subscription pricing (in Kobo — single currency unit)
   * ₦15,000 = 1_500_000 kobo, ₦30,000 = 3_000_000 kobo.
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
   * References RETENTION_CONFIG as single source of truth.
   */
  PURGE_AFTER_CANCELLED_DAYS: RETENTION_CONFIG.lockedCompanyPurgeRetentionDays,

  /**
   * Payment timeout for unconfirmed payment deliveries (in hours)
   */
  PAYMENT_TIMEOUT_HOURS: 0.5,

  /**
   * Fixed outsource cut (in Kobo) charged to the originating company when a
   * pool delivery is fulfilled by a different company's rider.
   * ₦200 = 20000 kobo.
   */
  OUTSOURCE_CUT_KOBO: 200_00,

  /**
   * Per-delivery overage charge when monthly limit exceeded (in Kobo)
   */
  OVERAGE_PRICE_PER_DELIVERY_KOBO: 5_000, // ₦50

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
   * MAX_ATTEMPTS = total payment attempts (1 initial + 1 retry per INTERVALS_DAYS entry).
   * If all attempts fail, moves to PAST_DUE. After PAST_DUE window, cancels.
   */
  PAYMENT_RETRY: {
    MAX_ATTEMPTS: 4,
    INTERVALS_DAYS: [1, 3, 7] as const,
  },
} as const;

/**
 * Get subscription price for a tier with validation
 */
export function getSubscriptionPrice(tier: SubscriptionTier): number {
  const price = BILLING_CONFIG.PRICING[tier];
  if (price === undefined) {
    console.error(`[Billing] Unknown subscription tier: ${tier} — falling back to STARTER`);
    return BILLING_CONFIG.PRICING[SubscriptionTier.STARTER] ?? 0;
  }
  return price;
}

/**
 * Format a kobo amount to a display string (₦ with decimals).
 * All money in the system is kobo, so this is the canonical money formatter.
 */
export function formatAmount(kobo: number): string {
  const value = kobo / KOBO_PER_NAIRA;
  return `${REGIONAL_CONFIG.currencySymbol}${value.toLocaleString(REGIONAL_LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Legacy: format a raw kobo amount using `formatAmount` instead.
 * This helper only exists for the transition; new code must not pass
 * naira-denominated values here.
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
  const daysSinceReference = Math.floor((Date.now() - referenceDate.getTime()) / 86_400_000);
  return daysSinceReference >= BILLING_CONFIG.BILLING_CYCLE_DAYS;
}

/**
 * Check if we should retry a failed payment.
 * `retryAttempt` is a 0-based retry index (0 = first retry, 1-day interval).
 * Retries are capped by the number of configured intervals.
 */
export function shouldRetryPayment(lastBillingDate: Date, retryAttempt: number): boolean {
  const intervals = BILLING_CONFIG.PAYMENT_RETRY.INTERVALS_DAYS;
  if (retryAttempt >= intervals.length) {
    return false;
  }

  const daysToWait = intervals[retryAttempt] ?? intervals[intervals.length - 1];
  const daysSinceLastAttempt = Math.floor((Date.now() - lastBillingDate.getTime()) / 86_400_000);

  return daysSinceLastAttempt >= daysToWait;
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
