import { describe, it, expect } from 'vitest';
import { buildSystemConfig, SYSTEM_CONFIG } from '../src/config.js';

describe('buildSystemConfig', () => {
	it('returns defaults when no env vars provided', () => {
		const config = buildSystemConfig({});
		expect(config.brandName).toBe('Logistix');
		expect(config.domain).toBe('logistix.team');
		expect(config.supportEmail).toBe('contact@logistix.team');
		expect(config.enableTrackingCodes).toBe(true);
	});

	it('overrides brandName from env', () => {
		const config = buildSystemConfig({ BRAND_NAME: 'AcmeCorp' });
		expect(config.brandName).toBe('AcmeCorp');
	});

	it('overrides domain from env', () => {
		const config = buildSystemConfig({ BRAND_DOMAIN: 'acme.com' });
		expect(config.domain).toBe('acme.com');
		// supportEmail should default to contact@<domain>
		expect(config.supportEmail).toBe('contact@acme.com');
	});

	it('allows explicit supportEmail override', () => {
		const config = buildSystemConfig({
			BRAND_DOMAIN: 'acme.com',
			BRAND_SUPPORT_EMAIL: 'hello@acme.com',
		});
		expect(config.supportEmail).toBe('hello@acme.com');
	});

	it('disables tracking codes via env', () => {
		const config = buildSystemConfig({ ENABLE_TRACKING_CODES: 'false' });
		expect(config.enableTrackingCodes).toBe(false);
	});

	it('builds tracking link from domain by default', () => {
		const config = buildSystemConfig({ BRAND_DOMAIN: 'example.io' });
		expect(config.trackingLink).toBe('https://example.io/track');
	});

	it('allows explicit tracking link override', () => {
		const config = buildSystemConfig({ BRAND_TRACKING_LINK: 'https://track.example.io' });
		expect(config.trackingLink).toBe('https://track.example.io');
	});

	it('exposes app store URLs', () => {
		const config = buildSystemConfig({
			PUBLIC_APP_STORE_URL: 'https://apps.apple.com/id/123',
			PUBLIC_PLAY_STORE_URL: 'https://play.google.com/store/id/123',
		});
		expect(config.appStoreUrl).toBe('https://apps.apple.com/id/123');
		expect(config.playStoreUrl).toBe('https://play.google.com/store/id/123');
	});

	it('has working hours for Monday–Saturday by default', () => {
		const config = buildSystemConfig({});
		expect(config.workingHours['Monday']).toEqual({ start: '07:00', close: '19:00' });
		expect(config.workingHours['Saturday']).toEqual({ start: '07:00', close: '19:00' });
		expect(config.workingHours['Sunday']).toBeUndefined();
	});
});

describe('SYSTEM_CONFIG singleton', () => {
	it('is a valid SystemConfig object', () => {
		expect(SYSTEM_CONFIG).toHaveProperty('brandName');
		expect(SYSTEM_CONFIG).toHaveProperty('domain');
		expect(SYSTEM_CONFIG).toHaveProperty('supportEmail');
		expect(SYSTEM_CONFIG).toHaveProperty('trackingLink');
		expect(SYSTEM_CONFIG).toHaveProperty('workingHours');
		expect(typeof SYSTEM_CONFIG.enableTrackingCodes).toBe('boolean');
	});
});
