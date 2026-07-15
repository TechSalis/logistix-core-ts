ALTER TABLE company_settings ADD COLUMN auto_accept_team boolean DEFAULT false NOT NULL;
UPDATE company_settings SET auto_accept_team = (auto_accept_dispatchers OR auto_accept_riders);
ALTER TABLE company_settings DROP COLUMN auto_accept_dispatchers;
ALTER TABLE company_settings DROP COLUMN auto_accept_riders;
