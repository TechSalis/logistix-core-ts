import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('sendAlert', () => {
  let sendAlert: typeof import('../src/services/alerts.js').sendAlert;
  let resetAlertCooldownsForTest: typeof import('../src/services/alerts.js').resetAlertCooldownsForTest;

  const mockFetch = vi.fn();

  beforeEach(async () => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', mockFetch);

    const mod = await import('../src/services/alerts.js');
    sendAlert = mod.sendAlert;
    resetAlertCooldownsForTest = mod.resetAlertCooldownsForTest;
    resetAlertCooldownsForTest();
  });

  afterEach(() => {
    resetAlertCooldownsForTest();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('posts to the injected webhook URL', async () => {
    await sendAlert('warning', 'Disk Full', '95% used', 'https://discord.example/webhook');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://discord.example/webhook');
    expect(init.method).toBe('POST');
    const body = JSON.parse(init.body);
    expect(body.embeds[0].title).toBe('\u{26A0}\u{FE0F} Disk Full');
    expect(body.embeds[0].description).toBe('95% used');
  });

  it('falls back to the DISCORD_WEBHOOK_URL env var when no URL is injected', async () => {
    vi.stubEnv('DISCORD_WEBHOOK_URL', 'https://discord.example/env-hook');

    await sendAlert('info', 'Heartbeat', 'ok');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch.mock.calls[0][0]).toBe('https://discord.example/env-hook');
  });

  it('does nothing when no webhook is configured', async () => {
    await sendAlert('critical', 'Outage', 'down');

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('never throws when the webhook request fails', async () => {
    mockFetch.mockRejectedValue(new Error('network down'));

    await expect(
      sendAlert('critical', 'Outage', 'down', 'https://discord.example/webhook'),
    ).resolves.toBeUndefined();
  });

  it('respects the per-title cooldown', async () => {
    await sendAlert('warning', 'Disk Full', 'first', 'https://discord.example/webhook');
    await sendAlert('warning', 'Disk Full', 'second', 'https://discord.example/webhook');

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('allows the same title at a different level past the cooldown', async () => {
    await sendAlert('warning', 'Disk Full', 'first', 'https://discord.example/webhook');
    await sendAlert('critical', 'Disk Full', 'second', 'https://discord.example/webhook');

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});