import { describe, expect, it, vi } from 'vitest';
import { jobQueue } from '../src/drizzle/schema.js';
import { PermanentJobError, queueService } from '../src/index.js';

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
});
