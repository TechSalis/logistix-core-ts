ALTER TABLE "company_integrations" ADD COLUMN "overflow_partner_company_id" text;--> statement-breakpoint
ALTER TABLE "company_integrations" ADD COLUMN "overflow_cut" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_integrations" ADD CONSTRAINT "company_integrations_overflow_partner_company_id_fkey" FOREIGN KEY ("overflow_partner_company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
