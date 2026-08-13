DROP INDEX "dispatchers_company_id_created_at_idx";--> statement-breakpoint
ALTER TABLE "dispatchers" ADD COLUMN "updated_at" timestamp (3) DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
UPDATE "dispatchers" SET "updated_at" = "created_at";--> statement-breakpoint
CREATE INDEX "dispatchers_company_id_updated_at_idx" ON "dispatchers" USING btree ("company_id" text_ops,"updated_at" timestamp_ops);
