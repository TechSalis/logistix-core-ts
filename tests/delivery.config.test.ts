import { describe, it, expect } from 'vitest';
import { ALLOWED_STATUS_TRANSITIONS } from '../src/shared/config/delivery.config.js';
import { DeliveryStatus } from '../src/shared/enums/enums.js';

describe('ALLOWED_STATUS_TRANSITIONS', () => {
  it('covers every DeliveryStatus member as a key', () => {
    for (const status of Object.values(DeliveryStatus)) {
      expect(ALLOWED_STATUS_TRANSITIONS[status]).toBeDefined();
    }
  });

  it('PENDING can move to ASSIGNED or CANCELLED', () => {
    expect(ALLOWED_STATUS_TRANSITIONS[DeliveryStatus.PENDING]).toEqual([
      DeliveryStatus.ASSIGNED,
      DeliveryStatus.CANCELLED,
    ]);
  });

  it('ASSIGNED can move to IN_TRANSIT, PENDING, or CANCELLED', () => {
    expect(ALLOWED_STATUS_TRANSITIONS[DeliveryStatus.ASSIGNED]).toEqual([
      DeliveryStatus.IN_TRANSIT,
      DeliveryStatus.PENDING,
      DeliveryStatus.CANCELLED,
    ]);
  });

  it('IN_TRANSIT can move to DELIVERED or CANCELLED', () => {
    expect(ALLOWED_STATUS_TRANSITIONS[DeliveryStatus.IN_TRANSIT]).toEqual([
      DeliveryStatus.DELIVERED,
      DeliveryStatus.CANCELLED,
    ]);
  });

  it('terminal statuses have no outgoing transitions', () => {
    expect(ALLOWED_STATUS_TRANSITIONS[DeliveryStatus.DELIVERED]).toEqual([]);
    expect(ALLOWED_STATUS_TRANSITIONS[DeliveryStatus.FAILED]).toEqual([]);
    expect(ALLOWED_STATUS_TRANSITIONS[DeliveryStatus.CANCELLED]).toEqual([]);
  });

  it('never allows a self-transition', () => {
    for (const [status, targets] of Object.entries(ALLOWED_STATUS_TRANSITIONS)) {
      expect(targets).not.toContain(status);
    }
  });

  it('every target is a valid DeliveryStatus member', () => {
    const statuses = new Set(Object.values(DeliveryStatus));
    for (const targets of Object.values(ALLOWED_STATUS_TRANSITIONS)) {
      for (const target of targets) {
        expect(statuses.has(target)).toBe(true);
      }
    }
  });
});
