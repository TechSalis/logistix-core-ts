// src/contracts/typeDefs/base.ts
var baseTypeDefs = `
  scalar DateTime
  scalar JSON

  enum DeliveryStatus {
    PENDING
    ASSIGNED
    IN_TRANSIT
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

  type RemoteConfig {
    retentionMonths: Int!
    maxBulkDeliveries: Int!
    maxExportsPerMonth: Int!
    deliveryQuota: DeliveryQuota
    rules: ClientRules!
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
    defaultMessageLimit: Int!
    validation: ValidationLimits!
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

  # \xA77 split-sync results: one query per entity list, each with its own
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
`;

// src/contracts/typeDefs/public.ts
var publicTypeDefs = `
  type Query {
    # Riders
    meRider: Rider

    # Companies
    companies(search: String, limit: Int, offset: Int): CompanyListResponse!
    findCompanyByCode(code: String!): Company


    # System
    appConfig: AppConfig!

    # Client config (tier limits/retention) \u2014 standalone query, fired by clients after auth
    clientConfig: RemoteConfig!

    # Sync (delta sync with keyset pagination + viewport bounds for pool discovery)
    channelsSync(since: Float, limit: Int, cursor: ChannelsSyncCursorInput, channelType: ChannelType): ChannelsSyncResult!

    # \xA77 split-sync queries (one per entity list)
    deliverySync(scope: DeliverySyncScope!, since: Float, limit: Int, cursor: EntityCursorInput, viewportBounds: ViewportBoundsInput): DeliverySyncResult!
    riderListSync(since: Float, limit: Int, cursor: EntityCursorInput): RiderListSyncResult!
    dispatcherListSync(since: Float, limit: Int, cursor: EntityCursorInput): DispatcherListSyncResult!

    # Channels
    channels: [CompanyChannel!]!
    conversations(filter: ConversationFilter, scope: ConversationScope, limit: Int, offset: Int): ConversationListResponse!
    plans: [Plan!]!
    exportTypes: [ExportType!]!
    needsSubscription: Boolean!
    walletBalance: WalletBalanceResponse!
    supportedBanks: [Bank!]!
    transactionHistory(limit: Int, offset: Int): TransactionResponse!

    # Analytics
    getDashboardAnalytics: DashboardAnalytics!
    trendAnalytics(
      days: Int!
      domain: MetricDomain
      granularity: MetricGranularity
    ): TrendAnalytics!

    # Deliveries History
    deliveryHistory(page: Int, limit: Int, startDate: DateTime, endDate: DateTime, status: DeliveryStatus): DeliveryResponse!

    # Places / Google Maps
    placeSearch(query: String!): PlaceSearchResult!

    # Messaging
    messages(conversationId: ID!, limit: Int, before: ID): [Message!]

    # Onboarding
    companyOnboardingStatus: CompanyOnboardingStatus!
  }

  type Mutation {
    # Onboarding & Company
    submitRiderProfile(input: SubmitRiderProfileInput!): AuthResponse!
    createCompanyProfile(input: CreateCompanyProfileInput!): AuthResponse!
    joinCompanyProfile(input: JoinCompanyProfileInput!): AuthResponse!
    updateCompanySettings(input: UpdateCompanySettingsInput!): CompanySettings!
    updateCompanyDocuments(input: UpdateCompanyDocumentsInput!): Company!
    updateDispatchersStatus(dispatcherIds: [ID!]!, status: ApprovalStatus!): BulkActionResult!
    # Deliveries
    createBulkDeliveries(deliveries: [DeliveryCreateInput!]!): BulkDeliveryResponse!
    updateBulkDeliveries(updates: [BulkDeliveryUpdateItemInput!]!): BulkDeliveryUpdateResponse!
    assignDeliveries(deliveryIds: [ID!]!, riderId: ID!): BulkActionResult!
    deleteDeliveries(deliveryIds: [ID!]!): BulkActionResult!
    rejectDeliveries(deliveryIds: [ID!]!): BulkActionResult!
    parseDeliveries(text: String!): ParseResult!
    generatePresignedTempUploadUrl(category: String!, entityId: String!, extension: String!): PresignedUrlResponse!

    # Riders (These update current logged-in rider)
    acceptRiders(riderIds: [ID!]!): BulkActionResult!
    rejectRiders(riderIds: [ID!]!): BulkActionResult!
    updateRiderLocation(lat: Float!, lng: Float!, batteryLevel: Int, pingInterval: Int, currentState: String): Rider!

    # Billing & Wallet
    requestSettlement(amount: Float!, narration: String): RequestSettlementResponse!
    fundWallet(amount: Float!): FundWalletResponse!
    subscribe(tier: SubscriptionTier!, email: String, callbackUrl: String): SubscribeResponse!
    cancelSubscription: CancelSubscriptionResponse!

    # Analytics / Export
    requestExport(targetMonth: String, email: String, dataTypes: [ExportDataType!]): ExportRequestResult!

    # Notifications
    # (FCM token updates are handled via REST POST /v1/auth/fcm-token)

    # Channels
    # (WhatsApp channels connect via REST /v1/channels/whatsapp/{connect,complete})
    # Messaging
    editMessage(conversationId: ID!, messageId: ID!, body: String!): Message

    # Channels messaging
    sendManualMessages(messages: [ManualMessageInput!]!): BulkMessagesResponse!
    deleteMessages(messages: [MessageDeleteInput!]!): BulkActionResult!
    pauseConversations(conversationIds: [ID!]!): BulkActionResult!
    releaseConversations(conversationIds: [ID!]!, adminOverride: Boolean): BulkActionResult!

    """Enable or disable AI on a channel."""
    toggleChannelAi(channelId: ID!, enabled: Boolean!): Boolean!
    actOnEscalation(conversationId: ID!, action: AdminEscalationAction!): Boolean!
    generateDeliveryPaymentLinks(deliveryIds: [ID!]!): PaymentLinksResponse!
    """Rider self-assigns a PENDING pool delivery."""
    selfAssignDelivery(deliveryId: ID!): Delivery!
  }
`;

// src/contracts/typeDefs/admin.ts
var adminTypeDefs = `
  # \u2500\u2500 Admin Types \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  enum AdminRole {
    OPERATOR
    SUPER_ADMIN
  }

  enum SecuritySeverity {
    LOW
    MEDIUM
    HIGH
    CRITICAL
  }

  type AdminSystemAnalytics {
    totalCompanies: Int!
    totalRiders: Int!
    totalDispatchers: Int!
    totalDeliveries: Int!
    totalRevenueKobo: Int!
    activeSubscriptions: Int!
    pendingPermits: Int!
    lifetimeTotals: TrendTotals!
  }

  type AdminLedgerTransactionCompany {
    id: ID!
    name: String!
  }

  type AdminLedgerTransaction {
    id: ID!
    companyId: ID!
    amount: Float!
    adjustmentType: String!
    reference: String!
    company: AdminLedgerTransactionCompany
    reason: String
    createdAt: DateTime!
  }

  type AdminLedgerListResponse {
    items: [AdminLedgerTransaction!]!
    total: Int!
  }

  enum AuditActorType {
    USER
    SYSTEM
    ANONYMOUS
  }

  type AuditEntry {
    id: ID!
    eventType: String!
    entityType: String!
    entityId: String!
    actorId: String
    actorType: AuditActorType!
    companyId: ID
    success: Boolean
    metadata: JSON
    createdAt: DateTime!
  }

  type AuditListResponse {
    items: [AuditEntry!]!
    total: Int!
  }

  type AdminSubscriptionTx {
    id: ID!
    companyId: ID!
    amount: Float!
    currency: String!
    status: TransactionStatus!
    reference: String
    provider: PaymentProvider
    tier: SubscriptionTier!
    periodStart: DateTime!
    periodEnd: DateTime
    description: String
    processedAt: DateTime
    companyName: String!
    subscriptionStatus: SubscriptionStatus!
    createdAt: DateTime!
  }

  type AdminSubscriptionListResponse {
    items: [AdminSubscriptionTx!]!
    total: Int!
  }

  type AdminUser {
    id: ID!
    userId: String!
    email: String!
    fullName: String!
    role: AdminRole!
    deactivatedAt: DateTime
    createdAt: DateTime!
  }

  type AdminUserListResponse {
    admins: [AdminUser!]!
    total: Int!
  }

  type TopAttacker {
    ip: String!
    count: Int!
  }

  type SecurityStats {
    totalIncidents: Int!
    criticalIncidents: Int!
    topAttackers: [TopAttacker!]!
    blockedIPs: Int!
  }

  type SecurityIncident {
    id: ID!
    ip: String!
    eventType: String!
    severity: SecuritySeverity!
    metadata: JSON
    blockedUntil: DateTime
    createdAt: DateTime!
  }

  type BlockedIP {
    id: ID!
    ipAddress: String!
    blockedAt: DateTime!
    blockedUntil: DateTime
    blockedBy: String
    reason: String
  }

  type SecurityData {
    incidents: [SecurityIncident!]!
    stats: SecurityStats!
    blockedIPs: [BlockedIP!]!
  }

  type MonitoringHealth {
    status: String!
    environment: String!
    monitoring: JSON!
    system: JSON!
    timestamp: DateTime!
  }

  type CompanyVerificationListResponse {
    items: [Company!]!
    total: Int!
  }

  type RiderVerificationListResponse {
    items: [Rider!]!
    total: Int!
  }

  extend type Query {
    # Admin
    systemAnalytics: AdminSystemAnalytics!
    securityIncidents(limit: Int, offset: Int, severity: SecuritySeverity): SecurityData!
    monitoringHealth: MonitoringHealth!
    adminCompanies(search: String, verificationStatus: ApprovalStatus, limit: Int, offset: Int): CompanyListResponse!
    adminCompany(id: ID!): Company
    adminPendingCompanyVerifications(limit: Int, offset: Int): CompanyVerificationListResponse!
    adminRiders(companyId: ID, search: String, status: RiderStatus, approvalStatus: ApprovalStatus, limit: Int, offset: Int): RiderListResponse!
    adminRider(id: ID!): Rider
    adminPendingRiderVerifications(limit: Int, offset: Int): RiderVerificationListResponse!
    adminDispatchers(companyId: ID, search: String, limit: Int, offset: Int): DispatcherListResponse!
    adminDeliveries(status: DeliveryStatus, companyId: ID, search: String, startDate: DateTime, endDate: DateTime, limit: Int, offset: Int): DeliveryListResponse!
    adminDelivery(id: ID!): Delivery
    adminLedger(companyId: ID, limit: Int, offset: Int): AdminLedgerListResponse!
    adminAuditLog(eventType: String, fromDate: String, toDate: String, success: Boolean, entityType: String, entityId: String, actorType: AuditActorType, limit: Int, offset: Int): AuditListResponse!
    adminAuditEventTypes: [String!]!
    adminSubscriptionTransactions(companyId: ID, limit: Int, offset: Int): AdminSubscriptionListResponse!
    adminChannels(limit: Int, offset: Int): CompanyChannelListResponse!
    adminAdmins(search: String, includeDeactivated: Boolean, limit: Int, offset: Int): AdminUserListResponse!
    adminCompanyAnalytics(companyId: ID!): DashboardAnalytics!
  }

  input AdminToggleCompanyStatusInput {
    companyId: ID!
    active: Boolean!
    deactivateChannels: Boolean
  }

  input AdminVerifyCompanyInput {
    companyId: ID!
    approved: Boolean!
    reason: String
  }

  input AdminVerifyRiderInput {
    riderId: ID!
    status: ApprovalStatus!
    note: String
  }

  enum AdminDeliveryAction {
    UPDATE_STATUS
    ASSIGN
    UPDATE
  }

  input AdminManageDeliveryInput {
    deliveryId: ID!
    action: AdminDeliveryAction!
    status: DeliveryStatus
    riderId: ID
    proofImageUrl: String
    metadata: JSON
    input: DeliveryUpdateInput
  }

  input AdminToggleAdminStatusInput {
    adminId: ID!
    active: Boolean!
  }

  input AdminAdjustLedgerInput {
    companyId: ID!
    amount: Float!
    adjustmentType: LedgerAdjustmentType!
    reason: String!
  }

  input AdminToggleAutoReplyInput {
    conversationId: ID!
    enabled: Boolean!
  }

  input AdminSendMessageInput {
    conversationId: ID!
    body: String!
  }

  extend type Mutation {
    adminToggleCompanyStatus(inputs: [AdminToggleCompanyStatusInput!]!): BulkActionResult!
    adminVerifyCompanies(inputs: [AdminVerifyCompanyInput!]!): BulkActionResult!
    adminVerifyRiders(inputs: [AdminVerifyRiderInput!]!): BulkActionResult!
    adminManageDeliveries(inputs: [AdminManageDeliveryInput!]!): BulkActionResult!
    adminToggleAdminStatus(inputs: [AdminToggleAdminStatusInput!]!): BulkActionResult!
    adminAdjustLedger(inputs: [AdminAdjustLedgerInput!]!): BulkActionResult!
    adminToggleConversationAutoReply(inputs: [AdminToggleAutoReplyInput!]!): BulkActionResult!

    """Send a manual customer-facing message into a conversation on behalf of an
    admin. Claims the conversation as ADMIN-handled with AI paused, and returns
    a bulk-style result. The escalation, if any, is left OPEN for the admin to
    resolve explicitly."""
    adminSendMessage(input: AdminSendMessageInput!): BulkMessageResult
  }
`;

// src/contracts/index.ts
var CONTRACTS_SCHEMA_PATH = "contracts/schema.graphql";
export {
  CONTRACTS_SCHEMA_PATH,
  adminTypeDefs,
  baseTypeDefs,
  publicTypeDefs
};
