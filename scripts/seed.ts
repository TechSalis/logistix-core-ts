/**
 * Seed script — inserts a DB-only verification dataset (no Supabase Auth users).
 *
 * Synthetic user_ids are used for admins/dispatchers/riders since those columns
 * are plain text (no FK to auth.users). All enum columns use explicit
 * `::"Enum"` casts and enum-member imports — never hardcoded string literals.
 *
 * Idempotent: re-running skips rows that already exist (ON CONFLICT DO NOTHING).
 *
 * Usage:
 *   node --env-file=.env.development node_modules/.bin/tsx scripts/seed.ts
 */
import postgres from 'postgres';
import {
  AdminRole,
  ApprovalStatus,
  ChannelPlatform,
  ChannelType,
  Currency,
  DeliveryStatus,
  DispatcherRole,
  EntityType,
  EscalatedTo,
  EventType,
  ExportRequestStatus,
  JobStatus,
  LedgerAdjustmentType,
  MessageStatus,
  PaymentMethod,
  PaymentProvider,
  RiderStatus,
  SenderType,
  SubscriptionStatus,
  SubscriptionTier,
  TransactionStatus,
  TransactionType,
  VehicleType,
} from '../src/enums/enums.js';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('[seed] FATAL: DATABASE_URL environment variable is required');
  process.exit(1);
}

const sql = String.raw;
const WORKING_HOURS = JSON.stringify({
  Monday: { start: '07:00', close: '19:00' },
  Tuesday: { start: '07:00', close: '19:00' },
  Wednesday: { start: '07:00', close: '19:00' },
  Thursday: { start: '07:00', close: '19:00' },
  Friday: { start: '07:00', close: '19:00' },
  Saturday: { start: '07:00', close: '19:00' },
  Sunday: { start: '07:00', close: '19:00' },
});

async function run() {
  const url = new URL(DATABASE_URL);
  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  const connection = postgres(DATABASE_URL, {
    max: 1,
    connect_timeout: 30,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });

  try {
    const seeded = await connection.begin(async (tx) => {
      const insert = (stmt: string) => tx.unsafe(stmt);

      await insert(sql`INSERT INTO "admins" ("id", "user_id", "email", "full_name", "role") VALUES
        ('seed-admin-super', 'seed-user-admin-super', 'admin.super@logistix.test', 'Sade Super', '${AdminRole.SUPER_ADMIN}'::"AdminRole"),
        ('seed-admin-ops', 'seed-user-admin-ops', 'admin.ops@logistix.test', 'Emeka Ops', '${AdminRole.ADMIN}'::"AdminRole")
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "companies" ("id", "name", "cac", "contact_phone", "verification_status", "metadata") VALUES
        ('seed-co-starter', 'Speedy Logistics', 'CAC-1001', '+2348012345000', '${ApprovalStatus.APPROVED}'::"ApprovalStatus", '{"hqCity":"Lagos"}'::jsonb),
        ('seed-co-pro', 'Apex Couriers', 'CAC-1002', '+2348098765000', '${ApprovalStatus.APPROVED}'::"ApprovalStatus", '{"hqCity":"Ibadan"}'::jsonb)
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "company_settings"
        ("id", "company_id", "tier", "subscription_status", "period_start", "period_end", "working_hours", "ledger_balance", "company_code", "escalated_to", "auto_accept_team", "states", "interstate_deliveries") VALUES
        ('seed-set-starter', 'seed-co-starter', '${SubscriptionTier.STARTER}'::"SubscriptionTier", '${SubscriptionStatus.ACTIVE}'::"SubscriptionStatus", NOW() - INTERVAL '30 days', NOW() + INTERVAL '30 days', '${WORKING_HOURS}'::jsonb, 15000, 'LGX-SPDY', '${EscalatedTo.COMPANY}'::"EscalatedTo", false, ARRAY['Lagos'], false),
        ('seed-set-pro', 'seed-co-pro', '${SubscriptionTier.PROFESSIONAL}'::"SubscriptionTier", '${SubscriptionStatus.ACTIVE}'::"SubscriptionStatus", NOW() - INTERVAL '30 days', NOW() + INTERVAL '30 days', '${WORKING_HOURS}'::jsonb, 75000, 'LGX-APEX', '${EscalatedTo.COMPANY}'::"EscalatedTo", false, ARRAY['Lagos','Ogun'], true)
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "company_channels" ("id", "platform", "platform_id", "company_id", "is_active", "metadata", "ai_disabled") VALUES
        ('seed-chan-starter', '${ChannelPlatform.WHATSAPP}'::"ChannelPlatform", '2348012345678', 'seed-co-starter', true, '{"verified":true}'::jsonb, false),
        ('seed-chan-pro', '${ChannelPlatform.WHATSAPP}'::"ChannelPlatform", '2348098765432', 'seed-co-pro', true, '{"verified":true}'::jsonb, false)
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "dispatchers" ("id", "user_id", "email", "full_name", "company_id", "role", "approval_status") VALUES
        ('seed-disp-starter-owner', 'seed-user-owner1', 'owner.starter@logistix.test', 'Ngozi Owner', 'seed-co-starter', '${DispatcherRole.OWNER}'::"DispatcherRole", '${ApprovalStatus.APPROVED}'::"ApprovalStatus"),
        ('seed-disp-starter-1', 'seed-user-disp1', 'dispatch.starter@logistix.test', 'Tunde Agent', 'seed-co-starter', '${DispatcherRole.DISPATCHER}'::"DispatcherRole", '${ApprovalStatus.APPROVED}'::"ApprovalStatus"),
        ('seed-disp-pro-owner', 'seed-user-owner2', 'owner.pro@logistix.test', 'Bisi Apex', 'seed-co-pro', '${DispatcherRole.OWNER}'::"DispatcherRole", '${ApprovalStatus.APPROVED}'::"ApprovalStatus")
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "riders"
        ("id", "user_id", "email", "full_name", "vehicle_type", "approval_status", "status", "last_lat", "last_lng", "last_seen", "company_id", "phone_number") VALUES
        ('seed-rider-1', 'seed-user-rider1', 'rider1@logistix.test', 'Kelechi Rider', '${VehicleType.BIKE}'::"VehicleType", '${ApprovalStatus.APPROVED}'::"ApprovalStatus", '${RiderStatus.ONLINE}'::"RiderStatus", 6.5244, 3.3792, NOW() - INTERVAL '5 minutes', 'seed-co-starter', '+2348012345001'),
        ('seed-rider-2', 'seed-user-rider2', 'rider2@logistix.test', 'Yemi Rider', '${VehicleType.BIKE}'::"VehicleType", '${ApprovalStatus.APPROVED}'::"ApprovalStatus", '${RiderStatus.OFFLINE}'::"RiderStatus", 6.4511, 3.3958, NOW() - INTERVAL '3 hours', 'seed-co-starter', '+2348012345002'),
        ('seed-rider-3', 'seed-user-rider3', 'rider3@logistix.test', 'Aminat Rider', '${VehicleType.BIKE}'::"VehicleType", '${ApprovalStatus.APPROVED}'::"ApprovalStatus", '${RiderStatus.ONLINE}'::"RiderStatus", 6.5269, 3.3609, NOW() - INTERVAL '1 minute', 'seed-co-pro', '+2348098765001'),
        ('seed-rider-4', 'seed-user-rider4', 'rider4@logistix.test', 'Ike Rider', '${VehicleType.BIKE}'::"VehicleType", '${ApprovalStatus.PENDING}'::"ApprovalStatus", '${RiderStatus.OFFLINE}'::"RiderStatus", NULL, NULL, NOW() - INTERVAL '1 day', 'seed-co-pro', '+2348098765002')
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "deliveries"
        ("id", "company_id", "created_by", "rider_id", "status", "pickup_address", "pickup_state", "drop_off_address", "drop_off_state", "description", "pickup_lat", "pickup_lng", "drop_off_lat", "drop_off_lng", "pickup_phone", "drop_off_phone", "payment_method", "scheduled_at", "delivered_at", "tracking_id", "pin", "price", "metadata", "creator_platform", "pool", "vehicle_type") VALUES
        ('seed-del-1', 'seed-co-starter', 'seed-user-owner1', 'seed-rider-1', '${DeliveryStatus.DELIVERED}'::"DeliveryStatus", '12 Admiralty Way, Lekki', 'Lagos', '5 Bourdillon Rd, Ikoyi', 'Lagos', 'Documents', 6.5244, 3.3792, 6.4531, 3.3958, '+2348012345001', '+2348012345002', '${PaymentMethod.PREPAID}'::"PaymentMethod", NULL, NOW() - INTERVAL '2 hours', 'LGX-100001', '1234', 3500, '{"channelFeeKobo":20000}'::jsonb, 'WHATSAPP', false, '${VehicleType.BIKE}'::"VehicleType"),
        ('seed-del-2', 'seed-co-starter', 'seed-user-owner1', 'seed-rider-1', '${DeliveryStatus.IN_TRANSIT}'::"DeliveryStatus", '14 Bourdillon Rd, Ikoyi', 'Lagos', '9 Ozumba Mbadiwe, Victoria Island', 'Lagos', 'Gift box', 6.4531, 3.3958, 6.4281, 3.4219, '+2348012345001', '+2348012345003', '${PaymentMethod.PREPAID}'::"PaymentMethod", NULL, NULL, 'LGX-100002', '2345', 4500, '{}'::jsonb, 'WHATSAPP', false, '${VehicleType.BIKE}'::"VehicleType"),
        ('seed-del-3', 'seed-co-starter', 'seed-user-owner1', 'seed-rider-2', '${DeliveryStatus.ASSIGNED}'::"DeliveryStatus", '1 Adeola Odeku, VI', 'Lagos', '27 Norman Williams, Ikoyi', 'Lagos', 'Envelope', 6.4281, 3.4219, 6.4511, 3.4511, '+2348012345001', '+2348012345004', '${PaymentMethod.PREPAID}'::"PaymentMethod", NULL, NULL, 'LGX-100003', '3456', 2800, '{}'::jsonb, 'WHATSAPP', false, '${VehicleType.BIKE}'::"VehicleType"),
        ('seed-del-4', 'seed-co-starter', 'seed-user-disp1', NULL, '${DeliveryStatus.PENDING}'::"DeliveryStatus", '7B Ologun Agbaje, VI', 'Lagos', '15 Admiralty Way, Lekki', 'Lagos', 'Groceries', 6.4281, 3.4219, 6.5244, 3.3792, '+2348012345001', '+2348012345005', '${PaymentMethod.PAY_ON_DELIVERY}'::"PaymentMethod", NULL, NULL, 'LGX-100004', '4567', 3200, '{}'::jsonb, 'WHATSAPP', false, '${VehicleType.BIKE}'::"VehicleType"),
        ('seed-del-5', 'seed-co-starter', 'seed-user-disp1', NULL, '${DeliveryStatus.PENDING}'::"DeliveryStatus", '10 Coker Rd, Ilupeju', 'Lagos', '23 Awolowo Rd, Ikoyi', 'Lagos', 'Scheduled pickup', 6.5406, 3.3763, 6.4511, 3.4511, '+2348012345001', '+2348012345006', '${PaymentMethod.PREPAID}'::"PaymentMethod", NOW() + INTERVAL '1 day', NULL, 'LGX-100005', '5678', 5500, '{}'::jsonb, 'WHATSAPP', false, '${VehicleType.BIKE}'::"VehicleType"),
        ('seed-del-6', 'seed-co-pro', 'seed-user-owner2', 'seed-rider-3', '${DeliveryStatus.IN_TRANSIT}'::"DeliveryStatus", '4 MKO Abiola Way, Ibadan', 'Oyo', '6 Oba Akenzua II Rd, Benin City', 'Edo', 'Electronics', 7.3775, 3.9470, 6.3350, 5.6037, '+2348098765001', '+2348098765003', '${PaymentMethod.PREPAID}'::"PaymentMethod", NULL, NULL, 'LGX-100006', '6789', 6800, '{}'::jsonb, 'WHATSAPP', false, '${VehicleType.BIKE}'::"VehicleType"),
        ('seed-del-7', 'seed-co-pro', 'seed-user-owner2', 'seed-rider-3', '${DeliveryStatus.DELIVERED}'::"DeliveryStatus", '2 Mokola Rd, Ibadan', 'Oyo', '11 Ring Rd, Ibadan', 'Oyo', 'Documents', 7.3894, 3.8984, 7.3964, 3.8984, '+2348098765001', '+2348098765004', '${PaymentMethod.PAY_ON_DELIVERY}'::"PaymentMethod", NULL, NOW() - INTERVAL '1 day', 'LGX-100007', '7890', 2900, '{}'::jsonb, 'WHATSAPP', false, '${VehicleType.BIKE}'::"VehicleType"),
        ('seed-del-8', NULL, 'seed-user-cust-pool', NULL, '${DeliveryStatus.PENDING}'::"DeliveryStatus", '3 Ososami Rd, Ibadan', 'Oyo', '5 Ogunlana Dr, Surulere, Lagos', 'Lagos', 'Pool delivery', 7.3775, 3.8984, 6.5006, 3.3547, '+2348098765005', '+2348012345007', '${PaymentMethod.PREPAID}'::"PaymentMethod", NULL, NULL, 'LGX-100008', '8901', 2100, '{}'::jsonb, 'WHATSAPP', true, '${VehicleType.BIKE}'::"VehicleType"),
        ('seed-del-9', 'seed-co-pro', 'seed-user-owner2', NULL, '${DeliveryStatus.CANCELLED}'::"DeliveryStatus", '9 Samonda, Ibadan', 'Oyo', '12 Challenge, Ibadan', 'Oyo', 'Cancelled order', 7.3805, 3.8984, 7.3930, 3.9025, '+2348098765001', '+2348098765006', '${PaymentMethod.PREPAID}'::"PaymentMethod", NULL, NULL, 'LGX-100009', '9012', 2500, '{}'::jsonb, 'WHATSAPP', false, '${VehicleType.BIKE}'::"VehicleType")
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "payment_transactions"
        ("id", "company_id", "type", "amount", "currency", "status", "reference", "provider", "description", "metadata", "processed_at") VALUES
        ('seed-pay-1', 'seed-co-starter', '${TransactionType.DELIVERY_PAYMENT}'::"TransactionType", 4500, '${Currency.NGN}'::"Currency", '${TransactionStatus.SUCCESS}'::"TransactionStatus", 'seed-ref-pay-1', '${PaymentProvider.SQUAD}'::"PaymentProvider", 'Delivery LGX-100002', '{}'::jsonb, NOW()),
        ('seed-pay-2', 'seed-co-starter', '${TransactionType.DELIVERY_PAYMENT}'::"TransactionType", 3200, '${Currency.NGN}'::"Currency", '${TransactionStatus.SUCCESS}'::"TransactionStatus", 'seed-ref-pay-2', '${PaymentProvider.SQUAD}'::"PaymentProvider", 'Delivery LGX-100004', '{}'::jsonb, NOW()),
        ('seed-pay-3', 'seed-co-pro', '${TransactionType.DELIVERY_PAYMENT}'::"TransactionType", 6800, '${Currency.NGN}'::"Currency", '${TransactionStatus.SUCCESS}'::"TransactionStatus", 'seed-ref-pay-3', '${PaymentProvider.SQUAD}'::"PaymentProvider", 'Delivery LGX-100006', '{}'::jsonb, NOW()),
        ('seed-pay-4', 'seed-co-starter', '${TransactionType.ADJUSTMENT}'::"TransactionType", 5000, '${Currency.NGN}'::"Currency", '${TransactionStatus.SUCCESS}'::"TransactionStatus", 'seed-ref-pay-4', '${PaymentProvider.SYSTEM}'::"PaymentProvider", 'System adjustment', '{}'::jsonb, NOW())
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "subscription_transactions"
        ("id", "company_id", "amount", "currency", "status", "reference", "provider", "tier", "period_start", "period_end", "description", "processed_at") VALUES
        ('seed-sub-1', 'seed-co-starter', 30000, '${Currency.NGN}'::"Currency", '${TransactionStatus.SUCCESS}'::"TransactionStatus", 'seed-ref-sub-1', '${PaymentProvider.SQUAD}'::"PaymentProvider", '${SubscriptionTier.STARTER}'::"SubscriptionTier", NOW() - INTERVAL '30 days', NOW() + INTERVAL '30 days', 'Monthly subscription', NOW()),
        ('seed-sub-2', 'seed-co-pro', 50000, '${Currency.NGN}'::"Currency", '${TransactionStatus.SUCCESS}'::"TransactionStatus", 'seed-ref-sub-2', '${PaymentProvider.SQUAD}'::"PaymentProvider", '${SubscriptionTier.PROFESSIONAL}'::"SubscriptionTier", NOW() - INTERVAL '30 days', NOW() + INTERVAL '30 days', 'Monthly subscription', NOW())
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "delivery_allocations" ("id", "delivery_id", "transaction_id", "amount") VALUES
        ('seed-alloc-1', 'seed-del-2', 'seed-pay-1', 4500),
        ('seed-alloc-2', 'seed-del-4', 'seed-pay-2', 3200),
        ('seed-alloc-3', 'seed-del-6', 'seed-pay-3', 6800)
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "ledger_transactions"
        ("id", "company_id", "amount", "adjustment_type", "reference", "reason", "performed_by", "metadata") VALUES
        ('seed-ledger-1', 'seed-co-starter', 15000, '${LedgerAdjustmentType.CREDIT}'::"LedgerAdjustmentType", 'seed-ref-ledger-1', 'Wallet top-up', 'seed-user-admin-super', '{}'::jsonb),
        ('seed-ledger-2', 'seed-co-starter', 200, '${LedgerAdjustmentType.CHANNEL_FEE}'::"LedgerAdjustmentType", 'seed-ref-ledger-2', 'Channel fee (WhatsApp)', 'seed-user-owner1', '{}'::jsonb),
        ('seed-ledger-3', 'seed-co-starter', 3200, '${LedgerAdjustmentType.DEBIT}'::"LedgerAdjustmentType", 'seed-ref-ledger-3', 'Delivery charge LGX-100004', 'seed-user-owner1', '{}'::jsonb),
        ('seed-ledger-4', 'seed-co-pro', 75000, '${LedgerAdjustmentType.CREDIT}'::"LedgerAdjustmentType", 'seed-ref-ledger-4', 'Wallet top-up', 'seed-user-admin-super', '{}'::jsonb)
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "conversations"
        ("id", "platform", "platform_id", "company_id", "last_message_at", "metadata", "channel_type", "handled_by", "handled_by_type", "handled_at", "memory") VALUES
        ('seed-conv-1', '${ChannelPlatform.WHATSAPP}'::"ChannelPlatform", '2348012345678-cust1', 'seed-co-starter', NOW(), '{"customerName":"Ada"}'::jsonb, '${ChannelType.MY_CHANNEL}'::"ChannelType", NULL, 'AI', NOW(), NULL),
        ('seed-conv-2', '${ChannelPlatform.WHATSAPP}'::"ChannelPlatform", '2348098765432-cust2', 'seed-co-pro', NOW(), '{"customerName":"Chidi"}'::jsonb, '${ChannelType.MY_CHANNEL}'::"ChannelType", NULL, 'AI', NOW(), NULL),
        ('seed-conv-3', '${ChannelPlatform.WHATSAPP}'::"ChannelPlatform", '2348012345678-pool1', NULL, NOW(), '{"customerName":"PoolUser"}'::jsonb, '${ChannelType.SYSTEM_POOL}'::"ChannelType", NULL, 'AI', NOW(), NULL)
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "messages"
        ("id", "conversation_id", "body", "sender_type", "sender_id", "is_deleted", "metadata", "external_id", "reply_to_external_id", "status", "action_type") VALUES
        ('seed-msg-1', 'seed-conv-1', 'Hello, I want to send a package to Ikoyi', '${SenderType.CUSTOMER}'::"SenderType", '2348012345678-cust1', false, '{}'::jsonb, 'seed-ext-1', NULL, '${MessageStatus.SENT}'::"MessageStatus", NULL),
        ('seed-msg-2', 'seed-conv-1', 'Your booking LGX-100001 has been confirmed', '${SenderType.SYSTEM}'::"SenderType", NULL, false, '{}'::jsonb, 'seed-ext-2', NULL, '${MessageStatus.SENT}'::"MessageStatus", NULL),
        ('seed-msg-3', 'seed-conv-1', 'We will pick it up shortly', '${SenderType.DISPATCHER}'::"SenderType", 'seed-disp-starter-1', false, '{}'::jsonb, 'seed-ext-3', 'seed-ext-1', '${MessageStatus.SENT}'::"MessageStatus", NULL),
        ('seed-msg-4', 'seed-conv-2', 'Please track LGX-100006', '${SenderType.CUSTOMER}'::"SenderType", '2348098765432-cust2', false, '{}'::jsonb, 'seed-ext-4', NULL, '${MessageStatus.SENT}'::"MessageStatus", NULL),
        ('seed-msg-5', 'seed-conv-2', 'Your rider is on the way', '${SenderType.AGENT}'::"SenderType", NULL, false, '{}'::jsonb, 'seed-ext-5', NULL, '${MessageStatus.SENT}'::"MessageStatus", NULL),
        ('seed-msg-6', 'seed-conv-3', 'I need a rider across town', '${SenderType.CUSTOMER}'::"SenderType", '2348012345678-pool1', false, '{}'::jsonb, 'seed-ext-6', NULL, '${MessageStatus.SENT}'::"MessageStatus", NULL),
        ('seed-msg-7', 'seed-conv-3', 'Pool delivery LGX-100008 created', '${SenderType.SYSTEM}'::"SenderType", NULL, false, '{}'::jsonb, 'seed-ext-7', NULL, '${MessageStatus.SENT}'::"MessageStatus", NULL)
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "event_logs"
        ("id", "event_type", "entity_type", "entity_id", "actor_id", "company_id", "metadata", "success") VALUES
        ('seed-ev-1', '${EventType.DELIVERY_CREATED}'::"EventType", '${EntityType.DELIVERY}'::"EntityType", 'seed-del-1', 'seed-user-owner1', 'seed-co-starter', '{}'::jsonb, true),
        ('seed-ev-2', '${EventType.DELIVERY_STATUS_CHANGED}'::"EventType", '${EntityType.DELIVERY}'::"EntityType", 'seed-del-2', 'seed-user-rider1', 'seed-co-starter', '{}'::jsonb, true),
        ('seed-ev-3', '${EventType.COMPANY_VERIFIED}'::"EventType", '${EntityType.COMPANY}'::"EntityType", 'seed-co-starter', 'seed-user-admin-super', 'seed-co-starter', '{}'::jsonb, true),
        ('seed-ev-4', '${EventType.CHANNEL_ACTIVATED}'::"EventType", '${EntityType.COMPANY_CHANNEL}'::"EntityType", 'seed-chan-pro', 'seed-user-admin-super', 'seed-co-pro', '{}'::jsonb, true)
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "export_requests" ("id", "company_id", "status", "metadata") VALUES
        ('seed-exp-1', 'seed-co-starter', '${ExportRequestStatus.COMPLETED}'::"ExportRequestStatus", '{"dataTypes":["DELIVERIES"],"url":"https://example.test/export.csv"}'::jsonb),
        ('seed-exp-2', 'seed-co-pro', '${ExportRequestStatus.PENDING}'::"ExportRequestStatus", '{"dataTypes":["BILLING"]}'::jsonb)
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "job_queue" ("id", "type", "payload", "status", "priority", "max_retries", "retry_count") VALUES
        ('seed-job-1', 'delivery-payment-capture', '{"deliveryId":"seed-del-5"}'::jsonb, '${JobStatus.COMPLETED}'::"JobStatus", 0, 3, 0),
        ('seed-job-2', 'export', '{"requestId":"seed-exp-2"}'::jsonb, '${JobStatus.PENDING}'::"JobStatus", 0, 3, 0)
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "blocked_ips" ("id", "ip_address", "reason", "blocked_by", "expires_at") VALUES
        ('seed-blocked-1', '203.0.113.99', 'Seed demo block', 'seed-user-admin-super', NOW() + INTERVAL '1 day')
        ON CONFLICT ("id") DO NOTHING`);

      await insert(sql`INSERT INTO "company_daily_metrics"
        ("company_id", "date", "total_deliveries", "delivered_count", "cancelled_count", "failed_count", "total_revenue_kobo", "avg_delivery_time_minutes", "channel_breakdown", "extra_metrics", "peak_hour", "unique_riders_active") VALUES
        ('seed-co-starter', CURRENT_DATE, 5, 2, 0, 0, 1500000, 45, '{"WHATSAPP":5}'::jsonb, '{}'::jsonb, 14, 2),
        ('seed-co-pro', CURRENT_DATE, 3, 1, 1, 0, 970000, 60, '{"WHATSAPP":3}'::jsonb, '{}'::jsonb, 11, 1)
        ON CONFLICT (company_id, date) WHERE company_id IS NOT NULL DO NOTHING`);

      await insert(sql`INSERT INTO "company_daily_metrics"
        ("company_id", "date", "total_deliveries", "delivered_count", "cancelled_count", "failed_count", "total_revenue_kobo", "avg_delivery_time_minutes", "channel_breakdown", "extra_metrics", "peak_hour", "unique_riders_active") VALUES
        (NULL, CURRENT_DATE, 1, 0, 0, 0, 0, NULL, '{}'::jsonb, '{}'::jsonb, NULL, 0)
        ON CONFLICT (date) WHERE company_id IS NULL DO NOTHING`);

      await insert(sql`INSERT INTO "company_lifetime_metrics"
        ("company_id", "total_deliveries", "delivered_count", "total_revenue_kobo", "channel_breakdown", "extra_metrics") VALUES
        ('seed-co-starter', 25, 10, 4500000, '{"WHATSAPP":25}'::jsonb, '{}'::jsonb),
        ('seed-co-pro', 18, 9, 12000000, '{"WHATSAPP":18}'::jsonb, '{}'::jsonb)
        ON CONFLICT (company_id) DO NOTHING`);

      await insert(sql`INSERT INTO "company_lifetime_metrics"
        ("company_id", "total_deliveries", "delivered_count", "total_revenue_kobo", "channel_breakdown", "extra_metrics") VALUES
        (NULL, 40, 30, 12000000, '{}'::jsonb, '{}'::jsonb)
        ON CONFLICT (company_id) DO NOTHING`);

      return 'ok';
    });

    if (seeded !== 'ok') throw new Error('seed transaction did not complete');

    console.log('[seed] Inserted verification dataset (idempotent; existing rows skipped)');
  } finally {
    await connection.end();
  }
}

run().catch((err) => {
  console.error('[seed] Failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
