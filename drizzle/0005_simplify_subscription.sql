-- Simplify subscription status: remove PENDING, GRACE, LOCKED; add PAST_DUE
-- Add squad_token_id column for recurring card billing

-- 1. Migrate existing data before changing the constraint
UPDATE company_settings SET subscription_status = 'PAST_DUE'
  WHERE subscription_status IN ('GRACE', 'LOCKED');
UPDATE company_settings SET subscription_status = 'CANCELLED'
  WHERE subscription_status = 'PENDING';

-- 2. Drop the old CHECK constraint and create the new one
ALTER TABLE company_settings DROP CONSTRAINT IF EXISTS company_settings_subscription_status_check;
ALTER TABLE company_settings ADD CONSTRAINT company_settings_subscription_status_check
  CHECK (subscription_status IN ('ACTIVE', 'PAST_DUE', 'CANCELLED'));

-- 3. Add squad_token_id column for tokenized card recurring billing
ALTER TABLE company_settings ADD COLUMN squad_token_id text;

-- 4. Drop locked_at column (no longer tracked — read-only mode uses subscription_status alone)
ALTER TABLE company_settings DROP COLUMN IF EXISTS locked_at;
