export enum UserRole {
  ADMIN = 'ADMIN',
  DISPATCHER = 'DISPATCHER',
  RIDER = 'RIDER',
}

export enum AdminRole {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum DispatcherRole {
  OWNER = 'OWNER',
  DISPATCHER = 'DISPATCHER',
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

export enum CompanyAccessLevel {
  FULL = 'FULL',
  TRIAL = 'TRIAL',
  PAST_DUE = 'PAST_DUE',
  RESTRICTED = 'RESTRICTED',
}

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

export enum NodeEnv {
  Development = 'development',
  Staging = 'staging',
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
  PAST_DUE = 'PAST_DUE',
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
  RIDER_DELETED = 'RIDER_DELETED',
  RIDER_DOCUMENTS_VERIFIED = 'RIDER_DOCUMENTS_VERIFIED',
  RIDER_DOCUMENTS_REJECTED = 'RIDER_DOCUMENTS_REJECTED',
  CHANNEL_SETUP = 'CHANNEL_SETUP',
  CHANNEL_ACTIVATED = 'CHANNEL_ACTIVATED',
  CHANNEL_DEACTIVATED = 'CHANNEL_DEACTIVATED',
  SUBSCRIPTION_STATUS_CHANGED = 'SUBSCRIPTION_STATUS_CHANGED',
  DISPATCHER_DELETED = 'DISPATCHER_DELETED',
  AI_EXECUTION = 'AI_EXECUTION',
  SECURITY_INCIDENT = 'SECURITY_INCIDENT',
  COMPANY_ACTIVATED = 'COMPANY_ACTIVATED',
  COMPANY_DEACTIVATED = 'COMPANY_DEACTIVATED',
  COMPANY_TIER_CHANGED = 'COMPANY_TIER_CHANGED',
  COMPANY_VERIFIED = 'COMPANY_VERIFIED',
  COMPANY_VERIFICATION_REJECTED = 'COMPANY_VERIFICATION_REJECTED',
  USER_PURGED = 'USER_PURGED',
  CANCELLED_PAYMENT_TIMEOUT = 'CANCELLED_PAYMENT_TIMEOUT',
  DOWNGRADE = 'DOWNGRADE',
  MESSAGE_DELETED = 'MESSAGE_DELETED',
}

export enum SubscriptionEventType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
  ASSIGNED = 'ASSIGNED',
  STATUS_CHANGED = 'STATUS_CHANGED',
}

export enum UserAuditAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
}

export enum ChatUpdateType {
  MESSAGE = 'MESSAGE',
  OWNERSHIP = 'OWNERSHIP',
  CONVERSATION = 'CONVERSATION',
  CHANNEL = 'CHANNEL',
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
  TAKEN_OVER = 'TAKEN_OVER',
}

export enum EscalatedTo {
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN',
  DISPATCHER = 'DISPATCHER',
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

export enum JobStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

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

export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  CLIENT_AUTH_REQUIRED = 'CLIENT_AUTH_REQUIRED',
  TOO_MANY_ATTEMPTS = 'TOO_MANY_ATTEMPTS',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
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

export enum FcmNotificationType {
  SUBSCRIPTION_CANCELLED = 'SUBSCRIPTION_CANCELLED',
  DELIVERY_ASSIGNED = 'DELIVERY_ASSIGNED',
  COMPANY_STATUS_CHANGED = 'COMPANY_STATUS_CHANGED',
  SETTLEMENT_FAILED = 'SETTLEMENT_FAILED',
  SETTLEMENT_REVERSAL = 'SETTLEMENT_REVERSAL',
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

export const WEEKDAYS: readonly DayOfWeek[] = Object.values(DayOfWeek);

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
