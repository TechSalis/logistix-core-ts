import { p as DeliveryStatus, e as ApprovalStatus, Z as RiderStatus, C as CACEvidenceStatus, u as EscalatedTo, v as EscalationStatus, T as PaymentProvider, U as PaymentStatus, D as DayOfWeek, a5 as SubscriptionTier, ab as VehicleType, x as ExportDataType, O as MetricGranularity, N as MetricDomain, i as ChannelType, a4 as SubscriptionStatus, j as CompanyAccessLevel } from '../retry-BJLQl3Pg.js';
export { A as ALL_DAYS, a as AdminDeliveryAction, b as AdminEscalationAction, c as AdminRole, d as ApiTag, f as AuditActorType, g as CAC_EVIDENCE_STATUS, h as ChannelPlatform, k as CompanyChannelStatus, l as ContactCategory, m as ConversationHandlerType, n as ConversationScope, o as DeliveryExpiryReason, q as DeliverySyncScope, r as DevicePlatform, s as DispatcherRole, E as EntityType, t as ErrorCode, w as EventType, y as ExportReason, F as FcmNotificationType, I as IdType, J as JobType, z as JwtTokenType, L as LEAD_CATEGORIES, B as LedgerAdjustmentType, G as LlmRole, H as LogLevel, M as MESSAGE_STATUS_RANK, K as MessageStatus, P as NOTIFICATION_PRIORITY, Q as NodeEnv, R as NotificationPriority, S as PaymentMethod, V as ProviderCapability, W as ProviderRole, X as RETRYABLE_NETWORK_ERROR_CODES, Y as RETRYABLE_SQLSTATE_CODES, _ as SecurityEventType, $ as SecuritySeverity, a0 as SenderType, a1 as SseEventType, a2 as SubscriptionEventType, a3 as SubscriptionHealth, a6 as SystemStatus, a7 as TransactionStatus, a8 as TransactionType, a9 as UserAuditAction, aa as UserRole, ac as WithRetryOptions, ad as isTransientHttpError, ae as safeEnumValue, af as sleep, ag as withRetry } from '../retry-BJLQl3Pg.js';
import { z } from 'zod';

interface EnumValue {
    name: string;
    label: string;
}
interface EnumCatalog {
    exportDataTypes: EnumValue[];
    vehicleTypes: EnumValue[];
    deliveryStatuses: EnumValue[];
    riderStatuses: EnumValue[];
    approvalStatuses: EnumValue[];
    subscriptionTiers: EnumValue[];
    subscriptionStatuses: EnumValue[];
    channelPlatforms: EnumValue[];
    channelTypes: EnumValue[];
    paymentMethods: EnumValue[];
    transactionStatuses: EnumValue[];
    metricDomains: EnumValue[];
    metricGranularities: EnumValue[];
}
declare const ENUM_CATALOG: EnumCatalog;

interface DeliveryBase {
    id: string;
    trackingId: string;
    status: DeliveryStatus;
    pickupAddress: string | null;
    dropOffAddress: string;
    pickupPhone: string | null;
    dropOffPhone: string | null;
    price: number | null;
    description: string | null;
    scheduledAt: string | null;
    scheduledAtEnd: string | null;
    createdAt: string;
    rider: {
        id: string;
        fullName: string;
    } | null;
    pool: boolean;
    dropOffState: string | null;
    vehicleType: string;
}
interface RiderBase {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string | null;
    status: RiderStatus;
    approvalStatus: ApprovalStatus | null;
}
interface DispatcherBase {
    id: string;
    fullName: string;
    email: string;
    approvalStatus: ApprovalStatus | null;
}

interface ConversationMetadata {
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
interface ChannelCredentials {
    accessToken: string;
    /** WhatsApp Business Account id (used for token refresh + webhook subscribe). */
    wabaId: string;
    /** Meta phone-number id (used for number verify + webhook subscribe). */
    phoneNumberId: string;
    /** Epoch ms when the access token expires; null = never. */
    tokenExpiresAt: number | null;
}
interface CompanyChannelMetadata {
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
interface DeliveryMetadata {
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
    lifecycleFailure?: {
        reason: string;
        riderId?: string;
        at: string;
    };
    /** Set by the stale-assignment reassigner on each machine re-assignment. An ASSIGNED
     *  delivery whose `reassignedAt` falls within the stale-assignment cooldown window is
     *  skipped, preventing the rider-FCM/BUSY-flip churn loop on genuinely-unserviceable
     *  deliveries. Refreshed on every re-assignment. */
    reassignedAt?: string;
    /** Write-only: set when proof-of-delivery object promotion fails (no reader today). */
    proofPromotionFailed?: boolean;
}
interface RiderMetadata {
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
interface CacVerificationEvidence {
    status: CACEvidenceStatus;
    registeredName?: string | null;
    entityType?: string | null;
    cacStatus?: string | null;
    registrationDate?: string | null;
    checkedAt: string;
    nextCheckAt: string | null;
    attempts: number;
}
interface CompanyMetadata {
    logoUrl?: string;
    cac?: string;
    nipostLicenseNumber?: string;
    address?: string;
    placeId?: string;
    verificationNote?: string;
    /** Written/read by the CAC verification cron. */
    cacVerification?: CacVerificationEvidence;
}
interface TransactionMetadata {
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
interface ChatMessageMetadata {
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
    executedActions?: Array<string | {
        type: string;
        success?: boolean;
        message?: string;
    }>;
    /** Set when a message body is edited. */
    editedAt?: string;
    editCount?: number;
}
interface LedgerMetadata {
    type?: string;
    originalReference?: string;
}
type MetadataScope = 'DELIVERY' | 'CONVERSATION' | 'MESSAGE' | 'COMPANY' | 'PICKUP' | 'TRANSACTION' | 'RIDER' | 'CHANNEL' | 'LEDGER' | 'EVENT' | 'MEMORY';
interface MetadataKeySpec {
    /** Domain(s) where this key is a legal JSONB metadata member. */
    scope: MetadataScope | readonly MetadataScope[];
    /** Zod shape for the value. Optional fields must use `.optional()`/`.nullish()`. */
    shape: z.ZodType;
    /** Whether a payload built for this key's scope MUST include the key. */
    required: boolean;
}
type MetadataKey = keyof typeof METADATA_KEYS;
declare const METADATA_KEYS: {
    readonly pickupPlaceId: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly dropOffPlaceId: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly dropOffState: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly proofOfDeliveryImagePath: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly fulfilledByCompanyId: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly failReason: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly failedAt: {
        readonly scope: readonly ["DELIVERY", "TRANSACTION"];
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly instructions: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly scheduledDayOffset: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        readonly required: false;
    };
    readonly scheduledTime: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly paid: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly paidAt: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly paidVia: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodEnum<typeof PaymentProvider>, z.ZodLiteral<"BANK_TRANSFER">, z.ZodLiteral<"CASH">]>>>;
        readonly required: false;
    };
    readonly paymentRequired: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly paymentStatus: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodEnum<typeof PaymentStatus>>>;
        readonly required: false;
    };
    readonly paymentLinkGenerated: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly paymentLinkGeneratedAt: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly paymentSessionId: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly cancelReason: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly cancelledAt: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly pickedUpEscalatedAt: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly inTransitEscalatedAt: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly lifecycleFailure: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            reason: z.ZodString;
            riderId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            at: z.ZodString;
        }, z.core.$strip>>>;
        readonly required: false;
    };
    readonly reassignedAt: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly proofPromotionFailed: {
        readonly scope: "DELIVERY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly escalatedTo: {
        readonly scope: "CONVERSATION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly escalationStatus: {
        readonly scope: "CONVERSATION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly escalatedBy: {
        readonly scope: "CONVERSATION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly escalatedAt: {
        readonly scope: "CONVERSATION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly resolvedAt: {
        readonly scope: "CONVERSATION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly resolution: {
        readonly scope: "CONVERSATION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        readonly required: false;
    };
    readonly timezone: {
        readonly scope: "CONVERSATION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly aiPausedUntil: {
        readonly scope: "CONVERSATION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly aiPermanentlyDisabled: {
        readonly scope: "CONVERSATION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly logoUrl: {
        readonly scope: "COMPANY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly cac: {
        readonly scope: "COMPANY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly nipostLicenseNumber: {
        readonly scope: "COMPANY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly address: {
        readonly scope: "COMPANY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly placeId: {
        readonly scope: "COMPANY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly verificationNote: {
        readonly scope: readonly ["RIDER", "COMPANY"];
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly cacVerification: {
        readonly scope: "COMPANY";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            status: z.ZodString;
            registeredName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            entityType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            cacStatus: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            registrationDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            checkedAt: z.ZodString;
            nextCheckAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            attempts: z.ZodNumber;
        }, z.core.$strip>>>;
        readonly required: false;
    };
    readonly displayPhoneNumber: {
        readonly scope: readonly ["CHANNEL", "MESSAGE"];
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly credentials: {
        readonly scope: "CHANNEL";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            accessToken: z.ZodString;
            wabaId: z.ZodString;
            phoneNumberId: z.ZodString;
            tokenExpiresAt: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, z.core.$strip>>>;
        readonly required: false;
    };
    readonly webhookUrl: {
        readonly scope: "CHANNEL";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly webhookVerified: {
        readonly scope: "CHANNEL";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly webhookVerifiedAt: {
        readonly scope: "CHANNEL";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly botEnabled: {
        readonly scope: "CHANNEL";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly aiDisabled: {
        readonly scope: "CHANNEL";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly rejectionReason: {
        readonly scope: "CHANNEL";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly rejectedAt: {
        readonly scope: "CHANNEL";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly deactivatedReason: {
        readonly scope: "CHANNEL";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly phoneNumberId: {
        readonly scope: readonly ["CHANNEL", "MESSAGE"];
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly userId: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly platformId: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly initializedAt: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly deliveryCount: {
        readonly scope: readonly ["TRANSACTION", "LEDGER"];
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        readonly required: false;
    };
    readonly channelFeePerDelivery: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        readonly required: false;
    };
    readonly narration: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly squadResponse: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        readonly required: false;
    };
    readonly ledgerRestored: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly error: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly reconciledAt: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly checkoutUrl: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly fundWallet: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly reason: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly accountNumber: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly bankCode: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly originalReferences: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
        readonly required: false;
    };
    readonly trackingIds: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
        readonly required: false;
    };
    readonly requiresManualReconciliation: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly receiptSessionId: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly isPendingReceiptClaim: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly webhookPayload: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        readonly required: false;
    };
    readonly confirmedAt: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly expiredAt: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly expiredReason: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly isPartialPaymentContinuation: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        readonly required: false;
    };
    readonly originalReference: {
        readonly scope: readonly ["TRANSACTION", "LEDGER"];
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly deliveryId: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly eventSource: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly rolledBackAt: {
        readonly scope: "TRANSACTION";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly latitude: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        readonly required: false;
    };
    readonly longitude: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        readonly required: false;
    };
    readonly parentId: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly staleParentId: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly pushName: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly senderName: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly mimeType: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly mediaId: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly visionExtraction: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly mediaUrl: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly displayPhoneNumberId: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly executedActions: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
            type: z.ZodString;
            success: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
            message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>]>>>>;
        readonly required: false;
    };
    readonly editedAt: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly editCount: {
        readonly scope: "MESSAGE";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        readonly required: false;
    };
    readonly idType: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly idNumber: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly nin: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly driverLicense: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly passportNumber: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly passportPhotoUrl: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly vehicleVin: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly vehiclePermitUrl: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly photoUrl: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly phoneNumber: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly registrationNumber: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly riderCardNumber: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly currentState: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly batteryLevel: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        readonly required: false;
    };
    readonly silentBanUntil: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        readonly required: false;
    };
    readonly suspendedBy: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly suspendedFrom: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly suspensionReason: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly suspensionCount: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        readonly required: false;
    };
    readonly suspensionHistory: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
            at: z.ZodString;
            by: z.ZodString;
            reason: z.ZodString;
            escalatedFrom: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            offenseCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, z.core.$strip>>>>;
        readonly required: false;
    };
    readonly lastSilentOffenseAt: {
        readonly scope: "RIDER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly type: {
        readonly scope: "LEDGER";
        readonly shape: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        readonly required: false;
    };
    readonly feePerDelivery: {
        readonly scope: "LEDGER";
        readonly shape: z.ZodNumber;
        readonly required: true;
    };
    readonly totalFee: {
        readonly scope: "LEDGER";
        readonly shape: z.ZodNumber;
        readonly required: true;
    };
};
/**
 * Build a clean JSONB metadata object for `domain` from `entries`.
 *
 * Validates every provided key against `METADATA_KEYS` (unknown key, wrong
 * scope, or shape violation all throw), drops keys whose value is `undefined`
 * (so no `undefined` keys leak into JSONB serialization), and enforces that
 * every `required` key for the domain is present. Returns a plain `Record`.
 */
declare function buildMetadata(domain: MetadataScope, entries: Record<string, unknown>): Record<string, unknown>;
/**
 * Runtime validator for the trust boundary (AI action payload → DB).
 * Asserts `value` is a valid `domain` metadata payload (or no payload at all),
 * throwing on unknown keys or shape violations. Returns void.
 */
declare function validateMetadata(domain: MetadataScope, value: unknown): void;

interface BankDetails {
    readonly bankName: string;
    readonly bankCode: string;
    readonly accountNumber: string;
    readonly accountName: string;
}
/** Sentinel value used when a user record is purged but references remain. */
declare const DELETED_USER_SENTINEL = "DELETED_USER";
/**
 * System actor ID used for automated/system-generated audit log entries.
 * Used in event_logs.actorId and as RLS role for worker sessions.
 */
declare const SYSTEM_ACTOR_ID = "system";
/** Actor ID used when an admin performs an action without a specific performer. */
declare const ADMIN_ACTOR_ID = "admin";
interface SystemConfig {
    readonly jwtIssuer: string;
    readonly customerBaseUrl: string;
    readonly businessBaseUrl: string;
    readonly emailDomain: string;
    readonly supportEmail: string;
    readonly paymentsEmail: string;
    readonly brandName: string;
}
type WorkingHoursEntry = {
    start: string;
    close: string;
};
declare const DEFAULT_WORKING_HOURS: Partial<Record<DayOfWeek, WorkingHoursEntry>>;
declare function buildSystemConfig(overrides?: Partial<SystemConfig>): SystemConfig;

interface BrandConfig {
    brandName: string;
    trackingPrefix: string;
}
/** Lazy singleton — defers process.env reads until first access. */
declare function getBrandConfig(): BrandConfig;

interface RegionalConfig {
    readonly defaultCountryCode: string;
    readonly defaultIsoCountryCode: string;
    readonly timeZone: string;
    readonly currencySymbol: string;
    readonly states: readonly string[];
}
declare const REGIONAL_CONFIG: RegionalConfig;
/** Locale string for toLocaleDateString / toLocaleTimeString / toLocaleString calls. */
declare const REGIONAL_LOCALE = "en-NG";
/** Headquarter location for footer text in emails. */
declare const HQ_LOCATION = "Lagos, Nigeria";

interface TierLimits {
    readonly maxAIDeliveriesPerAction: number;
    readonly maxBulkDeliveries: number;
    readonly maxTrackingHistory: number;
    readonly retentionMonths: number;
    readonly maxDispatchers: number;
    readonly maxRiders: number;
    readonly maxDeliveriesPerMonth: number;
    readonly maxExportsPerDay: number;
    readonly maxExportsPerMonth: number;
}
interface LimitsConfig {
    readonly maxBatchSize: number;
    readonly dbBatchSize: number;
    readonly userActionConcurrency: number;
    readonly externalApiConcurrency: number;
    readonly maxQueryLimit: number;
    readonly syncPageSize: number;
    readonly locationDeduplicationRadiusMeters: number;
    readonly externalApiTimeoutMs: number;
    readonly maxRiderActiveDeliveries: number;
    readonly maxSearchQueryLength: number;
    readonly chunkSize: number;
}
/**
 * Default max length for a single chat message body (characters).
 * SSOT for AI message limits AND client chat-composer maxlength mirrors.
 */
declare const DEFAULT_MESSAGE_LIMIT = 4096;
declare const LIMITS_CONFIG: LimitsConfig;
/**
 * Pagination defaults. Centralised here alongside LIMITS_CONFIG — both are
 * query-size constants consumed by every service that pages results.
 */
declare const PAGINATION_CONFIG: {
    /** Default page size for regular API / GraphQL queries. */
    readonly DEFAULT_LIMIT: 20;
    /** Admin-specific page size (admins typically need larger result sets). */
    readonly ADMIN_DEFAULT_LIMIT: 50;
};
/**
 * Tier-based limits - ALL operational limits are tier-aware
 * These limits control the entire flow from drafting to synthesis
 */
declare const TIER_LIMITS: Record<SubscriptionTier, TierLimits>;
declare function getTierLimits(tier: SubscriptionTier): TierLimits;

/**
 * Canonical delivery status transition rules (SSOT).
 *
 * The backend exposes these to clients via `remoteConfig.rules.allowedStatusTransitions`
 * so every consumer (business web, Flutter) mirrors server business rules instead of
 * maintaining a drift-prone copy. Never define a second copy.
 */
declare const ALLOWED_STATUS_TRANSITIONS: Readonly<Record<DeliveryStatus, readonly DeliveryStatus[]>>;

interface PricingScheme {
    readonly vehicleType: VehicleType;
    /** Base fare in kobo. */
    readonly baseFare: number;
    /** Per-km rate in kobo. */
    readonly perKmRate: number;
    /** Minimum fare in kobo. */
    readonly minFare: number;
}
declare const DEFAULT_PRICING_SCHEMES: readonly PricingScheme[];

/**
 * Client-facing configuration served to business web + Flutter via the
 * `remoteConfig` GraphQL query and the SSE `companyUpdated` payload.
 *
 * Values here are the SSOT; the backend `client-rules.service.ts` reads from
 * this module (and other core-ts configs) to build the served payload.
 * Clients keep the same defaults for offline / pre-server startup, but treat
 * the served values as authoritative once received.
 */
interface ClientConfig {
    readonly pollIntervals: {
        readonly normalMs: number;
        readonly degradedMs: number;
    };
}
declare const CLIENT_CONFIG: ClientConfig;

declare const VALID_DATA_TYPES: readonly ExportDataType[];
type DataType = (typeof VALID_DATA_TYPES)[number];
declare const MONTH_REQUIRED_TYPES: ReadonlySet<DataType>;

/**
 * Data retention and purge configuration.
 *
 * Single source of truth shared across all projects (backend, workers, web).
 * Previously scattered in workers-only SCALING_CONFIG.
 */
interface RetentionConfig {
    /**
     * Days after deactivation before individual accounts (riders/dispatchers)
     * are permanently purged from the system.
     */
    readonly accountPurgeRetentionDays: number;
    /**
     * Days of inactivity (no rider/dispatcher activity) before a company is
     * automatically deactivated. After deactivation, `lockedCompanyPurgeRetentionDays`
     * controls how long until permanent purge. Aligned with accountPurgeRetentionDays
     * so companies and individual accounts have comparable lifetimes.
     */
    readonly companyPurgeRetentionDays: number;
    /**
     * Days after deactivation before a company is permanently purged.
     * This covers both inactivity-triggered and user-initiated deactivations.
     */
    readonly lockedCompanyPurgeRetentionDays: number;
    /**
     * Fixed retention floor (months) for audit logs (event_logs).
     * event_logs is high-volume and only read recently (sync, admin monitoring),
     * so it is archived at a flat 12-month floor regardless of tier —
     * older than tier windows, and independent of DATA_RETENTION.
     */
    readonly eventLogRetentionMonths: number;
}
declare const RETENTION_CONFIG: RetentionConfig;

/**
 * Unified metrics configuration — single source of truth for the `metrics`
 * table shared across backend (query layer), workers (compute + compress),
 * and clients (windows / granularity selection).
 *
 * The `metrics` table stores one row per (company scope, domain, granularity,
 * bucket_start). Domains share one generic column set; each domain only fills
 * the columns meaningful to it (see METRIC_DOMAIN_MAPPINGS). Fine buckets are
 * folded into coarser ones by the workers' compression ladder per
 * METRICS_RETENTION below.
 */
/**
 * Sentinel bucket_start for LIFETIME rows. LIFETIME is not a rolling window —
 * there is exactly one LIFETIME row per (scope, domain), so the bucket_start
 * is a fixed sentinel instead of a date (the unique index then yields one row).
 */
declare const LIFETIME_BUCKET_START = "1970-01-01";
/**
 * Compression ladder: how long each granularity is retained before its
 * expired buckets are folded into the next coarser tier.
 *
 *   DAY     -> retained 90 days  -> folds into WEEK
 *   WEEK    -> retained 12 months -> folds into MONTH
 *   MONTH   -> retained 5 years   -> folds into LIFETIME
 *   LIFETIME -> retained forever   (nothing to fold into)
 *
 * Tiers are cumulative: a WEEK bucket is the sum of its (now-deleted) DAY
 * buckets, etc. All retention boundaries are month/date-anchored in the Lagos
 * timezone (see getRetentionCutoff).
 */
interface GranularityRetention {
    /** Retention window for buckets of this granularity. */
    readonly retainFor: number;
    /** Unit of `retainFor`. 'days' for DAY, 'months' for WEEK/MONTH. */
    readonly unit: 'days' | 'months';
    /** Coarser granularity expired buckets are folded into; null = keep forever. */
    readonly foldTo: MetricGranularity | null;
}
declare const METRICS_RETENTION: Record<MetricGranularity, GranularityRetention>;
/**
 * Ordered compression chain (finest -> coarsest). The workers fold each tier
 * in this order, so a coarse tier is always current before its own fold.
 */
declare const METRICS_FOLD_CHAIN: readonly MetricGranularity[];
/**
 * Generic columns shared by all domains on the `metrics` table. Each domain
 * fills a subset (documented in METRIC_DOMAIN_MAPPINGS); unused columns stay
 * at their defaults (0 / null / {}).
 */
type MetricColumn = 'totalCount' | 'deliveredCount' | 'cancelledCount' | 'failedCount' | 'totalRevenueKobo' | 'avgDeliveryTimeMinutes' | 'channelBreakdown' | 'peakHour' | 'uniqueRidersActive';
/**
 * Per-domain mapping: which generic columns a domain populates, plus the keys
 * it writes into `extra_metrics` (JSON). Central reference for the workers'
 * compute step and the backend's read/aggregation layer.
 */
interface MetricDomainMapping {
    readonly domain: MetricDomain;
    /** Generic columns this domain fills. */
    readonly columns: readonly MetricColumn[];
    /** extra_metrics JSON keys this domain writes (documentation + contract). */
    readonly extraMetricKeys: readonly string[];
}
declare const METRIC_DOMAIN_MAPPINGS: readonly MetricDomainMapping[];
/**
 * Returns the bucket granularity to serve for a requested window in days.
 * Mirrors the METRICS_RETENTION ladder so a client asking for `days` always
 * gets the finest tier whose retention covers the window.
 *
 *   <= 90 days   -> DAY
 *   <= ~12 months -> WEEK
 *   <= ~5 years  -> MONTH
 *   beyond       -> MONTH (server must additionally read LIFETIME to fill the
 *                   horizon; MONTH is the coarsest rolling tier).
 */
declare function granularityForWindowDays(days: number): MetricGranularity;

/**
 * 1 Naira = 100 Kobo.
 * All money in the system is stored in Kobo ("kobo everywhere").
 * This constant is retained only for display formatting (see `formatAmount`)
 * and for documenting the legacy naira → kobo ×100 migration.
 */
declare const KOBO_PER_NAIRA = 100;
/**
 * Data retention in months per tier — controls dashboard visibility, export window, and archival
 */
declare const DATA_RETENTION: Record<SubscriptionTier, number>;
/**
 * Per-delivery channel fees (in Kobo).
 * Billed per-delivery when delivery is created from a channel conversation.
 * Deducted from wallet in real-time, reconciled on monthly invoice.
 */
declare const CHANNEL_FEES: Record<ChannelType, number>;
/**
 * Tiers that get a dedicated Squad virtual settlement account AND can
 * provision their own dedicated communication channels (MY_CHANNEL type).
 * STARTER uses the shared platform number and ledger.
 */
declare const DEDICATED_TIERS: SubscriptionTier[];
/**
 * Support SLA per tier, as shown on the subscription plans and used as the
 * support feature value. SSOT — never duplicate these strings elsewhere.
 */
declare const SUPPORT_SLA: Record<SubscriptionTier, string>;
/**
 * Billing configuration constants
 */
declare const BILLING_CONFIG: {
    /**
     * Currency to use across the system (single-value — NGN only)
     */
    readonly CURRENCY: "NGN";
    /**
     * Monthly subscription pricing (in Kobo — single currency unit)
     * ₦15,000 = 1_500_000 kobo, ₦30,000 = 3_000_000 kobo.
     */
    readonly PRICING: {
        readonly STARTER: 1500000;
        readonly PROFESSIONAL: 3000000;
    };
    /**
     * Billing cycle in days
     */
    readonly BILLING_CYCLE_DAYS: 30;
    /**
     * Days after PAST_DUE before company data is cancelled
     */
    readonly PAST_DUE_CANCEL_DAYS: 14;
    /**
     * Days of free trial for new companies
     */
    readonly TRIAL_DAYS: 14;
    /**
     * Days after CANCELLED before company data is purged
     * References RETENTION_CONFIG as single source of truth.
     */
    readonly PURGE_AFTER_CANCELLED_DAYS: number;
    /**
     * Payment timeout for unconfirmed payment deliveries (in hours).
     * 10 minutes gives room for webhook delays without leaving users hanging.
     * The daily payment-reconciliation cron is the backstop for edge cases.
     */
    readonly PAYMENT_TIMEOUT_HOURS: 1;
    /**
     * Cross-company pool fulfillment split (in Kobo). Applied at settlement when
     * a pool delivery was fulfilled by a different company's rider:
     * - platformFeeKobo is retained by the platform first,
     * - ownerShareKobo then goes to the delivery's owning company (skipped for
     *   system-owned deliveries, where the platform retains it implicitly),
     * - the fulfilling company receives the remainder.
     */
    readonly POOL_SPLIT_KOBO: {
        readonly platformFeeKobo: 10000;
        readonly ownerShareKobo: 50000;
    };
    /**
     * Number of days after purchase within which a refund may be requested.
     */
    readonly REFUND_WINDOW_DAYS: 14;
    /**
     * Window (ms) within which fundWallet requests with the same company + amount
     * reuse a single PENDING reference so double-submits coalesce into one checkout.
     */
    readonly FUND_IDEMPOTENCY_WINDOW_MS: number;
    /**
     * HTTP timeout (ms) for Squad API calls.
     */
    readonly SQUAD_HTTP_TIMEOUT: 30000;
    /**
     * Retry configuration for failed payments.
     * Retries on specific days after failure (1, 3, 7 days).
     * MAX_ATTEMPTS = total payment attempts (1 initial + 1 retry per INTERVALS_DAYS entry).
     * If all attempts fail, moves to PAST_DUE. After PAST_DUE window, cancels.
     */
    readonly PAYMENT_RETRY: {
        readonly MAX_ATTEMPTS: 4;
        readonly INTERVALS_DAYS: readonly [1, 3, 7];
    };
};
/**
 * Get subscription price for a tier with validation
 */
declare function getSubscriptionPrice(tier: SubscriptionTier): number;
/**
 * Format a kobo amount to a display string (₦ with decimals).
 * All money in the system is kobo, so this is the canonical money formatter.
 */
declare function formatAmount(kobo: number): string;
/**
 * Check if a tier is billable (has a positive subscription price)
 */
declare function isBillableTier(tier: SubscriptionTier): boolean;
/**
 * Check if we should bill based on last billing date.
 * First billing triggers after BILLING_CYCLE_DAYS from activation.
 * Subsequent billings trigger after BILLING_CYCLE_DAYS from last billing.
 */
declare function shouldBillNow(lastBillingDate: Date | null, activationDate: Date): boolean;
/**
 * Check if we should retry a failed payment.
 * `retryAttempt` is a 0-based retry index (0 = first retry, 1-day interval).
 * Retries are capped by the number of configured intervals.
 */
declare function shouldRetryPayment(lastBillingDate: Date, retryAttempt: number): boolean;
/**
 * Compute a single access level from the approval × subscription matrix.
 *
 *  ApprovalStatus × SubscriptionStatus  →  CompanyAccessLevel
 *  ─────────────────────────────────────────────────────────────
 *  APPROVED + ACTIVE      →  FULL
 *  APPROVED + TRIAL       →  TRIAL
 *  APPROVED + PAST_DUE    →  PAST_DUE
 *  anything else          →  RESTRICTED
 */
declare function computeAccessLevel(verificationStatus: ApprovalStatus | null | undefined, subscriptionStatus: SubscriptionStatus | null | undefined, periodEnd?: Date | string | null, opts?: {
    wasTrial?: boolean;
}): CompanyAccessLevel;

declare const QUEUE_SERVICE_CONFIG: {
    readonly batchSize: 5;
    readonly defaultMaxRetries: 3;
    readonly pruneIntervalMs: number;
    readonly pruneTerminalAfterMs: number;
    readonly retryStalledAfterMs: 30000;
    readonly retryBackoffBaseMs: 1000;
    readonly retryBackoffMaxMs: 60000;
};

interface SecurityConfig {
    readonly blocks: {
        readonly temporaryLadderMs: readonly number[];
        readonly escalateAfterBlocks: number;
        readonly escalationWindowMs: number;
        readonly persistentEscalatedMs: number;
        readonly maxPersistentMs: number;
    };
    readonly validation: {
        readonly maxEmailLength: number;
        readonly maxPasswordLength: number;
        readonly maxNameLength: number;
        readonly maxDescriptionLength: number;
        readonly maxPhoneLength: number;
        readonly maxAddressLength: number;
        readonly securityPinMinRange: number;
        readonly securityPinMaxRange: number;
    };
}
declare const SECURITY_CONFIG: SecurityConfig;

interface SessionConfig {
    readonly maxActiveSessions: number;
    readonly pruneRetentionDays: number;
}
declare const SESSION_CONFIG: SessionConfig;

interface FetchWithTimeoutOptions extends Omit<RequestInit, 'signal'> {
    /** Timeout in milliseconds. Defaults to `LIMITS_CONFIG.externalApiTimeoutMs`. */
    timeoutMs?: number;
    /** Custom fetch implementation (useful for testing). */
    fetch?: typeof globalThis.fetch;
}
declare function fetchWithTimeout(url: string | URL | Request, options?: FetchWithTimeoutOptions): Promise<Response>;

declare const MS_PER_DAY: number;
/**
 * Adds calendar days to a date, returning a new Date (input untouched).
 * Uses local-time setDate semantics so DST transitions stay calendar-correct
 * (unlike naive `ms + days * MS_PER_DAY` arithmetic).
 */
declare function addDays(from: Date, days: number): Date;

declare function haversineDistanceMeters(lat1: number, lng1: number, lat2: number, lng2: number): number;
declare function haversineDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number, routingFactor?: number): number;

declare function mergeChannelCounts(prev: Record<string, number> | undefined, next: Record<string, number> | undefined): Record<string, number>;

/**
 * Extracts a human-readable error message from any thrown value.
 *
 * Handles Error instances (including cause chains), strings, and unknown types.
 * Use this instead of inline `err instanceof Error ? err.message : String(err)`.
 *
 * @example
 * try {
 *   await doSomething();
 * } catch (err) {
 *   toast.error(extractErrorMessage(err));
 * }
 */
/**
 * Returns a structured error context for logger calls.
 * Single `instanceof Error` check — replaces the verbose
 * `{ error: extractErrorMessage(e), stack: e instanceof Error ? e.stack : undefined }` pattern.
 *
 * @example
 * logger.error('Something failed', extractErrorContext(err));
 */
declare function extractErrorContext(error: unknown): {
    error: string;
    stack?: string;
};
declare function extractErrorMessage(error: unknown): string;

/**
 * Meta Graph API shared helpers.
 */
/** Meta long-lived token expiry: `expires_in` (seconds) → epoch ms. */
declare function computeExpiresAt(expiresInSeconds: number): number;
/**
 * Extract a human-readable message from a Meta Graph API error body.
 * Returns a generic fallback when the shape is not a standard error object.
 */
declare function parseGraphError(raw: unknown): string;

/**
 * Tracking ID prefix for brand recognition and easy pattern matching.
 * Makes IDs trivially identifiable (e.g. LGX-A2B3C4), reducing AI
 * hallucination risk and false-positive guardrail matches.
 */
declare const TRACKING_ID_PREFIX: string;
/**
 * Length of the random suffix portion of a tracking ID (after the prefix).
 */
declare const TRACKING_ID_SUFFIX_LENGTH = 6;
/**
 * Total tracking ID length including prefix.
 */
declare const TRACKING_ID_LENGTH: number;
/**
 * Ambiguity-free alphabet for tracking IDs.
 * Excludes 0, O, 1, I (visual confusion between these pairs).
 * @example `/[2-9A-HJ-NP-Z]{6}/`
 */
declare const TRACKING_ID_CHARS = "2-9A-HJ-NP-Z";
/**
 * Expanded character set matching `TRACKING_ID_CHARS`, for random
 * generation (crypto.randomInt index selection). Kept in lockstep with
 * `TRACKING_ID_CHARS` by the drift-guard test.
 */
declare const TRACKING_ID_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

declare function formatDeliveryStatus(status: string | undefined | null): string;
declare function formatEnumToTitleCase(value: string | undefined | null): string;

/**
 * Returns midnight (00:00:00.000) of the first day of the current month
 * in the configured timezone (defaults to REGIONAL_CONFIG.timeZone).
 *
 * Works for any IANA timezone by computing the UTC offset at noon UTC
 * on the 1st — safe from DST boundary edge cases at month boundaries.
 */
declare function getMonthStartInTimezone(timezone?: string): Date;
/**
 * Returns midnight (00:00:00.000) of today in the configured timezone.
 * Safe from DST boundary edge cases.
 */
declare function getStartOfDayInTimezone(timezone?: string): Date;
/**
 * Returns the first and last millisecond of the wall-clock calendar day that
 * the given instant falls on in the timezone (defaults to REGIONAL_CONFIG).
 * Accepts any parsable date input ('2024-12-31', ISO strings, Date, ms).
 * Used for inclusive fromDate/toDate range filters — never use local
 * setHours(23,59,59,999), which silently follows the server clock.
 */
declare function getDayBoundsInTimezone(date: Date | number | string, timezone?: string): {
    start: Date;
    end: Date;
};
/**
 * Returns the calendar date (YYYY-MM-DD) of the given instant in the
 * timezone — the wall-clock day, which may differ from the instant's UTC day.
 */
declare function getDateStringInTimezone(date: Date, timezone?: string): string;
/**
 * Returns the month-anchored retention cutoff: firstOfMonth(now) - N months,
 * as midnight on the 1st in the configured timezone.
 *
 * Uses explicit year/month arithmetic (never setUTCMonth on a shifted UTC
 * date, which overflows at month boundaries). Used for tier-based/fixed-floor
 * archival and in-app history clamping.
 */
declare function getRetentionCutoff(retentionMonths: number, timezone?: string): Date;

export { ADMIN_ACTOR_ID, ALLOWED_STATUS_TRANSITIONS, ApprovalStatus, BILLING_CONFIG, type BankDetails, type BrandConfig, CACEvidenceStatus, CHANNEL_FEES, CLIENT_CONFIG, type CacVerificationEvidence, type ChannelCredentials, ChannelType, type ChatMessageMetadata, CompanyAccessLevel, type CompanyChannelMetadata, type CompanyMetadata, type ConversationMetadata, DATA_RETENTION, DEDICATED_TIERS, DEFAULT_MESSAGE_LIMIT, DEFAULT_PRICING_SCHEMES, DEFAULT_WORKING_HOURS, DELETED_USER_SENTINEL, type DataType, DayOfWeek, type DeliveryBase, type DeliveryMetadata, DeliveryStatus, type DispatcherBase, ENUM_CATALOG, type EnumCatalog, type EnumValue, EscalatedTo, EscalationStatus, ExportDataType, HQ_LOCATION, KOBO_PER_NAIRA, LIFETIME_BUCKET_START, LIMITS_CONFIG, type LedgerMetadata, METADATA_KEYS, METRICS_FOLD_CHAIN, METRICS_RETENTION, METRIC_DOMAIN_MAPPINGS, MONTH_REQUIRED_TYPES, MS_PER_DAY, type MetadataKey, type MetadataKeySpec, type MetadataScope, MetricDomain, MetricGranularity, PAGINATION_CONFIG, PaymentProvider, PaymentStatus, QUEUE_SERVICE_CONFIG, REGIONAL_CONFIG, REGIONAL_LOCALE, RETENTION_CONFIG, type RiderBase, type RiderMetadata, RiderStatus, SECURITY_CONFIG, SESSION_CONFIG, SUPPORT_SLA, SYSTEM_ACTOR_ID, SubscriptionStatus, SubscriptionTier, type SystemConfig, TIER_LIMITS, TRACKING_ID_ALPHABET, TRACKING_ID_CHARS, TRACKING_ID_LENGTH, TRACKING_ID_PREFIX, TRACKING_ID_SUFFIX_LENGTH, type TierLimits, type TransactionMetadata, VALID_DATA_TYPES, VehicleType, type WorkingHoursEntry, addDays, buildMetadata, buildSystemConfig, computeAccessLevel, computeExpiresAt, extractErrorContext, extractErrorMessage, fetchWithTimeout, formatAmount, formatDeliveryStatus, formatEnumToTitleCase, getBrandConfig, getDateStringInTimezone, getDayBoundsInTimezone, getMonthStartInTimezone, getRetentionCutoff, getStartOfDayInTimezone, getSubscriptionPrice, getTierLimits, granularityForWindowDays, haversineDistanceKm, haversineDistanceMeters, isBillableTier, mergeChannelCounts, parseGraphError, shouldBillNow, shouldRetryPayment, validateMetadata };
