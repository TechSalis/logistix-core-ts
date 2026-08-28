import {
  AdminRole,
  ApprovalStatus,
  BILLING_CONFIG,
  ChannelPlatform,
  ChannelType,
  CompanyChannelStatus,
  Currency,
  DEFAULT_WORKING_HOURS,
  DeliveryStatus,
  DevicePlatform,
  DispatcherRole,
  EntityType,
  EscalatedTo,
  EscalationStatus,
  EventType,
  FCM_SERVICE_CONFIG,
  LIMITS_CONFIG,
  LedgerAdjustmentType,
  MessageStatus,
  MetricDomain,
  MetricGranularity,
  PaymentMethod,
  PaymentProvider,
  QUEUE_SERVICE_CONFIG,
  RETRYABLE_NETWORK_ERROR_CODES,
  RiderStatus,
  SenderType,
  SubscriptionStatus,
  SubscriptionTier,
  TransactionStatus,
  TransactionType,
  VehicleType,
  extractErrorContext,
  extractErrorMessage,
  fetchWithTimeout,
  isTransientHttpError,
  withRetry
} from "./chunk-ZCLRRHR4.js";

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
  bigint
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
var vehicleType = pgEnum("VehicleType", enumValues(VehicleType));
var paymentProvider = pgEnum("PaymentProvider", enumValues(PaymentProvider));
var subscriptionStatus = pgEnum("SubscriptionStatus", enumValues(SubscriptionStatus));
var channelType = pgEnum("ChannelType", enumValues(ChannelType));
var escalatedTo = pgEnum("EscalatedTo", enumValues(EscalatedTo));
var escalationStatus = pgEnum("EscalationStatus", enumValues(EscalationStatus));
var eventType = pgEnum("EventType", enumValues(EventType));
var entityType = pgEnum("EntityType", enumValues(EntityType));
var currencyEnum = pgEnum("Currency", enumValues(Currency));
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
    handledByType: text("handled_by_type").notNull(),
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
    creatorPlatform: text("creator_platform"),
    pool: boolean().default(false).notNull(),
    vehicleType: vehicleType("vehicle_type").default("BIKE" /* BIKE */).notNull()
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
    vehicleType: vehicleType("vehicle_type").default("BIKE" /* BIKE */).notNull(),
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
    }).onUpdate("cascade").onDelete("set null")
  ]
);
var paymentTransactions = pgTable(
  "payment_transactions",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: text("company_id"),
    type: transactionType("type").notNull(),
    amount: doublePrecision().notNull(),
    currency: currencyEnum().default("NGN" /* NGN */).notNull(),
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
    }).onUpdate("cascade").onDelete("restrict")
  ]
);
var subscriptionTransactions = pgTable(
  "subscription_transactions",
  {
    id: text().primaryKey().$defaultFn(() => createId()).notNull(),
    companyId: text("company_id").notNull(),
    amount: doublePrecision().notNull(),
    currency: currencyEnum().default("NGN" /* NGN */).notNull(),
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
    }).onUpdate("cascade").onDelete("restrict")
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
    severity: text("severity"),
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
        metadata: {
          feePerDelivery: channelFeePerDelivery,
          deliveryCount: companyDeliveryCount,
          totalFee
        },
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
  DELIVERY_NOTIFICATION: "delivery_notifications",
  AI_BATCH: "ai_batch",
  SQUAD_WEBHOOK: "squid_webhooks",
  EXPORT: "exports"
};
function toQueueName(type) {
  return JOB_TYPE_TO_QUEUE[type] ?? type;
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
        WHERE message->>'_dedupeKey' = ${options.dedupeKey}
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
      SELECT COUNT(*)::integer as count
      FROM pgmq.a_${sql3.raw(queueName)}
      WHERE enqueued_at >= ${since}
        AND message->>'_meta' @> ${JSON.stringify({ companyId })}
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

// src/services/supabase.ts
import { createClient } from "@supabase/supabase-js";
var SUPABASE_AUTH_RETRIES = 3;
function createSupabaseAdminClient(url, serviceKey) {
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}
async function deleteSupabaseUser(supabase, userId, log) {
  try {
    await withRetry(
      async () => {
        const result = await Promise.race([
          supabase.auth.admin.deleteUser(userId),
          new Promise(
            (_, reject) => setTimeout(
              () => reject(new Error("Supabase auth deleteUser timeout")),
              LIMITS_CONFIG.externalApiTimeoutMs
            )
          )
        ]);
        if (!result.error) return;
        const msg = result.error.message?.toLowerCase() ?? "";
        if (msg.includes("not found") || msg.includes("doesn't exist")) return;
        throw new Error(`Supabase auth error: ${result.error.message}`);
      },
      { maxRetries: SUPABASE_AUTH_RETRIES }
    );
    return true;
  } catch (error) {
    log?.("[SupabaseAuth] deleteUser failed after retries", {
      userId,
      ...extractErrorContext(error)
    });
    return false;
  }
}

export {
  deliveryStatus,
  ledgerAdjustmentType,
  channelPlatform,
  companyChannelStatus,
  messageStatus,
  paymentMethod,
  approvalStatus,
  riderStatus,
  senderType,
  subscriptionTier,
  transactionStatus,
  transactionType,
  vehicleType,
  paymentProvider,
  subscriptionStatus,
  channelType,
  escalatedTo,
  escalationStatus,
  eventType,
  entityType,
  currencyEnum,
  adminRoleEnum,
  dispatcherRoleEnum,
  metricDomain,
  metricGranularity,
  devicePlatform,
  users,
  companies,
  companySettings,
  companyChannels,
  conversations,
  messages,
  admins,
  dispatchers,
  blockedIps,
  phoneVerifications,
  refreshSessions,
  deviceTokens,
  deliveries,
  riders,
  paymentTransactions,
  subscriptionTransactions,
  deliveryAllocations,
  ledgerTransactions,
  eventLogs,
  eventOutbox,
  metrics,
  companySettingsRelations,
  companiesRelations,
  companyChannelsRelations,
  conversationsRelations,
  messagesRelations,
  dispatchersRelations,
  deliveriesRelations,
  ridersRelations,
  deliveryAllocationsRelations,
  transactionsRelations,
  subscriptionTransactionsRelations,
  eventLogsRelations,
  metricsRelations,
  ledgerTransactionsRelations,
  sendAlert,
  resetAlertCooldownsForTest,
  EmailService,
  createEncryptor,
  FcmService,
  getTotalPaidForDeliveries,
  applyPaymentStatusUpdate,
  computeAllocationTargets,
  processPaymentAllocation,
  computePoolSplit,
  PermanentJobError,
  queueService,
  SquadRequestError,
  SquadClient,
  createSupabaseAdminClient,
  deleteSupabaseUser
};
