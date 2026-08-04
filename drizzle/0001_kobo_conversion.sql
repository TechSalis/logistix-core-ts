-- One-time data migration: convert all monetary columns from naira to kobo.
-- Run AFTER the "kobo everywhere" code deploy. Back up the database first
-- (pg_dump) — this migration rewrites financial data in place.
-- Runs exactly once via the drizzle journal.
--> statement-breakpoint
BEGIN;
--> statement-breakpoint
UPDATE "deliveries" SET "price" = "price" * 100 WHERE "price" IS NOT NULL;
--> statement-breakpoint
UPDATE "company_settings" SET "ledger_balance" = "ledger_balance" * 100;
--> statement-breakpoint
UPDATE "payment_transactions" SET "amount" = "amount" * 100;
--> statement-breakpoint
UPDATE "subscription_transactions" SET "amount" = "amount" * 100;
--> statement-breakpoint
UPDATE "delivery_allocations" SET "amount" = "amount" * 100;
--> statement-breakpoint
UPDATE "ledger_transactions" SET "amount" = "amount" * 100;
--> statement-breakpoint
COMMIT;
