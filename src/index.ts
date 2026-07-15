/**
 * logistix-core-ts
 *
 * Single source of truth for enums, config, and utilities shared
 * across logistix-backend, logistix-workers, and logistix-web.
 *
 * Usage:
 *   import { UserRole, REGIONAL_CONFIG } from 'logistix-core-ts';
 */

// ─── Enums ────────────────────────────────────────────────────────────────────
export {
  UserRole,
  ActorType,
  DeliveryStatus,
  PaymentMethod,
  RiderStatus,
  ApprovalStatus,
  EntityType,
  ChannelPlatform,
  NodeEnv,
  VehicleType,
  SubscriptionTier,
  SubscriptionStatus,
  TransactionStatus,
  TransactionType,
  LedgerAdjustmentType,
  ChannelType,
  Currency,
  PaymentProvider,
  EventType,
  SubscriptionEventType,
  NotificationEventType,
  NotificationPriority,
  UserAuditAction,
  ChatUpdateType,
  MessageStatus,
  EscalationStatus,
  EscalatedTo,
  SenderType,
  ExportRequestStatus,
  SecurityEventType,
  SecuritySeverity,
  ErrorCode,
  SystemStatus,
  ComponentStatus,
  LlmRole,
  ProviderRole,
  ProviderCapability,
  LogLevel,
  ApiTag,
  UpdateReason,
  SseEventType,
  JwtTokenType,
  ContactCategory,
  DayOfWeek,
  isDeliveryTerminal,
} from './enums.js';

// ─── Config ───────────────────────────────────────────────────────────────────
export {
  buildSystemConfig,
  SHARED_SYSTEM_CONFIG,
  DEFAULT_WORKING_HOURS,
  BRAND_NAME,
  DELETED_USER_SENTINEL,
} from './config.js';
export type { SystemConfig, BankDetails, WorkingHoursEntry } from './config.js';

// ─── Regional ─────────────────────────────────────────────────────────────────
export { REGIONAL_CONFIG } from './regional.js';
export type { RegionalConfig } from './regional.js';

// ─── Limits ───────────────────────────────────────────────────────────────────
export { LIMITS_CONFIG, TIER_LIMITS, getTierLimits } from './limits.js';
export type { TierLimits, LimitsConfig } from './limits.js';

// ─── Billing ──────────────────────────────────────────────────────────────────
export {
  BILLING_CONFIG,
  DATA_RETENTION,
  CHANNEL_FEES,
  DEDICATED_TIERS,
  KOBO_PER_NAIRA,
  MS_PER_DAY,
  getSubscriptionPrice,
  formatAmount,
  isBillableTier,
  shouldBillNow,
  shouldRetryPayment,
  getNextRetryDate,
} from './billing.js';

// ─── Services ────────────────────────────────────────────────────────────────
export {
  EmailService,
  type EmailAttachment,
  type SendEmailOptions,
} from './services/email.service.js';

// ─── Security ─────────────────────────────────────────────────────────────────
export { SECURITY_CONFIG } from './security.js';
export type { SecurityConfig } from './security.js';

// ─── Pricing ──────────────────────────────────────────────────────────────────
export { DEFAULT_PRICING_SCHEMES } from './pricing-constants.js';
export type { PricingSchemeDefaults } from './pricing-constants.js';

// ─── AI ───────────────────────────────────────────────────────────────────────
export { AI_CONFIG } from './ai.js';
export type { AIConfig } from './ai.js';

// ─── Utilities ────────────────────────────────────────────────────────────────
export { fetchWithTimeout } from './fetch-with-timeout.js';

// ─── Contact Form ─────────────────────────────────────────────────────────────
export {
  sendContactSubmissionAck,
  type ContactSubmission,
  type ContactNotifierOptions,
} from './contact.js';

// ─── Offline / Local-First ────────────────────────────────────────────────────
export { OFFLINE_DB_NAME } from './offline.js';

// ─── Tracking ─────────────────────────────────────────────────────────────────
export {
  TRACKING_ID_PREFIX,
  TRACKING_ID_SUFFIX_LENGTH,
  TRACKING_ID_LENGTH,
  TRACKING_ID_CHARS,
} from './tracking.js';

// ─── Domain Entity Types ─────────────────────────────────────────────────────
export type { DeliveryBase, RiderBase, DispatcherBase } from './domain.js';

// ─── Formatters ───────────────────────────────────────────────────────────────
export { formatDeliveryStatus, formatEnumToTitleCase } from './formatters.js';

// ─── Drizzle ORM Schema ───────────────────────────────────────────────────────
export * from './drizzle/index.js';
