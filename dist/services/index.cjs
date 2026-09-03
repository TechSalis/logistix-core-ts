"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/index.ts
var services_exports = {};
__export(services_exports, {
  EmailService: () => EmailService,
  FcmService: () => FcmService,
  PermanentJobError: () => PermanentJobError,
  SquadClient: () => SquadClient,
  SquadRequestError: () => SquadRequestError,
  adminRoleEnum: () => adminRoleEnum,
  admins: () => admins,
  applyPaymentStatusUpdate: () => applyPaymentStatusUpdate,
  approvalStatus: () => approvalStatus,
  blockedIps: () => blockedIps,
  buildSmtpConfig: () => buildSmtpConfig,
  channelPlatform: () => channelPlatform,
  channelType: () => channelType,
  companies: () => companies,
  companiesRelations: () => companiesRelations,
  companyChannelStatus: () => companyChannelStatus,
  companyChannels: () => companyChannels,
  companyChannelsRelations: () => companyChannelsRelations,
  companySettings: () => companySettings,
  companySettingsRelations: () => companySettingsRelations,
  computeAllocationTargets: () => computeAllocationTargets,
  computePoolSplit: () => computePoolSplit,
  conversations: () => conversations,
  conversationsRelations: () => conversationsRelations,
  createEncryptor: () => createEncryptor,
  deliveries: () => deliveries,
  deliveriesRelations: () => deliveriesRelations,
  deliveryAllocations: () => deliveryAllocations,
  deliveryAllocationsRelations: () => deliveryAllocationsRelations,
  deliveryStatus: () => deliveryStatus,
  devicePlatform: () => devicePlatform,
  deviceTokens: () => deviceTokens,
  dispatcherRoleEnum: () => dispatcherRoleEnum,
  dispatchers: () => dispatchers,
  dispatchersRelations: () => dispatchersRelations,
  entityType: () => entityType,
  escalatedTo: () => escalatedTo,
  escalationStatus: () => escalationStatus,
  eventLogs: () => eventLogs,
  eventLogsRelations: () => eventLogsRelations,
  eventOutbox: () => eventOutbox,
  eventType: () => eventType,
  getTotalPaidForDeliveries: () => getTotalPaidForDeliveries,
  idempotencyKeys: () => idempotencyKeys,
  ledgerAdjustmentType: () => ledgerAdjustmentType,
  ledgerTransactions: () => ledgerTransactions,
  ledgerTransactionsRelations: () => ledgerTransactionsRelations,
  messageStatus: () => messageStatus,
  messages: () => messages,
  messagesRelations: () => messagesRelations,
  metricDomain: () => metricDomain,
  metricGranularity: () => metricGranularity,
  metrics: () => metrics,
  metricsRelations: () => metricsRelations,
  paymentMethod: () => paymentMethod,
  paymentProvider: () => paymentProvider,
  paymentTransactions: () => paymentTransactions,
  phoneVerifications: () => phoneVerifications,
  processPaymentAllocation: () => processPaymentAllocation,
  queueService: () => queueService,
  refreshSessions: () => refreshSessions,
  resetAlertCooldownsForTest: () => resetAlertCooldownsForTest,
  riderStatus: () => riderStatus,
  riders: () => riders,
  ridersRelations: () => ridersRelations,
  sendAlert: () => sendAlert,
  senderType: () => senderType,
  subscriptionStatus: () => subscriptionStatus,
  subscriptionTier: () => subscriptionTier,
  subscriptionTransactions: () => subscriptionTransactions,
  subscriptionTransactionsRelations: () => subscriptionTransactionsRelations,
  transactionStatus: () => transactionStatus,
  transactionType: () => transactionType,
  transactionsRelations: () => transactionsRelations,
  users: () => users
});
module.exports = __toCommonJS(services_exports);

// src/services/drizzle/schema.ts
var import_node_crypto = require("crypto");
var import_pg_core = require("drizzle-orm/pg-core");
var import_drizzle_orm = require("drizzle-orm");

// src/shared/enums/enums.ts
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
  DeliveryStatus2["PICKED_UP"] = "PICKED_UP";
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
  RiderStatus2["SUSPENDED"] = "SUSPENDED";
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
var MessageStatus = /* @__PURE__ */ ((MessageStatus2) => {
  MessageStatus2["SENT"] = "SENT";
  MessageStatus2["DELIVERED"] = "DELIVERED";
  MessageStatus2["READ"] = "READ";
  MessageStatus2["FAILED"] = "FAILED";
  return MessageStatus2;
})(MessageStatus || {});
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
var DevicePlatform = /* @__PURE__ */ ((DevicePlatform2) => {
  DevicePlatform2["ANDROID"] = "ANDROID";
  DevicePlatform2["IOS"] = "IOS";
  DevicePlatform2["WEB"] = "WEB";
  return DevicePlatform2;
})(DevicePlatform || {});
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

// src/shared/config/system.config.ts
var DEFAULT_WORKING_HOURS = {
  ["Monday" /* MONDAY */]: { start: "07:00", close: "19:00" },
  ["Tuesday" /* TUESDAY */]: { start: "07:00", close: "19:00" },
  ["Wednesday" /* WEDNESDAY */]: { start: "07:00", close: "19:00" },
  ["Thursday" /* THURSDAY */]: { start: "07:00", close: "19:00" },
  ["Friday" /* FRIDAY */]: { start: "07:00", close: "19:00" },
  ["Saturday" /* SATURDAY */]: { start: "07:00", close: "19:00" }
};

// src/services/drizzle/schema.ts
var createId = () => (0, import_node_crypto.randomUUID)();
var enumValues = (e) => Object.values(e);
var deliveryStatus = (0, import_pg_core.pgEnum)("DeliveryStatus", enumValues(DeliveryStatus));
var ledgerAdjustmentType = (0, import_pg_core.pgEnum)(
  "LedgerAdjustmentType",
  enumValues(LedgerAdjustmentType)
);
var channelPlatform = (0, import_pg_core.pgEnum)("ChannelPlatform", enumValues(ChannelPlatform));
var companyChannelStatus = (0, import_pg_core.pgEnum)(
  "CompanyChannelStatus",
  enumValues(CompanyChannelStatus)
);
var messageStatus = (0, import_pg_core.pgEnum)("MessageStatus", enumValues(MessageStatus));
var paymentMethod = (0, import_pg_core.pgEnum)("PaymentMethod", enumValues(PaymentMethod));
var approvalStatus = (0, import_pg_core.pgEnum)("ApprovalStatus", enumValues(ApprovalStatus));
var riderStatus = (0, import_pg_core.pgEnum)("RiderStatus", enumValues(RiderStatus));
var senderType = (0, import_pg_core.pgEnum)("SenderType", enumValues(SenderType));
var subscriptionTier = (0, import_pg_core.pgEnum)("SubscriptionTier", enumValues(SubscriptionTier));
var transactionStatus = (0, import_pg_core.pgEnum)("TransactionStatus", enumValues(TransactionStatus));
var transactionType = (0, import_pg_core.pgEnum)("TransactionType", enumValues(TransactionType));
var paymentProvider = (0, import_pg_core.pgEnum)("PaymentProvider", enumValues(PaymentProvider));
var subscriptionStatus = (0, import_pg_core.pgEnum)("SubscriptionStatus", enumValues(SubscriptionStatus));
var channelType = (0, import_pg_core.pgEnum)("ChannelType", enumValues(ChannelType));
var escalatedTo = (0, import_pg_core.pgEnum)("EscalatedTo", enumValues(EscalatedTo));
var escalationStatus = (0, import_pg_core.pgEnum)("EscalationStatus", enumValues(EscalationStatus));
var eventType = (0, import_pg_core.pgEnum)("EventType", enumValues(EventType));
var entityType = (0, import_pg_core.pgEnum)("EntityType", enumValues(EntityType));
var adminRoleEnum = (0, import_pg_core.pgEnum)("AdminRole", enumValues(AdminRole));
var dispatcherRoleEnum = (0, import_pg_core.pgEnum)("DispatcherRole", enumValues(DispatcherRole));
var metricDomain = (0, import_pg_core.pgEnum)("MetricDomain", enumValues(MetricDomain));
var metricGranularity = (0, import_pg_core.pgEnum)("MetricGranularity", enumValues(MetricGranularity));
var devicePlatform = (0, import_pg_core.pgEnum)("DevicePlatform", enumValues(DevicePlatform));
var authSchema = (0, import_pg_core.pgSchema)("auth");
var users = authSchema.table("users", {
  id: (0, import_pg_core.text)().primaryKey().notNull(),
  phoneVerifiedAt: (0, import_pg_core.timestamp)("phone_verified_at", { precision: 3, mode: "date" })
});
var companies = (0, import_pg_core.pgTable)(
  "companies",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    name: (0, import_pg_core.text)(),
    cac: (0, import_pg_core.text)(),
    nipostLicenseNumber: (0, import_pg_core.text)("nipost_license_number"),
    contactPhone: (0, import_pg_core.text)("contact_phone"),
    verificationStatus: approvalStatus("verification_status").default("PENDING" /* PENDING */).notNull(),
    metadata: (0, import_pg_core.jsonb)(),
    deactivatedAt: (0, import_pg_core.timestamp)("deactivated_at", { precision: 3, mode: "date" }),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("companies_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
    (0, import_pg_core.index)("companies_verification_status_idx").using(
      "btree",
      table.verificationStatus.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.uniqueIndex)("companies_cac_key").on(table.cac)
  ]
);
var companySettings = (0, import_pg_core.pgTable)(
  "company_settings",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: (0, import_pg_core.text)("company_id").notNull(),
    tier: subscriptionTier().notNull(),
    subscriptionStatus: subscriptionStatus("subscription_status").default("TRIAL" /* TRIAL */).notNull(),
    periodStart: (0, import_pg_core.timestamp)("period_start", { precision: 3, mode: "date" }),
    periodEnd: (0, import_pg_core.timestamp)("period_end", { precision: 3, mode: "date" }),
    squadTokenId: (0, import_pg_core.text)("squad_token_id"),
    workingHours: (0, import_pg_core.jsonb)("working_hours").default(DEFAULT_WORKING_HOURS).notNull(),
    bankDetails: (0, import_pg_core.jsonb)("bank_details"),
    ledgerBalance: (0, import_pg_core.doublePrecision)("ledger_balance").default(0).notNull(),
    companyCode: (0, import_pg_core.text)("company_code"),
    escalatedTo: escalatedTo("escalated_to").default("COMPANY" /* COMPANY */).notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    autoAcceptTeam: (0, import_pg_core.boolean)("auto_accept_team").default(false).notNull(),
    states: (0, import_pg_core.text)().array().default([]),
    interstateDeliveries: (0, import_pg_core.boolean)("interstate_deliveries").default(false).notNull(),
    metadata: (0, import_pg_core.jsonb)().default({}).notNull()
  },
  (table) => [
    (0, import_pg_core.uniqueIndex)("company_settings_company_id_key").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.uniqueIndex)("company_settings_company_code_key").using(
      "btree",
      table.companyCode.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("company_settings_subscription_status_idx").using(
      "btree",
      table.subscriptionStatus.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "company_settings_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var companyChannels = (0, import_pg_core.pgTable)(
  "company_channels",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    platform: channelPlatform().notNull(),
    platformId: (0, import_pg_core.text)("platform_id").notNull(),
    companyId: (0, import_pg_core.text)("company_id").notNull(),
    status: companyChannelStatus("status").notNull(),
    metadata: (0, import_pg_core.jsonb)(),
    aiDisabled: (0, import_pg_core.boolean)("ai_disabled").default(false).notNull(),
    rejectionReason: (0, import_pg_core.text)("rejection_reason"),
    rejectedAt: (0, import_pg_core.timestamp)("rejected_at", { precision: 3, mode: "date" }),
    removedAt: (0, import_pg_core.timestamp)("removed_at", { precision: 3, mode: "date" }),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("company_channels_status_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.index)("company_channels_company_id_status_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.uniqueIndex)("company_channels_platform_company_id_key").using(
      "btree",
      table.platform.asc().nullsLast().op("enum_ops"),
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.uniqueIndex)("company_channels_platform_platform_id_key").using(
      "btree",
      table.platform.asc().nullsLast().op("enum_ops"),
      table.platformId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "company_channels_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);
var conversations = (0, import_pg_core.pgTable)(
  "conversations",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    platform: channelPlatform().notNull(),
    platformId: (0, import_pg_core.text)("platform_id").notNull(),
    companyId: (0, import_pg_core.text)("company_id"),
    lastMessageAt: (0, import_pg_core.timestamp)("last_message_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, import_pg_core.timestamp)("updated_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
    escalatedAt: (0, import_pg_core.timestamp)("escalated_at", { precision: 3, mode: "date" }),
    escalationStatus: escalationStatus("escalation_status"),
    escalatedTo: escalatedTo("escalated_to"),
    escalatedBy: (0, import_pg_core.text)("escalated_by"),
    resolvedAt: (0, import_pg_core.timestamp)("resolved_at", { precision: 3, mode: "date" }),
    resolution: (0, import_pg_core.jsonb)("resolution"),
    metadata: (0, import_pg_core.jsonb)(),
    channelType: channelType("channel_type").notNull(),
    lastCustomerMessageAt: (0, import_pg_core.timestamp)("last_customer_message_at", { precision: 3, mode: "date" }),
    memory: (0, import_pg_core.jsonb)(),
    handledBy: (0, import_pg_core.text)("handled_by"),
    handledByType: (0, import_pg_core.text)("handled_by_type").$type().notNull(),
    handledAt: (0, import_pg_core.timestamp)("handled_at", { precision: 3, mode: "date" })
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
    // NULLS NOT DISTINCT (PG15): lets ON CONFLICT infer the arbiter for
    // null-company (unowned/pool) conversation rows, making first-touch
    // upserts atomic.
    (0, import_pg_core.unique)("conversations_platform_platform_id_company_id_key").on(table.platform, table.platformId, table.companyId).nullsNotDistinct(),
    (0, import_pg_core.index)("conversations_handled_by_type_idx").using(
      "btree",
      table.handledByType.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("conversations_channel_type_idx").using(
      "btree",
      table.channelType.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.index)("conversations_escalated_at_idx").using(
      "btree",
      table.escalatedAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("conversations_escalation_status_idx").on(table.escalationStatus.asc().nullsLast().op("enum_ops")).where(import_drizzle_orm.sql`${table.escalationStatus} IS NOT NULL`),
    (0, import_pg_core.index)("conversations_last_message_at_idx").using(
      "btree",
      table.lastMessageAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("conversations_metadata_gin").using("gin", table.metadata),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "conversations_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade"),
    (0, import_pg_core.check)(
      "conversations_handled_by_type_check",
      import_drizzle_orm.sql`${table.handledByType} IN ('AI','DISPATCHER','ADMIN')`
    )
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
    status: messageStatus().default("SENT" /* SENT */).notNull(),
    actionType: (0, import_pg_core.text)("action_type"),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, import_pg_core.timestamp)("updated_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("messages_conversation_id_created_at_idx").using(
      "btree",
      table.conversationId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.uniqueIndex)("messages_external_id_key").using(
      "btree",
      table.externalId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("messages_reply_to_external_id_idx").using(
      "btree",
      table.replyToExternalId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("messages_action_type_idx").using("btree", table.actionType.asc().nullsLast()),
    (0, import_pg_core.index)("messages_conversation_id_is_deleted_idx").using(
      "btree",
      table.conversationId.asc().nullsLast().op("text_ops"),
      table.isDeleted.asc().nullsLast().op("bool_ops")
    ),
    (0, import_pg_core.index)("messages_created_at_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
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
    role: adminRoleEnum("role").notNull(),
    deactivatedAt: (0, import_pg_core.timestamp)("deactivated_at", { precision: 3, mode: "date" }),
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
    role: dispatcherRoleEnum("role").notNull(),
    approvalStatus: approvalStatus("approval_status").default("PENDING" /* PENDING */).notNull(),
    deactivatedAt: (0, import_pg_core.timestamp)("deactivated_at", { precision: 3, mode: "date" }),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, import_pg_core.timestamp)("updated_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("dispatchers_company_id_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("dispatchers_company_id_updated_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.updatedAt.asc().nullsLast().op("timestamp_ops")
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
    userId: (0, import_pg_core.text)("user_id"),
    reason: (0, import_pg_core.text)(),
    blockedBy: (0, import_pg_core.text)("blocked_by"),
    expiresAt: (0, import_pg_core.timestamp)("expires_at", { precision: 3, mode: "date" }),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("blocked_ips_expires_at_idx").using(
      "btree",
      table.expiresAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.uniqueIndex)("blocked_ips_ip_address_idx").using(
      "btree",
      table.ipAddress.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("blocked_ips_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops"))
  ]
);
var phoneVerifications = (0, import_pg_core.pgTable)("phone_verifications", {
  userId: (0, import_pg_core.text)("user_id").primaryKey().notNull(),
  phone: (0, import_pg_core.text)("phone").notNull(),
  verifiedAt: (0, import_pg_core.timestamp)("verified_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
});
var refreshSessions = (0, import_pg_core.pgTable)(
  "refresh_sessions",
  {
    jti: (0, import_pg_core.text)("jti").primaryKey().notNull(),
    userId: (0, import_pg_core.text)("user_id").notNull(),
    deviceId: (0, import_pg_core.text)("device_id").notNull(),
    tokenHash: (0, import_pg_core.text)("token_hash").notNull(),
    issuedAt: (0, import_pg_core.timestamp)("issued_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    expiresAt: (0, import_pg_core.timestamp)("expires_at", { precision: 3, mode: "date" }).notNull(),
    lastActiveAt: (0, import_pg_core.timestamp)("last_active_at", { precision: 3, mode: "date" }),
    revokedAt: (0, import_pg_core.timestamp)("revoked_at", { precision: 3, mode: "date" }),
    replacedBy: (0, import_pg_core.text)("replaced_by")
  },
  (table) => [
    (0, import_pg_core.index)("refresh_sessions_user_id_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops")
    )
  ]
);
var deviceTokens = (0, import_pg_core.pgTable)(
  "device_tokens",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    userId: (0, import_pg_core.text)("user_id").notNull(),
    deviceId: (0, import_pg_core.text)("device_id").notNull(),
    platform: devicePlatform("platform").notNull(),
    fcmToken: (0, import_pg_core.text)("fcm_token"),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, import_pg_core.timestamp)("updated_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.uniqueIndex)("device_tokens_user_id_device_id_key").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
      table.deviceId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.uniqueIndex)("device_tokens_fcm_token_key").using(
      "btree",
      table.fcmToken.asc().nullsLast().op("text_ops")
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
    pickupState: (0, import_pg_core.text)("pickup_state"),
    dropOffAddress: (0, import_pg_core.text)("drop_off_address").notNull(),
    dropOffState: (0, import_pg_core.text)("drop_off_state"),
    description: (0, import_pg_core.text)(),
    pickupLat: (0, import_pg_core.doublePrecision)("pickup_lat"),
    pickupLng: (0, import_pg_core.doublePrecision)("pickup_lng"),
    dropOffLat: (0, import_pg_core.doublePrecision)("drop_off_lat"),
    dropOffLng: (0, import_pg_core.doublePrecision)("drop_off_lng"),
    pickupPhone: (0, import_pg_core.text)("pickup_phone"),
    dropOffPhone: (0, import_pg_core.text)("drop_off_phone"),
    paymentMethod: paymentMethod("payment_method").notNull(),
    scheduledAt: (0, import_pg_core.timestamp)("scheduled_at", { precision: 3, mode: "date" }),
    scheduledAtEnd: (0, import_pg_core.timestamp)("scheduled_at_end", { precision: 3, mode: "date" }),
    assignedAt: (0, import_pg_core.timestamp)("assigned_at", { precision: 3, mode: "date" }),
    deliveredAt: (0, import_pg_core.timestamp)("delivered_at", { precision: 3, mode: "date" }),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, import_pg_core.timestamp)("updated_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
    trackingId: (0, import_pg_core.text)("tracking_id").notNull(),
    pin: (0, import_pg_core.text)(),
    price: (0, import_pg_core.doublePrecision)(),
    metadata: (0, import_pg_core.jsonb)(),
    creatorPlatform: (0, import_pg_core.text)("creator_platform").$type(),
    pool: (0, import_pg_core.boolean)().default(false).notNull(),
    vehicleType: (0, import_pg_core.text)("vehicle_type").default("BIKE" /* BIKE */).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("deliveries_company_id_status_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
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
    (0, import_pg_core.index)("deliveries_rider_id_status_idx").using(
      "btree",
      table.riderId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.index)("deliveries_rider_id_updated_at_idx").using(
      "btree",
      table.riderId.asc().nullsLast().op("text_ops"),
      table.updatedAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("deliveries_status_idx").using("btree", table.status.asc().nullsLast().op("enum_ops")),
    (0, import_pg_core.uniqueIndex)("deliveries_tracking_id_key").using(
      "btree",
      table.trackingId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("deliveries_pickup_state_idx").on(table.pickupState),
    (0, import_pg_core.index)("deliveries_keyset_pagination_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.updatedAt.desc().nullsLast().op("timestamp_ops"),
      table.id.desc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("deliveries_pending_pool_pickup_state").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.pickupState.asc().nullsLast().op("text_ops"),
      table.scheduledAt.asc().nullsLast().op("timestamp_ops"),
      table.id.asc().nullsLast().op("text_ops")
    ).where(
      import_drizzle_orm.sql`${table.status} = 'PENDING' AND ${table.pool} = true AND ${table.riderId} IS NULL`
    ),
    (0, import_pg_core.index)("deliveries_status_created_at_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("deliveries_status_scheduled_at_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops"),
      table.scheduledAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("deliveries_created_at_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("deliveries_metadata_gin").using("gin", table.metadata),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "deliveries_company_id_fkey"
    }).onUpdate("cascade").onDelete("set null"),
    (0, import_pg_core.foreignKey)({
      columns: [table.riderId],
      foreignColumns: [riders.id],
      name: "deliveries_rider_id_fkey"
    }).onUpdate("cascade").onDelete("set null"),
    (0, import_pg_core.check)("deliveries_vehicle_type_check", import_drizzle_orm.sql`${table.vehicleType} IN ('BIKE')`)
  ]
);
var riders = (0, import_pg_core.pgTable)(
  "riders",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    userId: (0, import_pg_core.text)("user_id").notNull(),
    email: (0, import_pg_core.text)().notNull(),
    fullName: (0, import_pg_core.text)("full_name").notNull(),
    vehicleType: (0, import_pg_core.text)("vehicle_type").default("BIKE" /* BIKE */).notNull(),
    approvalStatus: approvalStatus("approval_status").default("PENDING" /* PENDING */).notNull(),
    status: riderStatus().notNull(),
    lastLat: (0, import_pg_core.doublePrecision)("last_lat"),
    lastLng: (0, import_pg_core.doublePrecision)("last_lng"),
    lastSeen: (0, import_pg_core.timestamp)("last_seen", { precision: 3, mode: "date" }),
    companyId: (0, import_pg_core.text)("company_id"),
    phoneNumber: (0, import_pg_core.text)("phone_number"),
    metadata: (0, import_pg_core.jsonb)(),
    deactivatedAt: (0, import_pg_core.timestamp)("deactivated_at", { precision: 3, mode: "date" }),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, import_pg_core.timestamp)("updated_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("riders_company_id_idx").using("btree", table.companyId.asc().nullsLast().op("text_ops")),
    (0, import_pg_core.index)("riders_company_id_status_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.status.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.index)("riders_company_id_approval_status_idx").using("btree", table.companyId.asc().nullsLast().op("text_ops")).where(import_drizzle_orm.sql`approval_status = ${import_drizzle_orm.sql.raw(`'${"APPROVED" /* APPROVED */}'`)}`),
    (0, import_pg_core.index)("riders_company_id_updated_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.updatedAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("riders_approval_status_idx").using(
      "btree",
      table.approvalStatus.asc().nullsLast().op("enum_ops")
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
    }).onUpdate("cascade").onDelete("set null"),
    (0, import_pg_core.check)("riders_vehicle_type_check", import_drizzle_orm.sql`${table.vehicleType} IN ('BIKE')`)
  ]
);
var paymentTransactions = (0, import_pg_core.pgTable)(
  "payment_transactions",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: (0, import_pg_core.text)("company_id"),
    type: transactionType("type").notNull(),
    amount: (0, import_pg_core.doublePrecision)().notNull(),
    currency: (0, import_pg_core.text)("currency").default("NGN").notNull(),
    status: transactionStatus().default("PENDING" /* PENDING */).notNull(),
    reference: (0, import_pg_core.text)().notNull(),
    provider: paymentProvider("provider"),
    description: (0, import_pg_core.text)(),
    metadata: (0, import_pg_core.jsonb)(),
    processedAt: (0, import_pg_core.timestamp)("processed_at", { precision: 3, mode: "date" }),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("payment_transactions_company_id_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("payment_transactions_type_idx").using(
      "btree",
      table.type.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.uniqueIndex)("payment_transactions_reference_key").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("payment_transactions_status_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "payment_transactions_company_id_fkey"
    }).onUpdate("cascade").onDelete("restrict"),
    (0, import_pg_core.check)("payment_transactions_currency_check", import_drizzle_orm.sql`${table.currency} IN ('NGN')`)
  ]
);
var subscriptionTransactions = (0, import_pg_core.pgTable)(
  "subscription_transactions",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: (0, import_pg_core.text)("company_id").notNull(),
    amount: (0, import_pg_core.doublePrecision)().notNull(),
    currency: (0, import_pg_core.text)("currency").default("NGN").notNull(),
    status: transactionStatus().default("PENDING" /* PENDING */).notNull(),
    reference: (0, import_pg_core.text)().notNull(),
    provider: paymentProvider("provider"),
    tier: subscriptionTier("tier").notNull(),
    periodStart: (0, import_pg_core.timestamp)("period_start", { precision: 3, mode: "date" }).notNull(),
    periodEnd: (0, import_pg_core.timestamp)("period_end", { precision: 3, mode: "date" }),
    description: (0, import_pg_core.text)(),
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
    (0, import_pg_core.index)("subscription_transactions_status_idx").using(
      "btree",
      table.status.asc().nullsLast().op("enum_ops")
    ),
    (0, import_pg_core.uniqueIndex)("subscription_transactions_reference_key").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.uniqueIndex)("subscription_transactions_one_pending_company").on(table.companyId).where(import_drizzle_orm.sql`${table.status} = ${import_drizzle_orm.sql.raw(`'${"PENDING" /* PENDING */}'`)}`),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "subscription_transactions_company_id_fkey"
    }).onUpdate("cascade").onDelete("restrict"),
    (0, import_pg_core.check)("subscription_transactions_currency_check", import_drizzle_orm.sql`${table.currency} IN ('NGN')`)
  ]
);
var deliveryAllocations = (0, import_pg_core.pgTable)(
  "delivery_allocations",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    deliveryId: (0, import_pg_core.text)("delivery_id").notNull(),
    transactionId: (0, import_pg_core.text)("transaction_id").notNull(),
    amount: (0, import_pg_core.doublePrecision)().notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.uniqueIndex)("delivery_allocations_delivery_id_transaction_id_key").using(
      "btree",
      table.deliveryId.asc().nullsLast().op("text_ops"),
      table.transactionId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.index)("delivery_allocations_transaction_id_idx").using(
      "btree",
      table.transactionId.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.deliveryId],
      foreignColumns: [deliveries.id],
      name: "delivery_allocations_delivery_id_fkey"
    }).onUpdate("cascade").onDelete("cascade"),
    (0, import_pg_core.foreignKey)({
      columns: [table.transactionId],
      foreignColumns: [paymentTransactions.id],
      name: "delivery_allocations_transaction_id_fkey"
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
    (0, import_pg_core.uniqueIndex)("ledger_transactions_reference_key").using(
      "btree",
      table.reference.asc().nullsLast().op("text_ops")
    ),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "ledger_transactions_company_id_fkey"
    }).onUpdate("cascade").onDelete("restrict")
  ]
);
var eventLogs = (0, import_pg_core.pgTable)(
  "event_logs",
  {
    id: (0, import_pg_core.text)().primaryKey().$defaultFn(() => createId()).notNull(),
    eventType: eventType("event_type").notNull(),
    entityType: entityType("entity_type").notNull(),
    entityId: (0, import_pg_core.text)("entity_id").notNull(),
    actorId: (0, import_pg_core.text)("actor_id"),
    companyId: (0, import_pg_core.text)("company_id"),
    metadata: (0, import_pg_core.jsonb)(),
    severity: (0, import_pg_core.text)().$type(),
    ipAddress: (0, import_pg_core.text)("ip_address"),
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
      table.eventType.asc().nullsLast().op("enum_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("event_logs_event_type_success_created_at_idx").using(
      "btree",
      table.eventType.asc().nullsLast().op("enum_ops"),
      table.success.asc().nullsLast().op("bool_ops"),
      table.createdAt.desc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("event_logs_event_type_severity_created_at_idx").using(
      "btree",
      table.eventType.asc().nullsLast().op("enum_ops"),
      table.severity.asc().nullsLast().op("text_ops"),
      table.createdAt.desc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("event_logs_company_entity_type_event_created_at_idx").using(
      "btree",
      table.companyId.asc().nullsLast().op("text_ops"),
      table.entityType.asc().nullsLast().op("enum_ops"),
      table.eventType.asc().nullsLast().op("enum_ops"),
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("event_logs_created_at_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    ),
    (0, import_pg_core.index)("event_logs_metadata_gin").using("gin", table.metadata)
  ]
);
var eventOutbox = (0, import_pg_core.pgTable)(
  "event_outbox",
  {
    id: (0, import_pg_core.bigint)({ mode: "number" }).generatedAlwaysAsIdentity().notNull().primaryKey(),
    channel: (0, import_pg_core.text)().notNull(),
    payload: (0, import_pg_core.jsonb)().notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("event_outbox_channel_id_idx").using(
      "btree",
      table.channel.asc().nullsLast().op("text_ops"),
      table.id.asc().nullsLast().op("int8_ops")
    ),
    (0, import_pg_core.index)("event_outbox_created_at_idx").using(
      "btree",
      table.createdAt.asc().nullsLast().op("timestamp_ops")
    )
  ]
);
var idempotencyKeys = (0, import_pg_core.pgTable)(
  "idempotency_keys",
  {
    key: (0, import_pg_core.text)().primaryKey().notNull(),
    response: (0, import_pg_core.jsonb)(),
    expiresAt: (0, import_pg_core.timestamp)("expires_at", { precision: 3, mode: "date" }).notNull(),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    (0, import_pg_core.index)("idempotency_keys_expires_at_idx").using(
      "btree",
      table.expiresAt.asc().nullsLast().op("timestamp_ops")
    )
  ]
);
var metrics = (0, import_pg_core.pgTable)(
  "metrics",
  {
    companyId: (0, import_pg_core.text)("company_id"),
    domain: metricDomain("domain").notNull(),
    granularity: metricGranularity("granularity").notNull(),
    bucketStart: (0, import_pg_core.date)("bucket_start").notNull(),
    totalCount: (0, import_pg_core.integer)("total_count").notNull().default(0),
    deliveredCount: (0, import_pg_core.integer)("delivered_count").notNull().default(0),
    cancelledCount: (0, import_pg_core.integer)("cancelled_count").notNull().default(0),
    failedCount: (0, import_pg_core.integer)("failed_count").notNull().default(0),
    totalRevenueKobo: (0, import_pg_core.integer)("total_revenue_kobo").notNull().default(0),
    avgDeliveryTimeMinutes: (0, import_pg_core.doublePrecision)("avg_delivery_time_minutes"),
    channelBreakdown: (0, import_pg_core.jsonb)("channel_breakdown").default({}).notNull(),
    extraMetrics: (0, import_pg_core.jsonb)("extra_metrics").default({}).notNull(),
    peakHour: (0, import_pg_core.integer)("peak_hour"),
    uniqueRidersActive: (0, import_pg_core.integer)("unique_riders_active").notNull().default(0),
    createdAt: (0, import_pg_core.timestamp)("created_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, import_pg_core.timestamp)("updated_at", { precision: 3, mode: "date" }).default(import_drizzle_orm.sql`CURRENT_TIMESTAMP`).notNull()
  },
  (table) => [
    // One row per (company scope, domain, granularity, bucket) — covers both
    // company rows and the NULL system row via NULLS NOT DISTINCT. A plain
    // unique constraint (not partial unique index) so the NULL company_id
    // conflicts like any value — exactly one system row per domain/granularity.
    (0, import_pg_core.unique)("metrics_scope_domain_granularity_bucket_idx").on(table.companyId, table.domain, table.granularity, table.bucketStart).nullsNotDistinct(),
    // Range scans for a company's series (read path).
    (0, import_pg_core.index)("metrics_company_domain_granularity_idx").on(
      table.companyId,
      table.domain,
      table.granularity,
      table.bucketStart
    ),
    // Range scans for the system-wide series (admin read path).
    (0, import_pg_core.index)("metrics_system_domain_granularity_idx").on(table.domain, table.granularity, table.bucketStart).where(import_drizzle_orm.sql`${table.companyId} IS NULL`),
    (0, import_pg_core.foreignKey)({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: "metrics_company_id_fkey"
    }).onUpdate("cascade").onDelete("cascade")
  ]
);

// src/services/drizzle/relations.ts
var import_relations = require("drizzle-orm/relations");
var companySettingsRelations = (0, import_relations.relations)(companySettings, ({ one }) => ({
  company: one(companies, {
    fields: [companySettings.companyId],
    references: [companies.id]
  })
}));
var companiesRelations = (0, import_relations.relations)(companies, ({ many, one }) => ({
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
var companyChannelsRelations = (0, import_relations.relations)(companyChannels, ({ one }) => ({
  company: one(companies, {
    fields: [companyChannels.companyId],
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
  })
}));
var deliveryAllocationsRelations = (0, import_relations.relations)(deliveryAllocations, ({ one }) => ({
  delivery: one(deliveries, {
    fields: [deliveryAllocations.deliveryId],
    references: [deliveries.id]
  }),
  transaction: one(paymentTransactions, {
    fields: [deliveryAllocations.transactionId],
    references: [paymentTransactions.id]
  })
}));
var transactionsRelations = (0, import_relations.relations)(paymentTransactions, ({ one, many }) => ({
  company: one(companies, {
    fields: [paymentTransactions.companyId],
    references: [companies.id]
  }),
  deliveryAllocations: many(deliveryAllocations)
}));
var subscriptionTransactionsRelations = (0, import_relations.relations)(subscriptionTransactions, ({ one }) => ({
  company: one(companies, {
    fields: [subscriptionTransactions.companyId],
    references: [companies.id]
  })
}));
var eventLogsRelations = (0, import_relations.relations)(eventLogs, ({ one }) => ({
  company: one(companies, {
    fields: [eventLogs.companyId],
    references: [companies.id]
  })
}));
var metricsRelations = (0, import_relations.relations)(metrics, ({ one }) => ({
  company: one(companies, {
    fields: [metrics.companyId],
    references: [companies.id]
  })
}));
var ledgerTransactionsRelations = (0, import_relations.relations)(ledgerTransactions, ({ one }) => ({
  company: one(companies, {
    fields: [ledgerTransactions.companyId],
    references: [companies.id]
  })
}));

// src/shared/config/retention.config.ts
var import_zod = require("zod");
var retentionConfigSchema = import_zod.z.object({
  accountPurgeRetentionDays: import_zod.z.number(),
  companyPurgeRetentionDays: import_zod.z.number(),
  lockedCompanyPurgeRetentionDays: import_zod.z.number(),
  eventLogRetentionMonths: import_zod.z.number()
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

// src/shared/config/billing.config.ts
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

// src/shared/config/limits.config.ts
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
  // Client sync page size served via remoteConfig
  locationDeduplicationRadiusMeters: 100,
  // Drop duplicate location results within this range
  externalApiTimeoutMs: 1e4,
  // Default timeout for external requests (e.g. Maps API)
  maxRiderActiveDeliveries: 5,
  maxSearchQueryLength: 100,
  chunkSize: 100
};
var LIMITS_CONFIG = rawLimitsConfig;
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

// src/services/alerts.ts
var ALERT_COOLDOWN_MS = 5 * 60 * 1e3;
var recentAlerts = /* @__PURE__ */ new Map();
function getDiscordWebhookUrl() {
  return process.env.DISCORD_WEBHOOK_URL;
}
async function sendAlert(level, title, details, webhookUrl) {
  const resolvedUrl = webhookUrl ?? getDiscordWebhookUrl();
  if (!resolvedUrl) return;
  const key = `${title}:${level}`;
  const lastSent = recentAlerts.get(key) ?? 0;
  if (Date.now() - lastSent < ALERT_COOLDOWN_MS) return;
  recentAlerts.set(key, Date.now());
  const emoji = level === "critical" ? "\u{1F6A8}" : level === "warning" ? "\u26A0\uFE0F" : "\u2139\uFE0F";
  try {
    await fetch(resolvedUrl, {
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
      signal: AbortSignal.timeout(LIMITS_CONFIG.externalApiTimeoutMs)
    });
  } catch {
  }
}
function resetAlertCooldownsForTest() {
  recentAlerts.clear();
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

// src/services/email.ts
var DEFAULT_SMTP_PORT = 1025;
function buildSmtpConfig(env) {
  if (!env.SMTP_HOST) return null;
  const port = env.SMTP_PORT ? parseInt(env.SMTP_PORT, 10) : DEFAULT_SMTP_PORT;
  return {
    host: env.SMTP_HOST,
    port,
    user: env.SMTP_USER || void 0,
    pass: env.SMTP_PASS || void 0
  };
}
function getSmtpConfig() {
  return typeof process !== "undefined" ? buildSmtpConfig(process.env) : null;
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
  constructor(smtp) {
    this.smtp = smtp;
  }
  smtp;
  async sendEmail(options) {
    const smtp = this.smtp !== void 0 ? this.smtp : getSmtpConfig();
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
var import_node_crypto2 = require("crypto");
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
    const iv = (0, import_node_crypto2.randomBytes)(IV_LENGTH);
    const cipher = (0, import_node_crypto2.createCipheriv)(ALGORITHM, key, iv);
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
    const decipher = (0, import_node_crypto2.createDecipheriv)(ALGORITHM, key, iv);
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

// src/shared/utils/error-utils.ts
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
var import_drizzle_orm2 = require("drizzle-orm");
var import_node_crypto3 = require("crypto");

// src/shared/types/metadata.ts
var import_zod2 = require("zod");
var str = import_zod2.z.string();
var strNullish = import_zod2.z.string().nullish();
var num = import_zod2.z.number();
var numNullish = import_zod2.z.number().nullish();
var boolNullish = import_zod2.z.boolean().nullish();
var rec = import_zod2.z.record(import_zod2.z.string(), import_zod2.z.unknown());
var cacEvidenceShape = import_zod2.z.object({
  status: import_zod2.z.string(),
  registeredName: import_zod2.z.string().nullish(),
  entityType: import_zod2.z.string().nullish(),
  cacStatus: import_zod2.z.string().nullish(),
  registrationDate: import_zod2.z.string().nullish(),
  checkedAt: import_zod2.z.string(),
  nextCheckAt: import_zod2.z.string().nullish(),
  attempts: import_zod2.z.number()
});
var credentialsShape = import_zod2.z.object({
  accessToken: import_zod2.z.string(),
  wabaId: import_zod2.z.string(),
  phoneNumberId: import_zod2.z.string(),
  tokenExpiresAt: import_zod2.z.number().nullish()
});
var executedActionsShape = import_zod2.z.array(
  import_zod2.z.union([
    import_zod2.z.string(),
    import_zod2.z.object({ type: import_zod2.z.string(), success: import_zod2.z.boolean().nullish(), message: import_zod2.z.string().nullish() })
  ])
);
var suspensionHistoryEntryShape = import_zod2.z.object({
  at: import_zod2.z.string(),
  by: import_zod2.z.string(),
  reason: import_zod2.z.string(),
  escalatedFrom: import_zod2.z.string().nullish(),
  offenseCount: import_zod2.z.number().nullish()
});
var suspensionHistoryShape = import_zod2.z.array(suspensionHistoryEntryShape);
var lifecycleFailureShape = import_zod2.z.object({
  reason: import_zod2.z.string(),
  riderId: import_zod2.z.string().nullish(),
  at: import_zod2.z.string()
});
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
    shape: import_zod2.z.union([import_zod2.z.nativeEnum(PaymentProvider), import_zod2.z.literal("BANK_TRANSFER"), import_zod2.z.literal("CASH")]).nullish(),
    required: false
  },
  paymentRequired: { scope: "DELIVERY", shape: boolNullish, required: false },
  paymentStatus: {
    scope: "DELIVERY",
    shape: import_zod2.z.nativeEnum(PaymentStatus).nullish(),
    required: false
  },
  paymentLinkGenerated: { scope: "DELIVERY", shape: boolNullish, required: false },
  paymentLinkGeneratedAt: { scope: "DELIVERY", shape: strNullish, required: false },
  paymentSessionId: { scope: "DELIVERY", shape: strNullish, required: false },
  cancelReason: { scope: "DELIVERY", shape: strNullish, required: false },
  cancelledAt: { scope: "DELIVERY", shape: strNullish, required: false },
  pickedUpEscalatedAt: { scope: "DELIVERY", shape: strNullish, required: false },
  inTransitEscalatedAt: { scope: "DELIVERY", shape: strNullish, required: false },
  lifecycleFailure: { scope: "DELIVERY", shape: lifecycleFailureShape.nullish(), required: false },
  reassignedAt: { scope: "DELIVERY", shape: strNullish, required: false },
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
  originalReferences: { scope: "TRANSACTION", shape: import_zod2.z.array(str).nullish(), required: false },
  trackingIds: { scope: "TRANSACTION", shape: import_zod2.z.array(str).nullish(), required: false },
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
  silentBanUntil: { scope: "RIDER", shape: numNullish, required: false },
  suspendedBy: { scope: "RIDER", shape: strNullish, required: false },
  suspendedFrom: { scope: "RIDER", shape: strNullish, required: false },
  suspensionReason: { scope: "RIDER", shape: strNullish, required: false },
  suspensionCount: { scope: "RIDER", shape: numNullish, required: false },
  suspensionHistory: { scope: "RIDER", shape: suspensionHistoryShape.nullish(), required: false },
  lastSilentOffenseAt: { scope: "RIDER", shape: strNullish, required: false },
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

// src/services/payments.ts
async function getTotalPaidForDeliveries(deliveryIds, conn) {
  const safeDeliveryIds = deliveryIds.slice(0, LIMITS_CONFIG.dbBatchSize);
  const results = await conn.select({
    deliveryId: deliveryAllocations.deliveryId,
    totalAmount: (0, import_drizzle_orm2.sum)(deliveryAllocations.amount)
  }).from(deliveryAllocations).innerJoin(paymentTransactions, (0, import_drizzle_orm2.eq)(deliveryAllocations.transactionId, paymentTransactions.id)).where(
    (0, import_drizzle_orm2.and)(
      (0, import_drizzle_orm2.inArray)(deliveryAllocations.deliveryId, safeDeliveryIds),
      (0, import_drizzle_orm2.eq)(paymentTransactions.status, "SUCCESS" /* SUCCESS */)
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
    (0, import_drizzle_orm2.inArray)(deliveries.id, deliveryIds),
    import_drizzle_orm2.sql`${deliveries.metadata}->>'paymentStatus' = ${"AWAITING" /* AWAITING */}`
  ];
  if (companyId) {
    whereConditions.push((0, import_drizzle_orm2.eq)(deliveries.companyId, companyId));
  }
  const result = await tx.update(deliveries).set({
    status: import_drizzle_orm2.sql`CASE WHEN ${deliveries.riderId} IS NOT NULL THEN ${"ASSIGNED" /* ASSIGNED */} ELSE ${"PENDING" /* PENDING */} END`,
    metadata: import_drizzle_orm2.sql`jsonb_set(
        COALESCE(${deliveries.metadata}, '{}'::jsonb),
        '{paymentStatus}',
        to_jsonb(${"COMPLETED" /* COMPLETED */}::text)
      )`
  }).where((0, import_drizzle_orm2.and)(...whereConditions)).returning({ id: deliveries.id });
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
      (0, import_drizzle_orm2.and)(
        (0, import_drizzle_orm2.eq)(deliveryAllocations.transactionId, transaction.id),
        (0, import_drizzle_orm2.gt)(deliveryAllocations.amount, 0)
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
        }).from(deliveries).where((0, import_drizzle_orm2.inArray)(deliveries.id, batch)).orderBy((0, import_drizzle_orm2.asc)(deliveries.createdAt)).for("update"),
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
          (0, import_drizzle_orm2.and)(
            (0, import_drizzle_orm2.eq)(deliveryAllocations.transactionId, transaction.id),
            (0, import_drizzle_orm2.inArray)(deliveryAllocations.deliveryId, batch)
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
    await tx.update(companySettings).set({ ledgerBalance: import_drizzle_orm2.sql`${companySettings.ledgerBalance} + ${remainingAmount}` }).where((0, import_drizzle_orm2.eq)(companySettings.companyId, transaction.companyId));
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
      ledgerBalance: import_drizzle_orm2.sql`${companySettings.ledgerBalance} + CASE ${import_drizzle_orm2.sql.join(
        entries.map(
          ([cId, amount]) => import_drizzle_orm2.sql`WHEN ${companySettings.companyId} = ${cId} THEN ${amount}`
        ),
        import_drizzle_orm2.sql` `
      )} END`
    }).where(
      (0, import_drizzle_orm2.inArray)(
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
        reference: `CHFEE-${(0, import_node_crypto3.randomUUID)().slice(0, 8)}`,
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
var import_drizzle_orm3 = require("drizzle-orm");
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
    const result = await db.execute(import_drizzle_orm3.sql`
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
      const existing = await db.execute(import_drizzle_orm3.sql`
        SELECT msg_id FROM pgmq.q_${import_drizzle_orm3.sql.raw(queueName)}
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
    const result = await db.execute(import_drizzle_orm3.sql`
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
    const result = await db.execute(import_drizzle_orm3.sql`
      SELECT
        (SELECT COUNT(*)::integer AS count FROM pgmq.q_${import_drizzle_orm3.sql.raw(queueName)}
          WHERE enqueued_at >= ${since.toISOString()}::timestamptz
            AND message -> '_meta' @> ${JSON.stringify({ companyId })}::jsonb)
        +
        (SELECT COUNT(*)::integer AS count FROM pgmq.a_${import_drizzle_orm3.sql.raw(queueName)}
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
        const result = await db.execute(import_drizzle_orm3.sql`
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
          await db.execute(import_drizzle_orm3.sql`SELECT pgmq.delete(${queueName}::text, ${msg.msg_id})`);
          stats.succeeded++;
        } catch (error) {
          stats.failed++;
          const retryCount = Number(msg.read_ct ?? 1);
          const maxRetries = QUEUE_SERVICE_CONFIG.defaultMaxRetries;
          try {
            if (error instanceof PermanentJobError) {
              await db.execute(import_drizzle_orm3.sql`SELECT pgmq.archive(${queueName}::text, ${msg.msg_id})`);
            } else if (retryCount >= maxRetries) {
              await db.execute(import_drizzle_orm3.sql`SELECT pgmq.archive(${queueName}::text, ${msg.msg_id})`);
            } else {
              const backoffSec = retryBackoffSeconds(retryCount);
              await db.execute(import_drizzle_orm3.sql`
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
    const result = await db.execute(import_drizzle_orm3.sql`
      DELETE FROM pgmq.a_${import_drizzle_orm3.sql.raw(queueName)}
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmailService,
  FcmService,
  PermanentJobError,
  SquadClient,
  SquadRequestError,
  adminRoleEnum,
  admins,
  applyPaymentStatusUpdate,
  approvalStatus,
  blockedIps,
  buildSmtpConfig,
  channelPlatform,
  channelType,
  companies,
  companiesRelations,
  companyChannelStatus,
  companyChannels,
  companyChannelsRelations,
  companySettings,
  companySettingsRelations,
  computeAllocationTargets,
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
  getTotalPaidForDeliveries,
  idempotencyKeys,
  ledgerAdjustmentType,
  ledgerTransactions,
  ledgerTransactionsRelations,
  messageStatus,
  messages,
  messagesRelations,
  metricDomain,
  metricGranularity,
  metrics,
  metricsRelations,
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
  sendAlert,
  senderType,
  subscriptionStatus,
  subscriptionTier,
  subscriptionTransactions,
  subscriptionTransactionsRelations,
  transactionStatus,
  transactionType,
  transactionsRelations,
  users
});
