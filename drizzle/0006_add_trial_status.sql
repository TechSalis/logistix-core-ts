-- Add TRIAL to subscription_status (14-day free trial for new companies)

-- 1. Drop old CHECK constraint
ALTER TABLE company_settings DROP CONSTRAINT IF EXISTS company_settings_subscription_status_check;

-- 2. Add TRIAL to allowed values
ALTER TABLE company_settings ADD CONSTRAINT company_settings_subscription_status_check
  CHECK (subscription_status IN ('TRIAL', 'ACTIVE', 'PAST_DUE', 'CANCELLED'));

-- 3. New companies default to TRIAL (schema default handles this, but existing CANCELLED
--    rows with no transactions stay CANCELLED — only truly new signups get TRIAL)
