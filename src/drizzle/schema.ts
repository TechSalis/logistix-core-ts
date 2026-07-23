import { randomUUID } from 'node:crypto';
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
  pgEnum,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import {
  ChannelType,
  DeliveryStatus,
  EscalatedTo,
  EscalationStatus,
  ExportRequestStatus,
  LedgerAdjustmentType,
  ChannelPlatform,
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
} from '../enums.js';
import { DEFAULT_WORKING_HOURS } from '../config.js';

const createId = () => randomUUID();

const enumValues = <T extends Record<string, string>>(e: T): [string, ...string[]] =>
  Object.values(e) as [string, ...string[]];

export const deliveryStatus = pgEnum('DeliveryStatus', enumValues(DeliveryStatus));
export const exportRequestStatus = pgEnum('ExportRequestStatus', enumValues(ExportRequestStatus));
export const ledgerAdjustmentType = pgEnum(
  'LedgerAdjustmentType',
  enumValues(LedgerAdjustmentType),
);
export const channelPlatform = pgEnum('ChannelPlatform', enumValues(ChannelPlatform));
export const messageStatus = pgEnum('MessageStatus', enumValues(MessageStatus));
export const paymentMethod = pgEnum('PaymentMethod', enumValues(PaymentMethod));
export const approvalStatus = pgEnum('ApprovalStatus', enumValues(ApprovalStatus));
export const riderStatus = pgEnum('RiderStatus', enumValues(RiderStatus));
export const senderType = pgEnum('SenderType', enumValues(SenderType));
export const subscriptionTier = pgEnum('SubscriptionTier', enumValues(SubscriptionTier));
export const transactionStatus = pgEnum('TransactionStatus', enumValues(TransactionStatus));
export const transactionType = pgEnum('TransactionType', enumValues(TransactionType));
export const vehicleType = pgEnum('VehicleType', enumValues(VehicleType));
export const paymentProvider = pgEnum('PaymentProvider', enumValues(PaymentProvider));
export const subscriptionStatus = pgEnum('SubscriptionStatus', enumValues(SubscriptionStatus));
export const channelType = pgEnum('ChannelType', enumValues(ChannelType));
export const escalatedTo = pgEnum('EscalatedTo', enumValues(EscalatedTo));
export const escalationStatus = pgEnum('EscalationStatus', enumValues(EscalationStatus));
export const eventType = pgEnum('EventType', enumValues(EventType));
export const entityType = pgEnum('EntityType', enumValues(EntityType));
export const currencyEnum = pgEnum('Currency', enumValues(Currency));

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
    states: text().array().default([]),
    interstateDeliveries: boolean('interstate_deliveries').default(false).notNull(),
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
    tier: subscriptionTier().default(SubscriptionTier.STARTER).notNull(),
    subscriptionStatus: subscriptionStatus('subscription_status')
      .default(SubscriptionStatus.TRIAL)
      .notNull(),
    periodStart: timestamp('period_start', { precision: 3, mode: 'date' }),
    periodEnd: timestamp('period_end', { precision: 3, mode: 'date' }),
    squadTokenId: text('squad_token_id'),
    workingHours: jsonb('working_hours').default(DEFAULT_WORKING_HOURS).notNull(),
    bankDetails: jsonb('bank_details'),
    virtualAccountNumber: text('virtual_account_number'),

    ledgerBalance: doublePrecision('ledger_balance').default(0).notNull(),
    companyCode: text('company_code'),
    escalatedTo: escalatedTo('escalated_to').default(EscalatedTo.ADMIN).notNull(),
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
    index('company_settings_virtual_account_number_idx').on(table.virtualAccountNumber),

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
    isActive: boolean('is_active').default(false).notNull(),
    metadata: jsonb(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('company_channels_is_active_idx').using(
      'btree',
      table.isActive.asc().nullsLast().op('bool_ops'),
    ),
    index('company_channels_company_id_is_active_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.isActive.asc().nullsLast().op('bool_ops'),
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
    platform: channelPlatform().default(ChannelPlatform.WHATSAPP).notNull(),
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
    autoReplyEnabled: boolean('auto_reply_enabled').default(true).notNull(),
    channelType: channelType('channel_type').default(ChannelType.LOGISTIX_NETWORK).notNull(),
    lastCustomerMessageAt: timestamp('last_customer_message_at', { precision: 3, mode: 'date' }),
    scratchpad: jsonb(),
    customerName: text('customer_name'),
    timezone: text('timezone'),
    handledBy: text('handled_by'),
    handledByType: text('handled_by_type').default('ai').notNull(),
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
    fcmToken: text('fcm_token'),
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
    isOwner: boolean('is_owner').default(false).notNull(),
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
    expiresAt: timestamp('expires_at', { precision: 3, mode: 'date' }).notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('blocked_ips_expires_at_idx').using(
      'btree',
      table.expiresAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('blocked_ips_ip_address_idx').using(
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
    pickupLat: doublePrecision('pickup_lat'),
    pickupLng: doublePrecision('pickup_lng'),
    dropOffAddress: text('drop_off_address').notNull(),
    dropOffLat: doublePrecision('drop_off_lat'),
    dropOffLng: doublePrecision('drop_off_lng'),
    pickupPhone: text('pickup_phone'),
    dropOffPhone: text('drop_off_phone'),
    description: text(),
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
    pool: boolean('pool').notNull().default(false),
    metadata: jsonb(),
    pickupState: text('pickup_state'),
    dropOffState: text('drop_off_state'),
    creatorPlatform: text('creator_platform'),
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
    index('deliveries_status_idx').using('btree', table.status.asc().nullsLast().op('enum_ops')),
    index('deliveries_pool_true_idx')
      .using('btree', table.pool.asc().nullsLast().op('bool_ops'))
      .where(sql`pool = true`),
    index('deliveries_pool_status_rider_idx')
      .using(
        'btree',
        table.pool.asc().nullsLast().op('bool_ops'),
        table.status.asc().nullsLast().op('enum_ops'),
        table.riderId.asc().nullsLast().op('text_ops'),
      )
      .where(sql`pool = true`),
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
    isAccepted: boolean('is_accepted').default(false).notNull(),
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
    index('riders_company_id_is_accepted_idx')
      .using('btree', table.companyId.asc().nullsLast().op('text_ops'))
      .where(sql`is_accepted = true`),
    index('riders_company_id_updated_at_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.updatedAt.asc().nullsLast().op('timestamp_ops'),
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

export const transactions = pgTable(
  'payment_transactions',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    companyId: text('company_id').notNull(),
    type: transactionType('type').notNull(),
    amount: doublePrecision().notNull(),
    currency: currencyEnum().default(Currency.NGN).notNull(),
    status: transactionStatus().default(TransactionStatus.PENDING).notNull(),
    reference: text().notNull(),
    provider: paymentProvider('provider'),
    tier: subscriptionTier('tier'),
    periodStart: timestamp('period_start', { precision: 3, mode: 'date' }),
    periodEnd: timestamp('period_end', { precision: 3, mode: 'date' }),
    description: text(),
    metadata: jsonb(),
    gatewayReference: text('gateway_reference'),
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
    index('payment_transactions_gateway_reference_idx').on(table.gatewayReference),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'payment_transactions_company_id_fkey',
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
      foreignColumns: [transactions.id],
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
    payload: jsonb(),
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
  ],
);

export const exportRequests = pgTable(
  'export_requests',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    companyId: text('company_id').notNull(),
    status: exportRequestStatus().default(ExportRequestStatus.PENDING).notNull(),
    metadata: jsonb(),
    requestedAt: timestamp('requested_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('export_requests_company_id_status_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.status.asc().nullsLast().op('enum_ops'),
    ),
    index('export_requests_status_idx').using(
      'btree',
      table.status.asc().nullsLast().op('enum_ops'),
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'export_requests_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const escalations = pgTable(
  'escalations',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    conversationId: text('conversation_id').notNull(),
    companyId: text('company_id'),
    escalatedTo: escalatedTo('escalated_to').notNull(),
    status: escalationStatus().default(EscalationStatus.OPEN).notNull(),
    resolution: jsonb(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('escalations_conversation_id_idx').using(
      'btree',
      table.conversationId.asc().nullsLast().op('text_ops'),
    ),
    index('escalations_company_id_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
    ),
    index('escalations_status_idx').using('btree', table.status.asc().nullsLast().op('enum_ops')),
    index('escalations_escalated_to_status_idx').using(
      'btree',
      table.escalatedTo.asc().nullsLast().op('enum_ops'),
      table.status.asc().nullsLast().op('enum_ops'),
    ),
    foreignKey({
      columns: [table.conversationId],
      foreignColumns: [conversations.id],
      name: 'escalations_conversation_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'escalations_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
  ],
);

export const companyDailyMetrics = pgTable(
  'company_daily_metrics',
  {
    companyId: text('company_id').notNull(),
    date: text('date').notNull(),
    totalDeliveries: integer('total_deliveries').notNull().default(0),
    deliveredCount: integer('delivered_count').notNull().default(0),
    cancelledCount: integer('cancelled_count').notNull().default(0),
    failedCount: integer('failed_count').notNull().default(0),
    awaitingPaymentCount: integer('awaiting_payment_count').notNull().default(0),
    totalRevenueKobo: integer('total_revenue_kobo').notNull().default(0),
    avgDeliveryTimeMinutes: doublePrecision('avg_delivery_time_minutes'),
    channelBreakdown: jsonb('channel_breakdown').default({}).notNull(),
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
    primaryKey({ columns: [table.companyId, table.date] }),
    index('cdm_date_idx').using('btree', table.date.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'cdm_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const riderLocationLogs = pgTable(
  'rider_location_logs',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    riderId: text('rider_id').notNull(),
    lat: doublePrecision().notNull(),
    lng: doublePrecision().notNull(),
    status: riderStatus(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('rider_location_logs_created_at_idx').using(
      'btree',
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('rider_location_logs_rider_id_created_at_idx').using(
      'btree',
      table.riderId.asc().nullsLast().op('text_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    foreignKey({
      columns: [table.riderId],
      foreignColumns: [riders.id],
      name: 'rider_location_logs_rider_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);
