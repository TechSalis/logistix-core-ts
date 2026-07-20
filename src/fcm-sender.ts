import { extractErrorMessage } from './error-utils.js';

/**
 * Lightweight FCM sender using the Firebase HTTP v1 REST API.
 * Works in Node.js (backend) and CF Workers (workers) — no firebase-admin dependency.
 *
 * Supports: single send, batch send, topic messaging, topic subscribe/unsubscribe.
 * Caches OAuth2 access tokens for 55 min (tokens valid for 60 min).
 */

export interface FcmCredentials {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

export interface FcmMessage {
  token: string;
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface FcmResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  errorCode?: string;
}

// Token cache: one per FcmService instance
interface CachedToken {
  value: string;
  expiresAt: number;
}

const TOKEN_BUFFER_MS = 5 * 60 * 1000; // refresh 5 min early
const TOKEN_LIFETIME_MS = 60 * 60 * 1000; // tokens valid for 1 hour

// FCM v1 error codes that indicate an invalid/unregistered token
const INVALID_TOKEN_CODES = new Set(['UNREGISTERED', 'INVALID_ARGUMENT']);

export class FcmService {
  private cachedToken: CachedToken | null = null;

  constructor(private readonly credentials: FcmCredentials) {}

  /** Send a single push notification. */
  async send(message: FcmMessage): Promise<FcmResponse> {
    try {
      const token = await this.getAccessToken();

      const res = await fetch(
        `https://fcm.googleapis.com/v1/projects/${this.credentials.projectId}/messages:send`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: {
              token: message.token,
              notification: { title: message.title, body: message.body },
              data: message.data ?? {},
            },
          }),
        },
      );

      const result = (await res.json()) as {
        name?: string;
        error?: { message: string; status: string };
      };

      if (result.error) {
        const isInvalid = INVALID_TOKEN_CODES.has(result.error.status);
        return {
          success: false,
          error: result.error.message,
          errorCode: isInvalid ? result.error.status : undefined,
        };
      }

      return { success: true, messageId: result.name };
    } catch (error) {
      return { success: false, error: extractErrorMessage(error) };
    }
  }

  /** Send to multiple tokens. One failure does not block others. */
  async sendBatch(messages: FcmMessage[]): Promise<FcmResponse[]> {
    return Promise.allSettled(messages.map((msg) => this.send(msg))).then((results) =>
      results.map((r) => (r.status === 'fulfilled' ? r.value : { success: false, error: String(r.reason) })),
    );
  }

  /** Send a notification to an FCM topic. */
  async sendToTopic(
    topic: string,
    title: string,
    body: string,
    data?: Record<string, string>,
  ): Promise<FcmResponse> {
    try {
      const token = await this.getAccessToken();

      const res = await fetch(
        `https://fcm.googleapis.com/v1/projects/${this.credentials.projectId}/messages:send`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: {
              topic,
              notification: { title, body },
              data: data ?? {},
            },
          }),
        },
      );

      const result = (await res.json()) as {
        name?: string;
        error?: { message: string; status: string };
      };

      if (result.error) {
        return { success: false, error: result.error.message, errorCode: result.error.status };
      }

      return { success: true, messageId: result.name };
    } catch (error) {
      return { success: false, error: extractErrorMessage(error) };
    }
  }

  /** Subscribe a token to an FCM topic. */
  async subscribeToTopic(token: string, topic: string): Promise<FcmResponse> {
    return this.topicAction('subscribe', token, topic);
  }

  /** Unsubscribe a token from an FCM topic. */
  async unsubscribeFromTopic(token: string, topic: string): Promise<FcmResponse> {
    return this.topicAction('unsubscribe', token, topic);
  }

  // ── internals ──────────────────────────────────────────────────────────

  private async topicAction(action: 'subscribe' | 'unsubscribe', token: string, topic: string): Promise<FcmResponse> {
    try {
      const accessToken = await this.getAccessToken();
      const method = action === 'subscribe' ? 'POST' : 'DELETE';
      const url =
        action === 'subscribe'
          ? `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`
          : `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`;

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const body = await res.text();
        return { success: false, error: `HTTP ${res.status}: ${body}` };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: extractErrorMessage(error) };
    }
  }

  private async getAccessToken(): Promise<string> {
    const now = Date.now();
    if (this.cachedToken && this.cachedToken.expiresAt > now + TOKEN_BUFFER_MS) {
      return this.cachedToken.value;
    }

    const token = await generateJwt(this.credentials);
    this.cachedToken = { value: token, expiresAt: now + TOKEN_LIFETIME_MS };
    return token;
  }
}

/** Backward-compatible standalone function (used by workers). */
export async function sendFcmPush(
  message: FcmMessage,
  projectId: string,
  clientEmail: string,
  privateKey: string,
): Promise<FcmResponse> {
  const svc = new FcmService({ projectId, clientEmail, privateKey });
  return svc.send(message);
}

/** Backward-compatible standalone batch function (used by workers). */
export async function sendFcmPushBatch(
  messages: FcmMessage[],
  projectId: string,
  clientEmail: string,
  privateKey: string,
): Promise<FcmResponse[]> {
  const svc = new FcmService({ projectId, clientEmail, privateKey });
  return svc.sendBatch(messages);
}

// ── JWT helpers (Web Crypto, works in Node 16+ and CF Workers) ──────────

async function generateJwt(c: FcmCredentials): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: c.clientEmail,
    scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const signInput = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(payload))}`;

  const keyData = c.privateKey
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\s/g, '');

  const binaryDer = Uint8Array.from(atob(keyData), (ch) => ch.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, new TextEncoder().encode(signInput));

  return `${signInput}.${base64Url(String.fromCharCode(...new Uint8Array(signature)))}`;
}

function base64Url(input: string): string {
  return btoa(input).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
