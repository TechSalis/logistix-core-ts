import { describe, it, expect } from 'vitest';
import { SECURITY_CONFIG } from '../src/shared/config/security.config.js';

describe('SECURITY_CONFIG', () => {
  it('has the abuse-block escalation policy', () => {
    expect(SECURITY_CONFIG.blocks.temporaryLadderMs.length).toBeGreaterThan(0);
    expect(SECURITY_CONFIG.blocks.escalateAfterBlocks).toBeGreaterThan(0);
    expect(SECURITY_CONFIG.blocks.maxPersistentMs).toBeGreaterThanOrEqual(SECURITY_CONFIG.blocks.persistentEscalatedMs);
  });

  it('has validation limits', () => {
    expect(SECURITY_CONFIG.validation.maxEmailLength).toBe(254);
    expect(SECURITY_CONFIG.validation.maxPasswordLength).toBe(128);
    expect(SECURITY_CONFIG.validation.maxNameLength).toBe(150);
  });
});
