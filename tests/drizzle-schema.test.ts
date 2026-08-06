import { describe, it, expect } from 'vitest';
import { jobQueue, jobQueueDedupeKeyUnique } from '../src/drizzle/schema.js';

function flattenSql(node: unknown): string {
  if (typeof node === 'string') return node;
  if (node && typeof node === 'object') {
    const n = node as { queryChunks?: unknown[]; value?: unknown; name?: unknown };
    if (Array.isArray(n.queryChunks)) return n.queryChunks.map(flattenSql).join('');
    if (Array.isArray(n.value)) return (n.value as string[]).join('');
    if (typeof n.value === 'string') return n.value;
    if (typeof n.name === 'string') return n.name;
  }
  return '';
}

describe('drizzle schema', () => {
  describe('job_queue dedupe index', () => {
    it('is a unique index named job_queue_dedupe_key_unique', () => {
      const idx = jobQueueDedupeKeyUnique.build(jobQueue);
      expect(idx.config.name).toBe('job_queue_dedupe_key_unique');
      expect(idx.config.unique).toBe(true);
    });

    it('is partial on PENDING and PROCESSING job_queue rows', () => {
      const idx = jobQueueDedupeKeyUnique.build(jobQueue);
      const where = flattenSql(idx.config.where);
      expect(where).toContain('PENDING');
      expect(where).toContain('PROCESSING');
    });
  });
});
