DROP INDEX IF EXISTS "customer_company_mappings_company_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "customer_company_mappings_platform_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "customer_company_mappings_platform_id_platform_company_id_key";--> statement-breakpoint
DROP INDEX IF EXISTS "customer_company_mappings_platform_id_platform_idx";--> statement-breakpoint
ALTER TABLE "customer_company_mappings" DROP CONSTRAINT "customer_company_mappings_company_id_fkey";--> statement-breakpoint
DROP TABLE IF EXISTS "customer_company_mappings";--> statement-breakpoint
DROP TYPE IF EXISTS "MappingSource";
