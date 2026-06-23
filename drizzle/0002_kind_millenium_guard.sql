ALTER TABLE "admins" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "app_configs" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "blocked_ips" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "companies" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "company_integrations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "company_settings" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "conversations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "customer_company_mappings" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "deliveries" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "delivery_allocations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "delivery_transactions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "dispatchers" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "event_logs" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "export_requests" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "ledger_transactions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "messages" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "pricing_schemes" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "rider_location_logs" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "riders" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "subscription_transactions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE INDEX "deliveries_company_id_status_idx" ON "deliveries" USING btree ("company_id" text_ops,"status" enum_ops);--> statement-breakpoint
CREATE INDEX "deliveries_created_by_idx" ON "deliveries" USING btree ("created_by" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_pickup_phone_idx" ON "deliveries" USING btree ("pickup_phone" text_ops);--> statement-breakpoint
CREATE INDEX "deliveries_drop_off_phone_idx" ON "deliveries" USING btree ("drop_off_phone" text_ops);--> statement-breakpoint
CREATE INDEX "messages_conversation_id_is_deleted_idx" ON "messages" USING btree ("conversation_id" text_ops,"is_deleted" bool_ops);--> statement-breakpoint
CREATE INDEX "rider_location_logs_created_at_idx" ON "rider_location_logs" USING btree ("created_at" timestamp_ops);--> statement-breakpoint
DROP POLICY "admins_isolation" ON "admins" CASCADE;--> statement-breakpoint
DROP POLICY "app_configs_isolation" ON "app_configs" CASCADE;--> statement-breakpoint
DROP POLICY "blocked_ips_isolation" ON "blocked_ips" CASCADE;--> statement-breakpoint
DROP POLICY "companies_isolation" ON "companies" CASCADE;--> statement-breakpoint
DROP POLICY "company_owned_isolation" ON "company_integrations" CASCADE;--> statement-breakpoint
DROP POLICY "company_owned_isolation" ON "company_settings" CASCADE;--> statement-breakpoint
DROP POLICY "conversations_isolation" ON "conversations" CASCADE;--> statement-breakpoint
DROP POLICY "mappings_isolation" ON "customer_company_mappings" CASCADE;--> statement-breakpoint
DROP POLICY "deliveries_isolation" ON "deliveries" CASCADE;--> statement-breakpoint
DROP POLICY "delivery_allocations_isolation" ON "delivery_allocations" CASCADE;--> statement-breakpoint
DROP POLICY "transactions_isolation" ON "delivery_transactions" CASCADE;--> statement-breakpoint
DROP POLICY "dispatchers_isolation" ON "dispatchers" CASCADE;--> statement-breakpoint
DROP POLICY "event_logs_isolation" ON "event_logs" CASCADE;--> statement-breakpoint
DROP POLICY "company_owned_isolation" ON "export_requests" CASCADE;--> statement-breakpoint
DROP POLICY "transactions_isolation" ON "ledger_transactions" CASCADE;--> statement-breakpoint
DROP POLICY "messages_isolation" ON "messages" CASCADE;--> statement-breakpoint
DROP POLICY "company_owned_isolation" ON "pricing_schemes" CASCADE;--> statement-breakpoint
DROP POLICY "rider_location_logs_isolation" ON "rider_location_logs" CASCADE;--> statement-breakpoint
DROP POLICY "riders_isolation" ON "riders" CASCADE;--> statement-breakpoint
DROP POLICY "transactions_isolation" ON "subscription_transactions" CASCADE;