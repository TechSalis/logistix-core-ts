export {
  R as RETRYABLE_NETWORK_ERROR_CODES,
  a as RETRYABLE_SQLSTATE_CODES,
  W as WithRetryOptions,
  i as isTransientHttpError,
  s as sleep,
  w as withRetry,
} from '../retry-tolliO-l.js';

declare enum UserRole {
  ADMIN = 'ADMIN',
  DISPATCHER = 'DISPATCHER',
  RIDER = 'RIDER',
}
declare enum AdminRole {
  OPERATOR = 'OPERATOR',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
declare enum DispatcherRole {
  OWNER = 'OWNER',
  STAFF = 'STAFF',
}
declare enum DeliveryStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}
declare enum PaymentMethod {
  PREPAID = 'PREPAID',
  PAY_ON_DELIVERY = 'PAY_ON_DELIVERY',
}
declare enum PaymentStatus {
  AWAITING = 'AWAITING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
declare enum RiderStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  BUSY = 'BUSY',
}
declare enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
  DISABLED = 'DISABLED',
}
type CompanyAccessLevel = 'FULL' | 'TRIAL' | 'PAST_DUE' | 'RESTRICTED';
declare const CompanyAccessLevel: {
  readonly FULL: 'FULL';
  readonly TRIAL: 'TRIAL';
  readonly PAST_DUE: 'PAST_DUE';
  readonly RESTRICTED: 'RESTRICTED';
};
declare enum EntityType {
  USER = 'USER',
  DELIVERY = 'DELIVERY',
  RIDER = 'RIDER',
  COMPANY = 'COMPANY',
  DISPATCHER = 'DISPATCHER',
  SYSTEM = 'SYSTEM',
  COMPANY_CHANNEL = 'COMPANY_CHANNEL',
  MESSAGE = 'MESSAGE',
}
declare enum ChannelPlatform {
  WHATSAPP = 'WHATSAPP',
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
  TIKTOK = 'TIKTOK',
}
declare enum CompanyChannelStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
  REJECTED = 'REJECTED',
  REMOVED = 'REMOVED',
}
declare enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}
declare enum VehicleType {
  BIKE = 'BIKE',
}
declare enum SubscriptionTier {
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
}
declare enum SubscriptionStatus {
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
declare enum SubscriptionHealth {
  HEALTHY = 'HEALTHY',
  IN_TRIAL = 'IN_TRIAL',
  PAST_DUE = 'PAST_DUE',
  EXPIRING_SOON = 'EXPIRING_SOON',
  CANCELLED = 'CANCELLED',
}
declare enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REVERSED = 'REVERSED',
}
declare enum TransactionType {
  DELIVERY_PAYMENT = 'DELIVERY_PAYMENT',
  SUBSCRIPTION = 'SUBSCRIPTION',
  ADJUSTMENT = 'ADJUSTMENT',
  SETTLEMENT = 'SETTLEMENT',
  REFUND = 'REFUND',
}
declare enum LedgerAdjustmentType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  CORRECTION = 'CORRECTION',
  CHANNEL_FEE = 'CHANNEL_FEE',
  OVERAGE = 'OVERAGE',
  REFUND = 'REFUND',
}
declare enum ChannelType {
  SYSTEM_POOL = 'SYSTEM_POOL',
  MY_CHANNEL = 'MY_CHANNEL',
}
declare enum Currency {
  NGN = 'NGN',
}
declare enum PaymentProvider {
  SQUAD = 'SQUAD',
  SYSTEM = 'SYSTEM',
}
declare enum EventType {
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
declare enum SubscriptionEventType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
  ASSIGNED = 'ASSIGNED',
  STATUS_CHANGED = 'STATUS_CHANGED',
  UNASSIGNED = 'UNASSIGNED',
}
type UserAuditAction = 'LOGIN' | 'LOGOUT' | 'PROFILE_UPDATE' | 'DEACTIVATED';
declare const UserAuditAction: {
  readonly LOGIN: 'LOGIN';
  readonly LOGOUT: 'LOGOUT';
  readonly PROFILE_UPDATE: 'PROFILE_UPDATE';
  readonly DEACTIVATED: 'DEACTIVATED';
};
declare enum ChannelsUpdateType {
  MESSAGE = 'MESSAGE',
  OWNERSHIP = 'OWNERSHIP',
  CONVERSATION = 'CONVERSATION',
  CHANNEL = 'CHANNEL',
  AI_THINKING = 'AI_THINKING',
}
declare enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
}
declare const MESSAGE_STATUS_RANK: Record<MessageStatus, number>;
declare enum EscalationStatus {
  OPEN = 'OPEN',
  RESOLVED = 'RESOLVED',
  TAKEN_OVER = 'TAKEN_OVER',
}
declare enum EscalatedTo {
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
  DISPATCHER = 'DISPATCHER',
}
declare enum SenderType {
  CUSTOMER = 'CUSTOMER',
  AGENT = 'AGENT',
  DISPATCHER = 'DISPATCHER',
  ADMIN = 'ADMIN',
  SYSTEM = 'SYSTEM',
}
declare enum JobStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}
type SecurityEventType = 'RATE_LIMIT' | 'MALICIOUS_REQUEST' | 'BRUTE_FORCE';
declare const SecurityEventType: {
  readonly RATE_LIMIT: 'RATE_LIMIT';
  readonly MALICIOUS_REQUEST: 'MALICIOUS_REQUEST';
  readonly BRUTE_FORCE: 'BRUTE_FORCE';
};
declare enum SecuritySeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}
declare enum ErrorCode {
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
declare enum JobType {
  DELIVERY_NOTIFICATION = 'delivery-notification',
  SQUAD_WEBHOOK = 'squad-webhook',
  EXPORT = 'export',
  AI_BATCH = 'ai:batch',
}
declare enum SystemStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  DEGRADED = 'DEGRADED',
}
declare enum LlmRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}
declare enum ProviderRole {
  INTERPRET = 'interpret',
  SYNTHESIZE = 'synthesize',
}
declare enum ProviderCapability {
  JSON = 'json',
  TOOLS = 'tools',
  VISION = 'vision',
}
declare enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  SILENT = 'silent',
}
declare enum ApiTag {
  TRACKING = 'Tracking',
  AUTH = 'Auth',
  CONTACT = 'Contact',
  BILLING = 'Billing',
  ADMIN = 'Admin',
  GRAPHQL = 'GraphQL',
  SYSTEM = 'System',
  ONBOARDING = 'Onboarding',
}
declare enum SseEventType {
  CONNECTED = 'connected',
  DELIVERY = 'delivery',
  RIDER = 'rider',
  MESSAGE = 'message',
  INITIAL = 'initial',
  COMPANY = 'company',
  RIDER_LOCATION = 'rider-location',
  TYPING = 'typing',
}
declare enum JwtTokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}
declare enum DevicePlatform {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
  WEB = 'WEB',
}
declare enum AuditActorType {
  USER = 'USER',
  SYSTEM = 'SYSTEM',
  ANONYMOUS = 'ANONYMOUS',
}
declare enum ContactCategory {
  PARTNERSHIP = 'Become a Partner',
  BUSINESS = 'For Business',
  SUPPORT = 'Support',
  TRACKING_INQUIRY = 'Tracking Inquiry',
  FEEDBACK = 'Feedback',
}
declare enum IdType {
  NIN = 'NIN',
  DRIVER_LICENSE = 'DRIVER_LICENSE',
  PASSPORT = 'PASSPORT',
}
declare enum ConversationHandlerType {
  AI = 'AI',
  DISPATCHER = 'DISPATCHER',
  ADMIN = 'ADMIN',
}
declare enum ExportDataType {
  DELIVERIES = 'DELIVERIES',
  BILLING = 'BILLING',
  CHAT = 'CHAT',
}
declare enum ExportReason {
  QUEUED = 'QUEUED',
  DUPLICATE = 'DUPLICATE',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
}
declare enum FcmNotificationType {
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
declare enum DeliverySyncScope {
  RIDER = 'RIDER',
  COMPANY = 'COMPANY',
}
/**
 * Admin escalation mutation action. Wire value = member string, matching the
 * backend GraphQL enum `AdminEscalationAction`.
 */
declare enum AdminEscalationAction {
  TAKE_OVER = 'TAKE_OVER',
  RESOLVE = 'RESOLVE',
}
declare enum NotificationPriority {
  URGENT = 'URGENT',
}
/**
 * Why an undelivered delivery was auto-expired by the expiry job.
 * Wire values match the delivery-expiry service's inline constants exactly.
 */
type DeliveryExpiryReason =
  | 'STALE_PENDING_DELIVERY'
  | 'SCHEDULED_WINDOW_MISSED'
  | 'RIDER_SILENT'
  | 'IN_TRANSIT_STALL';
declare const DeliveryExpiryReason: {
  readonly STALE_PENDING_DELIVERY: 'STALE_PENDING_DELIVERY';
  readonly SCHEDULED_WINDOW_MISSED: 'SCHEDULED_WINDOW_MISSED';
  readonly RIDER_SILENT: 'RIDER_SILENT';
  readonly IN_TRANSIT_STALL: 'IN_TRANSIT_STALL';
};
declare enum DayOfWeek {
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
declare enum MetricDomain {
  DELIVERIES = 'DELIVERIES',
  CONVERSATIONS = 'CONVERSATIONS',
  RIDERS = 'RIDERS',
  REVENUE = 'REVENUE',
}
/**
 * Bucket granularity for the unified `metrics` table. Coarser tiers are
 * derived from finer ones by the workers' compression ladder.
 */
declare enum MetricGranularity {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  LIFETIME = 'LIFETIME',
}
declare const ALL_DAYS: readonly DayOfWeek[];
declare const LEAD_CATEGORIES: ReadonlySet<ContactCategory>;
/**
 * CAC verification verdicts written to `companies.metadata.cacVerification` by
 * the CAC verification cron. Wire values = the strings stored in the metadata
 * JSON; single source for the workers' writer and the web admin's reader.
 */
declare const CAC_EVIDENCE_STATUS: {
  readonly FOUND: 'FOUND';
  readonly INACTIVE: 'INACTIVE';
  readonly NOT_FOUND: 'NOT_FOUND';
  readonly ERROR: 'ERROR';
};
type CACEvidenceStatus = (typeof CAC_EVIDENCE_STATUS)[keyof typeof CAC_EVIDENCE_STATUS];
/**
 * Safely look up an enum value by its string representation.
 * Returns `undefined` instead of crashing on unknown values.
 *
 * @example
 * safeEnumValue(DeliveryStatus, 'IN_TRANSIT') // DeliveryStatus.IN_TRANSIT
 * safeEnumValue(DeliveryStatus, 'UNKNOWN')   // undefined
 */
declare function safeEnumValue<T extends Record<string, string>>(
  enumObj: T,
  value: string,
): T[keyof T] | undefined;

interface EnumValue {
  name: string;
  label: string;
}
interface EnumCatalog {
  exportDataTypes: EnumValue[];
  vehicleTypes: EnumValue[];
  deliveryStatuses: EnumValue[];
  riderStatuses: EnumValue[];
  approvalStatuses: EnumValue[];
  subscriptionTiers: EnumValue[];
  subscriptionStatuses: EnumValue[];
  channelPlatforms: EnumValue[];
  channelTypes: EnumValue[];
  paymentMethods: EnumValue[];
  transactionStatuses: EnumValue[];
  metricDomains: EnumValue[];
  metricGranularities: EnumValue[];
}
declare const ENUM_CATALOG: EnumCatalog;

interface DeliveryBase {
  id: string;
  trackingId: string;
  status: DeliveryStatus;
  pickupAddress: string | null;
  dropOffAddress: string;
  pickupPhone: string | null;
  dropOffPhone: string | null;
  price: number | null;
  description: string | null;
  scheduledAt: string | null;
  createdAt: string;
  rider: {
    id: string;
    fullName: string;
  } | null;
  pool: boolean;
  dropOffState: string | null;
  vehicleType: string;
}
interface RiderBase {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  status: RiderStatus;
  approvalStatus: ApprovalStatus | null;
}
interface DispatcherBase {
  id: string;
  fullName: string;
  email: string;
  approvalStatus: ApprovalStatus | null;
}

interface ConversationMetadata {
  escalatedTo?: EscalatedTo;
  escalationStatus?: EscalationStatus;
  escalatedBy?: string;
  escalatedAt?: string;
  resolvedAt?: string;
  resolution?: Record<string, unknown>;
  timezone?: string;
  aiPausedUntil?: string | null;
  aiPermanentlyDisabled?: boolean;
}
interface ChannelCredentials {
  accessToken: string;
  /** WhatsApp Business Account id (used for token refresh + webhook subscribe). */
  wabaId: string;
  /** Meta phone-number id (used for number verify + webhook subscribe). */
  phoneNumberId: string;
  /** Epoch ms when the access token expires; null = never. */
  tokenExpiresAt: number | null;
}
interface CompanyChannelMetadata {
  phoneNumberId?: string;
  displayPhoneNumber?: string;
  credentials?: ChannelCredentials;
  webhookUrl?: string;
  webhookVerified?: boolean;
  webhookVerifiedAt?: string;
  botEnabled?: boolean;
  aiDisabled?: boolean;
  rejectionReason?: string;
  rejectedAt?: string;
  /** Set by the past-due cron when a company channel is deactivated for unpaid subscription. */
  deactivatedReason?: string;
}
interface DeliveryMetadata {
  pickupPlaceId?: string;
  dropOffPlaceId?: string;
  dropOffState?: string;
  proofOfDeliveryImagePath?: string;
  fulfilledByCompanyId?: string;
  failReason?: string;
  failedAt?: string;
  instructions?: string;
  scheduledDayOffset?: number;
  scheduledTime?: string;
  paid?: boolean;
  paidAt?: string;
  paidVia?: PaymentProvider.SQUAD | 'BANK_TRANSFER' | 'CASH';
  paymentRequired?: boolean;
  paymentStatus?: PaymentStatus;
  paymentLinkGenerated?: boolean;
  paymentLinkGeneratedAt?: string;
  paymentSessionId?: string;
  /** Set by the cancel/modify handler when a delivery is cancelled. */
  cancelReason?: string;
  cancelledAt?: string;
  /** Write-only: set when proof-of-delivery object promotion fails (no reader today). */
  proofPromotionFailed?: boolean;
}
interface RiderMetadata {
  idType?: string;
  idNumber?: string;
  nin?: string;
  driverLicense?: string;
  passportNumber?: string;
  passportPhotoUrl?: string;
  vehicleVin?: string;
  vehiclePermitUrl?: string;
  photoUrl?: string;
  phoneNumber?: string;
  registrationNumber?: string;
  riderCardNumber?: string;
  currentState?: string;
  batteryLevel?: number;
  verificationNote?: string;
}
/**
 * CAC verification evidence block stored in `companies.metadata.cacVerification`.
 * SSOT: the workers' writer and the web admin's reader both derive from this.
 */
interface CacVerificationEvidence {
  status: CACEvidenceStatus;
  registeredName?: string | null;
  entityType?: string | null;
  cacStatus?: string | null;
  registrationDate?: string | null;
  checkedAt: string;
  nextCheckAt: string | null;
  attempts: number;
}
interface CompanyMetadata {
  logoUrl?: string;
  cac?: string;
  nipostLicenseNumber?: string;
  address?: string;
  placeId?: string;
  verificationNote?: string;
  /** Written/read by the CAC verification cron. */
  cacVerification?: CacVerificationEvidence;
}
interface TransactionMetadata {
  userId?: string;
  platformId?: string;
  initializedAt?: string;
  deliveryCount?: number;
  channelFeePerDelivery?: number;
  narration?: string;
  squadResponse?: Record<string, unknown>;
  ledgerRestored?: boolean;
  error?: string;
  reconciledAt?: string;
  checkoutUrl?: string;
  fundWallet?: boolean;
  reason?: string;
  accountNumber?: string;
  bankCode?: string;
  originalReferences?: string[];
  trackingIds?: string[];
  requiresManualReconciliation?: boolean;
  failedAt?: string;
  receiptSessionId?: string;
  isPendingReceiptClaim?: boolean;
  /** Raw provider webhook payload captured when the payment was confirmed/created via webhook. */
  webhookPayload?: Record<string, unknown>;
  /** ISO timestamp of webhook/provider confirmation. */
  confirmedAt?: string;
  /** Set when a stale PENDING transaction is expired in favour of a replacement. */
  expiredAt?: string;
  expiredReason?: string;
  /** Set on a replacement transaction created after an amount-mismatch replacement. */
  isPartialPaymentContinuation?: boolean;
  /** Reference of the transaction this one continues/replaces. */
  originalReference?: string;
  /** Written by the billing event handler when a PAY_ON_DELIVERY ledger credit is issued. */
  deliveryId?: string;
  eventSource?: string;
  /** Write-only: set when a settlement is rolled back (no reader today). */
  rolledBackAt?: string;
}
interface ChatMessageMetadata {
  latitude?: number;
  longitude?: number;
  parentId?: string;
  staleParentId?: string;
  pushName?: string;
  senderName?: string;
  mimeType?: string;
  mediaId?: string;
  visionExtraction?: string;
  displayPhoneNumber?: string;
  mediaUrl?: string;
  phoneNumberId?: string;
  displayPhoneNumberId?: string;
  /** AI tool actions executed for this message (read by turn-based-history). */
  executedActions?: Array<
    | string
    | {
        type: string;
        success?: boolean;
        message?: string;
      }
  >;
  /** Set when a message body is edited. */
  editedAt?: string;
  editCount?: number;
}
interface LedgerMetadata {
  type?: string;
  originalReference?: string;
}

interface BankDetails {
  readonly bankName: string;
  readonly bankCode: string;
  readonly accountNumber: string;
  readonly accountName: string;
}
/** Sentinel value used when a user record is purged but references remain. */
declare const DELETED_USER_SENTINEL = 'DELETED_USER';
/**
 * System actor ID used for automated/system-generated audit log entries.
 * Used in event_logs.actorId and as RLS role for worker sessions.
 */
declare const SYSTEM_ACTOR_ID = 'system';
/** Actor ID used when an admin performs an action without a specific performer. */
declare const ADMIN_ACTOR_ID = 'admin';
interface SystemConfig {
  readonly jwtIssuer: string;
  readonly customerBaseUrl: string;
  readonly businessBaseUrl: string;
  readonly emailDomain: string;
  readonly supportEmail: string;
  readonly paymentsEmail: string;
  readonly brandName: string;
}
type WorkingHoursEntry = {
  start: string;
  close: string;
};
declare const DEFAULT_WORKING_HOURS: Partial<Record<DayOfWeek, WorkingHoursEntry>>;
declare function buildSystemConfig(overrides?: Partial<SystemConfig>): SystemConfig;
declare const BRAND_NAME: string;

interface BrandConfig {
  brandName: string;
  trackingPrefix: string;
}
declare function buildBrandConfig(overrides?: Partial<BrandConfig>): BrandConfig;
/** @deprecated Use getBrandConfig() instead. */
declare const BRAND: BrandConfig;

interface RegionalConfig {
  readonly defaultCountryCode: string;
  readonly defaultIsoCountryCode: string;
  readonly timeZone: string;
  readonly currencySymbol: string;
  readonly states: readonly string[];
}
declare const REGIONAL_CONFIG: RegionalConfig;
/** Locale string for toLocaleDateString / toLocaleTimeString / toLocaleString calls. */
declare const REGIONAL_LOCALE = 'en-NG';
/** Headquarter location for footer text in emails. */
declare const HQ_LOCATION = 'Lagos, Nigeria';

interface TierLimits {
  readonly maxAIDeliveriesPerAction: number;
  readonly maxBulkDeliveries: number;
  readonly maxTrackingHistory: number;
  readonly retentionMonths: number;
  readonly maxDispatchers: number;
  readonly maxRiders: number;
  readonly maxDeliveriesPerMonth: number;
  readonly maxActiveDeliveries: number;
  readonly maxExportsPerDay: number;
  readonly maxExportsPerMonth: number;
}
interface LimitsConfig {
  readonly maxBatchSize: number;
  readonly dbBatchSize: number;
  readonly userActionConcurrency: number;
  readonly externalApiConcurrency: number;
  readonly maxQueryLimit: number;
  readonly syncPageSize: number;
  readonly locationDeduplicationRadiusMeters: number;
  readonly externalApiTimeoutMs: number;
  readonly maxRiderActiveDeliveries: number;
  readonly maxSearchQueryLength: number;
  readonly chunkSize: number;
}
/**
 * Default max length for a single chat message body (characters).
 * SSOT for AI message limits AND client chat-composer maxlength mirrors.
 */
declare const DEFAULT_MESSAGE_LIMIT = 4096;
declare const LIMITS_CONFIG: LimitsConfig;
/**
 * Pagination defaults. Centralised here alongside LIMITS_CONFIG — both are
 * query-size constants consumed by every service that pages results.
 */
declare const PAGINATION_CONFIG: {
  /** Default page size for regular API / GraphQL queries. */
  readonly DEFAULT_LIMIT: 20;
  /** Admin-specific page size (admins typically need larger result sets). */
  readonly ADMIN_DEFAULT_LIMIT: 50;
};
/**
 * Tier-based limits - ALL operational limits are tier-aware
 * These limits control the entire flow from drafting to synthesis
 */
declare const TIER_LIMITS: Record<SubscriptionTier, TierLimits>;
declare function getTierLimits(tier: SubscriptionTier): TierLimits;

/**
 * Canonical delivery status transition rules (SSOT).
 *
 * The backend exposes these to clients via `clientConfig.rules.allowedStatusTransitions`
 * so every consumer (business web, Flutter) mirrors server business rules instead of
 * maintaining a drift-prone copy. Never define a second copy.
 */
declare const ALLOWED_STATUS_TRANSITIONS: Readonly<
  Record<DeliveryStatus, readonly DeliveryStatus[]>
>;

interface PricingScheme {
  readonly vehicleType: VehicleType;
  /** Base fare in kobo. */
  readonly baseFare: number;
  /** Per-km rate in kobo. */
  readonly perKmRate: number;
  /** Minimum fare in kobo. */
  readonly minFare: number;
}
declare const DEFAULT_PRICING_SCHEMES: readonly PricingScheme[];

/**
 * Client-facing configuration served to business web + Flutter via the
 * `clientConfig` GraphQL query and the SSE `companyUpdated` payload.
 *
 * Values here are the SSOT; the backend `client-rules.service.ts` reads from
 * this module (and other core-ts configs) to build the served payload.
 * Clients keep the same defaults for offline / pre-server startup, but treat
 * the served values as authoritative once received.
 */
interface ClientConfig {
  readonly pollIntervals: {
    readonly normalMs: number;
    readonly degradedMs: number;
  };
}
declare const CLIENT_CONFIG: ClientConfig;

declare const VALID_DATA_TYPES: readonly ExportDataType[];
type DataType = (typeof VALID_DATA_TYPES)[number];
declare const MONTH_REQUIRED_TYPES: ReadonlySet<DataType>;

/**
 * Data retention and purge configuration.
 *
 * Single source of truth shared across all projects (backend, workers, web).
 * Previously scattered in workers-only SCALING_CONFIG.
 */
interface RetentionConfig {
  /**
   * Days after deactivation before individual accounts (riders/dispatchers)
   * are permanently purged from the system.
   */
  readonly accountPurgeRetentionDays: number;
  /**
   * Days of inactivity (no rider/dispatcher activity) before a company is
   * automatically deactivated. After deactivation, `lockedCompanyPurgeRetentionDays`
   * controls how long until permanent purge. Aligned with accountPurgeRetentionDays
   * so companies and individual accounts have comparable lifetimes.
   */
  readonly companyPurgeRetentionDays: number;
  /**
   * Days after deactivation before a company is permanently purged.
   * This covers both inactivity-triggered and user-initiated deactivations.
   */
  readonly lockedCompanyPurgeRetentionDays: number;
  /**
   * Fixed retention floor (months) for audit logs (event_logs).
   * event_logs is high-volume and only read recently (sync, admin monitoring),
   * so it is archived at a flat 12-month floor regardless of tier —
   * older than tier windows, and independent of DATA_RETENTION.
   */
  readonly eventLogRetentionMonths: number;
}
declare const RETENTION_CONFIG: RetentionConfig;

/**
 * Unified metrics configuration — single source of truth for the `metrics`
 * table shared across backend (query layer), workers (compute + compress),
 * and clients (windows / granularity selection).
 *
 * The `metrics` table stores one row per (company scope, domain, granularity,
 * bucket_start). Domains share one generic column set; each domain only fills
 * the columns meaningful to it (see METRIC_DOMAIN_MAPPINGS). Fine buckets are
 * folded into coarser ones by the workers' compression ladder per
 * METRICS_RETENTION below.
 */
/**
 * Sentinel bucket_start for LIFETIME rows. LIFETIME is not a rolling window —
 * there is exactly one LIFETIME row per (scope, domain), so the bucket_start
 * is a fixed sentinel instead of a date (the unique index then yields one row).
 */
declare const LIFETIME_BUCKET_START = '1970-01-01';
/**
 * Compression ladder: how long each granularity is retained before its
 * expired buckets are folded into the next coarser tier.
 *
 *   DAY     -> retained 90 days  -> folds into WEEK
 *   WEEK    -> retained 12 months -> folds into MONTH
 *   MONTH   -> retained 5 years   -> folds into LIFETIME
 *   LIFETIME -> retained forever   (nothing to fold into)
 *
 * Tiers are cumulative: a WEEK bucket is the sum of its (now-deleted) DAY
 * buckets, etc. All retention boundaries are month/date-anchored in the Lagos
 * timezone (see getRetentionCutoff).
 */
interface GranularityRetention {
  /** Retention window for buckets of this granularity. */
  readonly retainFor: number;
  /** Unit of `retainFor`. 'days' for DAY, 'months' for WEEK/MONTH. */
  readonly unit: 'days' | 'months';
  /** Coarser granularity expired buckets are folded into; null = keep forever. */
  readonly foldTo: MetricGranularity | null;
}
declare const METRICS_RETENTION: Record<MetricGranularity, GranularityRetention>;
/**
 * Ordered compression chain (finest -> coarsest). The workers fold each tier
 * in this order, so a coarse tier is always current before its own fold.
 */
declare const METRICS_FOLD_CHAIN: readonly MetricGranularity[];
/**
 * Generic columns shared by all domains on the `metrics` table. Each domain
 * fills a subset (documented in METRIC_DOMAIN_MAPPINGS); unused columns stay
 * at their defaults (0 / null / {}).
 */
type MetricColumn =
  | 'totalCount'
  | 'deliveredCount'
  | 'cancelledCount'
  | 'failedCount'
  | 'totalRevenueKobo'
  | 'avgDeliveryTimeMinutes'
  | 'channelBreakdown'
  | 'peakHour'
  | 'uniqueRidersActive';
/**
 * Per-domain mapping: which generic columns a domain populates, plus the keys
 * it writes into `extra_metrics` (JSON). Central reference for the workers'
 * compute step and the backend's read/aggregation layer.
 */
interface MetricDomainMapping {
  readonly domain: MetricDomain;
  /** Generic columns this domain fills. */
  readonly columns: readonly MetricColumn[];
  /** extra_metrics JSON keys this domain writes (documentation + contract). */
  readonly extraMetricKeys: readonly string[];
}
declare const METRIC_DOMAIN_MAPPINGS: readonly MetricDomainMapping[];
/**
 * Returns the bucket granularity to serve for a requested window in days.
 * Mirrors the METRICS_RETENTION ladder so a client asking for `days` always
 * gets the finest tier whose retention covers the window.
 *
 *   <= 90 days   -> DAY
 *   <= ~12 months -> WEEK
 *   <= ~5 years  -> MONTH
 *   beyond       -> MONTH (server must additionally read LIFETIME to fill the
 *                   horizon; MONTH is the coarsest rolling tier).
 */
declare function granularityForWindowDays(days: number): MetricGranularity;

/**
 * 1 Naira = 100 Kobo.
 * All money in the system is stored in Kobo ("kobo everywhere").
 * This constant is retained only for display formatting (see `formatAmount`)
 * and for documenting the legacy naira → kobo ×100 migration.
 */
declare const KOBO_PER_NAIRA = 100;
/**
 * Data retention in months per tier — controls dashboard visibility, export window, and archival
 */
declare const DATA_RETENTION: Record<SubscriptionTier, number>;
/**
 * Per-delivery channel fees (in Kobo).
 * Billed per-delivery when delivery is created from a channel conversation.
 * Deducted from wallet in real-time, reconciled on monthly invoice.
 */
declare const CHANNEL_FEES: Record<ChannelType, number>;
/**
 * Tiers that get a dedicated Squad virtual settlement account AND can
 * provision their own dedicated communication channels (MY_CHANNEL type).
 * STARTER uses the shared platform number and ledger.
 */
declare const DEDICATED_TIERS: SubscriptionTier[];
/**
 * Support SLA per tier, as shown on the subscription plans and used as the
 * support feature value. SSOT — never duplicate these strings elsewhere.
 */
declare const SUPPORT_SLA: Record<SubscriptionTier, string>;
/**
 * Billing configuration constants
 */
declare const BILLING_CONFIG: {
  /**
   * Currency to use across the system
   */
  readonly CURRENCY: Currency;
  /**
   * Monthly subscription pricing (in Kobo — single currency unit)
   * ₦15,000 = 1_500_000 kobo, ₦30,000 = 3_000_000 kobo.
   */
  readonly PRICING: {
    readonly STARTER: 1500000;
    readonly PROFESSIONAL: 3000000;
  };
  /**
   * Billing cycle in days
   */
  readonly BILLING_CYCLE_DAYS: 30;
  /**
   * Days after PAST_DUE before company data is cancelled
   */
  readonly PAST_DUE_CANCEL_DAYS: 14;
  /**
   * Days of free trial for new companies
   */
  readonly TRIAL_DAYS: 14;
  /**
   * Days after CANCELLED before company data is purged
   * References RETENTION_CONFIG as single source of truth.
   */
  readonly PURGE_AFTER_CANCELLED_DAYS: number;
  /**
   * Payment timeout for unconfirmed payment deliveries (in hours).
   * 10 minutes gives room for webhook delays without leaving users hanging.
   * The daily payment-reconciliation cron is the backstop for edge cases.
   */
  readonly PAYMENT_TIMEOUT_HOURS: 1;
  /**
   * Cross-company pool fulfillment split (in Kobo). Applied at settlement when
   * a pool delivery was fulfilled by a different company's rider:
   * - platformFeeKobo is retained by the platform first,
   * - ownerShareKobo then goes to the delivery's owning company (skipped for
   *   system-owned deliveries, where the platform retains it implicitly),
   * - the fulfilling company receives the remainder.
   */
  readonly POOL_SPLIT_KOBO: {
    readonly platformFeeKobo: 10000;
    readonly ownerShareKobo: 50000;
  };
  /**
   * Number of days after purchase within which a refund may be requested.
   */
  readonly REFUND_WINDOW_DAYS: 14;
  /**
   * Window (ms) within which fundWallet requests with the same company + amount
   * reuse a single PENDING reference so double-submits coalesce into one checkout.
   */
  readonly FUND_IDEMPOTENCY_WINDOW_MS: number;
  /**
   * HTTP timeout (ms) for Squad API calls.
   */
  readonly SQUAD_HTTP_TIMEOUT: 30000;
  /**
   * Retry configuration for failed payments.
   * Retries on specific days after failure (1, 3, 7 days).
   * MAX_ATTEMPTS = total payment attempts (1 initial + 1 retry per INTERVALS_DAYS entry).
   * If all attempts fail, moves to PAST_DUE. After PAST_DUE window, cancels.
   */
  readonly PAYMENT_RETRY: {
    readonly MAX_ATTEMPTS: 4;
    readonly INTERVALS_DAYS: readonly [1, 3, 7];
  };
};
/**
 * Get subscription price for a tier with validation
 */
declare function getSubscriptionPrice(tier: SubscriptionTier): number;
/**
 * Format a kobo amount to a display string (₦ with decimals).
 * All money in the system is kobo, so this is the canonical money formatter.
 */
declare function formatAmount(kobo: number): string;
/**
 * Check if a tier is billable (has a positive subscription price)
 */
declare function isBillableTier(tier: SubscriptionTier): boolean;
/**
 * Check if we should bill based on last billing date.
 * First billing triggers after BILLING_CYCLE_DAYS from activation.
 * Subsequent billings trigger after BILLING_CYCLE_DAYS from last billing.
 */
declare function shouldBillNow(lastBillingDate: Date | null, activationDate: Date): boolean;
/**
 * Check if we should retry a failed payment.
 * `retryAttempt` is a 0-based retry index (0 = first retry, 1-day interval).
 * Retries are capped by the number of configured intervals.
 */
declare function shouldRetryPayment(lastBillingDate: Date, retryAttempt: number): boolean;
/**
 * Compute a single access level from the approval × subscription matrix.
 *
 *  ApprovalStatus × SubscriptionStatus  →  CompanyAccessLevel
 *  ─────────────────────────────────────────────────────────────
 *  APPROVED + ACTIVE      →  FULL
 *  APPROVED + TRIAL       →  TRIAL
 *  APPROVED + PAST_DUE    →  PAST_DUE
 *  anything else          →  RESTRICTED
 */
declare function computeAccessLevel(
  verificationStatus: ApprovalStatus | null | undefined,
  subscriptionStatus: SubscriptionStatus | null | undefined,
  periodEnd?: Date | string | null,
  opts?: {
    wasTrial?: boolean;
  },
): CompanyAccessLevel;

declare const QUEUE_SERVICE_CONFIG: {
  readonly batchSize: 5;
  readonly defaultMaxRetries: 3;
  readonly pruneIntervalMs: number;
  readonly pruneTerminalAfterMs: number;
  readonly retryStalledAfterMs: 30000;
  readonly retryBackoffBaseMs: 1000;
  readonly retryBackoffMaxMs: 60000;
};

interface SecurityConfig {
  readonly rateLimits: {
    readonly global: {
      readonly max: number;
      readonly windowMs: number;
    };
    readonly auth: {
      readonly max: number;
      readonly windowMs: number;
    };
    readonly login: {
      readonly max: number;
      readonly windowMs: number;
    };
    readonly register: {
      readonly max: number;
      readonly windowMs: number;
    };
    readonly tiers: Record<
      SubscriptionTier,
      {
        readonly max: number;
        readonly windowMs: number;
      }
    >;
  };
  readonly jwt: {
    readonly jwtExpiresIn: string;
    readonly jwtRefreshExpiresIn: string;
  };
  readonly blocks: {
    readonly temporaryLadderMs: readonly number[];
    readonly escalateAfterBlocks: number;
    readonly escalationWindowMs: number;
    readonly persistentEscalatedMs: number;
    readonly maxPersistentMs: number;
  };
  readonly headers: {
    readonly [key: string]: string;
  };
  readonly maliciousPatterns: readonly RegExp[];
  readonly validation: {
    readonly maxEmailLength: number;
    readonly maxPasswordLength: number;
    readonly maxNameLength: number;
    readonly maxDescriptionLength: number;
    readonly maxPhoneLength: number;
    readonly maxAddressLength: number;
    readonly securityPinMinRange: number;
    readonly securityPinMaxRange: number;
  };
}
declare const SECURITY_CONFIG: SecurityConfig;

interface SessionConfig {
  readonly maxActiveSessions: number;
  readonly pruneRetentionDays: number;
}
declare const SESSION_CONFIG: SessionConfig;

interface FetchWithTimeoutOptions extends Omit<RequestInit, 'signal'> {
  /** Timeout in milliseconds. Defaults to 20 000 ms. */
  timeoutMs?: number;
  /** Custom fetch implementation (useful for testing). */
  fetch?: typeof globalThis.fetch;
}
declare function fetchWithTimeout(
  url: string | URL | Request,
  options?: FetchWithTimeoutOptions,
): Promise<Response>;

declare const MS_PER_DAY: number;
/**
 * Adds calendar days to a date, returning a new Date (input untouched).
 * Uses local-time setDate semantics so DST transitions stay calendar-correct
 * (unlike naive `ms + days * MS_PER_DAY` arithmetic).
 */
declare function addDays(from: Date, days: number): Date;

declare function haversineDistanceMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number;
declare function haversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  routingFactor?: number,
): number;

declare function mergeChannelCounts(
  prev: Record<string, number> | undefined,
  next: Record<string, number> | undefined,
): Record<string, number>;

/**
 * Extracts a human-readable error message from any thrown value.
 *
 * Handles Error instances (including cause chains), strings, and unknown types.
 * Use this instead of inline `err instanceof Error ? err.message : String(err)`.
 *
 * @example
 * try {
 *   await doSomething();
 * } catch (err) {
 *   toast.error(extractErrorMessage(err));
 * }
 */
/**
 * Returns a structured error context for logger calls.
 * Single `instanceof Error` check — replaces the verbose
 * `{ error: extractErrorMessage(e), stack: e instanceof Error ? e.stack : undefined }` pattern.
 *
 * @example
 * logger.error('Something failed', extractErrorContext(err));
 */
declare function extractErrorContext(error: unknown): {
  error: string;
  stack?: string;
};
declare function extractErrorMessage(error: unknown): string;

/**
 * Meta Graph API shared helpers.
 */
/** Meta long-lived token expiry: `expires_in` (seconds) → epoch ms. */
declare function computeExpiresAt(expiresInSeconds: number): number;
/**
 * Extract a human-readable message from a Meta Graph API error body.
 * Returns a generic fallback when the shape is not a standard error object.
 */
declare function parseGraphError(raw: unknown): string;

/**
 * Tracking ID prefix for brand recognition and easy pattern matching.
 * Makes IDs trivially identifiable (e.g. LGX-A2B3C4), reducing AI
 * hallucination risk and false-positive guardrail matches.
 */
declare const TRACKING_ID_PREFIX: string;
/**
 * Length of the random suffix portion of a tracking ID (after the prefix).
 */
declare const TRACKING_ID_SUFFIX_LENGTH = 6;
/**
 * Total tracking ID length including prefix.
 */
declare const TRACKING_ID_LENGTH: number;
/**
 * Ambiguity-free alphabet for tracking IDs.
 * Excludes 0, O, 1, I (visual confusion between these pairs).
 * @example `/[2-9A-HJ-NP-Z]{6}/`
 */
declare const TRACKING_ID_CHARS = '2-9A-HJ-NP-Z';
/**
 * Expanded character set matching `TRACKING_ID_CHARS`, for random
 * generation (crypto.randomInt index selection). Kept in lockstep with
 * `TRACKING_ID_CHARS` by the drift-guard test.
 */
declare const TRACKING_ID_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

declare function formatDeliveryStatus(status: string | undefined | null): string;
declare function formatEnumToTitleCase(value: string | undefined | null): string;

/**
 * Returns midnight (00:00:00.000) of the first day of the current month
 * in the configured timezone (defaults to REGIONAL_CONFIG.timeZone).
 *
 * Works for any IANA timezone by computing the UTC offset at noon UTC
 * on the 1st — safe from DST boundary edge cases at month boundaries.
 */
declare function getMonthStartInTimezone(timezone?: string): Date;
/**
 * Returns midnight (00:00:00.000) of today in the configured timezone.
 * Safe from DST boundary edge cases.
 */
declare function getStartOfDayInTimezone(timezone?: string): Date;
/**
 * Returns the first and last millisecond of the wall-clock calendar day that
 * the given instant falls on in the timezone (defaults to REGIONAL_CONFIG).
 * Accepts any parsable date input ('2024-12-31', ISO strings, Date, ms).
 * Used for inclusive fromDate/toDate range filters — never use local
 * setHours(23,59,59,999), which silently follows the server clock.
 */
declare function getDayBoundsInTimezone(
  date: Date | number | string,
  timezone?: string,
): {
  start: Date;
  end: Date;
};
/**
 * Returns the calendar date (YYYY-MM-DD) of the given instant in the
 * timezone — the wall-clock day, which may differ from the instant's UTC day.
 */
declare function getDateStringInTimezone(date: Date, timezone?: string): string;
/**
 * Returns the month-anchored retention cutoff: firstOfMonth(now) - N months,
 * as midnight on the 1st in the configured timezone.
 *
 * Uses explicit year/month arithmetic (never setUTCMonth on a shifted UTC
 * date, which overflows at month boundaries). Used for tier-based/fixed-floor
 * archival and in-app history clamping.
 */
declare function getRetentionCutoff(retentionMonths: number, timezone?: string): Date;

export {
  ADMIN_ACTOR_ID,
  ALLOWED_STATUS_TRANSITIONS,
  ALL_DAYS,
  AdminEscalationAction,
  AdminRole,
  ApiTag,
  ApprovalStatus,
  AuditActorType,
  BILLING_CONFIG,
  BRAND,
  BRAND_NAME,
  type BankDetails,
  type BrandConfig,
  type CACEvidenceStatus,
  CAC_EVIDENCE_STATUS,
  CHANNEL_FEES,
  CLIENT_CONFIG,
  type CacVerificationEvidence,
  type ChannelCredentials,
  ChannelPlatform,
  ChannelType,
  ChannelsUpdateType,
  type ChatMessageMetadata,
  CompanyAccessLevel,
  type CompanyChannelMetadata,
  CompanyChannelStatus,
  type CompanyMetadata,
  ContactCategory,
  ConversationHandlerType,
  type ConversationMetadata,
  Currency,
  DATA_RETENTION,
  DEDICATED_TIERS,
  DEFAULT_MESSAGE_LIMIT,
  DEFAULT_PRICING_SCHEMES,
  DEFAULT_WORKING_HOURS,
  DELETED_USER_SENTINEL,
  type DataType,
  DayOfWeek,
  type DeliveryBase,
  DeliveryExpiryReason,
  type DeliveryMetadata,
  DeliveryStatus,
  DeliverySyncScope,
  DevicePlatform,
  type DispatcherBase,
  DispatcherRole,
  ENUM_CATALOG,
  EntityType,
  type EnumCatalog,
  type EnumValue,
  ErrorCode,
  EscalatedTo,
  EscalationStatus,
  EventType,
  ExportDataType,
  ExportReason,
  FcmNotificationType,
  HQ_LOCATION,
  IdType,
  JobStatus,
  JobType,
  JwtTokenType,
  KOBO_PER_NAIRA,
  LEAD_CATEGORIES,
  LIFETIME_BUCKET_START,
  LIMITS_CONFIG,
  LedgerAdjustmentType,
  type LedgerMetadata,
  LlmRole,
  LogLevel,
  MESSAGE_STATUS_RANK,
  METRICS_FOLD_CHAIN,
  METRICS_RETENTION,
  METRIC_DOMAIN_MAPPINGS,
  MONTH_REQUIRED_TYPES,
  MS_PER_DAY,
  MessageStatus,
  MetricDomain,
  MetricGranularity,
  NodeEnv,
  NotificationPriority,
  PAGINATION_CONFIG,
  PaymentMethod,
  PaymentProvider,
  PaymentStatus,
  ProviderCapability,
  ProviderRole,
  QUEUE_SERVICE_CONFIG,
  REGIONAL_CONFIG,
  REGIONAL_LOCALE,
  RETENTION_CONFIG,
  type RiderBase,
  type RiderMetadata,
  RiderStatus,
  SECURITY_CONFIG,
  SESSION_CONFIG,
  SUPPORT_SLA,
  SYSTEM_ACTOR_ID,
  SecurityEventType,
  SecuritySeverity,
  SenderType,
  SseEventType,
  SubscriptionEventType,
  SubscriptionHealth,
  SubscriptionStatus,
  SubscriptionTier,
  type SystemConfig,
  SystemStatus,
  TIER_LIMITS,
  TRACKING_ID_ALPHABET,
  TRACKING_ID_CHARS,
  TRACKING_ID_LENGTH,
  TRACKING_ID_PREFIX,
  TRACKING_ID_SUFFIX_LENGTH,
  type TierLimits,
  type TransactionMetadata,
  TransactionStatus,
  TransactionType,
  UserAuditAction,
  UserRole,
  VALID_DATA_TYPES,
  VehicleType,
  type WorkingHoursEntry,
  addDays,
  buildBrandConfig,
  buildSystemConfig,
  computeAccessLevel,
  computeExpiresAt,
  extractErrorContext,
  extractErrorMessage,
  fetchWithTimeout,
  formatAmount,
  formatDeliveryStatus,
  formatEnumToTitleCase,
  getDateStringInTimezone,
  getDayBoundsInTimezone,
  getMonthStartInTimezone,
  getRetentionCutoff,
  getStartOfDayInTimezone,
  getSubscriptionPrice,
  getTierLimits,
  granularityForWindowDays,
  haversineDistanceKm,
  haversineDistanceMeters,
  isBillableTier,
  mergeChannelCounts,
  parseGraphError,
  safeEnumValue,
  shouldBillNow,
  shouldRetryPayment,
};
