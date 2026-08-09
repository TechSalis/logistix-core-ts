import { randomUUID } from 'node:crypto';
import {
  pgTable,
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
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import type { IndexBuilder } from 'drizzle-orm/pg-core';
import {
  AdminRole,
  ChannelType,
  DeliveryStatus,
  DispatcherRole,
  EscalatedTo,
  JobStatus,
  LedgerAdjustmentType,
  ChannelPlatform,
  CompanyChannelStatus,
  MessageStatus,
  PaymentMethod,
  PaymentProvider,
  ApprovalStatus,
  RiderStatus,
  SenderType,
  SubscriptionTier,
  SubscriptionStatus,
  TransactionStatus,
  TransactionType,
  Currency,
  VehicleType,
  EventType,
  EntityType,
  DayOfWeek,
  MetricDomain,
  MetricGranularity,
} from '../enums/enums.js';
import { WorkingHoursEntry } from '../config/system.config.js';

const createId = () => randomUUID();

const defaultWorkingHours: Partial<Record<DayOfWeek, WorkingHoursEntry>> = {
  [DayOfWeek.MONDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.TUESDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.WEDNESDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.THURSDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.FRIDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.SATURDAY]: { start: '07:00', close: '19:00' },
};

const enumValues = <T extends Record<string, string>>(e: T): [string, ...string[]] =>
  Object.values(e) as [string, ...string[]];

export const deliveryStatus = pgEnum('DeliveryStatus', enumValues(DeliveryStatus));
export const jobStatusEnum = pgEnum('JobStatus', enumValues(JobStatus));
export const ledgerAdjustmentType = pgEnum(
  'LedgerAdjustmentType',
  enumValues(LedgerAdjustmentType),
);
export const channelPlatform = pgEnum('ChannelPlatform', enumValues(ChannelPlatform));
export const companyChannelStatus = pgEnum(
  'CompanyChannelStatus',
  enumValues(CompanyChannelStatus),
);
export const messageStatus = pgEnum('MessageStatus', enumValues(MessageStatus));
export const paymentMethod = pgEnum('PaymentMethod', enumValues(PaymentMethod));
export const approvalStatus = pgEnum('ApprovalStatus', enumValues(ApprovalStatus));
export const riderStatus = pgEnum('RiderStatus', enumValues(RiderStatus));
export const senderType = pgEnum('SenderType', enumValues(SenderType));
export const subscriptionTier = pgEnum('SubscriptionTier', enumValues(SubscriptionTier));
export const transactionStatus = pgEnum('TransactionStatus', enumValues(TransactionStatus));
export const transactionType = pgEnum('TransactionType', enumValues(TransactionType));
export const vehicleType = pgEnum('VehicleType', enumValues(VehicleType));
// VehicleType is BIKE-only (wire enum trimmed to BIKE; backend DEFAULT_PRICING_SCHEMES
// keys off VehicleType.BIKE) — every code path defaults to BIKE.
export const paymentProvider = pgEnum('PaymentProvider', enumValues(PaymentProvider));
export const subscriptionStatus = pgEnum('SubscriptionStatus', enumValues(SubscriptionStatus));
export const channelType = pgEnum('ChannelType', enumValues(ChannelType));
export const escalatedTo = pgEnum('EscalatedTo', enumValues(EscalatedTo));
export const eventType = pgEnum('EventType', enumValues(EventType));
export const entityType = pgEnum('EntityType', enumValues(EntityType));
export const currencyEnum = pgEnum('Currency', enumValues(Currency));
export const adminRoleEnum = pgEnum('AdminRole', enumValues(AdminRole));
export const dispatcherRoleEnum = pgEnum('DispatcherRole', enumValues(DispatcherRole));
export const metricDomain = pgEnum('MetricDomain', enumValues(MetricDomain));
export const metricGranularity = pgEnum('MetricGranularity', enumValues(MetricGranularity));

export const companies = pgTable(
  'companies',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    name: text(),
    cac: text(),
    nipostLicenseNumber: text('nipost_license_number'),
    contactPhone: text('contact_phone'),
    verificationStatus: approvalStatus('verification_status')
      .default(ApprovalStatus.PENDING)
      .notNull(),
    metadata: jsonb(),
    deactivatedAt: timestamp('deactivated_at', { precision: 3, mode: 'date' }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('companies_name_idx').using('btree', table.name.asc().nullsLast().op('text_ops')),
    index('companies_verification_status_idx').using(
      'btree',
      table.verificationStatus.asc().nullsLast().op('enum_ops'),
    ),
    uniqueIndex('companies_cac_key').on(table.cac),
  ],
);

export const companySettings = pgTable(
  'company_settings',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    companyId: text('company_id').notNull(),
    tier: subscriptionTier().notNull(),
    subscriptionStatus: subscriptionStatus('subscription_status')
      .default(SubscriptionStatus.TRIAL)
      .notNull(),
    periodStart: timestamp('period_start', { precision: 3, mode: 'date' }),
    periodEnd: timestamp('period_end', { precision: 3, mode: 'date' }),
    squadTokenId: text('squad_token_id'),
    workingHours: jsonb('working_hours').default(defaultWorkingHours).notNull(),
    bankDetails: jsonb('bank_details'),
    ledgerBalance: doublePrecision('ledger_balance').default(0).notNull(),
    companyCode: text('company_code'),
    escalatedTo: escalatedTo('escalated_to').default(EscalatedTo.COMPANY).notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    autoAcceptTeam: boolean('auto_accept_team').default(false).notNull(),
    states: text().array().default([]),
    interstateDeliveries: boolean('interstate_deliveries').default(false).notNull(),
  },
  (table) => [
    uniqueIndex('company_settings_company_id_key').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
    ),
    uniqueIndex('company_settings_company_code_key').using(
      'btree',
      table.companyCode.asc().nullsLast().op('text_ops'),
    ),
    index('company_settings_subscription_status_idx').using(
      'btree',
      table.subscriptionStatus.asc().nullsLast().op('enum_ops'),
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'company_settings_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const companyChannels = pgTable(
  'company_channels',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    platform: channelPlatform().notNull(),
    platformId: text('platform_id').notNull(),
    companyId: text('company_id').notNull(),
    status: companyChannelStatus('status').notNull(),
    metadata: jsonb(),
    aiDisabled: boolean('ai_disabled').default(false).notNull(),
    rejectionReason: text('rejection_reason'),
    rejectedAt: timestamp('rejected_at', { precision: 3, mode: 'date' }),
    removedAt: timestamp('removed_at', { precision: 3, mode: 'date' }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('company_channels_status_idx').using(
      'btree',
      table.status.asc().nullsLast().op('enum_ops'),
    ),
    index('company_channels_company_id_status_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.status.asc().nullsLast().op('enum_ops'),
    ),
    uniqueIndex('company_channels_platform_company_id_key').using(
      'btree',
      table.platform.asc().nullsLast().op('enum_ops'),
      table.companyId.asc().nullsLast().op('text_ops'),
    ),
    uniqueIndex('company_channels_platform_platform_id_key').using(
      'btree',
      table.platform.asc().nullsLast().op('enum_ops'),
      table.platformId.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'company_channels_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const conversations = pgTable(
  'conversations',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    platform: channelPlatform().notNull(),
    platformId: text('platform_id').notNull(),
    companyId: text('company_id'),
    lastMessageAt: timestamp('last_message_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    escalatedAt: timestamp('escalated_at', { precision: 3, mode: 'date' }),
    metadata: jsonb(),
    channelType: channelType('channel_type').notNull(),
    lastCustomerMessageAt: timestamp('last_customer_message_at', { precision: 3, mode: 'date' }),
    memory: jsonb(),
    handledBy: text('handled_by'),
    handledByType: text('handled_by_type').notNull(),
    handledAt: timestamp('handled_at', { precision: 3, mode: 'date' }),
  },
  (table) => [
    index('conversations_company_id_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
    ),
    index('conversations_company_id_last_message_at_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.lastMessageAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('conversations_platform_id_platform_idx').using(
      'btree',
      table.platformId.asc().nullsLast().op('text_ops'),
      table.platform.asc().nullsLast().op('enum_ops'),
    ),
    uniqueIndex('conversations_platform_platform_id_company_id_key').using(
      'btree',
      table.platform.asc().nullsLast().op('enum_ops'),
      table.platformId.asc().nullsLast().op('text_ops'),
      table.companyId.asc().nullsLast().op('text_ops'),
    ),
    index('conversations_handled_by_type_idx').using(
      'btree',
      table.handledByType.asc().nullsLast().op('text_ops'),
    ),
    index('conversations_channel_type_idx').using(
      'btree',
      table.channelType.asc().nullsLast().op('enum_ops'),
    ),
    index('conversations_escalated_at_idx').using(
      'btree',
      table.escalatedAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('conversations_last_message_at_idx').using(
      'btree',
      table.lastMessageAt.asc().nullsLast().op('timestamp_ops'),
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'conversations_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const messages = pgTable(
  'messages',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    conversationId: text('conversation_id').notNull(),
    body: text().notNull(),
    senderType: senderType('sender_type').notNull(),
    senderId: text('sender_id'),
    isDeleted: boolean('is_deleted').default(false).notNull(),
    metadata: jsonb(),
    mediaUrl: text('media_url'),
    externalId: text('external_id'),
    replyToExternalId: text('reply_to_external_id'),
    status: messageStatus().default(MessageStatus.SENT).notNull(),
    actionType: text('action_type'),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('messages_conversation_id_created_at_idx').using(
      'btree',
      table.conversationId.asc().nullsLast().op('text_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    uniqueIndex('messages_external_id_key').using(
      'btree',
      table.externalId.asc().nullsLast().op('text_ops'),
    ),
    index('messages_reply_to_external_id_idx').using(
      'btree',
      table.replyToExternalId.asc().nullsLast().op('text_ops'),
    ),
    index('messages_action_type_idx').using('btree', table.actionType.asc().nullsLast()),
    index('messages_conversation_id_is_deleted_idx').using(
      'btree',
      table.conversationId.asc().nullsLast().op('text_ops'),
      table.isDeleted.asc().nullsLast().op('bool_ops'),
    ),
    index('messages_created_at_idx').using(
      'btree',
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    foreignKey({
      columns: [table.conversationId],
      foreignColumns: [conversations.id],
      name: 'messages_conversation_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ],
);

export const admins = pgTable(
  'admins',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    userId: text('user_id').notNull(),
    email: text().notNull(),
    fullName: text('full_name').notNull(),
    role: adminRoleEnum('role').notNull(),
    fcmToken: text('fcm_token'),
    deactivatedAt: timestamp('deactivated_at', { precision: 3, mode: 'date' }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex('admins_email_key').using('btree', table.email.asc().nullsLast().op('text_ops')),
    uniqueIndex('admins_user_id_key').using('btree', table.userId.asc().nullsLast().op('text_ops')),
  ],
);

export const dispatchers = pgTable(
  'dispatchers',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    userId: text('user_id').notNull(),
    email: text().notNull(),
    fullName: text('full_name').notNull(),
    companyId: text('company_id'),
    fcmToken: text('fcm_token'),
    role: dispatcherRoleEnum('role').notNull(),
    approvalStatus: approvalStatus('approval_status').default(ApprovalStatus.PENDING).notNull(),
    deactivatedAt: timestamp('deactivated_at', { precision: 3, mode: 'date' }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('dispatchers_company_id_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
    ),
    index('dispatchers_company_id_created_at_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    uniqueIndex('dispatchers_email_key').using(
      'btree',
      table.email.asc().nullsLast().op('text_ops'),
    ),
    uniqueIndex('dispatchers_user_id_key').using(
      'btree',
      table.userId.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'dispatchers_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
);

export const blockedIps = pgTable(
  'blocked_ips',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    ipAddress: text('ip_address').notNull(),
    reason: text(),
    blockedBy: text('blocked_by'),
    expiresAt: timestamp('expires_at', { precision: 3, mode: 'date' }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('blocked_ips_expires_at_idx').using(
      'btree',
      table.expiresAt.asc().nullsLast().op('timestamp_ops'),
    ),
    uniqueIndex('blocked_ips_ip_address_idx').using(
      'btree',
      table.ipAddress.asc().nullsLast().op('text_ops'),
    ),
  ],
);

export const deliveries = pgTable(
  'deliveries',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    companyId: text('company_id'),
    createdBy: text('created_by'),
    riderId: text('rider_id'),
    status: deliveryStatus().notNull(),
    pickupAddress: text('pickup_address').notNull(),
    pickupState: text('pickup_state'),
    dropOffAddress: text('drop_off_address').notNull(),
    dropOffState: text('drop_off_state'),
    description: text(),
    pickupLat: doublePrecision('pickup_lat'),
    pickupLng: doublePrecision('pickup_lng'),
    dropOffLat: doublePrecision('drop_off_lat'),
    dropOffLng: doublePrecision('drop_off_lng'),
    pickupPhone: text('pickup_phone'),
    dropOffPhone: text('drop_off_phone'),
    paymentMethod: paymentMethod('payment_method').notNull(),
    scheduledAt: timestamp('scheduled_at', { precision: 3, mode: 'date' }),
    deliveredAt: timestamp('delivered_at', { precision: 3, mode: 'date' }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    trackingId: text('tracking_id').notNull(),
    pin: text(),
    price: doublePrecision(),
    metadata: jsonb(),
    creatorPlatform: text('creator_platform'),
    pool: boolean().default(false).notNull(),
    vehicleType: vehicleType('vehicle_type').default(VehicleType.BIKE).notNull(),
  },
  (table) => [
    index('deliveries_company_id_status_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.status.asc().nullsLast().op('enum_ops'),
    ),
    index('deliveries_company_id_created_by_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.createdBy.asc().nullsLast().op('text_ops'),
    ),
    index('deliveries_company_id_updated_at_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.updatedAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('deliveries_company_id_created_at_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.createdAt.desc().nullsLast().op('timestamp_ops'),
    ),
    index('deliveries_rider_id_status_idx').using(
      'btree',
      table.riderId.asc().nullsLast().op('text_ops'),
      table.status.asc().nullsLast().op('enum_ops'),
    ),
    index('deliveries_rider_id_updated_at_idx').using(
      'btree',
      table.riderId.asc().nullsLast().op('text_ops'),
      table.updatedAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('deliveries_status_idx').using('btree', table.status.asc().nullsLast().op('enum_ops')),
    uniqueIndex('deliveries_tracking_id_key').using(
      'btree',
      table.trackingId.asc().nullsLast().op('text_ops'),
    ),
    index('deliveries_tracking_id_pin_idx').using(
      'btree',
      table.trackingId.asc().nullsLast().op('text_ops'),
      table.pin.asc().nullsLast().op('text_ops'),
    ),
    index('deliveries_pickup_phone_idx').using(
      'btree',
      table.pickupPhone.asc().nullsLast().op('text_ops'),
    ),
    index('deliveries_drop_off_phone_idx').using(
      'btree',
      table.dropOffPhone.asc().nullsLast().op('text_ops'),
    ),
    index('deliveries_pickup_state_idx').on(table.pickupState),
    index('deliveries_creator_platform_idx').on(table.creatorPlatform),
    index('deliveries_status_created_at_idx').using(
      'btree',
      table.status.asc().nullsLast().op('enum_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('deliveries_status_scheduled_at_idx').using(
      'btree',
      table.status.asc().nullsLast().op('enum_ops'),
      table.scheduledAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('deliveries_created_at_idx').using(
      'btree',
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'deliveries_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
    foreignKey({
      columns: [table.riderId],
      foreignColumns: [riders.id],
      name: 'deliveries_rider_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
);

export const riders = pgTable(
  'riders',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    userId: text('user_id').notNull(),
    email: text().notNull(),
    fullName: text('full_name').notNull(),
    vehicleType: vehicleType('vehicle_type').default(VehicleType.BIKE).notNull(),
    approvalStatus: approvalStatus('approval_status').default(ApprovalStatus.PENDING).notNull(),
    status: riderStatus().notNull(),
    lastLat: doublePrecision('last_lat'),
    lastLng: doublePrecision('last_lng'),
    lastSeen: timestamp('last_seen', { precision: 3, mode: 'date' }),
    fcmToken: text('fcm_token'),
    companyId: text('company_id'),
    phoneNumber: text('phone_number'),
    metadata: jsonb(),
    deactivatedAt: timestamp('deactivated_at', { precision: 3, mode: 'date' }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('riders_company_id_idx').using('btree', table.companyId.asc().nullsLast().op('text_ops')),
    index('riders_company_id_status_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.status.asc().nullsLast().op('enum_ops'),
    ),
    index('riders_company_id_approval_status_idx')
      .using('btree', table.companyId.asc().nullsLast().op('text_ops'))
      .where(sql`approval_status = ${sql.raw(`'${ApprovalStatus.APPROVED}'`)}`),
    index('riders_company_id_updated_at_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.updatedAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('riders_approval_status_idx').using(
      'btree',
      table.approvalStatus.asc().nullsLast().op('enum_ops'),
    ),
    uniqueIndex('riders_email_key').using('btree', table.email.asc().nullsLast().op('text_ops')),
    index('riders_status_last_seen_idx').using(
      'btree',
      table.status.asc().nullsLast().op('enum_ops'),
      table.lastSeen.asc().nullsLast().op('timestamp_ops'),
    ),
    uniqueIndex('riders_user_id_key').using('btree', table.userId.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'riders_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
);

export const paymentTransactions = pgTable(
  'payment_transactions',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    companyId: text('company_id'),
    type: transactionType('type').notNull(),
    amount: doublePrecision().notNull(),
    currency: currencyEnum().default(Currency.NGN).notNull(),
    status: transactionStatus().default(TransactionStatus.PENDING).notNull(),
    reference: text().notNull(),
    provider: paymentProvider('provider'),
    description: text(),
    metadata: jsonb(),
    processedAt: timestamp('processed_at', { precision: 3, mode: 'date' }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('payment_transactions_company_id_created_at_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('payment_transactions_type_idx').using(
      'btree',
      table.type.asc().nullsLast().op('enum_ops'),
    ),
    uniqueIndex('payment_transactions_reference_key').using(
      'btree',
      table.reference.asc().nullsLast().op('text_ops'),
    ),
    index('payment_transactions_status_idx').using(
      'btree',
      table.status.asc().nullsLast().op('enum_ops'),
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'payment_transactions_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ],
);

export const subscriptionTransactions = pgTable(
  'subscription_transactions',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    companyId: text('company_id').notNull(),
    amount: doublePrecision().notNull(),
    currency: currencyEnum().default(Currency.NGN).notNull(),
    status: transactionStatus().default(TransactionStatus.PENDING).notNull(),
    reference: text().notNull(),
    provider: paymentProvider('provider'),
    tier: subscriptionTier('tier').notNull(),
    periodStart: timestamp('period_start', { precision: 3, mode: 'date' }).notNull(),
    periodEnd: timestamp('period_end', { precision: 3, mode: 'date' }),
    description: text(),
    metadata: jsonb(),
    processedAt: timestamp('processed_at', { precision: 3, mode: 'date' }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('subscription_transactions_company_id_created_at_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('subscription_transactions_status_idx').using(
      'btree',
      table.status.asc().nullsLast().op('enum_ops'),
    ),
    uniqueIndex('subscription_transactions_reference_key').using(
      'btree',
      table.reference.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'subscription_transactions_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ],
);

export const deliveryAllocations = pgTable(
  'delivery_allocations',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    deliveryId: text('delivery_id').notNull(),
    transactionId: text('transaction_id').notNull(),
    amount: doublePrecision().notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex('delivery_allocations_delivery_id_transaction_id_key').using(
      'btree',
      table.deliveryId.asc().nullsLast().op('text_ops'),
      table.transactionId.asc().nullsLast().op('text_ops'),
    ),
    index('delivery_allocations_transaction_id_idx').using(
      'btree',
      table.transactionId.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.deliveryId],
      foreignColumns: [deliveries.id],
      name: 'delivery_allocations_delivery_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.transactionId],
      foreignColumns: [paymentTransactions.id],
      name: 'delivery_allocations_transaction_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const ledgerTransactions = pgTable(
  'ledger_transactions',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    companyId: text('company_id').notNull(),
    amount: doublePrecision().notNull(),
    adjustmentType: ledgerAdjustmentType('adjustment_type').notNull(),
    reference: text().notNull(),
    reason: text(),
    performedBy: text('performed_by'),
    metadata: jsonb(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('ledger_transactions_company_id_created_at_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    uniqueIndex('ledger_transactions_reference_key').using(
      'btree',
      table.reference.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'ledger_transactions_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ],
);

export const eventLogs = pgTable(
  'event_logs',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    eventType: eventType('event_type').notNull(),
    entityType: entityType('entity_type').notNull(),
    entityId: text('entity_id').notNull(),
    actorId: text('actor_id'),
    companyId: text('company_id'),
    metadata: jsonb(),
    success: boolean().default(true).notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('event_logs_actor_id_created_at_idx').using(
      'btree',
      table.actorId.asc().nullsLast().op('text_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('event_logs_company_id_created_at_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('event_logs_entity_id_created_at_idx').using(
      'btree',
      table.entityId.asc().nullsLast().op('text_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('event_logs_event_type_created_at_idx').using(
      'btree',
      table.eventType.asc().nullsLast().op('enum_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('event_logs_event_type_success_created_at_idx').using(
      'btree',
      table.eventType.asc().nullsLast().op('enum_ops'),
      table.success.asc().nullsLast().op('bool_ops'),
      table.createdAt.desc().nullsLast().op('timestamp_ops'),
    ),
    index('event_logs_company_entity_type_event_created_at_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.entityType.asc().nullsLast().op('enum_ops'),
      table.eventType.asc().nullsLast().op('enum_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('event_logs_created_at_idx').using(
      'btree',
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
  ],
);

export const jobQueue = pgTable(
  'job_queue',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    type: text().notNull(),
    payload: jsonb(),
    status: jobStatusEnum().default(JobStatus.PENDING).notNull(),
    priority: integer().default(0).notNull(),
    maxRetries: integer('max_retries').default(3).notNull(),
    retryCount: integer('retry_count').default(0).notNull(),
    lastError: text('last_error'),
    scheduledAt: timestamp('scheduled_at', { precision: 3, mode: 'date' }),
    startedAt: timestamp('started_at', { precision: 3, mode: 'date' }),
    completedAt: timestamp('completed_at', { precision: 3, mode: 'date' }),
    companyId: text('company_id'),
    dedupeKey: text('dedupe_key'),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('job_queue_type_status_idx').using(
      'btree',
      table.type.asc().nullsLast().op('text_ops'),
      table.status.asc().nullsLast().op('enum_ops'),
    ),
    index('job_queue_status_priority_created_at_idx').using(
      'btree',
      table.status.asc().nullsLast().op('enum_ops'),
      table.priority.desc().nullsLast().op('int4_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('job_queue_scheduled_at_idx').using(
      'btree',
      table.scheduledAt.asc().nullsLast().op('timestamp_ops'),
    ),
    jobQueueDedupeKeyUnique,
    jobQueueExportCountIdx,
  ],
);

export const jobQueueDedupeKeyUnique: IndexBuilder = uniqueIndex('job_queue_dedupe_key_unique')
  .on(sql`${jobQueue.dedupeKey}`)
  .where(
    sql`${jobQueue.dedupeKey} IS NOT NULL AND ${jobQueue.status} IN (${sql.raw(`'${JobStatus.PENDING}', '${JobStatus.PROCESSING}'`)})`,
  );

export const jobQueueExportCountIdx: IndexBuilder = index('job_queue_export_count_idx').on(
  sql`${jobQueue.type}`,
  sql`${jobQueue.companyId}`,
  sql`${jobQueue.createdAt}`,
);

export const eventOutbox = pgTable(
  'event_outbox',
  {
    id: bigint({ mode: 'number' }).generatedAlwaysAsIdentity().notNull().primaryKey(),
    channel: text().notNull(),
    payload: jsonb().notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('event_outbox_channel_id_idx').using(
      'btree',
      table.channel.asc().nullsLast().op('text_ops'),
      table.id.asc().nullsLast().op('int8_ops'),
    ),
    index('event_outbox_created_at_idx').using(
      'btree',
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
  ],
);

/**
 * Legacy daily metrics table. NOT dropped — retained for the backfill/migration
 * path (see scripts/backfill-metrics.ts). New writes go to the unified `metrics`
 * table below; this table exists so the historical data can be migrated 1:1.
 */
export const companyDailyMetrics = pgTable(
  'company_daily_metrics',
  {
    companyId: text('company_id'),
    date: date('date').notNull(),
    totalDeliveries: integer('total_deliveries').notNull().default(0),
    deliveredCount: integer('delivered_count').notNull().default(0),
    cancelledCount: integer('cancelled_count').notNull().default(0),
    failedCount: integer('failed_count').notNull().default(0),
    totalRevenueKobo: integer('total_revenue_kobo').notNull().default(0),
    avgDeliveryTimeMinutes: doublePrecision('avg_delivery_time_minutes'),
    channelBreakdown: jsonb('channel_breakdown').default({}).notNull(),
    extraMetrics: jsonb('extra_metrics').default({}).notNull(),
    peakHour: integer('peak_hour'),
    uniqueRidersActive: integer('unique_riders_active').notNull().default(0),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    // One bar per company per day via a partial unique index (a composite
    // PRIMARY KEY forces NOT NULL on every PK column in Postgres, which would
    // reject the system-wide company_id IS NULL bars).
    uniqueIndex('cdm_company_date_idx')
      .on(table.companyId, table.date)
      .where(sql`${table.companyId} IS NOT NULL`),
    index('cdm_date_idx').using('btree', table.date.asc().nullsLast().op('date_ops')),
    // System-wide pool deliveries (company_id IS NULL) get one bar per day.
    uniqueIndex('cdm_system_date_idx')
      .on(table.date)
      .where(sql`${table.companyId} IS NULL`),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'cdm_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

/**
 * Legacy lifetime metrics table. NOT dropped — retained for the backfill/migration
 * path (see scripts/backfill-metrics.ts). New writes go to the unified `metrics`
 * table below; this table exists so the historical data can be migrated 1:1.
 */
export const companyLifetimeMetrics = pgTable(
  'company_lifetime_metrics',
  {
    companyId: text('company_id'),
    totalDeliveries: integer('total_deliveries').notNull().default(0),
    deliveredCount: integer('delivered_count').notNull().default(0),
    totalRevenueKobo: integer('total_revenue_kobo').notNull().default(0),
    channelBreakdown: jsonb('channel_breakdown').default({}).notNull(),
    extraMetrics: jsonb('extra_metrics').default({}).notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    // One row per company AND at most one system-wide row (company_id IS NULL)
    // via a single unique constraint. A partial unique index cannot express the
    // system row: Postgres treats NULLs as DISTINCT in unique indexes, so
    // `UNIQUE (company_id) WHERE company_id IS NULL` would allow unbounded NULL
    // rows (reproduced live). NULLS NOT DISTINCT makes the NULL company_id
    // conflict like any value — one row per company_id plus exactly one system
    // row. (A PRIMARY KEY would force NOT NULL on company_id, rejecting the
    // system row.)
    unique('clm_company_idx').on(table.companyId).nullsNotDistinct(),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'clm_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

/**
 * Unified metrics table. Supersedes company_daily_metrics +
 * company_lifetime_metrics as the write target with a single table keyed by
 * domain + granularity. The legacy tables are NOT dropped — they are retained
 * for the backfill/migration path (see their definitions above and
 * scripts/backfill-metrics.ts).
 *
 * - `company_id` NULL = system-wide pool bucket (all companies summed).
 * - `domain` = DELIVERIES | CONVERSATIONS | RIDERS | REVENUE; each domain only
 *   fills the columns that are meaningful for it (see metrics.config.ts for
 *   the per-domain mapping). Unused columns stay at their defaults.
 * - `granularity` = DAY | WEEK | MONTH | LIFETIME. Finer buckets are folded
 *   into coarser ones by the workers' compression ladder per METRICS_RETENTION.
 * - `bucket_start` = bucket boundary date in the Lagos timezone (Monday for
 *   WEEK, the 1st for MONTH). LIFETIME rows use the LIFETIME_BUCKET_START
 *   sentinel so the unique index yields exactly one row per scope+domain.
 *
 * A single UNIQUE NULLS NOT DISTINCT over (company_id, domain, granularity,
 * bucket_start) guarantees one row per company scope AND exactly one system
 * row (NULL company_id treated as equal, not DISTINCT — the same constraint
 * design already used by company_lifetime_metrics).
 */
export const metrics = pgTable(
  'metrics',
  {
    companyId: text('company_id'),
    domain: metricDomain('domain').notNull(),
    granularity: metricGranularity('granularity').notNull(),
    bucketStart: date('bucket_start').notNull(),
    totalCount: integer('total_count').notNull().default(0),
    deliveredCount: integer('delivered_count').notNull().default(0),
    cancelledCount: integer('cancelled_count').notNull().default(0),
    failedCount: integer('failed_count').notNull().default(0),
    totalRevenueKobo: integer('total_revenue_kobo').notNull().default(0),
    avgDeliveryTimeMinutes: doublePrecision('avg_delivery_time_minutes'),
    channelBreakdown: jsonb('channel_breakdown').default({}).notNull(),
    extraMetrics: jsonb('extra_metrics').default({}).notNull(),
    peakHour: integer('peak_hour'),
    uniqueRidersActive: integer('unique_riders_active').notNull().default(0),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    // One row per (company scope, domain, granularity, bucket) — covers both
    // company rows and the NULL system row via NULLS NOT DISTINCT. A plain
    // unique constraint (not partial unique index) so the NULL company_id
    // conflicts like any value — exactly one system row per domain/granularity.
    unique('metrics_scope_domain_granularity_bucket_idx')
      .on(table.companyId, table.domain, table.granularity, table.bucketStart)
      .nullsNotDistinct(),
    // Range scans for a company's series (read path).
    index('metrics_company_domain_granularity_idx').on(
      table.companyId,
      table.domain,
      table.granularity,
      table.bucketStart,
    ),
    // Range scans for the system-wide series (admin read path).
    index('metrics_system_domain_granularity_idx')
      .on(table.domain, table.granularity, table.bucketStart)
      .where(sql`${table.companyId} IS NULL`),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'metrics_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);
