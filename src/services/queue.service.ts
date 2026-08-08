import { and, eq, sql, lt, inArray, count, gte } from 'drizzle-orm';
import type { PgDatabase } from 'drizzle-orm/pg-core';
import { jobQueue } from '../drizzle/schema.js';
import { JobStatus } from '../enums/enums.js';
import { extractErrorMessage } from '../utils/error-utils.js';
import { QUEUE_SERVICE_CONFIG } from '../config/service.config.js';

// Accepts both NodePgDatabase (workers) and PgDatabase<postgres-js> (backend).
// The three `any` params are for TQueryResult, TFullSchema, and TSchema generics —
// each project uses a different concrete PgQueryResultHKT and schema shape,
// and drizzle-orm does not export a unifying base type for PgDatabase.
// PgDatabase type params are unused; kept as any for compatibility with drizzle-orm v0.45.
type DrizzleDB = PgDatabase<any, any, any>;

type JobRow = typeof jobQueue.$inferSelect;

export interface EnqueueOptions {
  priority?: number;
  maxRetries?: number;
  scheduledAt?: Date;
}

export interface EnqueueWithDedupeOptions extends EnqueueOptions {
  companyId?: string | null;
  dedupeKey?: string | null;
}

// Thrown by a QueueHandler when a job can never succeed and must fail
// immediately without backoff retries (e.g. export jobs with no data).
export class PermanentJobError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PermanentJobError';
  }
}

export interface DrainOptions {
  /** Hard cap on jobs processed in one pass. REQUIRED — the primary bound for
   * backend poll loops, which may omit timeBudgetMs. */
  maxJobs: number;
  /** Wall-clock budget for one pass. Workers (Cloudflare cron) MUST pass this
   * so the invocation returns inside the cron window. Backend poll loops may
   * omit it — the pass is bounded by maxJobs + the poll tick. */
  timeBudgetMs?: number;
  /** Dequeue claim batch size. Default QUEUE_SERVICE_CONFIG.batchSize (5). */
  batchSize?: number;
}

export interface DrainResult {
  processed: number;
  succeeded: number;
  failed: number;
}

export type QueueHandler = (job: JobRow) => Promise<void>;

function retryBackoffMs(retryCount: number): number {
  return Math.min(
    QUEUE_SERVICE_CONFIG.retryBackoffMaxMs,
    QUEUE_SERVICE_CONFIG.retryBackoffBaseMs * 2 ** (retryCount - 1),
  );
}

class QueueService {
  private lastPruneAtMs = 0;

  async enqueue(
    db: DrizzleDB,
    type: string,
    payload?: Record<string, unknown>,
    options?: EnqueueOptions,
  ): Promise<JobRow> {
    const [job] = await db
      .insert(jobQueue)
      .values({
        type,
        payload: payload ?? {},
        priority: options?.priority ?? 0,
        maxRetries: options?.maxRetries ?? QUEUE_SERVICE_CONFIG.defaultMaxRetries,
        scheduledAt: options?.scheduledAt ?? null,
      })
      .returning();
    return job;
  }

  /**
   * Insert a job, deduped by (dedupeKey, PENDING/PROCESSING) via the partial
   * unique index job_queue_dedupe_key_unique. Returns the inserted row, or
   * null when an identical job is already pending or processing.
   */
  async enqueueWithDedupe(
    db: DrizzleDB,
    type: string,
    payload?: Record<string, unknown>,
    options?: EnqueueWithDedupeOptions,
  ): Promise<JobRow | null> {
    const [job] = await db
      .insert(jobQueue)
      .values({
        type,
        payload: payload ?? {},
        priority: options?.priority ?? 0,
        maxRetries: options?.maxRetries ?? QUEUE_SERVICE_CONFIG.defaultMaxRetries,
        scheduledAt: options?.scheduledAt ?? null,
        companyId: options?.companyId ?? null,
        dedupeKey: options?.dedupeKey ?? null,
      })
      .onConflictDoNothing({
        target: jobQueue.dedupeKey,
        where: sql`${jobQueue.dedupeKey} IS NOT NULL AND ${jobQueue.status} IN (${sql.raw(`'${JobStatus.PENDING}', '${JobStatus.PROCESSING}'`)})`,
      })
      .returning();
    return job ?? null;
  }

  /** COUNT of jobs of `type` for `companyId` created at/after `since` (quota check). */
  async countRecent(db: DrizzleDB, type: string, companyId: string, since: Date): Promise<number> {
    const [row] = await db
      .select({ count: count() })
      .from(jobQueue)
      .where(
        and(
          eq(jobQueue.type, type),
          eq(jobQueue.companyId, companyId),
          gte(jobQueue.createdAt, since),
        ),
      );
    return Number(row?.count ?? 0);
  }

  private async dequeue(db: DrizzleDB, type: string, batchSize: number): Promise<JobRow[]> {
    const now = new Date();
    const result = await db.execute(
      sql`
        UPDATE ${jobQueue}
        SET
          status = ${JobStatus.PROCESSING}::"JobStatus",
          started_at = ${now.toISOString()},
          retry_count = ${jobQueue.retryCount} + 1
        WHERE id IN (
          SELECT id FROM ${jobQueue}
          WHERE
            type = ${type}
            AND status = ${JobStatus.PENDING}::"JobStatus"
            AND (scheduled_at IS NULL OR scheduled_at <= ${now.toISOString()})
          ORDER BY priority DESC, created_at ASC
          LIMIT ${batchSize}
          FOR UPDATE SKIP LOCKED
        )
        RETURNING *
      `,
    );
    // drizzle-orm returns different shapes per driver: postgres-js resolves raw
    // `db.execute` to the rows array, node-postgres wraps it as `{ rows }`.
    // Raw SQL `RETURNING *` yields snake_case keys, but JobRow (and every queue
    // handler) expects camelCase — map the columns before handing rows over.
    const rawRows: Array<Record<string, unknown>> = Array.isArray(result)
      ? (result as Array<Record<string, unknown>>)
      : result.rows;
    return rawRows.map((row) => ({
      id: row.id,
      type: row.type,
      payload: row.payload,
      status: row.status,
      priority: row.priority,
      maxRetries: row.max_retries,
      retryCount: row.retry_count,
      lastError: row.last_error,
      scheduledAt: row.scheduled_at,
      startedAt: row.started_at,
      completedAt: row.completed_at,
      createdAt: row.created_at,
      companyId: row.company_id,
      dedupeKey: row.dedupe_key,
    })) as unknown as JobRow[];
  }

  private async retryStalled(db: DrizzleDB, type: string): Promise<number> {
    const cutoff = new Date(Date.now() - QUEUE_SERVICE_CONFIG.retryStalledAfterMs);
    const result = await db
      .update(jobQueue)
      .set({ status: JobStatus.PENDING, startedAt: null })
      .where(
        and(
          eq(jobQueue.type, type),
          eq(jobQueue.status, JobStatus.PROCESSING),
          lt(jobQueue.startedAt, cutoff),
        ),
      )
      .returning({ id: jobQueue.id });
    return result.length;
  }

  async complete(db: DrizzleDB, jobId: string): Promise<void> {
    await db
      .update(jobQueue)
      .set({
        status: JobStatus.COMPLETED,
        completedAt: new Date(),
      })
      .where(eq(jobQueue.id, jobId));
  }

  async fail(db: DrizzleDB, jobId: string, error: string): Promise<void> {
    const [job] = await db
      .select({ id: jobQueue.id, retryCount: jobQueue.retryCount, maxRetries: jobQueue.maxRetries })
      .from(jobQueue)
      .where(eq(jobQueue.id, jobId))
      .limit(1);

    if (!job) return;

    if (job.retryCount >= job.maxRetries) {
      await db
        .update(jobQueue)
        .set({
          status: JobStatus.FAILED,
          lastError: error,
          completedAt: new Date(),
        })
        .where(eq(jobQueue.id, jobId));
    } else {
      await db
        .update(jobQueue)
        .set({
          status: JobStatus.PENDING,
          lastError: error,
          startedAt: null,
          completedAt: null,
          // Backoff: don't re-dequeue the job instantly. `dequeue` only picks
          // up PENDING jobs whose scheduled_at is null or in the past, so this
          // spaces out retries and prevents a poisoned job from monopolizing a
          // single drain call by re-failing back-to-back.
          scheduledAt: new Date(Date.now() + retryBackoffMs(job.retryCount)),
        })
        .where(eq(jobQueue.id, jobId));
    }
  }

  /**
   * Fail a job immediately, ignoring maxRetries/backoff (used for PermanentJobError).
   */
  async failPermanent(db: DrizzleDB, jobId: string, error: string): Promise<void> {
    await db
      .update(jobQueue)
      .set({
        status: JobStatus.FAILED,
        lastError: error,
        completedAt: new Date(),
      })
      .where(eq(jobQueue.id, jobId));
  }

  /**
   * Delete terminal jobs (COMPLETED / FAILED / CANCELLED) older than `olderThanMs`.
   * Without this the job_queue table grows forever — completed/failed/cancelled
   * rows are never re-processed. Called from drain() on a time-gated schedule.
   */
  async pruneTerminal(db: DrizzleDB, type: string): Promise<number> {
    const cutoff = new Date(Date.now() - QUEUE_SERVICE_CONFIG.pruneTerminalAfterMs);
    const result = await db
      .delete(jobQueue)
      .where(
        and(
          eq(jobQueue.type, type),
          inArray(jobQueue.status, [JobStatus.COMPLETED, JobStatus.FAILED, JobStatus.CANCELLED]),
          lt(jobQueue.completedAt, cutoff),
        ),
      )
      .returning({ id: jobQueue.id });
    return result.length;
  }

  /**
   * Drain loop: dequeue jobs → handler → complete/fail.
   * Bounded by the REQUIRED maxJobs and, when provided, timeBudgetMs.
   * Handles stalled jobs (PROCESSING but startedAt is stale) by retrying them.
   *
   * maxRetries semantics: total attempts, the first attempt counts. dequeue
   * increments retry_count at claim time and fail() marks FAILED once
   * retryCount >= maxRetries, so a job with maxRetries=3 runs at most 3 times.
   */
  async drain(
    db: DrizzleDB,
    type: string,
    handler: QueueHandler,
    options: DrainOptions,
  ): Promise<DrainResult> {
    const { maxJobs, timeBudgetMs, batchSize = QUEUE_SERVICE_CONFIG.batchSize } = options;
    const startTime = Date.now();
    const stats: DrainResult = { processed: 0, succeeded: 0, failed: 0 };

    // Prune terminal (COMPLETED/FAILED/CANCELLED) rows on a time gate so the
    // table never grows unbounded without paying for a DELETE on every poll.
    if (Date.now() - this.lastPruneAtMs >= QUEUE_SERVICE_CONFIG.pruneIntervalMs) {
      this.lastPruneAtMs = Date.now();
      try {
        await this.pruneTerminal(db, type);
      } catch (e) {
        console.error('[Queue] Failed to prune terminal jobs', e);
      }
    }

    // Retry stalled jobs before processing new ones
    try {
      await this.retryStalled(db, type);
    } catch (e) {
      console.error('[Queue] Failed to retry stalled jobs', e);
    }

    for (;;) {
      if (timeBudgetMs !== undefined && Date.now() - startTime >= timeBudgetMs) break;
      if (stats.processed >= maxJobs) break;

      let jobs: JobRow[];
      try {
        jobs = await this.dequeue(db, type, batchSize);
      } catch (e) {
        console.error('[Queue] Dequeue failed', e);
        break;
      }

      if (jobs.length === 0) break;

      for (const job of jobs) {
        if (timeBudgetMs !== undefined && Date.now() - startTime >= timeBudgetMs) break;

        stats.processed++;

        try {
          await handler(job);
          // Handler completed without throwing — mark as COMPLETED
          try {
            await this.complete(db, job.id);
          } catch {
            console.error('[Queue] Failed to mark job as completed');
          }
          stats.succeeded++;
        } catch (error) {
          stats.failed++;
          try {
            if (error instanceof PermanentJobError) {
              await this.failPermanent(db, job.id, extractErrorMessage(error));
            } else {
              await this.fail(db, job.id, extractErrorMessage(error));
            }
          } catch {
            console.error('[Queue] Failed to mark job as failed');
          }
        }
      }
    }

    return stats;
  }
}

export const queueService = new QueueService();
