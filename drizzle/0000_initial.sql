CREATE TYPE "public"."DeliveryStatus" AS ENUM('AWAITING_PAYMENT', 'PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."ExportRequestStatus" AS ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."LedgerAdjustmentType" AS ENUM('CREDIT', 'DEBIT', 'CORRECTION', 'REFUND');--> statement-breakpoint
CREATE TYPE "public"."MappingPlatform" AS ENUM('WHATSAPP', 'INSTAGRAM', 'TIKTOK', 'FACEBOOK');--> statement-breakpoint
CREATE TYPE "public"."MappingSource" AS ENUM('MANUAL', 'DISCOVERY');--> statement-breakpoint
CREATE TYPE "public"."MessageStatus" AS ENUM('SENT', 'DELIVERED', 'READ', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."PaymentMethod" AS ENUM('PREPAID', 'POD');--> statement-breakpoint
CREATE TYPE "public"."PermitStatus" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."RiderStatus" AS ENUM('OFFLINE', 'ONLINE', 'BUSY');--> statement-breakpoint
CREATE TYPE "public"."Role" AS ENUM('DISPATCHER', 'COMPANY', 'RIDER', 'CUSTOMER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."SenderType" AS ENUM('CUSTOMER', 'AGENT', 'DISPATCHER', 'SYSTEM');--> statement-breakpoint
CREATE TYPE "public"."SubscriptionTier" AS ENUM('FREE', 'STARTER', 'PROFESSIONAL');--> statement-breakpoint
CREATE TYPE "public"."TransactionStatus" AS ENUM('PENDING', 'SUCCESS', 'FAILED', 'REVERSED');--> statement-breakpoint
CREATE TYPE "public"."VehicleType" AS ENUM('BIKE', 'CAR', 'VAN', 'TRUCK');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app_configs" (
	"key" text PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL,
	"scope" text,
	"updated_at" timestamp (3) NOT NULL
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
	"name" text NOT NULL,
	"business_handle" text,
	"logo_url" text,
	"cac" text,
	"contact_phone" text,
	"address" text,
	"place_id" text,
	"states" text[] DEFAULT '{"RAY"}',
	"interstate_deliveries" boolean NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_integrations" (
	"id" text PRIMARY KEY NOT NULL,
	"platform" "MappingPlatform" NOT NULL,
	"platform_id" text NOT NULL,
	"company_id" text NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"is_platform_owned" boolean DEFAULT true NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"tier" "SubscriptionTier" DEFAULT 'FREE' NOT NULL,
	"working_hours" jsonb DEFAULT '{"Friday":{"close":"19:00","start":"07:00"},"Monday":{"close":"19:00","start":"07:00"},"Tuesday":{"close":"19:00","start":"07:00"},"Saturday":{"close":"19:00","start":"07:00"},"Thursday":{"close":"19:00","start":"07:00"},"Wednesday":{"close":"19:00","start":"07:00"}}'::jsonb NOT NULL,
	"bank_details" jsonb,
	"ledger_balance" double precision DEFAULT 0 NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" text PRIMARY KEY NOT NULL,
	"platform" "MappingPlatform" DEFAULT 'WHATSAPP' NOT NULL,
	"platform_id" text NOT NULL,
	"company_id" text NOT NULL,
	"last_message_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	"auto_reply_enabled" boolean DEFAULT true NOT NULL,
	"last_customer_message_at" timestamp (3),
	"scratchpad" jsonb,
	"customer_name" text
);
--> statement-breakpoint
CREATE TABLE "customer_company_mappings" (
	"id" text PRIMARY KEY NOT NULL,
	"platform_id" text NOT NULL,
	"platform" "MappingPlatform" DEFAULT 'WHATSAPP' NOT NULL,
	"company_id" text NOT NULL,
	"source" "MappingSource" DEFAULT 'DISCOVERY' NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "deliveries" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text,
	"created_by" text,
	"rider_id" text,
	"status" "DeliveryStatus" NOT NULL,
	"pickup_address" text NOT NULL,
	"pickup_place_id" text,
	"pickup_lat" double precision,
	"pickup_lng" double precision,
	"drop_off_address" text NOT NULL,
	"drop_off_place_id" text,
	"drop_off_lat" double precision,
	"drop_off_lng" double precision,
	"pickup_phone" text,
	"drop_off_phone" text,
	"description" text,
	"payment_method" "PaymentMethod" NOT NULL,
	"scheduled_at" timestamp (3),
	"delivered_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	"tracking_id" text NOT NULL,
	"pin" text,
	"proof_of_delivery_image_path" text,
	"price" double precision,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "delivery_allocations" (
	"id" text PRIMARY KEY NOT NULL,
	"delivery_id" text NOT NULL,
	"delivery_transaction_id" text NOT NULL,
	"amount" double precision NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "delivery_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text,
	"amount" double precision NOT NULL,
	"currency" text DEFAULT 'NGN' NOT NULL,
	"status" "TransactionStatus" DEFAULT 'PENDING' NOT NULL,
	"reference" text NOT NULL,
	"provider" text,
	"metadata" jsonb,
	"processed_at" timestamp (3),
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
	"permit_status" "PermitStatus" DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"event_type" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text NOT NULL,
	"actor_id" text,
	"actor_type" text,
	"company_id" text,
	"payload" jsonb,
	"trace_id" text,
	"ip_address" text,
	"user_agent" text,
	"success" boolean DEFAULT true NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "export_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"user_email" text NOT NULL,
	"status" "ExportRequestStatus" DEFAULT 'PENDING' NOT NULL,
	"requested_by" text NOT NULL,
	"target_month" text,
	"rider_id" text,
	"requested_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"completed_at" timestamp (3),
	"download_url" text
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
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pricing_schemes" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"vehicle_type" "VehicleType" DEFAULT 'BIKE' NOT NULL,
	"base_fare" double precision DEFAULT 1000 NOT NULL,
	"per_km_rate" double precision DEFAULT 150 NOT NULL,
	"min_fare" double precision DEFAULT 1000 NOT NULL,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
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
	"phone_number" text,
	"registration_number" text,
	"vehicle_type" "VehicleType" DEFAULT 'BIKE' NOT NULL,
	"permit_status" "PermitStatus" DEFAULT 'PENDING' NOT NULL,
	"is_accepted" boolean DEFAULT false NOT NULL,
	"status" "RiderStatus" NOT NULL,
	"last_lat" double precision,
	"last_lng" double precision,
	"last_seen" timestamp (3),
	"battery_level" integer,
	"fcm_token" text,
	"company_id" text,
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"amount" double precision NOT NULL,
	"currency" text DEFAULT 'NGN' NOT NULL,
	"status" "TransactionStatus" DEFAULT 'PENDING' NOT NULL,
	"reference" text NOT NULL,
	"provider" text,
	"tier" "SubscriptionTier" NOT NULL,
	"period_start" timestamp (3) NOT NULL,
	"period_end" timestamp (3) NOT NULL,
	"metadata" jsonb,
	"processed_at" timestamp (3),
	"created_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "company_integrations" ADD CONSTRAINT "company_integrations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "company_settings" ADD CONSTRAINT "company_settings_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "customer_company_mappings" ADD CONSTRAINT "customer_company_mappings_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_rider_id_fkey" FOREIGN KEY ("rider_id") REFERENCES "public"."riders"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "delivery_allocations" ADD CONSTRAINT "delivery_allocations_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "public"."deliveries"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "delivery_allocations" ADD CONSTRAINT "delivery_allocations_delivery_transaction_id_fkey" FOREIGN KEY ("delivery_transaction_id") REFERENCES "public"."delivery_transactions"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "dispatchers" ADD CONSTRAINT "dispatchers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pricing_schemes" ADD CONSTRAINT "pricing_schemes_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "rider_location_logs" ADD CONSTRAINT "rider_location_logs_rider_id_fkey" FOREIGN KEY ("rider_id") REFERENCES "public"."riders"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "riders" ADD CONSTRAINT "riders_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "admins_email_key" ON "admins" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "admins_user_id_key" ON "admins" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "blocked_ips_expires_at_idx" ON "blocked_ips" USING btree ("expires_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "blocked_ips_ip_address_idx" ON "blocked_ips" USING btree ("ip_address" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "companies_business_handle_key" ON "companies" USING btree ("business_handle" text_ops);--> statement-breakpoint
CREATE INDEX "companies_name_idx" ON "companies" USING btree ("name" text_ops);--> statement-breakpoint
CREATE INDEX "company_integrations_company_id_idx" ON "company_integrations" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE INDEX "company_integrations_is_active_idx" ON "company_integrations" USING btree ("is_active" bool_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "company_integrations_platform_company_id_key" ON "company_integrations" USING btree ("platform" enum_ops,"company_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "company_integrations_platform_platform_id_key" ON "company_integrations" USING btree ("platform" enum_ops,"platform_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "company_settings_company_id_key" ON "company_settings" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE INDEX "conversations_company_id_idx" ON "conversations" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE INDEX "conversations_company_id_last_message_at_idx" ON "conversations" USING btree ("company_id" text_ops,"last_message_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "conversations_platform_id_platform_idx" ON "conversations" USING btree ("platform_id" text_ops,"platform" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "conversations_platform_platform_id_company_id_key" ON "conversations" USING btree ("platform" enum_ops,"platform_id" text_ops,"company_id" text_ops);--> statement-breakpoint
CREATE INDEX "customer_company_mappings_company_id_idx" ON "customer_company_mappings" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE INDEX "customer_company_mappings_platform_id_idx" ON "customer_company_mappings" USING btree ("platform_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "customer_company_mappings_platform_id_platform_company_id_key" ON "customer_company_mappings" USING btree ("platform_id" text_ops,"platform" enum_ops,"company_id" text_ops);--> statement-breakpoint
CREATE INDEX "customer_company_mappings_platform_id_platform_idx" ON "customer_company_mappings" USING btree ("platform_id" text_ops,"platform" enum_ops);--> statement-breakpoint
CREATE INDEX "deliveries_company_id_status_idx" ON "deliveries" USING btree ("company_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "deliveries_company_id_created_by_idx" ON "deliveries" USING btree ("company_id" text_ops,"created_by" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_company_id_updated_at_idx" ON "deliveries" USING btree ("company_id" text_ops,"updated_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "deliveries_company_id_created_at_idx" ON "deliveries" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "deliveries_created_at_idx" ON "deliveries" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "deliveries_rider_id_status_idx" ON "deliveries" USING btree ("rider_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "deliveries_status_idx" ON "deliveries" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "deliveries_tracking_id_key" ON "deliveries" USING btree ("tracking_id" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_tracking_id_pin_idx" ON "deliveries" USING btree ("tracking_id" text_ops,"pin" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_created_by_idx" ON "deliveries" USING btree ("created_by" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_pickup_phone_idx" ON "deliveries" USING btree ("pickup_phone" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_drop_off_phone_idx" ON "deliveries" USING btree ("drop_off_phone" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "delivery_allocations_delivery_id_delivery_transaction_id_key" ON "delivery_allocations" USING btree ("delivery_id" text_ops,"delivery_transaction_id" text_ops);--> statement-breakpoint
CREATE INDEX "delivery_allocations_delivery_id_idx" ON "delivery_allocations" USING btree ("delivery_id" text_ops);--> statement-breakpoint
CREATE INDEX "delivery_allocations_delivery_transaction_id_idx" ON "delivery_allocations" USING btree ("delivery_transaction_id" text_ops);--> statement-breakpoint
CREATE INDEX "delivery_transactions_company_id_created_at_idx" ON "delivery_transactions" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "delivery_transactions_reference_idx" ON "delivery_transactions" USING btree ("reference" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "delivery_transactions_reference_key" ON "delivery_transactions" USING btree ("reference" text_ops);--> statement-breakpoint
CREATE INDEX "delivery_transactions_status_created_at_idx" ON "delivery_transactions" USING btree ("status" enum_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "dispatchers_company_id_idx" ON "dispatchers" USING btree ("company_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "dispatchers_email_key" ON "dispatchers" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "dispatchers_user_id_key" ON "dispatchers" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "event_logs_actor_id_created_at_idx" ON "event_logs" USING btree ("actor_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_company_id_created_at_idx" ON "event_logs" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_entity_id_created_at_idx" ON "event_logs" USING btree ("entity_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_event_type_created_at_idx" ON "event_logs" USING btree ("event_type" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "event_logs_event_type_success_created_at_idx" ON "event_logs" USING btree ("event_type" text_ops,"success" bool_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "export_requests_company_id_status_idx" ON "export_requests" USING btree ("company_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "export_requests_status_idx" ON "export_requests" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "ledger_transactions_company_id_created_at_idx" ON "ledger_transactions" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "ledger_transactions_reference_idx" ON "ledger_transactions" USING btree ("reference" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "ledger_transactions_reference_key" ON "ledger_transactions" USING btree ("reference" text_ops);--> statement-breakpoint
CREATE INDEX "messages_conversation_id_created_at_idx" ON "messages" USING btree ("conversation_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "messages_conversation_id_idx" ON "messages" USING btree ("conversation_id" text_ops);--> statement-breakpoint
CREATE INDEX "messages_conversation_id_is_deleted_idx" ON "messages" USING btree ("conversation_id" text_ops,"is_deleted" bool_ops);--> statement-breakpoint
CREATE INDEX "messages_external_id_idx" ON "messages" USING btree ("external_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "messages_external_id_key" ON "messages" USING btree ("external_id" text_ops);--> statement-breakpoint
CREATE INDEX "messages_reply_to_external_id_idx" ON "messages" USING btree ("reply_to_external_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "pricing_schemes_company_id_vehicle_type_key" ON "pricing_schemes" USING btree ("company_id" text_ops,"vehicle_type" enum_ops);--> statement-breakpoint
CREATE INDEX "rider_location_logs_rider_id_created_at_idx" ON "rider_location_logs" USING btree ("rider_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "rider_location_logs_created_at_idx" ON "rider_location_logs" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "riders_company_id_status_idx" ON "riders" USING btree ("company_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "riders_company_id_updated_at_idx" ON "riders" USING btree ("company_id" text_ops,"updated_at" timestamp_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "riders_email_key" ON "riders" USING btree ("email" text_ops);--> statement-breakpoint
CREATE INDEX "riders_status_last_seen_idx" ON "riders" USING btree ("status" enum_ops,"last_seen" timestamp_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "riders_user_id_key" ON "riders" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "subscription_transactions_company_id_created_at_idx" ON "subscription_transactions" USING btree ("company_id" text_ops,"created_at" timestamp_ops);--> statement-breakpoint
CREATE INDEX "subscription_transactions_reference_idx" ON "subscription_transactions" USING btree ("reference" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "subscription_transactions_reference_key" ON "subscription_transactions" USING btree ("reference" text_ops);--> statement-breakpoint
CREATE INDEX "subscription_transactions_status_created_at_idx" ON "subscription_transactions" USING btree ("status" enum_ops,"created_at" timestamp_ops);