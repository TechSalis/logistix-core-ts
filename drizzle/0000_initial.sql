CREATE TYPE "public"."ActorType" AS ENUM('SYSTEM', 'ADMIN', 'COMPANY', 'DISPATCHER', 'RIDER', 'CUSTOMER');--> statement-breakpoint
CREATE TYPE "public"."ApprovalStatus" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED', 'DISABLED');--> statement-breakpoint
CREATE TYPE "public"."ChannelPlatform" AS ENUM('WHATSAPP', 'INSTAGRAM', 'FACEBOOK', 'TIKTOK', 'BUSINESS');--> statement-breakpoint
CREATE TYPE "public"."ChannelType" AS ENUM('LOGISTIX_NETWORK', 'MY_CHANNEL');--> statement-breakpoint
CREATE TYPE "public"."Currency" AS ENUM('NGN');--> statement-breakpoint
CREATE TYPE "public"."DeliveryStatus" AS ENUM('AWAITING_PAYMENT', 'PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."EntityType" AS ENUM('USER', 'DELIVERY', 'RIDER', 'COMPANY', 'DISPATCHER', 'SYSTEM', 'MESSAGE', 'COMPANY_CHANNEL');--> statement-breakpoint
CREATE TYPE "public"."EscalatedTo" AS ENUM('COMPANY', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."EscalationStatus" AS ENUM('OPEN', 'RESOLVED', 'HIJACKED');--> statement-breakpoint
CREATE TYPE "public"."EventType" AS ENUM('DELIVERY_ASSIGNED', 'DELIVERY_UPDATED', 'DELIVERY_CREATED', 'DELIVERY_STATUS_CHANGED', 'DELIVERY_DELETED', 'RIDER_LOCATION_UPDATED', 'RIDER_ASSIGNED', 'RIDER_ACCEPTED', 'RIDER_DELETED', 'USER_PURGED', 'MESSAGE_SENT', 'CHANNEL_SETUP', 'CHANNEL_ACTIVATED', 'CHANNEL_DEACTIVATED', 'MESSAGE_DELETED', 'DISPATCHER_DELETED', 'DOWNGRADE', 'CANCELLED_PAYMENT_TIMEOUT', 'AI_EXECUTION', 'SECURITY_INCIDENT', 'COMPANY_ACTIVATED', 'COMPANY_DEACTIVATED', 'COMPANY_TIER_CHANGED', 'SUBSCRIPTION_STATUS_CHANGED', 'COMPANY_VERIFIED', 'COMPANY_VERIFICATION_REJECTED');--> statement-breakpoint
CREATE TYPE "public"."ExportRequestStatus" AS ENUM('PENDING', 'COMPLETED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."LedgerAdjustmentType" AS ENUM('CREDIT', 'DEBIT', 'CORRECTION', 'REFUND', 'CHANNEL_FEE', 'OVERAGE');--> statement-breakpoint
CREATE TYPE "public"."MessageStatus" AS ENUM('SENT', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."PaymentMethod" AS ENUM('PREPAID', 'PAY_ON_DELIVERY');--> statement-breakpoint
CREATE TYPE "public"."PaymentProvider" AS ENUM('SQUAD', 'SYSTEM');--> statement-breakpoint
CREATE TYPE "public"."RiderStatus" AS ENUM('ONLINE', 'OFFLINE', 'BUSY');--> statement-breakpoint
CREATE TYPE "public"."SenderType" AS ENUM('CUSTOMER', 'AGENT', 'DISPATCHER', 'SYSTEM');--> statement-breakpoint
CREATE TYPE "public"."SubscriptionStatus" AS ENUM('PENDING', 'ACTIVE', 'GRACE', 'LOCKED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."SubscriptionTier" AS ENUM('STARTER', 'PROFESSIONAL');--> statement-breakpoint
CREATE TYPE "public"."TransactionStatus" AS ENUM('PENDING', 'SUCCESS', 'FAILED', 'REVERSED');--> statement-breakpoint
CREATE TYPE "public"."TransactionType" AS ENUM('DELIVERY_PAYMENT', 'SUBSCRIPTION', 'ADJUSTMENT', 'SETTLEMENT', 'REFUND');--> statement-breakpoint
CREATE TYPE "public"."VehicleType" AS ENUM('BIKE', 'CAR', 'VAN', 'TRUCK');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"fcm_token" text,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blocked_ips" (
	"id" text PRIMARY KEY NOT NULL,
	"ip_address" text NOT NULL,
	"reason" text,
	"blocked_by" text,
	"expires_at" timestamp (3) NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"contact_phone" text,
	"states" text[] DEFAULT '{}',
	"interstate_deliveries" boolean DEFAULT false NOT NULL,
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
	"is_active" boolean DEFAULT false NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_daily_metrics" (
	"company_id" text NOT NULL,
	"date" text NOT NULL,
	"total_deliveries" integer DEFAULT 0 NOT NULL,
	"delivered_count" integer DEFAULT 0 NOT NULL,
	"cancelled_count" integer DEFAULT 0 NOT NULL,
	"failed_count" integer DEFAULT 0 NOT NULL,
	"awaiting_payment_count" integer DEFAULT 0 NOT NULL,
	"total_revenue_kobo" integer DEFAULT 0 NOT NULL,
	"avg_delivery_time_minutes" double precision,
	"channel_breakdown" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"peak_hour" integer,
	"unique_riders_active" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "company_daily_metrics_company_id_date_pk" PRIMARY KEY("company_id","date")
);
--> statement-breakpoint
CREATE TABLE "company_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"tier" "SubscriptionTier" DEFAULT 'STARTER' NOT NULL,
	"subscription_status" "SubscriptionStatus" DEFAULT 'PENDING' NOT NULL,
	"period_start" timestamp (3),
	"period_end" timestamp (3),
	"locked_at" timestamp (3),
	"working_hours" jsonb DEFAULT '{"Monday":{"start":"07:00","close":"19:00"},"Tuesday":{"start":"07:00","close":"19:00"},"Wednesday":{"start":"07:00","close":"19:00"},"Thursday":{"start":"07:00","close":"19:00"},"Friday":{"start":"07:00","close":"19:00"},"Saturday":{"start":"07:00","close":"19:00"}}'::jsonb NOT NULL,
	"bank_details" jsonb,
	"virtual_account_number" text,
	"ledger_balance" double precision DEFAULT 0 NOT NULL,
	"company_code" text,
	"escalated_to" "EscalatedTo" DEFAULT 'ADMIN' NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"auto_accept_team" boolean DEFAULT false NOT NULL,
	"states" text[] DEFAULT '{}',
	"interstate_deliveries" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" text PRIMARY KEY NOT NULL,
	"platform" "ChannelPlatform" DEFAULT 'WHATSAPP' NOT NULL,
	"platform_id" text NOT NULL,
	"company_id" text,
	"last_message_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"auto_reply_enabled" boolean DEFAULT true NOT NULL,
	"channel_type" "ChannelType" DEFAULT 'LOGISTIX_NETWORK' NOT NULL,
	"last_customer_message_at" timestamp (3),
	"scratchpad" jsonb,
	"customer_name" text,
	"timezone" text
);
--> statement-breakpoint
CREATE TABLE "deliveries" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text,
	"created_by" text,
	"rider_id" text,
	"status" "DeliveryStatus" NOT NULL,
	"pickup_address" text NOT NULL,
	"pickup_lat" double precision,
	"pickup_lng" double precision,
	"drop_off_address" text NOT NULL,
	"drop_off_lat" double precision,
	"drop_off_lng" double precision,
	"pickup_phone" text,
	"drop_off_phone" text,
	"description" text,
	"payment_method" "PaymentMethod" NOT NULL,
	"scheduled_at" timestamp (3),
	"delivered_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"tracking_id" text NOT NULL,
	"pin" text,
	"price" double precision,
	"pool" boolean DEFAULT false NOT NULL,
	"metadata" jsonb,
	"pickup_state" text,
	"creator_platform" text
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
CREATE TABLE "dispatchers" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"company_id" text,
	"fcm_token" text,
	"is_owner" boolean DEFAULT false NOT NULL,
	"approval_status" "ApprovalStatus" DEFAULT 'PENDING' NOT NULL,
	"deactivated_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "escalations" (
	"id" text PRIMARY KEY NOT NULL,
	"conversation_id" text NOT NULL,
	"company_id" text,
	"escalated_to" "EscalatedTo" NOT NULL,
	"status" "EscalationStatus" DEFAULT 'OPEN' NOT NULL,
	"resolution" jsonb,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"event_type" "EventType" NOT NULL,
	"entity_type" "EntityType" NOT NULL,
	"entity_id" text NOT NULL,
	"actor_id" text,
	"company_id" text,
	"payload" jsonb,
	"success" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "export_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"status" "ExportRequestStatus" DEFAULT 'PENDING' NOT NULL,
	"metadata" jsonb,
	"requested_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
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
CREATE TABLE "rider_location_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"rider_id" text NOT NULL,
	"lat" double precision NOT NULL,
	"lng" double precision NOT NULL,
	"status" "RiderStatus",
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "riders" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"vehicle_type" "VehicleType" DEFAULT 'BIKE' NOT NULL,
	"approval_status" "ApprovalStatus" DEFAULT 'PENDING' NOT NULL,
	"is_accepted" boolean DEFAULT false NOT NULL,
	"status" "RiderStatus" NOT NULL,
	"last_lat" double precision,
	"last_lng" double precision,
	"last_seen" timestamp (3),
	"fcm_token" text,
	"company_id" text,
	"metadata" jsonb,
	"deactivated_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"type" "TransactionType" NOT NULL,
	"amount" double precision NOT NULL,
	"currency" "Currency" DEFAULT 'NGN' NOT NULL,
	"status" "TransactionStatus" DEFAULT 'PENDING' NOT NULL,
	"reference" text NOT NULL,
	"provider" "PaymentProvider",
	"tier" "SubscriptionTier",
	"period_start" timestamp (3),
	"period_end" timestamp (3),
	"description" text,
	"metadata" jsonb,
	"gateway_reference" text,
	"processed_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "company_channels" ADD CONSTRAINT "company_channels_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "company_daily_metrics" ADD CONSTRAINT "cdm_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_rider_id_fkey" FOREIGN KEY ("rider_id") REFERENCES "public"."riders"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "delivery_allocations" ADD CONSTRAINT "delivery_allocations_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "public"."deliveries"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "delivery_allocations" ADD CONSTRAINT "delivery_allocations_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "public"."payment_transactions"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "dispatchers" ADD CONSTRAINT "dispatchers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "escalations" ADD CONSTRAINT "escalations_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "escalations" ADD CONSTRAINT "escalations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "export_requests" ADD CONSTRAINT "export_requests_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ledger_transactions" ADD CONSTRAINT "ledger_transactions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "rider_location_logs" ADD CONSTRAINT "rider_location_logs_rider_id_fkey" FOREIGN KEY ("rider_id") REFERENCES "public"."riders"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "riders" ADD CONSTRAINT "riders_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "admins_email_key" ON "admins" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "admins_user_id_key" ON "admins" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "blocked_ips_expires_at_idx" ON "blocked_ips" USING btree ("expires_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "blocked_ips_ip_address_idx" ON "blocked_ips" USING btree ("ip_address" text_ops);--> statement-breakpoint
CREATE INDEX "companies_name_idx" ON "companies" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX "companies_verification_status_idx" ON "companies" USING btree ("verification_status" enum_ops);--> statement-breakpoint
CREATE INDEX "company_channels_is_active_idx" ON "company_channels" USING btree ("is_active" bool_ops);--> statement-breakpoint
CREATE INDEX "company_channels_company_id_is_active_idx" ON "company_channels" USING btree ("company_id" text_ops,"is_active" bool_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "company_channels_platform_company_id_key" ON "company_channels" USING btree ("platform" enum_ops,"company_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "company_channels_platform_platform_id_key" ON "company_channels" USING btree ("platform" enum_ops,"platform_id" text_ops);--> statement-breakpoint
CREATE INDEX "cdm_date_idx" ON "company_daily_metrics" USING btree ("date" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "company_settings_company_id_key" ON "company_settings" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "company_settings_company_code_key" ON "company_settings" USING btree ("company_code" text_ops);--> statement-breakpoint
CREATE INDEX "company_settings_virtual_account_number_idx" ON "company_settings" USING btree ("virtual_account_number");--> statement-breakpoint
CREATE INDEX "conversations_company_id_idx" ON "conversations" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE INDEX "conversations_company_id_last_message_at_idx" ON "conversations" USING btree ("company_id" text_ops,"last_message_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "conversations_platform_id_platform_idx" ON "conversations" USING btree ("platform_id" text_ops,"platform" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "conversations_platform_platform_id_company_id_key" ON "conversations" USING btree ("platform" enum_ops,"platform_id" text_ops,"company_id" text_ops);--> statement-breakpoint
CREATE INDEX "conversations_auto_reply_disabled_idx" ON "conversations" USING btree ("company_id","last_message_at") WHERE auto_reply_enabled = false AND company_id IS NULL;--> statement-breakpoint
CREATE INDEX "conversations_channel_type_idx" ON "conversations" USING btree ("channel_type" enum_ops);--> statement-breakpoint
CREATE INDEX "deliveries_company_id_status_idx" ON "deliveries" USING btree ("company_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "deliveries_company_id_created_by_idx" ON "deliveries" USING btree ("company_id" text_ops,"created_by" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_company_id_updated_at_idx" ON "deliveries" USING btree ("company_id" text_ops,"updated_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "deliveries_company_id_created_at_idx" ON "deliveries" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "deliveries_rider_id_status_idx" ON "deliveries" USING btree ("rider_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "deliveries_status_idx" ON "deliveries" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "deliveries_pool_true_idx" ON "deliveries" USING btree ("pool" bool_ops) WHERE pool = true;--> statement-breakpoint
CREATE INDEX "deliveries_pool_status_rider_idx" ON "deliveries" USING btree ("pool" bool_ops,"status" enum_ops,"rider_id" text_ops) WHERE pool = true;--> statement-breakpoint
CREATE UNIQUE INDEX "deliveries_tracking_id_key" ON "deliveries" USING btree ("tracking_id" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_tracking_id_pin_idx" ON "deliveries" USING btree ("tracking_id" text_ops,"pin" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_pickup_phone_idx" ON "deliveries" USING btree ("pickup_phone" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_drop_off_phone_idx" ON "deliveries" USING btree ("drop_off_phone" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_pickup_state_idx" ON "deliveries" USING btree ("pickup_state");--> statement-breakpoint
CREATE INDEX "deliveries_creator_platform_idx" ON "deliveries" USING btree ("creator_platform");--> statement-breakpoint
CREATE UNIQUE INDEX "delivery_allocations_delivery_id_transaction_id_key" ON "delivery_allocations" USING btree ("delivery_id" text_ops,"transaction_id" text_ops);--> statement-breakpoint
CREATE INDEX "delivery_allocations_transaction_id_idx" ON "delivery_allocations" USING btree ("transaction_id" text_ops);--> statement-breakpoint
CREATE INDEX "dispatchers_company_id_idx" ON "dispatchers" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "dispatchers_email_key" ON "dispatchers" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "dispatchers_user_id_key" ON "dispatchers" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "escalations_conversation_id_idx" ON "escalations" USING btree ("conversation_id" text_ops);--> statement-breakpoint
CREATE INDEX "escalations_company_id_idx" ON "escalations" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE INDEX "escalations_status_idx" ON "escalations" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "escalations_escalated_to_status_idx" ON "escalations" USING btree ("escalated_to" enum_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "event_logs_actor_id_created_at_idx" ON "event_logs" USING btree ("actor_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_company_id_created_at_idx" ON "event_logs" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_entity_id_created_at_idx" ON "event_logs" USING btree ("entity_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_event_type_created_at_idx" ON "event_logs" USING btree ("event_type" enum_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_event_type_success_created_at_idx" ON "event_logs" USING btree ("event_type" enum_ops,"success" bool_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_company_entity_type_event_created_at_idx" ON "event_logs" USING btree ("company_id" text_ops,"entity_type" enum_ops,"event_type" enum_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "export_requests_company_id_status_idx" ON "export_requests" USING btree ("company_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "export_requests_status_idx" ON "export_requests" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "ledger_transactions_company_id_created_at_idx" ON "ledger_transactions" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "ledger_transactions_reference_key" ON "ledger_transactions" USING btree ("reference" text_ops);--> statement-breakpoint
CREATE INDEX "messages_conversation_id_created_at_idx" ON "messages" USING btree ("conversation_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "messages_external_id_key" ON "messages" USING btree ("external_id" text_ops);--> statement-breakpoint
CREATE INDEX "messages_reply_to_external_id_idx" ON "messages" USING btree ("reply_to_external_id" text_ops);--> statement-breakpoint
CREATE INDEX "messages_action_type_idx" ON "messages" USING btree ("action_type");--> statement-breakpoint
CREATE INDEX "messages_conversation_id_is_deleted_idx" ON "messages" USING btree ("conversation_id" text_ops,"is_deleted" bool_ops);--> statement-breakpoint
CREATE INDEX "rider_location_logs_created_at_idx" ON "rider_location_logs" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "rider_location_logs_rider_id_created_at_idx" ON "rider_location_logs" USING btree ("rider_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "riders_company_id_idx" ON "riders" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE INDEX "riders_company_id_status_idx" ON "riders" USING btree ("company_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "riders_company_id_is_accepted_idx" ON "riders" USING btree ("company_id" text_ops) WHERE is_accepted = true;--> statement-breakpoint
CREATE INDEX "riders_company_id_updated_at_idx" ON "riders" USING btree ("company_id" text_ops,"updated_at" timestamp_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "riders_email_key" ON "riders" USING btree ("email" text_ops);--> statement-breakpoint
CREATE INDEX "riders_status_last_seen_idx" ON "riders" USING btree ("status" enum_ops,"last_seen" timestamp_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "riders_user_id_key" ON "riders" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "payment_transactions_company_id_created_at_idx" ON "payment_transactions" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "payment_transactions_type_idx" ON "payment_transactions" USING btree ("type" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "payment_transactions_reference_key" ON "payment_transactions" USING btree ("reference" text_ops);--> statement-breakpoint
CREATE INDEX "payment_transactions_status_idx" ON "payment_transactions" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "payment_transactions_gateway_reference_idx" ON "payment_transactions" USING btree ("gateway_reference");