/**
 * Shared modules — pure code with zero server dependencies.
 *
 * Usage:
 *   import { UserRole, REGIONAL_CONFIG } from 'logistix-core-ts/shared';
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
  PaymentProvider,
  EventType,
  SubscriptionEventType,
  UserAuditAction,
  MessageStatus,
  MESSAGE_STATUS_RANK,
  EscalationStatus,
  EscalatedTo,
  SenderType,
  IdType,
  ConversationHandlerType,
  ExportDataType,
  ExportReason,
  JobType,
  SecurityEventType,
  SecuritySeverity,
  ErrorCode,
  DayOfWeek,
  ALL_DAYS,
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
  DeliveryExpiryReason,
  JwtTokenType,
  ContactCategory,
  DevicePlatform,
  AuditActorType,
  DeliverySyncScope,
  AdminEscalationAction,
  AdminDeliveryAction,
  ConversationScope,
  safeEnumValue,
  LEAD_CATEGORIES,
  CAC_EVIDENCE_STATUS,
  type CACEvidenceStatus,
} from './enums/enums.js';

export { ENUM_CATALOG, type EnumValue, type EnumCatalog } from './enums/enum-catalog.js';

// ─── Types ────────────────────────────────────────────────────────────────────
export { NOTIFICATION_PRIORITY } from './enums/enums.js';
export type { NotificationPriority } from './enums/enums.js';

export type { DeliveryBase, RiderBase, DispatcherBase } from './types/domain.js';

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

export { METADATA_KEYS, buildMetadata, validateMetadata } from './types/metadata.js';
export type { MetadataScope, MetadataKey, MetadataKeySpec } from './types/metadata.js';

// ─── Config ───────────────────────────────────────────────────────────────────
export {
  buildSystemConfig,
  DELETED_USER_SENTINEL,
  SYSTEM_ACTOR_ID,
  ADMIN_ACTOR_ID,
  DEFAULT_WORKING_HOURS,
} from './config/system.config.js';
export type { SystemConfig, BankDetails, WorkingHoursEntry } from './config/system.config.js';

export { getBrandConfig } from './config/brand.config.js';
export type { BrandConfig } from './config/brand.config.js';

export { REGIONAL_CONFIG, REGIONAL_LOCALE, HQ_LOCATION } from './config/regional.config.js';

export {
  LIMITS_CONFIG,
  PAGINATION_CONFIG,
  TIER_LIMITS,
  getTierLimits,
  DEFAULT_MESSAGE_LIMIT,
} from './config/limits.config.js';
export type { TierLimits } from './config/limits.config.js';

export { ALLOWED_STATUS_TRANSITIONS } from './config/delivery.config.js';

export { DEFAULT_PRICING_SCHEMES } from './config/pricing.config.js';

export { CLIENT_CONFIG } from './config/client.config.js';

export { VALID_DATA_TYPES, MONTH_REQUIRED_TYPES } from './config/export.config.js';
export type { DataType } from './config/export.config.js';

export { RETENTION_CONFIG } from './config/retention.config.js';

export {
  METRICS_RETENTION,
  METRICS_FOLD_CHAIN,
  METRIC_DOMAIN_MAPPINGS,
  LIFETIME_BUCKET_START,
  granularityForWindowDays,
} from './config/metrics.config.js';

export {
  BILLING_CONFIG,
  DATA_RETENTION,
  CHANNEL_FEES,
  DEDICATED_TIERS,
  SUPPORT_SLA,
  KOBO_PER_NAIRA,
  getSubscriptionPrice,
  formatAmount,
  isBillableTier,
  shouldBillNow,
  shouldRetryPayment,
  computeAccessLevel,
} from './config/billing.config.js';

export { QUEUE_SERVICE_CONFIG } from './config/service.config.js';

export { SECURITY_CONFIG } from './config/security.config.js';

export { SESSION_CONFIG } from './config/session.config.js';

// ─── Utils ────────────────────────────────────────────────────────────────────
export { fetchWithTimeout } from './utils/fetch-with-timeout.js';
export { MS_PER_DAY, addDays } from './utils/time.js';
export { haversineDistanceMeters, haversineDistanceKm } from './utils/geo.js';
export { mergeChannelCounts } from './utils/metrics.js';
export { extractErrorMessage, extractErrorContext } from './utils/error-utils.js';
export { computeExpiresAt, parseGraphError } from './utils/meta-graph.js';
export {
  withRetry,
  sleep,
  isTransientHttpError,
  RETRYABLE_NETWORK_ERROR_CODES,
  RETRYABLE_SQLSTATE_CODES,
  type WithRetryOptions,
} from './utils/retry.js';
export {
  TRACKING_ID_PREFIX,
  TRACKING_ID_SUFFIX_LENGTH,
  TRACKING_ID_LENGTH,
  TRACKING_ID_CHARS,
  TRACKING_ID_ALPHABET,
} from './utils/tracking.js';
export { formatDeliveryStatus, formatEnumToTitleCase } from './utils/formatters.js';
export {
  getMonthStartInTimezone,
  getStartOfDayInTimezone,
  getDayBoundsInTimezone,
  getRetentionCutoff,
  getDateStringInTimezone,
} from './utils/timezone.js';
