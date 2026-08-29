import { sql } from 'drizzle-orm';
import type { PgDatabase } from 'drizzle-orm/pg-core';
import { QUEUE_SERVICE_CONFIG } from '../shared/config/service.config.js';
import { JobType } from '../shared/enums/enums.js';

// Accepts both NodePgDatabase (workers) and PgDatabase<postgres-js> (backend).
// The three `any` params are for TQueryResult, TFullSchema, and TSchema generics —
// each project uses a different concrete PgQueryResultHKT and schema shape,
// and drizzle-orm does not export a unifying base type for PgDatabase.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required: unified PgDatabase type for both dialects.
export type DrizzleDB = PgDatabase<any, any, any>;

export interface JobRow {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  status: string;
  priority: number;
  maxRetries: number;
  retryCount: number;
  lastError: string | null;
  scheduledAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  companyId: string | null;
  dedupeKey: string | null;
}

export interface EnqueueOptions {
  priority?: number;
  maxRetries?: number;
  scheduledAt?: Date;
}

export interface EnqueueWithDedupeOptions extends EnqueueOptions {
  companyId?: string | null;
  dedupeKey?: string | null;
}

export class PermanentJobError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PermanentJobError';
  }
}

export interface DrainOptions {
  maxJobs: number;
  timeBudgetMs?: number;
  batchSize?: number;
  onError?: (message: string, error?: unknown) => void;
}

export interface DrainResult {
  processed: number;
  succeeded: number;
  failed: number;
}

export type QueueHandler = (job: JobRow) => Promise<void>;

const JOB_TYPE_TO_QUEUE: Record<JobType, string> = {
  [JobType.DELIVERY_NOTIFICATION]: 'delivery_notifications',
  [JobType.AI_BATCH]: 'ai_batch',
  [JobType.SQUAD_WEBHOOK]: 'squid_webhooks',
  [JobType.EXPORT]: 'exports',
};

function toQueueName(type: JobType): string {
  return JOB_TYPE_TO_QUEUE[type];
}

function retryBackoffSeconds(retryCount: number): number {
  const ms = Math.min(
    QUEUE_SERVICE_CONFIG.retryBackoffMaxMs,
    QUEUE_SERVICE_CONFIG.retryBackoffBaseMs * 2 ** (retryCount - 1),
  );
  return Math.max(1, Math.ceil(ms / 1000));
}

/** Normalize pgmq result to a rows array, handling both postgres-js and node-postgres. */
function toRows(result: unknown): Record<string, unknown>[] {
  if (Array.isArray(result)) return result as Record<string, unknown>[];
  const r = result as { rows?: Record<string, unknown>[] };
  return r.rows ?? [];
}

/**
 * Build a JobRow from a pgmq message_record row.
 * pgmq returns: { msg_id, read_ct, enqueued_at, vt, message, headers }
 * The message JSON contains the original payload + _meta with companyId/dedupeKey.
 */
function pgmqRowToJobRow(row: Record<string, unknown>, type: string): JobRow {
  const msg = (
    typeof row.message === 'object' && row.message !== null ? row.message : {}
  ) as Record<string, unknown>;
  const meta = (msg._meta as Record<string, unknown>) ?? {};
  return {
    id: String(row.msg_id),
    type,
    payload: msg,
    status: 'PROCESSING',
    priority: 0,
    maxRetries: QUEUE_SERVICE_CONFIG.defaultMaxRetries,
    retryCount: Number(row.read_ct ?? 0),
    lastError: null,
    scheduledAt: null,
    startedAt: row.vt as Date | null,
    completedAt: null,
    createdAt: row.enqueued_at as Date,
    companyId: (meta.companyId as string) ?? null,
    dedupeKey: (meta.dedupeKey as string) ?? null,
  };
}

class QueueService {
  private lastPruneAtMs = 0;

  async enqueue(
    db: DrizzleDB,
    type: JobType,
    payload?: Record<string, unknown>,
    options?: EnqueueOptions,
  ): Promise<JobRow> {
    const queueName = toQueueName(type);
    const message = {
      ...payload,
      _meta: {
        enqueuedAt: new Date().toISOString(),
      },
    };

    const delaySeconds = options?.scheduledAt
      ? Math.max(0, Math.floor((options.scheduledAt.getTime() - Date.now()) / 1000))
      : 0;

    const result = await db.execute(sql`
      SELECT * FROM pgmq.send(
        ${queueName}::text,
        ${JSON.stringify(message)}::jsonb,
        ${delaySeconds}
      )
    `);

    const rows = toRows(result);
    const row = rows[0];

    return {
      id: String(row?.msg_id ?? 0),
      type,
      payload: message,
      status: 'PENDING',
      priority: options?.priority ?? 0,
      maxRetries: options?.maxRetries ?? QUEUE_SERVICE_CONFIG.defaultMaxRetries,
      retryCount: 0,
      lastError: null,
      scheduledAt: options?.scheduledAt ?? null,
      startedAt: null,
      completedAt: null,
      createdAt: new Date(),
      companyId: null,
      dedupeKey: null,
    };
  }

  async enqueueWithDedupe(
    db: DrizzleDB,
    type: JobType,
    payload?: Record<string, unknown>,
    options?: EnqueueWithDedupeOptions,
  ): Promise<JobRow | null> {
    const queueName = toQueueName(type);

    if (options?.dedupeKey) {
      const existing = await db.execute(sql`
        SELECT msg_id FROM pgmq.q_${sql.raw(queueName)}
        WHERE message -> '_meta' ->> 'dedupeKey' = ${options.dedupeKey}
          AND (read_ct = 0 OR vt >= clock_timestamp())
        LIMIT 1
      `);
      const existingRows = toRows(existing);
      if (existingRows.length > 0) {
        return null;
      }
    }

    const message = {
      ...payload,
      _meta: {
        companyId: options?.companyId,
        dedupeKey: options?.dedupeKey,
        enqueuedAt: new Date().toISOString(),
      },
    };

    const result = await db.execute(sql`
      SELECT * FROM pgmq.send(
        ${queueName}::text,
        ${JSON.stringify(message)}::jsonb
      )
    `);

    const rows = toRows(result);
    const row = rows[0];

    return {
      id: String(row?.msg_id ?? 0),
      type,
      payload: message,
      status: 'PENDING',
      priority: options?.priority ?? 0,
      maxRetries: options?.maxRetries ?? QUEUE_SERVICE_CONFIG.defaultMaxRetries,
      retryCount: 0,
      lastError: null,
      scheduledAt: null,
      startedAt: null,
      completedAt: null,
      createdAt: new Date(),
      companyId: options?.companyId ?? null,
      dedupeKey: options?.dedupeKey ?? null,
    };
  }

  async countRecent(db: DrizzleDB, type: JobType, companyId: string, since: Date): Promise<number> {
    const queueName = toQueueName(type);
    const result = await db.execute(sql`
      SELECT
        (SELECT COUNT(*)::integer AS count FROM pgmq.q_${sql.raw(queueName)}
          WHERE enqueued_at >= ${since.toISOString()}::timestamptz
            AND message -> '_meta' @> ${JSON.stringify({ companyId })}::jsonb)
        +
        (SELECT COUNT(*)::integer AS count FROM pgmq.a_${sql.raw(queueName)}
          WHERE enqueued_at >= ${since.toISOString()}::timestamptz
            AND message -> '_meta' @> ${JSON.stringify({ companyId })}::jsonb)
        AS count
    `);

    const rows = toRows(result);
    return Number(rows[0]?.count ?? 0);
  }

  async drain(
    db: DrizzleDB,
    type: JobType,
    handler: QueueHandler,
    options: DrainOptions,
  ): Promise<DrainResult> {
    const { maxJobs, timeBudgetMs, batchSize = QUEUE_SERVICE_CONFIG.batchSize, onError } = options;
    const startTime = Date.now();
    const stats: DrainResult = { processed: 0, succeeded: 0, failed: 0 };
    const log = onError ?? ((msg: string, err?: unknown) => console.error(msg, err));
    const queueName = toQueueName(type);

    if (Date.now() - this.lastPruneAtMs >= QUEUE_SERVICE_CONFIG.pruneIntervalMs) {
      this.lastPruneAtMs = Date.now();
      try {
        await this.pruneTerminal(db, queueName);
      } catch (e) {
        log('[Queue] Failed to prune terminal jobs', e);
      }
    }

    for (;;) {
      if (timeBudgetMs !== undefined && Date.now() - startTime >= timeBudgetMs) break;
      if (stats.processed >= maxJobs) break;

      let messages: Record<string, unknown>[];
      try {
        const result = await db.execute(sql`
          SELECT * FROM pgmq.read(${queueName}::text, vt => 30, qty => ${batchSize})
        `);
        messages = toRows(result);
      } catch (e) {
        log('[Queue] Dequeue failed', e);
        break;
      }

      if (messages.length === 0) break;

      for (const msg of messages) {
        if (timeBudgetMs !== undefined && Date.now() - startTime >= timeBudgetMs) break;
        if (stats.processed >= maxJobs) break;

        stats.processed++;
        const jobRow = pgmqRowToJobRow(msg, type);

        try {
          await handler(jobRow);
          await db.execute(sql`SELECT pgmq.delete(${queueName}::text, ${msg.msg_id})`);
          stats.succeeded++;
        } catch (error) {
          stats.failed++;
          const retryCount = Number(msg.read_ct ?? 1);
          const maxRetries = QUEUE_SERVICE_CONFIG.defaultMaxRetries;

          try {
            if (error instanceof PermanentJobError) {
              await db.execute(sql`SELECT pgmq.archive(${queueName}::text, ${msg.msg_id})`);
            } else if (retryCount >= maxRetries) {
              await db.execute(sql`SELECT pgmq.archive(${queueName}::text, ${msg.msg_id})`);
            } else {
              const backoffSec = retryBackoffSeconds(retryCount);
              await db.execute(sql`
                SELECT pgmq.set_vt(${queueName}::text, ${msg.msg_id}, ${backoffSec})
              `);
            }
          } catch {
            log('[Queue] Failed to handle job failure');
          }
        }
      }
    }

    return stats;
  }

  async pruneTerminal(db: DrizzleDB, queueName: string): Promise<number> {
    const cutoff = new Date(Date.now() - QUEUE_SERVICE_CONFIG.pruneTerminalAfterMs);
    const result = await db.execute(sql`
      DELETE FROM pgmq.a_${sql.raw(queueName)}
      WHERE enqueued_at < ${cutoff}
    `);
    const rows = toRows(result);
    return rows.length;
  }
}

export const queueService = new QueueService();
