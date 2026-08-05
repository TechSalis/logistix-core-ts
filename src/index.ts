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
} from './enums/enums.js';

// ─── Config ───────────────────────────────────────────────────────────────────
export {
  buildSystemConfig,
  BRAND_NAME,
  DELETED_USER_SENTINEL,
  SYSTEM_ACTOR_ID,
  SHARED_SYSTEM_CONFIG,
} from './config/system.config.js';
export type { SystemConfig, BankDetails, WorkingHoursEntry } from './config/system.config.js';

// ─── Regional ─────────────────────────────────────────────────────────────────
export { REGIONAL_CONFIG, REGIONAL_LOCALE, HQ_LOCATION } from './config/regional.config.js';
export type { RegionalConfig } from './config/regional.config.js';

// ─── Timezone ─────────────────────────────────────────────────────────────────
export {
  getMonthStartInTimezone,
  getStartOfDayInTimezone,
  getRetentionCutoff,
} from './utils/timezone.js';

// ─── Limits ───────────────────────────────────────────────────────────────────
export { LIMITS_CONFIG, TIER_LIMITS, getTierLimits } from './config/limits.config.js';
export type { TierLimits, LimitsConfig } from './config/limits.config.js';

// ─── Retention ────────────────────────────────────────────────────────────────
export { RETENTION_CONFIG } from './config/retention.config.js';
export type { RetentionConfig } from './config/retention.config.js';

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
} from './config/billing.config.js';
export type { AllocationDeliveryInput, AllocationTarget } from './config/billing.config.js';

// ─── Shared payment allocation ───────────────────────────────────────────────
export {
  getTotalPaidForDeliveries,
  applyPaymentStatusUpdate,
  processPaymentAllocation,
} from './services/payments.js';
export type { PaymentAllocationTransaction, PaymentAllocationResult } from './services/payments.js';

// ─── Squad client ────────────────────────────────────────────────────────────
export {
  SquadClient,
  SquadRequestError,
  type SquadClientOptions,
  type ChargeCardParams,
  type ChargeCardResult,
} from './services/squad-client.js';

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
export { QUEUE_SERVICE_CONFIG, FCM_SERVICE_CONFIG } from './config/service.config.js';

// ─── Security ─────────────────────────────────────────────────────────────────
export { SECURITY_CONFIG } from './config/security.config.js';
export type { SecurityConfig } from './config/security.config.js';

// ─── Utilities ────────────────────────────────────────────────────────────────
export { fetchWithTimeout } from './utils/fetch-with-timeout.js';
export { MS_PER_DAY, addDays } from './utils/time.js';
export { mergeChannelCounts } from './utils/metrics.js';
export { extractErrorMessage, extractErrorContext } from './utils/error-utils.js';

// ─── Retry ────────────────────────────────────────────────────────────────────
export { withRetry, sleep, isTransientHttpError, type WithRetryOptions } from './utils/retry.js';

// ─── FCM Push Notifications ───────────────────────────────────────────────────
export {
  FcmService,
  type FcmCredentials,
  type FcmMessage,
  type FcmResponse,
} from './services/fcm-sender.js';

// ─── Tracking ─────────────────────────────────────────────────────────────────
export {
  TRACKING_ID_PREFIX,
  TRACKING_ID_SUFFIX_LENGTH,
  TRACKING_ID_LENGTH,
  TRACKING_ID_CHARS,
} from './utils/tracking.js';

// ─── Domain Entity Types ─────────────────────────────────────────────────────
export type { DeliveryBase, RiderBase, DispatcherBase } from './types/domain.js';

// ─── Formatters ───────────────────────────────────────────────────────────────
export { formatDeliveryStatus, formatEnumToTitleCase } from './utils/formatters.js';

// ─── Enum Catalog ─────────────────────────────────────────────────────────────
export { ENUM_CATALOG, type EnumValue, type EnumCatalog } from './enums/enum-catalog.js';

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
} from './types/metadata.js';

// ─── Drizzle ORM Schema ───────────────────────────────────────────────────────
export * from './drizzle/index.js';
