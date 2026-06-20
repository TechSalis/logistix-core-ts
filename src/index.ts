/**
 * logistix-core-ts
 *
 * Single source of truth for enums, config, seed data, and utilities shared
 * across logistix-backend, logistix-workers, and logistix-web.
 *
 * Usage:
 *   import { UserRole, SYSTEM_CONFIG, DEFAULT_PRICING_SCHEMES } from 'logistix-core-ts';
 */

// ─── Enums ────────────────────────────────────────────────────────────────────
export * from './enums.js';

// ─── Config ───────────────────────────────────────────────────────────────────
export { buildSystemConfig, SYSTEM_CONFIG } from './config.js';
export type { SystemConfig } from './config.js';

// ─── Regional ─────────────────────────────────────────────────────────────────
export { REGIONAL_CONFIG } from './regional.js';
export type { RegionalConfig } from './regional.js';

// ─── Limits ───────────────────────────────────────────────────────────────────
export { LIMITS_CONFIG, TIER_LIMITS, getTierLimits } from './limits.js';
export type { LimitsConfig, TierLimits } from './limits.js';

// ─── Billing ──────────────────────────────────────────────────────────────────
export {
  BILLING_CONFIG,
  getSubscriptionPrice,
  isBillableTier,
  formatAmount,
  shouldBillNow,
  shouldRetryPayment,
  getNextRetryDate,
} from './billing.js';

// ─── Seed Data / Defaults ─────────────────────────────────────────────────────
export {
  DEFAULT_PRICING_SCHEMES,
  SYSTEM_COMPANY_HANDLE,
  SYSTEM_SUBSCRIPTION_TIER,
} from './defaults.js';
export type { DefaultPricingScheme } from './defaults.js';

// ─── Delivery Parsing ────────────────────────────────────────────────────────
export { localParse } from './deliveryParser.js';
export type { ParsedDelivery } from './deliveryParser.js';

// ─── Utilities ────────────────────────────────────────────────────────────────
export { fetchWithTimeout } from './fetchWithTimeout.js';
export type { FetchWithTimeoutOptions } from './fetchWithTimeout.js';
export * from './services/email.service';
