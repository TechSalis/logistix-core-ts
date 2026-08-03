import { and, eq, sql, lt, inArray } from 'drizzle-orm';
import type { PgDatabase } from 'drizzle-orm/pg-core';
import { jobQueue } from '../drizzle/schema.js';
import { JobStatus } from '../enums.js';
import { extractErrorMessage } from '../error-utils.js';

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

export interface DrainOptions {
  timeBudgetMs?: number;
  maxJobs?: number;
  batchSize?: number;
}

export interface DrainResult {
  processed: number;
  succeeded: number;
  failed: number;
}

export type QueueHandler = (job: JobRow) => Promise<void>;

const DEFAULT_OPTIONS: DrainOptions = {
  timeBudgetMs: 12 * 60 * 1000,
  maxJobs: 200,
  batchSize: 5,
};

const PRUNE_INTERVAL_MS = 60 * 60 * 1000;

// Exponential retry backoff: a failing job is scheduled for retry instead of
// being re-dequeued instantly, so one poisoned job can't burn its entire
// retry budget (and starve the drain loop) within a single call.
const RETRY_BACKOFF_BASE_MS = 1_000;
const RETRY_BACKOFF_MAX_MS = 60_000;

function retryBackoffMs(retryCount: number): number {
  return Math.min(RETRY_BACKOFF_MAX_MS, RETRY_BACKOFF_BASE_MS * 2 ** (retryCount - 1));
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
        maxRetries: options?.maxRetries ?? 3,
        scheduledAt: options?.scheduledAt ?? null,
      })
      .returning();
    return job;
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
    const rows = Array.isArray(result) ? result : result.rows;
    return rows as unknown as JobRow[]; // Safe: Raw SQL result rows match JobRow shape.
  }

  private async retryStalled(db: DrizzleDB, type: string, stalenessMs: number): Promise<number> {
    const cutoff = new Date(Date.now() - stalenessMs);
    const [result] = await db
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
    return result ? 1 : 0;
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

  async cancel(db: DrizzleDB, jobId: string): Promise<void> {
    await db
      .update(jobQueue)
      .set({ status: JobStatus.CANCELLED, completedAt: new Date() })
      .where(eq(jobQueue.id, jobId));
  }

  /**
   * Delete terminal jobs (COMPLETED / FAILED / CANCELLED) older than `olderThanMs`.
   * Without this the job_queue table grows forever — completed/failed/cancelled
   * rows are never re-processed. Called from drain() on a time-gated schedule.
   */
  async pruneTerminal(
    db: DrizzleDB,
    type: string,
    olderThanMs: number = 24 * 60 * 60 * 1000,
  ): Promise<number> {
    const cutoff = new Date(Date.now() - olderThanMs);
    const [result] = await db
      .delete(jobQueue)
      .where(
        and(
          eq(jobQueue.type, type),
          inArray(jobQueue.status, [JobStatus.COMPLETED, JobStatus.FAILED, JobStatus.CANCELLED]),
          lt(jobQueue.completedAt, cutoff),
        ),
      )
      .returning({ id: jobQueue.id });
    return result ? 1 : 0;
  }

  /**
   * Drain loop: dequeue jobs → handler → complete/fail.
   * Respects time budget, max jobs per run, and batch size.
   * Handles stalled jobs (PROCESSING but startedAt is stale) by retrying them.
   */
  async drain(
    db: DrizzleDB,
    type: string,
    handler: QueueHandler,
    options?: DrainOptions,
  ): Promise<DrainResult> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const startTime = Date.now();
    const stats: DrainResult = { processed: 0, succeeded: 0, failed: 0 };

    // Prune terminal (COMPLETED/FAILED/CANCELLED) rows on a time gate so the
    // table never grows unbounded without paying for a DELETE on every poll.
    if (Date.now() - this.lastPruneAtMs >= PRUNE_INTERVAL_MS) {
      this.lastPruneAtMs = Date.now();
      try {
        await this.pruneTerminal(db, type);
      } catch (e) {
        console.error('[Queue] Failed to prune terminal jobs', e);
      }
    }

    // Retry stalled jobs before processing new ones
    try {
      await this.retryStalled(db, type, 30_000);
    } catch (e) {
      console.error('[Queue] Failed to retry stalled jobs', e);
    }

    for (;;) {
      if (Date.now() - startTime >= (opts.timeBudgetMs ?? DEFAULT_OPTIONS.timeBudgetMs!)) break;
      if (stats.processed >= (opts.maxJobs ?? DEFAULT_OPTIONS.maxJobs!)) break;

      let jobs: JobRow[];
      try {
        jobs = await this.dequeue(db, type, opts.batchSize ?? DEFAULT_OPTIONS.batchSize!);
      } catch (e) {
        console.error('[Queue] Dequeue failed', e);
        break;
      }

      if (jobs.length === 0) break;

      for (const job of jobs) {
        if (Date.now() - startTime >= (opts.timeBudgetMs ?? DEFAULT_OPTIONS.timeBudgetMs!)) break;

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
            await this.fail(db, job.id, extractErrorMessage(error));
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
