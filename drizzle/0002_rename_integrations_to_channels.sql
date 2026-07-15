-- Rename company_integrations → company_channels
-- (Applied via drizzle-kit push on staging)

ALTER TABLE IF EXISTS company_integrations RENAME TO company_channels;

ALTER INDEX IF EXISTS company_integrations_pkey RENAME TO company_channels_pkey;
ALTER INDEX IF EXISTS company_integrations_is_active_idx RENAME TO company_channels_is_active_idx;
ALTER INDEX IF EXISTS company_integrations_company_id_is_active_idx RENAME TO company_channels_company_id_is_active_idx;
ALTER INDEX IF EXISTS company_integrations_platform_company_id_key RENAME TO company_channels_platform_company_id_key;
ALTER INDEX IF EXISTS company_integrations_platform_platform_id_key RENAME TO company_channels_platform_platform_id_key;

ALTER TABLE company_channels RENAME CONSTRAINT company_integrations_company_id_fkey TO company_channels_company_id_fkey;
