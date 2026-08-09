/**
 * Backfill the unified `metrics` table from the legacy metrics tables
 * (company_daily_metrics, company_lifetime_metrics) for the DELIVERIES domain.
 *
 * Company rows map 1:1. The unified system row (company_id NULL) is the
 * whole-platform aggregation for admin analytics, so it is recomputed here as
 * the SUM over ALL legacy rows (company-owned + system-owned) — the legacy
 * "company_id NULL = system-owned pool" scope is intentionally NOT carried over.
 *
 * Run AFTER migration 0002 (which creates `metrics`) and BEFORE migration 0003
 * (which drops the legacy tables). Idempotent: uses ON CONFLICT DO NOTHING on
 * the (company_id, domain, granularity, bucket_start) unique constraint, so it
 * can be re-run safely after a partial/interrupted backfill.
 *
 *   npm run db:backfill-metrics
 */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import { metrics, companyDailyMetrics, companyLifetimeMetrics } from '../src/drizzle/schema.js';
import { MetricDomain, MetricGranularity } from '../src/enums/enums.js';
import { LIFETIME_BUCKET_START } from '../src/config/metrics.config.js';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('[backfill-metrics] FATAL: DATABASE_URL environment variable is required');
  process.exit(1);
}

async function run() {
  const url = new URL(DATABASE_URL);
  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  const connection = postgres(DATABASE_URL, {
    max: 1,
    connect_timeout: 30,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });
  const db = drizzle(connection);

  const conflictTarget = [
    metrics.companyId,
    metrics.domain,
    metrics.granularity,
    metrics.bucketStart,
  ] as const;

  // 1a) Legacy company daily bars -> DELIVERIES / DAY (1:1, company rows).
  const dailyRows = await db
    .select({
      companyId: companyDailyMetrics.companyId,
      bucketStart: companyDailyMetrics.date,
      totalDeliveries: companyDailyMetrics.totalDeliveries,
      deliveredCount: companyDailyMetrics.deliveredCount,
      cancelledCount: companyDailyMetrics.cancelledCount,
      failedCount: companyDailyMetrics.failedCount,
      totalRevenueKobo: companyDailyMetrics.totalRevenueKobo,
      avgDeliveryTimeMinutes: companyDailyMetrics.avgDeliveryTimeMinutes,
      channelBreakdown: companyDailyMetrics.channelBreakdown,
      extraMetrics: companyDailyMetrics.extraMetrics,
      peakHour: companyDailyMetrics.peakHour,
      uniqueRidersActive: companyDailyMetrics.uniqueRidersActive,
    })
    .from(companyDailyMetrics)
    .where(sql`${companyDailyMetrics.companyId} IS NOT NULL`);

  for (let i = 0; i < dailyRows.length; i += 1000) {
    const batch = dailyRows.slice(i, i + 1000);
    await db
      .insert(metrics)
      .values(
        batch.map((row) => ({
          companyId: row.companyId,
          domain: MetricDomain.DELIVERIES,
          granularity: MetricGranularity.DAY,
          bucketStart: row.bucketStart,
          totalCount: row.totalDeliveries,
          deliveredCount: row.deliveredCount,
          cancelledCount: row.cancelledCount,
          failedCount: row.failedCount,
          totalRevenueKobo: row.totalRevenueKobo,
          avgDeliveryTimeMinutes: row.avgDeliveryTimeMinutes,
          channelBreakdown: row.channelBreakdown,
          extraMetrics: row.extraMetrics,
          peakHour: row.peakHour,
          uniqueRidersActive: row.uniqueRidersActive,
        })),
      )
      .onConflictDoNothing({ target: conflictTarget });
  }
  console.log(`[backfill-metrics] Backfilled ${dailyRows.length} DELIVERIES/DAY company rows`);

  // 1b) Legacy daily bars -> whole-platform DELIVERIES / DAY system rows
  // (company_id NULL). These aggregate ALL legacy daily rows (company-owned +
  // system-owned) per date, because the metrics system row is the whole-platform
  // aggregation for admin analytics — NOT the legacy "system-owned pool" scope.
  const systemDailyRows = await db
    .select({
      bucketStart: companyDailyMetrics.date,
      totalDeliveries: sql<number>`COALESCE(SUM(${companyDailyMetrics.totalDeliveries}), 0)`,
      deliveredCount: sql<number>`COALESCE(SUM(${companyDailyMetrics.deliveredCount}), 0)`,
      cancelledCount: sql<number>`COALESCE(SUM(${companyDailyMetrics.cancelledCount}), 0)`,
      failedCount: sql<number>`COALESCE(SUM(${companyDailyMetrics.failedCount}), 0)`,
      totalRevenueKobo: sql<number>`COALESCE(SUM(${companyDailyMetrics.totalRevenueKobo}), 0)`,
      uniqueRidersActive: sql<number>`COALESCE(SUM(${companyDailyMetrics.uniqueRidersActive}), 0)`,
    })
    .from(companyDailyMetrics)
    .groupBy(companyDailyMetrics.date);

  for (let i = 0; i < systemDailyRows.length; i += 1000) {
    const batch = systemDailyRows.slice(i, i + 1000);
    await db
      .insert(metrics)
      .values(
        batch.map((row) => ({
          companyId: null,
          domain: MetricDomain.DELIVERIES,
          granularity: MetricGranularity.DAY,
          bucketStart: row.bucketStart,
          totalCount: row.totalDeliveries,
          deliveredCount: row.deliveredCount,
          cancelledCount: row.cancelledCount,
          failedCount: row.failedCount,
          totalRevenueKobo: row.totalRevenueKobo,
          uniqueRidersActive: row.uniqueRidersActive,
        })),
      )
      .onConflictDoNothing({ target: conflictTarget });
  }
  console.log(`[backfill-metrics] Backfilled ${systemDailyRows.length} DELIVERIES/DAY system rows`);

  // 2a) Legacy company lifetime rows -> DELIVERIES / LIFETIME (sentinel bucket).
  const lifetimeRows = await db
    .select({
      companyId: companyLifetimeMetrics.companyId,
      totalDeliveries: companyLifetimeMetrics.totalDeliveries,
      deliveredCount: companyLifetimeMetrics.deliveredCount,
      totalRevenueKobo: companyLifetimeMetrics.totalRevenueKobo,
      channelBreakdown: companyLifetimeMetrics.channelBreakdown,
      extraMetrics: companyLifetimeMetrics.extraMetrics,
    })
    .from(companyLifetimeMetrics)
    .where(sql`${companyLifetimeMetrics.companyId} IS NOT NULL`);

  for (let i = 0; i < lifetimeRows.length; i += 1000) {
    const batch = lifetimeRows.slice(i, i + 1000);
    await db
      .insert(metrics)
      .values(
        batch.map((row) => ({
          companyId: row.companyId,
          domain: MetricDomain.DELIVERIES,
          granularity: MetricGranularity.LIFETIME,
          bucketStart: LIFETIME_BUCKET_START,
          totalCount: row.totalDeliveries,
          deliveredCount: row.deliveredCount,
          cancelledCount: 0,
          failedCount: 0,
          totalRevenueKobo: row.totalRevenueKobo,
          channelBreakdown: row.channelBreakdown,
          extraMetrics: row.extraMetrics,
        })),
      )
      .onConflictDoNothing({ target: conflictTarget });
  }
  console.log(
    `[backfill-metrics] Backfilled ${lifetimeRows.length} DELIVERIES/LIFETIME company rows`,
  );

  // 2b) Legacy lifetime rows -> whole-platform DELIVERIES / LIFETIME system row.
  const [systemLifetime] = await db
    .select({
      totalDeliveries: sql<number>`COALESCE(SUM(${companyLifetimeMetrics.totalDeliveries}), 0)`,
      deliveredCount: sql<number>`COALESCE(SUM(${companyLifetimeMetrics.deliveredCount}), 0)`,
      totalRevenueKobo: sql<number>`COALESCE(SUM(${companyLifetimeMetrics.totalRevenueKobo}), 0)`,
    })
    .from(companyLifetimeMetrics);

  await db
    .insert(metrics)
    .values([
      {
        companyId: null,
        domain: MetricDomain.DELIVERIES,
        granularity: MetricGranularity.LIFETIME,
        bucketStart: LIFETIME_BUCKET_START,
        totalCount: systemLifetime.totalDeliveries,
        deliveredCount: systemLifetime.deliveredCount,
        cancelledCount: 0,
        failedCount: 0,
        totalRevenueKobo: systemLifetime.totalRevenueKobo,
      },
    ])
    .onConflictDoNothing({ target: conflictTarget });
  console.log('[backfill-metrics] Backfilled DELIVERIES/LIFETIME system row');

  // 3) Verify:
  //    - legacy company rows are preserved 1:1 in unified company rows;
  //    - the whole-platform system rows equal the entire legacy total
  //      (company + system-owned), proving nothing was lost or duplicated.
  const [legacy] = await db.execute<{
    companyDaily: number;
    companyLifetime: number;
    systemDaily: number;
    systemLifetime: number;
  }>(sql`
    SELECT
      COALESCE(SUM((SELECT SUM(total_deliveries) FROM company_daily_metrics
                    WHERE company_id IS NOT NULL)), 0) AS "companyDaily",
      COALESCE(SUM((SELECT SUM(total_deliveries) FROM company_lifetime_metrics
                    WHERE company_id IS NOT NULL)), 0) AS "companyLifetime",
      COALESCE(SUM((SELECT SUM(total_deliveries) FROM company_daily_metrics
                    WHERE company_id IS NULL)), 0) AS "systemDaily",
      COALESCE(SUM((SELECT SUM(total_deliveries) FROM company_lifetime_metrics
                    WHERE company_id IS NULL)), 0) AS "systemLifetime"
  `);
  const [{ unifiedCompany }] = await db.execute<{ unifiedCompany: number }>(sql`
    SELECT COALESCE(SUM(total_count), 0) AS "unifiedCompany"
    FROM metrics
    WHERE domain = 'DELIVERIES' AND company_id IS NOT NULL
  `);
  const [{ unifiedSystem }] = await db.execute<{ unifiedSystem: number }>(sql`
    SELECT COALESCE(SUM(total_count), 0) AS "unifiedSystem"
    FROM metrics
    WHERE domain = 'DELIVERIES' AND company_id IS NULL
  `);

  const legacyCompanyTotal = legacy.companyDaily + legacy.companyLifetime;
  const legacySystemTotal = legacy.systemDaily + legacy.systemLifetime;
  const legacyTotal = legacyCompanyTotal + legacySystemTotal;
  let ok = true;
  if (unifiedCompany !== legacyCompanyTotal) {
    console.error(
      `[backfill-metrics] MISMATCH company rows: legacy=${legacyCompanyTotal} unified=${unifiedCompany}`,
    );
    ok = false;
  }
  if (unifiedSystem !== legacyTotal) {
    console.error(
      `[backfill-metrics] MISMATCH system rows: expected legacy total ${legacyTotal} (company+system) unified=${unifiedSystem}`,
    );
    ok = false;
  }
  if (ok) {
    console.log(
      `[backfill-metrics] Verified: company rows ${legacyCompanyTotal} == ${unifiedCompany}; ` +
        `system rows ${legacyTotal} == ${unifiedSystem}`,
    );
  } else {
    process.exitCode = 1;
  }

  await connection.end();
}

run().catch((err) => {
  console.error('[backfill-metrics] Failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
