-- Add durable phone_verified_at column to auth.users.
-- Once set, this timestamp is permanent (no TTL).
-- Dispatchers do NOT need phone verification — only companies and riders.
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS phone_verified_at TIMESTAMP;
