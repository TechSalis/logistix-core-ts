CREATE TYPE "public"."MetricDomain" AS ENUM('DELIVERIES', 'CONVERSATIONS', 'RIDERS', 'REVENUE');--> statement-breakpoint
CREATE TYPE "public"."MetricGranularity" AS ENUM('DAY', 'WEEK', 'MONTH', 'LIFETIME');--> statement-breakpoint
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
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "metrics_company_domain_granularity_idx" ON "metrics" USING btree ("company_id","domain","granularity","bucket_start");--> statement-breakpoint
CREATE INDEX "metrics_system_domain_granularity_idx" ON "metrics" USING btree ("domain","granularity","bucket_start") WHERE "metrics"."company_id" IS NULL;