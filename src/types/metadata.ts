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

export interface CompanyChannelMetadata {
  phoneNumberId?: string;
  displayPhoneNumber?: string;
  credentials?: {
    accessToken?: string;
    [key: string]: unknown;
  };
  webhookUrl?: string;
  webhookVerified?: boolean;
  webhookVerifiedAt?: string;
  botEnabled?: boolean;
  aiDisabled?: boolean;
  removalRequested?: boolean;
  removalReason?: string;
  removalRequestedAt?: string;
}

export interface ExportRequestMetadata {
  userEmail?: string;
  requestedBy?: string;
  targetMonth?: string;
  riderId?: string;
  dataTypes?: string[];
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
}

export interface LedgerMetadata {
  type?: string;
  originalReference?: string;
}
