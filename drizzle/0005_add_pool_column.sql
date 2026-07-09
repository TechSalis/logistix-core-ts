ALTER TABLE "deliveries" ADD COLUMN "pool" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "deliveries_pool_true_idx" ON "deliveries" USING btree ("pool" bool_ops) WHERE pool = true;--> statement-breakpoint
ALTER TABLE "company_integrations" DROP COLUMN IF EXISTS "overflow_partner_company_id";--> statement-breakpoint
ALTER TABLE "company_integrations" DROP COLUMN IF EXISTS "overflow_cut";
