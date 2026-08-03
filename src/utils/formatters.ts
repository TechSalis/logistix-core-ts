/**
 * Canonical delivery status formatter.
 * Converts enum keys to human-readable title case.
 *
 * This is the single source of truth; all other formatters
 * (shared formatStatus, backend formatEnumToTitleCase, etc.)
 * should delegate here.
 */
function splitEnum(value: string): string {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function formatDeliveryStatus(status: string | undefined | null): string {
  if (!status) return 'Unknown';
  return splitEnum(status);
}

export function formatEnumToTitleCase(value: string | undefined | null): string {
  if (!value) return '';
  return splitEnum(value);
}
