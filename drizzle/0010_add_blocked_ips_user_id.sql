-- Add user_id column to blocked_ips for user-targeted persistent blocks.
-- Allows persistent blocks to follow a user across IP changes.
ALTER TABLE "blocked_ips" ADD COLUMN "user_id" text;
CREATE INDEX "blocked_ips_user_id_idx" ON "blocked_ips" USING btree ("user_id" asc nulls last);
