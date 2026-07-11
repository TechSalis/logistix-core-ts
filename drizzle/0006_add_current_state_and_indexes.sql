ALTER TABLE "riders" ADD COLUMN "current_state" text;
--> statement-breakpoint
CREATE INDEX "companies_verification_status_idx" ON "companies" USING btree ("verification_status" enum_ops);
--> statement-breakpoint
CREATE INDEX "company_settings_enterprise_quote_status_idx" ON "company_settings" USING btree ((company_settings.enterprise_quote->>'status'));
--> statement-breakpoint
CREATE INDEX "conversations_channel_type_idx" ON "conversations" USING btree ("channel_type" enum_ops);
--> statement-breakpoint
CREATE INDEX "deliveries_pickup_state_idx" ON "deliveries" USING btree ((deliveries.metadata->>'pickupState'));
--> statement-breakpoint
CREATE INDEX "riders_company_id_idx" ON "riders" USING btree ("company_id" text_ops);
