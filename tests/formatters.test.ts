import { describe, it, expect } from 'vitest';
import { formatDeliveryStatus, formatEnumToTitleCase } from '../src/formatters.js';
import { DeliveryStatus, SubscriptionStatus } from '../src/enums.js';

describe('formatDeliveryStatus', () => {
  it('formats ASSIGNED', () => {
    expect(formatDeliveryStatus(DeliveryStatus.ASSIGNED)).toBe('Assigned');
  });

  it('formats IN_TRANSIT', () => {
    expect(formatDeliveryStatus(DeliveryStatus.IN_TRANSIT)).toBe('In Transit');
  });

  it('returns Unknown for null', () => {
    expect(formatDeliveryStatus(null)).toBe('Unknown');
  });

  it('returns Unknown for undefined', () => {
    expect(formatDeliveryStatus(undefined)).toBe('Unknown');
  });

  it('returns Unknown for empty string', () => {
    expect(formatDeliveryStatus('')).toBe('Unknown');
  });

  it('handles single-word status', () => {
    expect(formatDeliveryStatus(DeliveryStatus.PENDING)).toBe('Pending');
  });
});

describe('formatEnumToTitleCase', () => {
  it('formats single word', () => {
    expect(formatEnumToTitleCase(SubscriptionStatus.ACTIVE)).toBe('Active');
  });

  it('formats multi-word', () => {
    expect(formatEnumToTitleCase(SubscriptionStatus.PAST_DUE)).toBe('Past Due');
  });

  it('returns empty string for null', () => {
    expect(formatEnumToTitleCase(null)).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(formatEnumToTitleCase(undefined)).toBe('');
  });

  it('returns empty string for empty string', () => {
    expect(formatEnumToTitleCase('')).toBe('');
  });
});
