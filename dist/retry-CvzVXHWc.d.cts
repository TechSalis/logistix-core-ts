declare enum UserRole {
    ADMIN = "ADMIN",
    DISPATCHER = "DISPATCHER",
    RIDER = "RIDER"
}
declare enum AdminRole {
    OPERATOR = "OPERATOR",
    SUPER_ADMIN = "SUPER_ADMIN"
}
declare enum DispatcherRole {
    OWNER = "OWNER",
    STAFF = "STAFF"
}
declare enum DeliveryStatus {
    PENDING = "PENDING",
    ASSIGNED = "ASSIGNED",
    IN_TRANSIT = "IN_TRANSIT",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    FAILED = "FAILED"
}
declare enum PaymentMethod {
    PREPAID = "PREPAID",
    PAY_ON_DELIVERY = "PAY_ON_DELIVERY"
}
declare enum PaymentStatus {
    AWAITING = "AWAITING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}
declare enum RiderStatus {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
    BUSY = "BUSY"
}
declare enum ApprovalStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    SUSPENDED = "SUSPENDED",
    DISABLED = "DISABLED"
}
type CompanyAccessLevel = 'FULL' | 'TRIAL' | 'PAST_DUE' | 'RESTRICTED';
declare const CompanyAccessLevel: {
    readonly FULL: "FULL";
    readonly TRIAL: "TRIAL";
    readonly PAST_DUE: "PAST_DUE";
    readonly RESTRICTED: "RESTRICTED";
};
declare enum EntityType {
    USER = "USER",
    DELIVERY = "DELIVERY",
    RIDER = "RIDER",
    COMPANY = "COMPANY",
    DISPATCHER = "DISPATCHER",
    SYSTEM = "SYSTEM",
    COMPANY_CHANNEL = "COMPANY_CHANNEL",
    MESSAGE = "MESSAGE"
}
declare enum ChannelPlatform {
    WHATSAPP = "WHATSAPP",
    INSTAGRAM = "INSTAGRAM",
    FACEBOOK = "FACEBOOK",
    TIKTOK = "TIKTOK"
}
declare enum CompanyChannelStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    DEACTIVATED = "DEACTIVATED",
    REJECTED = "REJECTED",
    REMOVED = "REMOVED"
}
declare enum NodeEnv {
    Development = "development",
    Production = "production",
    Test = "test"
}
declare enum VehicleType {
    BIKE = "BIKE"
}
declare enum SubscriptionTier {
    STARTER = "STARTER",
    PROFESSIONAL = "PROFESSIONAL"
}
declare enum SubscriptionStatus {
    TRIAL = "TRIAL",
    ACTIVE = "ACTIVE",
    CANCELLING = "CANCELLING",
    PAST_DUE = "PAST_DUE",
    CANCELLED = "CANCELLED"
}
/**
 * Derived subscription health surfaced to clients (wire value = member string).
 * Backend computes it via `deriveSubscriptionHealth`; clients use the served
 * value and fall back to their own derivation only when it is absent.
 */
declare enum SubscriptionHealth {
    HEALTHY = "HEALTHY",
    IN_TRIAL = "IN_TRIAL",
    PAST_DUE = "PAST_DUE",
    EXPIRING_SOON = "EXPIRING_SOON",
    CANCELLED = "CANCELLED"
}
declare enum TransactionStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    REVERSED = "REVERSED"
}
declare enum TransactionType {
    DELIVERY_PAYMENT = "DELIVERY_PAYMENT",
    SUBSCRIPTION = "SUBSCRIPTION",
    ADJUSTMENT = "ADJUSTMENT",
    SETTLEMENT = "SETTLEMENT",
    REFUND = "REFUND"
}
declare enum LedgerAdjustmentType {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT",
    CORRECTION = "CORRECTION",
    CHANNEL_FEE = "CHANNEL_FEE",
    OVERAGE = "OVERAGE",
    REFUND = "REFUND"
}
declare enum ChannelType {
    SYSTEM_POOL = "SYSTEM_POOL",
    MY_CHANNEL = "MY_CHANNEL"
}
declare enum PaymentProvider {
    SQUAD = "SQUAD",
    SYSTEM = "SYSTEM"
}
declare enum EventType {
    DELIVERY_ASSIGNED = "DELIVERY_ASSIGNED",
    DELIVERY_UPDATED = "DELIVERY_UPDATED",
    DELIVERY_CREATED = "DELIVERY_CREATED",
    DELIVERY_STATUS_CHANGED = "DELIVERY_STATUS_CHANGED",
    DELIVERY_DELETED = "DELIVERY_DELETED",
    RIDER_LOCATION_UPDATED = "RIDER_LOCATION_UPDATED",
    RIDER_ACCEPTED = "RIDER_ACCEPTED",
    RIDER_CREATED = "RIDER_CREATED",
    RIDER_UPDATED = "RIDER_UPDATED",
    RIDER_STATUS_CHANGED = "RIDER_STATUS_CHANGED",
    RIDER_DELETED = "RIDER_DELETED",
    RIDER_DOCUMENTS_VERIFIED = "RIDER_DOCUMENTS_VERIFIED",
    RIDER_DOCUMENTS_REJECTED = "RIDER_DOCUMENTS_REJECTED",
    CHANNEL_SETUP = "CHANNEL_SETUP",
    CHANNEL_ACTIVATED = "CHANNEL_ACTIVATED",
    CHANNEL_DEACTIVATED = "CHANNEL_DEACTIVATED",
    CHANNEL_REJECTED = "CHANNEL_REJECTED",
    CHANNEL_REMOVED = "CHANNEL_REMOVED",
    SUBSCRIPTION_STATUS_CHANGED = "SUBSCRIPTION_STATUS_CHANGED",
    DISPATCHER_CREATED = "DISPATCHER_CREATED",
    DISPATCHER_UPDATED = "DISPATCHER_UPDATED",
    DISPATCHER_STATUS_CHANGED = "DISPATCHER_STATUS_CHANGED",
    DISPATCHER_DELETED = "DISPATCHER_DELETED",
    AI_EXECUTION = "AI_EXECUTION",
    SECURITY_INCIDENT = "SECURITY_INCIDENT",
    ADMIN_PROOF_READ = "ADMIN_PROOF_READ",
    ADMIN_DOCUMENT_READ = "ADMIN_DOCUMENT_READ",
    COMPANY_ACTIVATED = "COMPANY_ACTIVATED",
    COMPANY_DEACTIVATED = "COMPANY_DEACTIVATED",
    COMPANY_TIER_CHANGED = "COMPANY_TIER_CHANGED",
    COMPANY_VERIFIED = "COMPANY_VERIFIED",
    COMPANY_VERIFICATION_REJECTED = "COMPANY_VERIFICATION_REJECTED",
    USER_PURGED = "USER_PURGED",
    CANCELLED_PAYMENT_TIMEOUT = "CANCELLED_PAYMENT_TIMEOUT",
    DOWNGRADE = "DOWNGRADE",
    MESSAGE_DELETED = "MESSAGE_DELETED",
    LEDGER_ADJUSTED = "LEDGER_ADJUSTED",
    PAYMENT_UNMAPPED = "PAYMENT_UNMAPPED"
}
declare enum SubscriptionEventType {
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    DELETED = "DELETED",
    ASSIGNED = "ASSIGNED",
    STATUS_CHANGED = "STATUS_CHANGED",
    UNASSIGNED = "UNASSIGNED"
}
type UserAuditAction = 'LOGIN' | 'LOGOUT' | 'PROFILE_UPDATE' | 'DEACTIVATED';
declare const UserAuditAction: {
    readonly LOGIN: "LOGIN";
    readonly LOGOUT: "LOGOUT";
    readonly PROFILE_UPDATE: "PROFILE_UPDATE";
    readonly DEACTIVATED: "DEACTIVATED";
};
declare enum MessageStatus {
    SENT = "SENT",
    DELIVERED = "DELIVERED",
    READ = "READ",
    FAILED = "FAILED"
}
declare const MESSAGE_STATUS_RANK: Record<MessageStatus, number>;
declare enum EscalationStatus {
    OPEN = "OPEN",
    RESOLVED = "RESOLVED",
    TAKEN_OVER = "TAKEN_OVER"
}
declare enum EscalatedTo {
    COMPANY = "COMPANY",
    ADMIN = "ADMIN",
    DISPATCHER = "DISPATCHER"
}
declare enum SenderType {
    CUSTOMER = "CUSTOMER",
    AGENT = "AGENT",
    DISPATCHER = "DISPATCHER",
    ADMIN = "ADMIN",
    SYSTEM = "SYSTEM"
}
type SecurityEventType = 'RATE_LIMIT' | 'MALICIOUS_REQUEST' | 'BRUTE_FORCE';
declare const SecurityEventType: {
    readonly RATE_LIMIT: "RATE_LIMIT";
    readonly MALICIOUS_REQUEST: "MALICIOUS_REQUEST";
    readonly BRUTE_FORCE: "BRUTE_FORCE";
};
declare enum SecuritySeverity {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL"
}
declare enum ErrorCode {
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    VALIDATION_ERROR = "VALIDATION_ERROR",
    TOO_MANY_ATTEMPTS = "TOO_MANY_ATTEMPTS",
    RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
    BULK_DELIVERY_CREATION = "BULK_DELIVERY_CREATION",
    OPERATIONAL_AVAILABILITY = "OPERATIONAL_AVAILABILITY",
    CHAT_PROCESSOR_HYDRATION = "CHAT_PROCESSOR_HYDRATION",
    CHAT_PROCESSOR_INFERENCE = "CHAT_PROCESSOR_INFERENCE",
    CHAT_PROCESSOR_PIPELINE = "CHAT_PROCESSOR_PIPELINE",
    PROVIDER_CONFIG_LOAD = "PROVIDER_CONFIG_LOAD",
    PAYMENT_POST_PROCESSING = "PAYMENT_POST_PROCESSING",
    LLM_FAILOVER = "LLM_FAILOVER",
    INTER_STATE_DELIVERY = "INTER_STATE_DELIVERY",
    COMPANY_CLOSED = "COMPANY_CLOSED",
    COMPANY_NOT_OPEN_YET = "COMPANY_NOT_OPEN_YET",
    COMPANY_NOT_OPERATING_TODAY = "COMPANY_NOT_OPERATING_TODAY",
    TIER_LIMIT_EXCEEDED = "TIER_LIMIT_EXCEEDED",
    NO_DELIVERIES_PROVIDED = "NO_DELIVERIES_PROVIDED",
    INVALID_ACTOR = "INVALID_ACTOR",
    CHANNEL_PLATFORM_ID_CONFLICT = "CHANNEL_PLATFORM_ID_CONFLICT",
    CHANNEL_ACTIVATION_FAILED = "CHANNEL_ACTIVATION_FAILED",
    NETWORK_ERROR = "NETWORK_ERROR",
    INVALID = "INVALID",
    PIN_REQUIRED = "PIN_REQUIRED",
    UNKNOWN = "UNKNOWN"
}
/**
 * Job queue type identifiers shared across backend (enqueue) and workers
 * (drain). Never define a second copy; add new job types here.
 */
declare enum JobType {
    DELIVERY_NOTIFICATION = "delivery-notification",
    SQUAD_WEBHOOK = "squad-webhook",
    EXPORT = "export",
    AI_BATCH = "ai:batch"
}
declare enum SystemStatus {
    UP = "UP",
    DOWN = "DOWN",
    DEGRADED = "DEGRADED"
}
declare enum LlmRole {
    USER = "user",
    ASSISTANT = "assistant",
    SYSTEM = "system"
}
declare enum ProviderRole {
    INTERPRET = "interpret",
    SYNTHESIZE = "synthesize"
}
declare enum ProviderCapability {
    JSON = "json",
    TOOLS = "tools",
    VISION = "vision"
}
declare enum LogLevel {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    SILENT = "silent"
}
declare enum ApiTag {
    TRACKING = "Tracking",
    AUTH = "Auth",
    ADMIN = "Admin",
    GRAPHQL = "GraphQL",
    SYSTEM = "System"
}
declare enum SseEventType {
    CONNECTED = "connected",
    DELIVERY = "delivery",
    RIDER = "rider",
    MESSAGE = "message",
    COMPANY = "company",
    RIDER_LOCATION = "rider-location",
    TYPING = "typing",
    /** Control frame: the replay on reconnect was truncated (frame cap or
     *  prune-window expired), so the client must run a delta sync to recover
     *  the gap before resuming live delivery. Never emitted during a normal
     *  connection; only on reconnect when the cursor can't cover the gap. */
    SYNC_REQUIRED = "sync-required"
}
declare enum JwtTokenType {
    ACCESS = "access",
    REFRESH = "refresh"
}
declare enum DevicePlatform {
    ANDROID = "ANDROID",
    IOS = "IOS",
    WEB = "WEB"
}
declare enum AuditActorType {
    USER = "USER",
    SYSTEM = "SYSTEM",
    ANONYMOUS = "ANONYMOUS"
}
declare enum ContactCategory {
    PARTNERSHIP = "Become a Partner",
    BUSINESS = "For Business",
    SUPPORT = "Support",
    TRACKING_INQUIRY = "Tracking Inquiry",
    FEEDBACK = "Feedback"
}
declare enum IdType {
    NIN = "NIN",
    DRIVER_LICENSE = "DRIVER_LICENSE",
    PASSPORT = "PASSPORT"
}
declare enum ConversationHandlerType {
    AI = "AI",
    DISPATCHER = "DISPATCHER",
    ADMIN = "ADMIN"
}
declare enum ExportDataType {
    DELIVERIES = "DELIVERIES",
    BILLING = "BILLING",
    CHAT = "CHAT"
}
declare enum ExportReason {
    QUEUED = "QUEUED",
    DUPLICATE = "DUPLICATE",
    QUOTA_EXCEEDED = "QUOTA_EXCEEDED"
}
declare enum FcmNotificationType {
    SUBSCRIPTION_CANCELLED = "SUBSCRIPTION_CANCELLED",
    DELIVERY_ASSIGNED = "DELIVERY_ASSIGNED",
    COMPANY_STATUS_CHANGED = "COMPANY_STATUS_CHANGED",
    SETTLEMENT_FAILED = "SETTLEMENT_FAILED",
    SETTLEMENT_REVERSAL = "SETTLEMENT_REVERSAL",
    HUMAN_REQUEST = "HUMAN_REQUEST",
    DELIVERY_ANOMALY = "DELIVERY_ANOMALY",
    RAPID_STATUS_CHANGES = "RAPID_STATUS_CHANGES",
    RIDER_SILENT_BAN = "RIDER_SILENT_BAN",
    SECURITY_ALERT = "SECURITY_ALERT"
}
/**
 * Scope of a deliverySync query. Wire value = member string, matching the
 * backend GraphQL enum `DeliverySyncScope`.
 */
declare enum DeliverySyncScope {
    RIDER = "RIDER",
    COMPANY = "COMPANY"
}
/**
 * Admin escalation mutation action. Wire value = member string, matching the
 * backend GraphQL enum `AdminEscalationAction`.
 */
declare enum AdminEscalationAction {
    TAKE_OVER = "TAKE_OVER",
    RESOLVE = "RESOLVE"
}
/**
 * Admin message-delivery management action. Wire value = member string,
 * matching the backend GraphQL enum `AdminDeliveryAction`.
 */
declare enum AdminDeliveryAction {
    ASSIGN = "ASSIGN",
    UPDATE = "UPDATE",
    UPDATE_STATUS = "UPDATE_STATUS"
}
/**
 * Scope filter for the `conversations` list query. Wire value = member
 * string, matching the backend GraphQL enum `ConversationScope`.
 */
declare enum ConversationScope {
    ALL = "ALL",
    COMPANY = "COMPANY",
    SYSTEM_ONLY = "SYSTEM_ONLY"
}
declare const NOTIFICATION_PRIORITY: "URGENT";
type NotificationPriority = typeof NOTIFICATION_PRIORITY;
/**
 * Why an undelivered delivery was auto-expired by the expiry job.
 * Wire values match the delivery-expiry service's inline constants exactly.
 */
type DeliveryExpiryReason = 'STALE_PENDING_DELIVERY' | 'SCHEDULED_WINDOW_MISSED' | 'RIDER_SILENT' | 'IN_TRANSIT_STALL';
declare const DeliveryExpiryReason: {
    readonly STALE_PENDING_DELIVERY: "STALE_PENDING_DELIVERY";
    readonly SCHEDULED_WINDOW_MISSED: "SCHEDULED_WINDOW_MISSED";
    readonly RIDER_SILENT: "RIDER_SILENT";
    readonly IN_TRANSIT_STALL: "IN_TRANSIT_STALL";
};
declare enum DayOfWeek {
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday",
    SATURDAY = "Saturday",
    SUNDAY = "Sunday"
}
/**
 * Metric domains stored in the unified `metrics` table. Wire value = member
 * string (UPPERCASE_WITH_UNDERSCORES), matching the backend GraphQL enum.
 */
declare enum MetricDomain {
    DELIVERIES = "DELIVERIES",
    CONVERSATIONS = "CONVERSATIONS",
    RIDERS = "RIDERS",
    REVENUE = "REVENUE"
}
/**
 * Bucket granularity for the unified `metrics` table. Coarser tiers are
 * derived from finer ones by the workers' compression ladder.
 */
declare enum MetricGranularity {
    DAY = "DAY",
    WEEK = "WEEK",
    MONTH = "MONTH",
    LIFETIME = "LIFETIME"
}
declare const ALL_DAYS: readonly DayOfWeek[];
declare const LEAD_CATEGORIES: ReadonlySet<ContactCategory>;
/**
 * CAC verification verdicts written to `companies.metadata.cacVerification` by
 * the CAC verification cron. Wire values = the strings stored in the metadata
 * JSON; single source for the workers' writer and the web admin's reader.
 */
declare const CAC_EVIDENCE_STATUS: {
    readonly FOUND: "FOUND";
    readonly INACTIVE: "INACTIVE";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly ERROR: "ERROR";
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
declare function safeEnumValue<T extends Record<string, string>>(enumObj: T, value: string): T[keyof T] | undefined;

declare function sleep(ms: number): Promise<void>;
/**
 * Canonical node-level transient network error codes, shared across
 * logistix-backend (postgres.js wrapper) and logistix-workers (pg/Hyperdrive
 * wrapper). These are OS/Node codes surfaced on the error (or its `cause`)
 * when a connection cannot be established or is dropped mid-query.
 */
declare const RETRYABLE_NETWORK_ERROR_CODES: Set<string>;
/**
 * Canonical PostgreSQL SQLSTATE codes for connection-class failures.
 * `08xxx` is the connection_exception class; 57P03 = cannot_connect_now;
 * 53300 = too_many_connections. Consumed by the workers pg wrapper, whose
 * driver reports protocol failures as SQLSTATE on `error.code`. The backend
 * postgres.js wrapper classifies node-level network codes instead
 * (`RETRYABLE_NETWORK_ERROR_CODES`) — the two driver layers legitimately
 * differ in the shape of the errors they surface.
 */
declare const RETRYABLE_SQLSTATE_CODES: Set<string>;
interface WithRetryOptions {
    maxRetries?: number;
    baseMs?: number;
    maxDelayMs?: number;
    label?: string;
    isRetryable?: (error: unknown) => boolean;
    onRetry?: (info: {
        attempt: number;
        maxRetries: number;
        error: unknown;
        delayMs: number;
    }) => void;
}
/**
 * Retries a function with exponential backoff + jitter.
 * Only retries on 5xx, 429 (rate limit), network errors, and timeouts.
 * Does NOT retry 4xx (client errors) or success responses.
 * Pass a custom `isRetryable` to change retry eligibility (e.g. always retry).
 */
declare function withRetry<T>(fn: (attempt: number) => Promise<T>, options?: WithRetryOptions): Promise<T>;
/**
 * Classifies an error as transient (retryable) from HTTP status codes, known
 * network/timeout error codes, and message substrings. Also unwraps
 * `error.cause` chains — real Node fetch failures surface as
 * `TypeError: fetch failed` with the transient code nested on `cause`.
 * Strict superset of top-level-only classification (cycle-safe).
 */
declare function isTransientHttpError(error: unknown): boolean;

export { SecuritySeverity as $, ALL_DAYS as A, LedgerAdjustmentType as B, type CACEvidenceStatus as C, DayOfWeek as D, EntityType as E, FcmNotificationType as F, LlmRole as G, LogLevel as H, IdType as I, JobType as J, MessageStatus as K, LEAD_CATEGORIES as L, MESSAGE_STATUS_RANK as M, MetricDomain as N, MetricGranularity as O, NOTIFICATION_PRIORITY as P, NodeEnv as Q, type NotificationPriority as R, PaymentMethod as S, PaymentProvider as T, PaymentStatus as U, ProviderCapability as V, ProviderRole as W, RETRYABLE_NETWORK_ERROR_CODES as X, RETRYABLE_SQLSTATE_CODES as Y, RiderStatus as Z, SecurityEventType as _, AdminDeliveryAction as a, SenderType as a0, SseEventType as a1, SubscriptionEventType as a2, SubscriptionHealth as a3, SubscriptionStatus as a4, SubscriptionTier as a5, SystemStatus as a6, TransactionStatus as a7, TransactionType as a8, UserAuditAction as a9, UserRole as aa, VehicleType as ab, type WithRetryOptions as ac, isTransientHttpError as ad, safeEnumValue as ae, sleep as af, withRetry as ag, AdminEscalationAction as b, AdminRole as c, ApiTag as d, ApprovalStatus as e, AuditActorType as f, CAC_EVIDENCE_STATUS as g, ChannelPlatform as h, ChannelType as i, CompanyAccessLevel as j, CompanyChannelStatus as k, ContactCategory as l, ConversationHandlerType as m, ConversationScope as n, DeliveryExpiryReason as o, DeliveryStatus as p, DeliverySyncScope as q, DevicePlatform as r, DispatcherRole as s, ErrorCode as t, EscalatedTo as u, EscalationStatus as v, EventType as w, ExportDataType as x, ExportReason as y, JwtTokenType as z };
