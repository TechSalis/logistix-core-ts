import { describe, it, expect } from 'vitest';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateAll } from '../validate.js';

function sampleWebArtifact(extra?: unknown) {
  return JSON.stringify({
    repo: 'test-web',
    extractedAt: new Date().toISOString(),
    documents: [
      { name: 'Me', operationType: 'query', rawSource: 'query Me { meRider { id } }' },
      {
        name: 'CompanyDelivery',
        operationType: 'query',
        rawSource: 'query CompanyDelivery { deliverySync(scope: COMPANY) { items { id } } }',
      },
    ],
    restRoutes: [],
    sseContracts: { eventTypes: [], payloadKeys: {} },
    ...(extra ?? {}),
  });
}

describe('validateAll (contract validator in core-ts)', () => {
  it('accepts a valid artifact against core-ts typeDefs', () => {
    const dir = mkdtempSync(join(tmpdir(), 'web-'));
    const p = join(dir, 'contracts.json');
    writeFileSync(p, sampleWebArtifact());
    const res = validateAll({ web: p, flutter: '' });
    expect(res.pass).toBe(true);
    expect(res.failures).toEqual([]);
  });

  it('rejects a document referencing a missing field', () => {
    const dir = mkdtempSync(join(tmpdir(), 'web-'));
    const p = join(dir, 'contracts.json');
    writeFileSync(
      p,
      sampleWebArtifact({
        documents: [
          {
            name: 'Bad',
            operationType: 'query',
            rawSource: 'query Bad { meRider { iDoNotExist } }',
          },
        ],
      }),
    );
    const res = validateAll({ web: p, flutter: '' });
    expect(res.pass).toBe(false);
    expect(res.failures.join('\n')).toContain('iDoNotExist');
  });

  it('returns zero failures when no artifact exists', () => {
    const res = validateAll({ web: '/does/not/exist.json', flutter: '' });
    expect(res.pass).toBe(true);
  });
});
