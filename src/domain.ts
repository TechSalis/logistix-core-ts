/**
 * Shared domain entity base interfaces.
 *
 * These define the common fields that overlapping API response shapes
 * share across admin (REST) and business (GraphQL) consumers.
 * App-specific consumers should extend these with their own fields.
 */

export interface DeliveryBase {
  id: string;
  trackingId: string;
  status: string;
  pickupAddress: string | null;
  dropOffAddress: string;
  pickupPhone: string | null;
  dropOffPhone: string | null;
  price: number | null;
  description: string | null;
  scheduledAt: string | null;
  createdAt: string;
  rider: { id: string; fullName: string } | null;
  pool: boolean;
}

export interface RiderBase {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  status: string;
  approvalStatus: string | null;
  isAccepted: boolean;
}

export interface DispatcherBase {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  approvalStatus: string | null;
}
