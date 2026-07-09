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
  MappingPlatform,
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
  VehicleType,
} from '../enums.js';
import { Currency } from '../enums.js';

const createId = () => randomUUID();

const DEFAULT_WORKING_HOURS: Record<string, { start: string; close: string }> = {
  Monday: { start: '07:00', close: '19:00' },
  Tuesday: { start: '07:00', close: '19:00' },
  Wednesday: { start: '07:00', close: '19:00' },
  Thursday: { start: '07:00', close: '19:00' },
  Friday: { start: '07:00', close: '19:00' },
  Saturday: { start: '07:00', close: '19:00' },
};

const enumValues = <T extends Record<string, string>>(e: T): [string, ...string[]] =>
  Object.values(e) as [string, ...string[]];

export const deliveryStatus = pgEnum('DeliveryStatus', enumValues(DeliveryStatus));
export const exportRequestStatus = pgEnum('ExportRequestStatus', enumValues(ExportRequestStatus));
export const ledgerAdjustmentType = pgEnum(
  'LedgerAdjustmentType',
  enumValues(LedgerAdjustmentType),
);
export const mappingPlatform = pgEnum('MappingPlatform', enumValues(MappingPlatform));
export const messageStatus = pgEnum('MessageStatus', enumValues(MessageStatus));
export const paymentMethod = pgEnum('PaymentMethod', enumValues(PaymentMethod));
export const permitStatus = pgEnum('PermitStatus', enumValues(ApprovalStatus));
export const riderStatus = pgEnum('RiderStatus', enumValues(RiderStatus));
export const senderType = pgEnum('SenderType', enumValues(SenderType));
export const subscriptionTier = pgEnum('SubscriptionTier', enumValues(SubscriptionTier));
export const transactionStatus = pgEnum('TransactionStatus', enumValues(TransactionStatus));
export const transactionType = pgEnum('TransactionType', enumValues(TransactionType));
export const vehicleType = pgEnum('VehicleType', enumValues(VehicleType));
export const paymentProvider = pgEnum('PaymentProvider', enumValues(PaymentProvider));
export const subscriptionStatus = pgEnum('SubscriptionStatus', enumValues(SubscriptionStatus));
export const channelType = pgEnum('ChannelType', enumValues(ChannelType));

export const companies = pgTable(
  'companies',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    name: text().notNull(),
    logoUrl: text('logo_url'),
    cac: text(),
    contactPhone: text('contact_phone'),
    address: text(),
    placeId: text('place_id'),
    states: text().array().default([]),
    interstateDeliveries: boolean('interstate_deliveries').notNull(),
    verificationStatus: permitStatus('verification_status')
      .default(ApprovalStatus.PENDING)
      .notNull(),
    verificationNote: text('verification_note'),
    deactivatedAt: timestamp('deactivated_at', { precision: 3, mode: 'date' }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('companies_name_idx').using('btree', table.name.asc().nullsLast().op('text_ops')),
    index('companies_states_gin_idx').using('gin', table.states),
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
      .default(SubscriptionStatus.PENDING)
      .notNull(),
    periodStart: timestamp('period_start', { precision: 3, mode: 'date' }),
    periodEnd: timestamp('period_end', { precision: 3, mode: 'date' }),
    lockedAt: timestamp('locked_at', { precision: 3, mode: 'date' }),
    workingHours: jsonb('working_hours').default(DEFAULT_WORKING_HOURS).notNull(),
    bankDetails: jsonb('bank_details'),
    enterpriseQuote: jsonb('enterprise_quote'),
    ledgerBalance: doublePrecision('ledger_balance').default(0).notNull(),
    companyCode: text('company_code'),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
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
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'company_settings_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const pricingSchemes = pgTable(
  'pricing_schemes',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    companyId: text('company_id').notNull(),
    vehicleType: vehicleType('vehicle_type').default(VehicleType.BIKE).notNull(),
    baseFare: doublePrecision('base_fare').default(1000).notNull(),
    perKmRate: doublePrecision('per_km_rate').default(150).notNull(),
    minFare: doublePrecision('min_fare').default(1000).notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex('pricing_schemes_company_id_vehicle_type_key').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.vehicleType.asc().nullsLast().op('enum_ops'),
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'pricing_schemes_company_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ],
);

export const companyIntegrations = pgTable(
  'company_integrations',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    platform: mappingPlatform().notNull(),
    platformId: text('platform_id').notNull(),
    companyId: text('company_id').notNull(),
    isActive: boolean('is_active').default(false).notNull(),
    metadata: jsonb(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('company_integrations_company_id_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
    ),
    index('company_integrations_is_active_idx').using(
      'btree',
      table.isActive.asc().nullsLast().op('bool_ops'),
    ),
    index('company_integrations_company_id_is_active_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.isActive.asc().nullsLast().op('bool_ops'),
    ),
    uniqueIndex('company_integrations_platform_company_id_key').using(
      'btree',
      table.platform.asc().nullsLast().op('enum_ops'),
      table.companyId.asc().nullsLast().op('text_ops'),
    ),
    uniqueIndex('company_integrations_platform_platform_id_key').using(
      'btree',
      table.platform.asc().nullsLast().op('enum_ops'),
      table.platformId.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'company_integrations_company_id_fkey',
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
    platform: mappingPlatform().default(MappingPlatform.WHATSAPP).notNull(),
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
    index('conversations_auto_reply_disabled_idx')
      .on(table.companyId, table.lastMessageAt)
      .where(sql`auto_reply_enabled = false AND company_id IS NULL`),
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
    index('messages_conversation_id_idx').using(
      'btree',
      table.conversationId.asc().nullsLast().op('text_ops'),
    ),
    index('messages_external_id_idx').using(
      'btree',
      table.externalId.asc().nullsLast().op('text_ops'),
    ),
    uniqueIndex('messages_external_id_key').using(
      'btree',
      table.externalId.asc().nullsLast().op('text_ops'),
    ),
    index('messages_reply_to_external_id_idx').using(
      'btree',
      table.replyToExternalId.asc().nullsLast().op('text_ops'),
    ),
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
    permitStatus: permitStatus('permit_status').default(ApprovalStatus.PENDING).notNull(),
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
    pickupPlaceId: text('pickup_place_id'),
    pickupLat: doublePrecision('pickup_lat'),
    pickupLng: doublePrecision('pickup_lng'),
    dropOffAddress: text('drop_off_address').notNull(),
    dropOffPlaceId: text('drop_off_place_id'),
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
    proofOfDeliveryImagePath: text('proof_of_delivery_image_path'),
    price: doublePrecision(),
    metadata: jsonb(),
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
    index('deliveries_created_at_idx').using(
      'btree',
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('deliveries_rider_id_status_idx').using(
      'btree',
      table.riderId.asc().nullsLast().op('text_ops'),
      table.status.asc().nullsLast().op('enum_ops'),
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
    index('deliveries_created_by_idx').using(
      'btree',
      table.createdBy.asc().nullsLast().op('text_ops'),
    ),
    index('deliveries_pickup_phone_idx').using(
      'btree',
      table.pickupPhone.asc().nullsLast().op('text_ops'),
    ),
    index('deliveries_drop_off_phone_idx').using(
      'btree',
      table.dropOffPhone.asc().nullsLast().op('text_ops'),
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
    phoneNumber: text('phone_number'),
    registrationNumber: text('registration_number'),
    idType: text('id_type'),
    vehicleType: vehicleType('vehicle_type').default(VehicleType.BIKE).notNull(),
    permitStatus: permitStatus('permit_status').default(ApprovalStatus.PENDING).notNull(),
    isAccepted: boolean('is_accepted').default(false).notNull(),
    status: riderStatus().notNull(),
    lastLat: doublePrecision('last_lat'),
    lastLng: doublePrecision('last_lng'),
    lastSeen: timestamp('last_seen', { precision: 3, mode: 'date' }),
    batteryLevel: integer('battery_level'),
    fcmToken: text('fcm_token'),
    companyId: text('company_id'),
    deactivatedAt: timestamp('deactivated_at', { precision: 3, mode: 'date' }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('riders_company_id_status_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.status.asc().nullsLast().op('enum_ops'),
    ),
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
    currency: text().default(Currency.NGN).notNull(),
    status: transactionStatus().default(TransactionStatus.PENDING).notNull(),
    reference: text().notNull(),
    provider: paymentProvider('provider'),
    tier: subscriptionTier('tier'),
    periodStart: timestamp('period_start', { precision: 3, mode: 'date' }),
    periodEnd: timestamp('period_end', { precision: 3, mode: 'date' }),
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
    index('payment_transactions_company_id_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
    ),
    index('payment_transactions_type_idx').using(
      'btree',
      table.type.asc().nullsLast().op('enum_ops'),
    ),
    index('payment_transactions_reference_idx').using(
      'btree',
      table.reference.asc().nullsLast().op('text_ops'),
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
    index('delivery_allocations_delivery_id_idx').using(
      'btree',
      table.deliveryId.asc().nullsLast().op('text_ops'),
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
    index('ledger_transactions_reference_idx').using(
      'btree',
      table.reference.asc().nullsLast().op('text_ops'),
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
    eventType: text('event_type').notNull(),
    entityType: text('entity_type').notNull(),
    entityId: text('entity_id').notNull(),
    actorId: text('actor_id'),
    actorType: text('actor_type'),
    companyId: text('company_id'),
    payload: jsonb(),
    traceId: text('trace_id'),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
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
      table.eventType.asc().nullsLast().op('text_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('event_logs_event_type_success_created_at_idx').using(
      'btree',
      table.eventType.asc().nullsLast().op('text_ops'),
      table.success.asc().nullsLast().op('bool_ops'),
      table.createdAt.desc().nullsLast().op('timestamp_ops'),
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
    userEmail: text('user_email').notNull(),
    status: exportRequestStatus().default(ExportRequestStatus.PENDING).notNull(),
    requestedBy: text('requested_by').notNull(),
    targetMonth: text('target_month'),
    riderId: text('rider_id'),
    downloadUrl: text('download_url'),
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
  ],
);

export const escalationStatus = pgEnum('EscalationStatus', enumValues(EscalationStatus));
export const escalatedTo = pgEnum('EscalatedTo', enumValues(EscalatedTo));

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
    reason: text(),
    status: escalationStatus().default(EscalationStatus.OPEN).notNull(),
    resolvedBy: text('resolved_by'),
    hijackedBy: text('hijacked_by'),
    hijackedAt: timestamp('hijacked_at', { precision: 3, mode: 'date' }),
    resolvedAt: timestamp('resolved_at', { precision: 3, mode: 'date' }),
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
    date: text('date').notNull(), // YYYY-MM-DD format
    totalDeliveries: integer('total_deliveries').notNull().default(0),
    deliveredCount: integer('delivered_count').notNull().default(0),
    cancelledCount: integer('cancelled_count').notNull().default(0),
    awaitingPaymentCount: integer('awaiting_payment_count').notNull().default(0),
    totalRevenueKobo: integer('total_revenue_kobo').notNull().default(0),
    avgDeliveryTimeMinutes: doublePrecision('avg_delivery_time_minutes'),
    avgAssignmentTimeMinutes: doublePrecision('avg_assignment_time_minutes'),
    whatsappOrders: integer('whatsapp_orders').notNull().default(0),
    instagramOrders: integer('instagram_orders').notNull().default(0),
    facebookOrders: integer('facebook_orders').notNull().default(0),
    tiktokOrders: integer('tiktok_orders').notNull().default(0),
    manualOrders: integer('manual_orders').notNull().default(0),
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
    index('cdm_company_id_date_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.date.asc().nullsLast().op('text_ops'),
    ),
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
