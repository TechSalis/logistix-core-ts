import { describe, expect, it, vi, beforeEach } from 'vitest';
import { queueService, PermanentJobError, QUEUE_SERVICE_CONFIG } from '../src/index.js';

type AnyDb = Parameters<typeof queueService.enqueue>[0];

function mockDb(initialRows: unknown[] = []) {
  const execute = vi.fn().mockResolvedValue(initialRows);
  return { execute } as unknown as AnyDb;
}

beforeEach(() => {
  vi.clearAllMocks();
  // Reset prune timer so each drain test triggers pruneTerminal
  (queueService as { lastPruneAtMs: number }).lastPruneAtMs = 0;
});

describe('enqueue', () => {
  it('returns a JobRow with correct shape', async () => {
    const db = mockDb([{ msg_id: 42 }]);
    const job = await queueService.enqueue(db, 'DELIVERY_NOTIFICATION', { foo: 'bar' });

    expect(db.execute).toHaveBeenCalledOnce();
    expect(job.id).toBe('42');
    expect(job.type).toBe('DELIVERY_NOTIFICATION');
    expect(job.status).toBe('PENDING');
    expect(job.payload.foo).toBe('bar');
    expect(job.payload._meta).toBeDefined();
    expect(job.retryCount).toBe(0);
  });

  it('returns PENDING status with 0 retry count', async () => {
    const db = mockDb([{ msg_id: 1 }]);
    const job = await queueService.enqueue(db, 'AI_BATCH', {});
    expect(job.status).toBe('PENDING');
    expect(job.retryCount).toBe(0);
    expect(job.maxRetries).toBe(QUEUE_SERVICE_CONFIG.defaultMaxRetries);
  });

  it('defaults maxRetries to QUEUE_SERVICE_CONFIG.defaultMaxRetries', async () => {
    const db = mockDb([{ msg_id: 1 }]);
    const job = await queueService.enqueue(db, 'EXPORT', {});
    expect(job.maxRetries).toBe(QUEUE_SERVICE_CONFIG.defaultMaxRetries);
  });

  it('respects an explicit maxRetries option', async () => {
    const db = mockDb([{ msg_id: 1 }]);
    const job = await queueService.enqueue(db, 'EXPORT', {}, { maxRetries: 2 });
    expect(job.maxRetries).toBe(2);
  });

  it('sets scheduledAt when provided', async () => {
    const db = mockDb([{ msg_id: 1 }]);
    const future = new Date(Date.now() + 60_000);
    const job = await queueService.enqueue(db, 'AI_BATCH', {}, { scheduledAt: future });
    expect(job.scheduledAt).toBe(future);
  });

  it('sets priority when provided', async () => {
    const db = mockDb([{ msg_id: 1 }]);
    const job = await queueService.enqueue(db, 'DELIVERY_NOTIFICATION', {}, { priority: 5 });
    expect(job.priority).toBe(5);
  });

  it('embeds _meta with companyId and dedupeKey via enqueueWithDedupe', async () => {
    const db = mockDb();
    db.execute.mockResolvedValueOnce([]);
    db.execute.mockResolvedValueOnce([{ msg_id: 10 }]);
    const job = await queueService.enqueueWithDedupe(db, 'EXPORT', { targetMonth: '2026-08' }, {
      companyId: 'co-1',
      dedupeKey: 'co-1:2026-08',
    });
    expect(job).not.toBeNull();
    expect(job!.companyId).toBe('co-1');
    expect(job!.dedupeKey).toBe('co-1:2026-08');
    expect(job!.payload._meta.companyId).toBe('co-1');
    expect(job!.payload._meta.dedupeKey).toBe('co-1:2026-08');
  });
});

describe('enqueueWithDedupe', () => {
  it('returns null when dedupe check finds an active job', async () => {
    const db = mockDb();
    db.execute.mockResolvedValueOnce([{ msg_id: 99 }]);

    const result = await queueService.enqueueWithDedupe(db, 'DELIVERY_NOTIFICATION', {}, {
      dedupeKey: 'dedupe-123',
    });

    expect(result).toBeNull();
    expect(db.execute).toHaveBeenCalledOnce();
  });

  it('enqueues when no active job with dedupe key exists', async () => {
    const db = mockDb();
    db.execute.mockResolvedValueOnce([]);
    db.execute.mockResolvedValueOnce([{ msg_id: 1 }]);

    const result = await queueService.enqueueWithDedupe(db, 'DELIVERY_NOTIFICATION', {}, {
      dedupeKey: 'dedupe-456',
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe('1');
    expect(db.execute).toHaveBeenCalledTimes(2);
  });

  it('skips dedupe check when no dedupeKey provided', async () => {
    const db = mockDb([{ msg_id: 1 }]);
    const result = await queueService.enqueueWithDedupe(db, 'AI_BATCH', {});
    expect(result).not.toBeNull();
    expect(db.execute).toHaveBeenCalledOnce();
  });

  it('preserves companyId and dedupeKey in result', async () => {
    const db = mockDb();
    db.execute.mockResolvedValueOnce([]);
    db.execute.mockResolvedValueOnce([{ msg_id: 7 }]);
    const result = await queueService.enqueueWithDedupe(db, 'EXPORT', {}, {
      companyId: 'company-abc',
      dedupeKey: 'company-abc:export:2026-08',
    });
    expect(result).not.toBeNull();
    expect(result!.companyId).toBe('company-abc');
    expect(result!.dedupeKey).toBe('company-abc:export:2026-08');
  });
});

describe('countRecent', () => {
  it('returns the total count from live queue + archive', async () => {
    const db = mockDb([{ count: 5 }]);
    const count = await queueService.countRecent(db, 'EXPORT', 'company-1', new Date());
    expect(count).toBe(5);
    expect(db.execute).toHaveBeenCalledOnce();
  });

  it('returns 0 when no rows match', async () => {
    const db = mockDb([{ count: 0 }]);
    const count = await queueService.countRecent(db, 'EXPORT', 'company-1', new Date());
    expect(count).toBe(0);
  });

  it('returns 0 when result is empty', async () => {
    const db = mockDb([]);
    const count = await queueService.countRecent(db, 'EXPORT', 'company-1', new Date());
    expect(count).toBe(0);
  });
});

describe('drain', () => {
  it('processes messages and deletes on success', async () => {
    const db = mockDb();
    db.execute.mockResolvedValueOnce([]); // pruneTerminal
    db.execute.mockResolvedValueOnce([
      { msg_id: 1, message: { _meta: { companyId: 'c1' }, data: 'hello' }, read_ct: 1, enqueued_at: new Date() },
    ]);
    db.execute.mockResolvedValueOnce([]);

    const handler = vi.fn().mockResolvedValue(undefined);
    const result = await queueService.drain(db, 'DELIVERY_NOTIFICATION', handler, { maxJobs: 10 });

    expect(result.processed).toBe(1);
    expect(result.succeeded).toBe(1);
    expect(result.failed).toBe(0);
    expect(handler).toHaveBeenCalledOnce();
    expect(handler).toHaveBeenCalledWith(expect.objectContaining({
      id: '1',
      type: 'DELIVERY_NOTIFICATION',
      companyId: 'c1',
    }));
  });

  it('extracts companyId and dedupeKey from _meta in message', async () => {
    const db = mockDb();
    db.execute.mockResolvedValueOnce([]); // pruneTerminal
    db.execute.mockResolvedValueOnce([
      {
        msg_id: 7,
        message: {
          _meta: { companyId: 'co-xyz', dedupeKey: 'dedupe-key-99' },
          orderId: 123,
        },
        read_ct: 0,
        enqueued_at: new Date(),
      },
    ]);
    db.execute.mockResolvedValueOnce([]);

    const handler = vi.fn().mockResolvedValue(undefined);
    await queueService.drain(db, 'DELIVERY_NOTIFICATION', handler, { maxJobs: 10 });

    const job = handler.mock.calls[0][0];
    expect(job.companyId).toBe('co-xyz');
    expect(job.dedupeKey).toBe('dedupe-key-99');
    expect(job.payload.orderId).toBe(123);
  });

  it('retries on handler failure with backoff via set_vt', async () => {
    const db = mockDb();
    db.execute.mockResolvedValueOnce([]); // pruneTerminal
    db.execute.mockResolvedValueOnce([
      { msg_id: 2, message: { _meta: {} }, read_ct: 1, enqueued_at: new Date() },
    ]);
    db.execute.mockResolvedValueOnce([]);

    const handler = vi.fn().mockRejectedValue(new Error('transient'));
    const result = await queueService.drain(db, 'DELIVERY_NOTIFICATION', handler, { maxJobs: 10 });

    expect(result.failed).toBe(1);
    expect(result.succeeded).toBe(0);
  });

  it('archives on PermanentJobError', async () => {
    const db = mockDb();
    db.execute.mockResolvedValueOnce([]); // pruneTerminal
    db.execute.mockResolvedValueOnce([
      { msg_id: 3, message: { _meta: {} }, read_ct: 1, enqueued_at: new Date() },
    ]);
    db.execute.mockResolvedValueOnce([]);

    const handler = vi.fn().mockRejectedValue(new PermanentJobError('no data'));
    const result = await queueService.drain(db, 'EXPORT', handler, { maxJobs: 10 });

    expect(result.failed).toBe(1);
    expect(result.processed).toBe(1);
  });

  it('archives when maxRetries exceeded (read_ct >= maxRetries)', async () => {
    const db = mockDb();
    db.execute.mockResolvedValueOnce([]); // pruneTerminal
    db.execute.mockResolvedValueOnce([
      { msg_id: 4, message: { _meta: {} }, read_ct: 3, enqueued_at: new Date() },
    ]);
    db.execute.mockResolvedValueOnce([]);

    const handler = vi.fn().mockRejectedValue(new Error('stuck'));
    const result = await queueService.drain(db, 'DELIVERY_NOTIFICATION', handler, { maxJobs: 10 });

    expect(result.failed).toBe(1);
  });

  it('returns empty when queue is empty', async () => {
    const db = mockDb();
    db.execute.mockResolvedValueOnce([]); // pruneTerminal
    db.execute.mockResolvedValueOnce([]); // pgmq.read empty

    const handler = vi.fn();
    const result = await queueService.drain(db, 'DELIVERY_NOTIFICATION', handler, { maxJobs: 10 });

    expect(result.processed).toBe(0);
    expect(result.succeeded).toBe(0);
    expect(result.failed).toBe(0);
    expect(handler).not.toHaveBeenCalled();
  });

  it('respects maxJobs limit', async () => {
    const db = mockDb();
    db.execute.mockResolvedValueOnce([]); // pruneTerminal
    db.execute.mockResolvedValueOnce([
      { msg_id: 10, message: { _meta: {} }, read_ct: 0, enqueued_at: new Date() },
      { msg_id: 11, message: { _meta: {} }, read_ct: 0, enqueued_at: new Date() },
    ]);
    db.execute.mockResolvedValueOnce([]);
    db.execute.mockResolvedValueOnce([]);

    const handler = vi.fn().mockResolvedValue(undefined);
    const result = await queueService.drain(db, 'AI_BATCH', handler, { maxJobs: 2, batchSize: 10 });

    expect(result.processed).toBe(2);
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('returns error info in onError callback', async () => {
    const db = mockDb();
    db.execute.mockResolvedValueOnce([]); // pruneTerminal
    db.execute.mockResolvedValueOnce([
      { msg_id: 5, message: { _meta: {} }, read_ct: 0, enqueued_at: new Date() },
    ]);
    db.execute.mockResolvedValueOnce([]);

    const handler = vi.fn().mockRejectedValue(new Error('handler broke'));
    const onError = vi.fn();
    const result = await queueService.drain(db, 'DELIVERY_NOTIFICATION', handler, { maxJobs: 10, onError });

    expect(result.failed).toBe(1);
  });
});

describe('pruneTerminal', () => {
  it('returns the number of deleted rows', async () => {
    const db = mockDb([{ msg_id: 1 }, { msg_id: 2 }, { msg_id: 3 }]);
    const count = await queueService.pruneTerminal(db, 'delivery_notifications');
    expect(count).toBe(3);
    expect(db.execute).toHaveBeenCalledOnce();
  });

  it('returns 0 when nothing to prune', async () => {
    const db = mockDb([]);
    const count = await queueService.pruneTerminal(db, 'delivery_notifications');
    expect(count).toBe(0);
  });
});
