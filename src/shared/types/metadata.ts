import { z } from 'zod';
import type {
  PaymentProvider,
  PaymentStatus,
  EscalatedTo,
  EscalationStatus,
  CACEvidenceStatus,
} from '../enums/enums.js';
import {
  PaymentProvider as PaymentProviderEnum,
  PaymentStatus as PaymentStatusEnum,
} from '../enums/enums.js';

export interface ConversationMetadata {
  escalatedTo?: EscalatedTo;
  escalationStatus?: EscalationStatus;
  escalatedBy?: string;
  escalatedAt?: string;
  resolvedAt?: string;
  resolution?: Record<string, unknown>;
  timezone?: string;
  aiPausedUntil?: string | null;
  aiPermanentlyDisabled?: boolean;
}

export interface ChannelCredentials {
  accessToken: string;
  /** WhatsApp Business Account id (used for token refresh + webhook subscribe). */
  wabaId: string;
  /** Meta phone-number id (used for number verify + webhook subscribe). */
  phoneNumberId: string;
  /** Epoch ms when the access token expires; null = never. */
  tokenExpiresAt: number | null;
}

export interface CompanyChannelMetadata {
  phoneNumberId?: string;
  displayPhoneNumber?: string;
  credentials?: ChannelCredentials;
  webhookUrl?: string;
  webhookVerified?: boolean;
  webhookVerifiedAt?: string;
  botEnabled?: boolean;
  aiDisabled?: boolean;
  rejectionReason?: string;
  rejectedAt?: string;
  /** Set by the past-due cron when a company channel is deactivated for unpaid subscription. */
  deactivatedReason?: string;
}

export interface DeliveryMetadata {
  pickupPlaceId?: string;
  dropOffPlaceId?: string;
  dropOffState?: string;
  proofOfDeliveryImagePath?: string;
  fulfilledByCompanyId?: string;
  failReason?: string;
  failedAt?: string;
  instructions?: string;
  scheduledDayOffset?: number;
  scheduledTime?: string;
  paid?: boolean;
  paidAt?: string;
  paidVia?: PaymentProvider.SQUAD | 'BANK_TRANSFER' | 'CASH';
  paymentRequired?: boolean;
  paymentStatus?: PaymentStatus;
  paymentLinkGenerated?: boolean;
  paymentLinkGeneratedAt?: string;
  paymentSessionId?: string;
  /** Set by the cancel/modify handler when a delivery is cancelled. */
  cancelReason?: string;
  cancelledAt?: string;
  /** Set by the delivery-lifecycle escalation job when a PICKED_UP rider goes silent
   *  past `inTransitEscalateMinutes`. Used to suppress duplicate escalation notifications
   *  for the same continuous silent episode. Cleared when the rider regains liveness. */
  pickedUpEscalatedAt?: string;
  /** Set by the delivery-lifecycle escalation job when an IN_TRANSIT rider goes silent
   *  past `inTransitEscalateMinutes`. Distinct marker from `pickedUpEscalatedAt` since
   *  IN_TRANSIT (en route, no custody) and PICKED_UP (custody) are separate states with
   *  separate escalation paths. Cleared when the rider regains liveness. */
  inTransitEscalatedAt?: string;
  /** DELIVERY-scope custody-trail record written when an expiry sweep fails a delivery
   *  (or sets the machine custody suspension). `{ reason, riderId?, at }`. */
  lifecycleFailure?: { reason: string; riderId?: string; at: string };
  /** Set by the stale-assignment reassigner on each machine re-assignment. An ASSIGNED
   *  delivery whose `reassignedAt` falls within the stale-assignment cooldown window is
   *  skipped, preventing the rider-FCM/BUSY-flip churn loop on genuinely-unserviceable
   *  deliveries. Refreshed on every re-assignment. */
  reassignedAt?: string;
  /** Write-only: set when proof-of-delivery object promotion fails (no reader today). */
  proofPromotionFailed?: boolean;
}

export interface RiderMetadata {
  idType?: string;
  idNumber?: string;
  nin?: string;
  driverLicense?: string;
  passportNumber?: string;
  passportPhotoUrl?: string;
  vehicleVin?: string;
  vehiclePermitUrl?: string;
  photoUrl?: string;
  phoneNumber?: string;
  registrationNumber?: string;
  riderCardNumber?: string;
  currentState?: string;
  batteryLevel?: number;
  /** Epoch ms until which a silently-unresponsive rider is banned from reassignment. Written by the delivery-liveness job. */
  silentBanUntil?: number;
  /** Who set the shared `RiderStatus.SUSPENDED` flag:
   *  `'system:<offenseN>'` | `'dispatcher:<id>'` | `'admin:<id>'`. */
  suspendedBy?: string;
  /** Prior rider status captured at manual suspend time, restored by
   *  `unsuspendRider` so a manually-suspended rider resumes where they left off. */
  suspendedFrom?: string;
  /** Human-readable reason a manual (`dispatcher:`/`admin:`) suspension was applied. */
  suspensionReason?: string;
  /** "3 within clean window" machine-offense counter + review aggregate. */
  suspensionCount?: number;
  /** Bounded (newest-first) suspension ledger for ops review. */
  suspensionHistory?: Array<{
    at: string;
    by: string;
    reason: string;
    escalatedFrom?: string;
    offenseCount?: number;
  }>;
  /** Timestamp of the most recent silent-offense (PICKED_UP_SILENT) event. */
  lastSilentOffenseAt?: string;
  verificationNote?: string;
}

/**
 * CAC verification evidence block stored in `companies.metadata.cacVerification`.
 * SSOT: the workers' writer and the web admin's reader both derive from this.
 */
export interface CacVerificationEvidence {
  status: CACEvidenceStatus;
  registeredName?: string | null;
  entityType?: string | null;
  cacStatus?: string | null;
  registrationDate?: string | null;
  checkedAt: string;
  nextCheckAt: string | null;
  attempts: number;
}

export interface CompanyMetadata {
  logoUrl?: string;
  cac?: string;
  nipostLicenseNumber?: string;
  address?: string;
  placeId?: string;
  verificationNote?: string;
  /** Written/read by the CAC verification cron. */
  cacVerification?: CacVerificationEvidence;
}

export interface TransactionMetadata {
  userId?: string;
  platformId?: string;
  initializedAt?: string;
  deliveryCount?: number;
  channelFeePerDelivery?: number;
  narration?: string;
  squadResponse?: Record<string, unknown>;
  ledgerRestored?: boolean;
  error?: string;
  reconciledAt?: string;
  checkoutUrl?: string;
  fundWallet?: boolean;
  reason?: string;
  accountNumber?: string;
  bankCode?: string;
  originalReferences?: string[];
  trackingIds?: string[];
  requiresManualReconciliation?: boolean;
  failedAt?: string;
  receiptSessionId?: string;
  isPendingReceiptClaim?: boolean;
  /** Raw provider webhook payload captured when the payment was confirmed/created via webhook. */
  webhookPayload?: Record<string, unknown>;
  /** ISO timestamp of webhook/provider confirmation. */
  confirmedAt?: string;
  /** Set when a stale PENDING transaction is expired in favour of a replacement. */
  expiredAt?: string;
  expiredReason?: string;
  /** Set on a replacement transaction created after an amount-mismatch replacement. */
  isPartialPaymentContinuation?: boolean;
  /** Reference of the transaction this one continues/replaces. */
  originalReference?: string;
  /** Written by the billing event handler when a PAY_ON_DELIVERY ledger credit is issued. */
  deliveryId?: string;
  eventSource?: string;
  /** Write-only: set when a settlement is rolled back (no reader today). */
  rolledBackAt?: string;
}

export interface ChatMessageMetadata {
  latitude?: number;
  longitude?: number;
  parentId?: string;
  staleParentId?: string;
  pushName?: string;
  senderName?: string;
  mimeType?: string;
  mediaId?: string;
  visionExtraction?: string;
  displayPhoneNumber?: string;
  mediaUrl?: string;
  phoneNumberId?: string;
  displayPhoneNumberId?: string;
  /** AI tool actions executed for this message (read by turn-based-history). */
  executedActions?: Array<string | { type: string; success?: boolean; message?: string }>;
  /** Set when a message body is edited. */
  editedAt?: string;
  editCount?: number;
}

export interface LedgerMetadata {
  type?: string;
  originalReference?: string;
}

// ─── Metadata key registry (SSOT) ─────────────────────────────────────────────
//
// Every JSONB `metadata:` shape in the system is described by a flat key in
// `METADATA_KEYS`. Each key names the *value* written into a JSONB metadata
// column, scoped to the domain(s) it legally appears in. `buildMetadata` and
// `validateMetadata` are the narrow write-path helpers that consume this
// registry, so hand-spread metadata sites can stop diverging (~14 inline
// shapes collapsed onto this single catalog).
//
// `scope` is a single domain or a list of domains when a key legitimately
// appears in more than one (e.g. `verificationNote` in both RIDER and COMPANY;
// `phoneNumberId`/`displayPhoneNumber` in both CHANNEL and MESSAGE;
// `deliveryCount` in both TRANSACTION and LEDGER).

export type MetadataScope =
  | 'DELIVERY'
  | 'CONVERSATION'
  | 'MESSAGE'
  | 'COMPANY'
  | 'PICKUP'
  | 'TRANSACTION'
  | 'RIDER'
  | 'CHANNEL'
  | 'LEDGER'
  | 'EVENT'
  | 'MEMORY';

export interface MetadataKeySpec {
  /** Domain(s) where this key is a legal JSONB metadata member. */
  scope: MetadataScope | readonly MetadataScope[];
  /** Zod shape for the value. Optional fields must use `.optional()`/`.nullish()`. */
  shape: z.ZodType;
  /** Whether a payload built for this key's scope MUST include the key. */
  required: boolean;
}

export type MetadataKey = keyof typeof METADATA_KEYS;

const str = z.string();
const strNullish = z.string().nullish();
const num = z.number();
const numNullish = z.number().nullish();
const boolNullish = z.boolean().nullish();
const rec = z.record(z.string(), z.unknown());

/** Zod shape for `CacVerificationEvidence` (nested COMPANY metadata object). */
const cacEvidenceShape = z.object({
  status: z.string(),
  registeredName: z.string().nullish(),
  entityType: z.string().nullish(),
  cacStatus: z.string().nullish(),
  registrationDate: z.string().nullish(),
  checkedAt: z.string(),
  nextCheckAt: z.string().nullish(),
  attempts: z.number(),
});

/** Zod shape for `ChannelCredentials` (nested CHANNEL metadata object). */
const credentialsShape = z.object({
  accessToken: z.string(),
  wabaId: z.string(),
  phoneNumberId: z.string(),
  tokenExpiresAt: z.number().nullish(),
});

/** Zod shape for `ChatMessageMetadata.executedActions` (mixed string | object list). */
const executedActionsShape = z.array(
  z.union([
    z.string(),
    z.object({ type: z.string(), success: z.boolean().nullish(), message: z.string().nullish() }),
  ]),
);

/** One entry in the RIDER custody-suspension ledger (bounded, newest-first). */
const suspensionHistoryEntryShape = z.object({
  at: z.string(),
  by: z.string(),
  reason: z.string(),
  escalatedFrom: z.string().nullish(),
  offenseCount: z.number().nullish(),
});

/** Zod shape for the RIDER `suspensionHistory` ledger array. */
const suspensionHistoryShape = z.array(suspensionHistoryEntryShape);

/** Zod shape for the DELIVERY `lifecycleFailure` custody-trail object. */
const lifecycleFailureShape = z.object({
  reason: z.string(),
  riderId: z.string().nullish(),
  at: z.string(),
});

export const METADATA_KEYS = {
  // ── DELIVERY ──────────────────────────────────────────────────────────────
  pickupPlaceId: { scope: 'DELIVERY', shape: strNullish, required: false },
  dropOffPlaceId: { scope: 'DELIVERY', shape: strNullish, required: false },
  dropOffState: { scope: 'DELIVERY', shape: strNullish, required: false },
  proofOfDeliveryImagePath: { scope: 'DELIVERY', shape: strNullish, required: false },
  fulfilledByCompanyId: { scope: 'DELIVERY', shape: strNullish, required: false },
  failReason: { scope: 'DELIVERY', shape: strNullish, required: false },
  failedAt: { scope: ['DELIVERY', 'TRANSACTION'], shape: strNullish, required: false },
  instructions: { scope: 'DELIVERY', shape: strNullish, required: false },
  scheduledDayOffset: { scope: 'DELIVERY', shape: numNullish, required: false },
  scheduledTime: { scope: 'DELIVERY', shape: strNullish, required: false },
  paid: { scope: 'DELIVERY', shape: boolNullish, required: false },
  paidAt: { scope: 'DELIVERY', shape: strNullish, required: false },
  paidVia: {
    scope: 'DELIVERY',
    shape: z
      .union([z.nativeEnum(PaymentProviderEnum), z.literal('BANK_TRANSFER'), z.literal('CASH')])
      .nullish(),
    required: false,
  },
  paymentRequired: { scope: 'DELIVERY', shape: boolNullish, required: false },
  paymentStatus: {
    scope: 'DELIVERY',
    shape: z.nativeEnum(PaymentStatusEnum).nullish(),
    required: false,
  },
  paymentLinkGenerated: { scope: 'DELIVERY', shape: boolNullish, required: false },
  paymentLinkGeneratedAt: { scope: 'DELIVERY', shape: strNullish, required: false },
  paymentSessionId: { scope: 'DELIVERY', shape: strNullish, required: false },
  cancelReason: { scope: 'DELIVERY', shape: strNullish, required: false },
  cancelledAt: { scope: 'DELIVERY', shape: strNullish, required: false },
  pickedUpEscalatedAt: { scope: 'DELIVERY', shape: strNullish, required: false },
  inTransitEscalatedAt: { scope: 'DELIVERY', shape: strNullish, required: false },
  lifecycleFailure: { scope: 'DELIVERY', shape: lifecycleFailureShape.nullish(), required: false },
  reassignedAt: { scope: 'DELIVERY', shape: strNullish, required: false },
  proofPromotionFailed: { scope: 'DELIVERY', shape: boolNullish, required: false },

  // ── CONVERSATION ──────────────────────────────────────────────────────────
  escalatedTo: { scope: 'CONVERSATION', shape: strNullish, required: false },
  escalationStatus: { scope: 'CONVERSATION', shape: strNullish, required: false },
  escalatedBy: { scope: 'CONVERSATION', shape: strNullish, required: false },
  escalatedAt: { scope: 'CONVERSATION', shape: strNullish, required: false },
  resolvedAt: { scope: 'CONVERSATION', shape: strNullish, required: false },
  resolution: { scope: 'CONVERSATION', shape: rec.nullish(), required: false },
  timezone: { scope: 'CONVERSATION', shape: strNullish, required: false },
  aiPausedUntil: { scope: 'CONVERSATION', shape: strNullish, required: false },
  aiPermanentlyDisabled: { scope: 'CONVERSATION', shape: boolNullish, required: false },

  // ── COMPANY ───────────────────────────────────────────────────────────────
  logoUrl: { scope: 'COMPANY', shape: strNullish, required: false },
  cac: { scope: 'COMPANY', shape: strNullish, required: false },
  nipostLicenseNumber: { scope: 'COMPANY', shape: strNullish, required: false },
  address: { scope: 'COMPANY', shape: strNullish, required: false },
  placeId: { scope: 'COMPANY', shape: strNullish, required: false },
  verificationNote: { scope: ['RIDER', 'COMPANY'], shape: strNullish, required: false },
  cacVerification: { scope: 'COMPANY', shape: cacEvidenceShape.nullish(), required: false },

  // ── CHANNEL (company channel metadata) ────────────────────────────────────
  displayPhoneNumber: { scope: ['CHANNEL', 'MESSAGE'], shape: strNullish, required: false },
  credentials: { scope: 'CHANNEL', shape: credentialsShape.nullish(), required: false },
  webhookUrl: { scope: 'CHANNEL', shape: strNullish, required: false },
  webhookVerified: { scope: 'CHANNEL', shape: boolNullish, required: false },
  webhookVerifiedAt: { scope: 'CHANNEL', shape: strNullish, required: false },
  botEnabled: { scope: 'CHANNEL', shape: boolNullish, required: false },
  aiDisabled: { scope: 'CHANNEL', shape: boolNullish, required: false },
  rejectionReason: { scope: 'CHANNEL', shape: strNullish, required: false },
  rejectedAt: { scope: 'CHANNEL', shape: strNullish, required: false },
  deactivatedReason: { scope: 'CHANNEL', shape: strNullish, required: false },
  // phoneNumberId also lives in CHAT message metadata.
  phoneNumberId: { scope: ['CHANNEL', 'MESSAGE'], shape: strNullish, required: false },

  // ── TRANSACTION ───────────────────────────────────────────────────────────
  userId: { scope: 'TRANSACTION', shape: strNullish, required: false },
  platformId: { scope: 'TRANSACTION', shape: strNullish, required: false },
  initializedAt: { scope: 'TRANSACTION', shape: strNullish, required: false },
  deliveryCount: { scope: ['TRANSACTION', 'LEDGER'], shape: numNullish, required: false },
  channelFeePerDelivery: { scope: 'TRANSACTION', shape: numNullish, required: false },
  narration: { scope: 'TRANSACTION', shape: strNullish, required: false },
  squadResponse: { scope: 'TRANSACTION', shape: rec.nullish(), required: false },
  ledgerRestored: { scope: 'TRANSACTION', shape: boolNullish, required: false },
  error: { scope: 'TRANSACTION', shape: str.nullish(), required: false },
  reconciledAt: { scope: 'TRANSACTION', shape: strNullish, required: false },
  checkoutUrl: { scope: 'TRANSACTION', shape: strNullish, required: false },
  fundWallet: { scope: 'TRANSACTION', shape: boolNullish, required: false },
  reason: { scope: 'TRANSACTION', shape: strNullish, required: false },
  accountNumber: { scope: 'TRANSACTION', shape: strNullish, required: false },
  bankCode: { scope: 'TRANSACTION', shape: strNullish, required: false },
  originalReferences: { scope: 'TRANSACTION', shape: z.array(str).nullish(), required: false },
  trackingIds: { scope: 'TRANSACTION', shape: z.array(str).nullish(), required: false },
  requiresManualReconciliation: { scope: 'TRANSACTION', shape: boolNullish, required: false },
  receiptSessionId: { scope: 'TRANSACTION', shape: strNullish, required: false },
  isPendingReceiptClaim: { scope: 'TRANSACTION', shape: boolNullish, required: false },
  webhookPayload: { scope: 'TRANSACTION', shape: rec.nullish(), required: false },
  confirmedAt: { scope: 'TRANSACTION', shape: strNullish, required: false },
  expiredAt: { scope: 'TRANSACTION', shape: strNullish, required: false },
  expiredReason: { scope: 'TRANSACTION', shape: strNullish, required: false },
  isPartialPaymentContinuation: { scope: 'TRANSACTION', shape: boolNullish, required: false },
  originalReference: { scope: ['TRANSACTION', 'LEDGER'], shape: strNullish, required: false },
  deliveryId: { scope: 'TRANSACTION', shape: strNullish, required: false },
  eventSource: { scope: 'TRANSACTION', shape: strNullish, required: false },
  rolledBackAt: { scope: 'TRANSACTION', shape: strNullish, required: false },

  // ── MESSAGE (chat message metadata) ───────────────────────────────────────
  latitude: { scope: 'MESSAGE', shape: numNullish, required: false },
  longitude: { scope: 'MESSAGE', shape: numNullish, required: false },
  parentId: { scope: 'MESSAGE', shape: strNullish, required: false },
  staleParentId: { scope: 'MESSAGE', shape: strNullish, required: false },
  pushName: { scope: 'MESSAGE', shape: strNullish, required: false },
  senderName: { scope: 'MESSAGE', shape: strNullish, required: false },
  mimeType: { scope: 'MESSAGE', shape: strNullish, required: false },
  mediaId: { scope: 'MESSAGE', shape: strNullish, required: false },
  visionExtraction: { scope: 'MESSAGE', shape: strNullish, required: false },
  mediaUrl: { scope: 'MESSAGE', shape: strNullish, required: false },
  displayPhoneNumberId: { scope: 'MESSAGE', shape: strNullish, required: false },
  executedActions: { scope: 'MESSAGE', shape: executedActionsShape.nullish(), required: false },
  editedAt: { scope: 'MESSAGE', shape: strNullish, required: false },
  editCount: { scope: 'MESSAGE', shape: numNullish, required: false },

  // ── RIDER ─────────────────────────────────────────────────────────────────
  idType: { scope: 'RIDER', shape: strNullish, required: false },
  idNumber: { scope: 'RIDER', shape: strNullish, required: false },
  nin: { scope: 'RIDER', shape: strNullish, required: false },
  driverLicense: { scope: 'RIDER', shape: strNullish, required: false },
  passportNumber: { scope: 'RIDER', shape: strNullish, required: false },
  passportPhotoUrl: { scope: 'RIDER', shape: strNullish, required: false },
  vehicleVin: { scope: 'RIDER', shape: strNullish, required: false },
  vehiclePermitUrl: { scope: 'RIDER', shape: strNullish, required: false },
  photoUrl: { scope: 'RIDER', shape: strNullish, required: false },
  // NOTE: `phoneNumber` here is the RIDER-scope key; distinct from `phoneNumberId`.
  phoneNumber: { scope: 'RIDER', shape: strNullish, required: false },
  registrationNumber: { scope: 'RIDER', shape: strNullish, required: false },
  riderCardNumber: { scope: 'RIDER', shape: strNullish, required: false },
  currentState: { scope: 'RIDER', shape: strNullish, required: false },
  batteryLevel: { scope: 'RIDER', shape: numNullish, required: false },
  silentBanUntil: { scope: 'RIDER', shape: numNullish, required: false },
  suspendedBy: { scope: 'RIDER', shape: strNullish, required: false },
  suspendedFrom: { scope: 'RIDER', shape: strNullish, required: false },
  suspensionReason: { scope: 'RIDER', shape: strNullish, required: false },
  suspensionCount: { scope: 'RIDER', shape: numNullish, required: false },
  suspensionHistory: { scope: 'RIDER', shape: suspensionHistoryShape.nullish(), required: false },
  lastSilentOffenseAt: { scope: 'RIDER', shape: strNullish, required: false },

  // ── LEDGER (ledger transaction metadata) ──────────────────────────────────
  type: { scope: 'LEDGER', shape: strNullish, required: false },
  feePerDelivery: { scope: 'LEDGER', shape: num, required: true },
  totalFee: { scope: 'LEDGER', shape: num, required: true },
} as const satisfies Record<string, MetadataKeySpec>;

// `deliveryCount` is required in the LEDGER channel-fee payload even though the
// TRANSACTION-scope copy is optional. Registry entries carry a single `required`
// flag, so we model the required LEDGER usage by (checked below) and rely on the
// required-missing check upstream. Because `deliveryCount` is shared with
// TRANSACTION (optional), the LEDGER required check is enforced in buildMetadata
// for the LEDGER scope via REQUIRED_LEDGER_KEYS.

/** Keys that MUST appear in any LEDGER-scope payload. */
const REQUIRED_LEDGER_KEYS: readonly MetadataKey[] = [
  'feePerDelivery',
  'deliveryCount',
  'totalFee',
];

function scopeMatches(
  scope: MetadataScope | readonly MetadataScope[],
  domain: MetadataScope,
): boolean {
  return Array.isArray(scope) ? scope.includes(domain) : scope === domain;
}

/**
 * Build a clean JSONB metadata object for `domain` from `entries`.
 *
 * Validates every provided key against `METADATA_KEYS` (unknown key, wrong
 * scope, or shape violation all throw), drops keys whose value is `undefined`
 * (so no `undefined` keys leak into JSONB serialization), and enforces that
 * every `required` key for the domain is present. Returns a plain `Record`.
 */
export function buildMetadata(
  domain: MetadataScope,
  entries: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(entries)) {
    // Lightweight per-test unknown-key guard (handled below via scope check).
    const spec = (METADATA_KEYS as Record<string, MetadataKeySpec | undefined>)[key];
    if (!spec) {
      throw new Error(`Metadata key "${key}" is not registered for domain "${domain}"`);
    }
    if (!scopeMatches(spec.scope, domain)) {
      throw new Error(`Metadata key "${key}" is not valid for domain "${domain}"`);
    }
    if (value === undefined) continue;
    const parsed = spec.shape.safeParse(value);
    if (!parsed.success) {
      throw new Error(
        `Metadata key "${key}" failed validation for domain "${domain}": ${parsed.error.message}`,
      );
    }
    out[key] = value;
  }

  // Required-keys check (per-domain).
  const required =
    domain === 'LEDGER'
      ? REQUIRED_LEDGER_KEYS
      : (Object.keys(METADATA_KEYS).filter((k) => {
          const s = (METADATA_KEYS as Record<string, MetadataKeySpec>)[k];
          return s.required && scopeMatches(s.scope, domain);
        }) as MetadataKey[]);

  for (const key of required) {
    if (!(key in entries) || entries[key] === undefined) {
      throw new Error(`Metadata key "${key}" is required for domain "${domain}"`);
    }
  }

  return out;
}

/**
 * Runtime validator for the trust boundary (AI action payload → DB).
 * Asserts `value` is a valid `domain` metadata payload (or no payload at all),
 * throwing on unknown keys or shape violations. Returns void.
 */
export function validateMetadata(domain: MetadataScope, value: unknown): void {
  if (value === null || value === undefined) return;
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Metadata payload for domain "${domain}" must be a plain object`);
  }
  const entries = value as Record<string, unknown>;
  if (Object.keys(entries).length === 0) return;
  buildMetadata(domain, entries);
}
