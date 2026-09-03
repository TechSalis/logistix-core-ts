export const baseTypeDefs = `
  scalar DateTime
  scalar JSON

  enum DeliveryStatus {
    PENDING
    ASSIGNED
    IN_TRANSIT
    PICKED_UP
    DELIVERED
    CANCELLED
    FAILED
  }

  enum RiderStatus {
    OFFLINE
    ONLINE
    BUSY
  }

  enum ApprovalStatus {
    PENDING
    APPROVED
    REJECTED
    SUSPENDED
    DISABLED
  }

  enum TransactionStatus {
    PENDING
    SUCCESS
    FAILED
    REVERSED
  }

  enum TransactionType {
    DELIVERY_PAYMENT
    SUBSCRIPTION
    ADJUSTMENT
    SETTLEMENT
    REFUND
  }

  enum SenderType {
    CUSTOMER
    AGENT
    DISPATCHER
    ADMIN
    SYSTEM
  }

  enum PaymentMethod {
    PREPAID
    PAY_ON_DELIVERY
  }

  enum VehicleType {
    BIKE
  }

  enum UserRole {
    ADMIN
    DISPATCHER
    RIDER
  }

  enum PaymentProvider {
    SQUAD
    SYSTEM
  }

  enum DevicePlatform {
    ANDROID
    IOS
    WEB
  }

  enum IdType {
    NIN
    DRIVER_LICENSE
    PASSPORT
  }

  enum ConversationHandlerType {
    AI
    DISPATCHER
    ADMIN
  }

  enum ExportDataType {
    DELIVERIES
    BILLING
    CHAT
  }

  enum ExportReason {
    QUEUED
    DUPLICATE
    QUOTA_EXCEEDED
  }

  type ExportRequestResult {
    accepted: Boolean!
    reason: ExportReason!
  }

  enum LedgerAdjustmentType {
    CREDIT
    DEBIT
    CORRECTION
    CHANNEL_FEE
    OVERAGE
    REFUND
  }

  enum MessageStatus {
    SENT
    DELIVERED
    READ
    FAILED
  }

  enum SubscriptionTier {
    STARTER
    PROFESSIONAL
  }

  enum SubscriptionStatus {
    ACTIVE
    TRIAL
    PAST_DUE
    CANCELLED
    CANCELLING
  }

  enum ChannelType {
    SYSTEM_POOL
    MY_CHANNEL
  }

  enum EscalatedTo {
    COMPANY
    ADMIN
    DISPATCHER
  }

  enum EscalationStatus {
    OPEN
    TAKEN_OVER
    RESOLVED
  }

  type Conversation {
    id: ID!
    platform: ChannelPlatform!
    platformId: String!
    companyId: String
    channelType: ChannelType!
    escalationStatus: EscalationStatus
    escalatedTo: EscalatedTo
    lastMessageAt: DateTime!
    lastMessage: Message
    company: Company
    customerName: String
    handledBy: String
    handledByType: ConversationHandlerType!
    handledAt: DateTime
    handledByName: String
    aiPausedUntil: DateTime
    aiPermanentlyDisabled: Boolean!
    escalatedAt: DateTime
    resolvedAt: DateTime
    reason: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum ConversationScope {
    COMPANY
    SYSTEM_ONLY
    ALL
  }

  input ConversationFilter {
    escalationStatus: EscalationStatus
    channelType: ChannelType
    id: ID
  }

  enum AdminEscalationAction {
    TAKE_OVER
    RESOLVE
  }

  type Message {
    id: ID!
    conversationId: String!
    body: String!
    senderType: SenderType!
    senderId: String
    senderName: String
    metadata: JSON
    mediaUrl: String
    isDeleted: Boolean!
    externalId: String
    replyToExternalId: String
    actionType: String
    status: MessageStatus!
    createdAt: DateTime!
  }

  enum ChannelPlatform {
    WHATSAPP
    INSTAGRAM
    FACEBOOK
    TIKTOK
  }

  enum CompanyChannelStatus {
    PENDING
    ACTIVE
    DEACTIVATED
    REJECTED
    REMOVED
  }

  type RiderDocuments {
    idType: IdType
    idNumber: String
    nin: String
    driverLicense: String
    passportNumber: String
    vehicleVin: String
    vehiclePermitUrl: String
    photoUrl: String
  }

  type RiderCount {
    deliveries: Int!
  }

  type Rider {
    id: ID!
    email: String!
    fullName: String!
    phoneNumber: String
    vehicleType: VehicleType!
    documents: RiderDocuments
    companyId: String
    company: Company
    status: RiderStatus!
    lastLat: Float
    lastLng: Float
    batteryLevel: Int
    currentState: String
    lastSeen: DateTime
    approvalStatus: ApprovalStatus!
    _count: RiderCount
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Dispatcher {
    id: ID!
    email: String!
    fullName: String!
    companyId: String
    company: Company
    approvalStatus: ApprovalStatus!
    createdAt: DateTime!
  }

  type Location {
    address: String
    placeId: String
    lat: Float
    lng: Float
  }

  type DeliveryMetadata {
    failReason: String
    failedAt: DateTime
    instructions: String
    scheduledDayOffset: Int
    scheduledTime: String
    paymentRequired: Boolean
    paymentStatus: String
    paymentLinkGenerated: Boolean
    paymentLinkGeneratedAt: DateTime
    paymentSessionId: String
    fulfilledByCompanyId: String
  }

  type Delivery {
    id: ID!
    companyId: String
    createdBy: String
    riderId: ID
    pickup: Location!
    dropoff: Location!
    price: Float
    pickupPhone: String
    dropOffPhone: String
    description: String
    paymentMethod: PaymentMethod!
    scheduledAt: DateTime
    scheduledAtEnd: DateTime
    trackingId: String!
    pin: String
    proofImageReadUrl: String
    pickupState: String
    dropOffState: String
    vehicleType: VehicleType!
    status: DeliveryStatus!
    pool: Boolean
    creatorPlatform: String
    rider: Rider
    company: Company
    deliveredAt: DateTime
    metadata: DeliveryMetadata
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type DeliveryQuota {
    monthlyLimit: Int!
    graceLimit: Int!
    usedThisMonth: Int!
    remaining: Int!
  }

  # Stable client config (offline-cached). Volatile per-company state lives in
  # dedicated queries: Query.deliveryQuota + Query.subscriptionStatus (see public.ts).
  type RemoteConfig {
    retentionMonths: Int!
    maxBulkDeliveries: Int!
    maxExportsPerMonth: Int!
    rules: ClientRules!
  }

  type SubscriptionStatusInfo {
    status: SubscriptionStatus!
    tier: SubscriptionTier!
    periodEnd: DateTime
    subscriptionHealth: SubscriptionHealth!
  }

  enum SubscriptionHealth { HEALTHY IN_TRIAL PAST_DUE EXPIRING_SOON CANCELLED }

  type DeliveryStatusTransitionRule {
    from: DeliveryStatus!
    to: [DeliveryStatus!]!
  }

  type PollIntervalsConfig {
    normalMs: Int!
    degradedMs: Int!
  }

  type ValidationLimits {
    maxEmailLength: Int!
    maxPasswordLength: Int!
    maxNameLength: Int!
    maxDescriptionLength: Int!
    maxPhoneLength: Int!
    maxAddressLength: Int!
    maxSearchQueryLength: Int!
  }

  type ClientRules {
    allowedStatusTransitions: [DeliveryStatusTransitionRule!]!
    pollIntervals: PollIntervalsConfig!
    syncPageSize: Int!
    platformMessageLimits: [PlatformMessageLimit!]!
    validation: ValidationLimits!
  }

  type PlatformMessageLimit {
    platform: ChannelPlatform!
    limit: Int!
  }

  type User {
    id: ID!
    email: String!
    fullName: String!
    role: UserRole
    subRole: String
    phoneNumber: String
    phoneVerifiedAt: String
    isOnboarded: Boolean!
    companyId: String
    riderProfile: Rider
    companyProfile: Company
    verificationStatus: ApprovalStatus
    dispatcherApprovalStatus: ApprovalStatus
    createdAt: DateTime!
    riderHeartbeat: RiderHeartbeat
  }

  type RiderHeartbeat {
    minIntervalSeconds: Int!
    maxIntervalSeconds: Int!
    distanceFilterMeters: Int!
  }

  type CompanyCount {
    riders: Int!
    deliveries: Int!
  }

  type Company {
    id: ID!
    name: String
    logoUrl: String
    cac: String
    address: String
    placeId: String
    contactPhone: String
    verificationStatus: ApprovalStatus!
    verificationNote: String
    cacVerification: JSON
    states: [String!]
    settings: CompanySettings
    channels: [CompanyChannel!]
    nipostLicenseNumber: String
    deactivatedAt: DateTime
    _count: CompanyCount
    createdAt: DateTime!
  }

  type CompanySettings {
    id: ID!
    companyId: String!
    tier: SubscriptionTier!
    subscriptionStatus: SubscriptionStatus!
    periodStart: DateTime
    periodEnd: DateTime
    workingHours: JSON
    bankDetails: JSON
    ledgerBalance: Float!
    companyCode: String
    escalatedTo: EscalatedTo!
    autoAcceptTeam: Boolean!
    states: [String!]
    interstateDeliveries: Boolean!
    metadata: JSON!
    createdAt: DateTime!
  }

  type CompanyOnboardingStatus {
    hasRiders: Boolean!
    hasDeliveries: Boolean!
    hasPaymentMethod: Boolean!
  }

  type CompanyChannel {
    id: ID!
    companyId: String!
    platform: ChannelPlatform!
    platformId: String!
    status: CompanyChannelStatus!
    aiDisabled: Boolean!
    rejectionReason: String
    rejectedAt: DateTime
    removedAt: DateTime
    company: Company
    createdAt: DateTime!
  }

  type RiderListResponse {
    items: [Rider!]!
    total: Int!
  }

  type CompanyListResponse {
    items: [Company!]!
    total: Int!
  }

  type DeliveryListResponse {
    items: [Delivery!]!
    total: Int!
  }

  type DispatcherListResponse {
    items: [Dispatcher!]!
    total: Int!
  }

  type ConversationListResponse {
    items: [Conversation!]!
    total: Int!
  }

  type CompanyChannelListResponse {
    items: [CompanyChannel!]!
    total: Int!
  }

  type BulkDeliveryResponse {
    deliveries: [Delivery!]!
  }

  type AppConfig {
    pricing: PricingConfig!
    enums: EnumCatalog!
  }

  type PricingConfig {
    channelFees: [ChannelFee!]!
  }

  type ChannelFee {
    channelType: ChannelType!
    amountKobo: Int!
  }

  type EnumValue {
    name: String!
    label: String
  }

  type EnumCatalog {
    exportDataTypes: [EnumValue!]!
    vehicleTypes: [EnumValue!]!
    deliveryStatuses: [EnumValue!]!
    riderStatuses: [EnumValue!]!
    approvalStatuses: [EnumValue!]!
    subscriptionTiers: [EnumValue!]!
    subscriptionStatuses: [EnumValue!]!
    channelPlatforms: [EnumValue!]!
    channelTypes: [EnumValue!]!
    paymentMethods: [EnumValue!]!
    transactionStatuses: [EnumValue!]!
    metricDomains: [EnumValue!]!
    metricGranularities: [EnumValue!]!
  }

  type ExportType {
    id: ExportDataType!
    label: String!
    description: String!
    isDefault: Boolean!
  }

  type DeliveryResponse {
    items: [Delivery!]!
    total: Int!
    page: Int!
    totalPages: Int!
  }

  type Bank {
    bankCode: String!
    bankName: String!
  }

  type BankDetails {
    bankName: String!
    bankCode: String!
    accountNumber: String!
    accountName: String!
  }

  type PlanFeature {
    key: String!
    label: String!
    value: String!
  }

  type Plan {
    tier: SubscriptionTier!
    name: String!
    tagline: String!
    price: Float!
    period: String!
    highlights: [String!]!
    features: [PlanFeature!]!
    isPopular: Boolean!
    cta: String!
  }

  type SubscribeResponse {
    checkoutUrl: String!
    tier: SubscriptionTier!
  }

  type CancelSubscriptionResponse {
    subscriptionStatus: SubscriptionStatus!
    periodEnd: DateTime
    message: String!
  }

  type WalletBalanceResponse {
    ledgerBalance: Float!
    bankDetails: BankDetails
  }

  type RequestSettlementResponse {
    success: Boolean!
    reference: String!
    message: String!
    remainingBalance: Float!
  }

  type FundWalletResponse {
    checkoutUrl: String!
  }

  type PaymentLinksResponse {
    checkoutUrl: String!
    deliveryIds: [ID!]!
  }

  type DashboardAnalytics {
    totalDeliveries: Int!
    activeDeliveries: Int!
    onlineRiders: Int!
    totalRevenueKobo: Int!
  }

  enum MetricDomain {
    DELIVERIES
    CONVERSATIONS
    RIDERS
    REVENUE
  }

  enum MetricGranularity {
    DAY
    WEEK
    MONTH
    LIFETIME
  }

  type DailyMetric {
    date: String!
    totalDeliveries: Int!
    deliveredCount: Int!
    cancelledCount: Int!
    totalRevenueKobo: Int!
    avgDeliveryTimeMinutes: Float
    channelBreakdown: JSON
    peakHour: Int
    uniqueRidersActive: Int!
  }

  type SourceBreakdown {
    source: String!
    count: Int!
    percentage: Float!
  }

  type TrendAnalytics {
    dailyMetrics: [DailyMetric!]!
    totals: TrendTotals!
    lifetimeTotals: TrendTotals!
    bySource: [SourceBreakdown!]!
    busiestHours: [HourBucket!]!
  }

  type TrendTotals {
    totalDeliveries: Int!
    totalRevenueKobo: Int!
    avgDeliveryTimeMinutes: Float
    totalByChannel: JSON
  }

  type HourBucket {
    hour: Int!
    count: Int!
  }

  type TransactionMetadata {
    checkoutUrl: String
    fundWallet: Boolean
    error: String
    failedAt: DateTime
    reason: String
    narration: String
    trackingIds: [String!]
    requiresManualReconciliation: Boolean
    receiptSessionId: String
    isPendingReceiptClaim: Boolean
  }

  type Transaction {
    id: ID!
    type: TransactionType!
    amount: Float!
    currency: String!
    status: TransactionStatus!
    reference: String!
    provider: PaymentProvider
    description: String
    metadata: TransactionMetadata
    processedAt: DateTime
    createdAt: DateTime!
  }

  type TransactionResponse {
    items: [Transaction!]!
    total: Int!
  }

  type OAuthToken {
    accessToken: String!
    refreshToken: String
    tokenType: String!
    expiresIn: Int!
  }

  type AuthResponse {
    user: User!
    token: OAuthToken!
    riderProfile: Rider
    dispatcherProfile: Dispatcher
    companyProfile: Company
  }

  input UpdateCompanySettingsInput {
    workingHours: JSON
    companyCode: String
    escalatedTo: EscalatedTo
    autoAcceptTeam: Boolean
    states: [String!]
    interstateDeliveries: Boolean
    metadata: JSON
  }

  input DeliveryCreateInput {
    pickupAddress: String
    pickupPlaceId: String
    dropOffAddress: String!
    dropOffPlaceId: String
    description: String
    price: Float
    paymentMethod: PaymentMethod
    pickupPhone: String
    dropOffPhone: String
    riderId: ID
    scheduledAt: DateTime
    scheduledAtEnd: DateTime
    pool: Boolean
    pickupState: String
    dropOffState: String
    vehicleType: VehicleType
  }

  input DeliveryUpdateInput {
    pickupAddress: String
    pickupPlaceId: String
    pickupLat: Float
    pickupLng: Float
    dropOffAddress: String
    dropOffPlaceId: String
    dropOffLat: Float
    dropOffLng: Float
    description: String
    price: Float
    pickupPhone: String
    dropOffPhone: String
    paymentMethod: PaymentMethod
    scheduledAt: DateTime
    scheduledAtEnd: DateTime
    proofImageUrl: String
  }

  input BulkDeliveryUpdateItemInput {
    deliveryId: ID!
    input: DeliveryUpdateInput
    status: DeliveryStatus
    verificationPin: String
    proofImageUrl: String
  }

  type BulkDeliveryUpdateResult {
    deliveryId: ID!
    success: Boolean!
    delivery: Delivery
    error: String
  }

  type BulkDeliveryUpdateResponse {
    results: [BulkDeliveryUpdateResult!]!
  }

  type BulkActionResultItem {
    id: ID!
    success: Boolean!
    error: String
  }

  type BulkActionResult {
    results: [BulkActionResultItem!]!
  }

  input ManualMessageInput {
    conversationId: ID!
    body: String!
  }

  input MessageDeleteInput {
    conversationId: ID!
    messageId: ID!
  }

  type BulkMessageResult {
    conversationId: ID!
    success: Boolean!
    message: Message
    error: String
  }

  type BulkMessagesResponse {
    results: [BulkMessageResult!]!
  }

  input SubmitRiderProfileInput {
    phoneNumber: String!
    companyId: ID
    companyCode: String
    idType: IdType
    idNumber: String
    vehicleType: VehicleType
    vehicleVin: String
    vehiclePermitUrl: String
    photoUrl: String
    isIndependent: Boolean
    deviceId: String!
    platform: DevicePlatform!
  }

  input UpdateCompanyDocumentsInput {
    cac: String
    nipostLicenseNumber: String
  }

  input CreateCompanyProfileInput {
    cac: String!
    contactPhone: String!
    nipostLicenseNumber: String
    workingHours: JSON
    states: [String!]
    interstateDeliveries: Boolean
    deviceId: String!
    platform: DevicePlatform!
  }

  input JoinCompanyProfileInput {
    companyId: ID
    companyCode: String
    deviceId: String!
    platform: DevicePlatform!
  }

  type ParsedDelivery {
    pickupAddress: String
    pickupPlaceId: String
    pickupLat: Float
    pickupLng: Float
    dropOffAddress: String!
    dropOffPlaceId: String
    dropOffLat: Float
    dropOffLng: Float
    pickupPhone: String
    dropOffPhone: String
    price: Float
    paymentMethod: PaymentMethod
    description: String
    vehicleType: VehicleType
  }

  type ParseFailure {
    reason: String!
    confidence: Float!
    rawInput: String!
  }

  type ParseResult {
    deliveries: [ParsedDelivery!]!
    failures: [ParseFailure!]!
  }

  type PresignedUrlResponse {
    uploadUrl: String!
    viewUrl: String!
    r2Key: String!
  }

  input ViewportBoundsInput {
    north: Float!
    south: Float!
    east: Float!
    west: Float!
  }

  type EntityCursor {
    updatedAt: Float!
    id: ID!
  }

  input EntityCursorInput {
    updatedAt: Float!
    id: ID!
  }

  type ChannelsSyncCursor {
    lastMessageAt: Float!
    id: ID!
  }

  input ChannelsSyncCursorInput {
    lastMessageAt: Float!
    id: ID!
  }

  type ChannelsSyncResult {
    conversations: [Conversation!]!
    deletedMessageIds: [String!]
    lastUpdated: Float!
    cursor: ChannelsSyncCursor
  }

  # §7 split-sync results: one query per entity list, each with its own
  # keyset cursor and tombstone bucket.
  enum DeliverySyncScope {
    RIDER
    COMPANY
  }

  type DeliverySyncResult {
    items: [Delivery!]!
    deletedDeliveryIds: [String!]!
    cursor: EntityCursor
    lastUpdated: Float!
  }

  type RiderListSyncResult {
    items: [Rider!]!
    deletedRiderIds: [String!]!
    cursor: EntityCursor
    lastUpdated: Float!
  }

  type DispatcherListSyncResult {
    items: [Dispatcher!]!
    deletedDispatcherIds: [String!]!
    cursor: EntityCursor
    lastUpdated: Float!
  }

  type SimplePlace {
    formattedAddress: String!
    placeId: String
    displayName: String!
    lat: Float
    lng: Float
    types: [String!]
  }

  type PlaceSearchResult {
    places: [SimplePlace!]!
  }

  # Empty root placeholders (no fields here). Each surface (public/admin)
  # EXTENDS these roots from its own contiguous typeDefs block, so the shared
  # base can be composed independently with either surface AND concatenated
  # (base + public + admin) into a single union SDL for client codegen without
  # colliding on a second type Query/Mutation definition.
  type Query

  type Mutation
`;
