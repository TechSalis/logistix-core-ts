CREATE TYPE "public"."AdminRole" AS ENUM('OPERATOR', 'SUPER_ADMIN');--> statement-breakpoint
CREATE TYPE "public"."ApprovalStatus" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED', 'DISABLED');--> statement-breakpoint
CREATE TYPE "public"."ChannelPlatform" AS ENUM('WHATSAPP', 'INSTAGRAM', 'FACEBOOK', 'TIKTOK');--> statement-breakpoint
CREATE TYPE "public"."ChannelType" AS ENUM('SYSTEM_POOL', 'MY_CHANNEL');--> statement-breakpoint
CREATE TYPE "public"."CompanyChannelStatus" AS ENUM('PENDING', 'ACTIVE', 'DEACTIVATED', 'REJECTED', 'REMOVED');--> statement-breakpoint
CREATE TYPE "public"."DeliveryStatus" AS ENUM('PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."DevicePlatform" AS ENUM('ANDROID', 'IOS', 'WEB');--> statement-breakpoint
CREATE TYPE "public"."DispatcherRole" AS ENUM('OWNER', 'STAFF');--> statement-breakpoint
CREATE TYPE "public"."EntityType" AS ENUM('USER', 'DELIVERY', 'RIDER', 'COMPANY', 'DISPATCHER', 'SYSTEM', 'COMPANY_CHANNEL', 'MESSAGE');--> statement-breakpoint
CREATE TYPE "public"."EscalatedTo" AS ENUM('COMPANY', 'ADMIN', 'DISPATCHER');--> statement-breakpoint
CREATE TYPE "public"."EscalationStatus" AS ENUM('OPEN', 'RESOLVED', 'TAKEN_OVER');--> statement-breakpoint
CREATE TYPE "public"."EventType" AS ENUM('DELIVERY_ASSIGNED', 'DELIVERY_UPDATED', 'DELIVERY_CREATED', 'DELIVERY_STATUS_CHANGED', 'DELIVERY_DELETED', 'RIDER_LOCATION_UPDATED', 'RIDER_ACCEPTED', 'RIDER_CREATED', 'RIDER_UPDATED', 'RIDER_STATUS_CHANGED', 'RIDER_DELETED', 'RIDER_DOCUMENTS_VERIFIED', 'RIDER_DOCUMENTS_REJECTED', 'CHANNEL_SETUP', 'CHANNEL_ACTIVATED', 'CHANNEL_DEACTIVATED', 'CHANNEL_REJECTED', 'CHANNEL_REMOVED', 'SUBSCRIPTION_STATUS_CHANGED', 'DISPATCHER_CREATED', 'DISPATCHER_UPDATED', 'DISPATCHER_STATUS_CHANGED', 'DISPATCHER_DELETED', 'AI_EXECUTION', 'SECURITY_INCIDENT', 'ADMIN_PROOF_READ', 'ADMIN_DOCUMENT_READ', 'COMPANY_ACTIVATED', 'COMPANY_DEACTIVATED', 'COMPANY_TIER_CHANGED', 'COMPANY_VERIFIED', 'COMPANY_VERIFICATION_REJECTED', 'USER_PURGED', 'CANCELLED_PAYMENT_TIMEOUT', 'DOWNGRADE', 'MESSAGE_DELETED', 'LEDGER_ADJUSTED', 'PAYMENT_UNMAPPED');--> statement-breakpoint
CREATE TYPE "public"."LedgerAdjustmentType" AS ENUM('CREDIT', 'DEBIT', 'CORRECTION', 'CHANNEL_FEE', 'OVERAGE', 'REFUND');--> statement-breakpoint
CREATE TYPE "public"."MessageStatus" AS ENUM('SENT', 'DELIVERED', 'READ', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."MetricDomain" AS ENUM('DELIVERIES', 'CONVERSATIONS', 'RIDERS', 'REVENUE');--> statement-breakpoint
CREATE TYPE "public"."MetricGranularity" AS ENUM('DAY', 'WEEK', 'MONTH', 'LIFETIME');--> statement-breakpoint
CREATE TYPE "public"."PaymentMethod" AS ENUM('PREPAID', 'PAY_ON_DELIVERY');--> statement-breakpoint
CREATE TYPE "public"."PaymentProvider" AS ENUM('SQUAD', 'SYSTEM');--> statement-breakpoint
CREATE TYPE "public"."RiderStatus" AS ENUM('ONLINE', 'OFFLINE', 'BUSY');--> statement-breakpoint
CREATE TYPE "public"."SenderType" AS ENUM('CUSTOMER', 'AGENT', 'DISPATCHER', 'ADMIN', 'SYSTEM');--> statement-breakpoint
CREATE TYPE "public"."SubscriptionStatus" AS ENUM('TRIAL', 'ACTIVE', 'CANCELLING', 'PAST_DUE', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."SubscriptionTier" AS ENUM('STARTER', 'PROFESSIONAL');--> statement-breakpoint
CREATE TYPE "public"."TransactionStatus" AS ENUM('PENDING', 'SUCCESS', 'FAILED', 'REVERSED');--> statement-breakpoint
CREATE TYPE "public"."TransactionType" AS ENUM('DELIVERY_PAYMENT', 'SUBSCRIPTION', 'ADJUSTMENT', 'SETTLEMENT', 'REFUND');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"role" "AdminRole" NOT NULL,
	"deactivated_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blocked_ips" (
	"id" text PRIMARY KEY NOT NULL,
	"ip_address" text NOT NULL,
	"user_id" text,
	"reason" text,
	"blocked_by" text,
	"expires_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"cac" text,
	"nipost_license_number" text,
	"contact_phone" text,
	"verification_status" "ApprovalStatus" DEFAULT 'PENDING' NOT NULL,
	"metadata" jsonb,
	"deactivated_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_channels" (
	"id" text PRIMARY KEY NOT NULL,
	"platform" "ChannelPlatform" NOT NULL,
	"platform_id" text NOT NULL,
	"company_id" text NOT NULL,
	"status" "CompanyChannelStatus" NOT NULL,
	"metadata" jsonb,
	"ai_disabled" boolean DEFAULT false NOT NULL,
	"rejection_reason" text,
	"rejected_at" timestamp (3),
	"removed_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"tier" "SubscriptionTier" NOT NULL,
	"subscription_status" "SubscriptionStatus" DEFAULT 'TRIAL' NOT NULL,
	"period_start" timestamp (3),
	"period_end" timestamp (3),
	"squad_token_id" text,
	"working_hours" jsonb DEFAULT '{"Monday":{"start":"07:00","close":"19:00"},"Tuesday":{"start":"07:00","close":"19:00"},"Wednesday":{"start":"07:00","close":"19:00"},"Thursday":{"start":"07:00","close":"19:00"},"Friday":{"start":"07:00","close":"19:00"},"Saturday":{"start":"07:00","close":"19:00"}}'::jsonb NOT NULL,
	"bank_details" jsonb,
	"ledger_balance" double precision DEFAULT 0 NOT NULL,
	"company_code" text,
	"escalated_to" "EscalatedTo" DEFAULT 'COMPANY' NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"auto_accept_team" boolean DEFAULT false NOT NULL,
	"states" text[] DEFAULT '{}',
	"interstate_deliveries" boolean DEFAULT false NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" text PRIMARY KEY NOT NULL,
	"platform" "ChannelPlatform" NOT NULL,
	"platform_id" text NOT NULL,
	"company_id" text,
	"last_message_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"escalated_at" timestamp (3),
	"escalation_status" "EscalationStatus",
	"escalated_to" "EscalatedTo",
	"escalated_by" text,
	"resolved_at" timestamp (3),
	"resolution" jsonb,
	"metadata" jsonb,
	"channel_type" "ChannelType" NOT NULL,
	"last_customer_message_at" timestamp (3),
	"memory" jsonb,
	"handled_by" text,
	"handled_by_type" text NOT NULL,
	"handled_at" timestamp (3),
	CONSTRAINT "conversations_platform_platform_id_company_id_key" UNIQUE NULLS NOT DISTINCT("platform","platform_id","company_id"),
	CONSTRAINT "conversations_handled_by_type_check" CHECK ("conversations"."handled_by_type" IN ('AI','DISPATCHER','ADMIN'))
);
--> statement-breakpoint
CREATE TABLE "deliveries" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text,
	"created_by" text,
	"rider_id" text,
	"status" "DeliveryStatus" NOT NULL,
	"pickup_address" text NOT NULL,
	"pickup_state" text,
	"drop_off_address" text NOT NULL,
	"drop_off_state" text,
	"description" text,
	"pickup_lat" double precision,
	"pickup_lng" double precision,
	"drop_off_lat" double precision,
	"drop_off_lng" double precision,
	"pickup_phone" text,
	"drop_off_phone" text,
	"payment_method" "PaymentMethod" NOT NULL,
	"scheduled_at" timestamp (3),
	"scheduled_at_end" timestamp (3),
	"assigned_at" timestamp (3),
	"delivered_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"tracking_id" text NOT NULL,
	"pin" text,
	"price" double precision,
	"metadata" jsonb,
	"creator_platform" text,
	"pool" boolean DEFAULT false NOT NULL,
	"vehicle_type" text DEFAULT 'BIKE' NOT NULL,
	CONSTRAINT "deliveries_vehicle_type_check" CHECK ("deliveries"."vehicle_type" IN ('BIKE'))
);
--> statement-breakpoint
CREATE TABLE "delivery_allocations" (
	"id" text PRIMARY KEY NOT NULL,
	"delivery_id" text NOT NULL,
	"transaction_id" text NOT NULL,
	"amount" double precision NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "device_tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"device_id" text NOT NULL,
	"platform" "DevicePlatform" NOT NULL,
	"fcm_token" text,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dispatchers" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"company_id" text,
	"role" "DispatcherRole" NOT NULL,
	"approval_status" "ApprovalStatus" DEFAULT 'PENDING' NOT NULL,
	"deactivated_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"event_type" "EventType" NOT NULL,
	"entity_type" "EntityType" NOT NULL,
	"entity_id" text NOT NULL,
	"actor_id" text,
	"company_id" text,
	"metadata" jsonb,
	"severity" text,
	"ip_address" text,
	"success" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_outbox" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "event_outbox_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"channel" text NOT NULL,
	"payload" jsonb NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "idempotency_keys" (
	"key" text PRIMARY KEY NOT NULL,
	"response" jsonb,
	"expires_at" timestamp (3) NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ledger_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"amount" double precision NOT NULL,
	"adjustment_type" "LedgerAdjustmentType" NOT NULL,
	"reference" text NOT NULL,
	"reason" text,
	"performed_by" text,
	"metadata" jsonb,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" text PRIMARY KEY NOT NULL,
	"conversation_id" text NOT NULL,
	"body" text NOT NULL,
	"sender_type" "SenderType" NOT NULL,
	"sender_id" text,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"metadata" jsonb,
	"media_url" text,
	"external_id" text,
	"reply_to_external_id" text,
	"status" "MessageStatus" DEFAULT 'SENT' NOT NULL,
	"action_type" text,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "metrics" (
	"company_id" text,
	"domain" "MetricDomain" NOT NULL,
	"granularity" "MetricGranularity" NOT NULL,
	"bucket_start" date NOT NULL,
	"total_count" integer DEFAULT 0 NOT NULL,
	"delivered_count" integer DEFAULT 0 NOT NULL,
	"cancelled_count" integer DEFAULT 0 NOT NULL,
	"failed_count" integer DEFAULT 0 NOT NULL,
	"total_revenue_kobo" integer DEFAULT 0 NOT NULL,
	"avg_delivery_time_minutes" double precision,
	"channel_breakdown" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"extra_metrics" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"peak_hour" integer,
	"unique_riders_active" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "metrics_scope_domain_granularity_bucket_idx" UNIQUE NULLS NOT DISTINCT("company_id","domain","granularity","bucket_start")
);
--> statement-breakpoint
CREATE TABLE "payment_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text,
	"type" "TransactionType" NOT NULL,
	"amount" double precision NOT NULL,
	"currency" text DEFAULT 'NGN' NOT NULL,
	"status" "TransactionStatus" DEFAULT 'PENDING' NOT NULL,
	"reference" text NOT NULL,
	"provider" "PaymentProvider",
	"description" text,
	"metadata" jsonb,
	"processed_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "payment_transactions_currency_check" CHECK ("payment_transactions"."currency" IN ('NGN'))
);
--> statement-breakpoint
CREATE TABLE "phone_verifications" (
	"user_id" text PRIMARY KEY NOT NULL,
	"phone" text NOT NULL,
	"verified_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "refresh_sessions" (
	"jti" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"device_id" text NOT NULL,
	"token_hash" text NOT NULL,
	"issued_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"expires_at" timestamp (3) NOT NULL,
	"last_active_at" timestamp (3),
	"revoked_at" timestamp (3),
	"replaced_by" text
);
--> statement-breakpoint
CREATE TABLE "riders" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"vehicle_type" text DEFAULT 'BIKE' NOT NULL,
	"approval_status" "ApprovalStatus" DEFAULT 'PENDING' NOT NULL,
	"status" "RiderStatus" NOT NULL,
	"last_lat" double precision,
	"last_lng" double precision,
	"last_seen" timestamp (3),
	"company_id" text,
	"phone_number" text,
	"metadata" jsonb,
	"deactivated_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "riders_vehicle_type_check" CHECK ("riders"."vehicle_type" IN ('BIKE'))
);
--> statement-breakpoint
CREATE TABLE "subscription_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"amount" double precision NOT NULL,
	"currency" text DEFAULT 'NGN' NOT NULL,
	"status" "TransactionStatus" DEFAULT 'PENDING' NOT NULL,
	"reference" text NOT NULL,
	"provider" "PaymentProvider",
	"tier" "SubscriptionTier" NOT NULL,
	"period_start" timestamp (3) NOT NULL,
	"period_end" timestamp (3),
	"description" text,
	"metadata" jsonb,
	"processed_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "subscription_transactions_currency_check" CHECK ("subscription_transactions"."currency" IN ('NGN'))
);
--> statement-breakpoint
-- auth.users is Supabase-managed (created by the platform, not this project).
-- Only our additive column is declared here; once set, phone_verified_at is
-- permanent (no TTL). Dispatchers do NOT need phone verification -- only
-- companies and riders.
DO $$
BEGIN
  ALTER TABLE "auth"."users" ADD COLUMN IF NOT EXISTS "phone_verified_at" timestamp;
EXCEPTION WHEN insufficient_privilege THEN
  RAISE WARNING 'Cannot ALTER auth.users (not owner) - apply this ADD COLUMN manually as a role owning auth.users (e.g. supabase_admin)';
END $$;
--> statement-breakpoint
ALTER TABLE "company_channels" ADD CONSTRAINT "company_channels_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_rider_id_fkey" FOREIGN KEY ("rider_id") REFERENCES "public"."riders"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "delivery_allocations" ADD CONSTRAINT "delivery_allocations_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "public"."deliveries"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "delivery_allocations" ADD CONSTRAINT "delivery_allocations_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "public"."payment_transactions"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "dispatchers" ADD CONSTRAINT "dispatchers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ledger_transactions" ADD CONSTRAINT "ledger_transactions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "riders" ADD CONSTRAINT "riders_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "subscription_transactions" ADD CONSTRAINT "subscription_transactions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "admins_email_key" ON "admins" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "admins_user_id_key" ON "admins" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "blocked_ips_expires_at_idx" ON "blocked_ips" USING btree ("expires_at" timestamp_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "blocked_ips_ip_address_idx" ON "blocked_ips" USING btree ("ip_address" text_ops);--> statement-breakpoint
CREATE INDEX "blocked_ips_user_id_idx" ON "blocked_ips" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "companies_name_idx" ON "companies" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX "companies_verification_status_idx" ON "companies" USING btree ("verification_status" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "companies_cac_key" ON "companies" USING btree ("cac");--> statement-breakpoint
CREATE INDEX "company_channels_status_idx" ON "company_channels" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "company_channels_company_id_status_idx" ON "company_channels" USING btree ("company_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "company_channels_platform_company_id_key" ON "company_channels" USING btree ("platform" enum_ops,"company_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "company_channels_platform_platform_id_key" ON "company_channels" USING btree ("platform" enum_ops,"platform_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "company_settings_company_id_key" ON "company_settings" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "company_settings_company_code_key" ON "company_settings" USING btree ("company_code" text_ops);--> statement-breakpoint
CREATE INDEX "company_settings_subscription_status_idx" ON "company_settings" USING btree ("subscription_status" enum_ops);--> statement-breakpoint
CREATE INDEX "conversations_company_id_idx" ON "conversations" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE INDEX "conversations_company_id_last_message_at_idx" ON "conversations" USING btree ("company_id" text_ops,"last_message_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "conversations_platform_id_platform_idx" ON "conversations" USING btree ("platform_id" text_ops,"platform" enum_ops);--> statement-breakpoint
CREATE INDEX "conversations_handled_by_type_idx" ON "conversations" USING btree ("handled_by_type" text_ops);--> statement-breakpoint
CREATE INDEX "conversations_channel_type_idx" ON "conversations" USING btree ("channel_type" enum_ops);--> statement-breakpoint
CREATE INDEX "conversations_escalated_at_idx" ON "conversations" USING btree ("escalated_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "conversations_escalation_status_idx" ON "conversations" USING btree ("escalation_status" enum_ops) WHERE "conversations"."escalation_status" IS NOT NULL;--> statement-breakpoint
CREATE INDEX "conversations_last_message_at_idx" ON "conversations" USING btree ("last_message_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "conversations_metadata_gin" ON "conversations" USING gin ("metadata");--> statement-breakpoint
CREATE INDEX "deliveries_company_id_status_idx" ON "deliveries" USING btree ("company_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "deliveries_company_id_updated_at_idx" ON "deliveries" USING btree ("company_id" text_ops,"updated_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "deliveries_company_id_created_at_idx" ON "deliveries" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "deliveries_rider_id_status_idx" ON "deliveries" USING btree ("rider_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "deliveries_rider_id_updated_at_idx" ON "deliveries" USING btree ("rider_id" text_ops,"updated_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "deliveries_status_idx" ON "deliveries" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "deliveries_tracking_id_key" ON "deliveries" USING btree ("tracking_id" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_pickup_state_idx" ON "deliveries" USING btree ("pickup_state");--> statement-breakpoint
CREATE INDEX "deliveries_keyset_pagination_idx" ON "deliveries" USING btree ("company_id" text_ops,"updated_at" timestamp_ops,"id" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_pending_pool_pickup_state" ON "deliveries" USING btree ("company_id" text_ops,"pickup_state" text_ops,"scheduled_at" timestamp_ops,"id" text_ops) WHERE "deliveries"."status" = 'PENDING' AND "deliveries"."pool" = true AND "deliveries"."rider_id" IS NULL;--> statement-breakpoint
CREATE INDEX "deliveries_status_created_at_idx" ON "deliveries" USING btree ("status" enum_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "deliveries_status_scheduled_at_idx" ON "deliveries" USING btree ("status" enum_ops,"scheduled_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "deliveries_created_at_idx" ON "deliveries" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "deliveries_metadata_gin" ON "deliveries" USING gin ("metadata");--> statement-breakpoint
CREATE UNIQUE INDEX "delivery_allocations_delivery_id_transaction_id_key" ON "delivery_allocations" USING btree ("delivery_id" text_ops,"transaction_id" text_ops);--> statement-breakpoint
CREATE INDEX "delivery_allocations_transaction_id_idx" ON "delivery_allocations" USING btree ("transaction_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "device_tokens_user_id_device_id_key" ON "device_tokens" USING btree ("user_id" text_ops,"device_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "device_tokens_fcm_token_key" ON "device_tokens" USING btree ("fcm_token" text_ops);--> statement-breakpoint
CREATE INDEX "dispatchers_company_id_idx" ON "dispatchers" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE INDEX "dispatchers_company_id_updated_at_idx" ON "dispatchers" USING btree ("company_id" text_ops,"updated_at" timestamp_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "dispatchers_email_key" ON "dispatchers" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "dispatchers_user_id_key" ON "dispatchers" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "event_logs_actor_id_created_at_idx" ON "event_logs" USING btree ("actor_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_company_id_created_at_idx" ON "event_logs" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_entity_id_created_at_idx" ON "event_logs" USING btree ("entity_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_event_type_created_at_idx" ON "event_logs" USING btree ("event_type" enum_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_event_type_success_created_at_idx" ON "event_logs" USING btree ("event_type" enum_ops,"success" bool_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_event_type_severity_created_at_idx" ON "event_logs" USING btree ("event_type" enum_ops,"severity" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_company_entity_type_event_created_at_idx" ON "event_logs" USING btree ("company_id" text_ops,"entity_type" enum_ops,"event_type" enum_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_created_at_idx" ON "event_logs" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_metadata_gin" ON "event_logs" USING gin ("metadata");--> statement-breakpoint
CREATE INDEX "event_outbox_channel_id_idx" ON "event_outbox" USING btree ("channel" text_ops,"id" int8_ops);--> statement-breakpoint
CREATE INDEX "event_outbox_created_at_idx" ON "event_outbox" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "idempotency_keys_expires_at_idx" ON "idempotency_keys" USING btree ("expires_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "ledger_transactions_company_id_created_at_idx" ON "ledger_transactions" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "ledger_transactions_reference_key" ON "ledger_transactions" USING btree ("reference" text_ops);--> statement-breakpoint
CREATE INDEX "messages_conversation_id_created_at_idx" ON "messages" USING btree ("conversation_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "messages_external_id_key" ON "messages" USING btree ("external_id" text_ops);--> statement-breakpoint
CREATE INDEX "messages_reply_to_external_id_idx" ON "messages" USING btree ("reply_to_external_id" text_ops);--> statement-breakpoint
CREATE INDEX "messages_action_type_idx" ON "messages" USING btree ("action_type");--> statement-breakpoint
CREATE INDEX "messages_conversation_id_is_deleted_idx" ON "messages" USING btree ("conversation_id" text_ops,"is_deleted" bool_ops);--> statement-breakpoint
CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "metrics_company_domain_granularity_idx" ON "metrics" USING btree ("company_id","domain","granularity","bucket_start");--> statement-breakpoint
CREATE INDEX "metrics_system_domain_granularity_idx" ON "metrics" USING btree ("domain","granularity","bucket_start") WHERE "metrics"."company_id" IS NULL;--> statement-breakpoint
CREATE INDEX "payment_transactions_company_id_created_at_idx" ON "payment_transactions" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "payment_transactions_type_idx" ON "payment_transactions" USING btree ("type" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "payment_transactions_reference_key" ON "payment_transactions" USING btree ("reference" text_ops);--> statement-breakpoint
CREATE INDEX "payment_transactions_status_idx" ON "payment_transactions" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "refresh_sessions_user_id_idx" ON "refresh_sessions" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "riders_company_id_idx" ON "riders" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE INDEX "riders_company_id_status_idx" ON "riders" USING btree ("company_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "riders_company_id_approval_status_idx" ON "riders" USING btree ("company_id" text_ops) WHERE approval_status = 'APPROVED';--> statement-breakpoint
CREATE INDEX "riders_company_id_updated_at_idx" ON "riders" USING btree ("company_id" text_ops,"updated_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "riders_approval_status_idx" ON "riders" USING btree ("approval_status" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "riders_email_key" ON "riders" USING btree ("email" text_ops);--> statement-breakpoint
CREATE INDEX "riders_status_last_seen_idx" ON "riders" USING btree ("status" enum_ops,"last_seen" timestamp_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "riders_user_id_key" ON "riders" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "subscription_transactions_company_id_created_at_idx" ON "subscription_transactions" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "subscription_transactions_status_idx" ON "subscription_transactions" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "subscription_transactions_reference_key" ON "subscription_transactions" USING btree ("reference" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "subscription_transactions_one_pending_company" ON "subscription_transactions" USING btree ("company_id") WHERE "subscription_transactions"."status" = 'PENDING';--> statement-breakpoint
-- Row Level Security: deny-by-default hardening.
--
-- No policies are created on purpose: nothing may query the database
-- directly except the app/seed/migrations, which all connect as a role that
-- bypasses RLS (table owner / superuser). Enabling RLS without policies locks
-- out every other role (anon, authenticated) in case the PostgREST API or a
-- direct grant is ever accidentally exposed.
-- -----------------------------------------------------------------------------


-- -----------------------------------------------------------------------------
-- Row Level Security: deny-by-default hardening.
--
-- No policies are created on purpose: nothing may query the database
-- directly except app/seed/migrations, which all connect as a role that
-- bypasses RLS (table owner / superuser). Enabling RLS without policies locks
-- out every other role (anon, authenticated) in case the PostgREST API or a
-- direct grant is ever accidentally exposed.
-- -----------------------------------------------------------------------------
ALTER TABLE "admins" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "blocked_ips" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "companies" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "company_channels" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "company_settings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "conversations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "deliveries" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "delivery_allocations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "device_tokens" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "dispatchers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "event_logs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "event_outbox" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ledger_transactions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "messages" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "metrics" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "payment_transactions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "phone_verifications" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "refresh_sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "riders" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "subscription_transactions" ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- pg_cron + pgmq: PostgreSQL native scheduling & queue migration
-- =============================================================================

-- -------------------------------------------------------
-- 1. Extensions
-- -------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pgmq;

-- -------------------------------------------------------
-- 2. pgmq queues (one per job type)
-- -------------------------------------------------------
SELECT pgmq.create('delivery_notifications');
SELECT pgmq.create('ai_batch');
SELECT pgmq.create('squid_webhooks');
SELECT pgmq.create('exports');

-- Note: CREATE EXTENSION pgmq (and pg_cron) run their install scripts inside the
-- migrated transaction, and pgmq's script leaves search_path clobbered to an empty
-- string for the remainder of that transaction. psql autocommits per statement and
-- is unaffected, but drizzle's migrator runs every chunk in ONE transaction, so any
-- unqualified CREATE after the extensions fails with 3F000 ("no schema has been
-- selected to create in"). Restore the documented default search_path here.
SET search_path = "$user", public, extensions;

-- -------------------------------------------------------
-- 3. PL/pgSQL functions for worker DB-only tasks
-- -------------------------------------------------------

-- Draft expiration: purge stale delivery drafts from conversation memory
CREATE OR REPLACE FUNCTION pg_cron_draft_expiration() RETURNS void AS $$
DECLARE
  expired_count integer;
BEGIN
  UPDATE conversations
  SET memory = memory #- '{deliveries,drafts}',
      updated_at = NOW()
  WHERE memory->'deliveries'->'drafts' IS NOT NULL
    AND updated_at < NOW() - INTERVAL '72 hours';

  GET DIAGNOSTICS expired_count = ROW_COUNT;
  RAISE NOTICE 'Draft expiration: expired % conversations', expired_count;
END;
$$ LANGUAGE plpgsql;

-- Session & device cleanup: prune revoked/expired sessions and stale device tokens
CREATE OR REPLACE FUNCTION pg_cron_session_device_cleanup() RETURNS void AS $$
DECLARE
  sessions_pruned integer;
  devices_pruned integer;
BEGIN
  DELETE FROM refresh_sessions
  WHERE issued_at < NOW() - INTERVAL '30 days'
    AND (revoked_at IS NOT NULL OR expires_at < NOW());
  GET DIAGNOSTICS sessions_pruned = ROW_COUNT;

  DELETE FROM device_tokens
  WHERE fcm_token IS NULL
    AND updated_at < NOW() - INTERVAL '30 days';
  GET DIAGNOSTICS devices_pruned = ROW_COUNT;

  RAISE NOTICE 'Session cleanup: pruned % sessions, % devices', sessions_pruned, devices_pruned;
END;
$$ LANGUAGE plpgsql;

-- Payment timeout cancellation: cancel AWAITING_PAYMENT deliveries older than timeout
CREATE OR REPLACE FUNCTION pg_cron_payment_timeout_cancellation() RETURNS void AS $$
DECLARE
  cancelled_count integer;
  timeout_hours numeric := 1;
BEGIN
  WITH expired AS (
    UPDATE deliveries
    SET status = 'CANCELLED',
        updated_at = NOW(),
        metadata = metadata - 'paymentStatus'
    WHERE metadata->>'paymentStatus' = 'AWAITING'
      AND created_at < NOW() - (timeout_hours || ' hours')::interval
      AND company_id IS NOT NULL
    RETURNING id, tracking_id, company_id, created_by, creator_platform
  )
  INSERT INTO event_logs (id, entity_type, entity_id, event_type, company_id, metadata, created_at)
  SELECT gen_random_uuid()::text, 'DELIVERY', e.id, 'CANCELLED_PAYMENT_TIMEOUT', e.company_id,
         jsonb_build_object('tracking_id', e.tracking_id, 'company_id', e.company_id, 'timeout_hours', timeout_hours),
         NOW()
  FROM expired e;

  GET DIAGNOSTICS cancelled_count = ROW_COUNT;

  IF cancelled_count > 0 THEN
    INSERT INTO pgmq.q_delivery_notifications (message)
    SELECT jsonb_build_object(
      'delivery', jsonb_build_object(
        'id', d.id,
        'trackingId', d.tracking_id,
        'status', 'CANCELLED',
        'companyId', d.company_id,
        'createdBy', d.created_by,
        'creatorPlatform', d.creator_platform
      )
    )
    FROM deliveries d
    WHERE d.status = 'CANCELLED'
      AND d.updated_at > NOW() - INTERVAL '1 minute'
      AND d.metadata->>'paymentStatus' IS NULL
      AND d.company_id IS NOT NULL;

    RAISE NOTICE 'Payment timeout: cancelled % deliveries', cancelled_count;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Daily metrics computation: compute DAY buckets for all 4 domains
-- Metrics compression: fold expired daily buckets into lifetime totals
CREATE OR REPLACE FUNCTION pg_cron_metrics_compression() RETURNS void AS $$
DECLARE
  folded_count integer;
  pruned_count integer;
  cutoff_date date := CURRENT_DATE - INTERVAL '12 months';
BEGIN
  -- Fold expired daily metrics into lifetime totals (per-company + system)
  INSERT INTO metrics (
    company_id, domain, granularity, bucket_start,
    total_count, delivered_count, cancelled_count, failed_count,
    total_revenue_kobo, channel_breakdown, extra_metrics,
    unique_riders_active, updated_at
  )
  SELECT
    company_id,
    domain,
    'LIFETIME'::"MetricGranularity",
    '2026-01-01'::date,
    SUM(total_count)::int,
    SUM(delivered_count)::int,
    SUM(cancelled_count)::int,
    SUM(failed_count)::int,
    SUM(total_revenue_kobo)::int,
    COALESCE(
      (SELECT jsonb_object_agg(key, value)
       FROM jsonb_each_text(
         COALESCE(
           (SELECT jsonb_agg(channel_breakdown) FROM unnest(ARRAY_AGG(channel_breakdown)) AS val),
           '{}'::jsonb
         )
       )
       WHERE key IS NOT NULL
      ),
      '{}'::jsonb
    ),
    COALESCE(
      (SELECT jsonb_object_agg(key, value)
       FROM jsonb_each_text(
         COALESCE(
           (SELECT jsonb_agg(extra_metrics) FROM unnest(ARRAY_AGG(extra_metrics)) AS val),
           '{}'::jsonb
         )
       )
       WHERE key IS NOT NULL
      ),
      '{}'::jsonb
    ),
    SUM(unique_riders_active)::int,
    CURRENT_TIMESTAMP
  FROM metrics
  WHERE granularity = 'DAY'::"MetricGranularity"
    AND bucket_start < cutoff_date
  GROUP BY company_id, domain
  ON CONFLICT (company_id, domain, granularity, bucket_start) DO UPDATE SET
    total_count = metrics.total_count + EXCLUDED.total_count,
    delivered_count = metrics.delivered_count + EXCLUDED.delivered_count,
    cancelled_count = metrics.cancelled_count + EXCLUDED.cancelled_count,
    failed_count = metrics.failed_count + EXCLUDED.failed_count,
    total_revenue_kobo = metrics.total_revenue_kobo + EXCLUDED.total_revenue_kobo,
    unique_riders_active = metrics.unique_riders_active + EXCLUDED.unique_riders_active,
    updated_at = CURRENT_TIMESTAMP;

  GET DIAGNOSTICS folded_count = ROW_COUNT;

  -- Prune folded daily metrics
  DELETE FROM metrics
  WHERE granularity = 'DAY'::"MetricGranularity"
    AND bucket_start < cutoff_date;
  GET DIAGNOSTICS pruned_count = ROW_COUNT;

  RAISE NOTICE 'Metrics compression: folded %, pruned %', folded_count, pruned_count;
END;
$$ LANGUAGE plpgsql;

-- Outbox prune: delete old event_outbox rows (replaces backend AsyncInterval)
CREATE OR REPLACE FUNCTION pg_cron_outbox_prune() RETURNS void AS $$
BEGIN
  DELETE FROM event_outbox WHERE created_at < NOW() - INTERVAL '30 minutes';
END;
$$ LANGUAGE plpgsql;

-- Typing marker sweep: delete stale typing markers (replaces backend AsyncInterval)
CREATE OR REPLACE FUNCTION pg_cron_typing_marker_sweep() RETURNS void AS $$
BEGIN
  DELETE FROM event_outbox
  WHERE channel LIKE 'typing:%'
    AND created_at < NOW() - INTERVAL '30 seconds';
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------
-- 4. Backend NOTIFY functions (pg_cron → TypeScript handlers)
-- -------------------------------------------------------

CREATE OR REPLACE FUNCTION pg_cron_notify_delivery_expiry() RETURNS void AS $$
BEGIN
  PERFORM pg_notify('pg_cron_sweeper', 'delivery_expiry_lifecycle');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION pg_cron_notify_delivery_liveness() RETURNS void AS $$
BEGIN
  PERFORM pg_notify('pg_cron_sweeper', 'delivery_liveness');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION pg_cron_notify_conversation_ownership() RETURNS void AS $$
BEGIN
  PERFORM pg_notify('pg_cron_sweeper', 'conversation_ownership');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION pg_cron_notify_stale_assignment() RETURNS void AS $$
BEGIN
  PERFORM pg_notify('pg_cron_sweeper', 'stale_assignment');
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------
-- 5. pg_cron schedules
-- -------------------------------------------------------

-- Worker DB-only tasks (pure SQL, no backend involvement)
SELECT cron.schedule('draft-expiration', '0 2 * * *', 'SELECT pg_cron_draft_expiration()');
SELECT cron.schedule('session-device-cleanup', '0 2 * * *', 'SELECT pg_cron_session_device_cleanup()');
SELECT cron.schedule('payment-timeout-cancellation', '*/5 * * * *', 'SELECT pg_cron_payment_timeout_cancellation()');
SELECT cron.schedule('metrics-compression', '0 1 * * *', 'SELECT pg_cron_metrics_compression()');

-- Backend sweepers (pure SQL, no backend involvement)
SELECT cron.schedule('outbox-prune', '*/5 * * * *', 'SELECT pg_cron_outbox_prune()');
SELECT cron.schedule('typing-marker-sweep', '* * * * *', 'SELECT pg_cron_typing_marker_sweep()');

-- Backend NOTIFY triggers (pg_cron fires → backend LISTENs → TypeScript handler)
SELECT cron.schedule('delivery-expiry-lifecycle', '*/15 * * * *', 'SELECT pg_cron_notify_delivery_expiry()');
SELECT cron.schedule('delivery-liveness', '*/15 * * * *', 'SELECT pg_cron_notify_delivery_liveness()');
SELECT cron.schedule('conversation-ownership', '*/15 * * * *', 'SELECT pg_cron_notify_conversation_ownership()');
SELECT cron.schedule('stale-assignment', '*/15 * * * *', 'SELECT pg_cron_notify_stale_assignment()');
