// src/shared/enums/enums.ts
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2['ADMIN'] = 'ADMIN';
  UserRole2['DISPATCHER'] = 'DISPATCHER';
  UserRole2['RIDER'] = 'RIDER';
  return UserRole2;
})(UserRole || {});
var AdminRole = /* @__PURE__ */ ((AdminRole2) => {
  AdminRole2['OPERATOR'] = 'OPERATOR';
  AdminRole2['SUPER_ADMIN'] = 'SUPER_ADMIN';
  return AdminRole2;
})(AdminRole || {});
var DispatcherRole = /* @__PURE__ */ ((DispatcherRole2) => {
  DispatcherRole2['OWNER'] = 'OWNER';
  DispatcherRole2['STAFF'] = 'STAFF';
  return DispatcherRole2;
})(DispatcherRole || {});
var DeliveryStatus = /* @__PURE__ */ ((DeliveryStatus2) => {
  DeliveryStatus2['PENDING'] = 'PENDING';
  DeliveryStatus2['ASSIGNED'] = 'ASSIGNED';
  DeliveryStatus2['IN_TRANSIT'] = 'IN_TRANSIT';
  DeliveryStatus2['DELIVERED'] = 'DELIVERED';
  DeliveryStatus2['CANCELLED'] = 'CANCELLED';
  DeliveryStatus2['FAILED'] = 'FAILED';
  return DeliveryStatus2;
})(DeliveryStatus || {});
var PaymentMethod = /* @__PURE__ */ ((PaymentMethod2) => {
  PaymentMethod2['PREPAID'] = 'PREPAID';
  PaymentMethod2['PAY_ON_DELIVERY'] = 'PAY_ON_DELIVERY';
  return PaymentMethod2;
})(PaymentMethod || {});
var PaymentStatus = /* @__PURE__ */ ((PaymentStatus2) => {
  PaymentStatus2['AWAITING'] = 'AWAITING';
  PaymentStatus2['COMPLETED'] = 'COMPLETED';
  PaymentStatus2['FAILED'] = 'FAILED';
  return PaymentStatus2;
})(PaymentStatus || {});
var RiderStatus = /* @__PURE__ */ ((RiderStatus2) => {
  RiderStatus2['ONLINE'] = 'ONLINE';
  RiderStatus2['OFFLINE'] = 'OFFLINE';
  RiderStatus2['BUSY'] = 'BUSY';
  return RiderStatus2;
})(RiderStatus || {});
var ApprovalStatus = /* @__PURE__ */ ((ApprovalStatus2) => {
  ApprovalStatus2['PENDING'] = 'PENDING';
  ApprovalStatus2['APPROVED'] = 'APPROVED';
  ApprovalStatus2['REJECTED'] = 'REJECTED';
  ApprovalStatus2['SUSPENDED'] = 'SUSPENDED';
  ApprovalStatus2['DISABLED'] = 'DISABLED';
  return ApprovalStatus2;
})(ApprovalStatus || {});
var CompanyAccessLevel = {
  FULL: 'FULL',
  TRIAL: 'TRIAL',
  PAST_DUE: 'PAST_DUE',
  RESTRICTED: 'RESTRICTED',
};
var EntityType = /* @__PURE__ */ ((EntityType2) => {
  EntityType2['USER'] = 'USER';
  EntityType2['DELIVERY'] = 'DELIVERY';
  EntityType2['RIDER'] = 'RIDER';
  EntityType2['COMPANY'] = 'COMPANY';
  EntityType2['DISPATCHER'] = 'DISPATCHER';
  EntityType2['SYSTEM'] = 'SYSTEM';
  EntityType2['COMPANY_CHANNEL'] = 'COMPANY_CHANNEL';
  EntityType2['MESSAGE'] = 'MESSAGE';
  return EntityType2;
})(EntityType || {});
var ChannelPlatform = /* @__PURE__ */ ((ChannelPlatform2) => {
  ChannelPlatform2['WHATSAPP'] = 'WHATSAPP';
  ChannelPlatform2['INSTAGRAM'] = 'INSTAGRAM';
  ChannelPlatform2['FACEBOOK'] = 'FACEBOOK';
  ChannelPlatform2['TIKTOK'] = 'TIKTOK';
  return ChannelPlatform2;
})(ChannelPlatform || {});
var CompanyChannelStatus = /* @__PURE__ */ ((CompanyChannelStatus2) => {
  CompanyChannelStatus2['PENDING'] = 'PENDING';
  CompanyChannelStatus2['ACTIVE'] = 'ACTIVE';
  CompanyChannelStatus2['DEACTIVATED'] = 'DEACTIVATED';
  CompanyChannelStatus2['REJECTED'] = 'REJECTED';
  CompanyChannelStatus2['REMOVED'] = 'REMOVED';
  return CompanyChannelStatus2;
})(CompanyChannelStatus || {});
var NodeEnv = /* @__PURE__ */ ((NodeEnv2) => {
  NodeEnv2['Development'] = 'development';
  NodeEnv2['Production'] = 'production';
  NodeEnv2['Test'] = 'test';
  return NodeEnv2;
})(NodeEnv || {});
var VehicleType = /* @__PURE__ */ ((VehicleType2) => {
  VehicleType2['BIKE'] = 'BIKE';
  return VehicleType2;
})(VehicleType || {});
var SubscriptionTier = /* @__PURE__ */ ((SubscriptionTier2) => {
  SubscriptionTier2['STARTER'] = 'STARTER';
  SubscriptionTier2['PROFESSIONAL'] = 'PROFESSIONAL';
  return SubscriptionTier2;
})(SubscriptionTier || {});
var SubscriptionStatus = /* @__PURE__ */ ((SubscriptionStatus2) => {
  SubscriptionStatus2['TRIAL'] = 'TRIAL';
  SubscriptionStatus2['ACTIVE'] = 'ACTIVE';
  SubscriptionStatus2['CANCELLING'] = 'CANCELLING';
  SubscriptionStatus2['PAST_DUE'] = 'PAST_DUE';
  SubscriptionStatus2['CANCELLED'] = 'CANCELLED';
  return SubscriptionStatus2;
})(SubscriptionStatus || {});
var SubscriptionHealth = /* @__PURE__ */ ((SubscriptionHealth2) => {
  SubscriptionHealth2['HEALTHY'] = 'HEALTHY';
  SubscriptionHealth2['IN_TRIAL'] = 'IN_TRIAL';
  SubscriptionHealth2['PAST_DUE'] = 'PAST_DUE';
  SubscriptionHealth2['EXPIRING_SOON'] = 'EXPIRING_SOON';
  SubscriptionHealth2['CANCELLED'] = 'CANCELLED';
  return SubscriptionHealth2;
})(SubscriptionHealth || {});
var TransactionStatus = /* @__PURE__ */ ((TransactionStatus2) => {
  TransactionStatus2['PENDING'] = 'PENDING';
  TransactionStatus2['SUCCESS'] = 'SUCCESS';
  TransactionStatus2['FAILED'] = 'FAILED';
  TransactionStatus2['REVERSED'] = 'REVERSED';
  return TransactionStatus2;
})(TransactionStatus || {});
var TransactionType = /* @__PURE__ */ ((TransactionType2) => {
  TransactionType2['DELIVERY_PAYMENT'] = 'DELIVERY_PAYMENT';
  TransactionType2['SUBSCRIPTION'] = 'SUBSCRIPTION';
  TransactionType2['ADJUSTMENT'] = 'ADJUSTMENT';
  TransactionType2['SETTLEMENT'] = 'SETTLEMENT';
  TransactionType2['REFUND'] = 'REFUND';
  return TransactionType2;
})(TransactionType || {});
var LedgerAdjustmentType = /* @__PURE__ */ ((LedgerAdjustmentType2) => {
  LedgerAdjustmentType2['CREDIT'] = 'CREDIT';
  LedgerAdjustmentType2['DEBIT'] = 'DEBIT';
  LedgerAdjustmentType2['CORRECTION'] = 'CORRECTION';
  LedgerAdjustmentType2['CHANNEL_FEE'] = 'CHANNEL_FEE';
  LedgerAdjustmentType2['OVERAGE'] = 'OVERAGE';
  LedgerAdjustmentType2['REFUND'] = 'REFUND';
  return LedgerAdjustmentType2;
})(LedgerAdjustmentType || {});
var ChannelType = /* @__PURE__ */ ((ChannelType2) => {
  ChannelType2['SYSTEM_POOL'] = 'SYSTEM_POOL';
  ChannelType2['MY_CHANNEL'] = 'MY_CHANNEL';
  return ChannelType2;
})(ChannelType || {});
var Currency = /* @__PURE__ */ ((Currency2) => {
  Currency2['NGN'] = 'NGN';
  return Currency2;
})(Currency || {});
var PaymentProvider = /* @__PURE__ */ ((PaymentProvider2) => {
  PaymentProvider2['SQUAD'] = 'SQUAD';
  PaymentProvider2['SYSTEM'] = 'SYSTEM';
  return PaymentProvider2;
})(PaymentProvider || {});
var EventType = /* @__PURE__ */ ((EventType2) => {
  EventType2['DELIVERY_ASSIGNED'] = 'DELIVERY_ASSIGNED';
  EventType2['DELIVERY_UPDATED'] = 'DELIVERY_UPDATED';
  EventType2['DELIVERY_CREATED'] = 'DELIVERY_CREATED';
  EventType2['DELIVERY_STATUS_CHANGED'] = 'DELIVERY_STATUS_CHANGED';
  EventType2['DELIVERY_DELETED'] = 'DELIVERY_DELETED';
  EventType2['RIDER_LOCATION_UPDATED'] = 'RIDER_LOCATION_UPDATED';
  EventType2['RIDER_ACCEPTED'] = 'RIDER_ACCEPTED';
  EventType2['RIDER_CREATED'] = 'RIDER_CREATED';
  EventType2['RIDER_UPDATED'] = 'RIDER_UPDATED';
  EventType2['RIDER_STATUS_CHANGED'] = 'RIDER_STATUS_CHANGED';
  EventType2['RIDER_DELETED'] = 'RIDER_DELETED';
  EventType2['RIDER_DOCUMENTS_VERIFIED'] = 'RIDER_DOCUMENTS_VERIFIED';
  EventType2['RIDER_DOCUMENTS_REJECTED'] = 'RIDER_DOCUMENTS_REJECTED';
  EventType2['CHANNEL_SETUP'] = 'CHANNEL_SETUP';
  EventType2['CHANNEL_ACTIVATED'] = 'CHANNEL_ACTIVATED';
  EventType2['CHANNEL_DEACTIVATED'] = 'CHANNEL_DEACTIVATED';
  EventType2['CHANNEL_REJECTED'] = 'CHANNEL_REJECTED';
  EventType2['CHANNEL_REMOVED'] = 'CHANNEL_REMOVED';
  EventType2['SUBSCRIPTION_STATUS_CHANGED'] = 'SUBSCRIPTION_STATUS_CHANGED';
  EventType2['DISPATCHER_CREATED'] = 'DISPATCHER_CREATED';
  EventType2['DISPATCHER_UPDATED'] = 'DISPATCHER_UPDATED';
  EventType2['DISPATCHER_STATUS_CHANGED'] = 'DISPATCHER_STATUS_CHANGED';
  EventType2['DISPATCHER_DELETED'] = 'DISPATCHER_DELETED';
  EventType2['AI_EXECUTION'] = 'AI_EXECUTION';
  EventType2['SECURITY_INCIDENT'] = 'SECURITY_INCIDENT';
  EventType2['ADMIN_PROOF_READ'] = 'ADMIN_PROOF_READ';
  EventType2['ADMIN_DOCUMENT_READ'] = 'ADMIN_DOCUMENT_READ';
  EventType2['COMPANY_ACTIVATED'] = 'COMPANY_ACTIVATED';
  EventType2['COMPANY_DEACTIVATED'] = 'COMPANY_DEACTIVATED';
  EventType2['COMPANY_TIER_CHANGED'] = 'COMPANY_TIER_CHANGED';
  EventType2['COMPANY_VERIFIED'] = 'COMPANY_VERIFIED';
  EventType2['COMPANY_VERIFICATION_REJECTED'] = 'COMPANY_VERIFICATION_REJECTED';
  EventType2['USER_PURGED'] = 'USER_PURGED';
  EventType2['CANCELLED_PAYMENT_TIMEOUT'] = 'CANCELLED_PAYMENT_TIMEOUT';
  EventType2['DOWNGRADE'] = 'DOWNGRADE';
  EventType2['MESSAGE_DELETED'] = 'MESSAGE_DELETED';
  EventType2['LEDGER_ADJUSTED'] = 'LEDGER_ADJUSTED';
  return EventType2;
})(EventType || {});
var SubscriptionEventType = /* @__PURE__ */ ((SubscriptionEventType2) => {
  SubscriptionEventType2['CREATED'] = 'CREATED';
  SubscriptionEventType2['UPDATED'] = 'UPDATED';
  SubscriptionEventType2['DELETED'] = 'DELETED';
  SubscriptionEventType2['ASSIGNED'] = 'ASSIGNED';
  SubscriptionEventType2['STATUS_CHANGED'] = 'STATUS_CHANGED';
  SubscriptionEventType2['UNASSIGNED'] = 'UNASSIGNED';
  return SubscriptionEventType2;
})(SubscriptionEventType || {});
var UserAuditAction = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  PROFILE_UPDATE: 'PROFILE_UPDATE',
  DEACTIVATED: 'DEACTIVATED',
};
var ChannelsUpdateType = /* @__PURE__ */ ((ChannelsUpdateType2) => {
  ChannelsUpdateType2['MESSAGE'] = 'MESSAGE';
  ChannelsUpdateType2['OWNERSHIP'] = 'OWNERSHIP';
  ChannelsUpdateType2['CONVERSATION'] = 'CONVERSATION';
  ChannelsUpdateType2['CHANNEL'] = 'CHANNEL';
  ChannelsUpdateType2['AI_THINKING'] = 'AI_THINKING';
  return ChannelsUpdateType2;
})(ChannelsUpdateType || {});
var MessageStatus = /* @__PURE__ */ ((MessageStatus2) => {
  MessageStatus2['SENT'] = 'SENT';
  MessageStatus2['DELIVERED'] = 'DELIVERED';
  MessageStatus2['READ'] = 'READ';
  MessageStatus2['FAILED'] = 'FAILED';
  return MessageStatus2;
})(MessageStatus || {});
var MESSAGE_STATUS_RANK = {
  ['SENT' /* SENT */]: 1,
  ['DELIVERED' /* DELIVERED */]: 2,
  ['READ' /* READ */]: 3,
  ['FAILED' /* FAILED */]: 4,
};
var EscalationStatus = /* @__PURE__ */ ((EscalationStatus2) => {
  EscalationStatus2['OPEN'] = 'OPEN';
  EscalationStatus2['RESOLVED'] = 'RESOLVED';
  EscalationStatus2['TAKEN_OVER'] = 'TAKEN_OVER';
  return EscalationStatus2;
})(EscalationStatus || {});
var EscalatedTo = /* @__PURE__ */ ((EscalatedTo2) => {
  EscalatedTo2['COMPANY'] = 'COMPANY';
  EscalatedTo2['ADMIN'] = 'ADMIN';
  EscalatedTo2['DISPATCHER'] = 'DISPATCHER';
  return EscalatedTo2;
})(EscalatedTo || {});
var SenderType = /* @__PURE__ */ ((SenderType2) => {
  SenderType2['CUSTOMER'] = 'CUSTOMER';
  SenderType2['AGENT'] = 'AGENT';
  SenderType2['DISPATCHER'] = 'DISPATCHER';
  SenderType2['ADMIN'] = 'ADMIN';
  SenderType2['SYSTEM'] = 'SYSTEM';
  return SenderType2;
})(SenderType || {});
var JobStatus = /* @__PURE__ */ ((JobStatus2) => {
  JobStatus2['PENDING'] = 'PENDING';
  JobStatus2['PROCESSING'] = 'PROCESSING';
  JobStatus2['COMPLETED'] = 'COMPLETED';
  JobStatus2['FAILED'] = 'FAILED';
  JobStatus2['CANCELLED'] = 'CANCELLED';
  return JobStatus2;
})(JobStatus || {});
var SecurityEventType = {
  RATE_LIMIT: 'RATE_LIMIT',
  MALICIOUS_REQUEST: 'MALICIOUS_REQUEST',
  BRUTE_FORCE: 'BRUTE_FORCE',
};
var SecuritySeverity = /* @__PURE__ */ ((SecuritySeverity2) => {
  SecuritySeverity2['LOW'] = 'LOW';
  SecuritySeverity2['MEDIUM'] = 'MEDIUM';
  SecuritySeverity2['HIGH'] = 'HIGH';
  SecuritySeverity2['CRITICAL'] = 'CRITICAL';
  return SecuritySeverity2;
})(SecuritySeverity || {});
var ErrorCode = /* @__PURE__ */ ((ErrorCode2) => {
  ErrorCode2['INTERNAL_SERVER_ERROR'] = 'INTERNAL_SERVER_ERROR';
  ErrorCode2['UNAUTHORIZED'] = 'UNAUTHORIZED';
  ErrorCode2['FORBIDDEN'] = 'FORBIDDEN';
  ErrorCode2['NOT_FOUND'] = 'NOT_FOUND';
  ErrorCode2['VALIDATION_ERROR'] = 'VALIDATION_ERROR';
  ErrorCode2['TOO_MANY_ATTEMPTS'] = 'TOO_MANY_ATTEMPTS';
  ErrorCode2['RATE_LIMIT_EXCEEDED'] = 'RATE_LIMIT_EXCEEDED';
  ErrorCode2['BULK_DELIVERY_CREATION'] = 'BULK_DELIVERY_CREATION';
  ErrorCode2['OPERATIONAL_AVAILABILITY'] = 'OPERATIONAL_AVAILABILITY';
  ErrorCode2['CHAT_PROCESSOR_HYDRATION'] = 'CHAT_PROCESSOR_HYDRATION';
  ErrorCode2['CHAT_PROCESSOR_INFERENCE'] = 'CHAT_PROCESSOR_INFERENCE';
  ErrorCode2['CHAT_PROCESSOR_PIPELINE'] = 'CHAT_PROCESSOR_PIPELINE';
  ErrorCode2['PROVIDER_CONFIG_LOAD'] = 'PROVIDER_CONFIG_LOAD';
  ErrorCode2['PAYMENT_POST_PROCESSING'] = 'PAYMENT_POST_PROCESSING';
  ErrorCode2['LLM_FAILOVER'] = 'LLM_FAILOVER';
  ErrorCode2['INTER_STATE_DELIVERY'] = 'INTER_STATE_DELIVERY';
  ErrorCode2['COMPANY_CLOSED'] = 'COMPANY_CLOSED';
  ErrorCode2['COMPANY_NOT_OPEN_YET'] = 'COMPANY_NOT_OPEN_YET';
  ErrorCode2['COMPANY_NOT_OPERATING_TODAY'] = 'COMPANY_NOT_OPERATING_TODAY';
  ErrorCode2['TIER_LIMIT_EXCEEDED'] = 'TIER_LIMIT_EXCEEDED';
  ErrorCode2['NO_DELIVERIES_PROVIDED'] = 'NO_DELIVERIES_PROVIDED';
  ErrorCode2['INVALID_ACTOR'] = 'INVALID_ACTOR';
  ErrorCode2['CHANNEL_PLATFORM_ID_CONFLICT'] = 'CHANNEL_PLATFORM_ID_CONFLICT';
  ErrorCode2['CHANNEL_ACTIVATION_FAILED'] = 'CHANNEL_ACTIVATION_FAILED';
  ErrorCode2['NETWORK_ERROR'] = 'NETWORK_ERROR';
  ErrorCode2['INVALID'] = 'INVALID';
  ErrorCode2['PIN_REQUIRED'] = 'PIN_REQUIRED';
  ErrorCode2['UNKNOWN'] = 'UNKNOWN';
  return ErrorCode2;
})(ErrorCode || {});
var JobType = /* @__PURE__ */ ((JobType2) => {
  JobType2['DELIVERY_NOTIFICATION'] = 'delivery-notification';
  JobType2['SQUAD_WEBHOOK'] = 'squad-webhook';
  JobType2['EXPORT'] = 'export';
  JobType2['AI_BATCH'] = 'ai:batch';
  return JobType2;
})(JobType || {});
var SystemStatus = /* @__PURE__ */ ((SystemStatus2) => {
  SystemStatus2['UP'] = 'UP';
  SystemStatus2['DOWN'] = 'DOWN';
  SystemStatus2['DEGRADED'] = 'DEGRADED';
  return SystemStatus2;
})(SystemStatus || {});
var LlmRole = /* @__PURE__ */ ((LlmRole2) => {
  LlmRole2['USER'] = 'user';
  LlmRole2['ASSISTANT'] = 'assistant';
  LlmRole2['SYSTEM'] = 'system';
  return LlmRole2;
})(LlmRole || {});
var ProviderRole = /* @__PURE__ */ ((ProviderRole2) => {
  ProviderRole2['INTERPRET'] = 'interpret';
  ProviderRole2['SYNTHESIZE'] = 'synthesize';
  return ProviderRole2;
})(ProviderRole || {});
var ProviderCapability = /* @__PURE__ */ ((ProviderCapability2) => {
  ProviderCapability2['JSON'] = 'json';
  ProviderCapability2['TOOLS'] = 'tools';
  ProviderCapability2['VISION'] = 'vision';
  return ProviderCapability2;
})(ProviderCapability || {});
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2['DEBUG'] = 'debug';
  LogLevel2['INFO'] = 'info';
  LogLevel2['WARN'] = 'warn';
  LogLevel2['ERROR'] = 'error';
  LogLevel2['SILENT'] = 'silent';
  return LogLevel2;
})(LogLevel || {});
var ApiTag = /* @__PURE__ */ ((ApiTag2) => {
  ApiTag2['TRACKING'] = 'Tracking';
  ApiTag2['AUTH'] = 'Auth';
  ApiTag2['CONTACT'] = 'Contact';
  ApiTag2['BILLING'] = 'Billing';
  ApiTag2['ADMIN'] = 'Admin';
  ApiTag2['GRAPHQL'] = 'GraphQL';
  ApiTag2['SYSTEM'] = 'System';
  ApiTag2['ONBOARDING'] = 'Onboarding';
  return ApiTag2;
})(ApiTag || {});
var SseEventType = /* @__PURE__ */ ((SseEventType2) => {
  SseEventType2['CONNECTED'] = 'connected';
  SseEventType2['DELIVERY'] = 'delivery';
  SseEventType2['RIDER'] = 'rider';
  SseEventType2['MESSAGE'] = 'message';
  SseEventType2['INITIAL'] = 'initial';
  SseEventType2['COMPANY'] = 'company';
  SseEventType2['RIDER_LOCATION'] = 'rider-location';
  SseEventType2['TYPING'] = 'typing';
  return SseEventType2;
})(SseEventType || {});
var JwtTokenType = /* @__PURE__ */ ((JwtTokenType2) => {
  JwtTokenType2['ACCESS'] = 'access';
  JwtTokenType2['REFRESH'] = 'refresh';
  return JwtTokenType2;
})(JwtTokenType || {});
var DevicePlatform = /* @__PURE__ */ ((DevicePlatform2) => {
  DevicePlatform2['ANDROID'] = 'ANDROID';
  DevicePlatform2['IOS'] = 'IOS';
  DevicePlatform2['WEB'] = 'WEB';
  return DevicePlatform2;
})(DevicePlatform || {});
var AuditActorType = /* @__PURE__ */ ((AuditActorType2) => {
  AuditActorType2['USER'] = 'USER';
  AuditActorType2['SYSTEM'] = 'SYSTEM';
  AuditActorType2['ANONYMOUS'] = 'ANONYMOUS';
  return AuditActorType2;
})(AuditActorType || {});
var ContactCategory = /* @__PURE__ */ ((ContactCategory2) => {
  ContactCategory2['PARTNERSHIP'] = 'Become a Partner';
  ContactCategory2['BUSINESS'] = 'For Business';
  ContactCategory2['SUPPORT'] = 'Support';
  ContactCategory2['TRACKING_INQUIRY'] = 'Tracking Inquiry';
  ContactCategory2['FEEDBACK'] = 'Feedback';
  return ContactCategory2;
})(ContactCategory || {});
var IdType = /* @__PURE__ */ ((IdType2) => {
  IdType2['NIN'] = 'NIN';
  IdType2['DRIVER_LICENSE'] = 'DRIVER_LICENSE';
  IdType2['PASSPORT'] = 'PASSPORT';
  return IdType2;
})(IdType || {});
var ConversationHandlerType = /* @__PURE__ */ ((ConversationHandlerType2) => {
  ConversationHandlerType2['AI'] = 'AI';
  ConversationHandlerType2['DISPATCHER'] = 'DISPATCHER';
  ConversationHandlerType2['ADMIN'] = 'ADMIN';
  return ConversationHandlerType2;
})(ConversationHandlerType || {});
var ExportDataType = /* @__PURE__ */ ((ExportDataType2) => {
  ExportDataType2['DELIVERIES'] = 'DELIVERIES';
  ExportDataType2['BILLING'] = 'BILLING';
  ExportDataType2['CHAT'] = 'CHAT';
  return ExportDataType2;
})(ExportDataType || {});
var ExportReason = /* @__PURE__ */ ((ExportReason2) => {
  ExportReason2['QUEUED'] = 'QUEUED';
  ExportReason2['DUPLICATE'] = 'DUPLICATE';
  ExportReason2['QUOTA_EXCEEDED'] = 'QUOTA_EXCEEDED';
  return ExportReason2;
})(ExportReason || {});
var FcmNotificationType = /* @__PURE__ */ ((FcmNotificationType2) => {
  FcmNotificationType2['SUBSCRIPTION_CANCELLED'] = 'SUBSCRIPTION_CANCELLED';
  FcmNotificationType2['DELIVERY_ASSIGNED'] = 'DELIVERY_ASSIGNED';
  FcmNotificationType2['COMPANY_STATUS_CHANGED'] = 'COMPANY_STATUS_CHANGED';
  FcmNotificationType2['SETTLEMENT_FAILED'] = 'SETTLEMENT_FAILED';
  FcmNotificationType2['SETTLEMENT_REVERSAL'] = 'SETTLEMENT_REVERSAL';
  FcmNotificationType2['HUMAN_REQUEST'] = 'HUMAN_REQUEST';
  FcmNotificationType2['DELIVERY_ANOMALY'] = 'DELIVERY_ANOMALY';
  FcmNotificationType2['RAPID_STATUS_CHANGES'] = 'RAPID_STATUS_CHANGES';
  FcmNotificationType2['RIDER_SILENT_BAN'] = 'RIDER_SILENT_BAN';
  return FcmNotificationType2;
})(FcmNotificationType || {});
var DeliverySyncScope = /* @__PURE__ */ ((DeliverySyncScope2) => {
  DeliverySyncScope2['RIDER'] = 'RIDER';
  DeliverySyncScope2['COMPANY'] = 'COMPANY';
  return DeliverySyncScope2;
})(DeliverySyncScope || {});
var AdminEscalationAction = /* @__PURE__ */ ((AdminEscalationAction2) => {
  AdminEscalationAction2['TAKE_OVER'] = 'TAKE_OVER';
  AdminEscalationAction2['RESOLVE'] = 'RESOLVE';
  return AdminEscalationAction2;
})(AdminEscalationAction || {});
var NotificationPriority = /* @__PURE__ */ ((NotificationPriority2) => {
  NotificationPriority2['URGENT'] = 'URGENT';
  return NotificationPriority2;
})(NotificationPriority || {});
var DeliveryExpiryReason = {
  STALE_PENDING_DELIVERY: 'STALE_PENDING_DELIVERY',
  SCHEDULED_WINDOW_MISSED: 'SCHEDULED_WINDOW_MISSED',
  RIDER_SILENT: 'RIDER_SILENT',
  IN_TRANSIT_STALL: 'IN_TRANSIT_STALL',
};
var DayOfWeek = /* @__PURE__ */ ((DayOfWeek2) => {
  DayOfWeek2['MONDAY'] = 'Monday';
  DayOfWeek2['TUESDAY'] = 'Tuesday';
  DayOfWeek2['WEDNESDAY'] = 'Wednesday';
  DayOfWeek2['THURSDAY'] = 'Thursday';
  DayOfWeek2['FRIDAY'] = 'Friday';
  DayOfWeek2['SATURDAY'] = 'Saturday';
  DayOfWeek2['SUNDAY'] = 'Sunday';
  return DayOfWeek2;
})(DayOfWeek || {});
var MetricDomain = /* @__PURE__ */ ((MetricDomain2) => {
  MetricDomain2['DELIVERIES'] = 'DELIVERIES';
  MetricDomain2['CONVERSATIONS'] = 'CONVERSATIONS';
  MetricDomain2['RIDERS'] = 'RIDERS';
  MetricDomain2['REVENUE'] = 'REVENUE';
  return MetricDomain2;
})(MetricDomain || {});
var MetricGranularity = /* @__PURE__ */ ((MetricGranularity2) => {
  MetricGranularity2['DAY'] = 'DAY';
  MetricGranularity2['WEEK'] = 'WEEK';
  MetricGranularity2['MONTH'] = 'MONTH';
  MetricGranularity2['LIFETIME'] = 'LIFETIME';
  return MetricGranularity2;
})(MetricGranularity || {});
var ALL_DAYS = Object.values(DayOfWeek);
var LEAD_CATEGORIES = /* @__PURE__ */ new Set([
  'Become a Partner' /* PARTNERSHIP */,
  'For Business' /* BUSINESS */,
]);
var CAC_EVIDENCE_STATUS = {
  FOUND: 'FOUND',
  INACTIVE: 'INACTIVE',
  NOT_FOUND: 'NOT_FOUND',
  ERROR: 'ERROR',
};
function safeEnumValue(enumObj, value) {
  const values = Object.values(enumObj);
  return values.includes(value) ? value : void 0;
}

// src/shared/config/system.config.ts
var DELETED_USER_SENTINEL = 'DELETED_USER';
var SYSTEM_ACTOR_ID = 'system';
var ADMIN_ACTOR_ID = 'admin';
var DEFAULT_WORKING_HOURS = {
  ['Monday' /* MONDAY */]: { start: '07:00', close: '19:00' },
  ['Tuesday' /* TUESDAY */]: { start: '07:00', close: '19:00' },
  ['Wednesday' /* WEDNESDAY */]: { start: '07:00', close: '19:00' },
  ['Thursday' /* THURSDAY */]: { start: '07:00', close: '19:00' },
  ['Friday' /* FRIDAY */]: { start: '07:00', close: '19:00' },
  ['Saturday' /* SATURDAY */]: { start: '07:00', close: '19:00' },
};
function buildSystemConfig(overrides = {}) {
  const emailDomain = overrides.emailDomain ?? '';
  return {
    jwtIssuer: overrides.jwtIssuer ?? '',
    customerBaseUrl: overrides.customerBaseUrl ?? '',
    businessBaseUrl: overrides.businessBaseUrl ?? '',
    emailDomain,
    supportEmail: overrides.supportEmail ?? (emailDomain ? `contact@${emailDomain}` : ''),
    paymentsEmail: overrides.paymentsEmail ?? (emailDomain ? `payments@${emailDomain}` : ''),
    brandName: overrides.brandName ?? process.env.BRAND_NAME ?? 'Logistix',
  };
}
var _systemConfig = null;
function getSystemConfig() {
  if (!_systemConfig) {
    _systemConfig = buildSystemConfig({
      ...(process.env.EMAIL_DOMAIN ? { emailDomain: process.env.EMAIL_DOMAIN } : {}),
      ...(process.env.BRAND_NAME ? { brandName: process.env.BRAND_NAME } : {}),
    });
  }
  return _systemConfig;
}
var _brandName = null;
function getBrandName() {
  if (_brandName === null) _brandName = getSystemConfig().brandName;
  return _brandName;
}
var BRAND_NAME = getBrandName();

// src/shared/config/regional.config.ts
var rawRegionalConfig = {
  // Phone dialing code (ITU-T E.164), NOT ISO 3166-1 alpha-2 country code
  defaultCountryCode: '234',
  // ISO 3166-1 alpha-2 country code
  defaultIsoCountryCode: 'ng',
  timeZone: 'Africa/Lagos',
  currencySymbol: '\u20A6',
  states: [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'Federal Capital Territory',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ],
};
var REGIONAL_CONFIG = rawRegionalConfig;
var REGIONAL_LOCALE = 'en-NG';
var HQ_LOCATION = 'Lagos, Nigeria';

// src/shared/config/retention.config.ts
import { z } from 'zod';
var retentionConfigSchema = z.object({
  accountPurgeRetentionDays: z.number(),
  companyPurgeRetentionDays: z.number(),
  lockedCompanyPurgeRetentionDays: z.number(),
  eventLogRetentionMonths: z.number(),
});
var rawRetentionConfig = {
  accountPurgeRetentionDays: 90,
  // Matches account purge — no reason to keep deactivated companies 2× longer
  companyPurgeRetentionDays: 90,
  lockedCompanyPurgeRetentionDays: 30,
  eventLogRetentionMonths: 12,
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
  ['STARTER' /* STARTER */]: 1,
  ['PROFESSIONAL' /* PROFESSIONAL */]: 3,
};
var CHANNEL_FEES = {
  ['SYSTEM_POOL' /* SYSTEM_POOL */]: 2e4,
  // ₦200 — covers network number + routing + AI
  ['MY_CHANNEL' /* MY_CHANNEL */]: 2e4,
  // ₦200 — covers AI only
};
var DEDICATED_TIERS = ['PROFESSIONAL' /* PROFESSIONAL */];
var SUPPORT_SLA = {
  ['STARTER' /* STARTER */]: 'Email (48hr SLA)',
  ['PROFESSIONAL' /* PROFESSIONAL */]: 'Priority (4hr SLA)',
};
var BILLING_CONFIG = {
  /**
   * Currency to use across the system
   */
  CURRENCY: 'NGN' /* NGN */,
  /**
   * Monthly subscription pricing (in Kobo — single currency unit)
   * ₦15,000 = 1_500_000 kobo, ₦30,000 = 3_000_000 kobo.
   */
  PRICING: {
    ['STARTER' /* STARTER */]: 15e5,
    // ₦15,000
    ['PROFESSIONAL' /* PROFESSIONAL */]: 3e6,
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
    ownerShareKobo: 5e4,
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
    INTERVALS_DAYS: [1, 3, 7],
  },
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
function computeAccessLevel(verificationStatus, subscriptionStatus, periodEnd = null, opts = {}) {
  if (verificationStatus !== 'APPROVED' /* APPROVED */) {
    return CompanyAccessLevel.RESTRICTED;
  }
  if (subscriptionStatus === 'ACTIVE' /* ACTIVE */) {
    return CompanyAccessLevel.FULL;
  }
  if (subscriptionStatus === 'TRIAL' /* TRIAL */) {
    return CompanyAccessLevel.TRIAL;
  }
  if (subscriptionStatus === 'PAST_DUE' /* PAST_DUE */) {
    return CompanyAccessLevel.PAST_DUE;
  }
  if (subscriptionStatus === 'CANCELLING' /* CANCELLING */) {
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
  chunkSize: 100,
};
var LIMITS_CONFIG = rawLimitsConfig;
var PAGINATION_CONFIG = {
  /** Default page size for regular API / GraphQL queries. */
  DEFAULT_LIMIT: 20,
  /** Admin-specific page size (admins typically need larger result sets). */
  ADMIN_DEFAULT_LIMIT: 50,
};
var TIER_LIMITS = {
  ['STARTER' /* STARTER */]: {
    maxAIDeliveriesPerAction: 20,
    maxBulkDeliveries: 20,
    maxTrackingHistory: 50,
    retentionMonths: DATA_RETENTION['STARTER' /* STARTER */],
    maxDispatchers: 2,
    maxRiders: 20,
    maxDeliveriesPerMonth: 500,
    maxActiveDeliveries: 20,
    maxExportsPerDay: 2,
    maxExportsPerMonth: 10,
  },
  ['PROFESSIONAL' /* PROFESSIONAL */]: {
    maxAIDeliveriesPerAction: 50,
    maxBulkDeliveries: 100,
    maxTrackingHistory: 100,
    retentionMonths: DATA_RETENTION['PROFESSIONAL' /* PROFESSIONAL */],
    maxDispatchers: 10,
    maxRiders: 100,
    maxDeliveriesPerMonth: 5e3,
    maxActiveDeliveries: 50,
    maxExportsPerDay: 5,
    maxExportsPerMonth: 30,
  },
};
function getTierLimits(tier) {
  const limits = TIER_LIMITS[tier];
  if (limits === void 0) throw new Error(`[Limits] Unknown subscription tier: ${tier}`);
  return limits;
}

// src/shared/config/service.config.ts
var FCM_SERVICE_CONFIG = {
  // OAuth access tokens: valid for 1 hour, refreshed 5 minutes early.
  tokenLifetimeMs: 36e5,
  tokenBufferMs: 5 * 6e4,
  tokenExpirySeconds: 3600,
  // JWT `exp` claim in seconds
  // Max messages sent concurrently per batch (`sendBatch`).
  sendChunkSize: 10,
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
  retryBackoffMaxMs: 6e4,
};

// src/shared/utils/fetch-with-timeout.ts
var DEFAULT_TIMEOUT_MS = LIMITS_CONFIG.externalApiTimeoutMs;
async function fetchWithTimeout(url, options = {}) {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, fetch: fetchFn = globalThis.fetch, ...rest } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  if (typeof timer === 'object' && typeof timer.unref === 'function') timer.unref();
  try {
    const res = await fetchFn(url, { ...rest, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

// src/shared/utils/error-utils.ts
function extractErrorContext(error) {
  return {
    error: extractErrorMessage(error),
    stack: error instanceof Error ? error.stack : void 0,
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
    return parts.join(' | ');
  }
  if (typeof error === 'string') return error;
  return String(error);
}

// src/shared/utils/retry.ts
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var RETRYABLE_NETWORK_ERROR_CODES = /* @__PURE__ */ new Set([
  'ECONNRESET',
  'ETIMEDOUT',
  'EPIPE',
  'ECONNREFUSED',
  'ECONNABORTED',
  'EAI_AGAIN',
]);
var RETRYABLE_SQLSTATE_CODES = /* @__PURE__ */ new Set([
  '08000',
  '08003',
  '08006',
  '57P03',
  '53300',
]);
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
  const msg = (err.message ?? '').toLowerCase();
  const code = (err.code ?? '').toUpperCase();
  if (status >= 500 && status <= 599) return true;
  if (status === 429) return true;
  if (RETRYABLE_NETWORK_ERROR_CODES.has(code)) return true;
  if (code === 'UND_ERR_CONNECT_TIMEOUT' || code === 'UND_ERR_HEADERS_TIMEOUT') return true;
  if (
    msg.includes('etimedout') ||
    msg.includes('econnrefused') ||
    msg.includes('econnreset') ||
    msg.includes('econnaborted') ||
    msg.includes('eai_again') ||
    msg.includes('timeout of')
  )
    return true;
  return false;
}
function hasTransientSignature(error, seen) {
  if (typeof error !== 'object' || error === null) return false;
  if (seen.has(error)) return false;
  seen.add(error);
  const err = error;
  if (classifyTransientError(err)) return true;
  if (typeof err.cause === 'object' && err.cause !== null) {
    return hasTransientSignature(err.cause, seen);
  }
  return false;
}
function isTransientHttpError(error) {
  return hasTransientSignature(error, /* @__PURE__ */ new Set());
}

export {
  UserRole,
  AdminRole,
  DispatcherRole,
  DeliveryStatus,
  PaymentMethod,
  PaymentStatus,
  RiderStatus,
  ApprovalStatus,
  CompanyAccessLevel,
  EntityType,
  ChannelPlatform,
  CompanyChannelStatus,
  NodeEnv,
  VehicleType,
  SubscriptionTier,
  SubscriptionStatus,
  SubscriptionHealth,
  TransactionStatus,
  TransactionType,
  LedgerAdjustmentType,
  ChannelType,
  Currency,
  PaymentProvider,
  EventType,
  SubscriptionEventType,
  UserAuditAction,
  ChannelsUpdateType,
  MessageStatus,
  MESSAGE_STATUS_RANK,
  EscalationStatus,
  EscalatedTo,
  SenderType,
  JobStatus,
  SecurityEventType,
  SecuritySeverity,
  ErrorCode,
  JobType,
  SystemStatus,
  LlmRole,
  ProviderRole,
  ProviderCapability,
  LogLevel,
  ApiTag,
  SseEventType,
  JwtTokenType,
  DevicePlatform,
  AuditActorType,
  ContactCategory,
  IdType,
  ConversationHandlerType,
  ExportDataType,
  ExportReason,
  FcmNotificationType,
  DeliverySyncScope,
  AdminEscalationAction,
  NotificationPriority,
  DeliveryExpiryReason,
  DayOfWeek,
  MetricDomain,
  MetricGranularity,
  ALL_DAYS,
  LEAD_CATEGORIES,
  CAC_EVIDENCE_STATUS,
  safeEnumValue,
  DELETED_USER_SENTINEL,
  SYSTEM_ACTOR_ID,
  ADMIN_ACTOR_ID,
  DEFAULT_WORKING_HOURS,
  buildSystemConfig,
  BRAND_NAME,
  REGIONAL_CONFIG,
  REGIONAL_LOCALE,
  HQ_LOCATION,
  RETENTION_CONFIG,
  FIVE_MINUTES_MS,
  FIFTEEN_MINUTES_MS,
  MS_PER_DAY,
  addDays,
  KOBO_PER_NAIRA,
  DATA_RETENTION,
  CHANNEL_FEES,
  DEDICATED_TIERS,
  SUPPORT_SLA,
  BILLING_CONFIG,
  getSubscriptionPrice,
  formatAmount,
  isBillableTier,
  shouldBillNow,
  shouldRetryPayment,
  computeAccessLevel,
  DEFAULT_MESSAGE_LIMIT,
  LIMITS_CONFIG,
  PAGINATION_CONFIG,
  TIER_LIMITS,
  getTierLimits,
  FCM_SERVICE_CONFIG,
  QUEUE_SERVICE_CONFIG,
  fetchWithTimeout,
  extractErrorContext,
  extractErrorMessage,
  sleep,
  RETRYABLE_NETWORK_ERROR_CODES,
  RETRYABLE_SQLSTATE_CODES,
  withRetry,
  isTransientHttpError,
};
