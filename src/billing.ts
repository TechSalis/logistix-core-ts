import { SubscriptionTier, TransactionStatus } from './enums.js';

/**
 * Billing configuration constants
 */
export const BILLING_CONFIG = {
  /**
   * Currency to use across the system
   */
  CURRENCY: 'NGN',

  /**
   * Monthly subscription pricing (in Kobo - Nigerian currency)
   * 1 Naira = 100 Kobo
   */
  PRICING: {
    [SubscriptionTier.FREE]: 0,
    [SubscriptionTier.STARTER]: 30000_00, // ₦30,000.00
    [SubscriptionTier.PROFESSIONAL]: 50000_00, // ₦50000.00
  },

  /**
   * Billing cycle in days
   */
  BILLING_CYCLE_DAYS: 30,

  /**
   * Grace period before downgrade (in days)
   */
  GRACE_PERIOD_DAYS: 14,

  /**
   * Payment timeout for AWAITING_PAYMENT deliveries (in hours)
   */
  PAYMENT_TIMEOUT_HOURS: 24,

  /**
   * Minimum balance required to avoid grace period (in Kobo)
   */
  MINIMUM_BALANCE: 1000, // ₦10.00

  /**
   * Retry configuration for failed payments
   */
  PAYMENT_RETRY: {
    MAX_ATTEMPTS: 3, // Initial attempt + 2 retries
    BACKOFF_DAYS: [0, 3, 7], // Day 0 (initial), Day 3 (retry 1), Day 7 (retry 2)
  },
} as const;

/**
 * Get subscription price for a tier with validation
 */
export function getSubscriptionPrice(tier: string): number {
  const normalizedTier = tier?.toUpperCase() as SubscriptionTier;

  if (!Object.values(SubscriptionTier).includes(normalizedTier)) {
    console.warn(`[BillingConfig] Invalid tier: ${tier}. Defaulting to FREE.`);
    return BILLING_CONFIG.PRICING[SubscriptionTier.FREE];
  }

  return BILLING_CONFIG.PRICING[normalizedTier];
}

/**
 * Check if a tier is billable
 */
export function isBillableTier(tier: string): boolean {
  return getSubscriptionPrice(tier) > 0;
}

/**
 * Format amount from Kobo to Naira string
 */
export function formatAmount(kobo: number): string {
  return `₦${(kobo / 100).toFixed(2)}`;
}

/**
 * Check if we should bill based on last billing date
 * More reliable than checking activation date
 */
export function shouldBillNow(lastBillingDate: Date | null, activationDate: Date): boolean {
  // First billing - check if enough time has passed since activation
  if (!lastBillingDate) {
    const daysSinceActivation = Math.floor(
      (Date.now() - activationDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysSinceActivation >= BILLING_CONFIG.BILLING_CYCLE_DAYS;
  }

  // Subsequent billings - check if enough time has passed since last billing
  const daysSinceLastBilling = Math.floor(
    (Date.now() - lastBillingDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  return daysSinceLastBilling >= BILLING_CONFIG.BILLING_CYCLE_DAYS;
}

/**
 * Check if we should retry a failed payment
 */
export function shouldRetryPayment(
  lastBillingDate: Date,
  lastBillingStatus: string,
  retryAttempt: number,
): boolean {
  // Only retry failed payments
  if (lastBillingStatus !== TransactionStatus.FAILED) {
    return false;
  }

  // Check if we've exceeded max retry attempts
  if (retryAttempt >= BILLING_CONFIG.PAYMENT_RETRY.MAX_ATTEMPTS) {
    return false;
  }

  // Check if enough time has passed for this retry attempt
  const daysSinceLastAttempt = Math.floor(
    (Date.now() - lastBillingDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const requiredDays = BILLING_CONFIG.PAYMENT_RETRY.BACKOFF_DAYS[retryAttempt];
  return daysSinceLastAttempt >= requiredDays;
}

/**
 * Get next retry date for a failed payment
 */
export function getNextRetryDate(lastBillingDate: Date, retryAttempt: number): Date | null {
  if (retryAttempt >= BILLING_CONFIG.PAYMENT_RETRY.MAX_ATTEMPTS) {
    return null;
  }

  const nextRetryDays = BILLING_CONFIG.PAYMENT_RETRY.BACKOFF_DAYS[retryAttempt];
  const nextRetryDate = new Date(lastBillingDate);
  nextRetryDate.setDate(nextRetryDate.getDate() + nextRetryDays);
  return nextRetryDate;
}
