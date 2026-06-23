const createId = () => globalThis.crypto.randomUUID();
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
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const deliveryStatus = pgEnum('DeliveryStatus', [
  'AWAITING_PAYMENT',
  'PENDING',
  'ASSIGNED',
  'IN_TRANSIT',
  'DELIVERED',
  'CANCELLED',
]);
export const exportRequestStatus = pgEnum('ExportRequestStatus', [
  'PENDING',
  'PROCESSING',
  'COMPLETED',
  'FAILED',
]);
export const ledgerAdjustmentType = pgEnum('LedgerAdjustmentType', [
  'CREDIT',
  'DEBIT',
  'CORRECTION',
  'REFUND',
]);
export const mappingPlatform = pgEnum('MappingPlatform', [
  'WHATSAPP',
  'INSTAGRAM',
  'TIKTOK',
  'FACEBOOK',
]);
export const mappingSource = pgEnum('MappingSource', ['MANUAL', 'DISCOVERY']);
export const messageStatus = pgEnum('MessageStatus', ['SENT', 'DELIVERED', 'READ', 'FAILED']);
export const paymentMethod = pgEnum('PaymentMethod', ['PREPAID', 'POD']);
export const permitStatus = pgEnum('PermitStatus', ['PENDING', 'APPROVED', 'REJECTED']);
export const riderStatus = pgEnum('RiderStatus', ['OFFLINE', 'ONLINE', 'BUSY']);
export const role = pgEnum('Role', ['DISPATCHER', 'COMPANY', 'RIDER', 'CUSTOMER', 'ADMIN']);
export const senderType = pgEnum('SenderType', ['CUSTOMER', 'AGENT', 'DISPATCHER', 'SYSTEM']);
export const subscriptionTier = pgEnum('SubscriptionTier', ['FREE', 'STARTER', 'PROFESSIONAL']);
export const transactionStatus = pgEnum('TransactionStatus', [
  'PENDING',
  'SUCCESS',
  'FAILED',
  'REVERSED',
]);
export const vehicleType = pgEnum('VehicleType', ['BIKE', 'CAR', 'VAN', 'TRUCK']);

export const companies = pgTable(
  'companies',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    name: text().notNull(),
    businessHandle: text('business_handle'),
    logoUrl: text('logo_url'),
    cac: text(),
    contactPhone: text('contact_phone'),
    address: text(),
    placeId: text('place_id'),
    states: text().array().default(['RAY']),
    interstateDeliveries: boolean('interstate_deliveries').notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex('companies_business_handle_key').using(
      'btree',
      table.businessHandle.asc().nullsLast().op('text_ops'),
    ),
    index('companies_name_idx').using('btree', table.name.asc().nullsLast().op('text_ops')),
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
    tier: subscriptionTier().default('FREE').notNull(),
    workingHours: jsonb('working_hours')
      .default({
        Friday: { close: '19:00', start: '07:00' },
        Monday: { close: '19:00', start: '07:00' },
        Tuesday: { close: '19:00', start: '07:00' },
        Saturday: { close: '19:00', start: '07:00' },
        Thursday: { close: '19:00', start: '07:00' },
        Wednesday: { close: '19:00', start: '07:00' },
      })
      .notNull(),
    bankDetails: jsonb('bank_details'),
    ledgerBalance: doublePrecision('ledger_balance').default(0).notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex('company_settings_company_id_key').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
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
    vehicleType: vehicleType('vehicle_type').default('BIKE').notNull(),
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
    isPlatformOwned: boolean('is_platform_owned').default(true).notNull(),
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
    platform: mappingPlatform().default('WHATSAPP').notNull(),
    platformId: text('platform_id').notNull(),
    companyId: text('company_id').notNull(),
    lastMessageAt: timestamp('last_message_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'date' }).notNull(),
    autoReplyEnabled: boolean('auto_reply_enabled').default(true).notNull(),
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
    status: messageStatus().default('SENT').notNull(),
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
    permitStatus: permitStatus('permit_status').default('PENDING').notNull(),
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
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'date' }).notNull(),
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
    vehicleType: vehicleType('vehicle_type').default('BIKE').notNull(),
    permitStatus: permitStatus('permit_status').default('PENDING').notNull(),
    isAccepted: boolean('is_accepted').default(false).notNull(),
    status: riderStatus().notNull(),
    lastLat: doublePrecision('last_lat'),
    lastLng: doublePrecision('last_lng'),
    lastSeen: timestamp('last_seen', { precision: 3, mode: 'date' }),
    batteryLevel: integer('battery_level'),
    fcmToken: text('fcm_token'),
    companyId: text('company_id'),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { precision: 3, mode: 'date' }).notNull(),
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

export const deliveryTransactions = pgTable(
  'delivery_transactions',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    companyId: text('company_id'),
    amount: doublePrecision().notNull(),
    currency: text().default('NGN').notNull(),
    status: transactionStatus().default('PENDING').notNull(),
    reference: text().notNull(),
    provider: text(),
    metadata: jsonb(),
    processedAt: timestamp('processed_at', { precision: 3, mode: 'date' }),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('delivery_transactions_company_id_created_at_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
    index('delivery_transactions_reference_idx').using(
      'btree',
      table.reference.asc().nullsLast().op('text_ops'),
    ),
    uniqueIndex('delivery_transactions_reference_key').using(
      'btree',
      table.reference.asc().nullsLast().op('text_ops'),
    ),
    index('delivery_transactions_status_created_at_idx').using(
      'btree',
      table.status.asc().nullsLast().op('enum_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
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
    deliveryTransactionId: text('delivery_transaction_id').notNull(),
    amount: doublePrecision().notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    uniqueIndex('delivery_allocations_delivery_id_delivery_transaction_id_key').using(
      'btree',
      table.deliveryId.asc().nullsLast().op('text_ops'),
      table.deliveryTransactionId.asc().nullsLast().op('text_ops'),
    ),
    index('delivery_allocations_delivery_id_idx').using(
      'btree',
      table.deliveryId.asc().nullsLast().op('text_ops'),
    ),
    index('delivery_allocations_delivery_transaction_id_idx').using(
      'btree',
      table.deliveryTransactionId.asc().nullsLast().op('text_ops'),
    ),
    foreignKey({
      columns: [table.deliveryId],
      foreignColumns: [deliveries.id],
      name: 'delivery_allocations_delivery_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.deliveryTransactionId],
      foreignColumns: [deliveryTransactions.id],
      name: 'delivery_allocations_delivery_transaction_id_fkey',
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
    status: exportRequestStatus().default('PENDING').notNull(),
    requestedBy: text('requested_by').notNull(),
    targetMonth: text('target_month'),
    riderId: text('rider_id'),
    requestedAt: timestamp('requested_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    completedAt: timestamp('completed_at', { precision: 3, mode: 'date' }),
    downloadUrl: text('download_url'),
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

export const appConfigs = pgTable('app_configs', {
  key: text().primaryKey().notNull(),
  value: jsonb().notNull(),
  scope: text(),
  updatedAt: timestamp('updated_at', { precision: 3, mode: 'date' }).notNull(),
});

export const subscriptionTransactions = pgTable(
  'subscription_transactions',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    companyId: text('company_id').notNull(),
    amount: doublePrecision().notNull(),
    currency: text().default('NGN').notNull(),
    status: transactionStatus().default('PENDING').notNull(),
    reference: text().notNull(),
    provider: text(),
    tier: subscriptionTier().notNull(),
    periodStart: timestamp('period_start', { precision: 3, mode: 'date' }).notNull(),
    periodEnd: timestamp('period_end', { precision: 3, mode: 'date' }).notNull(),
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
    index('subscription_transactions_reference_idx').using(
      'btree',
      table.reference.asc().nullsLast().op('text_ops'),
    ),
    uniqueIndex('subscription_transactions_reference_key').using(
      'btree',
      table.reference.asc().nullsLast().op('text_ops'),
    ),
    index('subscription_transactions_status_created_at_idx').using(
      'btree',
      table.status.asc().nullsLast().op('enum_ops'),
      table.createdAt.asc().nullsLast().op('timestamp_ops'),
    ),
  ],
);

export const customerCompanyMappings = pgTable(
  'customer_company_mappings',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId())
      .notNull(),
    platformId: text('platform_id').notNull(),
    platform: mappingPlatform().default('WHATSAPP').notNull(),
    companyId: text('company_id').notNull(),
    source: mappingSource().default('DISCOVERY').notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'date' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    metadata: jsonb(),
  },
  (table) => [
    index('customer_company_mappings_company_id_idx').using(
      'btree',
      table.companyId.asc().nullsLast().op('text_ops'),
    ),
    index('customer_company_mappings_platform_id_idx').using(
      'btree',
      table.platformId.asc().nullsLast().op('text_ops'),
    ),
    uniqueIndex('customer_company_mappings_platform_id_platform_company_id_key').using(
      'btree',
      table.platformId.asc().nullsLast().op('text_ops'),
      table.platform.asc().nullsLast().op('enum_ops'),
      table.companyId.asc().nullsLast().op('text_ops'),
    ),
    index('customer_company_mappings_platform_id_platform_idx').using(
      'btree',
      table.platformId.asc().nullsLast().op('text_ops'),
      table.platform.asc().nullsLast().op('enum_ops'),
    ),
    foreignKey({
      columns: [table.companyId],
      foreignColumns: [companies.id],
      name: 'customer_company_mappings_company_id_fkey',
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
