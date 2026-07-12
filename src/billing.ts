import { SubscriptionTier, ChannelType, Currency } from './enums.js';

/**
 * Data retention in days per tier
 */
export const DATA_RETENTION: Record<SubscriptionTier, number> = {
  [SubscriptionTier.STARTER]: 45,
  [SubscriptionTier.PROFESSIONAL]: 90,
  [SubscriptionTier.ENTERPRISE]: 365,
};

/**
 * Per-delivery channel fees (in Kobo).
 * Billed per-delivery when delivery is created from a channel conversation.
 * Deducted from wallet in real-time, reconciled on monthly invoice.
 */
export const CHANNEL_FEES: Record<ChannelType, number> = {
  [ChannelType.LOGISTIX_NETWORK]: 20000, // ₦200 — covers Logistix AI number + routing + AI
  [ChannelType.MY_CHANNEL]: 20000, // ₦200 — covers AI only
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
   * Monthly subscription pricing (in Kobo - Nigerian currency)
   * 1 Naira = 100 Kobo
   */
  PRICING: {
    [SubscriptionTier.STARTER]: 1_500_000, // ₦15,000
    [SubscriptionTier.PROFESSIONAL]: 3_000_000, // ₦30,000
    [SubscriptionTier.ENTERPRISE]: -1, // Custom pricing — handled via quote flow
  },

  /**
   * Billing cycle in days
   */
  BILLING_CYCLE_DAYS: 30,

  /**
   * Grace period before locking (in days)
   */
  GRACE_PERIOD_DAYS: 14,

  /**
   * Days after LOCKED before company data is purged
   */
  PURGE_AFTER_LOCKED_DAYS: 30,

  /**
   * Payment timeout for AWAITING_PAYMENT deliveries (in hours)
   */
  PAYMENT_TIMEOUT_HOURS: 24,

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
   * Maximum ledger deduction attempts before locking
   */
  MAX_LEDGER_DEDUCTION_ATTEMPTS: 3,

  /**
   * Retry configuration for failed payments.
   * Retries daily for up to MAX_ATTEMPTS days.
   * If all retries fail, deduct from ledger. If insufficient, lock.
   */
  PAYMENT_RETRY: {
    MAX_ATTEMPTS: 30, // Retry daily for up to 30 days
    DAILY_RETRY_INTERVAL_DAYS: 1, // Retry every day
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
  const value = kobo / 100;
  return `₦${value.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
  const daysSinceReference = Math.floor(
    (Date.now() - referenceDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysSinceReference >= BILLING_CONFIG.BILLING_CYCLE_DAYS;
}

/**
 * Check if we should retry a failed payment.
 * Retries daily up to MAX_ATTEMPTS times.
 */
export function shouldRetryPayment(
  lastBillingDate: Date,
  lastBillingStatus: string,
  retryAttempt: number,
): boolean {
  if (retryAttempt >= BILLING_CONFIG.PAYMENT_RETRY.MAX_ATTEMPTS) {
    return false;
  }

  const daysSinceLastAttempt = Math.floor(
    (Date.now() - lastBillingDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  return daysSinceLastAttempt >= BILLING_CONFIG.PAYMENT_RETRY.DAILY_RETRY_INTERVAL_DAYS;
}

/**
 * Get the next retry date for a failed payment.
 * Returns null if max retry attempts have been exhausted.
 */
export function getNextRetryDate(lastBillingDate: Date, retryAttempt: number): Date | null {
  if (retryAttempt >= BILLING_CONFIG.PAYMENT_RETRY.MAX_ATTEMPTS) {
    return null;
  }

  const nextRetryDate = new Date(lastBillingDate);
  nextRetryDate.setDate(
    nextRetryDate.getDate() + BILLING_CONFIG.PAYMENT_RETRY.DAILY_RETRY_INTERVAL_DAYS,
  );
  return nextRetryDate;
}
