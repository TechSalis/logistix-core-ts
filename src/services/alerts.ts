import { LIMITS_CONFIG } from '../shared/config/limits.config.js';

const ALERT_COOLDOWN_MS = 5 * 60 * 1000;
const recentAlerts = new Map<string, number>();

function getDiscordWebhookUrl(): string | undefined {
  return process.env.DISCORD_WEBHOOK_URL;
}

export type AlertLevel = 'info' | 'warning' | 'critical';

export async function sendAlert(
  level: AlertLevel,
  title: string,
  details: string,
  webhookUrl?: string,
): Promise<void> {
  const resolvedUrl = webhookUrl ?? getDiscordWebhookUrl();
  if (!resolvedUrl) return;
  const key = `${title}:${level}`;
  const lastSent = recentAlerts.get(key) ?? 0;
  if (Date.now() - lastSent < ALERT_COOLDOWN_MS) return;
  recentAlerts.set(key, Date.now());

  const emoji =
    level === 'critical'
      ? '\u{1F6A8}'
      : level === 'warning'
        ? '\u{26A0}\u{FE0F}'
        : '\u{2139}\u{FE0F}';
  try {
    await fetch(resolvedUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: `${emoji} ${title}`,
            description: details,
            color: level === 'critical' ? 0xff0000 : level === 'warning' ? 0xffaa00 : 0x00aaff,
            timestamp: new Date().toISOString(),
          },
        ],
      }),
      signal: AbortSignal.timeout(LIMITS_CONFIG.externalApiTimeoutMs),
    });
  } catch {
    // Alert delivery failure is non-critical — never throw
  }
}

export function resetAlertCooldownsForTest(): void {
  recentAlerts.clear();
}
