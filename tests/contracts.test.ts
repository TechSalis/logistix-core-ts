import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schema = readFileSync(join(__dirname, '..', 'src/contracts/schema.graphql'), 'utf8');

describe('contracts schema (generated artifact)', () => {
  it('keeps RemoteConfig stable-only (no volatile quota/health fields)', () => {
    const remoteConfig = extractDefinition(schema, 'type RemoteConfig');
    expect(remoteConfig).not.toContain('deliveryQuota');
    expect(remoteConfig).not.toContain('subscriptionHealth');
    expect(remoteConfig).toContain('retentionMonths: Int!');
    // Persona-scoped fields are nullable: maxBulkDeliveries/maxExportsPerMonth
    // are dispatcher/owner tier caps, rules is dispatcher-only, riderHeartbeat
    // is rider-only — the resolver returns only the caller's meaningful set.
    expect(remoteConfig).toContain('maxBulkDeliveries: Int');
    expect(remoteConfig).toContain('maxExportsPerMonth: Int');
    expect(remoteConfig).toContain('rules: ClientRules');
  });

  it('exposes the volatile subscription surface via dedicated company-scoped queries', () => {
    expect(schema).toMatch(/\n\s*deliveryQuota: DeliveryQuota!/);
    expect(schema).toMatch(/\n\s*subscriptionStatus: SubscriptionStatusInfo!/);
  });

  it('defines DeliveryQuota + SubscriptionStatusInfo with the agreed shapes', () => {
    expect(extractDefinition(schema, 'type DeliveryQuota')).toContain('usedThisMonth: Int!');
    expect(extractDefinition(schema, 'type DeliveryQuota')).toContain('remaining: Int!');
    const info = extractDefinition(schema, 'type SubscriptionStatusInfo');
    expect(info).toContain('status: SubscriptionStatus!');
    expect(info).toContain('tier: SubscriptionTier!');
    expect(info).toContain('periodEnd: DateTime');
    expect(info).toContain('subscriptionHealth: SubscriptionHealth!');
  });
});

function extractDefinition(sdl: string, name: string): string {
  const start = sdl.indexOf(name);
  expect(start, `${name} must exist in schema`).toBeGreaterThanOrEqual(0);
  const blockStart = sdl.indexOf('{', start);
  const blockEnd = sdl.indexOf('}', blockStart);
  return sdl.slice(start, blockEnd + 1);
}