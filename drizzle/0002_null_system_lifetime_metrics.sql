DROP INDEX "clm_company_idx";--> statement-breakpoint
DROP INDEX "clm_system_idx";--> statement-breakpoint
ALTER TABLE "company_lifetime_metrics" ADD CONSTRAINT "clm_company_idx" UNIQUE NULLS NOT DISTINCT("company_id");