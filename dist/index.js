"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AI_CONFIG: () => AI_CONFIG,
  ActorType: () => ActorType,
  ApiTag: () => ApiTag,
  AuditAction: () => AuditAction,
  BILLING_CONFIG: () => BILLING_CONFIG,
  ChatUpdateType: () => ChatUpdateType,
  ComponentStatus: () => ComponentStatus,
  DEFAULT_COMPANY_SETTINGS: () => DEFAULT_COMPANY_SETTINGS,
  DEFAULT_PRICING_SCHEMES: () => DEFAULT_PRICING_SCHEMES,
  DEFAULT_SYSTEM_COMPANY: () => DEFAULT_SYSTEM_COMPANY,
  DEFAULT_WORKING_HOURS: () => DEFAULT_WORKING_HOURS,
  DeliveryStatus: () => DeliveryStatus,
  EmailService: () => EmailService,
  EntityType: () => EntityType,
  ErrorCode: () => ErrorCode,
  EventType: () => EventType,
  LIMITS_CONFIG: () => LIMITS_CONFIG,
  LedgerAdjustmentType: () => LedgerAdjustmentType,
  LlmRole: () => LlmRole,
  LogLevel: () => LogLevel,
  MappingPlatform: () => MappingPlatform,
  MessageStatus: () => MessageStatus,
  MomentoType: () => MomentoType,
  NotificationEventType: () => NotificationEventType,
  NotificationPriority: () => NotificationPriority,
  PaymentMethod: () => PaymentMethod,
  PaymentProvider: () => PaymentProvider,
  PermitStatus: () => PermitStatus,
  ProviderRole: () => ProviderRole,
  REGIONAL_CONFIG: () => REGIONAL_CONFIG,
  RiderStatus: () => RiderStatus,
  SECURITY_CONFIG: () => SECURITY_CONFIG,
  SYSTEM_COMPANY_HANDLE: () => SYSTEM_COMPANY_HANDLE,
  SYSTEM_CONFIG: () => SYSTEM_CONFIG,
  SYSTEM_SUBSCRIPTION_TIER: () => SYSTEM_SUBSCRIPTION_TIER,
  SecurityEventType: () => SecurityEventType,
  SecuritySeverity: () => SecuritySeverity,
  SubscriptionEventType: () => SubscriptionEventType,
  SubscriptionTier: () => SubscriptionTier,
  SystemStatus: () => SystemStatus,
  TIER_LIMITS: () => TIER_LIMITS,
  TransactionStatus: () => TransactionStatus,
  UpdateReason: () => UpdateReason,
  UserAuditAction: () => UserAuditAction,
  UserRole: () => UserRole,
  VehicleType: () => VehicleType,
  admins: () => admins,
  appConfigs: () => appConfigs,
  blockedIps: () => blockedIps,
  buildSystemConfig: () => buildSystemConfig,
  companies: () => companies,
  companiesRelations: () => companiesRelations,
  companyIntegrations: () => companyIntegrations,
  companyIntegrationsRelations: () => companyIntegrationsRelations,
  companySettings: () => companySettings,
  companySettingsRelations: () => companySettingsRelations,
  conversations: () => conversations,
  conversationsRelations: () => conversationsRelations,
  customerCompanyMappings: () => customerCompanyMappings,
  customerCompanyMappingsRelations: () => customerCompanyMappingsRelations,
  deliveries: () => deliveries,
  deliveriesRelations: () => deliveriesRelations,
  deliveryAllocations: () => deliveryAllocations,
  deliveryAllocationsRelations: () => deliveryAllocationsRelations,
  deliveryStatus: () => deliveryStatus,
  deliveryTransactions: () => deliveryTransactions,
  deliveryTransactionsRelations: () => deliveryTransactionsRelations,
  dispatchers: () => dispatchers,
  dispatchersRelations: () => dispatchersRelations,
  eventLogs: () => eventLogs,
  exportRequestStatus: () => exportRequestStatus,
  exportRequests: () => exportRequests,
  fetchWithTimeout: () => fetchWithTimeout,
  formatAmount: () => formatAmount,
  getNextRetryDate: () => getNextRetryDate,
  getSubscriptionPrice: () => getSubscriptionPrice,
  getTierLimits: () => getTierLimits,
  isBillableTier: () => isBillableTier,
  ledgerAdjustmentType: () => ledgerAdjustmentType,
  ledgerTransactions: () => ledgerTransactions,
  localParse: () => localParse,
  mappingPlatform: () => mappingPlatform,
  mappingSource: () => mappingSource,
  messageStatus: () => messageStatus,
  messages: () => messages,
  messagesRelations: () => messagesRelations,
  paymentMethod: () => paymentMethod,
  permitStatus: () => permitStatus,
  pricingSchemes: () => pricingSchemes,
  pricingSchemesRelations: () => pricingSchemesRelations,
  riderLocationLogs: () => riderLocationLogs,
  riderLocationLogsRelations: () => riderLocationLogsRelations,
  riderStatus: () => riderStatus,
  riders: () => riders,
  ridersRelations: () => ridersRelations,
  role: () => role,
  senderType: () => senderType,
  shouldBillNow: () => shouldBillNow,
  shouldRetryPayment: () => shouldRetryPayment,
  subscriptionTier: () => subscriptionTier,
  subscriptionTransactions: () => subscriptionTransactions,
  transactionStatus: () => transactionStatus,
  vehicleType: () => vehicleType
});
module.exports = __toCommonJS(index_exports);

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
  DeliveryStatus2["EN_ROUTE"] = "EN_ROUTE";
  DeliveryStatus2["DELIVERED"] = "DELIVERED";
  DeliveryStatus2["CANCELLED"] = "CANCELLED";
  return DeliveryStatus2;
})(DeliveryStatus || {});
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
var import_zod = require("zod");
var DEFAULT_WORKING_HOURS = {
  Monday: { start: "07:00", close: "19:00" },
  Tuesday: { start: "07:00", close: "19:00" },
  Wednesday: { start: "07:00", close: "19:00" },
  Thursday: { start: "07:00", close: "19:00" },
  Friday: { start: "07:00", close: "19:00" },
  Saturday: { start: "07:00", close: "19:00" }
};
var SystemConfigSchema = import_zod.z.object({
  BRAND_DOMAIN: import_zod.z.string().optional(),
  BRAND_NAME: import_zod.z.string().optional(),
  BRAND_SUPPORT_EMAIL: import_zod.z.string().optional(),
  BRAND_PHONE_NUMBER: import_zod.z.string().optional(),
  BRAND_LOGO_URL: import_zod.z.string().optional(),
  BRAND_FAVICON_URL: import_zod.z.string().optional(),
  ENABLE_TRACKING_CODES: import_zod.z.string().optional(),
  SYSTEM_HUB_HANDLE: import_zod.z.string().optional()
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
    if (err instanceof import_zod.z.ZodError) {
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
var import_zod2 = require("zod");
var regionalConfigSchema = import_zod2.z.object({
  defaultCountryCode: import_zod2.z.string(),
  timeZone: import_zod2.z.string(),
  states: import_zod2.z.array(import_zod2.z.string())
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
var import_zod3 = require("zod");
var limitsConfigSchema = import_zod3.z.object({
  maxBatchSize: import_zod3.z.number(),
  dbBatchSize: import_zod3.z.number(),
  userActionConcurrency: import_zod3.z.number(),
  externalApiConcurrency: import_zod3.z.number(),
  maxDisambiguationOptions: import_zod3.z.number(),
  maxQueryLimit: import_zod3.z.number(),
  locationDeduplicationRadiusMeters: import_zod3.z.number(),
  disambiguationGapThreshold: import_zod3.z.number(),
  externalApiTimeoutMs: import_zod3.z.number(),
  trackingFrequencyConfig: import_zod3.z.object({
    baseIntervalMs: import_zod3.z.number(),
    farDistanceMeters: import_zod3.z.number(),
    farIntervalMs: import_zod3.z.number()
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
    // ₦15000.00
    ["PROFESSIONAL" /* PROFESSIONAL */]: 5e6
    // ₦50000.00
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

// src/defaults.ts
var DEFAULT_PRICING_SCHEMES = [
  { vehicleType: "BIKE" /* BIKE */, baseFare: 1e3, perKmRate: 150, minFare: 1e3 },
  { vehicleType: "CAR" /* CAR */, baseFare: 2e3, perKmRate: 300, minFare: 2e3 },
  { vehicleType: "VAN" /* VAN */, baseFare: 3e3, perKmRate: 400, minFare: 3e3 },
  { vehicleType: "TRUCK" /* TRUCK */, baseFare: 5e3, perKmRate: 500, minFare: 5e3 }
];
var SYSTEM_COMPANY_HANDLE = SYSTEM_CONFIG.businessHandle;
var SYSTEM_SUBSCRIPTION_TIER = "PROFESSIONAL" /* PROFESSIONAL */;
var DEFAULT_COMPANY_SETTINGS = {
  workingHours: DEFAULT_WORKING_HOURS,
  autoReplyEnabled: true,
  tier: SYSTEM_SUBSCRIPTION_TIER
};
var DEFAULT_SYSTEM_COMPANY = {
  id: null,
  name: SYSTEM_CONFIG.brandName,
  businessHandle: SYSTEM_CONFIG.businessHandle,
  pricingSchemes: DEFAULT_PRICING_SCHEMES,
  companySettings: DEFAULT_COMPANY_SETTINGS
};

// src/security.ts
var import_zod4 = require("zod");
var securityConfigSchema = import_zod4.z.object({
  rateLimits: import_zod4.z.object({
    global: import_zod4.z.object({ max: import_zod4.z.number(), windowMs: import_zod4.z.number() }),
    auth: import_zod4.z.object({ max: import_zod4.z.number(), windowMs: import_zod4.z.number() }),
    api: import_zod4.z.object({ max: import_zod4.z.number(), windowMs: import_zod4.z.number() }),
    login: import_zod4.z.object({ max: import_zod4.z.number(), window: import_zod4.z.number() }),
    register: import_zod4.z.object({ max: import_zod4.z.number(), window: import_zod4.z.number() }),
    otp: import_zod4.z.object({ max: import_zod4.z.number(), window: import_zod4.z.number() }),
    tiers: import_zod4.z.object({
      FREE: import_zod4.z.object({ max: import_zod4.z.number(), windowMs: import_zod4.z.number() }),
      STARTER: import_zod4.z.object({ max: import_zod4.z.number(), windowMs: import_zod4.z.number() }),
      PROFESSIONAL: import_zod4.z.object({ max: import_zod4.z.number(), windowMs: import_zod4.z.number() }),
      ENTERPRISE: import_zod4.z.object({ max: import_zod4.z.number(), windowMs: import_zod4.z.number() })
    })
  }),
  jwt: import_zod4.z.object({
    jwtExpiresIn: import_zod4.z.string(),
    jwtRefreshExpiresIn: import_zod4.z.string()
  }),
  headers: import_zod4.z.custom((val) => typeof val === "object" && val !== null),
  maliciousPatterns: import_zod4.z.array(import_zod4.z.instanceof(RegExp)),
  validation: import_zod4.z.object({
    maxEmailLength: import_zod4.z.number(),
    maxPasswordLength: import_zod4.z.number(),
    maxNameLength: import_zod4.z.number(),
    maxDescriptionLength: import_zod4.z.number(),
    maxPhoneLength: import_zod4.z.number(),
    maxAddressLength: import_zod4.z.number(),
    securityPinLength: import_zod4.z.number().default(6),
    securityPinMinRange: import_zod4.z.number().default(1e5),
    securityPinMaxRange: import_zod4.z.number().default(999999)
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
      PROFESSIONAL: { max: 2e3, windowMs: 9e5 },
      ENTERPRISE: { max: 1e4, windowMs: 9e5 }
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
var import_zod5 = require("zod");
var aiConfigSchema = import_zod5.z.object({
  interpretation: import_zod5.z.object({
    maxTokens: import_zod5.z.number(),
    cooldownSeconds: import_zod5.z.number().default(600)
  }),
  synthesis: import_zod5.z.object({
    temperature: import_zod5.z.number(),
    maxTokens: import_zod5.z.number(),
    cooldownSeconds: import_zod5.z.number().default(300)
  }),
  heartbeatTtl: import_zod5.z.number().default(36e5),
  heartbeatThresholdMs: import_zod5.z.number().default(42e4),
  maxSingleMessageTokens: import_zod5.z.number().default(4096),
  maxMessagesPerResponse: import_zod5.z.number().default(3),
  messageFetchLimit: import_zod5.z.object({
    default: import_zod5.z.number().default(10),
    max: import_zod5.z.number().default(20)
  }),
  memoryCacheTtl: import_zod5.z.number().default(6e5),
  maxIterations: import_zod5.z.number().default(2),
  providerTimeoutMs: import_zod5.z.number().default(1e4)
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
var import_pg_core = require("drizzle-orm/pg-core");
var import_drizzle_orm = require("drizzle-orm");
var createId = () => globalThis.crypto.randomUUID();
var deliveryStatus = (0, import_pg_core.pgEnum)("DeliveryStatus", [
  "AWAITING_PAYMENT",
  "PENDING",
  "ASSIGNED",
  "IN_TRANSIT",
  "DELIVERED",
  "CANCELLED"
]);
var exportRequestStatus = (0, import_pg_core.pgEnum)("ExportRequestStatus", [
  "PENDING",
  "PROCESSING",
  "COMPLETED",
  "FAILED"
]);
var ledgerAdjustmentType = (0, import_pg_core.pgEnum)("LedgerAdjustmentType", [
  "CREDIT",
  "DEBIT",
  "CORRECTION",
  "REFUND"
]);
var mappingPlatform = (0, import_pg_core.pgEnum)("MappingPlatform", [
  "WHATSAPP",
  "INSTAGRAM",
  "TIKTOK",
  "FACEBOOK"
]);
var mappingSource = (0, import_pg_core.pgEnum)("MappingSource", ["MANUAL", "DISCOVERY"]);
var messageStatus = (0, import_pg_core.pgEnum)("MessageStatus", ["SENT", "DELIVERED", "READ", "FAILED"]);
var paymentMethod = (0, import_pg_core.pgEnum)("PaymentMethod", ["PREPAID", "POD"]);
var permitStatus = (0, import_pg_core.pgEnum)("PermitStatus", ["PENDING", "APPROVED", "REJECTED"]);
var riderStatus = (0, import_pg_core.pgEnum)("RiderStatus", ["OFFLINE", "ONLINE", "BUSY"]);
var role = (0, import_pg_core.pgEnum)("Role", ["DISPATCHER", "COMPANY", "RIDER", "CUSTOMER", "ADMIN"]);
var senderType = (0, import_pg_core.pgEnum)("SenderType", ["CUSTOMER", "AGENT", "DISPATCHER", "SYSTEM"]);
var subscriptionTier = (0, import_pg_core.pgEnum)("SubscriptionTier", ["FREE", "STARTER", "PROFESSIONAL"]);
var transactionStatus = (0, import_pg_core.pgEnum)("TransactionStatus", [
  "PENDING",
  "SUCCESS",
  "FAILED",
  "REVERSED"
]);
var vehicleType = (0, import_pg_core.pgEnum)("VehicleType", ["BIKE", "CAR", "VAN", "TRUCK"]);
var companies = (0, import_pg_core.pgTable)(
  "companies",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    name: (0, import_pg_core.text)().notNull(),
    businessHandle: (0, import_pg_core.text)("business_handle"),
    logoUrl: (0, import_pg_core.text)("logo_url"),
    cac: (0, import_pg_core.text)(),
    contactPhone: (0, import_pg_core.text)("contact_phone"),
    address: (0, import_pg_core.text)(),
    placeId: (0, import_pg_core.text)("place_id"),
    states: (0, import_pg_core.text)().array().default(["RAY"]),
    interstateDeliveries: (0, import_pg_core.boolean)("interstate_deliveries").notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.uniqueIndex)("companies_business_handle_key").using(
      "btree",
      table.businessHandle.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("companies_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops"))
  ]
);
var companySettings = (0, import_pg_core.pgTable)(
  "company_settings",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: (0, import_pg_core.text)("company_id").notNull(),
    tier: subscriptionTier().default("FREE").notNull(),
    workingHours: (0, import_pg_core.jsonb)("working_hours").default({
      Friday: { close: "19:00", start: "07:00" },
      Monday: { close: "19:00", start: "07:00" },
      Tuesday: { close: "19:00", start: "07:00" },
      Saturday: { close: "19:00", start: "07:00" },
      Thursday: { close: "19:00", start: "07:00" },
      Wednesday: { close: "19:00", start: "07:00" }
    }).notNull(),
    bankDetails: (0, import_pg_core.jsonb)("bank_details"),
    ledgerBalance: (0, import_pg_core.doublePrecision)("ledger_balance").default(0).notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.uniqueIndex)("company_settings_company_id_key").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "company_settings_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var pricingSchemes = (0, import_pg_core.pgTable)(
  "pricing_schemes",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: (0, import_pg_core.text)("company_id").notNull(),
    vehicleType: vehicleType("vehicle_type").default("BIKE").notNull(),
    baseFare: (0, import_pg_core.doublePrecision)("base_fare").default(1e3).notNull(),
    perKmRate: (0, import_pg_core.doublePrecision)("per_km_rate").default(150).notNull(),
    minFare: (0, import_pg_core.doublePrecision)("min_fare").default(1e3).notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.uniqueIndex)("pricing_schemes_company_id_vehicle_type_key").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.vehicleType.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "pricing_schemes_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var companyIntegrations = (0, import_pg_core.pgTable)(
  "company_integrations",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    platform: mappingPlatform().notNull(),
    platformId: (0, import_pg_core.text)("platform_id").notNull(),
    companyId: (0, import_pg_core.text)("company_id").notNull(),
    isActive: (0, import_pg_core.boolean)("is_active").default(false).notNull(),
    isPlatformOwned: (0, import_pg_core.boolean)("is_platform_owned").default(true).notNull(),
    metadata: (0, import_pg_core.jsonb)(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("company_integrations_company_id_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("company_integrations_is_active_idx").using(
      "btree",
      table.isActive.asc().nullsLast().op("bool_ops")
    ),
    (0, import_pg_core.uniqueIndex)("company_integrations_platform_company_id_key").using(
      "btree",
      table.platform.asc().nullsLast().op("enum_ops"),
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.uniqueIndex)("company_integrations_platform_platform_id_key").using(
      "btree",
      table.platform.asc().nullsLast().op("enum_ops"),
      table.platformId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "company_integrations_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var conversations = (0, import_pg_core.pgTable)(
  "conversations",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    platform: mappingPlatform().default("WHATSAPP").notNull(),
    platformId: (0, import_pg_core.text)("platform_id").notNull(),
    companyId: (0, import_pg_core.text)("company_id").notNull(),
    lastMessageAt: (0, import_pg_core.timestamp)("last_message_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, import_pg_core.timestamp)("updated_at", { precision: 3, mode: "date" }).notNull(),
    autoReplyEnabled: (0, import_pg_core.boolean)("auto_reply_enabled").default(true).notNull(),
    lastCustomerMessageAt: (0, import_pg_core.timestamp)("last_customer_message_at", { precision: 3, mode: "date" }),
    scratchpad: (0, import_pg_core.jsonb)(),
    customerName: (0, import_pg_core.text)("customer_name")
  },
  (table) => [
    (0, import_pg_core.index)("conversations_company_id_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("conversations_company_id_last_message_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.lastMessageAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("conversations_platform_id_platform_idx").using(
      "btree",
      table.platformId.asc().nullsLast().op("text_ops"),
      table.platform.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.uniqueIndex)("conversations_platform_platform_id_company_id_key").using(
      "btree",
      table.platform.asc().nullsLast().op("enum_ops"),
      table.platformId.asc().nullsLast().op("text_ops"),
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "conversations_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var messages = (0, import_pg_core.pgTable)(
  "messages",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    conversationId: (0, import_pg_core.text)("conversation_id").notNull(),
    body: (0, import_pg_core.text)().notNull(),
    senderType: senderType("sender_type").notNull(),
    senderId: (0, import_pg_core.text)("sender_id"),
    isDeleted: (0, import_pg_core.boolean)("is_deleted").default(false).notNull(),
    metadata: (0, import_pg_core.jsonb)(),
    mediaUrl: (0, import_pg_core.text)("media_url"),
    externalId: (0, import_pg_core.text)("external_id"),
    replyToExternalId: (0, import_pg_core.text)("reply_to_external_id"),
    status: messageStatus().default("SENT").notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, import_pg_core.timestamp)("updated_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("messages_conversation_id_created_at_idx").using(
      "btree",
      table.conversationId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("messages_conversation_id_idx").using(
      "btree",
      table.conversationId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("messages_external_id_idx").using(
      "btree",
      table.externalId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.uniqueIndex)("messages_external_id_key").using(
      "btree",
      table.externalId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("messages_reply_to_external_id_idx").using(
      "btree",
      table.replyToExternalId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("messages_conversation_id_is_deleted_idx").using(
      "btree",
      table.conversationId.asc().nullsLast().op("text_ops"),
      table.isDeleted.asc().nullsLast().op("bool_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.conversationId],
      foreignColumns: [conversations.id],
      name: "messages_conversation_id_fkey"
    }).onUpdate("cascade").onDelete("restrict")
  ]
);
var admins = (0, import_pg_core.pgTable)(
  "admins",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    userId: (0, import_pg_core.text)("user_id").notNull(),
    email: (0, import_pg_core.text)().notNull(),
    fullName: (0, import_pg_core.text)("full_name").notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.uniqueIndex)("admins_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
    (0, import_pg_core.uniqueIndex)("admins_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops"))
  ]
);
var dispatchers = (0, import_pg_core.pgTable)(
  "dispatchers",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    userId: (0, import_pg_core.text)("user_id").notNull(),
    email: (0, import_pg_core.text)().notNull(),
    fullName: (0, import_pg_core.text)("full_name").notNull(),
    companyId: (0, import_pg_core.text)("company_id"),
    fcmToken: (0, import_pg_core.text)("fcm_token"),
    isOwner: (0, import_pg_core.boolean)("is_owner").default(false).notNull(),
    permitStatus: permitStatus("permit_status").default("PENDING").notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("dispatchers_company_id_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.uniqueIndex)("dispatchers_email_key").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.uniqueIndex)("dispatchers_user_id_key").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "dispatchers_company_id_fkey"
    }).onUpdate("cascade").onDelete("set null")
  ]
);
var blockedIps = (0, import_pg_core.pgTable)(
  "blocked_ips",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    ipAddress: (0, import_pg_core.text)("ip_address").notNull(),
    reason: (0, import_pg_core.text)(),
    blockedBy: (0, import_pg_core.text)("blocked_by"),
    expiresAt: (0, import_pg_core.timestamp)("expires_at", { precision: 3, mode: "date" }).notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("blocked_ips_expires_at_idx").using(
      "btree",
      table.expiresAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("blocked_ips_ip_address_idx").using(
      "btree",
      table.ipAddress.asc().nullsLast().op("text_ops")
    )
  ]
);
var deliveries = (0, import_pg_core.pgTable)(
  "deliveries",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: (0, import_pg_core.text)("company_id"),
    createdBy: (0, import_pg_core.text)("created_by"),
    riderId: (0, import_pg_core.text)("rider_id"),
    status: deliveryStatus().notNull(),
    pickupAddress: (0, import_pg_core.text)("pickup_address").notNull(),
    pickupPlaceId: (0, import_pg_core.text)("pickup_place_id"),
    pickupLat: (0, import_pg_core.doublePrecision)("pickup_lat"),
    pickupLng: (0, import_pg_core.doublePrecision)("pickup_lng"),
    dropOffAddress: (0, import_pg_core.text)("drop_off_address").notNull(),
    dropOffPlaceId: (0, import_pg_core.text)("drop_off_place_id"),
    dropOffLat: (0, import_pg_core.doublePrecision)("drop_off_lat"),
    dropOffLng: (0, import_pg_core.doublePrecision)("drop_off_lng"),
    pickupPhone: (0, import_pg_core.text)("pickup_phone"),
    dropOffPhone: (0, import_pg_core.text)("drop_off_phone"),
    description: (0, import_pg_core.text)(),
    paymentMethod: paymentMethod("payment_method").notNull(),
    scheduledAt: (0, import_pg_core.timestamp)("scheduled_at", { precision: 3, mode: "date" }),
    deliveredAt: (0, import_pg_core.timestamp)("delivered_at", { precision: 3, mode: "date" }),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, import_pg_core.timestamp)("updated_at", { precision: 3, mode: "date" }).notNull(),
    trackingId: (0, import_pg_core.text)("tracking_id").notNull(),
    pin: (0, import_pg_core.text)(),
    proofOfDeliveryImagePath: (0, import_pg_core.text)("proof_of_delivery_image_path"),
    price: (0, import_pg_core.doublePrecision)(),
    metadata: (0, import_pg_core.jsonb)()
  },
  (table) => [
    (0, import_pg_core.index)("deliveries_company_id_status_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.index)("deliveries_company_id_created_by_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdBy.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("deliveries_company_id_updated_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.updatedAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("deliveries_company_id_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdAt.desc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("deliveries_created_at_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("deliveries_rider_id_status_idx").using(
      "btree",
      table.riderId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.index)("deliveries_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
    (0, import_pg_core.uniqueIndex)("deliveries_tracking_id_key").using(
      "btree",
      table.trackingId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("deliveries_tracking_id_pin_idx").using(
      "btree",
      table.trackingId.asc().nullsLast().op("text_ops"),
      table.pin.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("deliveries_created_by_idx").using(
      "btree",
      table.createdBy.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("deliveries_pickup_phone_idx").using(
      "btree",
      table.pickupPhone.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("deliveries_drop_off_phone_idx").using(
      "btree",
      table.dropOffPhone.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "deliveries_company_id_fkey"
    }).onUpdate("cascade").onDelete("set null"),
    (0, import_pg_core.foreignKey)({
      columns: [table.riderId],
      foreignColumns: [riders.id],
      name: "deliveries_rider_id_fkey"
    }).onUpdate("cascade").onDelete("set null")
  ]
);
var riders = (0, import_pg_core.pgTable)(
  "riders",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    userId: (0, import_pg_core.text)("user_id").notNull(),
    email: (0, import_pg_core.text)().notNull(),
    fullName: (0, import_pg_core.text)("full_name").notNull(),
    phoneNumber: (0, import_pg_core.text)("phone_number"),
    registrationNumber: (0, import_pg_core.text)("registration_number"),
    vehicleType: vehicleType("vehicle_type").default("BIKE").notNull(),
    permitStatus: permitStatus("permit_status").default("PENDING").notNull(),
    isAccepted: (0, import_pg_core.boolean)("is_accepted").default(false).notNull(),
    status: riderStatus().notNull(),
    lastLat: (0, import_pg_core.doublePrecision)("last_lat"),
    lastLng: (0, import_pg_core.doublePrecision)("last_lng"),
    lastSeen: (0, import_pg_core.timestamp)("last_seen", { precision: 3, mode: "date" }),
    batteryLevel: (0, import_pg_core.integer)("battery_level"),
    fcmToken: (0, import_pg_core.text)("fcm_token"),
    companyId: (0, import_pg_core.text)("company_id"),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, import_pg_core.timestamp)("updated_at", { precision: 3, mode: "date" }).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("riders_company_id_status_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.index)("riders_company_id_updated_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.updatedAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.uniqueIndex)("riders_email_key").using("btree", table.email.asc().nullsLast().op("text_ops")),
    (0, import_pg_core.index)("riders_status_last_seen_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops"),
      table.lastSeen.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.uniqueIndex)("riders_user_id_key").using("btree", table.userId.asc().nullsLast().op("text_ops")),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "riders_company_id_fkey"
    }).onUpdate("cascade").onDelete("set null")
  ]
);
var deliveryTransactions = (0, import_pg_core.pgTable)(
  "delivery_transactions",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: (0, import_pg_core.text)("company_id"),
    amount: (0, import_pg_core.doublePrecision)().notNull(),
    currency: (0, import_pg_core.text)().default("NGN").notNull(),
    status: transactionStatus().default("PENDING").notNull(),
    reference: (0, import_pg_core.text)().notNull(),
    provider: (0, import_pg_core.text)(),
    metadata: (0, import_pg_core.jsonb)(),
    processedAt: (0, import_pg_core.timestamp)("processed_at", { precision: 3, mode: "date" }),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("delivery_transactions_company_id_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("delivery_transactions_reference_idx").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.uniqueIndex)("delivery_transactions_reference_key").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("delivery_transactions_status_created_at_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    )
  ]
);
var deliveryAllocations = (0, import_pg_core.pgTable)(
  "delivery_allocations",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    deliveryId: (0, import_pg_core.text)("delivery_id").notNull(),
    deliveryTransactionId: (0, import_pg_core.text)("delivery_transaction_id").notNull(),
    amount: (0, import_pg_core.doublePrecision)().notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.uniqueIndex)("delivery_allocations_delivery_id_delivery_transaction_id_key").using(
      "btree",
      table.deliveryId.asc().nullsLast().op("text_ops"),
      table.deliveryTransactionId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("delivery_allocations_delivery_id_idx").using(
      "btree",
      table.deliveryId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("delivery_allocations_delivery_transaction_id_idx").using(
      "btree",
      table.deliveryTransactionId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.deliveryId],
      foreignColumns: [deliveries.id],
      name: "delivery_allocations_delivery_id_fkey"
    }).onUpdate("cascade").onDelete("cascade"),
    (0, import_pg_core.foreignKey)({
      columns: [table.deliveryTransactionId],
      foreignColumns: [deliveryTransactions.id],
      name: "delivery_allocations_delivery_transaction_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var ledgerTransactions = (0, import_pg_core.pgTable)(
  "ledger_transactions",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: (0, import_pg_core.text)("company_id").notNull(),
    amount: (0, import_pg_core.doublePrecision)().notNull(),
    adjustmentType: ledgerAdjustmentType("adjustment_type").notNull(),
    reference: (0, import_pg_core.text)().notNull(),
    reason: (0, import_pg_core.text)(),
    performedBy: (0, import_pg_core.text)("performed_by"),
    metadata: (0, import_pg_core.jsonb)(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("ledger_transactions_company_id_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("ledger_transactions_reference_idx").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.uniqueIndex)("ledger_transactions_reference_key").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    )
  ]
);
var eventLogs = (0, import_pg_core.pgTable)(
  "event_logs",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    eventType: (0, import_pg_core.text)("event_type").notNull(),
    entityType: (0, import_pg_core.text)("entity_type").notNull(),
    entityId: (0, import_pg_core.text)("entity_id").notNull(),
    actorId: (0, import_pg_core.text)("actor_id"),
    actorType: (0, import_pg_core.text)("actor_type"),
    companyId: (0, import_pg_core.text)("company_id"),
    payload: (0, import_pg_core.jsonb)(),
    traceId: (0, import_pg_core.text)("trace_id"),
    ipAddress: (0, import_pg_core.text)("ip_address"),
    userAgent: (0, import_pg_core.text)("user_agent"),
    success: (0, import_pg_core.boolean)().default(true).notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("event_logs_actor_id_created_at_idx").using(
      "btree",
      table.actorId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("event_logs_company_id_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("event_logs_entity_id_created_at_idx").using(
      "btree",
      table.entityId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("event_logs_event_type_created_at_idx").using(
      "btree",
      table.eventType.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("event_logs_event_type_success_created_at_idx").using(
      "btree",
      table.eventType.asc().nullsLast().op("text_ops"),
      table.success.asc().nullsLast().op("bool_ops"),
      table.createdAt.desc().nullsLast().op("timestamp_ops")
    )
  ]
);
var exportRequests = (0, import_pg_core.pgTable)(
  "export_requests",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: (0, import_pg_core.text)("company_id").notNull(),
    userEmail: (0, import_pg_core.text)("user_email").notNull(),
    status: exportRequestStatus().default("PENDING").notNull(),
    requestedBy: (0, import_pg_core.text)("requested_by").notNull(),
    targetMonth: (0, import_pg_core.text)("target_month"),
    riderId: (0, import_pg_core.text)("rider_id"),
    requestedAt: (0, import_pg_core.timestamp)("requested_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    completedAt: (0, import_pg_core.timestamp)("completed_at", { precision: 3, mode: "date" }),
    downloadUrl: (0, import_pg_core.text)("download_url")
  },
  (table) => [
    (0, import_pg_core.index)("export_requests_company_id_status_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.index)("export_requests_status_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops")
    )
  ]
);
var appConfigs = (0, import_pg_core.pgTable)("app_configs", {
  key: (0, import_pg_core.text)().primaryKey().notNull(),
  value: (0, import_pg_core.jsonb)().notNull(),
  scope: (0, import_pg_core.text)(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at", { precision: 3, mode: "date" }).notNull()
});
var subscriptionTransactions = (0, import_pg_core.pgTable)(
  "subscription_transactions",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: (0, import_pg_core.text)("company_id").notNull(),
    amount: (0, import_pg_core.doublePrecision)().notNull(),
    currency: (0, import_pg_core.text)().default("NGN").notNull(),
    status: transactionStatus().default("PENDING").notNull(),
    reference: (0, import_pg_core.text)().notNull(),
    provider: (0, import_pg_core.text)(),
    tier: subscriptionTier().notNull(),
    periodStart: (0, import_pg_core.timestamp)("period_start", { precision: 3, mode: "date" }).notNull(),
    periodEnd: (0, import_pg_core.timestamp)("period_end", { precision: 3, mode: "date" }).notNull(),
    metadata: (0, import_pg_core.jsonb)(),
    processedAt: (0, import_pg_core.timestamp)("processed_at", { precision: 3, mode: "date" }),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("subscription_transactions_company_id_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("subscription_transactions_reference_idx").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.uniqueIndex)("subscription_transactions_reference_key").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("subscription_transactions_status_created_at_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    )
  ]
);
var customerCompanyMappings = (0, import_pg_core.pgTable)(
  "customer_company_mappings",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    platformId: (0, import_pg_core.text)("platform_id").notNull(),
    platform: mappingPlatform().default("WHATSAPP").notNull(),
    companyId: (0, import_pg_core.text)("company_id").notNull(),
    source: mappingSource().default("DISCOVERY").notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    metadata: (0, import_pg_core.jsonb)()
  },
  (table) => [
    (0, import_pg_core.index)("customer_company_mappings_company_id_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("customer_company_mappings_platform_id_idx").using(
      "btree",
      table.platformId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.uniqueIndex)("customer_company_mappings_platform_id_platform_company_id_key").using(
      "btree",
      table.platformId.asc().nullsLast().op("text_ops"),
      table.platform.asc().nullsLast().op("enum_ops"),
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("customer_company_mappings_platform_id_platform_idx").using(
      "btree",
      table.platformId.asc().nullsLast().op("text_ops"),
      table.platform.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "customer_company_mappings_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var riderLocationLogs = (0, import_pg_core.pgTable)(
  "rider_location_logs",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    riderId: (0, import_pg_core.text)("rider_id").notNull(),
    lat: (0, import_pg_core.doublePrecision)().notNull(),
    lng: (0, import_pg_core.doublePrecision)().notNull(),
    status: riderStatus(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("rider_location_logs_created_at_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("rider_location_logs_rider_id_created_at_idx").using(
      "btree",
      table.riderId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.riderId],
      foreignColumns: [riders.id],
      name: "rider_location_logs_rider_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);

// src/drizzle/relations.ts
var import_relations = require("drizzle-orm/relations");
var companySettingsRelations = (0, import_relations.relations)(companySettings, ({ one }) => ({
  company: one(companies, {
    fields: [companySettings.companyId],
    references: [companies.id]
  })
}));
var companiesRelations = (0, import_relations.relations)(companies, ({ many }) => ({
  companySettings: many(companySettings),
  pricingSchemes: many(pricingSchemes),
  companyIntegrations: many(companyIntegrations),
  conversations: many(conversations),
  dispatchers: many(dispatchers),
  deliveries: many(deliveries),
  riders: many(riders),
  customerCompanyMappings: many(customerCompanyMappings)
}));
var pricingSchemesRelations = (0, import_relations.relations)(pricingSchemes, ({ one }) => ({
  company: one(companies, {
    fields: [pricingSchemes.companyId],
    references: [companies.id]
  })
}));
var companyIntegrationsRelations = (0, import_relations.relations)(companyIntegrations, ({ one }) => ({
  company: one(companies, {
    fields: [companyIntegrations.companyId],
    references: [companies.id]
  })
}));
var conversationsRelations = (0, import_relations.relations)(conversations, ({ one, many }) => ({
  company: one(companies, {
    fields: [conversations.companyId],
    references: [companies.id]
  }),
  messages: many(messages)
}));
var messagesRelations = (0, import_relations.relations)(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id]
  })
}));
var dispatchersRelations = (0, import_relations.relations)(dispatchers, ({ one }) => ({
  company: one(companies, {
    fields: [dispatchers.companyId],
    references: [companies.id]
  })
}));
var deliveriesRelations = (0, import_relations.relations)(deliveries, ({ one, many }) => ({
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
var ridersRelations = (0, import_relations.relations)(riders, ({ one, many }) => ({
  deliveries: many(deliveries),
  company: one(companies, {
    fields: [riders.companyId],
    references: [companies.id]
  }),
  riderLocationLogs: many(riderLocationLogs)
}));
var deliveryAllocationsRelations = (0, import_relations.relations)(deliveryAllocations, ({ one }) => ({
  delivery: one(deliveries, {
    fields: [deliveryAllocations.deliveryId],
    references: [deliveries.id]
  }),
  deliveryTransaction: one(deliveryTransactions, {
    fields: [deliveryAllocations.deliveryTransactionId],
    references: [deliveryTransactions.id]
  })
}));
var deliveryTransactionsRelations = (0, import_relations.relations)(deliveryTransactions, ({ many }) => ({
  deliveryAllocations: many(deliveryAllocations)
}));
var customerCompanyMappingsRelations = (0, import_relations.relations)(customerCompanyMappings, ({ one }) => ({
  company: one(companies, {
    fields: [customerCompanyMappings.companyId],
    references: [companies.id]
  })
}));
var riderLocationLogsRelations = (0, import_relations.relations)(riderLocationLogs, ({ one }) => ({
  rider: one(riders, {
    fields: [riderLocationLogs.riderId],
    references: [riders.id]
  })
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AI_CONFIG,
  ActorType,
  ApiTag,
  AuditAction,
  BILLING_CONFIG,
  ChatUpdateType,
  ComponentStatus,
  DEFAULT_COMPANY_SETTINGS,
  DEFAULT_PRICING_SCHEMES,
  DEFAULT_SYSTEM_COMPANY,
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
  REGIONAL_CONFIG,
  RiderStatus,
  SECURITY_CONFIG,
  SYSTEM_COMPANY_HANDLE,
  SYSTEM_CONFIG,
  SYSTEM_SUBSCRIPTION_TIER,
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
  role,
  senderType,
  shouldBillNow,
  shouldRetryPayment,
  subscriptionTier,
  subscriptionTransactions,
  transactionStatus,
  vehicleType
});
