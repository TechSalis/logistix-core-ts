export enum UserRole {
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  DISPATCHER = 'DISPATCHER',
  RIDER = 'RIDER',
  CUSTOMER = 'CUSTOMER',
}

export enum DeliveryStatus {
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

export function isDeliveryTerminal(status: DeliveryStatus): boolean {
  return (
    status === DeliveryStatus.DELIVERED ||
    status === DeliveryStatus.CANCELLED ||
    status === DeliveryStatus.FAILED
  );
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
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
  DISABLED = 'DISABLED',
}

export enum EntityType {
  USER = 'USER',
  DELIVERY = 'DELIVERY',
  RIDER = 'RIDER',
  COMPANY = 'COMPANY',
  DISPATCHER = 'DISPATCHER',
  SYSTEM = 'SYSTEM',
  MESSAGE = 'MESSAGE',
  COMPANY_CHANNEL = 'COMPANY_CHANNEL',
}

export enum ChannelPlatform {
  WHATSAPP = 'WHATSAPP',
  INSTAGRAM = 'INSTAGRAM',
  FACEBOOK = 'FACEBOOK',
  TIKTOK = 'TIKTOK',
  BUSINESS = 'BUSINESS',
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
  USER_PURGED = 'USER_PURGED',
  MESSAGE_SENT = 'MESSAGE_SENT',
  CHANNEL_SETUP = 'CHANNEL_SETUP',
  CHANNEL_ACTIVATED = 'CHANNEL_ACTIVATED',
  CHANNEL_DEACTIVATED = 'CHANNEL_DEACTIVATED',
  MESSAGE_DELETED = 'MESSAGE_DELETED',
  DISPATCHER_DELETED = 'DISPATCHER_DELETED',
  DOWNGRADE = 'DOWNGRADE',
  CANCELLED_PAYMENT_TIMEOUT = 'CANCELLED_PAYMENT_TIMEOUT',
  AI_EXECUTION = 'AI_EXECUTION',
  SECURITY_INCIDENT = 'SECURITY_INCIDENT',
  COMPANY_ACTIVATED = 'COMPANY_ACTIVATED',
  COMPANY_DEACTIVATED = 'COMPANY_DEACTIVATED',
  COMPANY_TIER_CHANGED = 'COMPANY_TIER_CHANGED',
  SUBSCRIPTION_STATUS_CHANGED = 'SUBSCRIPTION_STATUS_CHANGED',

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
}

export enum NotificationPriority {
  URGENT = 'URGENT',
}

export enum UserAuditAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
}

export enum ChatUpdateType {
  MESSAGE = 'MESSAGE',
  TYPING = 'TYPING',
}

export enum MessageStatus {
  SENT = 'SENT',
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

export enum ExportRequestStatus {
  PENDING = 'PENDING',
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
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',
}

export enum SystemStatus {
  UP = 'UP',
  DOWN = 'DOWN',
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
}

export enum JwtTokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
  SSE = 'sse',
}

export enum ContactCategory {
  SUPPORT = 'Support',
  PARTNERSHIP = 'Become a Partner',
  BUSINESS = 'For Business',
}

export enum DayOfWeek {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

// Categories that should generate leads in external CRM/Sheets
// Uses enum members so display strings can change without breaking logic
export const LEAD_CATEGORIES: ReadonlySet<ContactCategory> = new Set([
  ContactCategory.PARTNERSHIP,
  ContactCategory.BUSINESS,
]);

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
