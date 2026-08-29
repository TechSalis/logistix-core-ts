export const publicTypeDefs = `
  extend type Query {
    # Riders
    meRider: Rider

    # Companies
    companies(search: String, limit: Int, offset: Int): CompanyListResponse!
    findCompanyByCode(code: String!): Company


    # System
    appConfig: AppConfig!

    # Client config (tier limits/retention) — standalone query, fired by clients after auth
    clientConfig: RemoteConfig!

    # Sync (delta sync with keyset pagination + viewport bounds for pool discovery)
    channelsSync(since: Float, limit: Int, cursor: ChannelsSyncCursorInput, channelType: ChannelType): ChannelsSyncResult!

    # §7 split-sync queries (one per entity list)
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

  extend type Mutation {
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
