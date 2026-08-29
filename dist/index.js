// src/shared/enums/enums.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["ADMIN"] = "ADMIN";
  UserRole2["DISPATCHER"] = "DISPATCHER";
  UserRole2["RIDER"] = "RIDER";
  return UserRole2;
})(UserRole || {});
var AdminRole = /* @__PURE__ */ ((AdminRole2) => {
  AdminRole2["OPERATOR"] = "OPERATOR";
  AdminRole2["SUPER_ADMIN"] = "SUPER_ADMIN";
  return AdminRole2;
})(AdminRole || {});
var DispatcherRole = /* @__PURE__ */ ((DispatcherRole2) => {
  DispatcherRole2["OWNER"] = "OWNER";
  DispatcherRole2["STAFF"] = "STAFF";
  return DispatcherRole2;
})(DispatcherRole || {});
var DeliveryStatus = /* @__PURE__ */ ((DeliveryStatus2) => {
  DeliveryStatus2["PENDING"] = "PENDING";
  DeliveryStatus2["ASSIGNED"] = "ASSIGNED";
  DeliveryStatus2["IN_TRANSIT"] = "IN_TRANSIT";
  DeliveryStatus2["DELIVERED"] = "DELIVERED";
  DeliveryStatus2["CANCELLED"] = "CANCELLED";
  DeliveryStatus2["FAILED"] = "FAILED";
  return DeliveryStatus2;
})(DeliveryStatus || {});
var PaymentMethod = /* @__PURE__ */ ((PaymentMethod2) => {
  PaymentMethod2["PREPAID"] = "PREPAID";
  PaymentMethod2["PAY_ON_DELIVERY"] = "PAY_ON_DELIVERY";
  return PaymentMethod2;
})(PaymentMethod || {});
var PaymentStatus = /* @__PURE__ */ ((PaymentStatus2) => {
  PaymentStatus2["AWAITING"] = "AWAITING";
  PaymentStatus2["COMPLETED"] = "COMPLETED";
  PaymentStatus2["FAILED"] = "FAILED";
  return PaymentStatus2;
})(PaymentStatus || {});
var RiderStatus = /* @__PURE__ */ ((RiderStatus2) => {
  RiderStatus2["ONLINE"] = "ONLINE";
  RiderStatus2["OFFLINE"] = "OFFLINE";
  RiderStatus2["BUSY"] = "BUSY";
  return RiderStatus2;
})(RiderStatus || {});
var ApprovalStatus = /* @__PURE__ */ ((ApprovalStatus2) => {
  ApprovalStatus2["PENDING"] = "PENDING";
  ApprovalStatus2["APPROVED"] = "APPROVED";
  ApprovalStatus2["REJECTED"] = "REJECTED";
  ApprovalStatus2["SUSPENDED"] = "SUSPENDED";
  ApprovalStatus2["DISABLED"] = "DISABLED";
  return ApprovalStatus2;
})(ApprovalStatus || {});
var CompanyAccessLevel = {
  FULL: "FULL",
  TRIAL: "TRIAL",
  PAST_DUE: "PAST_DUE",
  RESTRICTED: "RESTRICTED"
};
var EntityType = /* @__PURE__ */ ((EntityType2) => {
  EntityType2["USER"] = "USER";
  EntityType2["DELIVERY"] = "DELIVERY";
  EntityType2["RIDER"] = "RIDER";
  EntityType2["COMPANY"] = "COMPANY";
  EntityType2["DISPATCHER"] = "DISPATCHER";
  EntityType2["SYSTEM"] = "SYSTEM";
  EntityType2["COMPANY_CHANNEL"] = "COMPANY_CHANNEL";
  EntityType2["MESSAGE"] = "MESSAGE";
  return EntityType2;
})(EntityType || {});
var ChannelPlatform = /* @__PURE__ */ ((ChannelPlatform2) => {
  ChannelPlatform2["WHATSAPP"] = "WHATSAPP";
  ChannelPlatform2["INSTAGRAM"] = "INSTAGRAM";
  ChannelPlatform2["FACEBOOK"] = "FACEBOOK";
  ChannelPlatform2["TIKTOK"] = "TIKTOK";
  return ChannelPlatform2;
})(ChannelPlatform || {});
var CompanyChannelStatus = /* @__PURE__ */ ((CompanyChannelStatus2) => {
  CompanyChannelStatus2["PENDING"] = "PENDING";
  CompanyChannelStatus2["ACTIVE"] = "ACTIVE";
  CompanyChannelStatus2["DEACTIVATED"] = "DEACTIVATED";
  CompanyChannelStatus2["REJECTED"] = "REJECTED";
  CompanyChannelStatus2["REMOVED"] = "REMOVED";
  return CompanyChannelStatus2;
})(CompanyChannelStatus || {});
var NodeEnv = /* @__PURE__ */ ((NodeEnv2) => {
  NodeEnv2["Development"] = "development";
  NodeEnv2["Production"] = "production";
  NodeEnv2["Test"] = "test";
  return NodeEnv2;
})(NodeEnv || {});
var VehicleType = /* @__PURE__ */ ((VehicleType2) => {
  VehicleType2["BIKE"] = "BIKE";
  return VehicleType2;
})(VehicleType || {});
var SubscriptionTier = /* @__PURE__ */ ((SubscriptionTier2) => {
  SubscriptionTier2["STARTER"] = "STARTER";
  SubscriptionTier2["PROFESSIONAL"] = "PROFESSIONAL";
  return SubscriptionTier2;
})(SubscriptionTier || {});
var SubscriptionStatus = /* @__PURE__ */ ((SubscriptionStatus2) => {
  SubscriptionStatus2["TRIAL"] = "TRIAL";
  SubscriptionStatus2["ACTIVE"] = "ACTIVE";
  SubscriptionStatus2["CANCELLING"] = "CANCELLING";
  SubscriptionStatus2["PAST_DUE"] = "PAST_DUE";
  SubscriptionStatus2["CANCELLED"] = "CANCELLED";
  return SubscriptionStatus2;
})(SubscriptionStatus || {});
var SubscriptionHealth = /* @__PURE__ */ ((SubscriptionHealth2) => {
  SubscriptionHealth2["HEALTHY"] = "HEALTHY";
  SubscriptionHealth2["IN_TRIAL"] = "IN_TRIAL";
  SubscriptionHealth2["PAST_DUE"] = "PAST_DUE";
  SubscriptionHealth2["EXPIRING_SOON"] = "EXPIRING_SOON";
  SubscriptionHealth2["CANCELLED"] = "CANCELLED";
  return SubscriptionHealth2;
})(SubscriptionHealth || {});
var TransactionStatus = /* @__PURE__ */ ((TransactionStatus2) => {
  TransactionStatus2["PENDING"] = "PENDING";
  TransactionStatus2["SUCCESS"] = "SUCCESS";
  TransactionStatus2["FAILED"] = "FAILED";
  TransactionStatus2["REVERSED"] = "REVERSED";
  return TransactionStatus2;
})(TransactionStatus || {});
var TransactionType = /* @__PURE__ */ ((TransactionType2) => {
  TransactionType2["DELIVERY_PAYMENT"] = "DELIVERY_PAYMENT";
  TransactionType2["SUBSCRIPTION"] = "SUBSCRIPTION";
  TransactionType2["ADJUSTMENT"] = "ADJUSTMENT";
  TransactionType2["SETTLEMENT"] = "SETTLEMENT";
  TransactionType2["REFUND"] = "REFUND";
  return TransactionType2;
})(TransactionType || {});
var LedgerAdjustmentType = /* @__PURE__ */ ((LedgerAdjustmentType2) => {
  LedgerAdjustmentType2["CREDIT"] = "CREDIT";
  LedgerAdjustmentType2["DEBIT"] = "DEBIT";
  LedgerAdjustmentType2["CORRECTION"] = "CORRECTION";
  LedgerAdjustmentType2["CHANNEL_FEE"] = "CHANNEL_FEE";
  LedgerAdjustmentType2["OVERAGE"] = "OVERAGE";
  LedgerAdjustmentType2["REFUND"] = "REFUND";
  return LedgerAdjustmentType2;
})(LedgerAdjustmentType || {});
var ChannelType = /* @__PURE__ */ ((ChannelType2) => {
  ChannelType2["SYSTEM_POOL"] = "SYSTEM_POOL";
  ChannelType2["MY_CHANNEL"] = "MY_CHANNEL";
  return ChannelType2;
})(ChannelType || {});
var PaymentProvider = /* @__PURE__ */ ((PaymentProvider2) => {
  PaymentProvider2["SQUAD"] = "SQUAD";
  PaymentProvider2["SYSTEM"] = "SYSTEM";
  return PaymentProvider2;
})(PaymentProvider || {});
var EventType = /* @__PURE__ */ ((EventType2) => {
  EventType2["DELIVERY_ASSIGNED"] = "DELIVERY_ASSIGNED";
  EventType2["DELIVERY_UPDATED"] = "DELIVERY_UPDATED";
  EventType2["DELIVERY_CREATED"] = "DELIVERY_CREATED";
  EventType2["DELIVERY_STATUS_CHANGED"] = "DELIVERY_STATUS_CHANGED";
  EventType2["DELIVERY_DELETED"] = "DELIVERY_DELETED";
  EventType2["RIDER_LOCATION_UPDATED"] = "RIDER_LOCATION_UPDATED";
  EventType2["RIDER_ACCEPTED"] = "RIDER_ACCEPTED";
  EventType2["RIDER_CREATED"] = "RIDER_CREATED";
  EventType2["RIDER_UPDATED"] = "RIDER_UPDATED";
  EventType2["RIDER_STATUS_CHANGED"] = "RIDER_STATUS_CHANGED";
  EventType2["RIDER_DELETED"] = "RIDER_DELETED";
  EventType2["RIDER_DOCUMENTS_VERIFIED"] = "RIDER_DOCUMENTS_VERIFIED";
  EventType2["RIDER_DOCUMENTS_REJECTED"] = "RIDER_DOCUMENTS_REJECTED";
  EventType2["CHANNEL_SETUP"] = "CHANNEL_SETUP";
  EventType2["CHANNEL_ACTIVATED"] = "CHANNEL_ACTIVATED";
  EventType2["CHANNEL_DEACTIVATED"] = "CHANNEL_DEACTIVATED";
  EventType2["CHANNEL_REJECTED"] = "CHANNEL_REJECTED";
  EventType2["CHANNEL_REMOVED"] = "CHANNEL_REMOVED";
  EventType2["SUBSCRIPTION_STATUS_CHANGED"] = "SUBSCRIPTION_STATUS_CHANGED";
  EventType2["DISPATCHER_CREATED"] = "DISPATCHER_CREATED";
  EventType2["DISPATCHER_UPDATED"] = "DISPATCHER_UPDATED";
  EventType2["DISPATCHER_STATUS_CHANGED"] = "DISPATCHER_STATUS_CHANGED";
  EventType2["DISPATCHER_DELETED"] = "DISPATCHER_DELETED";
  EventType2["AI_EXECUTION"] = "AI_EXECUTION";
  EventType2["SECURITY_INCIDENT"] = "SECURITY_INCIDENT";
  EventType2["ADMIN_PROOF_READ"] = "ADMIN_PROOF_READ";
  EventType2["ADMIN_DOCUMENT_READ"] = "ADMIN_DOCUMENT_READ";
  EventType2["COMPANY_ACTIVATED"] = "COMPANY_ACTIVATED";
  EventType2["COMPANY_DEACTIVATED"] = "COMPANY_DEACTIVATED";
  EventType2["COMPANY_TIER_CHANGED"] = "COMPANY_TIER_CHANGED";
  EventType2["COMPANY_VERIFIED"] = "COMPANY_VERIFIED";
  EventType2["COMPANY_VERIFICATION_REJECTED"] = "COMPANY_VERIFICATION_REJECTED";
  EventType2["USER_PURGED"] = "USER_PURGED";
  EventType2["CANCELLED_PAYMENT_TIMEOUT"] = "CANCELLED_PAYMENT_TIMEOUT";
  EventType2["DOWNGRADE"] = "DOWNGRADE";
  EventType2["MESSAGE_DELETED"] = "MESSAGE_DELETED";
  EventType2["LEDGER_ADJUSTED"] = "LEDGER_ADJUSTED";
  EventType2["PAYMENT_UNMAPPED"] = "PAYMENT_UNMAPPED";
  return EventType2;
})(EventType || {});
var SubscriptionEventType = /* @__PURE__ */ ((SubscriptionEventType2) => {
  SubscriptionEventType2["CREATED"] = "CREATED";
  SubscriptionEventType2["UPDATED"] = "UPDATED";
  SubscriptionEventType2["DELETED"] = "DELETED";
  SubscriptionEventType2["ASSIGNED"] = "ASSIGNED";
  SubscriptionEventType2["STATUS_CHANGED"] = "STATUS_CHANGED";
  SubscriptionEventType2["UNASSIGNED"] = "UNASSIGNED";
  return SubscriptionEventType2;
})(SubscriptionEventType || {});
var UserAuditAction = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  PROFILE_UPDATE: "PROFILE_UPDATE",
  DEACTIVATED: "DEACTIVATED"
};
var MessageStatus = /* @__PURE__ */ ((MessageStatus2) => {
  MessageStatus2["SENT"] = "SENT";
  MessageStatus2["DELIVERED"] = "DELIVERED";
  MessageStatus2["READ"] = "READ";
  MessageStatus2["FAILED"] = "FAILED";
  return MessageStatus2;
})(MessageStatus || {});
var MESSAGE_STATUS_RANK = {
  ["SENT" /* SENT */]: 1,
  ["DELIVERED" /* DELIVERED */]: 2,
  ["READ" /* READ */]: 3,
  ["FAILED" /* FAILED */]: 4
};
var EscalationStatus = /* @__PURE__ */ ((EscalationStatus2) => {
  EscalationStatus2["OPEN"] = "OPEN";
  EscalationStatus2["RESOLVED"] = "RESOLVED";
  EscalationStatus2["TAKEN_OVER"] = "TAKEN_OVER";
  return EscalationStatus2;
})(EscalationStatus || {});
var EscalatedTo = /* @__PURE__ */ ((EscalatedTo2) => {
  EscalatedTo2["COMPANY"] = "COMPANY";
  EscalatedTo2["ADMIN"] = "ADMIN";
  EscalatedTo2["DISPATCHER"] = "DISPATCHER";
  return EscalatedTo2;
})(EscalatedTo || {});
var SenderType = /* @__PURE__ */ ((SenderType2) => {
  SenderType2["CUSTOMER"] = "CUSTOMER";
  SenderType2["AGENT"] = "AGENT";
  SenderType2["DISPATCHER"] = "DISPATCHER";
  SenderType2["ADMIN"] = "ADMIN";
  SenderType2["SYSTEM"] = "SYSTEM";
  return SenderType2;
})(SenderType || {});
var SecurityEventType = {
  RATE_LIMIT: "RATE_LIMIT",
  MALICIOUS_REQUEST: "MALICIOUS_REQUEST",
  BRUTE_FORCE: "BRUTE_FORCE"
};
var SecuritySeverity = /* @__PURE__ */ ((SecuritySeverity3) => {
  SecuritySeverity3["LOW"] = "LOW";
  SecuritySeverity3["MEDIUM"] = "MEDIUM";
  SecuritySeverity3["HIGH"] = "HIGH";
  SecuritySeverity3["CRITICAL"] = "CRITICAL";
  return SecuritySeverity3;
})(SecuritySeverity || {});
var ErrorCode = /* @__PURE__ */ ((ErrorCode2) => {
  ErrorCode2["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
  ErrorCode2["UNAUTHORIZED"] = "UNAUTHORIZED";
  ErrorCode2["FORBIDDEN"] = "FORBIDDEN";
  ErrorCode2["NOT_FOUND"] = "NOT_FOUND";
  ErrorCode2["VALIDATION_ERROR"] = "VALIDATION_ERROR";
  ErrorCode2["TOO_MANY_ATTEMPTS"] = "TOO_MANY_ATTEMPTS";
  ErrorCode2["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
  ErrorCode2["BULK_DELIVERY_CREATION"] = "BULK_DELIVERY_CREATION";
  ErrorCode2["OPERATIONAL_AVAILABILITY"] = "OPERATIONAL_AVAILABILITY";
  ErrorCode2["CHAT_PROCESSOR_HYDRATION"] = "CHAT_PROCESSOR_HYDRATION";
  ErrorCode2["CHAT_PROCESSOR_INFERENCE"] = "CHAT_PROCESSOR_INFERENCE";
  ErrorCode2["CHAT_PROCESSOR_PIPELINE"] = "CHAT_PROCESSOR_PIPELINE";
  ErrorCode2["PROVIDER_CONFIG_LOAD"] = "PROVIDER_CONFIG_LOAD";
  ErrorCode2["PAYMENT_POST_PROCESSING"] = "PAYMENT_POST_PROCESSING";
  ErrorCode2["LLM_FAILOVER"] = "LLM_FAILOVER";
  ErrorCode2["INTER_STATE_DELIVERY"] = "INTER_STATE_DELIVERY";
  ErrorCode2["COMPANY_CLOSED"] = "COMPANY_CLOSED";
  ErrorCode2["COMPANY_NOT_OPEN_YET"] = "COMPANY_NOT_OPEN_YET";
  ErrorCode2["COMPANY_NOT_OPERATING_TODAY"] = "COMPANY_NOT_OPERATING_TODAY";
  ErrorCode2["TIER_LIMIT_EXCEEDED"] = "TIER_LIMIT_EXCEEDED";
  ErrorCode2["NO_DELIVERIES_PROVIDED"] = "NO_DELIVERIES_PROVIDED";
  ErrorCode2["INVALID_ACTOR"] = "INVALID_ACTOR";
  ErrorCode2["CHANNEL_PLATFORM_ID_CONFLICT"] = "CHANNEL_PLATFORM_ID_CONFLICT";
  ErrorCode2["CHANNEL_ACTIVATION_FAILED"] = "CHANNEL_ACTIVATION_FAILED";
  ErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
  ErrorCode2["INVALID"] = "INVALID";
  ErrorCode2["PIN_REQUIRED"] = "PIN_REQUIRED";
  ErrorCode2["UNKNOWN"] = "UNKNOWN";
  return ErrorCode2;
})(ErrorCode || {});
var JobType = /* @__PURE__ */ ((JobType2) => {
  JobType2["DELIVERY_NOTIFICATION"] = "delivery-notification";
  JobType2["SQUAD_WEBHOOK"] = "squad-webhook";
  JobType2["EXPORT"] = "export";
  JobType2["AI_BATCH"] = "ai:batch";
  return JobType2;
})(JobType || {});
var SystemStatus = /* @__PURE__ */ ((SystemStatus2) => {
  SystemStatus2["UP"] = "UP";
  SystemStatus2["DOWN"] = "DOWN";
  SystemStatus2["DEGRADED"] = "DEGRADED";
  return SystemStatus2;
})(SystemStatus || {});
var LlmRole = /* @__PURE__ */ ((LlmRole2) => {
  LlmRole2["USER"] = "user";
  LlmRole2["ASSISTANT"] = "assistant";
  LlmRole2["SYSTEM"] = "system";
  return LlmRole2;
})(LlmRole || {});
var ProviderRole = /* @__PURE__ */ ((ProviderRole2) => {
  ProviderRole2["INTERPRET"] = "interpret";
  ProviderRole2["SYNTHESIZE"] = "synthesize";
  return ProviderRole2;
})(ProviderRole || {});
var ProviderCapability = /* @__PURE__ */ ((ProviderCapability2) => {
  ProviderCapability2["JSON"] = "json";
  ProviderCapability2["TOOLS"] = "tools";
  ProviderCapability2["VISION"] = "vision";
  return ProviderCapability2;
})(ProviderCapability || {});
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2["DEBUG"] = "debug";
  LogLevel2["INFO"] = "info";
  LogLevel2["WARN"] = "warn";
  LogLevel2["ERROR"] = "error";
  LogLevel2["SILENT"] = "silent";
  return LogLevel2;
})(LogLevel || {});
var ApiTag = /* @__PURE__ */ ((ApiTag2) => {
  ApiTag2["TRACKING"] = "Tracking";
  ApiTag2["AUTH"] = "Auth";
  ApiTag2["ADMIN"] = "Admin";
  ApiTag2["GRAPHQL"] = "GraphQL";
  ApiTag2["SYSTEM"] = "System";
  return ApiTag2;
})(ApiTag || {});
var SseEventType = /* @__PURE__ */ ((SseEventType2) => {
  SseEventType2["CONNECTED"] = "connected";
  SseEventType2["DELIVERY"] = "delivery";
  SseEventType2["RIDER"] = "rider";
  SseEventType2["MESSAGE"] = "message";
  SseEventType2["COMPANY"] = "company";
  SseEventType2["RIDER_LOCATION"] = "rider-location";
  SseEventType2["TYPING"] = "typing";
  return SseEventType2;
})(SseEventType || {});
var JwtTokenType = /* @__PURE__ */ ((JwtTokenType2) => {
  JwtTokenType2["ACCESS"] = "access";
  JwtTokenType2["REFRESH"] = "refresh";
  return JwtTokenType2;
})(JwtTokenType || {});
var DevicePlatform = /* @__PURE__ */ ((DevicePlatform2) => {
  DevicePlatform2["ANDROID"] = "ANDROID";
  DevicePlatform2["IOS"] = "IOS";
  DevicePlatform2["WEB"] = "WEB";
  return DevicePlatform2;
})(DevicePlatform || {});
var AuditActorType = /* @__PURE__ */ ((AuditActorType2) => {
  AuditActorType2["USER"] = "USER";
  AuditActorType2["SYSTEM"] = "SYSTEM";
  AuditActorType2["ANONYMOUS"] = "ANONYMOUS";
  return AuditActorType2;
})(AuditActorType || {});
var ContactCategory = /* @__PURE__ */ ((ContactCategory2) => {
  ContactCategory2["PARTNERSHIP"] = "Become a Partner";
  ContactCategory2["BUSINESS"] = "For Business";
  ContactCategory2["SUPPORT"] = "Support";
  ContactCategory2["TRACKING_INQUIRY"] = "Tracking Inquiry";
  ContactCategory2["FEEDBACK"] = "Feedback";
  return ContactCategory2;
})(ContactCategory || {});
var IdType = /* @__PURE__ */ ((IdType2) => {
  IdType2["NIN"] = "NIN";
  IdType2["DRIVER_LICENSE"] = "DRIVER_LICENSE";
  IdType2["PASSPORT"] = "PASSPORT";
  return IdType2;
})(IdType || {});
var ConversationHandlerType = /* @__PURE__ */ ((ConversationHandlerType3) => {
  ConversationHandlerType3["AI"] = "AI";
  ConversationHandlerType3["DISPATCHER"] = "DISPATCHER";
  ConversationHandlerType3["ADMIN"] = "ADMIN";
  return ConversationHandlerType3;
})(ConversationHandlerType || {});
var ExportDataType = /* @__PURE__ */ ((ExportDataType2) => {
  ExportDataType2["DELIVERIES"] = "DELIVERIES";
  ExportDataType2["BILLING"] = "BILLING";
  ExportDataType2["CHAT"] = "CHAT";
  return ExportDataType2;
})(ExportDataType || {});
var ExportReason = /* @__PURE__ */ ((ExportReason2) => {
  ExportReason2["QUEUED"] = "QUEUED";
  ExportReason2["DUPLICATE"] = "DUPLICATE";
  ExportReason2["QUOTA_EXCEEDED"] = "QUOTA_EXCEEDED";
  return ExportReason2;
})(ExportReason || {});
var FcmNotificationType = /* @__PURE__ */ ((FcmNotificationType2) => {
  FcmNotificationType2["SUBSCRIPTION_CANCELLED"] = "SUBSCRIPTION_CANCELLED";
  FcmNotificationType2["DELIVERY_ASSIGNED"] = "DELIVERY_ASSIGNED";
  FcmNotificationType2["COMPANY_STATUS_CHANGED"] = "COMPANY_STATUS_CHANGED";
  FcmNotificationType2["SETTLEMENT_FAILED"] = "SETTLEMENT_FAILED";
  FcmNotificationType2["SETTLEMENT_REVERSAL"] = "SETTLEMENT_REVERSAL";
  FcmNotificationType2["HUMAN_REQUEST"] = "HUMAN_REQUEST";
  FcmNotificationType2["DELIVERY_ANOMALY"] = "DELIVERY_ANOMALY";
  FcmNotificationType2["RAPID_STATUS_CHANGES"] = "RAPID_STATUS_CHANGES";
  FcmNotificationType2["RIDER_SILENT_BAN"] = "RIDER_SILENT_BAN";
  FcmNotificationType2["SECURITY_ALERT"] = "SECURITY_ALERT";
  return FcmNotificationType2;
})(FcmNotificationType || {});
var DeliverySyncScope = /* @__PURE__ */ ((DeliverySyncScope2) => {
  DeliverySyncScope2["RIDER"] = "RIDER";
  DeliverySyncScope2["COMPANY"] = "COMPANY";
  return DeliverySyncScope2;
})(DeliverySyncScope || {});
var AdminEscalationAction = /* @__PURE__ */ ((AdminEscalationAction2) => {
  AdminEscalationAction2["TAKE_OVER"] = "TAKE_OVER";
  AdminEscalationAction2["RESOLVE"] = "RESOLVE";
  return AdminEscalationAction2;
})(AdminEscalationAction || {});
var AdminDeliveryAction = /* @__PURE__ */ ((AdminDeliveryAction2) => {
  AdminDeliveryAction2["ASSIGN"] = "ASSIGN";
  AdminDeliveryAction2["UPDATE"] = "UPDATE";
  AdminDeliveryAction2["UPDATE_STATUS"] = "UPDATE_STATUS";
  return AdminDeliveryAction2;
})(AdminDeliveryAction || {});
var ConversationScope = /* @__PURE__ */ ((ConversationScope2) => {
  ConversationScope2["ALL"] = "ALL";
  ConversationScope2["COMPANY"] = "COMPANY";
  ConversationScope2["SYSTEM_ONLY"] = "SYSTEM_ONLY";
  return ConversationScope2;
})(ConversationScope || {});
var NOTIFICATION_PRIORITY = "URGENT";
var DeliveryExpiryReason = {
  STALE_PENDING_DELIVERY: "STALE_PENDING_DELIVERY",
  SCHEDULED_WINDOW_MISSED: "SCHEDULED_WINDOW_MISSED",
  RIDER_SILENT: "RIDER_SILENT",
  IN_TRANSIT_STALL: "IN_TRANSIT_STALL"
};
var DayOfWeek = /* @__PURE__ */ ((DayOfWeek2) => {
  DayOfWeek2["MONDAY"] = "Monday";
  DayOfWeek2["TUESDAY"] = "Tuesday";
  DayOfWeek2["WEDNESDAY"] = "Wednesday";
  DayOfWeek2["THURSDAY"] = "Thursday";
  DayOfWeek2["FRIDAY"] = "Friday";
  DayOfWeek2["SATURDAY"] = "Saturday";
  DayOfWeek2["SUNDAY"] = "Sunday";
  return DayOfWeek2;
})(DayOfWeek || {});
var MetricDomain = /* @__PURE__ */ ((MetricDomain2) => {
  MetricDomain2["DELIVERIES"] = "DELIVERIES";
  MetricDomain2["CONVERSATIONS"] = "CONVERSATIONS";
  MetricDomain2["RIDERS"] = "RIDERS";
  MetricDomain2["REVENUE"] = "REVENUE";
  return MetricDomain2;
})(MetricDomain || {});
var MetricGranularity = /* @__PURE__ */ ((MetricGranularity2) => {
  MetricGranularity2["DAY"] = "DAY";
  MetricGranularity2["WEEK"] = "WEEK";
  MetricGranularity2["MONTH"] = "MONTH";
  MetricGranularity2["LIFETIME"] = "LIFETIME";
  return MetricGranularity2;
})(MetricGranularity || {});
var ALL_DAYS = Object.values(DayOfWeek);
var LEAD_CATEGORIES = /* @__PURE__ */ new Set([
  "Become a Partner" /* PARTNERSHIP */,
  "For Business" /* BUSINESS */
]);
var CAC_EVIDENCE_STATUS = {
  FOUND: "FOUND",
  INACTIVE: "INACTIVE",
  NOT_FOUND: "NOT_FOUND",
  ERROR: "ERROR"
};
function safeEnumValue(enumObj, value) {
  const values = Object.values(enumObj);
  return values.includes(value) ? value : void 0;
}

// src/shared/utils/formatters.ts
function splitEnum(value) {
  return value.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}
function formatDeliveryStatus(status) {
  return formatEnumToTitleCase(status) || "Unknown";
}
function formatEnumToTitleCase(value) {
  if (!value) return "";
  return splitEnum(value);
}

// src/shared/enums/enum-catalog.ts
function buildValues(enumObj) {
  return Object.values(enumObj).map((name) => ({
    name,
    label: formatEnumToTitleCase(name)
  }));
}
var ENUM_CATALOG = {
  exportDataTypes: buildValues(ExportDataType),
  vehicleTypes: buildValues(VehicleType),
  deliveryStatuses: buildValues(DeliveryStatus),
  riderStatuses: buildValues(RiderStatus),
  approvalStatuses: buildValues(ApprovalStatus),
  subscriptionTiers: buildValues(SubscriptionTier),
  subscriptionStatuses: buildValues(SubscriptionStatus),
  channelPlatforms: buildValues(ChannelPlatform),
  channelTypes: buildValues(ChannelType),
  paymentMethods: buildValues(PaymentMethod),
  transactionStatuses: buildValues(TransactionStatus),
  metricDomains: buildValues(MetricDomain),
  metricGranularities: buildValues(MetricGranularity)
};

// src/shared/types/metadata.ts
import { z } from "zod";
var str = z.string();
var strNullish = z.string().nullish();
var num = z.number();
var numNullish = z.number().nullish();
var boolNullish = z.boolean().nullish();
var rec = z.record(z.string(), z.unknown());
var cacEvidenceShape = z.object({
  status: z.string(),
  registeredName: z.string().nullish(),
  entityType: z.string().nullish(),
  cacStatus: z.string().nullish(),
  registrationDate: z.string().nullish(),
  checkedAt: z.string(),
  nextCheckAt: z.string().nullish(),
  attempts: z.number()
});
var credentialsShape = z.object({
  accessToken: z.string(),
  wabaId: z.string(),
  phoneNumberId: z.string(),
  tokenExpiresAt: z.number().nullish()
});
var executedActionsShape = z.array(
  z.union([
    z.string(),
    z.object({ type: z.string(), success: z.boolean().nullish(), message: z.string().nullish() })
  ])
);
var METADATA_KEYS = {
  // ── DELIVERY ──────────────────────────────────────────────────────────────
  pickupPlaceId: { scope: "DELIVERY", shape: strNullish, required: false },
  dropOffPlaceId: { scope: "DELIVERY", shape: strNullish, required: false },
  dropOffState: { scope: "DELIVERY", shape: strNullish, required: false },
  proofOfDeliveryImagePath: { scope: "DELIVERY", shape: strNullish, required: false },
  fulfilledByCompanyId: { scope: "DELIVERY", shape: strNullish, required: false },
  failReason: { scope: "DELIVERY", shape: strNullish, required: false },
  failedAt: { scope: ["DELIVERY", "TRANSACTION"], shape: strNullish, required: false },
  instructions: { scope: "DELIVERY", shape: strNullish, required: false },
  scheduledDayOffset: { scope: "DELIVERY", shape: numNullish, required: false },
  scheduledTime: { scope: "DELIVERY", shape: strNullish, required: false },
  paid: { scope: "DELIVERY", shape: boolNullish, required: false },
  paidAt: { scope: "DELIVERY", shape: strNullish, required: false },
  paidVia: {
    scope: "DELIVERY",
    shape: z.union([z.nativeEnum(PaymentProvider), z.literal("BANK_TRANSFER"), z.literal("CASH")]).nullish(),
    required: false
  },
  paymentRequired: { scope: "DELIVERY", shape: boolNullish, required: false },
  paymentStatus: {
    scope: "DELIVERY",
    shape: z.nativeEnum(PaymentStatus).nullish(),
    required: false
  },
  paymentLinkGenerated: { scope: "DELIVERY", shape: boolNullish, required: false },
  paymentLinkGeneratedAt: { scope: "DELIVERY", shape: strNullish, required: false },
  paymentSessionId: { scope: "DELIVERY", shape: strNullish, required: false },
  cancelReason: { scope: "DELIVERY", shape: strNullish, required: false },
  cancelledAt: { scope: "DELIVERY", shape: strNullish, required: false },
  proofPromotionFailed: { scope: "DELIVERY", shape: boolNullish, required: false },
  // ── CONVERSATION ──────────────────────────────────────────────────────────
  escalatedTo: { scope: "CONVERSATION", shape: strNullish, required: false },
  escalationStatus: { scope: "CONVERSATION", shape: strNullish, required: false },
  escalatedBy: { scope: "CONVERSATION", shape: strNullish, required: false },
  escalatedAt: { scope: "CONVERSATION", shape: strNullish, required: false },
  resolvedAt: { scope: "CONVERSATION", shape: strNullish, required: false },
  resolution: { scope: "CONVERSATION", shape: rec.nullish(), required: false },
  timezone: { scope: "CONVERSATION", shape: strNullish, required: false },
  aiPausedUntil: { scope: "CONVERSATION", shape: strNullish, required: false },
  aiPermanentlyDisabled: { scope: "CONVERSATION", shape: boolNullish, required: false },
  // ── COMPANY ───────────────────────────────────────────────────────────────
  logoUrl: { scope: "COMPANY", shape: strNullish, required: false },
  cac: { scope: "COMPANY", shape: strNullish, required: false },
  nipostLicenseNumber: { scope: "COMPANY", shape: strNullish, required: false },
  address: { scope: "COMPANY", shape: strNullish, required: false },
  placeId: { scope: "COMPANY", shape: strNullish, required: false },
  verificationNote: { scope: ["RIDER", "COMPANY"], shape: strNullish, required: false },
  cacVerification: { scope: "COMPANY", shape: cacEvidenceShape.nullish(), required: false },
  // ── CHANNEL (company channel metadata) ────────────────────────────────────
  displayPhoneNumber: { scope: ["CHANNEL", "MESSAGE"], shape: strNullish, required: false },
  credentials: { scope: "CHANNEL", shape: credentialsShape.nullish(), required: false },
  webhookUrl: { scope: "CHANNEL", shape: strNullish, required: false },
  webhookVerified: { scope: "CHANNEL", shape: boolNullish, required: false },
  webhookVerifiedAt: { scope: "CHANNEL", shape: strNullish, required: false },
  botEnabled: { scope: "CHANNEL", shape: boolNullish, required: false },
  aiDisabled: { scope: "CHANNEL", shape: boolNullish, required: false },
  rejectionReason: { scope: "CHANNEL", shape: strNullish, required: false },
  rejectedAt: { scope: "CHANNEL", shape: strNullish, required: false },
  deactivatedReason: { scope: "CHANNEL", shape: strNullish, required: false },
  // phoneNumberId also lives in CHAT message metadata.
  phoneNumberId: { scope: ["CHANNEL", "MESSAGE"], shape: strNullish, required: false },
  // ── TRANSACTION ───────────────────────────────────────────────────────────
  userId: { scope: "TRANSACTION", shape: strNullish, required: false },
  platformId: { scope: "TRANSACTION", shape: strNullish, required: false },
  initializedAt: { scope: "TRANSACTION", shape: strNullish, required: false },
  deliveryCount: { scope: ["TRANSACTION", "LEDGER"], shape: numNullish, required: false },
  channelFeePerDelivery: { scope: "TRANSACTION", shape: numNullish, required: false },
  narration: { scope: "TRANSACTION", shape: strNullish, required: false },
  squadResponse: { scope: "TRANSACTION", shape: rec.nullish(), required: false },
  ledgerRestored: { scope: "TRANSACTION", shape: boolNullish, required: false },
  error: { scope: "TRANSACTION", shape: str.nullish(), required: false },
  reconciledAt: { scope: "TRANSACTION", shape: strNullish, required: false },
  checkoutUrl: { scope: "TRANSACTION", shape: strNullish, required: false },
  fundWallet: { scope: "TRANSACTION", shape: boolNullish, required: false },
  reason: { scope: "TRANSACTION", shape: strNullish, required: false },
  accountNumber: { scope: "TRANSACTION", shape: strNullish, required: false },
  bankCode: { scope: "TRANSACTION", shape: strNullish, required: false },
  originalReferences: { scope: "TRANSACTION", shape: z.array(str).nullish(), required: false },
  trackingIds: { scope: "TRANSACTION", shape: z.array(str).nullish(), required: false },
  requiresManualReconciliation: { scope: "TRANSACTION", shape: boolNullish, required: false },
  receiptSessionId: { scope: "TRANSACTION", shape: strNullish, required: false },
  isPendingReceiptClaim: { scope: "TRANSACTION", shape: boolNullish, required: false },
  webhookPayload: { scope: "TRANSACTION", shape: rec.nullish(), required: false },
  confirmedAt: { scope: "TRANSACTION", shape: strNullish, required: false },
  expiredAt: { scope: "TRANSACTION", shape: strNullish, required: false },
  expiredReason: { scope: "TRANSACTION", shape: strNullish, required: false },
  isPartialPaymentContinuation: { scope: "TRANSACTION", shape: boolNullish, required: false },
  originalReference: { scope: ["TRANSACTION", "LEDGER"], shape: strNullish, required: false },
  deliveryId: { scope: "TRANSACTION", shape: strNullish, required: false },
  eventSource: { scope: "TRANSACTION", shape: strNullish, required: false },
  rolledBackAt: { scope: "TRANSACTION", shape: strNullish, required: false },
  // ── MESSAGE (chat message metadata) ───────────────────────────────────────
  latitude: { scope: "MESSAGE", shape: numNullish, required: false },
  longitude: { scope: "MESSAGE", shape: numNullish, required: false },
  parentId: { scope: "MESSAGE", shape: strNullish, required: false },
  staleParentId: { scope: "MESSAGE", shape: strNullish, required: false },
  pushName: { scope: "MESSAGE", shape: strNullish, required: false },
  senderName: { scope: "MESSAGE", shape: strNullish, required: false },
  mimeType: { scope: "MESSAGE", shape: strNullish, required: false },
  mediaId: { scope: "MESSAGE", shape: strNullish, required: false },
  visionExtraction: { scope: "MESSAGE", shape: strNullish, required: false },
  mediaUrl: { scope: "MESSAGE", shape: strNullish, required: false },
  displayPhoneNumberId: { scope: "MESSAGE", shape: strNullish, required: false },
  executedActions: { scope: "MESSAGE", shape: executedActionsShape.nullish(), required: false },
  editedAt: { scope: "MESSAGE", shape: strNullish, required: false },
  editCount: { scope: "MESSAGE", shape: numNullish, required: false },
  // ── RIDER ─────────────────────────────────────────────────────────────────
  idType: { scope: "RIDER", shape: strNullish, required: false },
  idNumber: { scope: "RIDER", shape: strNullish, required: false },
  nin: { scope: "RIDER", shape: strNullish, required: false },
  driverLicense: { scope: "RIDER", shape: strNullish, required: false },
  passportNumber: { scope: "RIDER", shape: strNullish, required: false },
  passportPhotoUrl: { scope: "RIDER", shape: strNullish, required: false },
  vehicleVin: { scope: "RIDER", shape: strNullish, required: false },
  vehiclePermitUrl: { scope: "RIDER", shape: strNullish, required: false },
  photoUrl: { scope: "RIDER", shape: strNullish, required: false },
  // NOTE: `phoneNumber` here is the RIDER-scope key; distinct from `phoneNumberId`.
  phoneNumber: { scope: "RIDER", shape: strNullish, required: false },
  registrationNumber: { scope: "RIDER", shape: strNullish, required: false },
  riderCardNumber: { scope: "RIDER", shape: strNullish, required: false },
  currentState: { scope: "RIDER", shape: strNullish, required: false },
  batteryLevel: { scope: "RIDER", shape: numNullish, required: false },
  // ── LEDGER (ledger transaction metadata) ──────────────────────────────────
  type: { scope: "LEDGER", shape: strNullish, required: false },
  feePerDelivery: { scope: "LEDGER", shape: num, required: true },
  totalFee: { scope: "LEDGER", shape: num, required: true }
};
var REQUIRED_LEDGER_KEYS = [
  "feePerDelivery",
  "deliveryCount",
  "totalFee"
];
function scopeMatches(scope, domain) {
  return Array.isArray(scope) ? scope.includes(domain) : scope === domain;
}
function buildMetadata(domain, entries) {
  const out = {};
  for (const [key, value] of Object.entries(entries)) {
    const spec = METADATA_KEYS[key];
    if (!spec) {
      throw new Error(`Metadata key "${key}" is not registered for domain "${domain}"`);
    }
    if (!scopeMatches(spec.scope, domain)) {
      throw new Error(`Metadata key "${key}" is not valid for domain "${domain}"`);
    }
    if (value === void 0) continue;
    const parsed = spec.shape.safeParse(value);
    if (!parsed.success) {
      throw new Error(
        `Metadata key "${key}" failed validation for domain "${domain}": ${parsed.error.message}`
      );
    }
    out[key] = value;
  }
  const required = domain === "LEDGER" ? REQUIRED_LEDGER_KEYS : Object.keys(METADATA_KEYS).filter((k) => {
    const s = METADATA_KEYS[k];
    return s.required && scopeMatches(s.scope, domain);
  });
  for (const key of required) {
    if (!(key in entries) || entries[key] === void 0) {
      throw new Error(`Metadata key "${key}" is required for domain "${domain}"`);
    }
  }
  return out;
}
function validateMetadata(domain, value) {
  if (value === null || value === void 0) return;
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Metadata payload for domain "${domain}" must be a plain object`);
  }
  const entries = value;
  if (Object.keys(entries).length === 0) return;
  buildMetadata(domain, entries);
}

// src/shared/config/brand.config.ts
var BRAND_DEFAULTS = {
  brandName: "Logistix",
  trackingPrefix: "LGX-"
};
function buildBrandConfig(overrides) {
  return {
    brandName: overrides?.brandName ?? process.env.BRAND_NAME ?? BRAND_DEFAULTS.brandName,
    trackingPrefix: overrides?.trackingPrefix ?? process.env.BRAND_TRACKING_PREFIX ?? BRAND_DEFAULTS.trackingPrefix
  };
}
var _brand = null;
function getBrandConfig() {
  if (!_brand) _brand = buildBrandConfig();
  return _brand;
}
var BRAND = new Proxy({}, {
  get(_, prop) {
    return getBrandConfig()[prop];
  }
});

// src/shared/config/system.config.ts
var DELETED_USER_SENTINEL = "DELETED_USER";
var SYSTEM_ACTOR_ID = "system";
var ADMIN_ACTOR_ID = "admin";
var DEFAULT_WORKING_HOURS = {
  ["Monday" /* MONDAY */]: { start: "07:00", close: "19:00" },
  ["Tuesday" /* TUESDAY */]: { start: "07:00", close: "19:00" },
  ["Wednesday" /* WEDNESDAY */]: { start: "07:00", close: "19:00" },
  ["Thursday" /* THURSDAY */]: { start: "07:00", close: "19:00" },
  ["Friday" /* FRIDAY */]: { start: "07:00", close: "19:00" },
  ["Saturday" /* SATURDAY */]: { start: "07:00", close: "19:00" }
};
function buildSystemConfig(overrides = {}) {
  const emailDomain = overrides.emailDomain ?? "";
  return {
    jwtIssuer: overrides.jwtIssuer ?? "",
    customerBaseUrl: overrides.customerBaseUrl ?? "",
    businessBaseUrl: overrides.businessBaseUrl ?? "",
    emailDomain,
    supportEmail: overrides.supportEmail ?? (emailDomain ? `contact@${emailDomain}` : ""),
    paymentsEmail: overrides.paymentsEmail ?? (emailDomain ? `payments@${emailDomain}` : ""),
    // Default brand name delegates to BrandConfig — a single authoritative
    // source for the brand. Explicit overrides (web's PUBLIC_BRAND_NAME) win.
    brandName: overrides.brandName ?? getBrandConfig().brandName
  };
}
var _brandName = null;
function getBrandName() {
  if (_brandName === null) _brandName = getBrandConfig().brandName;
  return _brandName;
}
var BRAND_NAME = getBrandName();

// src/shared/config/regional.config.ts
var rawRegionalConfig = {
  // Phone dialing code (ITU-T E.164), NOT ISO 3166-1 alpha-2 country code
  defaultCountryCode: "234",
  // ISO 3166-1 alpha-2 country code
  defaultIsoCountryCode: "ng",
  timeZone: "Africa/Lagos",
  currencySymbol: "\u20A6",
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
    "Federal Capital Territory",
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
    "Zamfara"
  ]
};
var REGIONAL_CONFIG = rawRegionalConfig;
var REGIONAL_LOCALE = "en-NG";
var HQ_LOCATION = "Lagos, Nigeria";

// src/shared/config/retention.config.ts
import { z as z2 } from "zod";
var retentionConfigSchema = z2.object({
  accountPurgeRetentionDays: z2.number(),
  companyPurgeRetentionDays: z2.number(),
  lockedCompanyPurgeRetentionDays: z2.number(),
  eventLogRetentionMonths: z2.number()
});
var rawRetentionConfig = {
  accountPurgeRetentionDays: 90,
  // Matches account purge — no reason to keep deactivated companies 2× longer
  companyPurgeRetentionDays: 90,
  lockedCompanyPurgeRetentionDays: 30,
  eventLogRetentionMonths: 12
};
var RETENTION_CONFIG = retentionConfigSchema.parse(rawRetentionConfig);

// src/shared/utils/time.ts
var FIVE_MINUTES_MS = 5 * 6e4;
var FIFTEEN_MINUTES_MS = 15 * 6e4;
var MS_PER_DAY = 24 * 60 * 6e4;
function addDays(from, days) {
  const result = new Date(from.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

// src/shared/config/billing.config.ts
var KOBO_PER_NAIRA = 100;
var DATA_RETENTION = {
  ["STARTER" /* STARTER */]: 1,
  ["PROFESSIONAL" /* PROFESSIONAL */]: 3
};
var CHANNEL_FEES = {
  ["SYSTEM_POOL" /* SYSTEM_POOL */]: 2e4,
  // ₦200 — covers network number + routing + AI
  ["MY_CHANNEL" /* MY_CHANNEL */]: 2e4
  // ₦200 — covers AI only
};
var DEDICATED_TIERS = ["PROFESSIONAL" /* PROFESSIONAL */];
var SUPPORT_SLA = {
  ["STARTER" /* STARTER */]: "Email (48hr SLA)",
  ["PROFESSIONAL" /* PROFESSIONAL */]: "Priority (4hr SLA)"
};
var BILLING_CONFIG = {
  /**
   * Currency to use across the system (single-value — NGN only)
   */
  CURRENCY: "NGN",
  /**
   * Monthly subscription pricing (in Kobo — single currency unit)
   * ₦15,000 = 1_500_000 kobo, ₦30,000 = 3_000_000 kobo.
   */
  PRICING: {
    ["STARTER" /* STARTER */]: 15e5,
    // ₦15,000
    ["PROFESSIONAL" /* PROFESSIONAL */]: 3e6
    // ₦30,000
  },
  /**
   * Billing cycle in days
   */
  BILLING_CYCLE_DAYS: 30,
  /**
   * Days after PAST_DUE before company data is cancelled
   */
  PAST_DUE_CANCEL_DAYS: 14,
  /**
   * Days of free trial for new companies
   */
  TRIAL_DAYS: 14,
  /**
   * Days after CANCELLED before company data is purged
   * References RETENTION_CONFIG as single source of truth.
   */
  PURGE_AFTER_CANCELLED_DAYS: RETENTION_CONFIG.lockedCompanyPurgeRetentionDays,
  /**
   * Payment timeout for unconfirmed payment deliveries (in hours).
   * 10 minutes gives room for webhook delays without leaving users hanging.
   * The daily payment-reconciliation cron is the backstop for edge cases.
   */
  PAYMENT_TIMEOUT_HOURS: 1,
  /**
   * Cross-company pool fulfillment split (in Kobo). Applied at settlement when
   * a pool delivery was fulfilled by a different company's rider:
   * - platformFeeKobo is retained by the platform first,
   * - ownerShareKobo then goes to the delivery's owning company (skipped for
   *   system-owned deliveries, where the platform retains it implicitly),
   * - the fulfilling company receives the remainder.
   */
  POOL_SPLIT_KOBO: {
    platformFeeKobo: 1e4,
    // ₦100
    ownerShareKobo: 5e4
    // ₦500
  },
  /**
   * Number of days after purchase within which a refund may be requested.
   */
  REFUND_WINDOW_DAYS: 14,
  /**
   * Window (ms) within which fundWallet requests with the same company + amount
   * reuse a single PENDING reference so double-submits coalesce into one checkout.
   */
  FUND_IDEMPOTENCY_WINDOW_MS: 5 * 60 * 1e3,
  /**
   * HTTP timeout (ms) for Squad API calls.
   */
  SQUAD_HTTP_TIMEOUT: 3e4,
  /**
   * Retry configuration for failed payments.
   * Retries on specific days after failure (1, 3, 7 days).
   * MAX_ATTEMPTS = total payment attempts (1 initial + 1 retry per INTERVALS_DAYS entry).
   * If all attempts fail, moves to PAST_DUE. After PAST_DUE window, cancels.
   */
  PAYMENT_RETRY: {
    MAX_ATTEMPTS: 4,
    INTERVALS_DAYS: [1, 3, 7]
  }
};
function getSubscriptionPrice(tier) {
  const price = BILLING_CONFIG.PRICING[tier];
  if (price === void 0) throw new Error(`[Billing] Unknown subscription tier: ${tier}`);
  return price;
}
function formatAmount(kobo) {
  const value = kobo / KOBO_PER_NAIRA;
  return `${REGIONAL_CONFIG.currencySymbol}${value.toLocaleString(REGIONAL_LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function isBillableTier(tier) {
  return getSubscriptionPrice(tier) > 0;
}
function shouldBillNow(lastBillingDate, activationDate) {
  const referenceDate = lastBillingDate || activationDate;
  const daysSinceReference = Math.floor((Date.now() - referenceDate.getTime()) / MS_PER_DAY);
  return daysSinceReference >= BILLING_CONFIG.BILLING_CYCLE_DAYS;
}
function shouldRetryPayment(lastBillingDate, retryAttempt) {
  const intervals = BILLING_CONFIG.PAYMENT_RETRY.INTERVALS_DAYS;
  if (retryAttempt >= intervals.length) {
    return false;
  }
  const daysToWait = intervals[retryAttempt] ?? intervals[intervals.length - 1];
  const daysSinceLastAttempt = Math.floor((Date.now() - lastBillingDate.getTime()) / MS_PER_DAY);
  return daysSinceLastAttempt >= daysToWait;
}
function computeAccessLevel(verificationStatus, subscriptionStatus2, periodEnd = null, opts = {}) {
  if (verificationStatus !== "APPROVED" /* APPROVED */) {
    return CompanyAccessLevel.RESTRICTED;
  }
  if (subscriptionStatus2 === "ACTIVE" /* ACTIVE */) {
    return CompanyAccessLevel.FULL;
  }
  if (subscriptionStatus2 === "TRIAL" /* TRIAL */) {
    return CompanyAccessLevel.TRIAL;
  }
  if (subscriptionStatus2 === "PAST_DUE" /* PAST_DUE */) {
    return CompanyAccessLevel.PAST_DUE;
  }
  if (subscriptionStatus2 === "CANCELLING" /* CANCELLING */) {
    const deadline = periodEnd ? new Date(periodEnd).getTime() : 0;
    const live = deadline > Date.now();
    if (!live) return CompanyAccessLevel.RESTRICTED;
    return opts.wasTrial ? CompanyAccessLevel.TRIAL : CompanyAccessLevel.FULL;
  }
  return CompanyAccessLevel.RESTRICTED;
}

// src/shared/config/limits.config.ts
var DEFAULT_MESSAGE_LIMIT = 4096;
var rawLimitsConfig = {
  maxBatchSize: 50,
  // Max actions executed per agent turn (system protection)
  dbBatchSize: 100,
  // Max rows per DB bulk operation for background/flush jobs (executeInBatches)
  userActionConcurrency: 10,
  // Chunk size for user-flow operations (chunkedPromiseAll) to avoid spiking DB connections
  externalApiConcurrency: 10,
  // Capped concurrency for external APIs like Google Maps to avoid rate limits
  maxQueryLimit: 100,
  // Fallback query limit for non-tier-aware services
  syncPageSize: 100,
  // Client sync page size served via clientConfig
  locationDeduplicationRadiusMeters: 200,
  // Drop duplicate location results within this range
  externalApiTimeoutMs: 1e4,
  // Default timeout for external requests (e.g. Maps API)
  maxRiderActiveDeliveries: 5,
  maxSearchQueryLength: 100,
  chunkSize: 100
};
var LIMITS_CONFIG = rawLimitsConfig;
var PAGINATION_CONFIG = {
  /** Default page size for regular API / GraphQL queries. */
  DEFAULT_LIMIT: 20,
  /** Admin-specific page size (admins typically need larger result sets). */
  ADMIN_DEFAULT_LIMIT: 50
};
var TIER_LIMITS = {
  ["STARTER" /* STARTER */]: {
    maxAIDeliveriesPerAction: 20,
    maxBulkDeliveries: 20,
    maxTrackingHistory: 50,
    retentionMonths: DATA_RETENTION["STARTER" /* STARTER */],
    maxDispatchers: 2,
    maxRiders: 20,
    maxDeliveriesPerMonth: 500,
    maxExportsPerDay: 2,
    maxExportsPerMonth: 10
  },
  ["PROFESSIONAL" /* PROFESSIONAL */]: {
    maxAIDeliveriesPerAction: 50,
    maxBulkDeliveries: 100,
    maxTrackingHistory: 100,
    retentionMonths: DATA_RETENTION["PROFESSIONAL" /* PROFESSIONAL */],
    maxDispatchers: 10,
    maxRiders: 100,
    maxDeliveriesPerMonth: 5e3,
    maxExportsPerDay: 5,
    maxExportsPerMonth: 30
  }
};
function getTierLimits(tier) {
  const limits = TIER_LIMITS[tier];
  if (limits === void 0) throw new Error(`[Limits] Unknown subscription tier: ${tier}`);
  return limits;
}

// src/shared/config/delivery.config.ts
var ALLOWED_STATUS_TRANSITIONS = {
  ["PENDING" /* PENDING */]: ["ASSIGNED" /* ASSIGNED */, "CANCELLED" /* CANCELLED */],
  ["ASSIGNED" /* ASSIGNED */]: [
    "IN_TRANSIT" /* IN_TRANSIT */,
    "PENDING" /* PENDING */,
    "CANCELLED" /* CANCELLED */
  ],
  ["IN_TRANSIT" /* IN_TRANSIT */]: ["DELIVERED" /* DELIVERED */, "CANCELLED" /* CANCELLED */],
  ["DELIVERED" /* DELIVERED */]: [],
  ["FAILED" /* FAILED */]: [],
  ["CANCELLED" /* CANCELLED */]: []
};

// src/shared/config/pricing.config.ts
var DEFAULT_PRICING_SCHEMES = [
  { vehicleType: "BIKE" /* BIKE */, baseFare: 2e4, perKmRate: 2e4, minFare: 2e4 }
];

// src/shared/config/client.config.ts
var rawClientConfig = {
  pollIntervals: {
    // Normal: lazy background sync cadence. SSE carries live updates, so a
    // coarse 60-min poll is the safety net, not the live path.
    normalMs: 36e5,
    // 60 min — business web dispatcher sync cadence
    // Degraded: FASTER retry when syncs fail (SSE down / repeated errors), so
    // the client recovers sooner once the connection is back.
    degradedMs: 9e5
    // 15 min — failure-recovery retry cadence
  }
};
var CLIENT_CONFIG = rawClientConfig;

// src/shared/config/export.config.ts
var VALID_DATA_TYPES = [
  "DELIVERIES" /* DELIVERIES */,
  "BILLING" /* BILLING */,
  "CHAT" /* CHAT */
];
var MONTH_REQUIRED_TYPES = /* @__PURE__ */ new Set([
  "DELIVERIES" /* DELIVERIES */,
  "BILLING" /* BILLING */
]);

// src/shared/config/metrics.config.ts
var LIFETIME_BUCKET_START = "1970-01-01";
var METRICS_RETENTION = {
  ["DAY" /* DAY */]: { retainFor: 90, unit: "days", foldTo: "WEEK" /* WEEK */ },
  ["WEEK" /* WEEK */]: { retainFor: 12, unit: "months", foldTo: "MONTH" /* MONTH */ },
  ["MONTH" /* MONTH */]: {
    retainFor: 5 * 12,
    unit: "months",
    foldTo: "LIFETIME" /* LIFETIME */
  },
  ["LIFETIME" /* LIFETIME */]: {
    retainFor: Number.POSITIVE_INFINITY,
    unit: "months",
    foldTo: null
  }
};
var METRICS_FOLD_CHAIN = [
  "DAY" /* DAY */,
  "WEEK" /* WEEK */,
  "MONTH" /* MONTH */
];
var METRIC_DOMAIN_MAPPINGS = [
  {
    domain: "DELIVERIES" /* DELIVERIES */,
    columns: [
      "totalCount",
      "deliveredCount",
      "cancelledCount",
      "failedCount",
      "totalRevenueKobo",
      "avgDeliveryTimeMinutes",
      "channelBreakdown",
      "peakHour",
      "uniqueRidersActive"
    ],
    extraMetricKeys: ["prepaidCount", "payOnDeliveryCount"]
  },
  {
    domain: "CONVERSATIONS" /* CONVERSATIONS */,
    columns: ["totalCount", "channelBreakdown"],
    extraMetricKeys: [
      "activeCount",
      "messagesReceived",
      "messagesSent",
      "escalatedCount",
      "avgFirstResponseMinutes"
    ]
  },
  {
    domain: "RIDERS" /* RIDERS */,
    columns: ["totalCount", "deliveredCount", "uniqueRidersActive"],
    extraMetricKeys: ["approvedCount", "pendingCount", "suspendedCount"]
  },
  {
    domain: "REVENUE" /* REVENUE */,
    columns: ["totalCount", "totalRevenueKobo", "channelBreakdown"],
    extraMetricKeys: ["refundedKobo", "avgTransactionValueKobo"]
  }
];
function granularityForWindowDays(days) {
  if (days <= METRICS_RETENTION["DAY" /* DAY */].retainFor) {
    return "DAY" /* DAY */;
  }
  if (days <= METRICS_RETENTION["WEEK" /* WEEK */].retainFor * 30) {
    return "WEEK" /* WEEK */;
  }
  return "MONTH" /* MONTH */;
}

// src/shared/config/service.config.ts
var FCM_SERVICE_CONFIG = {
  // OAuth access tokens: valid for 1 hour, refreshed 5 minutes early.
  tokenLifetimeMs: 36e5,
  tokenBufferMs: 5 * 6e4,
  tokenExpirySeconds: 3600,
  // JWT `exp` claim in seconds
  // Max messages sent concurrently per batch (`sendBatch`).
  sendChunkSize: 10
};
var QUEUE_SERVICE_CONFIG = {
  // Shared neutral defaults. Backend drains (long-lived poll loops) are bounded
  // by maxJobs + the poll tick — no wall-clock budget is needed there. Worker
  // cron drains MUST pass an explicit timeBudgetMs (SCALING_CONFIG.cronTimeBudgetMs)
  // so an invocation returns within the Cloudflare cron window.
  batchSize: 5,
  defaultMaxRetries: 3,
  // total attempts; the first attempt counts
  // How often the drain loop prunes finished jobs from the queue table.
  pruneIntervalMs: 60 * 60 * 1e3,
  // Terminal rows older than this are deleted by the prune pass.
  pruneTerminalAfterMs: 24 * 60 * 60 * 1e3,
  // PROCESSING jobs with started_at older than this are reset to PENDING.
  retryStalledAfterMs: 3e4,
  // Exponential retry backoff bounds (base * 2^(retry-1), capped at max).
  retryBackoffBaseMs: 1e3,
  retryBackoffMaxMs: 6e4
};

// src/shared/config/security.config.ts
var rawSecurityConfig = {
  rateLimits: {
    global: { max: 1e3, windowMs: 6e4 },
    auth: { max: 15, windowMs: FIFTEEN_MINUTES_MS },
    login: { max: 10, windowMs: FIVE_MINUTES_MS },
    register: { max: 3, windowMs: 36e5 },
    tiers: {
      ["STARTER" /* STARTER */]: { max: 500, windowMs: FIFTEEN_MINUTES_MS },
      ["PROFESSIONAL" /* PROFESSIONAL */]: { max: 2e3, windowMs: FIFTEEN_MINUTES_MS }
    }
  },
  jwt: {
    jwtExpiresIn: "1h",
    jwtRefreshExpiresIn: "30d"
  },
  blocks: {
    temporaryLadderMs: [36e5, 6 * 36e5, 24 * 36e5],
    escalateAfterBlocks: 3,
    escalationWindowMs: 7 * MS_PER_DAY,
    persistentEscalatedMs: 7 * MS_PER_DAY,
    maxPersistentMs: 90 * MS_PER_DAY
  },
  headers: {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "0",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(self)",
    "X-DNS-Prefetch-Control": "off"
  },
  maliciousPatterns: [
    /(?:wp-admin|wordpress|\.env|\.php$|phpmyadmin|admin\.php|config\.php|\.git|\.svn|\.\.|etc\/passwd|proc\/self|windows\/system32|union\s+select|drop\s+table|insert\s+into|delete\s+from|<script|javascript:|onload=|onerror=)/i
  ],
  validation: {
    maxEmailLength: 254,
    maxPasswordLength: 128,
    maxNameLength: 150,
    maxDescriptionLength: 1e3,
    maxPhoneLength: 20,
    maxAddressLength: 300,
    securityPinMinRange: 1e5,
    securityPinMaxRange: 999999
  }
};
var SECURITY_CONFIG = rawSecurityConfig;

// src/shared/config/session.config.ts
var rawSessionConfig = {
  // Max concurrent refresh sessions per user. Covers desktop + phone + one
  // re-login. Users needing more can contact support.
  maxActiveSessions: 3,
  pruneRetentionDays: 30
};
var SESSION_CONFIG = rawSessionConfig;

// src/shared/utils/fetch-with-timeout.ts
var DEFAULT_TIMEOUT_MS = LIMITS_CONFIG.externalApiTimeoutMs;
async function fetchWithTimeout(url, options = {}) {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, fetch: fetchFn = globalThis.fetch, ...rest } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  if (typeof timer === "object" && typeof timer.unref === "function") timer.unref();
  try {
    const res = await fetchFn(url, { ...rest, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

// src/shared/utils/geo.ts
var EARTH_RADIUS_M = 6371e3;
function haversineDistanceMeters(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_M * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function haversineDistanceKm(lat1, lng1, lat2, lng2, routingFactor = 1.3) {
  const meters = haversineDistanceMeters(lat1, lng1, lat2, lng2);
  return meters / 1e3 * routingFactor;
}

// src/shared/utils/metrics.ts
function mergeChannelCounts(prev, next) {
  const merged = { ...prev ?? {} };
  for (const [key, value] of Object.entries(next ?? {})) {
    merged[key] = (merged[key] ?? 0) + value;
  }
  return merged;
}

// src/shared/utils/error-utils.ts
function extractErrorContext(error) {
  return {
    error: extractErrorMessage(error),
    stack: error instanceof Error ? error.stack : void 0
  };
}
function extractErrorMessage(error) {
  if (error instanceof Error) {
    const parts = [error.message];
    let cause = error.cause;
    let depth = 0;
    while (cause instanceof Error && depth < 3) {
      parts.push(`cause: ${cause.message}`);
      cause = cause.cause;
      depth++;
    }
    return parts.join(" | ");
  }
  if (typeof error === "string") return error;
  return String(error);
}

// src/shared/utils/meta-graph.ts
function computeExpiresAt(expiresInSeconds) {
  return Date.now() + expiresInSeconds * 1e3;
}
function parseGraphError(raw) {
  if (raw && typeof raw === "object") {
    const error = raw.error;
    if (error && typeof error === "object") {
      const parts = [];
      if (typeof error.type === "string") parts.push(error.type);
      if (typeof error.code === "number" || typeof error.code === "string")
        parts.push(String(error.code));
      if (typeof error.message === "string") parts.push(error.message);
      if (parts.length > 0) return parts.join(": ");
    }
  }
  return "Meta Graph API error";
}

// src/shared/utils/retry.ts
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var RETRYABLE_NETWORK_ERROR_CODES = /* @__PURE__ */ new Set([
  "ECONNRESET",
  "ETIMEDOUT",
  "EPIPE",
  "ECONNREFUSED",
  "ECONNABORTED",
  "EAI_AGAIN"
]);
var RETRYABLE_SQLSTATE_CODES = /* @__PURE__ */ new Set(["08000", "08003", "08006", "57P03", "53300"]);
async function withRetry(fn, options) {
  const maxRetries = options?.maxRetries ?? 2;
  const baseMs = options?.baseMs ?? 200;
  const maxDelayMs = options?.maxDelayMs ?? 5e3;
  const isRetryable = options?.isRetryable ?? isTransientHttpError;
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn(attempt);
    } catch (error) {
      lastError = error;
      if (attempt >= maxRetries) break;
      if (!isRetryable(error)) break;
      const jitter = Math.random() * 200;
      const delayMs = Math.min(baseMs * Math.pow(2, attempt - 1) + jitter, maxDelayMs);
      options?.onRetry?.({ attempt, maxRetries, error, delayMs });
      await sleep(delayMs);
    }
  }
  throw lastError;
}
function classifyTransientError(err) {
  const status = err.status ?? err.response?.status ?? 0;
  const msg = (err.message ?? "").toLowerCase();
  const code = (err.code ?? "").toUpperCase();
  if (status >= 500 && status <= 599) return true;
  if (status === 429) return true;
  if (RETRYABLE_NETWORK_ERROR_CODES.has(code)) return true;
  if (code === "UND_ERR_CONNECT_TIMEOUT" || code === "UND_ERR_HEADERS_TIMEOUT") return true;
  if (msg.includes("etimedout") || msg.includes("econnrefused") || msg.includes("econnreset") || msg.includes("econnaborted") || msg.includes("eai_again") || msg.includes("timeout of"))
    return true;
  return false;
}
function hasTransientSignature(error, seen) {
  if (typeof error !== "object" || error === null) return false;
  if (seen.has(error)) return false;
  seen.add(error);
  const err = error;
  if (classifyTransientError(err)) return true;
  if (typeof err.cause === "object" && err.cause !== null) {
    return hasTransientSignature(err.cause, seen);
  }
  return false;
}
function isTransientHttpError(error) {
  return hasTransientSignature(error, /* @__PURE__ */ new Set());
}

// src/shared/utils/tracking.ts
var TRACKING_ID_PREFIX = BRAND.trackingPrefix;
var TRACKING_ID_SUFFIX_LENGTH = 6;
var TRACKING_ID_LENGTH = TRACKING_ID_PREFIX.length + TRACKING_ID_SUFFIX_LENGTH;
var TRACKING_ID_CHARS = "2-9A-HJ-NP-Z";
var TRACKING_ID_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

// src/shared/utils/timezone.ts
function offsetAtNoonUtc(year, monthIndex, day, timezone) {
  const candidate = new Date(Date.UTC(year, monthIndex, day, 12, 0, 0, 0));
  const tzParts = candidate.toLocaleString("sv-SE", { timeZone: timezone }).split(" ");
  const [tzHour, tzMin] = tzParts[1].split(":").map(Number);
  return ((tzHour - 12) * 3600 + tzMin * 60) * 1e3;
}
function monthStartInTimezone(year, monthIndex, timezone) {
  return new Date(
    Date.UTC(year, monthIndex, 1, 0, 0, 0, 0) - offsetAtNoonUtc(year, monthIndex, 1, timezone)
  );
}
function currentYearMonthInTimezone(timezone) {
  const now = /* @__PURE__ */ new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit"
  });
  const [year, month] = formatter.format(now).split("-").map(Number);
  return [year, month - 1];
}
function getMonthStartInTimezone(timezone = REGIONAL_CONFIG.timeZone) {
  const [year, monthIndex] = currentYearMonthInTimezone(timezone);
  return monthStartInTimezone(year, monthIndex, timezone);
}
function getStartOfDayInTimezone(timezone = REGIONAL_CONFIG.timeZone) {
  const now = /* @__PURE__ */ new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const [year, month, day] = formatter.format(now).split("-").map(Number);
  const offsetMs = offsetAtNoonUtc(year, month - 1, day, timezone);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0) - offsetMs);
}
function getDayBoundsInTimezone(date2, timezone = REGIONAL_CONFIG.timeZone) {
  const instant = date2 instanceof Date ? date2 : new Date(date2);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const [year, month, day] = formatter.format(instant).split("-").map(Number);
  const offsetMs = offsetAtNoonUtc(year, month - 1, day, timezone);
  return {
    start: new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0) - offsetMs),
    end: new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999) - offsetMs)
  };
}
function getDateStringInTimezone(date2, timezone = REGIONAL_CONFIG.timeZone) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return formatter.format(date2);
}
function getRetentionCutoff(retentionMonths, timezone = REGIONAL_CONFIG.timeZone) {
  const [year, monthIndex] = currentYearMonthInTimezone(timezone);
  const totalMonths = year * 12 + monthIndex - retentionMonths;
  const targetYear = Math.floor(totalMonths / 12);
  const targetMonthIndex = totalMonths - targetYear * 12;
  return monthStartInTimezone(targetYear, targetMonthIndex, timezone);
}

// src/services/drizzle/schema.ts
import { randomUUID } from "crypto";
import {
  pgTable,
  pgSchema,
  timestamp,
  text,
  date,
  integer,
  uniqueIndex,
  unique,
  index,
  boolean,
  foreignKey,
  jsonb,
  doublePrecision,
  pgEnum,
  bigint,
  check
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
var createId = () => randomUUID();
var enumValues = (e) => Object.values(e);
var deliveryStatus = pgEnum("DeliveryStatus", enumValues(DeliveryStatus));
var ledgerAdjustmentType = pgEnum(
  "LedgerAdjustmentType",
  enumValues(LedgerAdjustmentType)
);
var channelPlatform = pgEnum("ChannelPlatform", enumValues(ChannelPlatform));
var companyChannelStatus = pgEnum(
  "CompanyChannelStatus",
  enumValues(CompanyChannelStatus)
);
var messageStatus = pgEnum("MessageStatus", enumValues(MessageStatus));
var paymentMethod = pgEnum("PaymentMethod", enumValues(PaymentMethod));
var approvalStatus = pgEnum("ApprovalStatus", enumValues(ApprovalStatus));
var riderStatus = pgEnum("RiderStatus", enumValues(RiderStatus));
var senderType = pgEnum("SenderType", enumValues(SenderType));
var subscriptionTier = pgEnum("SubscriptionTier", enumValues(SubscriptionTier));
var transactionStatus = pgEnum("TransactionStatus", enumValues(TransactionStatus));
var transactionType = pgEnum("TransactionType", enumValues(TransactionType));
var paymentProvider = pgEnum("PaymentProvider", enumValues(PaymentProvider));
var subscriptionStatus = pgEnum("SubscriptionStatus", enumValues(SubscriptionStatus));
var channelType = pgEnum("ChannelType", enumValues(ChannelType));
var escalatedTo = pgEnum("EscalatedTo", enumValues(EscalatedTo));
var escalationStatus = pgEnum("EscalationStatus", enumValues(EscalationStatus));
var eventType = pgEnum("EventType", enumValues(EventType));
var entityType = pgEnum("EntityType", enumValues(EntityType));
var adminRoleEnum = pgEnum("AdminRole", enumValues(AdminRole));
var dispatcherRoleEnum = pgEnum("DispatcherRole", enumValues(DispatcherRole));
var metricDomain = pgEnum("MetricDomain", enumValues(MetricDomain));
var metricGranularity = pgEnum("MetricGranularity", enumValues(MetricGranularity));
var devicePlatform = pgEnum("DevicePlatform", enumValues(DevicePlatform));
var authSchema = pgSchema("auth");
var users = authSchema.table("users", {
  id: text().primaryKey().notNull(),
  phoneVerifiedAt: timestamp("phone_verified_at", { precision: 3, mode: "date" })
});
var companies = pgTable(
  "companies",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    name: text(),
    cac: text(),
    nipostLicenseNumber: text("nipost_license_number"),
    contactPhone: text("contact_phone"),
    verificationStatus: approvalStatus("verification_status").default("PENDING" /* PENDING */).notNull(),
    metadata: jsonb(),
    deactivatedAt: timestamp("deactivated_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("companies_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
    index("companies_verification_status_idx").using(
      "btree",
      table.verificationStatus.asc().nullsLast().op("enum_ops")
    ),
    uniqueIndex("companies_cac_key").on(table.cac)
  ]
);
var companySettings = pgTable(
  "company_settings",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: text("company_id").notNull(),
    tier: subscriptionTier().notNull(),
    subscriptionStatus: subscriptionStatus("subscription_status").default("TRIAL" /* TRIAL */).notNull(),
    periodStart: timestamp("period_start", { precision: 3, mode: "date" }),
    periodEnd: timestamp("period_end", { precision: 3, mode: "date" }),
    squadTokenId: text("squad_token_id"),
    workingHours: jsonb("working_hours").default(DEFAULT_WORKING_HOURS).notNull(),
    bankDetails: jsonb("bank_details"),
    ledgerBalance: doublePrecision("ledger_balance").default(0).notNull(),
    companyCode: text("company_code"),
    escalatedTo: escalatedTo("escalated_to").default("COMPANY" /* COMPANY */).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    autoAcceptTeam: boolean("auto_accept_team").default(false).notNull(),
    states: text().array().default([]),
    interstateDeliveries: boolean("interstate_deliveries").default(false).notNull(),
    metadata: jsonb().default({}).notNull()
  },
  (table) => [
    uniqueIndex("company_settings_company_id_key").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("company_settings_company_code_key").using(
      "btree",
      table.companyCode.asc().nullsLast().op("text_ops")
    ),
    index("company_settings_subscription_status_idx").using(
      "btree",
      table.subscriptionStatus.asc().nullsLast().op("enum_ops")
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "company_settings_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var companyChannels = pgTable(
  "company_channels",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    platform: channelPlatform().notNull(),
    platformId: text("platform_id").notNull(),
    companyId: text("company_id").notNull(),
    status: companyChannelStatus("status").notNull(),
    metadata: jsonb(),
    aiDisabled: boolean("ai_disabled").default(false).notNull(),
    rejectionReason: text("rejection_reason"),
    rejectedAt: timestamp("rejected_at", { precision: 3, mode: "date" }),
    removedAt: timestamp("removed_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("company_channels_status_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops")
    ),
    index("company_channels_company_id_status_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    uniqueIndex("company_channels_platform_company_id_key").using(
      "btree",
      table.platform.asc().nullsLast().op("enum_ops"),
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("company_channels_platform_platform_id_key").using(
      "btree",
      table.platform.asc().nullsLast().op("enum_ops"),
      table.platformId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "company_channels_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var conversations = pgTable(
  "conversations",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    platform: channelPlatform().notNull(),
    platformId: text("platform_id").notNull(),
    companyId: text("company_id"),
    lastMessageAt: timestamp("last_message_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
    escalatedAt: timestamp("escalated_at", { precision: 3, mode: "date" }),
    escalationStatus: escalationStatus("escalation_status"),
    escalatedTo: escalatedTo("escalated_to"),
    escalatedBy: text("escalated_by"),
    resolvedAt: timestamp("resolved_at", { precision: 3, mode: "date" }),
    resolution: jsonb("resolution"),
    metadata: jsonb(),
    channelType: channelType("channel_type").notNull(),
    lastCustomerMessageAt: timestamp("last_customer_message_at", { precision: 3, mode: "date" }),
    memory: jsonb(),
    handledBy: text("handled_by"),
    handledByType: text("handled_by_type").$type().notNull(),
    handledAt: timestamp("handled_at", { precision: 3, mode: "date" })
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
    // NULLS NOT DISTINCT (PG15): lets ON CONFLICT infer the arbiter for
    // null-company (unowned/pool) conversation rows, making first-touch
    // upserts atomic.
    unique("conversations_platform_platform_id_company_id_key").on(table.platform, table.platformId, table.companyId).nullsNotDistinct(),
    index("conversations_handled_by_type_idx").using(
      "btree",
      table.handledByType.asc().nullsLast().op("text_ops")
    ),
    index("conversations_channel_type_idx").using(
      "btree",
      table.channelType.asc().nullsLast().op("enum_ops")
    ),
    index("conversations_escalated_at_idx").using(
      "btree",
      table.escalatedAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("conversations_escalation_status_idx").on(table.escalationStatus.asc().nullsLast().op("enum_ops")).where(sql`${table.escalationStatus} IS NOT NULL`),
    index("conversations_last_message_at_idx").using(
      "btree",
      table.lastMessageAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("conversations_metadata_gin").using("gin", table.metadata),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "conversations_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade"),
    check(
      "conversations_handled_by_type_check",
      sql`${table.handledByType} IN ('AI','DISPATCHER','ADMIN')`
    )
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
    status: messageStatus().default("SENT" /* SENT */).notNull(),
    actionType: text("action_type"),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [
    index("messages_conversation_id_created_at_idx").using(
      "btree",
      table.conversationId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    uniqueIndex("messages_external_id_key").using(
      "btree",
      table.externalId.asc().nullsLast().op("text_ops")
    ),
    index("messages_reply_to_external_id_idx").using(
      "btree",
      table.replyToExternalId.asc().nullsLast().op("text_ops")
    ),
    index("messages_action_type_idx").using("btree", table.actionType.asc().nullsLast()),
    index("messages_conversation_id_is_deleted_idx").using(
      "btree",
      table.conversationId.asc().nullsLast().op("text_ops"),
      table.isDeleted.asc().nullsLast().op("bool_ops")
    ),
    index("messages_created_at_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
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
    role: adminRoleEnum("role").notNull(),
    deactivatedAt: timestamp("deactivated_at", { precision: 3, mode: "date" }),
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
    role: dispatcherRoleEnum("role").notNull(),
    approvalStatus: approvalStatus("approval_status").default("PENDING" /* PENDING */).notNull(),
    deactivatedAt: timestamp("deactivated_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("dispatchers_company_id_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    index("dispatchers_company_id_updated_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.updatedAt.asc().nullsLast().op("timestamp_ops")
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
    userId: text("user_id"),
    reason: text(),
    blockedBy: text("blocked_by"),
    expiresAt: timestamp("expires_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("blocked_ips_expires_at_idx").using(
      "btree",
      table.expiresAt.asc().nullsLast().op("timestamp_ops")
    ),
    uniqueIndex("blocked_ips_ip_address_idx").using(
      "btree",
      table.ipAddress.asc().nullsLast().op("text_ops")
    ),
    index("blocked_ips_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops"))
  ]
);
var phoneVerifications = pgTable("phone_verifications", {
  userId: text("user_id").primaryKey().notNull(),
  phone: text("phone").notNull(),
  verifiedAt: timestamp("verified_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
});
var refreshSessions = pgTable(
  "refresh_sessions",
  {
    jti: text("jti").primaryKey().notNull(),
    userId: text("user_id").notNull(),
    deviceId: text("device_id").notNull(),
    tokenHash: text("token_hash").notNull(),
    issuedAt: timestamp("issued_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    expiresAt: timestamp("expires_at", { precision: 3, mode: "date" }).notNull(),
    lastActiveAt: timestamp("last_active_at", { precision: 3, mode: "date" }),
    revokedAt: timestamp("revoked_at", { precision: 3, mode: "date" }),
    replacedBy: text("replaced_by")
  },
  (table) => [
    index("refresh_sessions_user_id_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    )
  ]
);
var deviceTokens = pgTable(
  "device_tokens",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    userId: text("user_id").notNull(),
    deviceId: text("device_id").notNull(),
    platform: devicePlatform("platform").notNull(),
    fcmToken: text("fcm_token"),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    uniqueIndex("device_tokens_user_id_device_id_key").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
      table.deviceId.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("device_tokens_fcm_token_key").using(
      "btree",
      table.fcmToken.asc().nullsLast().op("text_ops")
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
    pickupState: text("pickup_state"),
    dropOffAddress: text("drop_off_address").notNull(),
    dropOffState: text("drop_off_state"),
    description: text(),
    pickupLat: doublePrecision("pickup_lat"),
    pickupLng: doublePrecision("pickup_lng"),
    dropOffLat: doublePrecision("drop_off_lat"),
    dropOffLng: doublePrecision("drop_off_lng"),
    pickupPhone: text("pickup_phone"),
    dropOffPhone: text("drop_off_phone"),
    paymentMethod: paymentMethod("payment_method").notNull(),
    scheduledAt: timestamp("scheduled_at", { precision: 3, mode: "date" }),
    assignedAt: timestamp("assigned_at", { precision: 3, mode: "date" }),
    deliveredAt: timestamp("delivered_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
    trackingId: text("tracking_id").notNull(),
    pin: text(),
    price: doublePrecision(),
    metadata: jsonb(),
    creatorPlatform: text("creator_platform").$type(),
    pool: boolean().default(false).notNull(),
    vehicleType: text("vehicle_type").default("BIKE" /* BIKE */).notNull()
  },
  (table) => [
    index("deliveries_company_id_status_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
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
    index("deliveries_rider_id_status_idx").using(
      "btree",
      table.riderId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    index("deliveries_rider_id_updated_at_idx").using(
      "btree",
      table.riderId.asc().nullsLast().op("text_ops"),
      table.updatedAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("deliveries_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
    uniqueIndex("deliveries_tracking_id_key").using(
      "btree",
      table.trackingId.asc().nullsLast().op("text_ops")
    ),
    index("deliveries_pickup_state_idx").on(table.pickupState),
    index("deliveries_keyset_pagination_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.updatedAt.desc().nullsLast().op("timestamp_ops"),
      table.id.desc().nullsLast().op("text_ops")
    ),
    index("deliveries_pending_pool_pickup_state").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.pickupState.asc().nullsLast().op("text_ops"),
      table.scheduledAt.asc().nullsLast().op("timestamp_ops"),
      table.id.asc().nullsLast().op("text_ops")
    ).where(
      sql`${table.status} = 'PENDING' AND ${table.pool} = true AND ${table.riderId} IS NULL`
    ),
    index("deliveries_status_created_at_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("deliveries_status_scheduled_at_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops"),
      table.scheduledAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("deliveries_created_at_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("deliveries_metadata_gin").using("gin", table.metadata),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "deliveries_company_id_fkey"
    }).onUpdate("cascade").onDelete("set null"),
    foreignKey({
      columns: [table.riderId],
      foreignColumns: [riders.id],
      name: "deliveries_rider_id_fkey"
    }).onUpdate("cascade").onDelete("set null"),
    check("deliveries_vehicle_type_check", sql`${table.vehicleType} IN ('BIKE')`)
  ]
);
var riders = pgTable(
  "riders",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    userId: text("user_id").notNull(),
    email: text().notNull(),
    fullName: text("full_name").notNull(),
    vehicleType: text("vehicle_type").default("BIKE" /* BIKE */).notNull(),
    approvalStatus: approvalStatus("approval_status").default("PENDING" /* PENDING */).notNull(),
    status: riderStatus().notNull(),
    lastLat: doublePrecision("last_lat"),
    lastLng: doublePrecision("last_lng"),
    lastSeen: timestamp("last_seen", { precision: 3, mode: "date" }),
    companyId: text("company_id"),
    phoneNumber: text("phone_number"),
    metadata: jsonb(),
    deactivatedAt: timestamp("deactivated_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("riders_company_id_idx").using("btree", table.companyId.asc().nullsLast().op("text_ops")),
    index("riders_company_id_status_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    index("riders_company_id_approval_status_idx").using("btree", table.companyId.asc().nullsLast().op("text_ops")).where(sql`approval_status = ${sql.raw(`'${"APPROVED" /* APPROVED */}'`)}`),
    index("riders_company_id_updated_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.updatedAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("riders_approval_status_idx").using(
      "btree",
      table.approvalStatus.asc().nullsLast().op("enum_ops")
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
    }).onUpdate("cascade").onDelete("set null"),
    check("riders_vehicle_type_check", sql`${table.vehicleType} IN ('BIKE')`)
  ]
);
var paymentTransactions = pgTable(
  "payment_transactions",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: text("company_id"),
    type: transactionType("type").notNull(),
    amount: doublePrecision().notNull(),
    currency: text("currency").default("NGN").notNull(),
    status: transactionStatus().default("PENDING" /* PENDING */).notNull(),
    reference: text().notNull(),
    provider: paymentProvider("provider"),
    description: text(),
    metadata: jsonb(),
    processedAt: timestamp("processed_at", { precision: 3, mode: "date" }),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("payment_transactions_company_id_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("payment_transactions_type_idx").using(
      "btree",
      table.type.asc().nullsLast().op("enum_ops")
    ),
    uniqueIndex("payment_transactions_reference_key").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    index("payment_transactions_status_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops")
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "payment_transactions_company_id_fkey"
    }).onUpdate("cascade").onDelete("restrict"),
    check("payment_transactions_currency_check", sql`${table.currency} IN ('NGN')`)
  ]
);
var subscriptionTransactions = pgTable(
  "subscription_transactions",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: text("company_id").notNull(),
    amount: doublePrecision().notNull(),
    currency: text("currency").default("NGN").notNull(),
    status: transactionStatus().default("PENDING" /* PENDING */).notNull(),
    reference: text().notNull(),
    provider: paymentProvider("provider"),
    tier: subscriptionTier("tier").notNull(),
    periodStart: timestamp("period_start", { precision: 3, mode: "date" }).notNull(),
    periodEnd: timestamp("period_end", { precision: 3, mode: "date" }),
    description: text(),
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
    index("subscription_transactions_status_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops")
    ),
    uniqueIndex("subscription_transactions_reference_key").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    uniqueIndex("subscription_transactions_one_pending_company").on(table.companyId).where(sql`${table.status} = ${sql.raw(`'${"PENDING" /* PENDING */}'`)}`),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "subscription_transactions_company_id_fkey"
    }).onUpdate("cascade").onDelete("restrict"),
    check("subscription_transactions_currency_check", sql`${table.currency} IN ('NGN')`)
  ]
);
var deliveryAllocations = pgTable(
  "delivery_allocations",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    deliveryId: text("delivery_id").notNull(),
    transactionId: text("transaction_id").notNull(),
    amount: doublePrecision().notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    uniqueIndex("delivery_allocations_delivery_id_transaction_id_key").using(
      "btree",
      table.deliveryId.asc().nullsLast().op("text_ops"),
      table.transactionId.asc().nullsLast().op("text_ops")
    ),
    index("delivery_allocations_transaction_id_idx").using(
      "btree",
      table.transactionId.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.deliveryId],
      foreignColumns: [deliveries.id],
      name: "delivery_allocations_delivery_id_fkey"
    }).onUpdate("cascade").onDelete("cascade"),
    foreignKey({
      columns: [table.transactionId],
      foreignColumns: [paymentTransactions.id],
      name: "delivery_allocations_transaction_id_fkey"
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
    uniqueIndex("ledger_transactions_reference_key").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "ledger_transactions_company_id_fkey"
    }).onUpdate("cascade").onDelete("restrict")
  ]
);
var eventLogs = pgTable(
  "event_logs",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    eventType: eventType("event_type").notNull(),
    entityType: entityType("entity_type").notNull(),
    entityId: text("entity_id").notNull(),
    actorId: text("actor_id"),
    companyId: text("company_id"),
    metadata: jsonb(),
    severity: text().$type(),
    ipAddress: text("ip_address"),
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
      table.eventType.asc().nullsLast().op("enum_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("event_logs_event_type_success_created_at_idx").using(
      "btree",
      table.eventType.asc().nullsLast().op("enum_ops"),
      table.success.asc().nullsLast().op("bool_ops"),
      table.createdAt.desc().nullsLast().op("timestamp_ops")
    ),
    index("event_logs_event_type_severity_created_at_idx").using(
      "btree",
      table.eventType.asc().nullsLast().op("enum_ops"),
      table.severity.asc().nullsLast().op("text_ops"),
      table.createdAt.desc().nullsLast().op("timestamp_ops")
    ),
    index("event_logs_company_entity_type_event_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.entityType.asc().nullsLast().op("enum_ops"),
      table.eventType.asc().nullsLast().op("enum_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("event_logs_created_at_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    index("event_logs_metadata_gin").using("gin", table.metadata)
  ]
);
var eventOutbox = pgTable(
  "event_outbox",
  {
    id: bigint({ mode: "number" }).generatedAlwaysAsIdentity().notNull().primaryKey(),
    channel: text().notNull(),
    payload: jsonb().notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("event_outbox_channel_id_idx").using(
      "btree",
      table.channel.asc().nullsLast().op("text_ops"),
      table.id.asc().nullsLast().op("int8_ops")
    ),
    index("event_outbox_created_at_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    )
  ]
);
var idempotencyKeys = pgTable(
  "idempotency_keys",
  {
    key: text().primaryKey().notNull(),
    response: jsonb(),
    expiresAt: timestamp("expires_at", { precision: 3, mode: "date" }).notNull(),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    index("idempotency_keys_expires_at_idx").using(
      "btree",
      table.expiresAt.asc().nullsLast().op("timestamp_ops")
    )
  ]
);
var metrics = pgTable(
  "metrics",
  {
    companyId: text("company_id"),
    domain: metricDomain("domain").notNull(),
    granularity: metricGranularity("granularity").notNull(),
    bucketStart: date("bucket_start").notNull(),
    totalCount: integer("total_count").notNull().default(0),
    deliveredCount: integer("delivered_count").notNull().default(0),
    cancelledCount: integer("cancelled_count").notNull().default(0),
    failedCount: integer("failed_count").notNull().default(0),
    totalRevenueKobo: integer("total_revenue_kobo").notNull().default(0),
    avgDeliveryTimeMinutes: doublePrecision("avg_delivery_time_minutes"),
    channelBreakdown: jsonb("channel_breakdown").default({}).notNull(),
    extraMetrics: jsonb("extra_metrics").default({}).notNull(),
    peakHour: integer("peak_hour"),
    uniqueRidersActive: integer("unique_riders_active").notNull().default(0),
    createdAt: timestamp("created_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    // One row per (company scope, domain, granularity, bucket) — covers both
    // company rows and the NULL system row via NULLS NOT DISTINCT. A plain
    // unique constraint (not partial unique index) so the NULL company_id
    // conflicts like any value — exactly one system row per domain/granularity.
    unique("metrics_scope_domain_granularity_bucket_idx").on(table.companyId, table.domain, table.granularity, table.bucketStart).nullsNotDistinct(),
    // Range scans for a company's series (read path).
    index("metrics_company_domain_granularity_idx").on(
      table.companyId,
      table.domain,
      table.granularity,
      table.bucketStart
    ),
    // Range scans for the system-wide series (admin read path).
    index("metrics_system_domain_granularity_idx").on(table.domain, table.granularity, table.bucketStart).where(sql`${table.companyId} IS NULL`),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "metrics_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);

// src/services/drizzle/relations.ts
import { relations } from "drizzle-orm/relations";
var companySettingsRelations = relations(companySettings, ({ one }) => ({
  company: one(companies, {
    fields: [companySettings.companyId],
    references: [companies.id]
  })
}));
var companiesRelations = relations(companies, ({ many, one }) => ({
  companySettings: one(companySettings),
  companyChannels: many(companyChannels),
  conversations: many(conversations),
  dispatchers: many(dispatchers),
  deliveries: many(deliveries),
  riders: many(riders),
  paymentTransactions: many(paymentTransactions),
  subscriptionTransactions: many(subscriptionTransactions),
  eventLogs: many(eventLogs),
  ledgerTransactions: many(ledgerTransactions),
  metrics: many(metrics)
}));
var companyChannelsRelations = relations(companyChannels, ({ one }) => ({
  company: one(companies, {
    fields: [companyChannels.companyId],
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
  })
}));
var deliveryAllocationsRelations = relations(deliveryAllocations, ({ one }) => ({
  delivery: one(deliveries, {
    fields: [deliveryAllocations.deliveryId],
    references: [deliveries.id]
  }),
  transaction: one(paymentTransactions, {
    fields: [deliveryAllocations.transactionId],
    references: [paymentTransactions.id]
  })
}));
var transactionsRelations = relations(paymentTransactions, ({ one, many }) => ({
  company: one(companies, {
    fields: [paymentTransactions.companyId],
    references: [companies.id]
  }),
  deliveryAllocations: many(deliveryAllocations)
}));
var subscriptionTransactionsRelations = relations(subscriptionTransactions, ({ one }) => ({
  company: one(companies, {
    fields: [subscriptionTransactions.companyId],
    references: [companies.id]
  })
}));
var eventLogsRelations = relations(eventLogs, ({ one }) => ({
  company: one(companies, {
    fields: [eventLogs.companyId],
    references: [companies.id]
  })
}));
var metricsRelations = relations(metrics, ({ one }) => ({
  company: one(companies, {
    fields: [metrics.companyId],
    references: [companies.id]
  })
}));
var ledgerTransactionsRelations = relations(ledgerTransactions, ({ one }) => ({
  company: one(companies, {
    fields: [ledgerTransactions.companyId],
    references: [companies.id]
  })
}));

// src/services/alerts.ts
var ALERT_COOLDOWN_MS = 5 * 60 * 1e3;
var recentAlerts = /* @__PURE__ */ new Map();
function getDiscordWebhookUrl() {
  return process.env.DISCORD_WEBHOOK_URL;
}
async function sendAlert(level, title, details) {
  const webhookUrl = getDiscordWebhookUrl();
  if (!webhookUrl) return;
  const key = `${title}:${level}`;
  const lastSent = recentAlerts.get(key) ?? 0;
  if (Date.now() - lastSent < ALERT_COOLDOWN_MS) return;
  recentAlerts.set(key, Date.now());
  const emoji = level === "critical" ? "\u{1F6A8}" : level === "warning" ? "\u26A0\uFE0F" : "\u2139\uFE0F";
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: `${emoji} ${title}`,
            description: details,
            color: level === "critical" ? 16711680 : level === "warning" ? 16755200 : 43775,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          }
        ]
      }),
      signal: AbortSignal.timeout(5e3)
    });
  } catch {
  }
}
function resetAlertCooldownsForTest() {
  recentAlerts.clear();
}

// src/services/email.ts
var DEFAULT_SMTP_PORT = 1025;
function getSmtpConfig() {
  const host = typeof process !== "undefined" && process.env?.SMTP_HOST;
  if (!host) return null;
  const port = typeof process !== "undefined" && process.env?.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : DEFAULT_SMTP_PORT;
  const user = typeof process !== "undefined" && process.env?.SMTP_USER || void 0;
  const pass = typeof process !== "undefined" && process.env?.SMTP_PASS || void 0;
  return { host, port, user, pass };
}
async function sendViaSmtp(smtp, options) {
  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : void 0
  });
  const info = await transporter.sendMail({
    from: options.from,
    to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: options.attachments?.map((a) => ({
      filename: a.filename,
      content: Buffer.from(a.content, "base64")
    }))
  });
  return { id: info.messageId };
}
function isRetryableEmailError(error) {
  if (error && typeof error === "object") {
    const err = error;
    const code = err.code ?? "";
    const msg = (err.message ?? "").toLowerCase();
    if (RETRYABLE_NETWORK_ERROR_CODES.has(code)) return true;
    if (msg.includes("timeout") || msg.includes("network")) return true;
  }
  return false;
}
var EmailService = class {
  async sendEmail(options) {
    const smtp = getSmtpConfig();
    if (!smtp) throw new Error("EmailService: no SMTP configured \u2014 email not sent");
    return withRetry(() => sendViaSmtp(smtp, options), {
      maxRetries: 2,
      baseMs: 1e3,
      isRetryable: isRetryableEmailError,
      label: "email.sendEmail"
    });
  }
};

// src/services/encryption.ts
import { randomBytes, createCipheriv, createDecipheriv } from "crypto";
var ALGORITHM = "aes-256-gcm";
var IV_LENGTH = 16;
var INVALID_ENCRYPTED_FORMAT = "Invalid encrypted format";
function parseKey(raw) {
  const dotIndex = raw.lastIndexOf(".");
  const version = dotIndex >= 0 ? raw.slice(dotIndex + 1) : "v0";
  const keyHex = dotIndex >= 0 ? raw.slice(0, dotIndex) : raw;
  return { key: Buffer.from(keyHex, "hex"), version };
}
function createEncryptor(currentKey, previousKey) {
  const current = parseKey(currentKey);
  const previous = previousKey ? parseKey(previousKey) : void 0;
  function encrypt(plaintext) {
    const { key, version } = current;
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, key, iv);
    let ciphertext = cipher.update(plaintext, "utf8", "hex");
    ciphertext += cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");
    return JSON.stringify({
      v: version,
      iv: iv.toString("hex"),
      c: ciphertext,
      t: authTag
    });
  }
  function parsePayload(payload) {
    let parsed;
    try {
      const value = JSON.parse(payload);
      if (value === null || typeof value !== "object") {
        throw new Error(INVALID_ENCRYPTED_FORMAT);
      }
      parsed = value;
    } catch {
      throw new Error(INVALID_ENCRYPTED_FORMAT);
    }
    const { v, iv, c, t } = parsed;
    if (!iv || !c || !t) {
      throw new Error(INVALID_ENCRYPTED_FORMAT);
    }
    return { v: v ?? "", ivHex: iv, ciphertext: c, authTagHex: t };
  }
  function tryDecryptWith(key, { ivHex, ciphertext, authTagHex }) {
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    let plaintext = decipher.update(ciphertext, "hex", "utf8");
    plaintext += decipher.final("utf8");
    return plaintext;
  }
  function decryptWithKeyVersion(payload) {
    const parsed = parsePayload(payload);
    try {
      return { plaintext: tryDecryptWith(current.key, parsed), version: current.version };
    } catch {
      if (previous && parsed.v !== current.version) {
        try {
          return { plaintext: tryDecryptWith(previous.key, parsed), version: previous.version };
        } catch {
          throw new Error(INVALID_ENCRYPTED_FORMAT);
        }
      }
      throw new Error(INVALID_ENCRYPTED_FORMAT);
    }
  }
  function decrypt(payload) {
    return decryptWithKeyVersion(payload).plaintext;
  }
  function reencryptIfNeeded(payload) {
    const { plaintext, version } = decryptWithKeyVersion(payload);
    if (version === current.version) {
      return payload;
    }
    return encrypt(plaintext);
  }
  return { encrypt, decrypt, decryptWithKeyVersion, reencryptIfNeeded };
}

// src/services/fcm.ts
var TOKEN_BUFFER_MS = FCM_SERVICE_CONFIG.tokenBufferMs;
var TOKEN_LIFETIME_MS = FCM_SERVICE_CONFIG.tokenLifetimeMs;
var TOKEN_EXPIRY_SECONDS = FCM_SERVICE_CONFIG.tokenExpirySeconds;
var INVALID_TOKEN_CODES = /* @__PURE__ */ new Set(["UNREGISTERED"]);
var FcmService = class {
  constructor(credentials) {
    this.credentials = credentials;
  }
  credentials;
  cachedToken = null;
  /** Send a single push notification. */
  async send(message) {
    try {
      const token = await this.getAccessToken();
      const res = await fetchWithTimeout(
        `https://fcm.googleapis.com/v1/projects/${this.credentials.projectId}/messages:send`,
        {
          timeoutMs: LIMITS_CONFIG.externalApiTimeoutMs,
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            message: {
              token: message.token,
              notification: { title: message.title, body: message.body },
              data: message.data ?? {}
            }
          })
        }
      );
      const result = await res.json();
      if (result.error) {
        const isInvalid = INVALID_TOKEN_CODES.has(result.error.status);
        return {
          success: false,
          error: result.error.message,
          errorCode: isInvalid ? result.error.status : void 0
        };
      }
      return { success: true, messageId: result.name };
    } catch (error) {
      return { success: false, error: extractErrorMessage(error) };
    }
  }
  /** Send to multiple tokens. One failure does not block others. */
  async sendBatch(messages2) {
    const results = [];
    const CHUNK_SIZE = FCM_SERVICE_CONFIG.sendChunkSize;
    for (let i = 0; i < messages2.length; i += CHUNK_SIZE) {
      const chunk = messages2.slice(i, i + CHUNK_SIZE);
      const settled = await Promise.allSettled(chunk.map((msg) => this.send(msg)));
      for (const r of settled) {
        results.push(
          r.status === "fulfilled" ? r.value : { success: false, error: String(r.reason) }
        );
      }
    }
    return results;
  }
  /** Send a notification to an FCM topic. */
  async sendToTopic(topic, title, body, data) {
    try {
      const token = await this.getAccessToken();
      const res = await fetchWithTimeout(
        `https://fcm.googleapis.com/v1/projects/${this.credentials.projectId}/messages:send`,
        {
          timeoutMs: LIMITS_CONFIG.externalApiTimeoutMs,
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            message: {
              topic,
              notification: { title, body },
              data: data ?? {}
            }
          })
        }
      );
      const result = await res.json();
      if (result.error) {
        return { success: false, error: result.error.message, errorCode: result.error.status };
      }
      return { success: true, messageId: result.name };
    } catch (error) {
      return { success: false, error: extractErrorMessage(error) };
    }
  }
  /** Subscribe a token to an FCM topic. */
  async subscribeToTopic(token, topic) {
    return this.topicAction("subscribe", token, topic);
  }
  /** Unsubscribe a token from an FCM topic. */
  async unsubscribeFromTopic(token, topic) {
    return this.topicAction("unsubscribe", token, topic);
  }
  // ── internals ──────────────────────────────────────────────────────────
  async topicAction(action, token, topic) {
    try {
      const accessToken = await this.getAccessToken();
      const verb = action === "subscribe" ? "subscribe" : "unsubscribe";
      const url = `https://fcm.googleapis.com/v1/projects/${this.credentials.projectId}/topics/${topic}:${verb}`;
      const res = await fetchWithTimeout(url, {
        timeoutMs: LIMITS_CONFIG.externalApiTimeoutMs,
        method: action === "subscribe" ? "POST" : "DELETE",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });
      if (!res.ok) {
        const body = await res.text();
        return { success: false, error: `HTTP ${res.status}: ${body}` };
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: extractErrorMessage(error) };
    }
  }
  async getAccessToken() {
    const now = Date.now();
    if (this.cachedToken && this.cachedToken.expiresAt > now + TOKEN_BUFFER_MS) {
      return this.cachedToken.value;
    }
    const token = await generateJwt(this.credentials);
    this.cachedToken = { value: token, expiresAt: now + TOKEN_LIFETIME_MS };
    return token;
  }
};
async function generateJwt(c) {
  const now = Math.floor(Date.now() / 1e3);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: c.clientEmail,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + TOKEN_EXPIRY_SECONDS
  };
  const signInput = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(payload))}`;
  const keyData = c.privateKey.replace(/-----BEGIN PRIVATE KEY-----/g, "").replace(/-----END PRIVATE KEY-----/g, "").replace(/\s/g, "");
  const binaryDer = Uint8Array.from(atob(keyData), (ch) => ch.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signInput)
  );
  return `${signInput}.${base64Url(String.fromCharCode(...new Uint8Array(signature)))}`;
}
function base64Url(input) {
  return btoa(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

// src/services/payments.ts
import { and, asc, eq, gt, inArray, sql as sql2, sum } from "drizzle-orm";
import { randomUUID as randomUUID2 } from "crypto";
async function getTotalPaidForDeliveries(deliveryIds, conn) {
  const safeDeliveryIds = deliveryIds.slice(0, LIMITS_CONFIG.dbBatchSize);
  const results = await conn.select({
    deliveryId: deliveryAllocations.deliveryId,
    totalAmount: sum(deliveryAllocations.amount)
  }).from(deliveryAllocations).innerJoin(paymentTransactions, eq(deliveryAllocations.transactionId, paymentTransactions.id)).where(
    and(
      inArray(deliveryAllocations.deliveryId, safeDeliveryIds),
      eq(paymentTransactions.status, "SUCCESS" /* SUCCESS */)
    )
  ).groupBy(deliveryAllocations.deliveryId);
  const map = /* @__PURE__ */ new Map();
  for (const res of results) {
    map.set(res.deliveryId, Number(res.totalAmount) || 0);
  }
  return map;
}
async function applyPaymentStatusUpdate(tx, deliveryIds, companyId) {
  const whereConditions = [
    inArray(deliveries.id, deliveryIds),
    sql2`${deliveries.metadata}->>'paymentStatus' = ${"AWAITING" /* AWAITING */}`
  ];
  if (companyId) {
    whereConditions.push(eq(deliveries.companyId, companyId));
  }
  const result = await tx.update(deliveries).set({
    status: sql2`CASE WHEN ${deliveries.riderId} IS NOT NULL THEN ${"ASSIGNED" /* ASSIGNED */} ELSE ${"PENDING" /* PENDING */} END`,
    metadata: sql2`jsonb_set(
        COALESCE(${deliveries.metadata}, '{}'::jsonb),
        '{paymentStatus}',
        to_jsonb(${"COMPLETED" /* COMPLETED */}::text)
      )`
  }).where(and(...whereConditions)).returning({ id: deliveries.id });
  return result.map((r) => r.id);
}
function computeAllocationTargets(deliveryRows, paidAmounts, remainingAmount) {
  const targets = [];
  const fullyPaidIds = [];
  let leftover = remainingAmount;
  for (const delivery of deliveryRows) {
    if (leftover <= 0) break;
    const price = delivery.price ?? 0;
    const alreadyPaid = paidAmounts.get(delivery.id) || 0;
    const outstanding = Math.max(0, price - alreadyPaid);
    if (outstanding <= 0) continue;
    const amountToApply = Math.min(leftover, outstanding);
    leftover -= amountToApply;
    targets.push({ deliveryId: delivery.id, amountToApply });
    if (alreadyPaid + amountToApply >= price) fullyPaidIds.push(delivery.id);
  }
  return { targets, fullyPaidIds, leftover };
}
async function processPaymentAllocation(tx, transaction) {
  const fullyPaidIds = [];
  const creditedCompanyIds = /* @__PURE__ */ new Set();
  let updatedDeliveryIds = [];
  const existingAllocations = transaction.deliveryAllocations || [];
  const deliveryIds = existingAllocations.map((a) => a.deliveryId);
  let remainingAmount = transaction.amount;
  if (deliveryIds.length > 0) {
    const processed = await tx.select({ deliveryId: deliveryAllocations.deliveryId }).from(deliveryAllocations).where(
      and(
        eq(deliveryAllocations.transactionId, transaction.id),
        gt(deliveryAllocations.amount, 0)
      )
    ).limit(1);
    if (processed.length > 0) {
      return { fullyPaidIds: [], updatedDeliveryIds: [], creditedCompanyIds: [] };
    }
    for (let i = 0; i < deliveryIds.length; i += LIMITS_CONFIG.dbBatchSize) {
      const batch = deliveryIds.slice(i, i + LIMITS_CONFIG.dbBatchSize);
      if (remainingAmount <= 0) break;
      const [deliveryRows, paymentTotals] = await Promise.all([
        tx.select({
          id: deliveries.id,
          price: deliveries.price,
          companyId: deliveries.companyId,
          createdAt: deliveries.createdAt,
          metadata: deliveries.metadata
        }).from(deliveries).where(inArray(deliveries.id, batch)).orderBy(asc(deliveries.createdAt)).for("update"),
        getTotalPaidForDeliveries(batch, tx)
      ]);
      if (deliveryRows.length === 0) continue;
      const {
        targets,
        fullyPaidIds: batchFullyPaidIds,
        leftover
      } = computeAllocationTargets(
        deliveryRows.map((d) => ({ id: d.id, price: d.price })),
        paymentTotals,
        remainingAmount
      );
      fullyPaidIds.push(...batchFullyPaidIds);
      remainingAmount = leftover;
      const channelFeePerDelivery = transaction.metadata?.channelFeePerDelivery ?? 0;
      let allocations = targets;
      if (allocations.length === 0 && remainingAmount > 0) {
        const unpriced = deliveryRows.filter((d) => !d.price);
        if (unpriced.length > 0) {
          const share = Math.floor(remainingAmount / unpriced.length);
          allocations = unpriced.map((d) => ({ deliveryId: d.id, amountToApply: share }));
          const allocated = allocations.reduce((s, a) => s + a.amountToApply, 0);
          const drift = allocated - remainingAmount;
          if (drift > 0 && allocations.length > 0) {
            allocations[allocations.length - 1].amountToApply -= drift;
          } else if (drift < 0 && allocations.length > 0) {
            allocations[allocations.length - 1].amountToApply += -drift;
          }
          remainingAmount = 0;
        }
      }
      if (allocations.length > 0) {
        await tx.delete(deliveryAllocations).where(
          and(
            eq(deliveryAllocations.transactionId, transaction.id),
            inArray(deliveryAllocations.deliveryId, batch)
          )
        );
        await tx.insert(deliveryAllocations).values(
          allocations.map((a) => ({
            transactionId: transaction.id,
            deliveryId: a.deliveryId,
            amount: a.amountToApply
          }))
        );
        await applyLedgerCredits(
          tx,
          deliveryRows,
          allocations,
          channelFeePerDelivery,
          creditedCompanyIds
        );
      }
    }
  }
  if (remainingAmount > 0 && transaction.companyId) {
    await tx.update(companySettings).set({ ledgerBalance: sql2`${companySettings.ledgerBalance} + ${remainingAmount}` }).where(eq(companySettings.companyId, transaction.companyId));
    creditedCompanyIds.add(transaction.companyId);
  }
  if (fullyPaidIds.length > 0) {
    updatedDeliveryIds = await applyPaymentStatusUpdate(tx, fullyPaidIds, transaction.companyId);
  }
  return { fullyPaidIds, updatedDeliveryIds, creditedCompanyIds: [...creditedCompanyIds] };
}
function computePoolSplit(amountToApply, hasOwnerCompany) {
  const { platformFeeKobo, ownerShareKobo } = BILLING_CONFIG.POOL_SPLIT_KOBO;
  const platformFee = Math.min(platformFeeKobo, amountToApply);
  const remainingAfterFee = amountToApply - platformFee;
  const ownerShare = hasOwnerCompany ? Math.min(ownerShareKobo, remainingAfterFee) : 0;
  return { platformFee, ownerShare, fulfillerShare: remainingAfterFee - ownerShare };
}
async function applyLedgerCredits(tx, deliveryRows, allocations, channelFeePerDelivery, creditedCompanyIds) {
  const deliveryById = new Map(deliveryRows.map((d) => [d.id, d]));
  const ledgerCredits = /* @__PURE__ */ new Map();
  const companyDeliveryCounts = /* @__PURE__ */ new Map();
  for (const target of allocations) {
    const delivery = deliveryById.get(target.deliveryId);
    if (!delivery) continue;
    const meta = delivery.metadata;
    const fulfillerId = meta?.fulfilledByCompanyId;
    if (!delivery.companyId && !fulfillerId) continue;
    let creditedCompanyId;
    if (fulfillerId) {
      const { ownerShare, fulfillerShare } = computePoolSplit(
        target.amountToApply,
        delivery.companyId != null
      );
      if (delivery.companyId != null) {
        ledgerCredits.set(
          delivery.companyId,
          (ledgerCredits.get(delivery.companyId) || 0) + ownerShare
        );
      }
      ledgerCredits.set(fulfillerId, (ledgerCredits.get(fulfillerId) || 0) + fulfillerShare);
      creditedCompanyId = fulfillerId;
    } else if (delivery.companyId != null) {
      ledgerCredits.set(
        delivery.companyId,
        (ledgerCredits.get(delivery.companyId) || 0) + target.amountToApply
      );
      creditedCompanyId = delivery.companyId;
    } else {
      continue;
    }
    companyDeliveryCounts.set(
      creditedCompanyId,
      (companyDeliveryCounts.get(creditedCompanyId) || 0) + 1
    );
  }
  const entries = [...ledgerCredits.entries()];
  if (entries.length > 0) {
    await tx.update(companySettings).set({
      ledgerBalance: sql2`${companySettings.ledgerBalance} + CASE ${sql2.join(
        entries.map(
          ([cId, amount]) => sql2`WHEN ${companySettings.companyId} = ${cId} THEN ${amount}`
        ),
        sql2` `
      )} END`
    }).where(
      inArray(
        companySettings.companyId,
        entries.map(([cId]) => cId)
      )
    );
    const feeRows = entries.map(([cId]) => {
      const companyDeliveryCount = companyDeliveryCounts.get(cId) || 0;
      const totalFee = channelFeePerDelivery * companyDeliveryCount;
      if (totalFee <= 0) return null;
      creditedCompanyIds.add(cId);
      return {
        companyId: cId,
        amount: -totalFee,
        adjustmentType: "CHANNEL_FEE" /* CHANNEL_FEE */,
        reference: `CHFEE-${randomUUID2().slice(0, 8)}`,
        reason: `Channel fee for ${companyDeliveryCount} delivery(ies)`,
        metadata: buildMetadata("LEDGER", {
          feePerDelivery: channelFeePerDelivery,
          deliveryCount: companyDeliveryCount,
          totalFee
        }),
        createdAt: /* @__PURE__ */ new Date()
      };
    }).filter((r) => r !== null);
    if (feeRows.length > 0) {
      await tx.insert(ledgerTransactions).values(feeRows);
    }
    for (const [cId] of entries) {
      creditedCompanyIds.add(cId);
    }
  }
}

// src/services/queue.ts
import { sql as sql3 } from "drizzle-orm";
var PermanentJobError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "PermanentJobError";
  }
};
var JOB_TYPE_TO_QUEUE = {
  ["delivery-notification" /* DELIVERY_NOTIFICATION */]: "delivery_notifications",
  ["ai:batch" /* AI_BATCH */]: "ai_batch",
  ["squad-webhook" /* SQUAD_WEBHOOK */]: "squid_webhooks",
  ["export" /* EXPORT */]: "exports"
};
function toQueueName(type) {
  return JOB_TYPE_TO_QUEUE[type];
}
function retryBackoffSeconds(retryCount) {
  const ms = Math.min(
    QUEUE_SERVICE_CONFIG.retryBackoffMaxMs,
    QUEUE_SERVICE_CONFIG.retryBackoffBaseMs * 2 ** (retryCount - 1)
  );
  return Math.max(1, Math.ceil(ms / 1e3));
}
function toRows(result) {
  if (Array.isArray(result)) return result;
  const r = result;
  return r.rows ?? [];
}
function pgmqRowToJobRow(row, type) {
  const msg = typeof row.message === "object" && row.message !== null ? row.message : {};
  const meta = msg._meta ?? {};
  return {
    id: String(row.msg_id),
    type,
    payload: msg,
    status: "PROCESSING",
    priority: 0,
    maxRetries: QUEUE_SERVICE_CONFIG.defaultMaxRetries,
    retryCount: Number(row.read_ct ?? 0),
    lastError: null,
    scheduledAt: null,
    startedAt: row.vt,
    completedAt: null,
    createdAt: row.enqueued_at,
    companyId: meta.companyId ?? null,
    dedupeKey: meta.dedupeKey ?? null
  };
}
var QueueService = class {
  lastPruneAtMs = 0;
  async enqueue(db, type, payload, options) {
    const queueName = toQueueName(type);
    const message = {
      ...payload,
      _meta: {
        enqueuedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    const delaySeconds = options?.scheduledAt ? Math.max(0, Math.floor((options.scheduledAt.getTime() - Date.now()) / 1e3)) : 0;
    const result = await db.execute(sql3`
      SELECT * FROM pgmq.send(
        ${queueName}::text,
        ${JSON.stringify(message)}::jsonb,
        ${delaySeconds}
      )
    `);
    const rows = toRows(result);
    const row = rows[0];
    return {
      id: String(row?.msg_id ?? 0),
      type,
      payload: message,
      status: "PENDING",
      priority: options?.priority ?? 0,
      maxRetries: options?.maxRetries ?? QUEUE_SERVICE_CONFIG.defaultMaxRetries,
      retryCount: 0,
      lastError: null,
      scheduledAt: options?.scheduledAt ?? null,
      startedAt: null,
      completedAt: null,
      createdAt: /* @__PURE__ */ new Date(),
      companyId: null,
      dedupeKey: null
    };
  }
  async enqueueWithDedupe(db, type, payload, options) {
    const queueName = toQueueName(type);
    if (options?.dedupeKey) {
      const existing = await db.execute(sql3`
        SELECT msg_id FROM pgmq.q_${sql3.raw(queueName)}
        WHERE message -> '_meta' ->> 'dedupeKey' = ${options.dedupeKey}
          AND (read_ct = 0 OR vt >= clock_timestamp())
        LIMIT 1
      `);
      const existingRows = toRows(existing);
      if (existingRows.length > 0) {
        return null;
      }
    }
    const message = {
      ...payload,
      _meta: {
        companyId: options?.companyId,
        dedupeKey: options?.dedupeKey,
        enqueuedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
    const result = await db.execute(sql3`
      SELECT * FROM pgmq.send(
        ${queueName}::text,
        ${JSON.stringify(message)}::jsonb
      )
    `);
    const rows = toRows(result);
    const row = rows[0];
    return {
      id: String(row?.msg_id ?? 0),
      type,
      payload: message,
      status: "PENDING",
      priority: options?.priority ?? 0,
      maxRetries: options?.maxRetries ?? QUEUE_SERVICE_CONFIG.defaultMaxRetries,
      retryCount: 0,
      lastError: null,
      scheduledAt: null,
      startedAt: null,
      completedAt: null,
      createdAt: /* @__PURE__ */ new Date(),
      companyId: options?.companyId ?? null,
      dedupeKey: options?.dedupeKey ?? null
    };
  }
  async countRecent(db, type, companyId, since) {
    const queueName = toQueueName(type);
    const result = await db.execute(sql3`
      SELECT
        (SELECT COUNT(*)::integer AS count FROM pgmq.q_${sql3.raw(queueName)}
          WHERE enqueued_at >= ${since.toISOString()}::timestamptz
            AND message -> '_meta' @> ${JSON.stringify({ companyId })}::jsonb)
        +
        (SELECT COUNT(*)::integer AS count FROM pgmq.a_${sql3.raw(queueName)}
          WHERE enqueued_at >= ${since.toISOString()}::timestamptz
            AND message -> '_meta' @> ${JSON.stringify({ companyId })}::jsonb)
        AS count
    `);
    const rows = toRows(result);
    return Number(rows[0]?.count ?? 0);
  }
  async drain(db, type, handler, options) {
    const { maxJobs, timeBudgetMs, batchSize = QUEUE_SERVICE_CONFIG.batchSize, onError } = options;
    const startTime = Date.now();
    const stats = { processed: 0, succeeded: 0, failed: 0 };
    const log = onError ?? ((msg, err) => console.error(msg, err));
    const queueName = toQueueName(type);
    if (Date.now() - this.lastPruneAtMs >= QUEUE_SERVICE_CONFIG.pruneIntervalMs) {
      this.lastPruneAtMs = Date.now();
      try {
        await this.pruneTerminal(db, queueName);
      } catch (e) {
        log("[Queue] Failed to prune terminal jobs", e);
      }
    }
    for (; ; ) {
      if (timeBudgetMs !== void 0 && Date.now() - startTime >= timeBudgetMs) break;
      if (stats.processed >= maxJobs) break;
      let messages2;
      try {
        const result = await db.execute(sql3`
          SELECT * FROM pgmq.read(${queueName}::text, vt => 30, qty => ${batchSize})
        `);
        messages2 = toRows(result);
      } catch (e) {
        log("[Queue] Dequeue failed", e);
        break;
      }
      if (messages2.length === 0) break;
      for (const msg of messages2) {
        if (timeBudgetMs !== void 0 && Date.now() - startTime >= timeBudgetMs) break;
        if (stats.processed >= maxJobs) break;
        stats.processed++;
        const jobRow = pgmqRowToJobRow(msg, type);
        try {
          await handler(jobRow);
          await db.execute(sql3`SELECT pgmq.delete(${queueName}::text, ${msg.msg_id})`);
          stats.succeeded++;
        } catch (error) {
          stats.failed++;
          const retryCount = Number(msg.read_ct ?? 1);
          const maxRetries = QUEUE_SERVICE_CONFIG.defaultMaxRetries;
          try {
            if (error instanceof PermanentJobError) {
              await db.execute(sql3`SELECT pgmq.archive(${queueName}::text, ${msg.msg_id})`);
            } else if (retryCount >= maxRetries) {
              await db.execute(sql3`SELECT pgmq.archive(${queueName}::text, ${msg.msg_id})`);
            } else {
              const backoffSec = retryBackoffSeconds(retryCount);
              await db.execute(sql3`
                SELECT pgmq.set_vt(${queueName}::text, ${msg.msg_id}, ${backoffSec})
              `);
            }
          } catch {
            log("[Queue] Failed to handle job failure");
          }
        }
      }
    }
    return stats;
  }
  async pruneTerminal(db, queueName) {
    const cutoff = new Date(Date.now() - QUEUE_SERVICE_CONFIG.pruneTerminalAfterMs);
    const result = await db.execute(sql3`
      DELETE FROM pgmq.a_${sql3.raw(queueName)}
      WHERE enqueued_at < ${cutoff}
    `);
    const rows = toRows(result);
    return rows.length;
  }
};
var queueService = new QueueService();

// src/services/squad.ts
var SquadRequestError = class extends Error {
  status;
  body;
  constructor(message, status, body) {
    super(message);
    this.name = "SquadRequestError";
    this.status = status;
    this.body = body;
  }
};
function isSquadRetryable(error) {
  if (error instanceof SquadRequestError) {
    if (error.status !== void 0 && error.status >= 500) return true;
    if (error.status === 429) return true;
    return false;
  }
  if (error instanceof Error && error.name === "AbortError") return true;
  return isTransientHttpError(error);
}
var SquadClient = class {
  baseUrl;
  secretKey;
  timeoutMs;
  fetchImpl;
  retry;
  constructor(options) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.secretKey = options.secretKey;
    this.timeoutMs = options.timeoutMs ?? BILLING_CONFIG.SQUAD_HTTP_TIMEOUT;
    this.fetchImpl = options.fetchImpl;
    this.retry = { maxRetries: 2, isRetryable: isSquadRetryable, ...options.retry };
  }
  async request(path, init = {}) {
    return withRetry(() => this.attempt(path, init), {
      ...this.retry,
      onRetry: (info) => {
        this.retry.onRetry?.(info);
      }
    });
  }
  async attempt(path, init) {
    const query = init.query ? `?${new URLSearchParams(init.query).toString()}` : "";
    const url = `${this.baseUrl}${path}${query}`;
    const response = await fetchWithTimeout(url, {
      method: init.method ?? "GET",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...init.headers
      },
      body: init.body ? JSON.stringify(init.body) : void 0,
      timeoutMs: this.timeoutMs,
      fetch: this.fetchImpl
    });
    const text2 = await response.text();
    let data;
    try {
      data = text2 ? JSON.parse(text2) : {};
    } catch {
      throw new SquadRequestError(
        `Failed to parse Squad response (${response.status}): ${text2.slice(0, 200)}`,
        response.status
      );
    }
    if (response.status >= 500) {
      throw new SquadRequestError(
        `Squad upstream error (HTTP ${response.status})`,
        response.status,
        data
      );
    }
    return { status: response.status, data };
  }
  /**
   * Charge a tokenized card for recurring payments.
   * amountKobo is sent to Squad VERBATIM — Squad interprets `amount` in the lowest
   * currency value (kobo), and dividing here was the historic 100x undercharge bug.
   */
  async chargeCard(params) {
    if (!params.tokenId) return { success: false, message: "No tokenized card" };
    if (params.amountKobo <= 0) return { success: false, message: "Invalid amount" };
    const { status, data } = await this.request(
      "/transaction/charge_card",
      {
        method: "POST",
        body: {
          token_id: params.tokenId,
          amount: params.amountKobo,
          transaction_ref: params.transactionRef,
          currency: params.currency,
          email: params.email,
          ...params.metadata ? { metadata: params.metadata } : {}
        }
      }
    );
    if (status >= 400 || data.success === false) {
      return {
        success: false,
        message: data.message || "Card charge failed",
        transactionRef: params.transactionRef
      };
    }
    return { success: true, transactionRef: params.transactionRef };
  }
};
export {
  ADMIN_ACTOR_ID,
  ALLOWED_STATUS_TRANSITIONS,
  ALL_DAYS,
  AdminDeliveryAction,
  AdminEscalationAction,
  AdminRole,
  ApiTag,
  ApprovalStatus,
  AuditActorType,
  BILLING_CONFIG,
  BRAND,
  BRAND_NAME,
  CAC_EVIDENCE_STATUS,
  CHANNEL_FEES,
  CLIENT_CONFIG,
  ChannelPlatform,
  ChannelType,
  CompanyAccessLevel,
  CompanyChannelStatus,
  ContactCategory,
  ConversationHandlerType,
  ConversationScope,
  DATA_RETENTION,
  DEDICATED_TIERS,
  DEFAULT_MESSAGE_LIMIT,
  DEFAULT_PRICING_SCHEMES,
  DEFAULT_WORKING_HOURS,
  DELETED_USER_SENTINEL,
  DayOfWeek,
  DeliveryExpiryReason,
  DeliveryStatus,
  DeliverySyncScope,
  DevicePlatform,
  DispatcherRole,
  ENUM_CATALOG,
  EmailService,
  EntityType,
  ErrorCode,
  EscalatedTo,
  EscalationStatus,
  EventType,
  ExportDataType,
  ExportReason,
  FcmNotificationType,
  FcmService,
  HQ_LOCATION,
  IdType,
  JobType,
  JwtTokenType,
  KOBO_PER_NAIRA,
  LEAD_CATEGORIES,
  LIFETIME_BUCKET_START,
  LIMITS_CONFIG,
  LedgerAdjustmentType,
  LlmRole,
  LogLevel,
  MESSAGE_STATUS_RANK,
  METADATA_KEYS,
  METRICS_FOLD_CHAIN,
  METRICS_RETENTION,
  METRIC_DOMAIN_MAPPINGS,
  MONTH_REQUIRED_TYPES,
  MS_PER_DAY,
  MessageStatus,
  MetricDomain,
  MetricGranularity,
  NOTIFICATION_PRIORITY,
  NodeEnv,
  PAGINATION_CONFIG,
  PaymentMethod,
  PaymentProvider,
  PaymentStatus,
  PermanentJobError,
  ProviderCapability,
  ProviderRole,
  QUEUE_SERVICE_CONFIG,
  REGIONAL_CONFIG,
  REGIONAL_LOCALE,
  RETENTION_CONFIG,
  RETRYABLE_NETWORK_ERROR_CODES,
  RETRYABLE_SQLSTATE_CODES,
  RiderStatus,
  SECURITY_CONFIG,
  SESSION_CONFIG,
  SUPPORT_SLA,
  SYSTEM_ACTOR_ID,
  SecurityEventType,
  SecuritySeverity,
  SenderType,
  SquadClient,
  SquadRequestError,
  SseEventType,
  SubscriptionEventType,
  SubscriptionHealth,
  SubscriptionStatus,
  SubscriptionTier,
  SystemStatus,
  TIER_LIMITS,
  TRACKING_ID_ALPHABET,
  TRACKING_ID_CHARS,
  TRACKING_ID_LENGTH,
  TRACKING_ID_PREFIX,
  TRACKING_ID_SUFFIX_LENGTH,
  TransactionStatus,
  TransactionType,
  UserAuditAction,
  UserRole,
  VALID_DATA_TYPES,
  VehicleType,
  addDays,
  adminRoleEnum,
  admins,
  applyPaymentStatusUpdate,
  approvalStatus,
  blockedIps,
  buildBrandConfig,
  buildMetadata,
  buildSystemConfig,
  channelPlatform,
  channelType,
  companies,
  companiesRelations,
  companyChannelStatus,
  companyChannels,
  companyChannelsRelations,
  companySettings,
  companySettingsRelations,
  computeAccessLevel,
  computeAllocationTargets,
  computeExpiresAt,
  computePoolSplit,
  conversations,
  conversationsRelations,
  createEncryptor,
  deliveries,
  deliveriesRelations,
  deliveryAllocations,
  deliveryAllocationsRelations,
  deliveryStatus,
  devicePlatform,
  deviceTokens,
  dispatcherRoleEnum,
  dispatchers,
  dispatchersRelations,
  entityType,
  escalatedTo,
  escalationStatus,
  eventLogs,
  eventLogsRelations,
  eventOutbox,
  eventType,
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
  getTotalPaidForDeliveries,
  granularityForWindowDays,
  haversineDistanceKm,
  haversineDistanceMeters,
  idempotencyKeys,
  isBillableTier,
  isTransientHttpError,
  ledgerAdjustmentType,
  ledgerTransactions,
  ledgerTransactionsRelations,
  mergeChannelCounts,
  messageStatus,
  messages,
  messagesRelations,
  metricDomain,
  metricGranularity,
  metrics,
  metricsRelations,
  parseGraphError,
  paymentMethod,
  paymentProvider,
  paymentTransactions,
  phoneVerifications,
  processPaymentAllocation,
  queueService,
  refreshSessions,
  resetAlertCooldownsForTest,
  riderStatus,
  riders,
  ridersRelations,
  safeEnumValue,
  sendAlert,
  senderType,
  shouldBillNow,
  shouldRetryPayment,
  sleep,
  subscriptionStatus,
  subscriptionTier,
  subscriptionTransactions,
  subscriptionTransactionsRelations,
  transactionStatus,
  transactionType,
  transactionsRelations,
  users,
  validateMetadata,
  withRetry
};
