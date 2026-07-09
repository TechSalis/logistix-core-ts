export enum UserRole {
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  DISPATCHER = 'DISPATCHER',
  RIDER = 'RIDER',
  CUSTOMER = 'CUSTOMER',
}

export enum ActorType {
  SYSTEM = 'SYSTEM',
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum DeliveryStatus {
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export function isDeliveryActive(status: DeliveryStatus): boolean {
  return (
    status === DeliveryStatus.PENDING ||
    status === DeliveryStatus.ASSIGNED ||
    status === DeliveryStatus.IN_TRANSIT
  );
}

export function isDeliveryTerminal(status: DeliveryStatus): boolean {
  return status === DeliveryStatus.DELIVERED || status === DeliveryStatus.CANCELLED;
}

export enum PaymentMethod {
  PREPAID = 'PREPAID',
  PAY_ON_DELIVERY = 'PAY_ON_DELIVERY',
}

export enum RiderStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  BUSY = 'BUSY',
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
}

export enum EntityType {
  USER = 'USER',
  DELIVERY = 'DELIVERY',
  RIDER = 'RIDER',
  COMPANY = 'COMPANY',
  DISPATCHER = 'DISPATCHER',
  ADMIN = 'ADMIN',
  SYSTEM = 'SYSTEM',
  MESSAGE = 'MESSAGE',
  COMPANY_INTEGRATION = 'COMPANY_INTEGRATION',
  CONVERSATION = 'CONVERSATION',
}

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

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Staging = 'staging',
}

export enum VehicleType {
  BIKE = 'BIKE',
  CAR = 'CAR',
  VAN = 'VAN',
  TRUCK = 'TRUCK',
}

export enum SubscriptionTier {
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE',
}

export enum SubscriptionStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  GRACE = 'GRACE',
  LOCKED = 'LOCKED',
  CANCELLED = 'CANCELLED',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REVERSED = 'REVERSED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
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
  REFUND = 'REFUND',
  AI_USAGE = 'AI_USAGE',
  CHANNEL_FEE = 'CHANNEL_FEE',
  OVERAGE = 'OVERAGE',
}

export enum ChannelType {
  LOGISTIX_NETWORK = 'LOGISTIX_NETWORK',
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
  CANCELLED_PAYMENT_TIMEOUT = 'CANCELLED_PAYMENT_TIMEOUT',
  SUMMARIZE_AND_PRUNE = 'SUMMARIZE_AND_PRUNE',
  AI_EXECUTION = 'AI_EXECUTION',
  SECURITY_INCIDENT = 'SECURITY_INCIDENT',
  COMPANY_ACTIVATED = 'COMPANY_ACTIVATED',
  COMPANY_DEACTIVATED = 'COMPANY_DEACTIVATED',
  COMPANY_TIER_CHANGED = 'COMPANY_TIER_CHANGED',
  SUBSCRIPTION_STATUS_CHANGED = 'SUBSCRIPTION_STATUS_CHANGED',
  ENTERPRISE_QUOTE_APPROVED = 'ENTERPRISE_QUOTE_APPROVED',
  ENTERPRISE_QUOTE_REJECTED = 'ENTERPRISE_QUOTE_REJECTED',
  COMPANY_VERIFIED = 'COMPANY_VERIFIED',
  COMPANY_VERIFICATION_REJECTED = 'COMPANY_VERIFICATION_REJECTED',
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

export enum EscalationStatus {
  OPEN = 'OPEN',
  RESOLVED = 'RESOLVED',
  HIJACKED = 'HIJACKED',
}

export enum EscalatedTo {
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
}

export enum SenderType {
  CUSTOMER = 'CUSTOMER',
  AGENT = 'AGENT',
  DISPATCHER = 'DISPATCHER',
  SYSTEM = 'SYSTEM',
}

export enum MappingSource {
  MANUAL = 'MANUAL',
  DISCOVERY = 'DISCOVERY',
}

export enum ExportRequestStatus {
  PENDING = 'PENDING',
  PROCESSING_EMAIL = 'PROCESSING_EMAIL',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum SecurityEventType {
  RATE_LIMIT = 'RATE_LIMIT',
  MALICIOUS_REQUEST = 'MALICIOUS_REQUEST',
  AUTH_FAILURE = 'AUTH_FAILURE',
  BRUTE_FORCE = 'BRUTE_FORCE',
  FAILED_SUDO_ATTEMPT = 'FAILED_SUDO_ATTEMPT',
  SUDO_ELEVATED = 'SUDO_ELEVATED',
  SUDO_EXPIRED = 'SUDO_EXPIRED',
}

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
  CLIENT_AUTH_REQUIRED = 'CLIENT_AUTH_REQUIRED',
  OTP_LIMIT_EXCEEDED = 'OTP_LIMIT_EXCEEDED',
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',
  TOO_MANY_REGISTRATIONS = 'TOO_MANY_REGISTRATIONS',
  LOW_CONFIDENCE_EXTRACTION = 'LOW_CONFIDENCE_EXTRACTION',
  DISPATCH_UNAVAILABLE = 'DISPATCH_UNAVAILABLE',
}

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
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

export enum ApiTag {
  ANALYTICS = 'Analytics',
  TRACKING = 'Tracking',
  AUTH = 'Auth',
  CONTACT = 'Contact',
  BILLING = 'Billing',
  ADMIN = 'Admin',
  GRAPHQL = 'GraphQL',
  SYSTEM = 'System',
  ONBOARDING = 'Onboarding',
}

export enum UpdateReason {
  REJECTED_BY_COMPANY = 'REJECTED_BY_COMPANY',
}

export enum SseEventType {
  CONNECTED = 'connected',
  DELIVERY = 'delivery',
  RIDER = 'rider',
  MESSAGE = 'message',
  ASSIGNMENT = 'assignment',

  RIDER_LOCATION = 'rider-location',
  COMPANY = 'company',
}

export enum JwtTokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export enum ContactCategory {
  SUPPORT = 'Support',
  PARTNERSHIP = 'Become a Partner',
  BUSINESS = 'Use Logistix for Business',
}

// Categories that should generate leads in external CRM/Sheets
// Uses enum members so display strings can change without breaking logic
export const LEAD_CATEGORIES: ReadonlySet<ContactCategory> = new Set([
  ContactCategory.PARTNERSHIP,
  ContactCategory.BUSINESS,
]);
