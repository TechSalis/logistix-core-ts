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
  CompanyChannelStatus,
  NodeEnv,
  VehicleType,
  SubscriptionTier,
  SubscriptionStatus,
  SubscriptionHealth,
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
  MESSAGE_STATUS_RANK,
  EscalationStatus,
  EscalatedTo,
  SenderType,
  IdType,
  ConversationHandlerType,
  ExportDataType,
  ExportReason,
  JobStatus,
  JobType,
  SecurityEventType,
  SecuritySeverity,
  ErrorCode,
  DayOfWeek,
  WEEKDAYS,
  MetricDomain,
  MetricGranularity,
  SystemStatus,
  LlmRole,
  ProviderRole,
  ProviderCapability,
  LogLevel,
  ApiTag,
  SseEventType,
  FcmNotificationType,
  NotificationPriority,
  DeliveryExpiryReason,
  JwtTokenType,
  ContactCategory,
  safeEnumValue,
  LEAD_CATEGORIES,
  CAC_EVIDENCE_STATUS,
  type CACEvidenceStatus,
} from './enums/enums.js';

// ─── Config ───────────────────────────────────────────────────────────────────
export {
  buildSystemConfig,
  BRAND_NAME,
  DELETED_USER_SENTINEL,
  SYSTEM_ACTOR_ID,
  SHARED_SYSTEM_CONFIG,
} from './config/system.config.js';
export type { SystemConfig, BankDetails } from './config/system.config.js';

// ─── Regional ─────────────────────────────────────────────────────────────────
export { REGIONAL_CONFIG, REGIONAL_LOCALE, HQ_LOCATION } from './config/regional.config.js';

// ─── Timezone ─────────────────────────────────────────────────────────────────
export {
  getMonthStartInTimezone,
  getStartOfDayInTimezone,
  getRetentionCutoff,
  getDateStringInTimezone,
} from './utils/timezone.js';

// ─── Limits ───────────────────────────────────────────────────────────────────
export {
  LIMITS_CONFIG,
  TIER_LIMITS,
  getTierLimits,
  DEFAULT_MESSAGE_LIMIT,
} from './config/limits.config.js';
export type { TierLimits } from './config/limits.config.js';

// ─── Delivery rules ───────────────────────────────────────────────────────────
export { ALLOWED_STATUS_TRANSITIONS } from './config/delivery.config.js';

// ─── Client config ────────────────────────────────────────────────────────────
export { CLIENT_CONFIG } from './config/client.config.js';

// ─── Export ───────────────────────────────────────────────────────────────────
export { VALID_DATA_TYPES, MONTH_REQUIRED_TYPES, EXPORT_JOB_TYPE } from './config/export.config.js';
export type { DataType } from './config/export.config.js';

// ─── Retention ────────────────────────────────────────────────────────────────
export { RETENTION_CONFIG } from './config/retention.config.js';

// ─── Metrics ──────────────────────────────────────────────────────────────────
export {
  METRICS_RETENTION,
  METRICS_FOLD_CHAIN,
  METRIC_DOMAINS,
  METRIC_DOMAIN_MAPPINGS,
  LIFETIME_BUCKET_START,
  MAX_TREND_WINDOW_DAYS,
  granularityForWindowDays,
  windowExceedsDayRetention,
  isLifetime,
} from './config/metrics.config.js';

// ─── Billing ──────────────────────────────────────────────────────────────────
export {
  BILLING_CONFIG,
  DATA_RETENTION,
  CHANNEL_FEES,
  DEDICATED_TIERS,
  SUPPORT_SLA,
  KOBO_PER_NAIRA,
  getSubscriptionPrice,
  formatAmount,
  formatNaira,
  isBillableTier,
  shouldBillNow,
  shouldRetryPayment,
  computeAccessLevel,
} from './config/billing.config.js';

// ─── Shared payment allocation ───────────────────────────────────────────────
export {
  getTotalPaidForDeliveries,
  applyPaymentStatusUpdate,
  processPaymentAllocation,
} from './services/payments.js';
export type { PaymentAllocationTransaction, PaymentAllocationResult } from './services/payments.js';

// ─── Squad client ────────────────────────────────────────────────────────────
export { SquadClient, SquadRequestError } from './services/squad-client.js';

// ─── Services ────────────────────────────────────────────────────────────────
export { EmailService } from './services/email.service.js';
export { queueService, PermanentJobError, type QueueHandler } from './services/queue.service.js';
export { QUEUE_SERVICE_CONFIG } from './config/service.config.js';

// ─── Security ─────────────────────────────────────────────────────────────────
export { SECURITY_CONFIG } from './config/security.config.js';

// ─── Utilities ────────────────────────────────────────────────────────────────
export { fetchWithTimeout } from './utils/fetch-with-timeout.js';
export { MS_PER_DAY, addDays } from './utils/time.js';
export { mergeChannelCounts } from './utils/metrics.js';
export { extractErrorMessage, extractErrorContext } from './utils/error-utils.js';

// ─── Retry ────────────────────────────────────────────────────────────────────
export {
  withRetry,
  sleep,
  RETRYABLE_NETWORK_ERROR_CODES,
  RETRYABLE_SQLSTATE_CODES,
  type WithRetryOptions,
} from './utils/retry.js';

// ─── FCM Push Notifications ───────────────────────────────────────────────────
export { FcmService, type FcmCredentials } from './services/fcm-sender.js';

// ─── Tracking ─────────────────────────────────────────────────────────────────
export {
  TRACKING_ID_PREFIX,
  TRACKING_ID_SUFFIX_LENGTH,
  TRACKING_ID_LENGTH,
  TRACKING_ID_CHARS,
  TRACKING_ID_ALPHABET,
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
  ChannelCredentials,
  CompanyChannelMetadata,
  DeliveryMetadata,
  RiderMetadata,
  CompanyMetadata,
  CacVerificationEvidence,
  TransactionMetadata,
  ChatMessageMetadata,
  LedgerMetadata,
} from './types/metadata.js';

// ─── Drizzle ORM Schema ───────────────────────────────────────────────────────
export * from './drizzle/index.js';
