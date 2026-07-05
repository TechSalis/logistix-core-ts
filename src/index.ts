/**
 * logistix-core-ts
 *
 * Single source of truth for enums, config, and utilities shared
 * across logistix-backend, logistix-workers, and logistix-web.
 *
 * Usage:
 *   import { UserRole, SYSTEM_CONFIG } from 'logistix-core-ts';
 */

// ─── Enums ────────────────────────────────────────────────────────────────────
export * from './enums.js';

// ─── Config ───────────────────────────────────────────────────────────────────
export { buildSystemConfig, SYSTEM_CONFIG, DEFAULT_WORKING_HOURS } from './config.js';
export type { SystemConfig, SystemConfigOverrides, BankDetails } from './config.js';

// ─── Regional ─────────────────────────────────────────────────────────────────
export { REGIONAL_CONFIG } from './regional.js';
export type { RegionalConfig } from './regional.js';

// ─── Limits ───────────────────────────────────────────────────────────────────
export { LIMITS_CONFIG, TIER_LIMITS, getTierLimits } from './limits.js';
export type { LimitsConfig, TierLimits } from './limits.js';

// ─── Billing ──────────────────────────────────────────────────────────────────
export {
  BILLING_CONFIG,
  AI_CREDIT_CONFIG,
  getSubscriptionPrice,
  isBillableTier,
  formatAmount,
  shouldBillNow,
  shouldRetryPayment,
  getNextRetryDate,
  getAiAllowance,
  getOveragePrice,
  calculateRemainingAllowance,
} from './billing.js';

// ─── Security ─────────────────────────────────────────────────────────────────
export { SECURITY_CONFIG } from './security.js';
export type { SecurityConfig } from './security.js';

// ─── AI ───────────────────────────────────────────────────────────────────────
export { AI_CONFIG, QUEUES } from './ai.js';
export type { AIConfig } from './ai.js';

// ─── Utilities ────────────────────────────────────────────────────────────────
export { fetchWithTimeout } from './fetchWithTimeout.js';
export type { FetchWithTimeoutOptions } from './fetchWithTimeout.js';
export * from './services/email.service.js';

// ─── Contact Form ─────────────────────────────────────────────────────────────
export { submitterAckTemplate } from './templates/contact-email.js';
export { sendContactSubmissionAck } from './contact.js';
export type { ContactSubmission, ContactNotifierOptions } from './contact.js';

// ─── Offline / Local-First ────────────────────────────────────────────────────
export {
  OFFLINE_RETENTION_DAYS,
  OFFLINE_DB_NAME,
  OFFLINE_PROFILE_KEY,
  OfflineTab,
  OFFLINE_MAX_DELIVERIES,
  createOfflineProfile,
} from './offline.js';
export type { OfflineProfile, OfflineExportFormat } from './offline.js';

// ─── Drizzle ORM Schema ───────────────────────────────────────────────────────
export * from './drizzle/index.js';
