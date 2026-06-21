/**
 * Application-wide enumerations shared across backend, workers, and web clients.
 * This is the single source of truth — never duplicate these in downstream projects.
 */

// ─── User & Access ───────────────────────────────────────────────────────────

export enum UserRole {
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  DISPATCHER = 'DISPATCHER',
  RIDER = 'RIDER',
}

export enum ActorType {
  SYSTEM = 'SYSTEM',
  USER = 'USER',
  ADMIN = 'ADMIN',
}

// ─── Delivery Lifecycle ──────────────────────────────────────────────────────

export enum DeliveryStatus {
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_TRANSIT = 'IN_TRANSIT',
  EN_ROUTE = 'EN_ROUTE',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  PREPAID = 'PREPAID',
  PAY_ON_DELIVERY = 'PAY_ON_DELIVERY',
}

// ─── Rider ───────────────────────────────────────────────────────────────────

export enum RiderStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  BUSY = 'BUSY',
}

export enum PermitStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

// ─── System & Events ─────────────────────────────────────────────────────────

export enum EntityType {
  USER = 'USER',
  DELIVERY = 'DELIVERY',
  RIDER = 'RIDER',
  COMPANY = 'COMPANY',
  DISPATCHER = 'DISPATCHER',
  SYSTEM = 'SYSTEM',
  MESSAGE = 'MESSAGE',
  COMPANY_INTEGRATION = 'COMPANY_INTEGRATION',
  CONVERSATION = 'CONVERSATION',
}

// ─── Integrations & Platforms ─────────────────────────────────────────────────

export enum MappingPlatform {
  WHATSAPP = 'WHATSAPP',
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
  TIKTOK = 'TIKTOK',
}

export enum MomentoType {
  MAIN = 'MAIN',
  AI = 'AI',
}

// ─── Vehicle Types ────────────────────────────────────────────────────────────

export enum VehicleType {
  BIKE = 'BIKE',
  CAR = 'CAR',
  VAN = 'VAN',
  TRUCK = 'TRUCK',
}

// ─── Billing & Subscriptions ──────────────────────────────────────────────────

export enum SubscriptionTier {
  FREE = 'FREE',
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REVERSED = 'REVERSED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  EXPIRED = 'EXPIRED',
}

export enum LedgerAdjustmentType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  CORRECTION = 'CORRECTION',
  REFUND = 'REFUND',
}

export enum PaymentProvider {
  SQUAD = 'SQUAD',
}

export enum EventType {
  DELIVERY_ASSIGNED = 'DELIVERY_ASSIGNED',
  DELIVERY_UPDATED = 'DELIVERY_UPDATED',
  DELIVERY_CREATED = 'DELIVERY_CREATED',
  DELIVERY_STATUS_CHANGED = 'DELIVERY_STATUS_CHANGED',
  DELIVERY_DELETED = 'DELIVERY_DELETED',
  RIDER_LOCATION_UPDATED = 'RIDER_LOCATION_UPDATED',
  RIDER_ASSIGNED = 'RIDER_ASSIGNED',
  RIDER_ACCEPTED = 'RIDER_ACCEPTED',
  RIDER_DELETED = 'RIDER_DELETED',
  USER_DEACTIVATED = 'USER_DEACTIVATED',
  USER_PURGED = 'USER_PURGED',
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_REGISTER = 'USER_REGISTER',
  MESSAGE_SENT = 'MESSAGE_SENT',
  INTEGRATION_SETUP = 'INTEGRATION_SETUP',
  INTEGRATION_ACTIVATED = 'INTEGRATION_ACTIVATED',
  INTEGRATION_DEACTIVATED = 'INTEGRATION_DEACTIVATED',
  MESSAGE_DELETED = 'MESSAGE_DELETED',
  DISPATCHER_DELETED = 'DISPATCHER_DELETED',
  DOWNGRADE = 'DOWNGRADE',
  CANCEL_PAYMENT_TIMEOUT = 'CANCEL_PAYMENT_TIMEOUT',
  SUMMARIZE_AND_PRUNE = 'SUMMARIZE_AND_PRUNE',
  AI_EXECUTION = 'AI_EXECUTION',
}

export enum SubscriptionEventType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
  ASSIGNED = 'ASSIGNED',
  STATUS_CHANGED = 'STATUS_CHANGED',
  LOCATION_UPDATED = 'LOCATION_UPDATED',
}

export enum NotificationEventType {
  HUMAN_REQUEST = 'HUMAN_REQUEST',
  ACTION_REQUIRED = 'ACTION_REQUIRED',
  DELIVERY_UPDATE = 'DELIVERY_UPDATE',
  RIDER_UPDATE = 'RIDER_UPDATE',
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

// ─── Audit ───────────────────────────────────────────────────────────────────

export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ACCESS = 'ACCESS',
}

export enum UserAuditAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  DELIVERY_CREATE = 'DELIVERY_CREATE',
  DELIVERY_UPDATE = 'DELIVERY_UPDATE',
  DELIVERY_ASSIGN = 'DELIVERY_ASSIGN',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  RATE_LIMIT_HIT = 'RATE_LIMIT_HIT',
  INVALID_ACCESS_ATTEMPT = 'INVALID_ACCESS_ATTEMPT',
}

// ─── Chat ────────────────────────────────────────────────────────────────────

export enum ChatUpdateType {
  MESSAGE = 'MESSAGE',
  TYPING = 'TYPING',
  STATUS = 'STATUS',
}

export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
}

// ─── Security ────────────────────────────────────────────────────────────────

export enum SecurityEventType {
  RATE_LIMIT = 'RATE_LIMIT',
  MALICIOUS_REQUEST = 'MALICIOUS_REQUEST',
  AUTH_FAILURE = 'AUTH_FAILURE',
  BRUTE_FORCE = 'BRUTE_FORCE',
}

export enum SecuritySeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

// ─── Errors ───────────────────────────────────────────────────────────────────

export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CLIENT_AUTH_REQUIRED = 'CLIENT_AUTH_REQUIRED',
  OTP_LIMIT_EXCEEDED = 'OTP_LIMIT_EXCEEDED',
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',
  TOO_MANY_REGISTRATIONS = 'TOO_MANY_REGISTRATIONS',
  LOW_CONFIDENCE_EXTRACTION = 'LOW_CONFIDENCE_EXTRACTION',
}

// ─── System Status ───────────────────────────────────────────────────────────

export enum SystemStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  DEGRADED = 'DEGRADED',
}

export enum ComponentStatus {
  HEALTHY = 'HEALTHY',
  UNHEALTHY = 'UNHEALTHY',
  UNKNOWN = 'UNKNOWN',
  CONFIGURED = 'CONFIGURED',
  NOT_CONFIGURED = 'NOT_CONFIGURED',
  PARTIALLY_CONFIGURED = 'PARTIALLY_CONFIGURED',
}

// ─── AI / LLM ────────────────────────────────────────────────────────────────

export enum LlmRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

export enum ProviderRole {
  INTERPRETATION = 'interpretation',
  SYNTHESIS = 'synthesis',
  BOTH = 'both',
}

// ─── Logging ─────────────────────────────────────────────────────────────────

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

// ─── API ─────────────────────────────────────────────────────────────────────

export enum ApiTag {
  ANALYTICS = 'Analytics',
  TRACKING = 'Tracking',
  AUTH = 'Auth',
  CONTACT = 'Contact',
  BILLING = 'Billing',
  ADMIN = 'Admin',
  GRAPHQL = 'GraphQL',
  SYSTEM = 'System',
}

export enum UpdateReason {
  REJECTED_BY_COMPANY = 'REJECTED_BY_COMPANY',
}
