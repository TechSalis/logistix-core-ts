import { describe, it, expect, expectTypeOf } from 'vitest';
import * as entry from '../src/index.js';
import {
  PaymentProvider,
  PaymentStatus,
  EscalatedTo,
  EscalationStatus,
  RiderStatus,
} from '../src/shared/enums/enums.js';
import type {
  ConversationMetadata,
  ChannelCredentials,
  CompanyChannelMetadata,
  DeliveryMetadata,
  RiderMetadata,
  CompanyMetadata,
  TransactionMetadata,
  ChatMessageMetadata,
  LedgerMetadata,
} from '../src/index.js';
import {
  METADATA_KEYS,
  buildMetadata,
  validateMetadata,
  type MetadataScope,
} from '../src/shared/index.js';

// The canonical metadata shapes live ONLY in src/types/metadata.ts. This suite
// locks the SSOT contract: every shape is exported from the package entry
// point and has exactly the fields listed below, so a writer on any platform
// (backend/workers/web/flutter) that drifts must do so explicitly.
const METADATA_FIELD_NAMES = {
  ConversationMetadata: [
    'escalatedTo',
    'escalationStatus',
    'escalatedBy',
    'escalatedAt',
    'resolvedAt',
    'resolution',
    'timezone',
    'aiPausedUntil',
    'aiPermanentlyDisabled',
  ],
  ChannelCredentials: ['accessToken', 'wabaId', 'phoneNumberId', 'tokenExpiresAt'],
  CompanyChannelMetadata: [
    'phoneNumberId',
    'displayPhoneNumber',
    'credentials',
    'webhookUrl',
    'webhookVerified',
    'webhookVerifiedAt',
    'botEnabled',
    'aiDisabled',
    'rejectionReason',
    'rejectedAt',
    'deactivatedReason',
  ],
  DeliveryMetadata: [
    'pickupPlaceId',
    'dropOffPlaceId',
    'dropOffState',
    'proofOfDeliveryImagePath',
    'fulfilledByCompanyId',
    'failReason',
    'failedAt',
    'instructions',
    'scheduledDayOffset',
    'scheduledTime',
    'paid',
    'paidAt',
    'paidVia',
    'paymentRequired',
    'paymentStatus',
    'paymentLinkGenerated',
    'paymentLinkGeneratedAt',
    'paymentSessionId',
    'cancelReason',
    'cancelledAt',
    'inTransitEscalatedAt',
    'lifecycleFailure',
    'proofPromotionFailed',
  ],
  RiderMetadata: [
    'idType',
    'idNumber',
    'nin',
    'driverLicense',
    'passportNumber',
    'passportPhotoUrl',
    'vehicleVin',
    'vehiclePermitUrl',
    'photoUrl',
    'phoneNumber',
    'registrationNumber',
    'riderCardNumber',
    'currentState',
    'batteryLevel',
    'suspendedBy',
    'suspensionCount',
    'suspensionHistory',
    'lastSilentOffenseAt',
    'verificationNote',
  ],
  CompanyMetadata: [
    'logoUrl',
    'cac',
    'nipostLicenseNumber',
    'address',
    'placeId',
    'verificationNote',
    'cacVerification',
  ],
  TransactionMetadata: [
    'userId',
    'platformId',
    'initializedAt',
    'deliveryCount',
    'channelFeePerDelivery',
    'narration',
    'squadResponse',
    'ledgerRestored',
    'error',
    'reconciledAt',
    'checkoutUrl',
    'fundWallet',
    'reason',
    'accountNumber',
    'bankCode',
    'originalReferences',
    'trackingIds',
    'requiresManualReconciliation',
    'failedAt',
    'receiptSessionId',
    'isPendingReceiptClaim',
    'webhookPayload',
    'confirmedAt',
    'expiredAt',
    'expiredReason',
    'isPartialPaymentContinuation',
    'originalReference',
    'deliveryId',
    'eventSource',
    'rolledBackAt',
  ],
  ChatMessageMetadata: [
    'latitude',
    'longitude',
    'parentId',
    'staleParentId',
    'pushName',
    'senderName',
    'mimeType',
    'mediaId',
    'visionExtraction',
    'displayPhoneNumber',
    'mediaUrl',
    'phoneNumberId',
    'displayPhoneNumberId',
    'executedActions',
    'editedAt',
    'editCount',
  ],
  LedgerMetadata: ['type', 'originalReference'],
} as const;

const SAMPLES: Record<string, Record<string, unknown>> = {
  ConversationMetadata: {
    escalatedTo: EscalatedTo.COMPANY,
    escalationStatus: EscalationStatus.OPEN,
    escalatedBy: 'user-1',
    escalatedAt: '2026-01-01T00:00:00.000Z',
    resolvedAt: '2026-01-02T00:00:00.000Z',
    resolution: { outcome: 'refunded' },
    timezone: 'Africa/Lagos',
    aiPausedUntil: '2026-02-01T00:00:00.000Z',
    aiPermanentlyDisabled: false,
  },
  ChannelCredentials: {
    accessToken: 'token',
    wabaId: 'waba-1',
    phoneNumberId: 'phone-1',
    tokenExpiresAt: 1767312000000,
  },
  CompanyChannelMetadata: {
    phoneNumberId: 'phone-1',
    displayPhoneNumber: '+2348000000000',
    credentials: {
      accessToken: 'token',
      wabaId: 'waba-1',
      phoneNumberId: 'phone-1',
      tokenExpiresAt: null,
    },
    webhookUrl: 'https://example.com/webhook',
    webhookVerified: true,
    webhookVerifiedAt: '2026-01-01T00:00:00.000Z',
    botEnabled: true,
    aiDisabled: false,
    rejectionReason: 'docs missing',
    rejectedAt: '2026-01-01T00:00:00.000Z',
    deactivatedReason: 'Subscription cancelled - payment overdue',
  },
  DeliveryMetadata: {
    pickupPlaceId: 'place-1',
    dropOffPlaceId: 'place-2',
    dropOffState: 'LAGOS',
    proofOfDeliveryImagePath: 'proofs/1.jpg',
    fulfilledByCompanyId: 'company-2',
    failReason: 'no rider',
    failedAt: '2026-01-01T00:00:00.000Z',
    instructions: 'call on arrival',
    scheduledDayOffset: 1,
    scheduledTime: '14:00',
    paid: true,
    paidAt: '2026-01-01T00:00:00.000Z',
    paidVia: PaymentProvider.SQUAD,
    paymentRequired: true,
    paymentStatus: PaymentStatus.COMPLETED,
    paymentLinkGenerated: true,
    paymentLinkGeneratedAt: '2026-01-01T00:00:00.000Z',
    paymentSessionId: 'session-1',
    cancelReason: 'Customer changed mind',
    cancelledAt: '2026-01-01T00:00:00.000Z',
    inTransitEscalatedAt: '2026-01-01T00:00:00.000Z',
    lifecycleFailure: {
      reason: 'IN_TRANSIT_SILENT',
      riderId: 'rider-1',
      at: '2026-01-01T00:00:00.000Z',
    },
    proofPromotionFailed: true,
  },
  RiderMetadata: {
    idType: 'NIN',
    idNumber: 'id-1',
    nin: 'nin-1',
    driverLicense: 'dl-1',
    passportNumber: 'pp-1',
    passportPhotoUrl: 'photos/1.jpg',
    vehicleVin: 'vin-1',
    vehiclePermitUrl: 'permits/1.jpg',
    photoUrl: 'photos/rider.jpg',
    phoneNumber: '+2348000000000',
    registrationNumber: 'reg-1',
    riderCardNumber: 'card-1',
    currentState: 'LAGOS',
    batteryLevel: 80,
    suspendedBy: 'system:3',
    suspensionCount: 3,
    suspensionHistory: [
      {
        at: '2026-09-01T00:00:00.000Z',
        by: 'system:3',
        reason: 'PICKED_UP_SILENT',
        escalatedFrom: 'PICKED_UP',
        offenseCount: 3,
      },
    ],
    lastSilentOffenseAt: '2026-09-01T00:00:00.000Z',
    verificationNote: 'verified',
  },
  CompanyMetadata: {
    logoUrl: 'logos/1.png',
    cac: 'RC-12345',
    nipostLicenseNumber: 'NIP-1',
    address: '1 Test Street',
    placeId: 'place-1',
    verificationNote: 'docs approved',
    cacVerification: {
      status: 'FOUND',
      registeredName: 'Test Co',
      entityType: 'RC',
      cacStatus: 'ACTIVE',
      registrationDate: '2020-01-01',
      checkedAt: '2026-01-01T00:00:00.000Z',
      nextCheckAt: null,
      attempts: 1,
    },
  },
  TransactionMetadata: {
    userId: 'user-1',
    platformId: 'platform-1',
    initializedAt: '2026-01-01T00:00:00.000Z',
    deliveryCount: 2,
    channelFeePerDelivery: 200,
    narration: 'payment for deliveries',
    squadResponse: { status: 'SUCCESS' },
    ledgerRestored: false,
    error: null,
    reconciledAt: '2026-01-01T00:00:00.000Z',
    checkoutUrl: 'https://checkout.example.com/tx',
    fundWallet: true,
    reason: 'top-up',
    accountNumber: '0123456789',
    bankCode: '011',
    originalReferences: ['ref-1', 'ref-2'],
    trackingIds: ['track-1', 'track-2'],
    requiresManualReconciliation: false,
    failedAt: null,
    receiptSessionId: 'receipt-1',
    isPendingReceiptClaim: true,
    webhookPayload: { status: 'SUCCESS' },
    confirmedAt: '2026-01-01T00:00:00.000Z',
    expiredAt: '2026-01-01T00:00:00.000Z',
    expiredReason: 'amount_mismatch_replaced',
    isPartialPaymentContinuation: true,
    originalReference: 'TX-ref-0',
    deliveryId: 'delivery-1',
    eventSource: 'DELIVERY_DELIVERED',
    rolledBackAt: '2026-01-01T00:00:00.000Z',
  },
  ChatMessageMetadata: {
    latitude: 6.5244,
    longitude: 3.3792,
    parentId: 'msg-0',
    staleParentId: 'msg-0',
    pushName: 'Ada',
    senderName: 'Ada',
    mimeType: 'image/jpeg',
    mediaId: 'media-1',
    visionExtraction: 'a receipt',
    displayPhoneNumber: '+2348000000000',
    mediaUrl: 'https://media.example.com/1.jpg',
    phoneNumberId: 'phone-1',
    displayPhoneNumberId: 'phone-1',
    executedActions: [{ type: 'BOOK_DELIVERY', success: true }],
    editedAt: '2026-01-01T00:00:00.000Z',
    editCount: 2,
  },
  LedgerMetadata: {
    type: 'MANUAL_ADJUSTMENT',
    originalReference: 'ref-1',
  },
};

// Compile-time pins: the entry point must export each shape, and each
// interface's field set is exactly the list above. Enforced by
// `npm run test:typecheck` (tsconfig.test.json); the runtime tests below
// additionally lock the documented key lists.
describe('metadata SSOT contract', () => {
  it('exports every metadata type from the package entry point', () => {
    expectTypeOf<entry.ConversationMetadata>().toEqualTypeOf<ConversationMetadata>();
    expectTypeOf<entry.ChannelCredentials>().toEqualTypeOf<ChannelCredentials>();
    expectTypeOf<entry.CompanyChannelMetadata>().toEqualTypeOf<CompanyChannelMetadata>();
    expectTypeOf<entry.DeliveryMetadata>().toEqualTypeOf<DeliveryMetadata>();
    expectTypeOf<entry.RiderMetadata>().toEqualTypeOf<RiderMetadata>();
    expectTypeOf<entry.CompanyMetadata>().toEqualTypeOf<CompanyMetadata>();
    expectTypeOf<entry.TransactionMetadata>().toEqualTypeOf<TransactionMetadata>();
    expectTypeOf<entry.ChatMessageMetadata>().toEqualTypeOf<ChatMessageMetadata>();
    expectTypeOf<entry.LedgerMetadata>().toEqualTypeOf<LedgerMetadata>();
  });

  it('pins the exact field names of every metadata interface', () => {
    expectTypeOf<keyof ConversationMetadata>().toEqualTypeOf<
      (typeof METADATA_FIELD_NAMES)['ConversationMetadata'][number]
    >();
    expectTypeOf<keyof ChannelCredentials>().toEqualTypeOf<
      (typeof METADATA_FIELD_NAMES)['ChannelCredentials'][number]
    >();
    expectTypeOf<keyof CompanyChannelMetadata>().toEqualTypeOf<
      (typeof METADATA_FIELD_NAMES)['CompanyChannelMetadata'][number]
    >();
    expectTypeOf<keyof DeliveryMetadata>().toEqualTypeOf<
      (typeof METADATA_FIELD_NAMES)['DeliveryMetadata'][number]
    >();
    expectTypeOf<keyof RiderMetadata>().toEqualTypeOf<
      (typeof METADATA_FIELD_NAMES)['RiderMetadata'][number]
    >();
    expectTypeOf<keyof CompanyMetadata>().toEqualTypeOf<
      (typeof METADATA_FIELD_NAMES)['CompanyMetadata'][number]
    >();
    expectTypeOf<keyof TransactionMetadata>().toEqualTypeOf<
      (typeof METADATA_FIELD_NAMES)['TransactionMetadata'][number]
    >();
    expectTypeOf<keyof ChatMessageMetadata>().toEqualTypeOf<
      (typeof METADATA_FIELD_NAMES)['ChatMessageMetadata'][number]
    >();
    expectTypeOf<keyof LedgerMetadata>().toEqualTypeOf<
      (typeof METADATA_FIELD_NAMES)['LedgerMetadata'][number]
    >();

    for (const [shape, keys] of Object.entries(METADATA_FIELD_NAMES)) {
      expect(Object.keys(SAMPLES[shape]).sort()).toEqual([...keys].sort());
    }
  });

  it('round-trips a sample of every metadata shape through JSON without loss', () => {
    for (const sample of Object.values(SAMPLES)) {
      const roundTripped = JSON.parse(JSON.stringify(sample)) as Record<string, unknown>;
      expect(roundTripped).toEqual(sample);
      expect(Object.keys(roundTripped).sort()).toEqual(Object.keys(sample).sort());
    }
  });
});

// ─── buildMetadata / validateMetadata / METADATA_KEYS registry ───────────────

describe('metadata registry + build/validate helpers', () => {
  it('registers a known live key for every delivery-write field', () => {
    expect(METADATA_KEYS.pickupPlaceId).toBeDefined();
    expect(METADATA_KEYS.dropOffPlaceId).toBeDefined();
    expect(METADATA_KEYS.channelFeePerDelivery).toBeDefined();
    expect(METADATA_KEYS.fulfilledByCompanyId).toBeDefined();
    expect(METADATA_KEYS.verificationNote).toBeDefined();
  });

  it('every key has scope + shape + required', () => {
    for (const spec of Object.values(METADATA_KEYS)) {
      expect(['string', 'object']).toContain(typeof spec.scope);
      expect(spec.shape).toBeDefined();
      expect(typeof spec.required).toBe('boolean');
    }
  });

  it('every interface field maps to a registered key (no orphan fields)', () => {
    // Each named key must exist in the registry — guards against a field added
    // to an interface but never given a zod shape. `ChannelCredentials`' fields
    // are nested under the `credentials` object key, so they are intentionally
    // not standalone registry keys.
    const namedFields = [
      ...new Set(
        Object.values(METADATA_KEYS_MEMBER_NAMES).filter(
          (name) => name !== 'accessToken' && name !== 'wabaId' && name !== 'tokenExpiresAt',
        ),
      ),
    ];
    for (const field of namedFields) {
      expect(METADATA_KEYS[field as keyof typeof METADATA_KEYS]).toBeDefined();
    }
  });
});

// Field-name snapshot for the orphan-guard above (derived from the SAMPLES keys).
const METADATA_KEYS_MEMBER_NAMES: string[] = Object.values(
  Object.fromEntries(Object.entries(SAMPLES).map(([shape, sample]) => [shape, Object.keys(sample)])),
).flat();

describe('buildMetadata', () => {
  it('accepts a MetadataScope-typed domain', () => {
    const scope: MetadataScope = 'CONVERSATION';
    const out = buildMetadata(scope, { escalatedTo: EscalatedTo.ADMIN });
    expect(out).toEqual({ escalatedTo: EscalatedTo.ADMIN });
  });

  it('round-trips a valid RIDER metadata payload', () => {
    const out = buildMetadata('RIDER', { batteryLevel: 80, currentState: 'LAGOS' });
    expect(out).toEqual({ batteryLevel: 80, currentState: 'LAGOS' });
  });

  it('accepts silentBanUntil as a RIDER metadata key', () => {
    const out = buildMetadata('RIDER', { silentBanUntil: 1_750_000_000_000 });
    expect(out).toEqual({ silentBanUntil: 1_750_000_000_000 });
    expect(() => validateMetadata('RIDER', { silentBanUntil: 'soon' })).toThrow();
  });

  it('round-trips a valid DELIVERY metadata payload', () => {
    const out = buildMetadata('DELIVERY', {
      pickupPlaceId: 'place-1',
      paymentRequired: true,
    });
    expect(out).toEqual({ pickupPlaceId: 'place-1', paymentRequired: true });
  });

  it('round-trips a valid LEDGER channel-fee payload', () => {
    const out = buildMetadata('LEDGER', {
      feePerDelivery: 200,
      deliveryCount: 3,
      totalFee: 600,
    });
    expect(out).toEqual({ feePerDelivery: 200, deliveryCount: 3, totalFee: 600 });
  });

  it('throws on a required key that is missing', () => {
    expect(() => buildMetadata('LEDGER', { feePerDelivery: 200 })).toThrow();
  });

  it('throws on an unknown key', () => {
    expect(() => buildMetadata('DELIVERY', { notARealKey: 'x' })).toThrow();
  });

  it('throws on a key registered for a different scope', () => {
    // phoneNumberId is registered under CHANNEL/MESSAGE, not DELIVERY.
    expect(() => buildMetadata('DELIVERY', { phoneNumberId: 'p1' })).toThrow();
  });

  it('throws on a shape violation (wrong value type)', () => {
    expect(() => buildMetadata('RIDER', { batteryLevel: 'eighty' })).toThrow();
  });

  it('emits a clean object with no undefined keys present', () => {
    const out = buildMetadata('DELIVERY', {
      pickupPlaceId: 'place-1',
      failReason: undefined,
    });
    expect('failReason' in out).toBe(false);
    expect(Object.keys(out)).toEqual(['pickupPlaceId']);
  });

  it('is permissive about empty explicit values (null/empty object tolerated)', () => {
    expect(() => buildMetadata('DELIVERY', { pickupPlaceId: 'p', dropOffPlaceId: null })).not.toThrow();
  });
});

describe('validateMetadata', () => {
  it('accepts a valid DELIVERY metadata object', () => {
    expect(() =>
      validateMetadata('DELIVERY', { pickupPlaceId: 'place-1', paymentRequired: true }),
    ).not.toThrow();
  });

  it('accepts an empty object / null / undefined (no metadata)', () => {
    expect(() => validateMetadata('DELIVERY', {})).not.toThrow();
    expect(() => validateMetadata('DELIVERY', null)).not.toThrow();
    expect(() => validateMetadata('DELIVERY', undefined)).not.toThrow();
  });

  it('rejects an unknown key', () => {
    expect(() => validateMetadata('DELIVERY', { evil: 'x' })).toThrow();
  });

  it('rejects a shape violation', () => {
    expect(() => validateMetadata('RIDER', { batteryLevel: 'eighty' })).toThrow();
  });

  it('rejects a non-object payload', () => {
    expect(() => validateMetadata('DELIVERY', 'nope' as unknown)).toThrow();
  });
});

// ─── custody-suspension metadata + shared SUSPENDED flag ────────────────────

describe('custody-suspension metadata + shared SUSPENDED flag', () => {
  it('registers the custody-suspension RIDER keys', () => {
    expect(METADATA_KEYS.suspendedBy).toBeDefined();
    expect(METADATA_KEYS.suspensionCount).toBeDefined();
    expect(METADATA_KEYS.suspensionHistory).toBeDefined();
    expect(METADATA_KEYS.lastSilentOffenseAt).toBeDefined();
    expect(METADATA_KEYS.inTransitEscalatedAt).toBeDefined();
    expect(METADATA_KEYS.lifecycleFailure).toBeDefined();
  });

  it('exposes the new RiderMetadata fields', () => {
    expectTypeOf<RiderMetadata>().toHaveProperty('suspendedBy');
    expectTypeOf<RiderMetadata>().toHaveProperty('suspensionCount');
    expectTypeOf<RiderMetadata>().toHaveProperty('suspensionHistory');
    expectTypeOf<RiderMetadata>().toHaveProperty('lastSilentOffenseAt');
  });

  it('exposes DeliveryMetadata custody-trail fields', () => {
    expectTypeOf<DeliveryMetadata>().toHaveProperty('inTransitEscalatedAt');
    expectTypeOf<DeliveryMetadata>().toHaveProperty('lifecycleFailure');
  });

  it('RiderStatus has SUSPENDED (shared ban flag)', () => {
    expect(RiderStatus.SUSPENDED).toBe('SUSPENDED');
  });

  it('round-trips the suspension ledger keys through buildMetadata', () => {
    const out = buildMetadata('RIDER', {
      suspendedBy: 'system:3',
      suspensionCount: 3,
      suspensionHistory: [
        {
          at: '2026-09-01T00:00:00.000Z',
          by: 'system:3',
          reason: 'PICKED_UP_SILENT',
          escalatedFrom: 'PICKED_UP',
          offenseCount: 3,
        },
      ],
      lastSilentOffenseAt: '2026-09-01T00:00:00.000Z',
    });
    expect(out.suspensionCount).toBe(3);
    expect(out.suspendedBy).toBe('system:3');
    expect(Array.isArray(out.suspensionHistory)).toBe(true);
  });

  it('round-trips the DELIVERY custody-trail keys through buildMetadata', () => {
    const out = buildMetadata('DELIVERY', {
      inTransitEscalatedAt: '2026-09-01T00:00:00.000Z',
      lifecycleFailure: {
        reason: 'PICKED_UP_SILENT',
        riderId: 'rider-1',
        at: '2026-09-01T00:00:00.000Z',
      },
    });
    expect(out.inTransitEscalatedAt).toBe('2026-09-01T00:00:00.000Z');
    expect((out.lifecycleFailure as { reason: string }).reason).toBe('PICKED_UP_SILENT');
  });
});
