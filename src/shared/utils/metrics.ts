export function mergeChannelCounts(
  prev: Record<string, number> | undefined,
  next: Record<string, number> | undefined,
): Record<string, number> {
  const merged: Record<string, number> = { ...(prev ?? {}) };
  for (const [key, value] of Object.entries(next ?? {})) {
    merged[key] = (merged[key] ?? 0) + value;
  }
  return merged;
}
