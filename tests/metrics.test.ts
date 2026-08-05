import { describe, expect, it } from 'vitest';
import { mergeChannelCounts } from '../src/utils/metrics';

describe('mergeChannelCounts', () => {
  it('returns next when prev is undefined', () => {
    expect(mergeChannelCounts(undefined, { whatsapp: 5 })).toEqual({ whatsapp: 5 });
  });

  it('returns prev when next is undefined or empty', () => {
    expect(mergeChannelCounts({ whatsapp: 5 }, undefined)).toEqual({ whatsapp: 5 });
    expect(mergeChannelCounts({ whatsapp: 5 }, {})).toEqual({ whatsapp: 5 });
  });

  it('sums overlapping keys and keeps prev-only keys', () => {
    expect(mergeChannelCounts({ whatsapp: 6, instagram: 4 }, { whatsapp: 10, manual: 2 })).toEqual({
      whatsapp: 16,
      instagram: 4,
      manual: 2,
    });
  });

  it('does not mutate inputs', () => {
    const prev = { whatsapp: 1 };
    const next = { whatsapp: 2 };
    mergeChannelCounts(prev, next);
    expect(prev).toEqual({ whatsapp: 1 });
    expect(next).toEqual({ whatsapp: 2 });
  });
});
