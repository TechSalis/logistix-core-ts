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
  paymentTransactions,
  subscriptionTransactions,
  eventLogs,
  ledgerTransactions,
  companyDailyMetrics,
  metrics,
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
  paymentTransactions: many(paymentTransactions),
  subscriptionTransactions: many(subscriptionTransactions),
  eventLogs: many(eventLogs),
  ledgerTransactions: many(ledgerTransactions),
  companyDailyMetrics: many(companyDailyMetrics),
  metrics: many(metrics),
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
}));

export const deliveryAllocationsRelations = relations(deliveryAllocations, ({ one }) => ({
  delivery: one(deliveries, {
    fields: [deliveryAllocations.deliveryId],
    references: [deliveries.id],
  }),
  transaction: one(paymentTransactions, {
    fields: [deliveryAllocations.transactionId],
    references: [paymentTransactions.id],
  }),
}));

export const transactionsRelations = relations(paymentTransactions, ({ one, many }) => ({
  company: one(companies, {
    fields: [paymentTransactions.companyId],
    references: [companies.id],
  }),
  deliveryAllocations: many(deliveryAllocations),
}));

export const subscriptionTransactionsRelations = relations(subscriptionTransactions, ({ one }) => ({
  company: one(companies, {
    fields: [subscriptionTransactions.companyId],
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

export const metricsRelations = relations(metrics, ({ one }) => ({
  company: one(companies, {
    fields: [metrics.companyId],
    references: [companies.id],
  }),
}));

export const ledgerTransactionsRelations = relations(ledgerTransactions, ({ one }) => ({
  company: one(companies, {
    fields: [ledgerTransactions.companyId],
    references: [companies.id],
  }),
}));
