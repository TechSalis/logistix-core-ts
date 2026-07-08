ALTER TYPE "public"."PermitStatus" ADD VALUE 'PENDING_REVIEW' BEFORE 'APPROVED';--> statement-breakpoint
ALTER TABLE "company_settings" ADD COLUMN "enterprise_quote" jsonb;