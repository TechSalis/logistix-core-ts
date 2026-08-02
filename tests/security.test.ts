import { describe, it, expect } from 'vitest';
import { SECURITY_CONFIG } from '../src/security.js';
import { SubscriptionTier } from '../src/enums.js';

describe('SECURITY_CONFIG', () => {
  it('has all rate limit tiers', () => {
    expect(SECURITY_CONFIG.rateLimits.tiers).toHaveProperty(SubscriptionTier.STARTER);
    expect(SECURITY_CONFIG.rateLimits.tiers).toHaveProperty(SubscriptionTier.PROFESSIONAL);
  });

  it('STARTER tier has lower limit than PROFESSIONAL', () => {
    expect(SECURITY_CONFIG.rateLimits.tiers[SubscriptionTier.STARTER].max).toBeLessThan(
      SECURITY_CONFIG.rateLimits.tiers[SubscriptionTier.PROFESSIONAL].max,
    );
  });

  it('has JWT config', () => {
    expect(SECURITY_CONFIG.jwt.jwtExpiresIn).toBe('1h');
    expect(SECURITY_CONFIG.jwt.jwtRefreshExpiresIn).toBe('30d');
  });

  it('has sudo config', () => {
    expect(SECURITY_CONFIG.sudo.tokenExpiresInMs).toBeGreaterThan(0);
    expect(SECURITY_CONFIG.admin.maxFailedSudoAttempts).toBe(5);
  });

  it('has security headers', () => {
    expect(SECURITY_CONFIG.headers['X-Content-Type-Options']).toBe('nosniff');
    expect(SECURITY_CONFIG.headers['X-Frame-Options']).toBe('DENY');
  });

  it('has malicious patterns', () => {
    expect(SECURITY_CONFIG.maliciousPatterns.length).toBeGreaterThan(0);
    expect(SECURITY_CONFIG.maliciousPatterns[0]).toBeInstanceOf(RegExp);
  });

  it('has validation limits', () => {
    expect(SECURITY_CONFIG.validation.maxEmailLength).toBe(254);
    expect(SECURITY_CONFIG.validation.maxPasswordLength).toBe(128);
    expect(SECURITY_CONFIG.validation.maxNameLength).toBe(150);
  });
});
