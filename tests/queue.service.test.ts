import { describe, expect, it, vi } from 'vitest';
import { jobQueue } from '../src/services/drizzle/schema.js';
import { PermanentJobError, queueService, QUEUE_SERVICE_CONFIG } from '../src/index.js';

type AnyDb = Parameters<typeof queueService.enqueue>[0];
type JobRow = Awaited<ReturnType<typeof queueService.enqueue>>;

function makeInsertDb(returning: unknown[]) {
  const insert = vi.fn().mockReturnValue({
    values: vi.fn().mockReturnValue({
      onConflictDoNothing: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue(returning),
      }),
    }),
  });
  return { db: { insert } as unknown as AnyDb, insert };
}

function makeEnqueueDb(returning: unknown[]) {
  const insert = vi.fn().mockReturnValue({
    values: vi.fn().mockReturnValue({
      returning: vi.fn().mockResolvedValue(returning),
    }),
  });
  return { db: { insert } as unknown as AnyDb, insert };
}

describe('enqueueWithDedupe', () => {
  it('returns the inserted row', async () => {
    const row = { id: 'j1', type: 'export' } as unknown as JobRow;
    const { db, insert } = makeInsertDb([row]);
    const result = await queueService.enqueueWithDedupe(db, 'export', {}, { dedupeKey: 'k' });
    expect(result).toEqual(row);
    expect(insert).toHaveBeenCalledWith(jobQueue);
  });

  it('returns null when the insert conflicts (duplicate already in flight)', async () => {
    const { db } = makeInsertDb([]);
    const result = await queueService.enqueueWithDedupe(db, 'export', {}, { dedupeKey: 'k' });
    expect(result).toBeNull();
  });
});

describe('enqueue', () => {
  it('defaults maxRetries to QUEUE_SERVICE_CONFIG.defaultMaxRetries', async () => {
    const { db, insert } = makeEnqueueDb([{ id: 'j1' }]);
    await queueService.enqueue(db, 'export', {});
    const values = insert.mock.results[0].value.values;
    expect(values).toHaveBeenCalledWith(
      expect.objectContaining({ maxRetries: QUEUE_SERVICE_CONFIG.defaultMaxRetries }),
    );
  });

  it('respects an explicit maxRetries option', async () => {
    const { db, insert } = makeEnqueueDb([{ id: 'j1' }]);
    await queueService.enqueue(db, 'export', {}, { maxRetries: 2 });
    const values = insert.mock.results[0].value.values;
    expect(values).toHaveBeenCalledWith(expect.objectContaining({ maxRetries: 2 }));
  });
});

describe('countRecent', () => {
  it('returns the counted rows', async () => {
    const db = {
      select: vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([{ count: 3 }]),
        }),
      }),
    } as unknown as AnyDb;
    await expect(queueService.countRecent(db, 'export', 'c1', new Date())).resolves.toBe(3);
  });

  it('returns 0 when no rows match', async () => {
    const db = {
      select: vi.fn().mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([]),
        }),
      }),
    } as unknown as AnyDb;
    await expect(queueService.countRecent(db, 'export', 'c1', new Date())).resolves.toBe(0);
  });
});

describe('failPermanent', () => {
  it('marks the job FAILED regardless of retry count', async () => {
    const update = vi.fn().mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue(undefined),
      }),
    });
    const db = { update } as unknown as AnyDb;
    await queueService.failPermanent(db, 'j1', 'boom');
    expect(update).toHaveBeenCalledWith(jobQueue);
  });
});

describe('drain', () => {
  const db = {
    update: () => ({
      set: () => ({
        where: () => ({ returning: () => Promise.resolve([{ id: 'x' }]) }),
      }),
    }),
    delete: () => ({
      where: () => ({ returning: () => Promise.resolve([{ id: 'x' }]) }),
    }),
  } as unknown as AnyDb;
  const dequeueSpy = () =>
    vi
      .spyOn(
        queueService as unknown as {
          dequeue: (db: AnyDb, type: string, batchSize: number) => Promise<JobRow[]>;
        },
        'dequeue',
      )
      .mockResolvedValue([
        { id: 'j1', type: 'export', retryCount: 0, maxRetries: 3 } as unknown as JobRow,
      ]);

  it('fails permanently when the handler throws PermanentJobError', async () => {
    dequeueSpy();
    const failPermanent = vi.spyOn(queueService, 'failPermanent').mockResolvedValue(undefined);
    const fail = vi.spyOn(queueService, 'fail').mockResolvedValue(undefined);
    try {
      await queueService.drain(
        db,
        'export',
        async () => {
          throw new PermanentJobError('no data');
        },
        { timeBudgetMs: 5000, maxJobs: 1, batchSize: 1 },
      );
      expect(failPermanent).toHaveBeenCalledWith(db, 'j1', expect.stringContaining('no data'));
      expect(fail).not.toHaveBeenCalled();
    } finally {
      failPermanent.mockRestore();
      fail.mockRestore();
    }
  });

  it('retries (backoff) on transient handler errors', async () => {
    dequeueSpy();
    const fail = vi.spyOn(queueService, 'fail').mockResolvedValue(undefined);
    const failPermanent = vi.spyOn(queueService, 'failPermanent').mockResolvedValue(undefined);
    try {
      await queueService.drain(
        db,
        'export',
        async () => {
          throw new Error('transient');
        },
        { timeBudgetMs: 5000, maxJobs: 1, batchSize: 1 },
      );
      expect(fail).toHaveBeenCalledWith(db, 'j1', expect.stringContaining('transient'));
      expect(failPermanent).not.toHaveBeenCalled();
    } finally {
      fail.mockRestore();
      failPermanent.mockRestore();
    }
  });

  it('prunes and retries stalled jobs using config-driven values', async () => {
    vi.restoreAllMocks();
    (queueService as unknown as { lastPruneAtMs: number }).lastPruneAtMs = 0;
    const pruneSpy = vi.spyOn(queueService, 'pruneTerminal').mockResolvedValue(0);
    const retrySpy = vi
      .spyOn(
        queueService as unknown as {
          retryStalled: (db: AnyDb, type: string) => Promise<number>;
        },
        'retryStalled',
      )
      .mockResolvedValue(0);
    try {
      await queueService.drain(db, 'export', async () => {}, { maxJobs: 1, batchSize: 1 });
      expect(pruneSpy).toHaveBeenCalledWith(db, 'export');
      expect(retrySpy).toHaveBeenCalledWith(db, 'export');
    } finally {
      pruneSpy.mockRestore();
      retrySpy.mockRestore();
    }
  });
});

describe('retryStalled / pruneTerminal counts', () => {
  const db = {
    update: () => ({
      set: () => ({
        where: () => ({
          returning: () => Promise.resolve([{ id: 'a' }, { id: 'b' }]),
        }),
      }),
    }),
    delete: () => ({
      where: () => ({
        returning: () => Promise.resolve([{ id: 'a' }, { id: 'b' }, { id: 'c' }]),
      }),
    }),
  } as unknown as AnyDb;

  it('retryStalled returns the actual count of rows reset', async () => {
    const count = await (
      queueService as unknown as {
        retryStalled: (db: AnyDb, type: string) => Promise<number>;
      }
    ).retryStalled(db, 'export');
    expect(count).toBe(2);
  });

  it('pruneTerminal returns the actual count of rows deleted', async () => {
    const count = await queueService.pruneTerminal(db, 'export');
    expect(count).toBe(3);
  });
});

describe('dequeue', () => {
  it('maps snake_case RETURNING * columns to the camelCase JobRow shape', async () => {
    vi.restoreAllMocks();
    const db = {
      execute: vi.fn().mockResolvedValue([
        {
          id: 'j1',
          type: 'export',
          payload: { targetMonth: '2026-08' },
          status: 'PROCESSING',
          priority: 0,
          max_retries: 3,
          retry_count: 1,
          last_error: null,
          scheduled_at: null,
          started_at: '2026-08-07T17:30:10.000Z',
          completed_at: null,
          created_at: '2026-08-07T17:30:05.000Z',
          company_id: 'seed-co-starter',
          dedupe_key: null,
        },
      ]),
    } as unknown as AnyDb;

    const jobs = await (
      queueService as unknown as {
        dequeue: (db: AnyDb, type: string, batchSize: number) => Promise<JobRow[]>;
      }
    ).dequeue(db, 'export', 1);

    expect(jobs).toEqual([
      {
        id: 'j1',
        type: 'export',
        payload: { targetMonth: '2026-08' },
        status: 'PROCESSING',
        priority: 0,
        maxRetries: 3,
        retryCount: 1,
        lastError: null,
        scheduledAt: null,
        startedAt: '2026-08-07T17:30:10.000Z',
        completedAt: null,
        createdAt: '2026-08-07T17:30:05.000Z',
        companyId: 'seed-co-starter',
        dedupeKey: null,
      },
    ]);
  });
});
