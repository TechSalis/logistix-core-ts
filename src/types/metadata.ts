import type {
  PaymentProvider,
  PaymentStatus,
  EscalatedTo,
  EscalationStatus,
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
  outsourcedCut?: number;
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
  verificationNote?: string;
}

export interface CompanyMetadata {
  logoUrl?: string;
  cac?: string;
  nipostLicenseNumber?: string;
  address?: string;
  placeId?: string;
  verificationNote?: string;
  /** Written/read by the CAC verification cron. */
  cacVerification?: {
    status: 'FOUND' | 'INACTIVE' | 'NOT_FOUND' | 'ERROR';
    registeredName?: string | null;
    entityType?: string | null;
    cacStatus?: string | null;
    registrationDate?: string | null;
    checkedAt: string;
    nextCheckAt: string | null;
    attempts: number;
  };
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
