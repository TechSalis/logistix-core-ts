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
  AdminRole,
  DispatcherRole,
  DeliveryStatus,
  PaymentMethod,
  PaymentStatus,
  RiderStatus,
  ApprovalStatus,
  CompanyAccessLevel,
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
  UserAuditAction,
  ChatUpdateType,
  MessageStatus,
  EscalationStatus,
  EscalatedTo,
  SenderType,
  IdType,
  ConversationHandlerType,
  ExportDataType,
  ExportRequestStatus,
  JobStatus,
  SecurityEventType,
  SecuritySeverity,
  ErrorCode,
  DayOfWeek,
  WEEKDAYS,
  SystemStatus,
  LlmRole,
  ProviderRole,
  ProviderCapability,
  LogLevel,
  ApiTag,
  SseEventType,
  FcmNotificationType,
  JwtTokenType,
  ContactCategory,
  safeEnumValue,
  LEAD_CATEGORIES,
} from './enums.js';

// ─── Config ───────────────────────────────────────────────────────────────────
export {
  buildSystemConfig,
  BRAND_NAME,
  DELETED_USER_SENTINEL,
  SYSTEM_ACTOR_ID,
  SHARED_SYSTEM_CONFIG,
} from './config.js';
export type { SystemConfig, BankDetails, WorkingHoursEntry } from './config.js';

// ─── Regional ─────────────────────────────────────────────────────────────────
export { REGIONAL_CONFIG, REGIONAL_LOCALE, HQ_LOCATION } from './regional.js';
export type { RegionalConfig } from './regional.js';

// ─── Timezone ─────────────────────────────────────────────────────────────────
export { getMonthStartInTimezone, getStartOfDayInTimezone } from './timezone.js';

// ─── Limits ───────────────────────────────────────────────────────────────────
export { LIMITS_CONFIG, TIER_LIMITS, getTierLimits } from './limits.js';
export type { TierLimits, LimitsConfig } from './limits.js';

// ─── Retention ────────────────────────────────────────────────────────────────
export { RETENTION_CONFIG } from './retention.js';
export type { RetentionConfig } from './retention.js';

// ─── Billing ──────────────────────────────────────────────────────────────────
export {
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
} from './billing.js';
export type { AllocationDeliveryInput, AllocationTarget } from './billing.js';

// ─── Shared payment allocation ───────────────────────────────────────────────
export {
  getTotalPaidForDeliveries,
  applyPaymentStatusUpdate,
  processPaymentAllocation,
} from './payments.js';
export type { PaymentAllocationTransaction, PaymentAllocationResult } from './payments.js';

// ─── Services ────────────────────────────────────────────────────────────────
export {
  EmailService,
  type EmailAttachment,
  type SendEmailOptions,
} from './services/email.service.js';
export {
  queueService,
  type QueueHandler,
  type DrainOptions,
  type DrainResult,
  type EnqueueOptions,
} from './services/queue.service.js';

// ─── Security ─────────────────────────────────────────────────────────────────
export { SECURITY_CONFIG } from './security.js';
export type { SecurityConfig } from './security.js';

// ─── Utilities ────────────────────────────────────────────────────────────────
export { fetchWithTimeout, DEFAULT_TIMEOUT_MS } from './fetch-with-timeout.js';
export { extractErrorMessage, extractErrorContext } from './error-utils.js';

// ─── Retry ────────────────────────────────────────────────────────────────────
export { withRetry, sleep, isTransientHttpError, type WithRetryOptions } from './retry.js';

// ─── FCM Push Notifications ───────────────────────────────────────────────────
export {
  FcmService,
  type FcmCredentials,
  type FcmMessage,
  type FcmResponse,
} from './fcm-sender.js';

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

// ─── Enum Catalog ─────────────────────────────────────────────────────────────
export { ENUM_CATALOG, type EnumValue, type EnumCatalog } from './enum-catalog.js';

// ─── Metadata Types ──────────────────────────────────────────────────────────
export type {
  ConversationMetadata,
  CompanyChannelMetadata,
  ExportRequestMetadata,
  DeliveryMetadata,
  RiderMetadata,
  CompanyMetadata,
  TransactionMetadata,
  ChatMessageMetadata,
  LedgerMetadata,
} from './metadata.js';

// ─── Drizzle ORM Schema ───────────────────────────────────────────────────────
export * from './drizzle/index.js';
