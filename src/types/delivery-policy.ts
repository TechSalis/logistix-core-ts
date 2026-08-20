/**
 * Per-company delivery policy flags stored in `company_settings.metadata.deliveryPolicy`.
 *
 * All flags are optional in the DB shape — missing keys use the defaults
 * documented here. Consumer code reads:
 *   `settings.metadata?.deliveryPolicy?.rejectOutOfState ?? false`
 */
export interface DeliveryPolicy {
  /** Route out-of-state deliveries to the system pool instead of keeping them. */
  readonly rejectOutOfState?: boolean;
  /** Enforce company working hours. When false, the company accepts 24/7. */
  readonly enforceOperatingHours?: boolean;
  /** Allow dispatchers to skip the ALLOWED_STATUS_TRANSITIONS graph. */
  readonly allowManualStatusTransitions?: boolean;
  /** Block assignment until payment is confirmed. */
  readonly requirePaymentBeforeAssign?: boolean;
}

export const DEFAULT_DELIVERY_POLICY: Required<DeliveryPolicy> = {
  rejectOutOfState: false,
  enforceOperatingHours: true,
  allowManualStatusTransitions: false,
  requirePaymentBeforeAssign: true,
};

/**
 * Merges a partial delivery policy from DB metadata with defaults.
 * Returns a fully-resolved policy with every key populated.
 */
export function resolveDeliveryPolicy(
  raw: DeliveryPolicy | null | undefined,
): Required<DeliveryPolicy> {
  return { ...DEFAULT_DELIVERY_POLICY, ...raw };
}
