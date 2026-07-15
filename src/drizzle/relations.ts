import { relations } from 'drizzle-orm/relations';
import {
  companies,
  companySettings,
  companyChannels,
  conversations,
  messages,
  dispatchers,
  deliveries,
  riders,
  deliveryAllocations,
  transactions,
  riderLocationLogs,
  escalations,
  eventLogs,
  exportRequests,
  ledgerTransactions,
  companyDailyMetrics,
} from './schema.js';

export const companySettingsRelations = relations(companySettings, ({ one }) => ({
  company: one(companies, {
    fields: [companySettings.companyId],
    references: [companies.id],
  }),
}));

export const companiesRelations = relations(companies, ({ many, one }) => ({
  companySettings: one(companySettings),
  companyChannels: many(companyChannels),
  conversations: many(conversations),
  dispatchers: many(dispatchers),
  deliveries: many(deliveries),
  riders: many(riders),
  transactions: many(transactions),
  eventLogs: many(eventLogs),
  exportRequests: many(exportRequests),
  escalations: many(escalations),
  ledgerTransactions: many(ledgerTransactions),
  companyDailyMetrics: many(companyDailyMetrics),
}));

export const companyChannelsRelations = relations(companyChannels, ({ one }) => ({
  company: one(companies, {
    fields: [companyChannels.companyId],
    references: [companies.id],
  }),
}));

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  company: one(companies, {
    fields: [conversations.companyId],
    references: [companies.id],
  }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}));

export const dispatchersRelations = relations(dispatchers, ({ one }) => ({
  company: one(companies, {
    fields: [dispatchers.companyId],
    references: [companies.id],
  }),
}));

export const deliveriesRelations = relations(deliveries, ({ one, many }) => ({
  company: one(companies, {
    fields: [deliveries.companyId],
    references: [companies.id],
  }),
  rider: one(riders, {
    fields: [deliveries.riderId],
    references: [riders.id],
  }),
  deliveryAllocations: many(deliveryAllocations),
}));

export const ridersRelations = relations(riders, ({ one, many }) => ({
  deliveries: many(deliveries),
  company: one(companies, {
    fields: [riders.companyId],
    references: [companies.id],
  }),
  riderLocationLogs: many(riderLocationLogs),
}));

export const deliveryAllocationsRelations = relations(deliveryAllocations, ({ one }) => ({
  delivery: one(deliveries, {
    fields: [deliveryAllocations.deliveryId],
    references: [deliveries.id],
  }),
  transaction: one(transactions, {
    fields: [deliveryAllocations.transactionId],
    references: [transactions.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one, many }) => ({
  company: one(companies, {
    fields: [transactions.companyId],
    references: [companies.id],
  }),
  deliveryAllocations: many(deliveryAllocations),
}));

export const riderLocationLogsRelations = relations(riderLocationLogs, ({ one }) => ({
  rider: one(riders, {
    fields: [riderLocationLogs.riderId],
    references: [riders.id],
  }),
}));

export const escalationsRelations = relations(escalations, ({ one }) => ({
  conversation: one(conversations, {
    fields: [escalations.conversationId],
    references: [conversations.id],
  }),
  company: one(companies, {
    fields: [escalations.companyId],
    references: [companies.id],
  }),
}));

export const eventLogsRelations = relations(eventLogs, ({ one }) => ({
  company: one(companies, {
    fields: [eventLogs.companyId],
    references: [companies.id],
  }),
}));

export const companyDailyMetricsRelations = relations(companyDailyMetrics, ({ one }) => ({
  company: one(companies, {
    fields: [companyDailyMetrics.companyId],
    references: [companies.id],
  }),
}));

export const exportRequestsRelations = relations(exportRequests, ({ one }) => ({
  company: one(companies, {
    fields: [exportRequests.companyId],
    references: [companies.id],
  }),
  rider: one(riders, {
    fields: [exportRequests.riderId],
    references: [riders.id],
  }),
}));
