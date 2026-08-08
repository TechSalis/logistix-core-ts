import { describe, it, expect, expectTypeOf } from 'vitest';
import * as entry from '../src/index.js';
import {
  PaymentProvider,
  PaymentStatus,
  EscalatedTo,
  EscalationStatus,
} from '../src/enums/enums.js';
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

// The canonical metadata shapes live ONLY in src/types/metadata.ts. This suite
// locks the SSOT contract: every shape is exported from the package entry
// point and has exactly the fields listed below, so a writer on any platform
// (backend/workers/web/flutter) that drifts must do so explicitly.
const METADATA_KEYS = {
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
  ],
  DeliveryMetadata: [
    'pickupPlaceId',
    'dropOffPlaceId',
    'dropOffState',
    'proofOfDeliveryImagePath',
    'fulfilledByCompanyId',
    'outsourcedCut',
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
    'verificationNote',
  ],
  CompanyMetadata: [
    'logoUrl',
    'cac',
    'nipostLicenseNumber',
    'address',
    'placeId',
    'verificationNote',
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
  },
  DeliveryMetadata: {
    pickupPlaceId: 'place-1',
    dropOffPlaceId: 'place-2',
    dropOffState: 'LAGOS',
    proofOfDeliveryImagePath: 'proofs/1.jpg',
    fulfilledByCompanyId: 'company-2',
    outsourcedCut: 20000,
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
    verificationNote: 'verified',
  },
  CompanyMetadata: {
    logoUrl: 'logos/1.png',
    cac: 'RC-12345',
    nipostLicenseNumber: 'NIP-1',
    address: '1 Test Street',
    placeId: 'place-1',
    verificationNote: 'docs approved',
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
      (typeof METADATA_KEYS)['ConversationMetadata'][number]
    >();
    expectTypeOf<keyof ChannelCredentials>().toEqualTypeOf<
      (typeof METADATA_KEYS)['ChannelCredentials'][number]
    >();
    expectTypeOf<keyof CompanyChannelMetadata>().toEqualTypeOf<
      (typeof METADATA_KEYS)['CompanyChannelMetadata'][number]
    >();
    expectTypeOf<keyof DeliveryMetadata>().toEqualTypeOf<
      (typeof METADATA_KEYS)['DeliveryMetadata'][number]
    >();
    expectTypeOf<keyof RiderMetadata>().toEqualTypeOf<
      (typeof METADATA_KEYS)['RiderMetadata'][number]
    >();
    expectTypeOf<keyof CompanyMetadata>().toEqualTypeOf<
      (typeof METADATA_KEYS)['CompanyMetadata'][number]
    >();
    expectTypeOf<keyof TransactionMetadata>().toEqualTypeOf<
      (typeof METADATA_KEYS)['TransactionMetadata'][number]
    >();
    expectTypeOf<keyof ChatMessageMetadata>().toEqualTypeOf<
      (typeof METADATA_KEYS)['ChatMessageMetadata'][number]
    >();
    expectTypeOf<keyof LedgerMetadata>().toEqualTypeOf<
      (typeof METADATA_KEYS)['LedgerMetadata'][number]
    >();

    for (const [shape, keys] of Object.entries(METADATA_KEYS)) {
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
