import { relations } from 'drizzle-orm/relations';
import {
  companies,
  companySettings,
  pricingSchemes,
  companyIntegrations,
  conversations,
  messages,
  dispatchers,
  deliveries,
  riders,
  deliveryAllocations,
  deliveryTransactions,
  customerCompanyMappings,
  riderLocationLogs,
} from './schema';

export const companySettingsRelations = relations(companySettings, ({ one }) => ({
  company: one(companies, {
    fields: [companySettings.companyId],
    references: [companies.id],
  }),
}));

export const companiesRelations = relations(companies, ({ many }) => ({
  companySettings: many(companySettings),
  pricingSchemes: many(pricingSchemes),
  companyIntegrations: many(companyIntegrations),
  conversations: many(conversations),
  dispatchers: many(dispatchers),
  deliveries: many(deliveries),
  riders: many(riders),
  customerCompanyMappings: many(customerCompanyMappings),
}));

export const pricingSchemesRelations = relations(pricingSchemes, ({ one }) => ({
  company: one(companies, {
    fields: [pricingSchemes.companyId],
    references: [companies.id],
  }),
}));

export const companyIntegrationsRelations = relations(companyIntegrations, ({ one }) => ({
  company: one(companies, {
    fields: [companyIntegrations.companyId],
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
  deliveryTransaction: one(deliveryTransactions, {
    fields: [deliveryAllocations.deliveryTransactionId],
    references: [deliveryTransactions.id],
  }),
}));

export const deliveryTransactionsRelations = relations(deliveryTransactions, ({ many }) => ({
  deliveryAllocations: many(deliveryAllocations),
}));

export const customerCompanyMappingsRelations = relations(customerCompanyMappings, ({ one }) => ({
  company: one(companies, {
    fields: [customerCompanyMappings.companyId],
    references: [companies.id],
  }),
}));

export const riderLocationLogsRelations = relations(riderLocationLogs, ({ one }) => ({
  rider: one(riders, {
    fields: [riderLocationLogs.riderId],
    references: [riders.id],
  }),
}));
