export enum UserRole {
  ADMIN = 'ADMIN',
  DISPATCHER = 'DISPATCHER',
  RIDER = 'RIDER',
}

export enum AdminRole {
  OPERATOR = 'OPERATOR',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum DispatcherRole {
  OWNER = 'OWNER',
  STAFF = 'STAFF',
}

export enum DeliveryStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

export enum PaymentMethod {
  PREPAID = 'PREPAID',
  PAY_ON_DELIVERY = 'PAY_ON_DELIVERY',
}

export enum PaymentStatus {
  AWAITING = 'AWAITING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum RiderStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  BUSY = 'BUSY',
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
  DISABLED = 'DISABLED',
}

export type CompanyAccessLevel = 'FULL' | 'TRIAL' | 'PAST_DUE' | 'RESTRICTED';
export const CompanyAccessLevel = {
  FULL: 'FULL',
  TRIAL: 'TRIAL',
  PAST_DUE: 'PAST_DUE',
  RESTRICTED: 'RESTRICTED',
} as const;

export enum EntityType {
  USER = 'USER',
  DELIVERY = 'DELIVERY',
  RIDER = 'RIDER',
  COMPANY = 'COMPANY',
  DISPATCHER = 'DISPATCHER',
  SYSTEM = 'SYSTEM',
  COMPANY_CHANNEL = 'COMPANY_CHANNEL',
  MESSAGE = 'MESSAGE',
}

export enum ChannelPlatform {
  WHATSAPP = 'WHATSAPP',
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
  TIKTOK = 'TIKTOK',
}

export enum CompanyChannelStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
  REJECTED = 'REJECTED',
  REMOVED = 'REMOVED',
}

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export enum VehicleType {
  BIKE = 'BIKE',
}

export enum SubscriptionTier {
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
}

export enum SubscriptionStatus {
  TRIAL = 'TRIAL',
  ACTIVE = 'ACTIVE',
  CANCELLING = 'CANCELLING',
  PAST_DUE = 'PAST_DUE',
  CANCELLED = 'CANCELLED',
}

/**
 * Derived subscription health surfaced to clients (wire value = member string).
 * Backend computes it via `deriveSubscriptionHealth`; clients use the served
 * value and fall back to their own derivation only when it is absent.
 */
export enum SubscriptionHealth {
  HEALTHY = 'HEALTHY',
  IN_TRIAL = 'IN_TRIAL',
  PAST_DUE = 'PAST_DUE',
  EXPIRING_SOON = 'EXPIRING_SOON',
  CANCELLED = 'CANCELLED',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REVERSED = 'REVERSED',
}

export enum TransactionType {
  DELIVERY_PAYMENT = 'DELIVERY_PAYMENT',
  SUBSCRIPTION = 'SUBSCRIPTION',
  ADJUSTMENT = 'ADJUSTMENT',
  SETTLEMENT = 'SETTLEMENT',
  REFUND = 'REFUND',
}

export enum LedgerAdjustmentType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  CORRECTION = 'CORRECTION',
  CHANNEL_FEE = 'CHANNEL_FEE',
  OVERAGE = 'OVERAGE',
  REFUND = 'REFUND',
}

export enum ChannelType {
  SYSTEM_POOL = 'SYSTEM_POOL',
  MY_CHANNEL = 'MY_CHANNEL',
}

export enum Currency {
  NGN = 'NGN',
}

export enum PaymentProvider {
  SQUAD = 'SQUAD',
  SYSTEM = 'SYSTEM',
}

export enum EventType {
  DELIVERY_ASSIGNED = 'DELIVERY_ASSIGNED',
  DELIVERY_UPDATED = 'DELIVERY_UPDATED',
  DELIVERY_CREATED = 'DELIVERY_CREATED',
  DELIVERY_STATUS_CHANGED = 'DELIVERY_STATUS_CHANGED',
  DELIVERY_DELETED = 'DELIVERY_DELETED',
  RIDER_LOCATION_UPDATED = 'RIDER_LOCATION_UPDATED',
  RIDER_ACCEPTED = 'RIDER_ACCEPTED',
  RIDER_CREATED = 'RIDER_CREATED',
  RIDER_UPDATED = 'RIDER_UPDATED',
  RIDER_STATUS_CHANGED = 'RIDER_STATUS_CHANGED',
  RIDER_DELETED = 'RIDER_DELETED',
  RIDER_DOCUMENTS_VERIFIED = 'RIDER_DOCUMENTS_VERIFIED',
  RIDER_DOCUMENTS_REJECTED = 'RIDER_DOCUMENTS_REJECTED',
  // Retained: members of the `EventType` pgEnum (migration 0000_initial.sql); DB-backed —
  // removing them would require `ALTER TYPE ... DROP VALUE`. No production code emits them.
  CHANNEL_SETUP = 'CHANNEL_SETUP',
  CHANNEL_ACTIVATED = 'CHANNEL_ACTIVATED',
  CHANNEL_DEACTIVATED = 'CHANNEL_DEACTIVATED',
  CHANNEL_REJECTED = 'CHANNEL_REJECTED',
  CHANNEL_REMOVED = 'CHANNEL_REMOVED',
  SUBSCRIPTION_STATUS_CHANGED = 'SUBSCRIPTION_STATUS_CHANGED',
  DISPATCHER_CREATED = 'DISPATCHER_CREATED',
  DISPATCHER_UPDATED = 'DISPATCHER_UPDATED',
  DISPATCHER_STATUS_CHANGED = 'DISPATCHER_STATUS_CHANGED',
  DISPATCHER_DELETED = 'DISPATCHER_DELETED',
  AI_EXECUTION = 'AI_EXECUTION',
  SECURITY_INCIDENT = 'SECURITY_INCIDENT',
  ADMIN_PROOF_READ = 'ADMIN_PROOF_READ',
  ADMIN_DOCUMENT_READ = 'ADMIN_DOCUMENT_READ',
  COMPANY_ACTIVATED = 'COMPANY_ACTIVATED',
  COMPANY_DEACTIVATED = 'COMPANY_DEACTIVATED',
  COMPANY_TIER_CHANGED = 'COMPANY_TIER_CHANGED',
  COMPANY_VERIFIED = 'COMPANY_VERIFIED',
  COMPANY_VERIFICATION_REJECTED = 'COMPANY_VERIFICATION_REJECTED',
  USER_PURGED = 'USER_PURGED',
  CANCELLED_PAYMENT_TIMEOUT = 'CANCELLED_PAYMENT_TIMEOUT',
  DOWNGRADE = 'DOWNGRADE',
  MESSAGE_DELETED = 'MESSAGE_DELETED',
  LEDGER_ADJUSTED = 'LEDGER_ADJUSTED',
}

export enum SubscriptionEventType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
  ASSIGNED = 'ASSIGNED',
  STATUS_CHANGED = 'STATUS_CHANGED',
  UNASSIGNED = 'UNASSIGNED',
}

export type UserAuditAction = 'LOGIN' | 'LOGOUT' | 'PROFILE_UPDATE' | 'DEACTIVATED';
export const UserAuditAction = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  PROFILE_UPDATE: 'PROFILE_UPDATE',
  DEACTIVATED: 'DEACTIVATED',
} as const;

export enum ChannelsUpdateType {
  MESSAGE = 'MESSAGE',
  OWNERSHIP = 'OWNERSHIP',
  CONVERSATION = 'CONVERSATION',
  CHANNEL = 'CHANNEL',
  AI_THINKING = 'AI_THINKING',
}

export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
}

export const MESSAGE_STATUS_RANK: Record<MessageStatus, number> = {
  [MessageStatus.SENT]: 1,
  [MessageStatus.DELIVERED]: 2,
  [MessageStatus.READ]: 3,
  [MessageStatus.FAILED]: 4,
};

export enum EscalationStatus {
  OPEN = 'OPEN',
  RESOLVED = 'RESOLVED',
  TAKEN_OVER = 'TAKEN_OVER',
}

export enum EscalatedTo {
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
  // Retained: member of the `EscalatedTo` pgEnum (migration 0000_initial.sql); DB-backed.
  DISPATCHER = 'DISPATCHER',
}

export enum SenderType {
  CUSTOMER = 'CUSTOMER',
  AGENT = 'AGENT',
  DISPATCHER = 'DISPATCHER',
  SYSTEM = 'SYSTEM',
}

export enum JobStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export type SecurityEventType = 'RATE_LIMIT' | 'MALICIOUS_REQUEST' | 'BRUTE_FORCE';
export const SecurityEventType = {
  RATE_LIMIT: 'RATE_LIMIT',
  MALICIOUS_REQUEST: 'MALICIOUS_REQUEST',
  BRUTE_FORCE: 'BRUTE_FORCE',
} as const;

export enum SecuritySeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',

  BULK_DELIVERY_CREATION = 'BULK_DELIVERY_CREATION',
  OPERATIONAL_AVAILABILITY = 'OPERATIONAL_AVAILABILITY',
  CHAT_PROCESSOR_HYDRATION = 'CHAT_PROCESSOR_HYDRATION',
  CHAT_PROCESSOR_INFERENCE = 'CHAT_PROCESSOR_INFERENCE',
  CHAT_PROCESSOR_PIPELINE = 'CHAT_PROCESSOR_PIPELINE',
  PROVIDER_CONFIG_LOAD = 'PROVIDER_CONFIG_LOAD',
  PAYMENT_POST_PROCESSING = 'PAYMENT_POST_PROCESSING',
  LLM_FAILOVER = 'LLM_FAILOVER',

  INTER_STATE_DELIVERY = 'INTER_STATE_DELIVERY',
  COMPANY_CLOSED = 'COMPANY_CLOSED',
  COMPANY_NOT_OPEN_YET = 'COMPANY_NOT_OPEN_YET',
  COMPANY_NOT_OPERATING_TODAY = 'COMPANY_NOT_OPERATING_TODAY',
  TIER_LIMIT_EXCEEDED = 'TIER_LIMIT_EXCEEDED',
  NO_DELIVERIES_PROVIDED = 'NO_DELIVERIES_PROVIDED',
  INVALID_ACTOR = 'INVALID_ACTOR',

  CHANNEL_PLATFORM_ID_CONFLICT = 'CHANNEL_PLATFORM_ID_CONFLICT',
  CHANNEL_ACTIVATION_FAILED = 'CHANNEL_ACTIVATION_FAILED',

  NETWORK_ERROR = 'NETWORK_ERROR',
  INVALID = 'INVALID',
  PIN_REQUIRED = 'PIN_REQUIRED',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Job queue type identifiers shared across backend (enqueue) and workers
 * (drain). Never define a second copy; add new job types here.
 */
export enum JobType {
  DELIVERY_NOTIFICATION = 'delivery-notification',
  SQUAD_WEBHOOK = 'squad-webhook',
  EXPORT = 'export',
  AI_BATCH = 'ai:batch',
}

export enum SystemStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  DEGRADED = 'DEGRADED',
}

export enum LlmRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

export enum ProviderRole {
  INTERPRET = 'interpret',
  SYNTHESIZE = 'synthesize',
}

export enum ProviderCapability {
  JSON = 'json',
  TOOLS = 'tools',
  VISION = 'vision',
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  SILENT = 'silent',
}

export enum ApiTag {
  TRACKING = 'Tracking',
  AUTH = 'Auth',
  CONTACT = 'Contact',
  BILLING = 'Billing',
  ADMIN = 'Admin',
  GRAPHQL = 'GraphQL',
  SYSTEM = 'System',
  ONBOARDING = 'Onboarding',
}

export enum SseEventType {
  CONNECTED = 'connected',
  DELIVERY = 'delivery',
  RIDER = 'rider',
  MESSAGE = 'message',
  INITIAL = 'initial',
  COMPANY = 'company',
  RIDER_LOCATION = 'rider-location',
  TYPING = 'typing',
}

export enum JwtTokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export enum DevicePlatform {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  WEB = 'WEB',
}

export enum AuditActorType {
  USER = 'USER',
  SYSTEM = 'SYSTEM',
  ANONYMOUS = 'ANONYMOUS',
}

export enum ContactCategory {
  PARTNERSHIP = 'Become a Partner',
  BUSINESS = 'For Business',
  SUPPORT = 'Support',
  TRACKING_INQUIRY = 'Tracking Inquiry',
  FEEDBACK = 'Feedback',
}

export enum IdType {
  NIN = 'NIN',
  DRIVER_LICENSE = 'DRIVER_LICENSE',
  PASSPORT = 'PASSPORT',
}

export enum ConversationHandlerType {
  AI = 'AI',
  DISPATCHER = 'DISPATCHER',
  ADMIN = 'ADMIN',
}

export enum ExportDataType {
  DELIVERIES = 'DELIVERIES',
  BILLING = 'BILLING',
  CHAT = 'CHAT',
}

export enum ExportReason {
  QUEUED = 'QUEUED',
  DUPLICATE = 'DUPLICATE',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
}

export enum FcmNotificationType {
  SUBSCRIPTION_CANCELLED = 'SUBSCRIPTION_CANCELLED',
  DELIVERY_ASSIGNED = 'DELIVERY_ASSIGNED',
  COMPANY_STATUS_CHANGED = 'COMPANY_STATUS_CHANGED',
  SETTLEMENT_FAILED = 'SETTLEMENT_FAILED',
  SETTLEMENT_REVERSAL = 'SETTLEMENT_REVERSAL',
  HUMAN_REQUEST = 'HUMAN_REQUEST',
  DELIVERY_ANOMALY = 'DELIVERY_ANOMALY',
  RAPID_STATUS_CHANGES = 'RAPID_STATUS_CHANGES',
  RIDER_SILENT_BAN = 'RIDER_SILENT_BAN',
}

/**
 * Scope of a deliverySync query. Wire value = member string, matching the
 * backend GraphQL enum `DeliverySyncScope`.
 */
export enum DeliverySyncScope {
  RIDER = 'RIDER',
  COMPANY = 'COMPANY',
}

/**
 * Admin escalation mutation action. Wire value = member string, matching the
 * backend GraphQL enum `AdminEscalationAction`.
 */
export enum AdminEscalationAction {
  TAKE_OVER = 'TAKE_OVER',
  RESOLVE = 'RESOLVE',
}

export enum NotificationPriority {
  URGENT = 'URGENT',
}

/**
 * Why an undelivered delivery was auto-expired by the expiry job.
 * Wire values match the delivery-expiry service's inline constants exactly.
 */
export type DeliveryExpiryReason =
  | 'STALE_PENDING_DELIVERY'
  | 'SCHEDULED_WINDOW_MISSED'
  | 'RIDER_SILENT'
  | 'IN_TRANSIT_STALL';
export const DeliveryExpiryReason = {
  STALE_PENDING_DELIVERY: 'STALE_PENDING_DELIVERY',
  SCHEDULED_WINDOW_MISSED: 'SCHEDULED_WINDOW_MISSED',
  RIDER_SILENT: 'RIDER_SILENT',
  IN_TRANSIT_STALL: 'IN_TRANSIT_STALL',
} as const;

export enum DayOfWeek {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

/**
 * Metric domains stored in the unified `metrics` table. Wire value = member
 * string (UPPERCASE_WITH_UNDERSCORES), matching the backend GraphQL enum.
 */
export enum MetricDomain {
  DELIVERIES = 'DELIVERIES',
  CONVERSATIONS = 'CONVERSATIONS',
  RIDERS = 'RIDERS',
  REVENUE = 'REVENUE',
}

/**
 * Bucket granularity for the unified `metrics` table. Coarser tiers are
 * derived from finer ones by the workers' compression ladder.
 */
export enum MetricGranularity {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  LIFETIME = 'LIFETIME',
}

export const ALL_DAYS: readonly DayOfWeek[] = Object.values(DayOfWeek);

// Categories that should generate leads in external CRM/Sheets
// Uses enum members so display strings can change without breaking logic
export const LEAD_CATEGORIES: ReadonlySet<ContactCategory> = new Set([
  ContactCategory.PARTNERSHIP,
  ContactCategory.BUSINESS,
]);

/**
 * CAC verification verdicts written to `companies.metadata.cacVerification` by
 * the CAC verification cron. Wire values = the strings stored in the metadata
 * JSON; single source for the workers' writer and the web admin's reader.
 */
export const CAC_EVIDENCE_STATUS = {
  FOUND: 'FOUND',
  INACTIVE: 'INACTIVE',
  NOT_FOUND: 'NOT_FOUND',
  ERROR: 'ERROR',
} as const;

export type CACEvidenceStatus = (typeof CAC_EVIDENCE_STATUS)[keyof typeof CAC_EVIDENCE_STATUS];

/**
 * Safely look up an enum value by its string representation.
 * Returns `undefined` instead of crashing on unknown values.
 *
 * @example
 * safeEnumValue(DeliveryStatus, 'IN_TRANSIT') // DeliveryStatus.IN_TRANSIT
 * safeEnumValue(DeliveryStatus, 'UNKNOWN')   // undefined
 */
export function safeEnumValue<T extends Record<string, string>>(
  enumObj: T,
  value: string,
): T[keyof T] | undefined {
  const values = Object.values(enumObj) as string[];
  return values.includes(value) ? (value as T[keyof T]) : undefined;
}
