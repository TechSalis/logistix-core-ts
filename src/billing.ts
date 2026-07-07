import { SubscriptionTier, TransactionStatus, ChannelType, Currency } from './enums.js';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export interface AICreditConfig {
  MONTHLY_ALLOWANCE: Record<SubscriptionTier, number>;
  OVERAGE_PRICING: Record<string, number> & { default: number };
}

/**
 * Monthly included AI token allowances per tier
 */
export const AI_CREDIT_CONFIG: AICreditConfig = {
  MONTHLY_ALLOWANCE: {
    [SubscriptionTier.STARTER]: 50_000,
    [SubscriptionTier.PROFESSIONAL]: 500_000,
    [SubscriptionTier.ENTERPRISE]: 10_000_000,
  },

  OVERAGE_PRICING: {
    'gpt-4o': 0.000015,
    'gpt-4o-mini': 0.000003,
    default: 0.000003,
  },
};

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
  [ChannelType.LOGISTIX_NETWORK]: 10000, // ₦100 — covers Logistix number + routing + AI
  [ChannelType.MY_CHANNEL]: 5000, // ₦50  — covers AI only
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
    [SubscriptionTier.ENTERPRISE]: 0, // Custom pricing — handled via quote flow
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
 * Overage pricing for usage beyond tier allowances.
 * All prices in Kobo (1 Naira = 100 Kobo).
 */
export const OVERAGE_PRICING = {
  /** Per-delivery overage charge (beyond monthly allowance) — in Kobo */
  PER_DELIVERY: 10000, // ₦100
  /** Per extra dispatcher seat beyond tier allowance — in Kobo */
  PER_DISPATCHER_SEAT: 500000, // ₦5,000
  /** Per extra rider seat beyond tier allowance — in Kobo */
  PER_RIDER_SEAT: 100000, // ₦1,000
  /** Per-token AI overage charge (beyond monthly allowance) — in Kobo per token */
  AI_OVERAGE_PER_TOKEN: 10, // ₦0.10 per token
} as const;

/**
 * Get subscription price for a tier with validation
 */
export function getSubscriptionPrice(tier: SubscriptionTier): number {
  return BILLING_CONFIG.PRICING[tier] ?? BILLING_CONFIG.PRICING[SubscriptionTier.STARTER];
}

/**
 * Check if a tier is billable
 */
export function isBillableTier(tier: SubscriptionTier): boolean {
  return getSubscriptionPrice(tier) > 0;
}

/**
 * Format amount from Kobo to Naira string
 */
export function formatAmount(kobo: number): string {
  const value = kobo / 100;
  return `₦${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Check if we should bill based on last billing date
 * More reliable than checking activation date
 */
export function shouldBillNow(lastBillingDate: Date | null, activationDate: Date): boolean {
  // First billing - check if enough time has passed since activation
  if (!lastBillingDate) {
    const daysSinceActivation = Math.floor((Date.now() - activationDate.getTime()) / MS_PER_DAY);
    return daysSinceActivation >= BILLING_CONFIG.BILLING_CYCLE_DAYS;
  }

  // Subsequent billings - check if enough time has passed since last billing
  const daysSinceLastBilling = Math.floor((Date.now() - lastBillingDate.getTime()) / MS_PER_DAY);
  return daysSinceLastBilling >= BILLING_CONFIG.BILLING_CYCLE_DAYS;
}

/**
 * Check if we should retry a failed payment.
 * Daily retry: retries every day for up to MAX_ATTEMPTS days.
 */
export function shouldRetryPayment(
  lastBillingDate: Date,
  lastBillingStatus: TransactionStatus,
  retryAttempt: number,
): boolean {
  if (lastBillingStatus !== TransactionStatus.FAILED) {
    return false;
  }

  if (retryAttempt >= BILLING_CONFIG.PAYMENT_RETRY.MAX_ATTEMPTS) {
    return false;
  }

  const daysSinceLastAttempt = Math.floor((Date.now() - lastBillingDate.getTime()) / MS_PER_DAY);

  return daysSinceLastAttempt >= BILLING_CONFIG.PAYMENT_RETRY.DAILY_RETRY_INTERVAL_DAYS;
}

/**
 * Get next retry date for a failed payment.
 * Retries every day after the last attempt.
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

/**
 * Get monthly AI token allowance for a company tier
 */
export function getAiAllowance(tier: SubscriptionTier): number {
  return (
    AI_CREDIT_CONFIG.MONTHLY_ALLOWANCE[tier] ??
    AI_CREDIT_CONFIG.MONTHLY_ALLOWANCE[SubscriptionTier.STARTER]
  );
}

/**
 * Get overage price per token for a given model
 */
export function getOveragePrice(model: string): number {
  return AI_CREDIT_CONFIG.OVERAGE_PRICING[model] ?? AI_CREDIT_CONFIG.OVERAGE_PRICING.default;
}

/**
 * Calculate remaining AI allowance for the current period
 */
export function calculateRemainingAllowance(tier: SubscriptionTier, periodUsage: number): number {
  const allowance = getAiAllowance(tier);
  return Math.max(0, allowance - periodUsage);
}

export interface MonthlyUsageInput {
  deliveryCount: number;
  aiTokenCount: number;
  riderCount: number;
  dispatcherCount: number;
}
