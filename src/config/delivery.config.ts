import { DeliveryStatus } from '../enums/enums.js';

/**
 * Canonical delivery status transition rules (SSOT).
 *
 * The backend exposes these to clients via `clientConfig.rules.allowedStatusTransitions`
 * so every consumer (business web, Flutter) mirrors server business rules instead of
 * maintaining a drift-prone copy. Never define a second copy.
 */
export const ALLOWED_STATUS_TRANSITIONS: Readonly<
  Record<DeliveryStatus, readonly DeliveryStatus[]>
> = {
  [DeliveryStatus.PENDING]: [DeliveryStatus.ASSIGNED, DeliveryStatus.CANCELLED],
  [DeliveryStatus.ASSIGNED]: [
    DeliveryStatus.IN_TRANSIT,
    DeliveryStatus.PENDING,
    DeliveryStatus.CANCELLED,
  ],
  [DeliveryStatus.IN_TRANSIT]: [DeliveryStatus.DELIVERED, DeliveryStatus.CANCELLED],
  [DeliveryStatus.DELIVERED]: [],
  [DeliveryStatus.FAILED]: [],
  [DeliveryStatus.CANCELLED]: [],
};
