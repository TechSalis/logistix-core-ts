import * as drizzle_orm from 'drizzle-orm';
import * as drizzle_orm_pg_core from 'drizzle-orm/pg-core';

declare enum UserRole {
    ADMIN = "ADMIN",
    COMPANY = "COMPANY",
    DISPATCHER = "DISPATCHER",
    RIDER = "RIDER"
}
declare enum ActorType {
    SYSTEM = "SYSTEM",
    USER = "USER",
    ADMIN = "ADMIN"
}
declare enum DeliveryStatus {
    AWAITING_PAYMENT = "AWAITING_PAYMENT",
    PENDING = "PENDING",
    ASSIGNED = "ASSIGNED",
    IN_TRANSIT = "IN_TRANSIT",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
declare function isDeliveryActive(status: DeliveryStatus): boolean;
declare function isDeliveryTerminal(status: DeliveryStatus): boolean;
declare enum PaymentMethod {
    PREPAID = "PREPAID",
    PAY_ON_DELIVERY = "PAY_ON_DELIVERY"
}
declare enum RiderStatus {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
    BUSY = "BUSY"
}
declare enum PermitStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
declare enum EntityType {
    USER = "USER",
    DELIVERY = "DELIVERY",
    RIDER = "RIDER",
    COMPANY = "COMPANY",
    DISPATCHER = "DISPATCHER",
    SYSTEM = "SYSTEM",
    MESSAGE = "MESSAGE",
    COMPANY_INTEGRATION = "COMPANY_INTEGRATION",
    CONVERSATION = "CONVERSATION"
}
declare enum MappingPlatform {
    WHATSAPP = "WHATSAPP",
    INSTAGRAM = "INSTAGRAM",
    FACEBOOK = "FACEBOOK",
    TIKTOK = "TIKTOK"
}
declare enum MomentoType {
    MAIN = "MAIN",
    AI = "AI"
}
declare enum VehicleType {
    BIKE = "BIKE",
    CAR = "CAR",
    VAN = "VAN",
    TRUCK = "TRUCK"
}
declare enum SubscriptionTier {
    FREE = "FREE",
    STARTER = "STARTER",
    PROFESSIONAL = "PROFESSIONAL"
}
declare enum TransactionStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    REVERSED = "REVERSED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED",
    EXPIRED = "EXPIRED"
}
declare enum LedgerAdjustmentType {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT",
    CORRECTION = "CORRECTION",
    REFUND = "REFUND"
}
declare enum PaymentProvider {
    SQUAD = "SQUAD"
}
declare enum EventType {
    DELIVERY_ASSIGNED = "DELIVERY_ASSIGNED",
    DELIVERY_UPDATED = "DELIVERY_UPDATED",
    DELIVERY_CREATED = "DELIVERY_CREATED",
    DELIVERY_STATUS_CHANGED = "DELIVERY_STATUS_CHANGED",
    DELIVERY_DELETED = "DELIVERY_DELETED",
    RIDER_LOCATION_UPDATED = "RIDER_LOCATION_UPDATED",
    RIDER_ASSIGNED = "RIDER_ASSIGNED",
    RIDER_ACCEPTED = "RIDER_ACCEPTED",
    RIDER_DELETED = "RIDER_DELETED",
    USER_DEACTIVATED = "USER_DEACTIVATED",
    USER_PURGED = "USER_PURGED",
    USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT",
    USER_REGISTER = "USER_REGISTER",
    MESSAGE_SENT = "MESSAGE_SENT",
    INTEGRATION_SETUP = "INTEGRATION_SETUP",
    INTEGRATION_ACTIVATED = "INTEGRATION_ACTIVATED",
    INTEGRATION_DEACTIVATED = "INTEGRATION_DEACTIVATED",
    MESSAGE_DELETED = "MESSAGE_DELETED",
    DISPATCHER_DELETED = "DISPATCHER_DELETED",
    DOWNGRADE = "DOWNGRADE",
    CANCEL_PAYMENT_TIMEOUT = "CANCEL_PAYMENT_TIMEOUT",
    SUMMARIZE_AND_PRUNE = "SUMMARIZE_AND_PRUNE",
    AI_EXECUTION = "AI_EXECUTION"
}
declare enum SubscriptionEventType {
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    DELETED = "DELETED",
    ASSIGNED = "ASSIGNED",
    STATUS_CHANGED = "STATUS_CHANGED",
    LOCATION_UPDATED = "LOCATION_UPDATED"
}
declare enum NotificationEventType {
    HUMAN_REQUEST = "HUMAN_REQUEST",
    ACTION_REQUIRED = "ACTION_REQUIRED",
    DELIVERY_UPDATE = "DELIVERY_UPDATE",
    RIDER_UPDATE = "RIDER_UPDATE"
}
declare enum NotificationPriority {
    LOW = "LOW",
    NORMAL = "NORMAL",
    HIGH = "HIGH",
    URGENT = "URGENT"
}
declare enum AuditAction {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    ACCESS = "ACCESS"
}
declare enum UserAuditAction {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    PROFILE_UPDATE = "PROFILE_UPDATE",
    DELIVERY_CREATE = "DELIVERY_CREATE",
    DELIVERY_UPDATE = "DELIVERY_UPDATE",
    DELIVERY_ASSIGN = "DELIVERY_ASSIGN",
    SUSPICIOUS_ACTIVITY = "SUSPICIOUS_ACTIVITY",
    RATE_LIMIT_HIT = "RATE_LIMIT_HIT",
    INVALID_ACCESS_ATTEMPT = "INVALID_ACCESS_ATTEMPT"
}
declare enum ChatUpdateType {
    MESSAGE = "MESSAGE",
    TYPING = "TYPING",
    STATUS = "STATUS"
}
declare enum MessageStatus {
    SENT = "SENT",
    DELIVERED = "DELIVERED",
    READ = "READ",
    FAILED = "FAILED"
}
declare enum SecurityEventType {
    RATE_LIMIT = "RATE_LIMIT",
    MALICIOUS_REQUEST = "MALICIOUS_REQUEST",
    AUTH_FAILURE = "AUTH_FAILURE",
    BRUTE_FORCE = "BRUTE_FORCE"
}
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
    CLIENT_AUTH_REQUIRED = "CLIENT_AUTH_REQUIRED",
    OTP_LIMIT_EXCEEDED = "OTP_LIMIT_EXCEEDED",
    TOO_MANY_ATTEMPTS = "TOO_MANY_ATTEMPTS",
    TOO_MANY_REGISTRATIONS = "TOO_MANY_REGISTRATIONS",
    LOW_CONFIDENCE_EXTRACTION = "LOW_CONFIDENCE_EXTRACTION"
}
declare enum SystemStatus {
    UP = "UP",
    DOWN = "DOWN",
    DEGRADED = "DEGRADED"
}
declare enum ComponentStatus {
    HEALTHY = "HEALTHY",
    UNHEALTHY = "UNHEALTHY",
    UNKNOWN = "UNKNOWN",
    CONFIGURED = "CONFIGURED",
    NOT_CONFIGURED = "NOT_CONFIGURED",
    PARTIALLY_CONFIGURED = "PARTIALLY_CONFIGURED"
}
declare enum LlmRole {
    USER = "user",
    ASSISTANT = "assistant",
    SYSTEM = "system"
}
declare enum ProviderRole {
    INTERPRETATION = "interpretation",
    SYNTHESIS = "synthesis",
    BOTH = "both"
}
declare enum LogLevel {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    DEBUG = "debug"
}
declare enum ApiTag {
    ANALYTICS = "Analytics",
    TRACKING = "Tracking",
    AUTH = "Auth",
    CONTACT = "Contact",
    BILLING = "Billing",
    ADMIN = "Admin",
    GRAPHQL = "GraphQL",
    SYSTEM = "System"
}
declare enum UpdateReason {
    REJECTED_BY_COMPANY = "REJECTED_BY_COMPANY"
}

/**
 * Global system configuration.
 *
 * All values can be overridden via environment variables so that staging
 * environments never require code changes.
 *
 * In Node.js (backend / workers) env vars are read from process.env.
 * In browser environments the host app is responsible for injecting values
 * (e.g. via SvelteKit's PUBLIC_ env vars) and passing them to this factory.
 */
interface SystemConfig {
    /** Public-facing brand name shown in emails, UI, etc. */
    readonly brandName: string;
    /** Primary domain (without protocol), e.g. "logistix.team" */
    readonly domain: string;
    /** Transactional / support email address */
    readonly supportEmail: string;
    /** Primary support phone number */
    readonly phoneNumber: string;
    /** Full URL to the publicly hosted logo */
    readonly logoUrl: string;
    /** Full URL to the favicon */
    readonly faviconUrl: string;
    /** Whether delivery tracking codes are enabled */
    readonly enableTrackingCodes: boolean;
    /** Business working hours per weekday */
    readonly workingHours: Record<string, {
        start: string;
        close: string;
    }>;
    /** The unique business handle representing the central/system company hub */
    readonly businessHandle: string;
}
declare const DEFAULT_WORKING_HOURS: Record<string, {
    start: string;
    close: string;
}>;
/**
 * Builds a SystemConfig from environment variables with strict validation.
 *
 * @param env - An object of environment variables (e.g. `process.env` on Node,
 *              or a manually constructed map in the browser).
 */
declare function buildSystemConfig(env?: Record<string, string | undefined>): SystemConfig;
/**
 * Node.js singleton — auto-populated from process.env.
 * Import this directly in the backend and workers.
 *
 * In browser/SvelteKit code, call `buildSystemConfig(yourEnvMap)` instead,
 * since `process.env` is not available.
 */
declare const SYSTEM_CONFIG: SystemConfig;

interface RegionalConfig {
    readonly defaultCountryCode: string;
    readonly timeZone: string;
    readonly states: readonly string[];
}
declare const REGIONAL_CONFIG: RegionalConfig;

interface TierLimits {
    readonly maxAIDeliveriesPerAction: number;
    readonly maxBulkDeliveries: number;
    readonly maxQueryLimit: number;
    readonly maxTrackingHistory: number;
    readonly maxMemoryArraySize: number;
    readonly maxSynthesisResults: number;
    readonly maxDrafts: number;
    readonly retentionDays: number;
}
interface LimitsConfig {
    readonly maxBatchSize: number;
    readonly dbBatchSize: number;
    readonly userActionConcurrency: number;
    readonly externalApiConcurrency: number;
    readonly maxDisambiguationOptions: number;
    readonly maxQueryLimit: number;
    readonly locationDeduplicationRadiusMeters: number;
    readonly disambiguationGapThreshold: number;
    readonly externalApiTimeoutMs: number;
    readonly trackingFrequencyConfig: {
        readonly baseIntervalMs: number;
        readonly farDistanceMeters: number;
        readonly farIntervalMs: number;
    };
}
declare const LIMITS_CONFIG: LimitsConfig;
/**
 * Tier-based limits - ALL operational limits are tier-aware
 * These limits control the entire flow from drafting to synthesis
 */
declare const TIER_LIMITS: Record<SubscriptionTier, TierLimits>;
/**
 * Get tier-specific limits for a subscription tier
 */
declare const getTierLimits: (tier: string | SubscriptionTier) => TierLimits;

/**
 * Billing configuration constants
 */
declare const BILLING_CONFIG: {
    /**
     * Currency to use across the system
     */
    readonly CURRENCY: "NGN";
    /**
     * Monthly subscription pricing (in Kobo - Nigerian currency)
     * 1 Naira = 100 Kobo
     */
    readonly PRICING: {
        readonly FREE: 0;
        readonly STARTER: 3000000;
        readonly PROFESSIONAL: 5000000;
    };
    /**
     * Billing cycle in days
     */
    readonly BILLING_CYCLE_DAYS: 30;
    /**
     * Grace period before downgrade (in days)
     */
    readonly GRACE_PERIOD_DAYS: 14;
    /**
     * Payment timeout for AWAITING_PAYMENT deliveries (in hours)
     */
    readonly PAYMENT_TIMEOUT_HOURS: 24;
    /**
     * Minimum balance required to avoid grace period (in Kobo)
     */
    readonly MINIMUM_BALANCE: 1000;
    /**
     * Retry configuration for failed payments
     */
    readonly PAYMENT_RETRY: {
        readonly MAX_ATTEMPTS: 3;
        readonly BACKOFF_DAYS: readonly [0, 3, 7];
    };
};
/**
 * Get subscription price for a tier with validation
 */
declare function getSubscriptionPrice(tier: string): number;
/**
 * Check if a tier is billable
 */
declare function isBillableTier(tier: string): boolean;
/**
 * Format amount from Kobo to Naira string
 */
declare function formatAmount(kobo: number): string;
/**
 * Check if we should bill based on last billing date
 * More reliable than checking activation date
 */
declare function shouldBillNow(lastBillingDate: Date | null, activationDate: Date): boolean;
/**
 * Check if we should retry a failed payment
 */
declare function shouldRetryPayment(lastBillingDate: Date, lastBillingStatus: string, retryAttempt: number): boolean;
/**
 * Get next retry date for a failed payment
 */
declare function getNextRetryDate(lastBillingDate: Date, retryAttempt: number): Date | null;

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
        readonly api: {
            readonly max: number;
            readonly windowMs: number;
        };
        readonly login: {
            readonly max: number;
            readonly window: number;
        };
        readonly register: {
            readonly max: number;
            readonly window: number;
        };
        readonly otp: {
            readonly max: number;
            readonly window: number;
        };
        readonly tiers: {
            readonly FREE: {
                readonly max: number;
                readonly windowMs: number;
            };
            readonly STARTER: {
                readonly max: number;
                readonly windowMs: number;
            };
            readonly PROFESSIONAL: {
                readonly max: number;
                readonly windowMs: number;
            };
        };
    };
    readonly jwt: {
        readonly jwtExpiresIn: string;
        readonly jwtRefreshExpiresIn: string;
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
        readonly securityPinLength: number;
        readonly securityPinMinRange: number;
        readonly securityPinMaxRange: number;
    };
}
declare const SECURITY_CONFIG: SecurityConfig;

interface AIConfig {
    readonly interpretation: {
        readonly maxTokens: number;
        readonly cooldownSeconds: number;
    };
    readonly synthesis: {
        readonly temperature: number;
        readonly maxTokens: number;
        readonly cooldownSeconds: number;
    };
    readonly heartbeatTtl: number;
    readonly heartbeatThresholdMs: number;
    readonly maxSingleMessageTokens: number;
    readonly maxMessagesPerResponse: number;
    readonly messageFetchLimit: {
        readonly default: number;
        readonly max: number;
    };
    readonly memoryCacheTtl: number;
    readonly maxIterations: number;
    readonly providerTimeoutMs: number;
}
declare const AI_CONFIG: AIConfig;
declare const QUEUES: {
    readonly aiChatTasks: "ai-chat-tasks";
};

/**
 * Delivery parser utilities shared across web clients.
 * These run entirely client-side with no network dependency.
 */
interface ParsedDelivery {
    pickupAddress: string;
    pickupPhone: string;
    dropOffAddress: string;
    dropOffPhone: string;
    description: string;
}
/**
 * Parses structured plain-text delivery templates into typed delivery objects.
 * Supports both single and bulk (multi-dropoff) formats separated by `---`.
 */
declare function localParse(text: string): ParsedDelivery[];

/**
 * Lightweight fetch wrapper with request timeout support.
 * Compatible with both Node.js (≥18) and browser environments.
 */
interface FetchWithTimeoutOptions extends Omit<RequestInit, 'signal'> {
    /** Timeout in milliseconds. Defaults to 20 000 ms. */
    timeoutMs?: number;
    /** Custom fetch implementation (useful for testing). */
    fetch?: typeof globalThis.fetch;
}
declare function fetchWithTimeout(url: string | URL | Request, options?: FetchWithTimeoutOptions): Promise<Response>;

interface SendEmailOptions {
    from: string;
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
}
declare class EmailService {
    private readonly apiKey;
    constructor(apiKey: string);
    sendEmail(options: SendEmailOptions): Promise<unknown>;
}

declare const deliveryStatus: drizzle_orm_pg_core.PgEnum<["AWAITING_PAYMENT", "PENDING", "ASSIGNED", "IN_TRANSIT", "DELIVERED", "CANCELLED"]>;
declare const exportRequestStatus: drizzle_orm_pg_core.PgEnum<["PENDING", "PROCESSING", "COMPLETED", "FAILED"]>;
declare const ledgerAdjustmentType: drizzle_orm_pg_core.PgEnum<["CREDIT", "DEBIT", "CORRECTION", "REFUND"]>;
declare const mappingPlatform: drizzle_orm_pg_core.PgEnum<["WHATSAPP", "INSTAGRAM", "TIKTOK", "FACEBOOK"]>;
declare const mappingSource: drizzle_orm_pg_core.PgEnum<["MANUAL", "DISCOVERY"]>;
declare const messageStatus: drizzle_orm_pg_core.PgEnum<["SENT", "DELIVERED", "READ", "FAILED"]>;
declare const paymentMethod: drizzle_orm_pg_core.PgEnum<["PREPAID", "POD"]>;
declare const permitStatus: drizzle_orm_pg_core.PgEnum<["PENDING", "APPROVED", "REJECTED"]>;
declare const riderStatus: drizzle_orm_pg_core.PgEnum<["OFFLINE", "ONLINE", "BUSY"]>;
declare const senderType: drizzle_orm_pg_core.PgEnum<["CUSTOMER", "AGENT", "DISPATCHER", "SYSTEM"]>;
declare const subscriptionTier: drizzle_orm_pg_core.PgEnum<["FREE", "STARTER", "PROFESSIONAL"]>;
declare const transactionStatus: drizzle_orm_pg_core.PgEnum<["PENDING", "SUCCESS", "FAILED", "REVERSED"]>;
declare const vehicleType: drizzle_orm_pg_core.PgEnum<["BIKE", "CAR", "VAN", "TRUCK"]>;
declare const companies: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "companies";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        businessHandle: drizzle_orm_pg_core.PgColumn<{
            name: "business_handle";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        logoUrl: drizzle_orm_pg_core.PgColumn<{
            name: "logo_url";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        cac: drizzle_orm_pg_core.PgColumn<{
            name: "cac";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        contactPhone: drizzle_orm_pg_core.PgColumn<{
            name: "contact_phone";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        address: drizzle_orm_pg_core.PgColumn<{
            name: "address";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        placeId: drizzle_orm_pg_core.PgColumn<{
            name: "place_id";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        states: drizzle_orm_pg_core.PgColumn<{
            name: "states";
            tableName: "companies";
            dataType: "array";
            columnType: "PgArray";
            data: string[];
            driverParam: string | string[];
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: drizzle_orm.Column<{
                name: "";
                tableName: "companies";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            identity: undefined;
            generated: undefined;
        }, {}, {
            baseBuilder: drizzle_orm_pg_core.PgColumnBuilder<{
                name: "";
                dataType: "string";
                columnType: "PgText";
                data: string;
                enumValues: [string, ...string[]];
                driverParam: string;
            }, {}, {}, drizzle_orm.ColumnBuilderExtraConfig>;
            size: undefined;
        }>;
        interstateDeliveries: drizzle_orm_pg_core.PgColumn<{
            name: "interstate_deliveries";
            tableName: "companies";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deactivatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "deactivated_at";
            tableName: "companies";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "companies";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const companySettings: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "company_settings";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "company_settings";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "company_settings";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        tier: drizzle_orm_pg_core.PgColumn<{
            name: "tier";
            tableName: "company_settings";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "FREE" | "STARTER" | "PROFESSIONAL";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["FREE", "STARTER", "PROFESSIONAL"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        workingHours: drizzle_orm_pg_core.PgColumn<{
            name: "working_hours";
            tableName: "company_settings";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        bankDetails: drizzle_orm_pg_core.PgColumn<{
            name: "bank_details";
            tableName: "company_settings";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ledgerBalance: drizzle_orm_pg_core.PgColumn<{
            name: "ledger_balance";
            tableName: "company_settings";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "company_settings";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const pricingSchemes: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "pricing_schemes";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "pricing_schemes";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "pricing_schemes";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        vehicleType: drizzle_orm_pg_core.PgColumn<{
            name: "vehicle_type";
            tableName: "pricing_schemes";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "BIKE" | "CAR" | "VAN" | "TRUCK";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["BIKE", "CAR", "VAN", "TRUCK"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        baseFare: drizzle_orm_pg_core.PgColumn<{
            name: "base_fare";
            tableName: "pricing_schemes";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        perKmRate: drizzle_orm_pg_core.PgColumn<{
            name: "per_km_rate";
            tableName: "pricing_schemes";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        minFare: drizzle_orm_pg_core.PgColumn<{
            name: "min_fare";
            tableName: "pricing_schemes";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "pricing_schemes";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const companyIntegrations: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "company_integrations";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "company_integrations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        platform: drizzle_orm_pg_core.PgColumn<{
            name: "platform";
            tableName: "company_integrations";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "WHATSAPP" | "INSTAGRAM" | "FACEBOOK" | "TIKTOK";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["WHATSAPP", "INSTAGRAM", "TIKTOK", "FACEBOOK"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        platformId: drizzle_orm_pg_core.PgColumn<{
            name: "platform_id";
            tableName: "company_integrations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "company_integrations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isActive: drizzle_orm_pg_core.PgColumn<{
            name: "is_active";
            tableName: "company_integrations";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isPlatformOwned: drizzle_orm_pg_core.PgColumn<{
            name: "is_platform_owned";
            tableName: "company_integrations";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "company_integrations";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "company_integrations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const conversations: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "conversations";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        platform: drizzle_orm_pg_core.PgColumn<{
            name: "platform";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "WHATSAPP" | "INSTAGRAM" | "FACEBOOK" | "TIKTOK";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["WHATSAPP", "INSTAGRAM", "TIKTOK", "FACEBOOK"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        platformId: drizzle_orm_pg_core.PgColumn<{
            name: "platform_id";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastMessageAt: drizzle_orm_pg_core.PgColumn<{
            name: "last_message_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        autoReplyEnabled: drizzle_orm_pg_core.PgColumn<{
            name: "auto_reply_enabled";
            tableName: "conversations";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastCustomerMessageAt: drizzle_orm_pg_core.PgColumn<{
            name: "last_customer_message_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        scratchpad: drizzle_orm_pg_core.PgColumn<{
            name: "scratchpad";
            tableName: "conversations";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        customerName: drizzle_orm_pg_core.PgColumn<{
            name: "customer_name";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const messages: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "messages";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        conversationId: drizzle_orm_pg_core.PgColumn<{
            name: "conversation_id";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        body: drizzle_orm_pg_core.PgColumn<{
            name: "body";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        senderType: drizzle_orm_pg_core.PgColumn<{
            name: "sender_type";
            tableName: "messages";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "DISPATCHER" | "SYSTEM" | "CUSTOMER" | "AGENT";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["CUSTOMER", "AGENT", "DISPATCHER", "SYSTEM"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        senderId: drizzle_orm_pg_core.PgColumn<{
            name: "sender_id";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isDeleted: drizzle_orm_pg_core.PgColumn<{
            name: "is_deleted";
            tableName: "messages";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "messages";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        mediaUrl: drizzle_orm_pg_core.PgColumn<{
            name: "media_url";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        externalId: drizzle_orm_pg_core.PgColumn<{
            name: "external_id";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        replyToExternalId: drizzle_orm_pg_core.PgColumn<{
            name: "reply_to_external_id";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "messages";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "DELIVERED" | "FAILED" | "SENT" | "READ";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["SENT", "DELIVERED", "READ", "FAILED"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "messages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "messages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const admins: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "admins";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "admins";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "admins";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        email: drizzle_orm_pg_core.PgColumn<{
            name: "email";
            tableName: "admins";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        fullName: drizzle_orm_pg_core.PgColumn<{
            name: "full_name";
            tableName: "admins";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "admins";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const dispatchers: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "dispatchers";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        email: drizzle_orm_pg_core.PgColumn<{
            name: "email";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        fullName: drizzle_orm_pg_core.PgColumn<{
            name: "full_name";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        fcmToken: drizzle_orm_pg_core.PgColumn<{
            name: "fcm_token";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isOwner: drizzle_orm_pg_core.PgColumn<{
            name: "is_owner";
            tableName: "dispatchers";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        permitStatus: drizzle_orm_pg_core.PgColumn<{
            name: "permit_status";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "PENDING" | "APPROVED" | "REJECTED";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["PENDING", "APPROVED", "REJECTED"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deactivatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "deactivated_at";
            tableName: "dispatchers";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "dispatchers";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const blockedIps: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "blocked_ips";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "blocked_ips";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ipAddress: drizzle_orm_pg_core.PgColumn<{
            name: "ip_address";
            tableName: "blocked_ips";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        reason: drizzle_orm_pg_core.PgColumn<{
            name: "reason";
            tableName: "blocked_ips";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        blockedBy: drizzle_orm_pg_core.PgColumn<{
            name: "blocked_by";
            tableName: "blocked_ips";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        expiresAt: drizzle_orm_pg_core.PgColumn<{
            name: "expires_at";
            tableName: "blocked_ips";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "blocked_ips";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const deliveries: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "deliveries";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdBy: drizzle_orm_pg_core.PgColumn<{
            name: "created_by";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        riderId: drizzle_orm_pg_core.PgColumn<{
            name: "rider_id";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "AWAITING_PAYMENT" | "PENDING" | "ASSIGNED" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["AWAITING_PAYMENT", "PENDING", "ASSIGNED", "IN_TRANSIT", "DELIVERED", "CANCELLED"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pickupAddress: drizzle_orm_pg_core.PgColumn<{
            name: "pickup_address";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pickupPlaceId: drizzle_orm_pg_core.PgColumn<{
            name: "pickup_place_id";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pickupLat: drizzle_orm_pg_core.PgColumn<{
            name: "pickup_lat";
            tableName: "deliveries";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pickupLng: drizzle_orm_pg_core.PgColumn<{
            name: "pickup_lng";
            tableName: "deliveries";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dropOffAddress: drizzle_orm_pg_core.PgColumn<{
            name: "drop_off_address";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dropOffPlaceId: drizzle_orm_pg_core.PgColumn<{
            name: "drop_off_place_id";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dropOffLat: drizzle_orm_pg_core.PgColumn<{
            name: "drop_off_lat";
            tableName: "deliveries";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dropOffLng: drizzle_orm_pg_core.PgColumn<{
            name: "drop_off_lng";
            tableName: "deliveries";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pickupPhone: drizzle_orm_pg_core.PgColumn<{
            name: "pickup_phone";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dropOffPhone: drizzle_orm_pg_core.PgColumn<{
            name: "drop_off_phone";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        description: drizzle_orm_pg_core.PgColumn<{
            name: "description";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        paymentMethod: drizzle_orm_pg_core.PgColumn<{
            name: "payment_method";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "PREPAID" | "POD";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["PREPAID", "POD"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        scheduledAt: drizzle_orm_pg_core.PgColumn<{
            name: "scheduled_at";
            tableName: "deliveries";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deliveredAt: drizzle_orm_pg_core.PgColumn<{
            name: "delivered_at";
            tableName: "deliveries";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "deliveries";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "deliveries";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        trackingId: drizzle_orm_pg_core.PgColumn<{
            name: "tracking_id";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pin: drizzle_orm_pg_core.PgColumn<{
            name: "pin";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        proofOfDeliveryImagePath: drizzle_orm_pg_core.PgColumn<{
            name: "proof_of_delivery_image_path";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        price: drizzle_orm_pg_core.PgColumn<{
            name: "price";
            tableName: "deliveries";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "deliveries";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const riders: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "riders";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        email: drizzle_orm_pg_core.PgColumn<{
            name: "email";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        fullName: drizzle_orm_pg_core.PgColumn<{
            name: "full_name";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        phoneNumber: drizzle_orm_pg_core.PgColumn<{
            name: "phone_number";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        registrationNumber: drizzle_orm_pg_core.PgColumn<{
            name: "registration_number";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        vehicleType: drizzle_orm_pg_core.PgColumn<{
            name: "vehicle_type";
            tableName: "riders";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "BIKE" | "CAR" | "VAN" | "TRUCK";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["BIKE", "CAR", "VAN", "TRUCK"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        permitStatus: drizzle_orm_pg_core.PgColumn<{
            name: "permit_status";
            tableName: "riders";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "PENDING" | "APPROVED" | "REJECTED";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["PENDING", "APPROVED", "REJECTED"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isAccepted: drizzle_orm_pg_core.PgColumn<{
            name: "is_accepted";
            tableName: "riders";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "riders";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "ONLINE" | "OFFLINE" | "BUSY";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["OFFLINE", "ONLINE", "BUSY"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastLat: drizzle_orm_pg_core.PgColumn<{
            name: "last_lat";
            tableName: "riders";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastLng: drizzle_orm_pg_core.PgColumn<{
            name: "last_lng";
            tableName: "riders";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastSeen: drizzle_orm_pg_core.PgColumn<{
            name: "last_seen";
            tableName: "riders";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        batteryLevel: drizzle_orm_pg_core.PgColumn<{
            name: "battery_level";
            tableName: "riders";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        fcmToken: drizzle_orm_pg_core.PgColumn<{
            name: "fcm_token";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deactivatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "deactivated_at";
            tableName: "riders";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "riders";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "riders";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const deliveryTransactions: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "delivery_transactions";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "delivery_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "delivery_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        amount: drizzle_orm_pg_core.PgColumn<{
            name: "amount";
            tableName: "delivery_transactions";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        currency: drizzle_orm_pg_core.PgColumn<{
            name: "currency";
            tableName: "delivery_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "delivery_transactions";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "PENDING" | "SUCCESS" | "FAILED" | "REVERSED";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["PENDING", "SUCCESS", "FAILED", "REVERSED"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        reference: drizzle_orm_pg_core.PgColumn<{
            name: "reference";
            tableName: "delivery_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        provider: drizzle_orm_pg_core.PgColumn<{
            name: "provider";
            tableName: "delivery_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "delivery_transactions";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        processedAt: drizzle_orm_pg_core.PgColumn<{
            name: "processed_at";
            tableName: "delivery_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "delivery_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const deliveryAllocations: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "delivery_allocations";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "delivery_allocations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deliveryId: drizzle_orm_pg_core.PgColumn<{
            name: "delivery_id";
            tableName: "delivery_allocations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deliveryTransactionId: drizzle_orm_pg_core.PgColumn<{
            name: "delivery_transaction_id";
            tableName: "delivery_allocations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        amount: drizzle_orm_pg_core.PgColumn<{
            name: "amount";
            tableName: "delivery_allocations";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "delivery_allocations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const ledgerTransactions: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "ledger_transactions";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "ledger_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "ledger_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        amount: drizzle_orm_pg_core.PgColumn<{
            name: "amount";
            tableName: "ledger_transactions";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        adjustmentType: drizzle_orm_pg_core.PgColumn<{
            name: "adjustment_type";
            tableName: "ledger_transactions";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "CREDIT" | "DEBIT" | "CORRECTION" | "REFUND";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["CREDIT", "DEBIT", "CORRECTION", "REFUND"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        reference: drizzle_orm_pg_core.PgColumn<{
            name: "reference";
            tableName: "ledger_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        reason: drizzle_orm_pg_core.PgColumn<{
            name: "reason";
            tableName: "ledger_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        performedBy: drizzle_orm_pg_core.PgColumn<{
            name: "performed_by";
            tableName: "ledger_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "ledger_transactions";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "ledger_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const eventLogs: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "event_logs";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        eventType: drizzle_orm_pg_core.PgColumn<{
            name: "event_type";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        entityType: drizzle_orm_pg_core.PgColumn<{
            name: "entity_type";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        entityId: drizzle_orm_pg_core.PgColumn<{
            name: "entity_id";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        actorId: drizzle_orm_pg_core.PgColumn<{
            name: "actor_id";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        actorType: drizzle_orm_pg_core.PgColumn<{
            name: "actor_type";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        payload: drizzle_orm_pg_core.PgColumn<{
            name: "payload";
            tableName: "event_logs";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        traceId: drizzle_orm_pg_core.PgColumn<{
            name: "trace_id";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ipAddress: drizzle_orm_pg_core.PgColumn<{
            name: "ip_address";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userAgent: drizzle_orm_pg_core.PgColumn<{
            name: "user_agent";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        success: drizzle_orm_pg_core.PgColumn<{
            name: "success";
            tableName: "event_logs";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "event_logs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const exportRequests: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "export_requests";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "export_requests";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "export_requests";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userEmail: drizzle_orm_pg_core.PgColumn<{
            name: "user_email";
            tableName: "export_requests";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "export_requests";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "PENDING" | "FAILED" | "PROCESSING" | "COMPLETED";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        requestedBy: drizzle_orm_pg_core.PgColumn<{
            name: "requested_by";
            tableName: "export_requests";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        targetMonth: drizzle_orm_pg_core.PgColumn<{
            name: "target_month";
            tableName: "export_requests";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        riderId: drizzle_orm_pg_core.PgColumn<{
            name: "rider_id";
            tableName: "export_requests";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        requestedAt: drizzle_orm_pg_core.PgColumn<{
            name: "requested_at";
            tableName: "export_requests";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        completedAt: drizzle_orm_pg_core.PgColumn<{
            name: "completed_at";
            tableName: "export_requests";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        downloadUrl: drizzle_orm_pg_core.PgColumn<{
            name: "download_url";
            tableName: "export_requests";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const appConfigs: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "app_configs";
    schema: undefined;
    columns: {
        key: drizzle_orm_pg_core.PgColumn<{
            name: "key";
            tableName: "app_configs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        value: drizzle_orm_pg_core.PgColumn<{
            name: "value";
            tableName: "app_configs";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        scope: drizzle_orm_pg_core.PgColumn<{
            name: "scope";
            tableName: "app_configs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "app_configs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const subscriptionTransactions: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "subscription_transactions";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        amount: drizzle_orm_pg_core.PgColumn<{
            name: "amount";
            tableName: "subscription_transactions";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        currency: drizzle_orm_pg_core.PgColumn<{
            name: "currency";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "PENDING" | "SUCCESS" | "FAILED" | "REVERSED";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["PENDING", "SUCCESS", "FAILED", "REVERSED"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        reference: drizzle_orm_pg_core.PgColumn<{
            name: "reference";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        provider: drizzle_orm_pg_core.PgColumn<{
            name: "provider";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        tier: drizzle_orm_pg_core.PgColumn<{
            name: "tier";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "FREE" | "STARTER" | "PROFESSIONAL";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["FREE", "STARTER", "PROFESSIONAL"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        periodStart: drizzle_orm_pg_core.PgColumn<{
            name: "period_start";
            tableName: "subscription_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        periodEnd: drizzle_orm_pg_core.PgColumn<{
            name: "period_end";
            tableName: "subscription_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "subscription_transactions";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        processedAt: drizzle_orm_pg_core.PgColumn<{
            name: "processed_at";
            tableName: "subscription_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "subscription_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const customerCompanyMappings: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "customer_company_mappings";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "customer_company_mappings";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        platformId: drizzle_orm_pg_core.PgColumn<{
            name: "platform_id";
            tableName: "customer_company_mappings";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        platform: drizzle_orm_pg_core.PgColumn<{
            name: "platform";
            tableName: "customer_company_mappings";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "WHATSAPP" | "INSTAGRAM" | "FACEBOOK" | "TIKTOK";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["WHATSAPP", "INSTAGRAM", "TIKTOK", "FACEBOOK"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "customer_company_mappings";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        source: drizzle_orm_pg_core.PgColumn<{
            name: "source";
            tableName: "customer_company_mappings";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "MANUAL" | "DISCOVERY";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["MANUAL", "DISCOVERY"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "customer_company_mappings";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "customer_company_mappings";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const riderLocationLogs: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "rider_location_logs";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "rider_location_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        riderId: drizzle_orm_pg_core.PgColumn<{
            name: "rider_id";
            tableName: "rider_location_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lat: drizzle_orm_pg_core.PgColumn<{
            name: "lat";
            tableName: "rider_location_logs";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lng: drizzle_orm_pg_core.PgColumn<{
            name: "lng";
            tableName: "rider_location_logs";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "rider_location_logs";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "ONLINE" | "OFFLINE" | "BUSY";
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["OFFLINE", "ONLINE", "BUSY"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "rider_location_logs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;

declare const companySettingsRelations: drizzle_orm.Relations<"company_settings", {
    company: drizzle_orm.One<"companies", true>;
}>;
declare const companiesRelations: drizzle_orm.Relations<"companies", {
    companySettings: drizzle_orm.One<"company_settings", false>;
    pricingSchemes: drizzle_orm.Many<"pricing_schemes">;
    companyIntegrations: drizzle_orm.Many<"company_integrations">;
    conversations: drizzle_orm.Many<"conversations">;
    dispatchers: drizzle_orm.Many<"dispatchers">;
    deliveries: drizzle_orm.Many<"deliveries">;
    riders: drizzle_orm.Many<"riders">;
    customerCompanyMappings: drizzle_orm.Many<"customer_company_mappings">;
}>;
declare const pricingSchemesRelations: drizzle_orm.Relations<"pricing_schemes", {
    company: drizzle_orm.One<"companies", true>;
}>;
declare const companyIntegrationsRelations: drizzle_orm.Relations<"company_integrations", {
    company: drizzle_orm.One<"companies", true>;
}>;
declare const conversationsRelations: drizzle_orm.Relations<"conversations", {
    company: drizzle_orm.One<"companies", false>;
    messages: drizzle_orm.Many<"messages">;
}>;
declare const messagesRelations: drizzle_orm.Relations<"messages", {
    conversation: drizzle_orm.One<"conversations", true>;
}>;
declare const dispatchersRelations: drizzle_orm.Relations<"dispatchers", {
    company: drizzle_orm.One<"companies", false>;
}>;
declare const deliveriesRelations: drizzle_orm.Relations<"deliveries", {
    company: drizzle_orm.One<"companies", false>;
    rider: drizzle_orm.One<"riders", false>;
    deliveryAllocations: drizzle_orm.Many<"delivery_allocations">;
}>;
declare const ridersRelations: drizzle_orm.Relations<"riders", {
    deliveries: drizzle_orm.Many<"deliveries">;
    company: drizzle_orm.One<"companies", false>;
    riderLocationLogs: drizzle_orm.Many<"rider_location_logs">;
}>;
declare const deliveryAllocationsRelations: drizzle_orm.Relations<"delivery_allocations", {
    delivery: drizzle_orm.One<"deliveries", true>;
    deliveryTransaction: drizzle_orm.One<"delivery_transactions", true>;
}>;
declare const deliveryTransactionsRelations: drizzle_orm.Relations<"delivery_transactions", {
    deliveryAllocations: drizzle_orm.Many<"delivery_allocations">;
}>;
declare const customerCompanyMappingsRelations: drizzle_orm.Relations<"customer_company_mappings", {
    company: drizzle_orm.One<"companies", true>;
}>;
declare const riderLocationLogsRelations: drizzle_orm.Relations<"rider_location_logs", {
    rider: drizzle_orm.One<"riders", true>;
}>;

export { type AIConfig, AI_CONFIG, ActorType, ApiTag, AuditAction, BILLING_CONFIG, ChatUpdateType, ComponentStatus, DEFAULT_WORKING_HOURS, DeliveryStatus, EmailService, EntityType, ErrorCode, EventType, type FetchWithTimeoutOptions, LIMITS_CONFIG, LedgerAdjustmentType, type LimitsConfig, LlmRole, LogLevel, MappingPlatform, MessageStatus, MomentoType, NotificationEventType, NotificationPriority, type ParsedDelivery, PaymentMethod, PaymentProvider, PermitStatus, ProviderRole, QUEUES, REGIONAL_CONFIG, type RegionalConfig, RiderStatus, SECURITY_CONFIG, SYSTEM_CONFIG, type SecurityConfig, SecurityEventType, SecuritySeverity, type SendEmailOptions, SubscriptionEventType, SubscriptionTier, type SystemConfig, SystemStatus, TIER_LIMITS, type TierLimits, TransactionStatus, UpdateReason, UserAuditAction, UserRole, VehicleType, admins, appConfigs, blockedIps, buildSystemConfig, companies, companiesRelations, companyIntegrations, companyIntegrationsRelations, companySettings, companySettingsRelations, conversations, conversationsRelations, customerCompanyMappings, customerCompanyMappingsRelations, deliveries, deliveriesRelations, deliveryAllocations, deliveryAllocationsRelations, deliveryStatus, deliveryTransactions, deliveryTransactionsRelations, dispatchers, dispatchersRelations, eventLogs, exportRequestStatus, exportRequests, fetchWithTimeout, formatAmount, getNextRetryDate, getSubscriptionPrice, getTierLimits, isBillableTier, isDeliveryActive, isDeliveryTerminal, ledgerAdjustmentType, ledgerTransactions, localParse, mappingPlatform, mappingSource, messageStatus, messages, messagesRelations, paymentMethod, permitStatus, pricingSchemes, pricingSchemesRelations, riderLocationLogs, riderLocationLogsRelations, riderStatus, riders, ridersRelations, senderType, shouldBillNow, shouldRetryPayment, subscriptionTier, subscriptionTransactions, transactionStatus, vehicleType };
