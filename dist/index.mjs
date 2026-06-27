// src/enums.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["ADMIN"] = "ADMIN";
  UserRole2["COMPANY"] = "COMPANY";
  UserRole2["DISPATCHER"] = "DISPATCHER";
  UserRole2["RIDER"] = "RIDER";
  return UserRole2;
})(UserRole || {});
var ActorType = /* @__PURE__ */ ((ActorType2) => {
  ActorType2["SYSTEM"] = "SYSTEM";
  ActorType2["USER"] = "USER";
  ActorType2["ADMIN"] = "ADMIN";
  return ActorType2;
})(ActorType || {});
var DeliveryStatus = /* @__PURE__ */ ((DeliveryStatus2) => {
  DeliveryStatus2["AWAITING_PAYMENT"] = "AWAITING_PAYMENT";
  DeliveryStatus2["PENDING"] = "PENDING";
  DeliveryStatus2["ASSIGNED"] = "ASSIGNED";
  DeliveryStatus2["IN_TRANSIT"] = "IN_TRANSIT";
  DeliveryStatus2["DELIVERED"] = "DELIVERED";
  DeliveryStatus2["CANCELLED"] = "CANCELLED";
  return DeliveryStatus2;
})(DeliveryStatus || {});
function isDeliveryActive(status) {
  return status === "PENDING" /* PENDING */ || status === "ASSIGNED" /* ASSIGNED */ || status === "IN_TRANSIT" /* IN_TRANSIT */;
}
function isDeliveryTerminal(status) {
  return status === "DELIVERED" /* DELIVERED */ || status === "CANCELLED" /* CANCELLED */;
}
var PaymentMethod = /* @__PURE__ */ ((PaymentMethod2) => {
  PaymentMethod2["PREPAID"] = "PREPAID";
  PaymentMethod2["PAY_ON_DELIVERY"] = "PAY_ON_DELIVERY";
  return PaymentMethod2;
})(PaymentMethod || {});
var RiderStatus = /* @__PURE__ */ ((RiderStatus2) => {
  RiderStatus2["ONLINE"] = "ONLINE";
  RiderStatus2["OFFLINE"] = "OFFLINE";
  RiderStatus2["BUSY"] = "BUSY";
  return RiderStatus2;
})(RiderStatus || {});
var PermitStatus = /* @__PURE__ */ ((PermitStatus2) => {
  PermitStatus2["PENDING"] = "PENDING";
  PermitStatus2["APPROVED"] = "APPROVED";
  PermitStatus2["REJECTED"] = "REJECTED";
  return PermitStatus2;
})(PermitStatus || {});
var EntityType = /* @__PURE__ */ ((EntityType2) => {
  EntityType2["USER"] = "USER";
  EntityType2["DELIVERY"] = "DELIVERY";
  EntityType2["RIDER"] = "RIDER";
  EntityType2["COMPANY"] = "COMPANY";
  EntityType2["DISPATCHER"] = "DISPATCHER";
  EntityType2["SYSTEM"] = "SYSTEM";
  EntityType2["MESSAGE"] = "MESSAGE";
  EntityType2["COMPANY_INTEGRATION"] = "COMPANY_INTEGRATION";
  EntityType2["CONVERSATION"] = "CONVERSATION";
  return EntityType2;
})(EntityType || {});
var MappingPlatform = /* @__PURE__ */ ((MappingPlatform2) => {
  MappingPlatform2["WHATSAPP"] = "WHATSAPP";
  MappingPlatform2["INSTAGRAM"] = "INSTAGRAM";
  MappingPlatform2["FACEBOOK"] = "FACEBOOK";
  MappingPlatform2["TIKTOK"] = "TIKTOK";
  return MappingPlatform2;
})(MappingPlatform || {});
var MomentoType = /* @__PURE__ */ ((MomentoType2) => {
  MomentoType2["MAIN"] = "MAIN";
  MomentoType2["AI"] = "AI";
  return MomentoType2;
})(MomentoType || {});
var VehicleType = /* @__PURE__ */ ((VehicleType2) => {
  VehicleType2["BIKE"] = "BIKE";
  VehicleType2["CAR"] = "CAR";
  VehicleType2["VAN"] = "VAN";
  VehicleType2["TRUCK"] = "TRUCK";
  return VehicleType2;
})(VehicleType || {});
var SubscriptionTier = /* @__PURE__ */ ((SubscriptionTier2) => {
  SubscriptionTier2["FREE"] = "FREE";
  SubscriptionTier2["STARTER"] = "STARTER";
  SubscriptionTier2["PROFESSIONAL"] = "PROFESSIONAL";
  return SubscriptionTier2;
})(SubscriptionTier || {});
var TransactionStatus = /* @__PURE__ */ ((TransactionStatus2) => {
  TransactionStatus2["PENDING"] = "PENDING";
  TransactionStatus2["SUCCESS"] = "SUCCESS";
  TransactionStatus2["FAILED"] = "FAILED";
  TransactionStatus2["REVERSED"] = "REVERSED";
  TransactionStatus2["CANCELLED"] = "CANCELLED";
  TransactionStatus2["REFUNDED"] = "REFUNDED";
  TransactionStatus2["EXPIRED"] = "EXPIRED";
  return TransactionStatus2;
})(TransactionStatus || {});
var LedgerAdjustmentType = /* @__PURE__ */ ((LedgerAdjustmentType2) => {
  LedgerAdjustmentType2["CREDIT"] = "CREDIT";
  LedgerAdjustmentType2["DEBIT"] = "DEBIT";
  LedgerAdjustmentType2["CORRECTION"] = "CORRECTION";
  LedgerAdjustmentType2["REFUND"] = "REFUND";
  return LedgerAdjustmentType2;
})(LedgerAdjustmentType || {});
var PaymentProvider = /* @__PURE__ */ ((PaymentProvider2) => {
  PaymentProvider2["SQUAD"] = "SQUAD";
  return PaymentProvider2;
})(PaymentProvider || {});
var EventType = /* @__PURE__ */ ((EventType2) => {
  EventType2["DELIVERY_ASSIGNED"] = "DELIVERY_ASSIGNED";
  EventType2["DELIVERY_UPDATED"] = "DELIVERY_UPDATED";
  EventType2["DELIVERY_CREATED"] = "DELIVERY_CREATED";
  EventType2["DELIVERY_STATUS_CHANGED"] = "DELIVERY_STATUS_CHANGED";
  EventType2["DELIVERY_DELETED"] = "DELIVERY_DELETED";
  EventType2["RIDER_LOCATION_UPDATED"] = "RIDER_LOCATION_UPDATED";
  EventType2["RIDER_ASSIGNED"] = "RIDER_ASSIGNED";
  EventType2["RIDER_ACCEPTED"] = "RIDER_ACCEPTED";
  EventType2["RIDER_DELETED"] = "RIDER_DELETED";
  EventType2["USER_DEACTIVATED"] = "USER_DEACTIVATED";
  EventType2["USER_PURGED"] = "USER_PURGED";
  EventType2["USER_LOGIN"] = "USER_LOGIN";
  EventType2["USER_LOGOUT"] = "USER_LOGOUT";
  EventType2["USER_REGISTER"] = "USER_REGISTER";
  EventType2["MESSAGE_SENT"] = "MESSAGE_SENT";
  EventType2["INTEGRATION_SETUP"] = "INTEGRATION_SETUP";
  EventType2["INTEGRATION_ACTIVATED"] = "INTEGRATION_ACTIVATED";
  EventType2["INTEGRATION_DEACTIVATED"] = "INTEGRATION_DEACTIVATED";
  EventType2["MESSAGE_DELETED"] = "MESSAGE_DELETED";
  EventType2["DISPATCHER_DELETED"] = "DISPATCHER_DELETED";
  EventType2["DOWNGRADE"] = "DOWNGRADE";
  EventType2["CANCEL_PAYMENT_TIMEOUT"] = "CANCEL_PAYMENT_TIMEOUT";
  EventType2["SUMMARIZE_AND_PRUNE"] = "SUMMARIZE_AND_PRUNE";
  EventType2["AI_EXECUTION"] = "AI_EXECUTION";
  return EventType2;
})(EventType || {});
var SubscriptionEventType = /* @__PURE__ */ ((SubscriptionEventType2) => {
  SubscriptionEventType2["CREATED"] = "CREATED";
  SubscriptionEventType2["UPDATED"] = "UPDATED";
  SubscriptionEventType2["DELETED"] = "DELETED";
  SubscriptionEventType2["ASSIGNED"] = "ASSIGNED";
  SubscriptionEventType2["STATUS_CHANGED"] = "STATUS_CHANGED";
  SubscriptionEventType2["LOCATION_UPDATED"] = "LOCATION_UPDATED";
  return SubscriptionEventType2;
})(SubscriptionEventType || {});
var NotificationEventType = /* @__PURE__ */ ((NotificationEventType2) => {
  NotificationEventType2["HUMAN_REQUEST"] = "HUMAN_REQUEST";
  NotificationEventType2["ACTION_REQUIRED"] = "ACTION_REQUIRED";
  NotificationEventType2["DELIVERY_UPDATE"] = "DELIVERY_UPDATE";
  NotificationEventType2["RIDER_UPDATE"] = "RIDER_UPDATE";
  return NotificationEventType2;
})(NotificationEventType || {});
var NotificationPriority = /* @__PURE__ */ ((NotificationPriority2) => {
  NotificationPriority2["LOW"] = "LOW";
  NotificationPriority2["NORMAL"] = "NORMAL";
  NotificationPriority2["HIGH"] = "HIGH";
  NotificationPriority2["URGENT"] = "URGENT";
  return NotificationPriority2;
})(NotificationPriority || {});
var AuditAction = /* @__PURE__ */ ((AuditAction2) => {
  AuditAction2["CREATE"] = "CREATE";
  AuditAction2["UPDATE"] = "UPDATE";
  AuditAction2["DELETE"] = "DELETE";
  AuditAction2["LOGIN"] = "LOGIN";
  AuditAction2["LOGOUT"] = "LOGOUT";
  AuditAction2["ACCESS"] = "ACCESS";
  return AuditAction2;
})(AuditAction || {});
var UserAuditAction = /* @__PURE__ */ ((UserAuditAction2) => {
  UserAuditAction2["LOGIN"] = "LOGIN";
  UserAuditAction2["LOGOUT"] = "LOGOUT";
  UserAuditAction2["PROFILE_UPDATE"] = "PROFILE_UPDATE";
  UserAuditAction2["DELIVERY_CREATE"] = "DELIVERY_CREATE";
  UserAuditAction2["DELIVERY_UPDATE"] = "DELIVERY_UPDATE";
  UserAuditAction2["DELIVERY_ASSIGN"] = "DELIVERY_ASSIGN";
  UserAuditAction2["SUSPICIOUS_ACTIVITY"] = "SUSPICIOUS_ACTIVITY";
  UserAuditAction2["RATE_LIMIT_HIT"] = "RATE_LIMIT_HIT";
  UserAuditAction2["INVALID_ACCESS_ATTEMPT"] = "INVALID_ACCESS_ATTEMPT";
  return UserAuditAction2;
})(UserAuditAction || {});
var ChatUpdateType = /* @__PURE__ */ ((ChatUpdateType2) => {
  ChatUpdateType2["MESSAGE"] = "MESSAGE";
  ChatUpdateType2["TYPING"] = "TYPING";
  ChatUpdateType2["STATUS"] = "STATUS";
  return ChatUpdateType2;
})(ChatUpdateType || {});
var MessageStatus = /* @__PURE__ */ ((MessageStatus2) => {
  MessageStatus2["SENT"] = "SENT";
  MessageStatus2["DELIVERED"] = "DELIVERED";
  MessageStatus2["READ"] = "READ";
  MessageStatus2["FAILED"] = "FAILED";
  return MessageStatus2;
})(MessageStatus || {});
var SecurityEventType = /* @__PURE__ */ ((SecurityEventType2) => {
  SecurityEventType2["RATE_LIMIT"] = "RATE_LIMIT";
  SecurityEventType2["MALICIOUS_REQUEST"] = "MALICIOUS_REQUEST";
  SecurityEventType2["AUTH_FAILURE"] = "AUTH_FAILURE";
  SecurityEventType2["BRUTE_FORCE"] = "BRUTE_FORCE";
  return SecurityEventType2;
})(SecurityEventType || {});
var SecuritySeverity = /* @__PURE__ */ ((SecuritySeverity2) => {
  SecuritySeverity2["LOW"] = "LOW";
  SecuritySeverity2["MEDIUM"] = "MEDIUM";
  SecuritySeverity2["HIGH"] = "HIGH";
  SecuritySeverity2["CRITICAL"] = "CRITICAL";
  return SecuritySeverity2;
})(SecuritySeverity || {});
var ErrorCode = /* @__PURE__ */ ((ErrorCode2) => {
  ErrorCode2["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
  ErrorCode2["UNAUTHORIZED"] = "UNAUTHORIZED";
  ErrorCode2["FORBIDDEN"] = "FORBIDDEN";
  ErrorCode2["NOT_FOUND"] = "NOT_FOUND";
  ErrorCode2["VALIDATION_ERROR"] = "VALIDATION_ERROR";
  ErrorCode2["CLIENT_AUTH_REQUIRED"] = "CLIENT_AUTH_REQUIRED";
  ErrorCode2["OTP_LIMIT_EXCEEDED"] = "OTP_LIMIT_EXCEEDED";
  ErrorCode2["TOO_MANY_ATTEMPTS"] = "TOO_MANY_ATTEMPTS";
  ErrorCode2["TOO_MANY_REGISTRATIONS"] = "TOO_MANY_REGISTRATIONS";
  ErrorCode2["LOW_CONFIDENCE_EXTRACTION"] = "LOW_CONFIDENCE_EXTRACTION";
  return ErrorCode2;
})(ErrorCode || {});
var SystemStatus = /* @__PURE__ */ ((SystemStatus2) => {
  SystemStatus2["UP"] = "UP";
  SystemStatus2["DOWN"] = "DOWN";
  SystemStatus2["DEGRADED"] = "DEGRADED";
  return SystemStatus2;
})(SystemStatus || {});
var ComponentStatus = /* @__PURE__ */ ((ComponentStatus2) => {
  ComponentStatus2["HEALTHY"] = "HEALTHY";
  ComponentStatus2["UNHEALTHY"] = "UNHEALTHY";
  ComponentStatus2["UNKNOWN"] = "UNKNOWN";
  ComponentStatus2["CONFIGURED"] = "CONFIGURED";
  ComponentStatus2["NOT_CONFIGURED"] = "NOT_CONFIGURED";
  ComponentStatus2["PARTIALLY_CONFIGURED"] = "PARTIALLY_CONFIGURED";
  return ComponentStatus2;
})(ComponentStatus || {});
var LlmRole = /* @__PURE__ */ ((LlmRole2) => {
  LlmRole2["USER"] = "user";
  LlmRole2["ASSISTANT"] = "assistant";
  LlmRole2["SYSTEM"] = "system";
  return LlmRole2;
})(LlmRole || {});
var ProviderRole = /* @__PURE__ */ ((ProviderRole2) => {
  ProviderRole2["INTERPRETATION"] = "interpretation";
  ProviderRole2["SYNTHESIS"] = "synthesis";
  ProviderRole2["BOTH"] = "both";
  return ProviderRole2;
})(ProviderRole || {});
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2["INFO"] = "info";
  LogLevel2["WARN"] = "warn";
  LogLevel2["ERROR"] = "error";
  LogLevel2["DEBUG"] = "debug";
  return LogLevel2;
})(LogLevel || {});
var ApiTag = /* @__PURE__ */ ((ApiTag2) => {
  ApiTag2["ANALYTICS"] = "Analytics";
  ApiTag2["TRACKING"] = "Tracking";
  ApiTag2["AUTH"] = "Auth";
  ApiTag2["CONTACT"] = "Contact";
  ApiTag2["BILLING"] = "Billing";
  ApiTag2["ADMIN"] = "Admin";
  ApiTag2["GRAPHQL"] = "GraphQL";
  ApiTag2["SYSTEM"] = "System";
  return ApiTag2;
})(ApiTag || {});
var UpdateReason = /* @__PURE__ */ ((UpdateReason2) => {
  UpdateReason2["REJECTED_BY_COMPANY"] = "REJECTED_BY_COMPANY";
  return UpdateReason2;
})(UpdateReason || {});

// src/config.ts
import { z } from "zod";
var DEFAULT_WORKING_HOURS = {
  Monday: { start: "07:00", close: "19:00" },
  Tuesday: { start: "07:00", close: "19:00" },
  Wednesday: { start: "07:00", close: "19:00" },
  Thursday: { start: "07:00", close: "19:00" },
  Friday: { start: "07:00", close: "19:00" },
  Saturday: { start: "07:00", close: "19:00" }
};
var SystemConfigSchema = z.object({
  BRAND_DOMAIN: z.string().optional(),
  BRAND_NAME: z.string().optional(),
  BRAND_SUPPORT_EMAIL: z.string().optional(),
  BRAND_PHONE_NUMBER: z.string().optional(),
  BRAND_LOGO_URL: z.string().optional(),
  BRAND_FAVICON_URL: z.string().optional(),
  ENABLE_TRACKING_CODES: z.string().optional(),
  SYSTEM_HUB_HANDLE: z.string().optional()
});
function buildSystemConfig(env = {}) {
  try {
    const validated = SystemConfigSchema.parse(env);
    const domain = validated.BRAND_DOMAIN || "logistix.team";
    return {
      domain,
      brandName: validated.BRAND_NAME || "Logistix",
      supportEmail: validated.BRAND_SUPPORT_EMAIL || `contact@${domain}`,
      phoneNumber: validated.BRAND_PHONE_NUMBER || "09069184604",
      logoUrl: validated.BRAND_LOGO_URL || "/icon_transparent.png",
      faviconUrl: validated.BRAND_FAVICON_URL || "/favicon.png",
      enableTrackingCodes: (validated.ENABLE_TRACKING_CODES || "true") === "true",
      workingHours: DEFAULT_WORKING_HOURS,
      businessHandle: validated.SYSTEM_HUB_HANDLE || "logistix"
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("\u274C Missing or invalid System Configuration:");
      for (const issue of err.issues) {
        console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
      }
    }
    const newErr = new Error("System configuration validation failed.");
    newErr.cause = err;
    throw newErr;
  }
}
var SYSTEM_CONFIG = typeof process !== "undefined" ? buildSystemConfig(process.env) : buildSystemConfig();

// src/regional.ts
import { z as z2 } from "zod";
var regionalConfigSchema = z2.object({
  defaultCountryCode: z2.string(),
  timeZone: z2.string(),
  states: z2.array(z2.string())
});
var rawRegionalConfig = {
  defaultCountryCode: "234",
  timeZone: "Africa/Lagos",
  states: [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "Abuja",
    "Federal Capital Territory"
  ]
};
var REGIONAL_CONFIG = regionalConfigSchema.parse(rawRegionalConfig);

// src/limits.ts
import { z as z3 } from "zod";
var limitsConfigSchema = z3.object({
  maxBatchSize: z3.number(),
  dbBatchSize: z3.number(),
  userActionConcurrency: z3.number(),
  externalApiConcurrency: z3.number(),
  maxDisambiguationOptions: z3.number(),
  maxQueryLimit: z3.number(),
  locationDeduplicationRadiusMeters: z3.number(),
  disambiguationGapThreshold: z3.number(),
  externalApiTimeoutMs: z3.number(),
  trackingFrequencyConfig: z3.object({
    baseIntervalMs: z3.number(),
    farDistanceMeters: z3.number(),
    farIntervalMs: z3.number()
  })
});
var rawLimitsConfig = {
  maxBatchSize: 50,
  // Max actions executed per agent turn (system protection)
  dbBatchSize: 100,
  // Max rows per DB bulk operation for background/flush jobs (executeInBatches)
  userActionConcurrency: 10,
  // Chunk size for user-flow operations (chunkedPromiseAll) to avoid spiking DB connections
  externalApiConcurrency: 5,
  // Capped concurrency for external APIs like Google Maps to avoid rate limits
  maxDisambiguationOptions: 3,
  // Max location options shown to user (UX/cognitive load)
  maxQueryLimit: 100,
  // Fallback query limit for non-tier-aware services
  locationDeduplicationRadiusMeters: 1e3,
  // Drop duplicate location results within this range
  disambiguationGapThreshold: 0.2,
  // Gap between 1st and 2nd best search match to trigger automatic selection
  externalApiTimeoutMs: 1e4,
  // Default timeout for external requests (e.g. Maps API)
  trackingFrequencyConfig: {
    baseIntervalMs: 1e4,
    // 10 seconds
    farDistanceMeters: 3e3,
    // 3km
    farIntervalMs: 6e4
    // 60 seconds
  }
};
var LIMITS_CONFIG = limitsConfigSchema.parse(rawLimitsConfig);
var TIER_LIMITS = {
  ["FREE" /* FREE */]: {
    maxAIDeliveriesPerAction: 10,
    // AI draft/book limit per request
    maxBulkDeliveries: 20,
    // Manual bulk creation limit
    maxQueryLimit: 20,
    // Database query limit
    maxTrackingHistory: 20,
    // Tracking IDs in session memory
    maxMemoryArraySize: 20,
    // Array size during memory merging
    maxSynthesisResults: 20,
    // Results sent to LLM for synthesis
    maxDrafts: 10,
    // Draft deliveries per session
    retentionDays: 40
    // Hot storage retention
  },
  ["STARTER" /* STARTER */]: {
    maxAIDeliveriesPerAction: 30,
    // AI draft/book limit per request
    maxBulkDeliveries: 50,
    // Manual bulk creation limit
    maxQueryLimit: 50,
    // Database query limit
    maxTrackingHistory: 50,
    // Tracking IDs in session memory
    maxMemoryArraySize: 50,
    // Array size during memory merging
    maxSynthesisResults: 50,
    // Results sent to LLM for synthesis
    maxDrafts: 30,
    // Draft deliveries per session
    retentionDays: 60
    // Hot storage retention
  },
  ["PROFESSIONAL" /* PROFESSIONAL */]: {
    maxAIDeliveriesPerAction: 50,
    // AI draft/book limit per request
    maxBulkDeliveries: 100,
    // Manual bulk creation limit
    maxQueryLimit: 100,
    // Database query limit
    maxTrackingHistory: 100,
    // Tracking IDs in session memory
    maxMemoryArraySize: 100,
    // Array size during memory merging
    maxSynthesisResults: 100,
    // Results sent to LLM for synthesis
    maxDrafts: 50,
    // Draft deliveries per session
    retentionDays: 90
    // Hot storage retention
  }
};
var getTierLimits = (tier) => {
  return TIER_LIMITS[tier] || TIER_LIMITS["FREE" /* FREE */];
};

// src/billing.ts
var BILLING_CONFIG = {
  /**
   * Currency to use across the system
   */
  CURRENCY: "NGN",
  /**
   * Monthly subscription pricing (in Kobo - Nigerian currency)
   * 1 Naira = 100 Kobo
   */
  PRICING: {
    ["FREE" /* FREE */]: 0,
    ["STARTER" /* STARTER */]: 3e6,
    ["PROFESSIONAL" /* PROFESSIONAL */]: 5e6
  },
  /**
   * Billing cycle in days
   */
  BILLING_CYCLE_DAYS: 30,
  /**
   * Grace period before downgrade (in days)
   */
  GRACE_PERIOD_DAYS: 14,
  /**
   * Payment timeout for AWAITING_PAYMENT deliveries (in hours)
   */
  PAYMENT_TIMEOUT_HOURS: 24,
  /**
   * Minimum balance required to avoid grace period (in Kobo)
   */
  MINIMUM_BALANCE: 1e3,
  // ₦10.00
  /**
   * Retry configuration for failed payments
   */
  PAYMENT_RETRY: {
    MAX_ATTEMPTS: 3,
    // Initial attempt + 2 retries
    BACKOFF_DAYS: [0, 3, 7]
    // Day 0 (initial), Day 3 (retry 1), Day 7 (retry 2)
  }
};
function getSubscriptionPrice(tier) {
  const normalizedTier = tier?.toUpperCase();
  if (!Object.values(SubscriptionTier).includes(normalizedTier)) {
    console.warn(`[BillingConfig] Invalid tier: ${tier}. Defaulting to FREE.`);
    return BILLING_CONFIG.PRICING["FREE" /* FREE */];
  }
  return BILLING_CONFIG.PRICING[normalizedTier];
}
function isBillableTier(tier) {
  return getSubscriptionPrice(tier) > 0;
}
function formatAmount(kobo) {
  return `\u20A6${(kobo / 100).toFixed(2)}`;
}
function shouldBillNow(lastBillingDate, activationDate) {
  if (!lastBillingDate) {
    const daysSinceActivation = Math.floor(
      (Date.now() - activationDate.getTime()) / (1e3 * 60 * 60 * 24)
    );
    return daysSinceActivation >= BILLING_CONFIG.BILLING_CYCLE_DAYS;
  }
  const daysSinceLastBilling = Math.floor(
    (Date.now() - lastBillingDate.getTime()) / (1e3 * 60 * 60 * 24)
  );
  return daysSinceLastBilling >= BILLING_CONFIG.BILLING_CYCLE_DAYS;
}
function shouldRetryPayment(lastBillingDate, lastBillingStatus, retryAttempt) {
  if (lastBillingStatus !== "FAILED" /* FAILED */) {
    return false;
  }
  if (retryAttempt >= BILLING_CONFIG.PAYMENT_RETRY.MAX_ATTEMPTS) {
    return false;
  }
  const daysSinceLastAttempt = Math.floor(
    (Date.now() - lastBillingDate.getTime()) / (1e3 * 60 * 60 * 24)
  );
  const requiredDays = BILLING_CONFIG.PAYMENT_RETRY.BACKOFF_DAYS[retryAttempt];
  return daysSinceLastAttempt >= requiredDays;
}
function getNextRetryDate(lastBillingDate, retryAttempt) {
  if (retryAttempt >= BILLING_CONFIG.PAYMENT_RETRY.MAX_ATTEMPTS) {
    return null;
  }
  const nextRetryDays = BILLING_CONFIG.PAYMENT_RETRY.BACKOFF_DAYS[retryAttempt];
  const nextRetryDate = new Date(lastBillingDate);
  nextRetryDate.setDate(nextRetryDate.getDate() + nextRetryDays);
  return nextRetryDate;
}

// src/security.ts
import { z as z4 } from "zod";
var securityConfigSchema = z4.object({
  rateLimits: z4.object({
    global: z4.object({ max: z4.number(), windowMs: z4.number() }),
    auth: z4.object({ max: z4.number(), windowMs: z4.number() }),
    api: z4.object({ max: z4.number(), windowMs: z4.number() }),
    login: z4.object({ max: z4.number(), window: z4.number() }),
    register: z4.object({ max: z4.number(), window: z4.number() }),
    otp: z4.object({ max: z4.number(), window: z4.number() }),
    tiers: z4.object({
      FREE: z4.object({ max: z4.number(), windowMs: z4.number() }),
      STARTER: z4.object({ max: z4.number(), windowMs: z4.number() }),
      PROFESSIONAL: z4.object({ max: z4.number(), windowMs: z4.number() })
    })
  }),
  jwt: z4.object({
    jwtExpiresIn: z4.string(),
    jwtRefreshExpiresIn: z4.string()
  }),
  headers: z4.custom((val) => typeof val === "object" && val !== null),
  maliciousPatterns: z4.array(z4.instanceof(RegExp)),
  validation: z4.object({
    maxEmailLength: z4.number(),
    maxPasswordLength: z4.number(),
    maxNameLength: z4.number(),
    maxDescriptionLength: z4.number(),
    maxPhoneLength: z4.number(),
    maxAddressLength: z4.number(),
    securityPinLength: z4.number().default(6),
    securityPinMinRange: z4.number().default(1e5),
    securityPinMaxRange: z4.number().default(999999)
  })
});
var rawSecurityConfig = {
  rateLimits: {
    global: { max: 1e3, windowMs: 6e4 },
    auth: { max: 15, windowMs: 9e5 },
    api: { max: 100, windowMs: 6e4 },
    login: { max: 10, window: 300 },
    register: { max: 3, window: 3600 },
    otp: { max: 5, window: 3600 },
    tiers: {
      FREE: { max: 100, windowMs: 9e5 },
      STARTER: { max: 500, windowMs: 9e5 },
      PROFESSIONAL: { max: 2e3, windowMs: 9e5 }
    }
  },
  jwt: {
    jwtExpiresIn: "1h",
    jwtRefreshExpiresIn: "30d"
  },
  headers: {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'"
  },
  maliciousPatterns: [
    /wp-admin/i,
    /wordpress/i,
    /\.env/i,
    /\.php$/i,
    /phpmyadmin/i,
    /admin\.php/i,
    /config\.php/i,
    /\.git/i,
    /\.svn/i,
    /\.\./i,
    /etc\/passwd/i,
    /proc\/self/i,
    /windows\/system32/i,
    /union\s+select/i,
    /drop\s+table/i,
    /insert\s+into/i,
    /delete\s+from/i,
    /<script/i,
    /javascript:/i,
    /onload=/i,
    /onerror=/i
  ],
  validation: {
    maxEmailLength: 254,
    maxPasswordLength: 128,
    maxNameLength: 150,
    maxDescriptionLength: 1e3,
    maxPhoneLength: 20,
    maxAddressLength: 300,
    securityPinLength: 6,
    securityPinMinRange: 1e5,
    securityPinMaxRange: 999999
  }
};
var SECURITY_CONFIG = securityConfigSchema.parse(rawSecurityConfig);

// src/ai.ts
import { z as z5 } from "zod";
var aiConfigSchema = z5.object({
  interpretation: z5.object({
    maxTokens: z5.number(),
    cooldownSeconds: z5.number().default(600)
  }),
  synthesis: z5.object({
    temperature: z5.number(),
    maxTokens: z5.number(),
    cooldownSeconds: z5.number().default(300)
  }),
  heartbeatTtl: z5.number().default(36e5),
  heartbeatThresholdMs: z5.number().default(42e4),
  maxSingleMessageTokens: z5.number().default(4096),
  maxMessagesPerResponse: z5.number().default(3),
  messageFetchLimit: z5.object({
    default: z5.number().default(10),
    max: z5.number().default(20)
  }),
  memoryCacheTtl: z5.number().default(6e5),
  maxIterations: z5.number().default(2),
  providerTimeoutMs: z5.number().default(1e4)
});
var rawAiConfig = {
  interpretation: {
    maxTokens: 2500,
    cooldownSeconds: 300
  },
  synthesis: {
    temperature: 0.7,
    maxTokens: 4096,
    cooldownSeconds: 300
  },
  heartbeatTtl: 6e5,
  heartbeatThresholdMs: 3e5,
  maxSingleMessageTokens: 4096,
  maxMessagesPerResponse: 3,
  messageFetchLimit: {
    default: 10,
    max: 20
  },
  memoryCacheTtl: 6e5,
  maxIterations: 2,
  providerTimeoutMs: 1e4
};
var AI_CONFIG = aiConfigSchema.parse(rawAiConfig);
var QUEUES = {
  aiChatTasks: "ai-chat-tasks"
};

// src/deliveryParser.ts
function localParse(text2) {
  const results = [];
  const normalized = text2.trim();
  if (!normalized) return results;
  const pickupMatch = normalized.match(/Pickup:\s*(.+)/i);
  const globalPickup = pickupMatch ? pickupMatch[1].trim() : "";
  const phoneMatch = normalized.match(/(?:Sender |Pickup )?Phone:\s*([\d\+\- ]+)/i);
  const globalPhone = phoneMatch ? phoneMatch[1].trim() : "";
  const dropoffBlocks = normalized.split(/---|Dropoff\s*\d*:|Delivery\s*\d*:/i).map((b) => b.trim());
  dropoffBlocks.shift();
  if (dropoffBlocks.length === 0) return results;
  for (const block of dropoffBlocks) {
    if (block.length < 5) continue;
    const dAddressMatch = block.match(/(?:Address|Location):\s*(.+)/i);
    const dAddress = dAddressMatch ? dAddressMatch[1].trim() : block.split("\n")[0].replace(/(?:Dropoff|Delivery)\s*\d*:/i, "").trim();
    const dPhone = block.match(/(?:Receiver |Dropoff )?Phone:\s*([\d\+\- ]+)/i)?.[1]?.trim() ?? "";
    const dNote = block.match(/Note:\s*(.+)/i)?.[1]?.trim() ?? "";
    if (dAddress || dPhone) {
      results.push({
        pickupAddress: globalPickup,
        pickupPhone: globalPhone,
        dropOffAddress: dAddress,
        dropOffPhone: dPhone,
        description: dNote
      });
    }
  }
  return results;
}

// src/fetchWithTimeout.ts
var DEFAULT_TIMEOUT_MS = 2e4;
async function fetchWithTimeout(url, options = {}) {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, fetch: fetchFn = globalThis.fetch, ...rest } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetchFn(url, { ...rest, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

// src/services/email.service.ts
var EmailService = class {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error("EmailService requires a valid API key");
    }
    this.apiKey = apiKey;
  }
  async sendEmail(options) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: options.from,
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        text: options.text
      })
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`Failed to send email: ${res.statusText} - ${JSON.stringify(errorData)}`);
    }
    return res.json();
  }
};

// src/drizzle/schema.ts
import {
  pgTable,
  timestamp,
  text,
  integer,
  uniqueIndex,
  index,
  boolean,
  foreignKey,
  jsonb,
  doublePrecision,
  pgEnum
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
var createId = () => globalThis.crypto.randomUUID();
var deliveryStatus = pgEnum("DeliveryStatus", [
  "AWAITING_PAYMENT",
  "PENDING",
  "ASSIGNED",
  "IN_TRANSIT",
  "DELIVERED",
  "CANCELLED"
]);
var exportRequestStatus = pgEnum("ExportRequestStatus", [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "FAILED"
]);
var ledgerAdjustmentType = pgEnum("LedgerAdjustmentType", [
  "CREDIT",
  "DEBIT",
  "CORRECTION",
  "REFUND"
]);
var mappingPlatform = pgEnum("MappingPlatform", [
  "WHATSAPP",
  "INSTAGRAM",
  "TIKTOK",
  "FACEBOOK"
]);
var mappingSource = pgEnum("MappingSource", ["MANUAL", "DISCOVERY"]);
var messageStatus = pgEnum("MessageStatus", ["SENT", "DELIVERED", "READ", "FAILED"]);
var paymentMethod = pgEnum("PaymentMethod", ["PREPAID", "POD"]);
var permitStatus = pgEnum("PermitStatus", ["PENDING", "APPROVED", "REJECTED"]);
var riderStatus = pgEnum("RiderStatus", ["OFFLINE", "ONLINE", "BUSY"]);
var senderType = pgEnum("SenderType", ["CUSTOMER", "AGENT", "DISPATCHER", "SYSTEM"]);
var subscriptionTier = pgEnum("SubscriptionTier", ["FREE", "STARTER", "PROFESSIONAL"]);
var transactionStatus = pgEnum("TransactionStatus", [
  "PENDING",
  "SUCCESS",
  "FAILED",
  "REVERSED"
]);
var vehicleType = pgEnum("VehicleType", ["BIKE", "CAR", "VAN", "TRUCK"]);
var companies = pgTable(
  "companies",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    name: text().notNull(),
    businessHandle: text("business_handle"),
    logoUrl: text("logo_url"),
    cac: text(),
    contactPhone: text("contact_phone"),
    address: text(),
    placeId: text("place_id"),
    states: text().array().default(["RAY"]),
    interstateDeliveries: boolean("interstate_deliveries").notNull(),
    deactivatedAt: timestamp("deactivated_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    uniqueIndex("companies_business_handle_key").using(
      "btree",
      table.businessHandle.asc().nullsLast().op("text_ops")
    ),
    index("companies_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
    index("companies_states_gin_idx").using("gin", table.states)
  ]
);
var companySettings = pgTable(
  "company_settings",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: text("company_id").notNull(),
    tier: subscriptionTier().default("FREE").notNull(),
    workingHours: jsonb("working_hours").default({
      Friday: { close: "19:00", start: "07:00" },
      Monday: { close: "19:00", start: "07:00" },
      Tuesday: { close: "19:00", start: "07:00" },
      Saturday: { close: "19:00", start: "07:00" },
      Thursday: { close: "19:00", start: "07:00" },
      Wednesday: { close: "19:00", start: "07:00" }
    }).notNull(),
    bankDetails: jsonb("bank_details"),
    ledgerBalance: doublePrecision("ledger_balance").default(0).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    uniqueIndex("company_settings_company_id_key").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "company_settings_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var pricingSchemes = pgTable(
  "pricing_schemes",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: text("company_id").notNull(),
    vehicleType: vehicleType("vehicle_type").default("BIKE").notNull(),
    baseFare: doublePrecision("base_fare").default(1e3).notNull(),
    perKmRate: doublePrecision("per_km_rate").default(150).notNull(),
    minFare: doublePrecision("min_fare").default(1e3).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    uniqueIndex("pricing_schemes_company_id_vehicle_type_key").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.vehicleType.asc().nullsLast().op("enum_ops")
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "pricing_schemes_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var companyIntegrations = pgTable(
  "company_integrations",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    platform: mappingPlatform().notNull(),
    platformId: text("platform_id").notNull(),
    companyId: text("company_id").notNull(),
    isActive: boolean("is_active").default(false).notNull(),
    isPlatformOwned: boolean("is_platform_owned").default(true).notNull(),
    metadata: jsonb(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("company_integrations_company_id_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    index("company_integrations_is_active_idx").using(
      "btree",
      table.isActive.asc().nullsLast().op("bool_ops")
    ),
    index("company_integrations_company_id_is_active_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.isActive.asc().nullsLast().op("bool_ops")
    ),
    uniqueIndex("company_integrations_platform_company_id_key").using(
      "btree",
      table.platform.asc().nullsLast().op("enum_ops"),
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("company_integrations_platform_platform_id_key").using(
      "btree",
      table.platform.asc().nullsLast().op("enum_ops"),
      table.platformId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "company_integrations_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var conversations = pgTable(
  "conversations",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    platform: mappingPlatform().default("WHATSAPP").notNull(),
    platformId: text("platform_id").notNull(),
    companyId: text("company_id"),
    lastMessageAt: timestamp("last_message_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).notNull(),
    autoReplyEnabled: boolean("auto_reply_enabled").default(true).notNull(),
    lastCustomerMessageAt: timestamp("last_customer_message_at", { precision: 3, mode: "date" }),
    scratchpad: jsonb(),
    customerName: text("customer_name")
  },
  (table) => [
    index("conversations_company_id_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    index("conversations_company_id_last_message_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.lastMessageAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("conversations_platform_id_platform_idx").using(
      "btree",
      table.platformId.asc().nullsLast().op("text_ops"),
      table.platform.asc().nullsLast().op("enum_ops")
    ),
    uniqueIndex("conversations_platform_platform_id_company_id_key").using(
      "btree",
      table.platform.asc().nullsLast().op("enum_ops"),
      table.platformId.asc().nullsLast().op("text_ops"),
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    index("conversations_auto_reply_disabled_idx").on(table.companyId, table.lastMessageAt).where(sql`auto_reply_enabled = false AND company_id IS NULL`),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "conversations_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var messages = pgTable(
  "messages",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    conversationId: text("conversation_id").notNull(),
    body: text().notNull(),
    senderType: senderType("sender_type").notNull(),
    senderId: text("sender_id"),
    isDeleted: boolean("is_deleted").default(false).notNull(),
    metadata: jsonb(),
    mediaUrl: text("media_url"),
    externalId: text("external_id"),
    replyToExternalId: text("reply_to_external_id"),
    status: messageStatus().default("SENT").notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("messages_conversation_id_created_at_idx").using(
      "btree",
      table.conversationId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("messages_conversation_id_idx").using(
      "btree",
      table.conversationId.asc().nullsLast().op("text_ops")
    ),
    index("messages_external_id_idx").using(
      "btree",
      table.externalId.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("messages_external_id_key").using(
      "btree",
      table.externalId.asc().nullsLast().op("text_ops")
    ),
    index("messages_reply_to_external_id_idx").using(
      "btree",
      table.replyToExternalId.asc().nullsLast().op("text_ops")
    ),
    index("messages_conversation_id_is_deleted_idx").using(
      "btree",
      table.conversationId.asc().nullsLast().op("text_ops"),
      table.isDeleted.asc().nullsLast().op("bool_ops")
    ),
    foreignKey({
      columns: [table.conversationId],
      foreignColumns: [conversations.id],
      name: "messages_conversation_id_fkey"
    }).onUpdate("cascade").onDelete("restrict")
  ]
);
var admins = pgTable(
  "admins",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    userId: text("user_id").notNull(),
    email: text().notNull(),
    fullName: text("full_name").notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    uniqueIndex("admins_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
    uniqueIndex("admins_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops"))
  ]
);
var dispatchers = pgTable(
  "dispatchers",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    userId: text("user_id").notNull(),
    email: text().notNull(),
    fullName: text("full_name").notNull(),
    companyId: text("company_id"),
    fcmToken: text("fcm_token"),
    isOwner: boolean("is_owner").default(false).notNull(),
    permitStatus: permitStatus("permit_status").default("PENDING").notNull(),
    deactivatedAt: timestamp("deactivated_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("dispatchers_company_id_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("dispatchers_email_key").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("dispatchers_user_id_key").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "dispatchers_company_id_fkey"
    }).onUpdate("cascade").onDelete("set null")
  ]
);
var blockedIps = pgTable(
  "blocked_ips",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    ipAddress: text("ip_address").notNull(),
    reason: text(),
    blockedBy: text("blocked_by"),
    expiresAt: timestamp("expires_at", { precision: 3, mode: "date" }).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("blocked_ips_expires_at_idx").using(
      "btree",
      table.expiresAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("blocked_ips_ip_address_idx").using(
      "btree",
      table.ipAddress.asc().nullsLast().op("text_ops")
    )
  ]
);
var deliveries = pgTable(
  "deliveries",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: text("company_id"),
    createdBy: text("created_by"),
    riderId: text("rider_id"),
    status: deliveryStatus().notNull(),
    pickupAddress: text("pickup_address").notNull(),
    pickupPlaceId: text("pickup_place_id"),
    pickupLat: doublePrecision("pickup_lat"),
    pickupLng: doublePrecision("pickup_lng"),
    dropOffAddress: text("drop_off_address").notNull(),
    dropOffPlaceId: text("drop_off_place_id"),
    dropOffLat: doublePrecision("drop_off_lat"),
    dropOffLng: doublePrecision("drop_off_lng"),
    pickupPhone: text("pickup_phone"),
    dropOffPhone: text("drop_off_phone"),
    description: text(),
    paymentMethod: paymentMethod("payment_method").notNull(),
    scheduledAt: timestamp("scheduled_at", { precision: 3, mode: "date" }),
    deliveredAt: timestamp("delivered_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).notNull(),
    trackingId: text("tracking_id").notNull(),
    pin: text(),
    proofOfDeliveryImagePath: text("proof_of_delivery_image_path"),
    price: doublePrecision(),
    metadata: jsonb()
  },
  (table) => [
    index("deliveries_company_id_status_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    index("deliveries_company_id_created_by_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdBy.asc().nullsLast().op("text_ops")
    ),
    index("deliveries_company_id_updated_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.updatedAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("deliveries_company_id_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdAt.desc().nullsLast().op("timestamp_ops")
    ),
    index("deliveries_created_at_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("deliveries_rider_id_status_idx").using(
      "btree",
      table.riderId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    index("deliveries_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
    uniqueIndex("deliveries_tracking_id_key").using(
      "btree",
      table.trackingId.asc().nullsLast().op("text_ops")
    ),
    index("deliveries_tracking_id_pin_idx").using(
      "btree",
      table.trackingId.asc().nullsLast().op("text_ops"),
      table.pin.asc().nullsLast().op("text_ops")
    ),
    index("deliveries_created_by_idx").using(
      "btree",
      table.createdBy.asc().nullsLast().op("text_ops")
    ),
    index("deliveries_pickup_phone_idx").using(
      "btree",
      table.pickupPhone.asc().nullsLast().op("text_ops")
    ),
    index("deliveries_drop_off_phone_idx").using(
      "btree",
      table.dropOffPhone.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "deliveries_company_id_fkey"
    }).onUpdate("cascade").onDelete("set null"),
    foreignKey({
      columns: [table.riderId],
      foreignColumns: [riders.id],
      name: "deliveries_rider_id_fkey"
    }).onUpdate("cascade").onDelete("set null")
  ]
);
var riders = pgTable(
  "riders",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    userId: text("user_id").notNull(),
    email: text().notNull(),
    fullName: text("full_name").notNull(),
    phoneNumber: text("phone_number"),
    registrationNumber: text("registration_number"),
    vehicleType: vehicleType("vehicle_type").default("BIKE").notNull(),
    permitStatus: permitStatus("permit_status").default("PENDING").notNull(),
    isAccepted: boolean("is_accepted").default(false).notNull(),
    status: riderStatus().notNull(),
    lastLat: doublePrecision("last_lat"),
    lastLng: doublePrecision("last_lng"),
    lastSeen: timestamp("last_seen", { precision: 3, mode: "date" }),
    batteryLevel: integer("battery_level"),
    fcmToken: text("fcm_token"),
    companyId: text("company_id"),
    deactivatedAt: timestamp("deactivated_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).notNull()
  },
  (table) => [
    index("riders_company_id_status_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    index("riders_company_id_updated_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.updatedAt.asc().nullsLast().op("timestamp_ops")
    ),
    uniqueIndex("riders_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
    index("riders_status_last_seen_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops"),
      table.lastSeen.asc().nullsLast().op("timestamp_ops")
    ),
    uniqueIndex("riders_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "riders_company_id_fkey"
    }).onUpdate("cascade").onDelete("set null")
  ]
);
var deliveryTransactions = pgTable(
  "delivery_transactions",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: text("company_id"),
    amount: doublePrecision().notNull(),
    currency: text().default("NGN").notNull(),
    status: transactionStatus().default("PENDING").notNull(),
    reference: text().notNull(),
    provider: text(),
    metadata: jsonb(),
    processedAt: timestamp("processed_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("delivery_transactions_company_id_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("delivery_transactions_reference_idx").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("delivery_transactions_reference_key").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    index("delivery_transactions_status_created_at_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    )
  ]
);
var deliveryAllocations = pgTable(
  "delivery_allocations",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    deliveryId: text("delivery_id").notNull(),
    deliveryTransactionId: text("delivery_transaction_id").notNull(),
    amount: doublePrecision().notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    uniqueIndex("delivery_allocations_delivery_id_delivery_transaction_id_key").using(
      "btree",
      table.deliveryId.asc().nullsLast().op("text_ops"),
      table.deliveryTransactionId.asc().nullsLast().op("text_ops")
    ),
    index("delivery_allocations_delivery_id_idx").using(
      "btree",
      table.deliveryId.asc().nullsLast().op("text_ops")
    ),
    index("delivery_allocations_delivery_transaction_id_idx").using(
      "btree",
      table.deliveryTransactionId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.deliveryId],
      foreignColumns: [deliveries.id],
      name: "delivery_allocations_delivery_id_fkey"
    }).onUpdate("cascade").onDelete("cascade"),
    foreignKey({
      columns: [table.deliveryTransactionId],
      foreignColumns: [deliveryTransactions.id],
      name: "delivery_allocations_delivery_transaction_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var ledgerTransactions = pgTable(
  "ledger_transactions",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: text("company_id").notNull(),
    amount: doublePrecision().notNull(),
    adjustmentType: ledgerAdjustmentType("adjustment_type").notNull(),
    reference: text().notNull(),
    reason: text(),
    performedBy: text("performed_by"),
    metadata: jsonb(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("ledger_transactions_company_id_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("ledger_transactions_reference_idx").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("ledger_transactions_reference_key").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    )
  ]
);
var eventLogs = pgTable(
  "event_logs",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    eventType: text("event_type").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id").notNull(),
    actorId: text("actor_id"),
    actorType: text("actor_type"),
    companyId: text("company_id"),
    payload: jsonb(),
    traceId: text("trace_id"),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    success: boolean().default(true).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("event_logs_actor_id_created_at_idx").using(
      "btree",
      table.actorId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("event_logs_company_id_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("event_logs_entity_id_created_at_idx").using(
      "btree",
      table.entityId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("event_logs_event_type_created_at_idx").using(
      "btree",
      table.eventType.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("event_logs_event_type_success_created_at_idx").using(
      "btree",
      table.eventType.asc().nullsLast().op("text_ops"),
      table.success.asc().nullsLast().op("bool_ops"),
      table.createdAt.desc().nullsLast().op("timestamp_ops")
    )
  ]
);
var exportRequests = pgTable(
  "export_requests",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: text("company_id").notNull(),
    userEmail: text("user_email").notNull(),
    status: exportRequestStatus().default("PENDING").notNull(),
    requestedBy: text("requested_by").notNull(),
    targetMonth: text("target_month"),
    riderId: text("rider_id"),
    requestedAt: timestamp("requested_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    completedAt: timestamp("completed_at", { precision: 3, mode: "date" }),
    downloadUrl: text("download_url")
  },
  (table) => [
    index("export_requests_company_id_status_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    index("export_requests_status_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops")
    )
  ]
);
var appConfigs = pgTable("app_configs", {
  key: text().primaryKey().notNull(),
  value: jsonb().notNull(),
  scope: text(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).notNull()
});
var subscriptionTransactions = pgTable(
  "subscription_transactions",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: text("company_id").notNull(),
    amount: doublePrecision().notNull(),
    currency: text().default("NGN").notNull(),
    status: transactionStatus().default("PENDING").notNull(),
    reference: text().notNull(),
    provider: text(),
    tier: subscriptionTier().notNull(),
    periodStart: timestamp("period_start", { precision: 3, mode: "date" }).notNull(),
    periodEnd: timestamp("period_end", { precision: 3, mode: "date" }).notNull(),
    metadata: jsonb(),
    processedAt: timestamp("processed_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("subscription_transactions_company_id_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("subscription_transactions_reference_idx").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("subscription_transactions_reference_key").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    index("subscription_transactions_status_created_at_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    )
  ]
);
var customerCompanyMappings = pgTable(
  "customer_company_mappings",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    platformId: text("platform_id").notNull(),
    platform: mappingPlatform().default("WHATSAPP").notNull(),
    companyId: text("company_id").notNull(),
    source: mappingSource().default("DISCOVERY").notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    metadata: jsonb()
  },
  (table) => [
    index("customer_company_mappings_company_id_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    index("customer_company_mappings_platform_id_idx").using(
      "btree",
      table.platformId.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("customer_company_mappings_platform_id_platform_company_id_key").using(
      "btree",
      table.platformId.asc().nullsLast().op("text_ops"),
      table.platform.asc().nullsLast().op("enum_ops"),
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    index("customer_company_mappings_platform_id_platform_idx").using(
      "btree",
      table.platformId.asc().nullsLast().op("text_ops"),
      table.platform.asc().nullsLast().op("enum_ops")
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "customer_company_mappings_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var riderLocationLogs = pgTable(
  "rider_location_logs",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    riderId: text("rider_id").notNull(),
    lat: doublePrecision().notNull(),
    lng: doublePrecision().notNull(),
    status: riderStatus(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("rider_location_logs_created_at_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("rider_location_logs_rider_id_created_at_idx").using(
      "btree",
      table.riderId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    foreignKey({
      columns: [table.riderId],
      foreignColumns: [riders.id],
      name: "rider_location_logs_rider_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);

// src/drizzle/relations.ts
import { relations } from "drizzle-orm/relations";
var companySettingsRelations = relations(companySettings, ({ one }) => ({
  company: one(companies, {
    fields: [companySettings.companyId],
    references: [companies.id]
  })
}));
var companiesRelations = relations(companies, ({ many, one }) => ({
  companySettings: one(companySettings),
  pricingSchemes: many(pricingSchemes),
  companyIntegrations: many(companyIntegrations),
  conversations: many(conversations),
  dispatchers: many(dispatchers),
  deliveries: many(deliveries),
  riders: many(riders),
  customerCompanyMappings: many(customerCompanyMappings)
}));
var pricingSchemesRelations = relations(pricingSchemes, ({ one }) => ({
  company: one(companies, {
    fields: [pricingSchemes.companyId],
    references: [companies.id]
  })
}));
var companyIntegrationsRelations = relations(companyIntegrations, ({ one }) => ({
  company: one(companies, {
    fields: [companyIntegrations.companyId],
    references: [companies.id]
  })
}));
var conversationsRelations = relations(conversations, ({ one, many }) => ({
  company: one(companies, {
    fields: [conversations.companyId],
    references: [companies.id]
  }),
  messages: many(messages)
}));
var messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id]
  })
}));
var dispatchersRelations = relations(dispatchers, ({ one }) => ({
  company: one(companies, {
    fields: [dispatchers.companyId],
    references: [companies.id]
  })
}));
var deliveriesRelations = relations(deliveries, ({ one, many }) => ({
  company: one(companies, {
    fields: [deliveries.companyId],
    references: [companies.id]
  }),
  rider: one(riders, {
    fields: [deliveries.riderId],
    references: [riders.id]
  }),
  deliveryAllocations: many(deliveryAllocations)
}));
var ridersRelations = relations(riders, ({ one, many }) => ({
  deliveries: many(deliveries),
  company: one(companies, {
    fields: [riders.companyId],
    references: [companies.id]
  }),
  riderLocationLogs: many(riderLocationLogs)
}));
var deliveryAllocationsRelations = relations(deliveryAllocations, ({ one }) => ({
  delivery: one(deliveries, {
    fields: [deliveryAllocations.deliveryId],
    references: [deliveries.id]
  }),
  deliveryTransaction: one(deliveryTransactions, {
    fields: [deliveryAllocations.deliveryTransactionId],
    references: [deliveryTransactions.id]
  })
}));
var deliveryTransactionsRelations = relations(deliveryTransactions, ({ many }) => ({
  deliveryAllocations: many(deliveryAllocations)
}));
var customerCompanyMappingsRelations = relations(customerCompanyMappings, ({ one }) => ({
  company: one(companies, {
    fields: [customerCompanyMappings.companyId],
    references: [companies.id]
  })
}));
var riderLocationLogsRelations = relations(riderLocationLogs, ({ one }) => ({
  rider: one(riders, {
    fields: [riderLocationLogs.riderId],
    references: [riders.id]
  })
}));
export {
  AI_CONFIG,
  ActorType,
  ApiTag,
  AuditAction,
  BILLING_CONFIG,
  ChatUpdateType,
  ComponentStatus,
  DEFAULT_WORKING_HOURS,
  DeliveryStatus,
  EmailService,
  EntityType,
  ErrorCode,
  EventType,
  LIMITS_CONFIG,
  LedgerAdjustmentType,
  LlmRole,
  LogLevel,
  MappingPlatform,
  MessageStatus,
  MomentoType,
  NotificationEventType,
  NotificationPriority,
  PaymentMethod,
  PaymentProvider,
  PermitStatus,
  ProviderRole,
  QUEUES,
  REGIONAL_CONFIG,
  RiderStatus,
  SECURITY_CONFIG,
  SYSTEM_CONFIG,
  SecurityEventType,
  SecuritySeverity,
  SubscriptionEventType,
  SubscriptionTier,
  SystemStatus,
  TIER_LIMITS,
  TransactionStatus,
  UpdateReason,
  UserAuditAction,
  UserRole,
  VehicleType,
  admins,
  appConfigs,
  blockedIps,
  buildSystemConfig,
  companies,
  companiesRelations,
  companyIntegrations,
  companyIntegrationsRelations,
  companySettings,
  companySettingsRelations,
  conversations,
  conversationsRelations,
  customerCompanyMappings,
  customerCompanyMappingsRelations,
  deliveries,
  deliveriesRelations,
  deliveryAllocations,
  deliveryAllocationsRelations,
  deliveryStatus,
  deliveryTransactions,
  deliveryTransactionsRelations,
  dispatchers,
  dispatchersRelations,
  eventLogs,
  exportRequestStatus,
  exportRequests,
  fetchWithTimeout,
  formatAmount,
  getNextRetryDate,
  getSubscriptionPrice,
  getTierLimits,
  isBillableTier,
  isDeliveryActive,
  isDeliveryTerminal,
  ledgerAdjustmentType,
  ledgerTransactions,
  localParse,
  mappingPlatform,
  mappingSource,
  messageStatus,
  messages,
  messagesRelations,
  paymentMethod,
  permitStatus,
  pricingSchemes,
  pricingSchemesRelations,
  riderLocationLogs,
  riderLocationLogsRelations,
  riderStatus,
  riders,
  ridersRelations,
  senderType,
  shouldBillNow,
  shouldRetryPayment,
  subscriptionTier,
  subscriptionTransactions,
  transactionStatus,
  vehicleType
};
