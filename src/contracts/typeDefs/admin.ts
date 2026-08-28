export const adminTypeDefs = `
  # ── Admin Types ───────────────────────────────────────────────────────────
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
    currency: Currency!
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
