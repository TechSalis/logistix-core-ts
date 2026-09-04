-- =============================================================================
-- HAND-OWNED DATABASE APPENDIX (sql/appendix.sql)
-- =============================================================================
-- This file is the single source of truth for all hand-authored database content
-- that drizzle-kit cannot express. Applied AFTER drizzle/0000_initial.sql during
-- a recreate. Content is idempotent (CREATE OR REPLACE, IF NOT EXISTS, etc.).
--
-- reason strings enqueued by the billing functions MUST match
-- BILLING_NOTIFICATION_REASONS in src/shared/enums/enums.ts.
-- =============================================================================

-- =============================================================================
-- pg_cron + pgmq: PostgreSQL native scheduling & queue migration
-- =============================================================================

-- -------------------------------------------------------
-- 1. Extensions
-- -------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pgmq;

-- -------------------------------------------------------
-- 2. pgmq queues (one per job type)
-- -------------------------------------------------------
SELECT pgmq.create('delivery_notifications');
SELECT pgmq.create('ai_batch');
SELECT pgmq.create('squid_webhooks');
SELECT pgmq.create('exports');
SELECT pgmq.create('billing_notifications');

-- Note: CREATE EXTENSION pgmq (and pg_cron) run their install scripts inside the
-- migrated transaction, and pgmq's script leaves search_path clobbered to an empty
-- string for the remainder of that transaction. psql autocommits per statement and
-- is unaffected, but drizzle's migrator runs every chunk in ONE transaction, so any
-- unqualified CREATE after the extensions fails with 3F000 ("no schema has been
-- selected to create in"). Restore the documented default search_path here.
SET search_path = "$user", public, extensions;

-- -------------------------------------------------------
-- 3. PL/pgSQL functions for worker DB-only tasks
-- -------------------------------------------------------

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
  timeout_hours numeric := 1;
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

-- Billing: cancel PAST_DUE subscriptions whose 14-day grace window has elapsed
-- (PAST_DUE → CANCELLED). Mirrors the removed worker processPastDue: the state
-- transition, deactivation, DOWNGRADE audit event, and rider/dispatcher FCM
-- token collection are all DB-native (self-healing even if workers are down);
-- the only worker-side step is delivering the enqueued email/FCM notification.
-- Payment-received wedge + first-day past-due notice stamp are preserved 1:1.
CREATE OR REPLACE FUNCTION pg_cron_cancel_overdue_subscriptions() RETURNS void AS $$
DECLARE
  company RECORD;
  days_since_start numeric;
  payment_received boolean;
  already_notified boolean;
  rider_tokens text[];
  dispatcher_tokens text[];
  cancelled_count integer := 0;
  notified_count integer := 0;
BEGIN
  FOR company IN
    SELECT cs.company_id, cs.tier, cs.period_start, cs.period_end, cs.metadata,
           cp.name AS company_name, dp.email AS contact_email
    FROM company_settings cs
    JOIN companies cp ON cp.id = cs.company_id
    LEFT JOIN dispatchers dp
      ON dp.company_id = cs.company_id AND dp.role = 'OWNER'::"DispatcherRole"
    WHERE cs.subscription_status = 'PAST_DUE'::"SubscriptionStatus"
      AND (cs.metadata->>'lastPastDueNotifiedAt' IS NULL
           OR extract(epoch from (NOW() - COALESCE(cs.period_start, NOW()))) / 86400.0 >= 14)
    ORDER BY cs.period_end ASC NULLS LAST
    FOR UPDATE OF cs SKIP LOCKED
  LOOP
    IF company.period_end IS NULL THEN
      CONTINUE;
    END IF;

    -- Re-check under lock: only a row still PAST_DUE is processed.
    PERFORM 1 FROM company_settings
    WHERE company_id = company.company_id
      AND subscription_status = 'PAST_DUE'::"SubscriptionStatus";
    IF NOT FOUND THEN
      CONTINUE;
    END IF;

    days_since_start := floor(
      extract(epoch from (NOW() - COALESCE(company.period_start, NOW()))) / 86400.0
    );

    -- First-day past-due notice — stamped once per episode so re-runs can't resend.
    IF days_since_start < 1 AND company.contact_email IS NOT NULL THEN
      already_notified := company.metadata->>'lastPastDueNotifiedAt' IS NOT NULL;
      IF NOT already_notified THEN
        UPDATE company_settings
        SET metadata = jsonb_set(
          COALESCE(metadata, '{}'::jsonb),
          '{lastPastDueNotifiedAt}',
          to_jsonb(to_char(NOW(), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')::text)
        )
        WHERE company_id = company.company_id;

        -- First-day notice delivery deferred to the queue drain (email only).
        INSERT INTO pgmq.q_billing_notifications (message)
        VALUES (
          jsonb_build_object(
            '_meta', jsonb_build_object('enqueuedAt', now()),
            'reason', 'past_due_notify',
            'company', jsonb_build_object(
              'companyId', company.company_id,
              'companyName', company.company_name,
              'contactEmail', company.contact_email,
              'tier', company.tier::text
            )
          )
        );
        notified_count := notified_count + 1;
      END IF;
    END IF;

    IF days_since_start < 14 THEN
      CONTINUE;
    END IF;

    -- Payment-received wedge: a successful charge during the grace window reactivates.
    SELECT EXISTS (
      SELECT 1 FROM subscription_transactions st
      WHERE st.company_id = company.company_id
        AND st.status = 'SUCCESS'::"TransactionStatus"
        AND st.created_at >= COALESCE(company.period_start, NOW())
    ) INTO payment_received;

    IF payment_received THEN
      UPDATE company_settings
      SET subscription_status = 'ACTIVE'::"SubscriptionStatus"
      WHERE company_id = company.company_id;
      CONTINUE;
    END IF;

    -- No payment — cancel subscription (DB-only; network I/O deferred to the queue drain).
    UPDATE companies SET deactivated_at = NOW() WHERE id = company.company_id;

    UPDATE company_settings
    SET subscription_status = 'CANCELLED'::"SubscriptionStatus"
    WHERE company_id = company.company_id;

    UPDATE company_channels
    SET status = 'DEACTIVATED'::"CompanyChannelStatus",
        metadata = jsonb_set(
          COALESCE(metadata, '{}'::jsonb),
          '{deactivatedReason}',
          '"Subscription cancelled - payment overdue"'
        )
    WHERE company_id = company.company_id
      AND status = 'ACTIVE'::"CompanyChannelStatus";

    INSERT INTO event_logs (id, entity_type, entity_id, event_type, metadata, created_at)
    VALUES (
      gen_random_uuid()::text, 'COMPANY'::"EntityType", company.company_id,
      'DOWNGRADE'::"EventType",
      jsonb_build_object(
        'from_tier', company.tier::text,
        'to_tier', NULL,
        'reason', 'Subscription cancelled - payment overdue',
        'cancelled_at', to_char(NOW(), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
      ),
      NOW()
    );

    -- Collect FCM tokens inside the same txn (row is locked).
    SELECT COALESCE(array_agg(dt.fcm_token), ARRAY[]::text[])
    INTO rider_tokens
    FROM riders r
    JOIN device_tokens dt ON dt.user_id = r.user_id
    WHERE r.company_id = company.company_id
      AND r.approval_status = 'APPROVED'::"ApprovalStatus"
      AND dt.fcm_token IS NOT NULL;

    SELECT COALESCE(array_agg(dt.fcm_token), ARRAY[]::text[])
    INTO dispatcher_tokens
    FROM dispatchers d
    JOIN device_tokens dt ON dt.user_id = d.user_id
    WHERE d.company_id = company.company_id
      AND d.approval_status = 'APPROVED'::"ApprovalStatus"
      AND dt.fcm_token IS NOT NULL;

    -- Cancellation notice delivery deferred to the queue drain (email + FCM).
    INSERT INTO pgmq.q_billing_notifications (message)
    VALUES (
      jsonb_build_object(
        '_meta', jsonb_build_object('enqueuedAt', now()),
        'reason', 'past_due_cancelled',
        'company', jsonb_build_object(
          'companyId', company.company_id,
          'companyName', company.company_name,
          'contactEmail', company.contact_email,
          'tier', company.tier::text
        ),
        'riderTokens', rider_tokens,
        'dispatcherTokens', dispatcher_tokens
      )
    );

    cancelled_count := cancelled_count + 1;
    notified_count := notified_count + 1;
  END LOOP;

  RAISE NOTICE 'PastDue cancel: % cancelled, % notifications enqueued', cancelled_count, notified_count;
END;
$$ LANGUAGE plpgsql;

-- Billing: terminate CANCELLING subscriptions whose paid period has elapsed
-- (CANCELLING → CANCELLED). Mirrors the removed worker processCancellingExpiry.
-- Owner-initiated cancellation keeps the company active until periodEnd; once it
-- passes the subscription is terminated and the team notified. No payment wedge
-- (the owner chose to end the plan) and no first-day stamp (CANCELLING carries
-- no grace-window notice).
CREATE OR REPLACE FUNCTION pg_cron_cancel_expired_cancelling() RETURNS void AS $$
DECLARE
  company RECORD;
  rider_tokens text[];
  dispatcher_tokens text[];
  cancelled_count integer := 0;
  notified_count integer := 0;
BEGIN
  FOR company IN
    SELECT cs.company_id, cs.tier, cs.period_end,
           cp.name AS company_name, dp.email AS contact_email
    FROM company_settings cs
    JOIN companies cp ON cp.id = cs.company_id
    LEFT JOIN dispatchers dp
      ON dp.company_id = cs.company_id AND dp.role = 'OWNER'::"DispatcherRole"
    WHERE cs.subscription_status = 'CANCELLING'::"SubscriptionStatus"
      AND cs.period_end < NOW()
    ORDER BY cs.period_end ASC NULLS LAST
    FOR UPDATE OF cs SKIP LOCKED
  LOOP
    IF company.period_end IS NULL THEN
      CONTINUE;
    END IF;

    -- Re-check under lock: only a row still CANCELLING is processed.
    PERFORM 1 FROM company_settings
    WHERE company_id = company.company_id
      AND subscription_status = 'CANCELLING'::"SubscriptionStatus";
    IF NOT FOUND THEN
      CONTINUE;
    END IF;

    UPDATE companies SET deactivated_at = NOW() WHERE id = company.company_id;

    UPDATE company_settings
    SET subscription_status = 'CANCELLED'::"SubscriptionStatus"
    WHERE company_id = company.company_id;

    UPDATE company_channels
    SET status = 'DEACTIVATED'::"CompanyChannelStatus",
        metadata = jsonb_set(
          COALESCE(metadata, '{}'::jsonb),
          '{deactivatedReason}',
          '"Owner-requested cancellation completed"'
        )
    WHERE company_id = company.company_id
      AND status = 'ACTIVE'::"CompanyChannelStatus";

    INSERT INTO event_logs (id, entity_type, entity_id, event_type, metadata, created_at)
    VALUES (
      gen_random_uuid()::text, 'COMPANY'::"EntityType", company.company_id,
      'DOWNGRADE'::"EventType",
      jsonb_build_object(
        'from_tier', company.tier::text,
        'to_tier', NULL,
        'reason', 'Owner-requested cancellation completed',
        'cancelled_at', to_char(NOW(), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
      ),
      NOW()
    );

    SELECT COALESCE(array_agg(dt.fcm_token), ARRAY[]::text[])
    INTO rider_tokens
    FROM riders r
    JOIN device_tokens dt ON dt.user_id = r.user_id
    WHERE r.company_id = company.company_id
      AND r.approval_status = 'APPROVED'::"ApprovalStatus"
      AND dt.fcm_token IS NOT NULL;

    SELECT COALESCE(array_agg(dt.fcm_token), ARRAY[]::text[])
    INTO dispatcher_tokens
    FROM dispatchers d
    JOIN device_tokens dt ON dt.user_id = d.user_id
    WHERE d.company_id = company.company_id
      AND d.approval_status = 'APPROVED'::"ApprovalStatus"
      AND dt.fcm_token IS NOT NULL;

    INSERT INTO pgmq.q_billing_notifications (message)
    VALUES (
      jsonb_build_object(
        '_meta', jsonb_build_object('enqueuedAt', now()),
        'reason', 'cancelling_expired',
        'company', jsonb_build_object(
          'companyId', company.company_id,
          'companyName', company.company_name,
          'contactEmail', company.contact_email,
          'tier', company.tier::text
        ),
        'riderTokens', rider_tokens,
        'dispatcherTokens', dispatcher_tokens
      )
    );

    cancelled_count := cancelled_count + 1;
    notified_count := notified_count + 1;
  END LOOP;

  RAISE NOTICE 'CancellingExpiry: % cancelled, % notifications enqueued', cancelled_count, notified_count;
END;
$$ LANGUAGE plpgsql;

-- Daily metrics computation: compute DAY buckets for all 4 domains
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

-- Idempotency-key cleanup: delete expired keys (replaces the workers maintenance-queue
-- pruneExpiredIdempotencyKeys). Backend claimers no longer run a lazy full-table DELETE
-- on the write path; this scheduled prune owns that cleanup at a bounded (15-min) cadence.
-- Deletes only `expires_at < NOW()`, so a row reclaimed in-between is untouched.
CREATE OR REPLACE FUNCTION pg_cron_idempotency_cleanup() RETURNS void AS $$
DECLARE
  pruned_count integer;
BEGIN
  DELETE FROM idempotency_keys WHERE expires_at < NOW();
  GET DIAGNOSTICS pruned_count = ROW_COUNT;
  IF pruned_count > 0 THEN
    RAISE NOTICE 'Idempotency cleanup: pruned % expired key(s)', pruned_count;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------
-- 4. Backend NOTIFY functions (pg_cron → TypeScript handlers)
-- -------------------------------------------------------

CREATE OR REPLACE FUNCTION pg_cron_notify_delivery_expiry() RETURNS void AS $$
BEGIN
  PERFORM pg_notify('pg_cron_sweeper', 'delivery_expiry_lifecycle');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION pg_cron_notify_delivery_liveness() RETURNS void AS $$
BEGIN
  PERFORM pg_notify('pg_cron_sweeper', 'delivery_liveness');
END;
$$ LANGUAGE plpgsql;

-- Conversation ownership: release human-owned conversations inactive > 30 min
-- back to AI. The state UPDATE is fully DB-native (self-healing even if the
-- backend is down); the NOTIFY is ONLY a side-effect signal so a live backend
-- can invalidate L1 conversation caches and fan out the ownership change to
-- connected dispatchers (both are correctness necessities — see
-- @core/cache-invalidation; routing reads cached handled_by_type).
-- The 30-min threshold mirrors SCALING_CONFIG.jobs.pgCron.conversationOwnershipInactivityMs.
CREATE OR REPLACE FUNCTION pg_cron_release_inactive_conversations() RETURNS void AS $$
DECLARE
  released_ids text;
BEGIN
  WITH released AS (
    UPDATE conversations
    SET handled_by_type = 'AI', handled_by = NULL, handled_at = NULL
    WHERE handled_by_type <> 'AI'
      AND handled_at < NOW() - INTERVAL '30 minutes'
    RETURNING id
  )
  SELECT COALESCE(string_agg(id, ','), '') INTO released_ids FROM released;
  IF released_ids <> '' THEN
    PERFORM pg_notify('pg_cron_sweeper', 'conversation_ownership:' || released_ids);
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION pg_cron_notify_stale_assignment() RETURNS void AS $$
BEGIN
  PERFORM pg_notify('pg_cron_sweeper', 'stale_assignment');
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------
-- 5. pg_cron schedules
-- -------------------------------------------------------

-- Worker DB-only tasks (pure SQL, no backend involvement)
SELECT cron.schedule('draft-expiration', '0 2 * * *', 'SELECT pg_cron_draft_expiration()');
SELECT cron.schedule('session-device-cleanup', '0 2 * * *', 'SELECT pg_cron_session_device_cleanup()');
SELECT cron.schedule('past-due-cancel', '0 2 * * *', 'SELECT pg_cron_cancel_overdue_subscriptions()');
SELECT cron.schedule('cancelling-expiry', '0 2 * * *', 'SELECT pg_cron_cancel_expired_cancelling()');
SELECT cron.schedule('payment-timeout-cancellation', '*/5 * * * *', 'SELECT pg_cron_payment_timeout_cancellation()');
SELECT cron.schedule('metrics-compression', '0 1 * * *', 'SELECT pg_cron_metrics_compression()');

-- Backend sweepers (pure SQL, no backend involvement)
SELECT cron.schedule('outbox-prune', '*/5 * * * *', 'SELECT pg_cron_outbox_prune()');
SELECT cron.schedule('typing-marker-sweep', '* * * * *', 'SELECT pg_cron_typing_marker_sweep()');
SELECT cron.schedule('idempotency-cleanup', '*/15 * * * *', 'SELECT pg_cron_idempotency_cleanup()');

-- Backend NOTIFY triggers (pg_cron fires → backend LISTENs → TypeScript handler)
SELECT cron.schedule('delivery-expiry-lifecycle', '*/15 * * * *', 'SELECT pg_cron_notify_delivery_expiry()');
SELECT cron.schedule('delivery-liveness', '*/15 * * * *', 'SELECT pg_cron_notify_delivery_liveness()');
SELECT cron.schedule('conversation-ownership', '*/15 * * * *', 'SELECT pg_cron_release_inactive_conversations()');
SELECT cron.schedule('stale-assignment', '*/15 * * * *', 'SELECT pg_cron_notify_stale_assignment()');
