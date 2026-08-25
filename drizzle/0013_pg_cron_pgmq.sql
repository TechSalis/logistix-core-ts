-- PostgreSQL native scheduling & queue migration
-- Creates pg_cron + pgmq extensions, pgmq queues, PL/pgSQL functions, and pg_cron schedules

-- ============================================================
-- 1. Extensions
-- ============================================================
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pgmq;

-- ============================================================
-- 2. pgmq queues (one per job type)
-- ============================================================
SELECT pgmq.create('delivery_notifications');
SELECT pgmq.create('ai_batch');
SELECT pgmq.create('squid_webhooks');
SELECT pgmq.create('exports');

-- ============================================================
-- 3. PL/pgSQL functions for worker DB-only tasks
-- ============================================================

-- Draft expiration: purge stale delivery drafts from conversation memory
CREATE OR REPLACE FUNCTION pg_cron_draft_expiration() RETURNS void AS $$
DECLARE
  expired_count integer;
BEGIN
  UPDATE conversations
  SET memory = memory #- '{deliveries,drafts}',
      updated_at = NOW()
  WHERE memory->'deliveries'->'drafts' IS NOT NULL
    AND updated_at < NOW() - INTERVAL '72 hours';

  GET DIAGNOSTICS expired_count = ROW_COUNT;
  RAISE NOTICE 'Draft expiration: expired % conversations', expired_count;
END;
$$ LANGUAGE plpgsql;

-- Session & device cleanup: prune revoked/expired sessions and stale device tokens
CREATE OR REPLACE FUNCTION pg_cron_session_device_cleanup() RETURNS void AS $$
DECLARE
  sessions_pruned integer;
  devices_pruned integer;
BEGIN
  DELETE FROM refresh_sessions
  WHERE issued_at < NOW() - INTERVAL '30 days'
    AND (revoked_at IS NOT NULL OR expires_at < NOW());
  GET DIAGNOSTICS sessions_pruned = ROW_COUNT;

  DELETE FROM device_tokens
  WHERE fcm_token IS NULL
    AND updated_at < NOW() - INTERVAL '30 days';
  GET DIAGNOSTICS devices_pruned = ROW_COUNT;

  RAISE NOTICE 'Session cleanup: pruned % sessions, % devices', sessions_pruned, devices_pruned;
END;
$$ LANGUAGE plpgsql;

-- Payment timeout cancellation: cancel AWAITING_PAYMENT deliveries older than timeout
CREATE OR REPLACE FUNCTION pg_cron_payment_timeout_cancellation() RETURNS void AS $$
DECLARE
  cancelled_count integer;
  timeout_hours numeric := 0.5;
BEGIN
  WITH expired AS (
    UPDATE deliveries
    SET status = 'CANCELLED',
        updated_at = NOW(),
        metadata = metadata - 'paymentStatus'
    WHERE metadata->>'paymentStatus' = 'AWAITING'
      AND created_at < NOW() - (timeout_hours || ' hours')::interval
      AND company_id IS NOT NULL
    RETURNING id, tracking_id, company_id, created_by, creator_platform
  )
  INSERT INTO event_logs (id, entity_type, entity_id, event_type, company_id, metadata, created_at)
  SELECT gen_random_uuid()::text, 'DELIVERY', e.id, 'CANCELLED_PAYMENT_TIMEOUT', e.company_id,
         jsonb_build_object('tracking_id', e.tracking_id, 'company_id', e.company_id, 'timeout_hours', timeout_hours),
         NOW()
  FROM expired e;

  GET DIAGNOSTICS cancelled_count = ROW_COUNT;

  IF cancelled_count > 0 THEN
    INSERT INTO pgmq.q_delivery_notifications (message)
    SELECT jsonb_build_object(
      'delivery', jsonb_build_object(
        'id', d.id,
        'trackingId', d.tracking_id,
        'status', 'CANCELLED',
        'companyId', d.company_id,
        'createdBy', d.created_by,
        'creatorPlatform', d.creator_platform
      )
    )
    FROM deliveries d
    WHERE d.status = 'CANCELLED'
      AND d.updated_at > NOW() - INTERVAL '1 minute'
      AND d.metadata->>'paymentStatus' IS NULL
      AND d.company_id IS NOT NULL;

    RAISE NOTICE 'Payment timeout: cancelled % deliveries', cancelled_count;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Daily metrics computation: compute DAY buckets for all 4 domains
CREATE OR REPLACE FUNCTION pg_cron_daily_metrics_computation() RETURNS void AS $$
DECLARE
  yesterday date := CURRENT_DATE - INTERVAL '1 day';
  tz text := 'Africa/Lagos';
BEGIN
  -- DELIVERIES domain: per-company rows
  INSERT INTO metrics (
    company_id, domain, granularity, bucket_start,
    total_count, delivered_count, cancelled_count, failed_count,
    total_revenue_kobo, avg_delivery_time_minutes,
    channel_breakdown, extra_metrics, peak_hour, unique_riders_active, updated_at
  )
  SELECT
    d.company_id,
    'DELIVERIES'::"MetricDomain",
    'DAY'::"MetricGranularity",
    yesterday,
    COUNT(*)::int,
    COUNT(*) FILTER (WHERE d.status = 'DELIVERED')::int,
    COUNT(*) FILTER (WHERE d.status = 'CANCELLED')::int,
    COUNT(*) FILTER (WHERE d.status = 'FAILED')::int,
    COALESCE(SUM(d.price) FILTER (WHERE d.status = 'DELIVERED'), 0)::int,
    AVG(EXTRACT(EPOCH FROM (d.delivered_at - d.created_at)) / 60)
      FILTER (WHERE d.status = 'DELIVERED' AND d.delivered_at IS NOT NULL),
    jsonb_build_object(
      'whatsapp', COUNT(*) FILTER (WHERE d.creator_platform = 'WHATSAPP')::int,
      'instagram', COUNT(*) FILTER (WHERE d.creator_platform = 'INSTAGRAM')::int,
      'facebook', COUNT(*) FILTER (WHERE d.creator_platform = 'FACEBOOK')::int,
      'tiktok', COUNT(*) FILTER (WHERE d.creator_platform = 'TIKTOK')::int,
      'manual', COUNT(*) FILTER (WHERE d.creator_platform IS NULL)::int
    ),
    jsonb_build_object(
      'prepaidCount', COUNT(*) FILTER (WHERE d.payment_method = 'PREPAID')::int,
      'payOnDeliveryCount', COUNT(*) FILTER (WHERE d.payment_method = 'PAY_ON_DELIVERY')::int
    ),
    mode() WITHIN GROUP (ORDER BY EXTRACT(HOUR FROM d.created_at))::int,
    COUNT(DISTINCT d.rider_id)::int,
    CURRENT_TIMESTAMP
  FROM deliveries d
  WHERE d.company_id IS NOT NULL
    AND d.created_at >= (yesterday AT TIME ZONE tz)
    AND d.created_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
  GROUP BY d.company_id
  ON CONFLICT (company_id, domain, granularity, bucket_start) DO UPDATE SET
    total_count = EXCLUDED.total_count,
    delivered_count = EXCLUDED.delivered_count,
    cancelled_count = EXCLUDED.cancelled_count,
    failed_count = EXCLUDED.failed_count,
    total_revenue_kobo = EXCLUDED.total_revenue_kobo,
    avg_delivery_time_minutes = EXCLUDED.avg_delivery_time_minutes,
    channel_breakdown = EXCLUDED.channel_breakdown,
    extra_metrics = EXCLUDED.extra_metrics,
    peak_hour = EXCLUDED.peak_hour,
    unique_riders_active = EXCLUDED.unique_riders_active,
    updated_at = CURRENT_TIMESTAMP;

  -- DELIVERIES domain: system row (company_id NULL)
  INSERT INTO metrics (
    company_id, domain, granularity, bucket_start,
    total_count, delivered_count, cancelled_count, failed_count,
    total_revenue_kobo, avg_delivery_time_minutes,
    channel_breakdown, extra_metrics, peak_hour, unique_riders_active, updated_at
  )
  SELECT
    NULL::text,
    'DELIVERIES'::"MetricDomain",
    'DAY'::"MetricGranularity",
    yesterday,
    COUNT(*)::int,
    COUNT(*) FILTER (WHERE d.status = 'DELIVERED')::int,
    COUNT(*) FILTER (WHERE d.status = 'CANCELLED')::int,
    COUNT(*) FILTER (WHERE d.status = 'FAILED')::int,
    COALESCE(SUM(d.price) FILTER (WHERE d.status = 'DELIVERED'), 0)::int,
    AVG(EXTRACT(EPOCH FROM (d.delivered_at - d.created_at)) / 60)
      FILTER (WHERE d.status = 'DELIVERED' AND d.delivered_at IS NOT NULL),
    jsonb_build_object(
      'whatsapp', COUNT(*) FILTER (WHERE d.creator_platform = 'WHATSAPP')::int,
      'instagram', COUNT(*) FILTER (WHERE d.creator_platform = 'INSTAGRAM')::int,
      'facebook', COUNT(*) FILTER (WHERE d.creator_platform = 'FACEBOOK')::int,
      'tiktok', COUNT(*) FILTER (WHERE d.creator_platform = 'TIKTOK')::int,
      'manual', COUNT(*) FILTER (WHERE d.creator_platform IS NULL)::int
    ),
    jsonb_build_object(
      'prepaidCount', COUNT(*) FILTER (WHERE d.payment_method = 'PREPAID')::int,
      'payOnDeliveryCount', COUNT(*) FILTER (WHERE d.payment_method = 'PAY_ON_DELIVERY')::int
    ),
    mode() WITHIN GROUP (ORDER BY EXTRACT(HOUR FROM d.created_at))::int,
    COUNT(DISTINCT d.rider_id)::int,
    CURRENT_TIMESTAMP
  FROM deliveries d
  WHERE d.created_at >= (yesterday AT TIME ZONE tz)
    AND d.created_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
  ON CONFLICT (company_id, domain, granularity, bucket_start) DO UPDATE SET
    total_count = EXCLUDED.total_count,
    delivered_count = EXCLUDED.delivered_count,
    cancelled_count = EXCLUDED.cancelled_count,
    failed_count = EXCLUDED.failed_count,
    total_revenue_kobo = EXCLUDED.total_revenue_kobo,
    avg_delivery_time_minutes = EXCLUDED.avg_delivery_time_minutes,
    channel_breakdown = EXCLUDED.channel_breakdown,
    extra_metrics = EXCLUDED.extra_metrics,
    peak_hour = EXCLUDED.peak_hour,
    unique_riders_active = EXCLUDED.unique_riders_active,
    updated_at = CURRENT_TIMESTAMP;

  -- CONVERSATIONS domain: per-company rows
  INSERT INTO metrics (
    company_id, domain, granularity, bucket_start,
    total_count, channel_breakdown, extra_metrics, updated_at
  )
  SELECT
    c.company_id,
    'CONVERSATIONS'::"MetricDomain",
    'DAY'::"MetricGranularity",
    yesterday,
    COUNT(*)::int,
    jsonb_build_object(
      'whatsapp', COUNT(*) FILTER (WHERE c.platform = 'WHATSAPP')::int,
      'instagram', COUNT(*) FILTER (WHERE c.platform = 'INSTAGRAM')::int,
      'facebook', COUNT(*) FILTER (WHERE c.platform = 'FACEBOOK')::int,
      'tiktok', COUNT(*) FILTER (WHERE c.platform = 'TIKTOK')::int
    ),
    jsonb_build_object(
      'activeCount', COUNT(*) FILTER (
        WHERE c.last_message_at >= (yesterday AT TIME ZONE tz)
          AND c.last_message_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
      )::int,
      'escalatedCount', COUNT(*) FILTER (
        WHERE c.escalated_at >= (yesterday AT TIME ZONE tz)
          AND c.escalated_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
      )::int
    ),
    CURRENT_TIMESTAMP
  FROM conversations c
  WHERE c.company_id IS NOT NULL
    AND c.created_at >= (yesterday AT TIME ZONE tz)
    AND c.created_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
  GROUP BY c.company_id
  ON CONFLICT (company_id, domain, granularity, bucket_start) DO UPDATE SET
    total_count = EXCLUDED.total_count,
    channel_breakdown = EXCLUDED.channel_breakdown,
    extra_metrics = EXCLUDED.extra_metrics,
    updated_at = CURRENT_TIMESTAMP;

  -- CONVERSATIONS domain: system row
  INSERT INTO metrics (
    company_id, domain, granularity, bucket_start,
    total_count, channel_breakdown, extra_metrics, updated_at
  )
  SELECT
    NULL::text,
    'CONVERSATIONS'::"MetricDomain",
    'DAY'::"MetricGranularity",
    yesterday,
    COUNT(*)::int,
    jsonb_build_object(
      'whatsapp', COUNT(*) FILTER (WHERE c.platform = 'WHATSAPP')::int,
      'instagram', COUNT(*) FILTER (WHERE c.platform = 'INSTAGRAM')::int,
      'facebook', COUNT(*) FILTER (WHERE c.platform = 'FACEBOOK')::int,
      'tiktok', COUNT(*) FILTER (WHERE c.platform = 'TIKTOK')::int
    ),
    jsonb_build_object(
      'activeCount', COUNT(*) FILTER (
        WHERE c.last_message_at >= (yesterday AT TIME ZONE tz)
          AND c.last_message_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
      )::int,
      'escalatedCount', COUNT(*) FILTER (
        WHERE c.escalated_at >= (yesterday AT TIME ZONE tz)
          AND c.escalated_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
      )::int
    ),
    CURRENT_TIMESTAMP
  FROM conversations c
  WHERE c.created_at >= (yesterday AT TIME ZONE tz)
    AND c.created_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
  ON CONFLICT (company_id, domain, granularity, bucket_start) DO UPDATE SET
    total_count = EXCLUDED.total_count,
    channel_breakdown = EXCLUDED.channel_breakdown,
    extra_metrics = EXCLUDED.extra_metrics,
    updated_at = CURRENT_TIMESTAMP;

  -- RIDERS domain: per-company rows
  INSERT INTO metrics (
    company_id, domain, granularity, bucket_start,
    total_count, delivered_count, unique_riders_active, extra_metrics, updated_at
  )
  SELECT
    r.company_id,
    'RIDERS'::"MetricDomain",
    'DAY'::"MetricGranularity",
    yesterday,
    COUNT(*)::int,
    COUNT(*) FILTER (
      WHERE EXISTS (
        SELECT 1 FROM deliveries dd
        WHERE dd.rider_id = r.id
          AND dd.status = 'DELIVERED'
          AND dd.delivered_at >= (yesterday AT TIME ZONE tz)
          AND dd.delivered_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
      )
    )::int,
    COUNT(*) FILTER (WHERE r.status = 'ONLINE' OR r.status = 'BUSY')::int,
    jsonb_build_object(
      'approvedCount', COUNT(*) FILTER (WHERE r.approval_status = 'APPROVED')::int,
      'pendingCount', COUNT(*) FILTER (WHERE r.approval_status = 'PENDING')::int,
      'suspendedCount', COUNT(*) FILTER (WHERE r.approval_status = 'SUSPENDED')::int
    ),
    CURRENT_TIMESTAMP
  FROM riders r
  WHERE r.company_id IS NOT NULL
    AND r.created_at >= (yesterday AT TIME ZONE tz)
    AND r.created_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
  GROUP BY r.company_id
  ON CONFLICT (company_id, domain, granularity, bucket_start) DO UPDATE SET
    total_count = EXCLUDED.total_count,
    delivered_count = EXCLUDED.delivered_count,
    unique_riders_active = EXCLUDED.unique_riders_active,
    extra_metrics = EXCLUDED.extra_metrics,
    updated_at = CURRENT_TIMESTAMP;

  -- RIDERS domain: system row
  INSERT INTO metrics (
    company_id, domain, granularity, bucket_start,
    total_count, delivered_count, unique_riders_active, extra_metrics, updated_at
  )
  SELECT
    NULL::text,
    'RIDERS'::"MetricDomain",
    'DAY'::"MetricGranularity",
    yesterday,
    COUNT(*)::int,
    COUNT(*) FILTER (
      WHERE EXISTS (
        SELECT 1 FROM deliveries dd
        WHERE dd.rider_id = r.id
          AND dd.status = 'DELIVERED'
          AND dd.delivered_at >= (yesterday AT TIME ZONE tz)
          AND dd.delivered_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
      )
    )::int,
    COUNT(*) FILTER (WHERE r.status = 'ONLINE' OR r.status = 'BUSY')::int,
    jsonb_build_object(
      'approvedCount', COUNT(*) FILTER (WHERE r.approval_status = 'APPROVED')::int,
      'pendingCount', COUNT(*) FILTER (WHERE r.approval_status = 'PENDING')::int,
      'suspendedCount', COUNT(*) FILTER (WHERE r.approval_status = 'SUSPENDED')::int
    ),
    CURRENT_TIMESTAMP
  FROM riders r
  WHERE r.created_at >= (yesterday AT TIME ZONE tz)
    AND r.created_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
  ON CONFLICT (company_id, domain, granularity, bucket_start) DO UPDATE SET
    total_count = EXCLUDED.total_count,
    delivered_count = EXCLUDED.delivered_count,
    unique_riders_active = EXCLUDED.unique_riders_active,
    extra_metrics = EXCLUDED.extra_metrics,
    updated_at = CURRENT_TIMESTAMP;

  -- REVENUE domain: per-company rows
  INSERT INTO metrics (
    company_id, domain, granularity, bucket_start,
    total_count, total_revenue_kobo, channel_breakdown, extra_metrics, updated_at
  )
  SELECT
    t.company_id,
    'REVENUE'::"MetricDomain",
    'DAY'::"MetricGranularity",
    yesterday,
    COUNT(*) FILTER (WHERE t.status = 'SUCCESS')::int,
    COALESCE(SUM(t.amount) FILTER (WHERE t.status = 'SUCCESS'), 0)::int,
    jsonb_build_object(
      'squad', COUNT(*) FILTER (WHERE t.provider = 'SQUAD')::int,
      'system', COUNT(*) FILTER (WHERE t.provider = 'SYSTEM')::int
    ),
    jsonb_build_object(
      'refundedKobo', COALESCE(-SUM(t.amount) FILTER (
        WHERE t.status = 'SUCCESS' AND t.type = 'REFUND'
      ), 0)::int,
      'avgTransactionValueKobo', AVG(t.amount) FILTER (WHERE t.status = 'SUCCESS')::int
    ),
    CURRENT_TIMESTAMP
  FROM payment_transactions t
  WHERE t.company_id IS NOT NULL
    AND t.created_at >= (yesterday AT TIME ZONE tz)
    AND t.created_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
  GROUP BY t.company_id
  ON CONFLICT (company_id, domain, granularity, bucket_start) DO UPDATE SET
    total_count = EXCLUDED.total_count,
    total_revenue_kobo = EXCLUDED.total_revenue_kobo,
    channel_breakdown = EXCLUDED.channel_breakdown,
    extra_metrics = EXCLUDED.extra_metrics,
    updated_at = CURRENT_TIMESTAMP;

  -- REVENUE domain: system row
  INSERT INTO metrics (
    company_id, domain, granularity, bucket_start,
    total_count, total_revenue_kobo, channel_breakdown, extra_metrics, updated_at
  )
  SELECT
    NULL::text,
    'REVENUE'::"MetricDomain",
    'DAY'::"MetricGranularity",
    yesterday,
    COUNT(*) FILTER (WHERE t.status = 'SUCCESS')::int,
    COALESCE(SUM(t.amount) FILTER (WHERE t.status = 'SUCCESS'), 0)::int,
    jsonb_build_object(
      'squad', COUNT(*) FILTER (WHERE t.provider = 'SQUAD')::int,
      'system', COUNT(*) FILTER (WHERE t.provider = 'SYSTEM')::int
    ),
    jsonb_build_object(
      'refundedKobo', COALESCE(-SUM(t.amount) FILTER (
        WHERE t.status = 'SUCCESS' AND t.type = 'REFUND'
      ), 0)::int,
      'avgTransactionValueKobo', AVG(t.amount) FILTER (WHERE t.status = 'SUCCESS')::int
    ),
    CURRENT_TIMESTAMP
  FROM payment_transactions t
  WHERE t.created_at >= (yesterday AT TIME ZONE tz)
    AND t.created_at < ((yesterday + INTERVAL '1 day') AT TIME ZONE tz)
  ON CONFLICT (company_id, domain, granularity, bucket_start) DO UPDATE SET
    total_count = EXCLUDED.total_count,
    total_revenue_kobo = EXCLUDED.total_revenue_kobo,
    channel_breakdown = EXCLUDED.channel_breakdown,
    extra_metrics = EXCLUDED.extra_metrics,
    updated_at = CURRENT_TIMESTAMP;

  RAISE NOTICE 'Daily metrics computed for %', yesterday;
END;
$$ LANGUAGE plpgsql;

-- Metrics compression: fold expired daily buckets into lifetime totals
CREATE OR REPLACE FUNCTION pg_cron_metrics_compression() RETURNS void AS $$
DECLARE
  folded_count integer;
  pruned_count integer;
  cutoff_date date := CURRENT_DATE - INTERVAL '12 months';
BEGIN
  -- Fold expired daily metrics into lifetime totals (per-company + system)
  INSERT INTO metrics (
    company_id, domain, granularity, bucket_start,
    total_count, delivered_count, cancelled_count, failed_count,
    total_revenue_kobo, channel_breakdown, extra_metrics,
    unique_riders_active, updated_at
  )
  SELECT
    company_id,
    domain,
    'LIFETIME'::"MetricGranularity",
    '2026-01-01'::date,
    SUM(total_count)::int,
    SUM(delivered_count)::int,
    SUM(cancelled_count)::int,
    SUM(failed_count)::int,
    SUM(total_revenue_kobo)::int,
    COALESCE(
      (SELECT jsonb_object_agg(key, value)
       FROM jsonb_each_text(
         COALESCE(
           (SELECT jsonb_agg(channel_breakdown) FROM unnest(ARRAY_AGG(channel_breakdown)) AS val),
           '{}'::jsonb
         )
       )
       WHERE key IS NOT NULL
      ),
      '{}'::jsonb
    ),
    COALESCE(
      (SELECT jsonb_object_agg(key, value)
       FROM jsonb_each_text(
         COALESCE(
           (SELECT jsonb_agg(extra_metrics) FROM unnest(ARRAY_AGG(extra_metrics)) AS val),
           '{}'::jsonb
         )
       )
       WHERE key IS NOT NULL
      ),
      '{}'::jsonb
    ),
    SUM(unique_riders_active)::int,
    CURRENT_TIMESTAMP
  FROM metrics
  WHERE granularity = 'DAY'::"MetricGranularity"
    AND bucket_start < cutoff_date
  GROUP BY company_id, domain
  ON CONFLICT (company_id, domain, granularity, bucket_start) DO UPDATE SET
    total_count = metrics.total_count + EXCLUDED.total_count,
    delivered_count = metrics.delivered_count + EXCLUDED.delivered_count,
    cancelled_count = metrics.cancelled_count + EXCLUDED.cancelled_count,
    failed_count = metrics.failed_count + EXCLUDED.failed_count,
    total_revenue_kobo = metrics.total_revenue_kobo + EXCLUDED.total_revenue_kobo,
    unique_riders_active = metrics.unique_riders_active + EXCLUDED.unique_riders_active,
    updated_at = CURRENT_TIMESTAMP;

  GET DIAGNOSTICS folded_count = ROW_COUNT;

  -- Prune folded daily metrics
  DELETE FROM metrics
  WHERE granularity = 'DAY'::"MetricGranularity"
    AND bucket_start < cutoff_date;
  GET DIAGNOSTICS pruned_count = ROW_COUNT;

  RAISE NOTICE 'Metrics compression: folded %, pruned %', folded_count, pruned_count;
END;
$$ LANGUAGE plpgsql;

-- Outbox prune: delete old event_outbox rows (replaces backend AsyncInterval)
CREATE OR REPLACE FUNCTION pg_cron_outbox_prune() RETURNS void AS $$
BEGIN
  DELETE FROM event_outbox WHERE created_at < NOW() - INTERVAL '30 minutes';
END;
$$ LANGUAGE plpgsql;

-- Typing marker sweep: delete stale typing markers (replaces backend AsyncInterval)
CREATE OR REPLACE FUNCTION pg_cron_typing_marker_sweep() RETURNS void AS $$
BEGIN
  DELETE FROM event_outbox
  WHERE channel LIKE 'typing:%'
    AND created_at < NOW() - INTERVAL '30 seconds';
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 4. Backend NOTIFY functions (pg_cron → TypeScript handlers)
-- ============================================================

CREATE OR REPLACE FUNCTION pg_cron_notify_daily_metrics() RETURNS void AS $$
BEGIN
  PERFORM pg_notify('pg_cron_sweeper', 'daily_metrics_rollup');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION pg_cron_notify_delivery_expiry() RETURNS void AS $$
BEGIN
  PERFORM pg_notify('pg_cron_sweeper', 'delivery_expiry_lifecycle');
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 5. pg_cron schedules
-- ============================================================

-- Worker DB-only tasks (pure SQL, no backend involvement)
SELECT cron.schedule('draft-expiration', '0 2 * * *', 'SELECT pg_cron_draft_expiration()');
SELECT cron.schedule('session-device-cleanup', '0 2 * * *', 'SELECT pg_cron_session_device_cleanup()');
SELECT cron.schedule('payment-timeout-cancellation', '*/5 * * * *', 'SELECT pg_cron_payment_timeout_cancellation()');
SELECT cron.schedule('daily-metrics-computation', '0 1 * * *', 'SELECT pg_cron_daily_metrics_computation()');
SELECT cron.schedule('metrics-compression', '0 1 * * *', 'SELECT pg_cron_metrics_compression()');

-- Backend sweepers (pure SQL, no backend involvement)
SELECT cron.schedule('outbox-prune', '*/5 * * * *', 'SELECT pg_cron_outbox_prune()');
SELECT cron.schedule('typing-marker-sweep', '* * * * *', 'SELECT pg_cron_typing_marker_sweep()');

-- Backend NOTIFY triggers (pg_cron fires → backend LISTENs → TypeScript handler)
SELECT cron.schedule('daily-metrics-rollup', '0 * * * *', 'SELECT pg_cron_notify_daily_metrics()');
SELECT cron.schedule('delivery-expiry-lifecycle', '*/15 * * * *', 'SELECT pg_cron_notify_delivery_expiry()');
