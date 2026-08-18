-- Drop dead indexes
DROP INDEX CONCURRENTLY IF EXISTS deliveries_company_id_created_by_idx;
DROP INDEX CONCURRENTLY IF EXISTS deliveries_tracking_id_pin_idx;
DROP INDEX CONCURRENTLY IF EXISTS deliveries_pickup_phone_idx;
DROP INDEX CONCURRENTLY IF EXISTS deliveries_drop_off_phone_idx;
DROP INDEX CONCURRENTLY IF EXISTS deliveries_creator_platform_idx;
DROP INDEX CONCURRENTLY IF EXISTS device_tokens_user_id_idx;

-- GIN indexes on JSONB metadata columns for efficient ->> queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS conversations_metadata_gin ON conversations USING gin (metadata);
CREATE INDEX CONCURRENTLY IF NOT EXISTS deliveries_metadata_gin ON deliveries USING gin (metadata);
CREATE INDEX CONCURRENTLY IF NOT EXISTS event_logs_metadata_gin ON event_logs USING gin (metadata);

-- Functional indexes for ->> queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS conversations_metadata_escalation_status_idx
  ON conversations ((metadata->>'escalationStatus'));
CREATE INDEX CONCURRENTLY IF NOT EXISTS event_logs_metadata_severity_idx
  ON event_logs ((metadata->>'severity'));
