/**
 * Extracts a human-readable error message from any thrown value.
 *
 * Handles Error instances (including cause chains), strings, and unknown types.
 * Use this instead of inline `err instanceof Error ? err.message : String(err)`.
 *
 * @example
 * try {
 *   await doSomething();
 * } catch (err) {
 *   toast.error(extractErrorMessage(err));
 * }
 */
/**
 * Returns a structured error context for logger calls.
 * Single `instanceof Error` check — replaces the verbose
 * `{ error: extractErrorMessage(e), stack: e instanceof Error ? e.stack : undefined }` pattern.
 *
 * @example
 * logger.error('Something failed', extractErrorContext(err));
 */
export function extractErrorContext(error: unknown): { error: string; stack?: string } {
  return {
    error: extractErrorMessage(error),
    stack: error instanceof Error ? error.stack : undefined,
  };
}

export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const parts: string[] = [error.message];
    let cause = (error as { cause?: unknown }).cause;
    let depth = 0;
    while (cause instanceof Error && depth < 3) {
      parts.push(`cause: ${cause.message}`);
      cause = (cause as { cause?: unknown }).cause;
      depth++;
    }
    return parts.join(' | ');
  }
  if (typeof error === 'string') return error;
  return String(error);
}
