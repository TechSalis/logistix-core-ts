/**
 * Meta Graph API shared helpers.
 */

/** Meta long-lived token expiry: `expires_in` (seconds) → epoch ms. */
export function computeExpiresAt(expiresInSeconds: number): number {
  return Date.now() + expiresInSeconds * 1000;
}

/**
 * Extract a human-readable message from a Meta Graph API error body.
 * Returns a generic fallback when the shape is not a standard error object.
 */
export function parseGraphError(raw: unknown): string {
  if (raw && typeof raw === 'object') {
    const error = (raw as { error?: { message?: unknown; code?: unknown; type?: unknown } }).error;
    if (error && typeof error === 'object') {
      const parts: string[] = [];
      if (typeof error.type === 'string') parts.push(error.type);
      if (typeof error.code === 'number' || typeof error.code === 'string')
        parts.push(String(error.code));
      if (typeof error.message === 'string') parts.push(error.message);
      if (parts.length > 0) return parts.join(': ');
    }
  }
  return 'Meta Graph API error';
}
