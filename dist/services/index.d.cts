import * as drizzle_orm from 'drizzle-orm';
import * as drizzle_orm_pg_core from 'drizzle-orm/pg-core';
import { PgDatabase } from 'drizzle-orm/pg-core';
import { n as ConversationHandlerType, i as ChannelPlatform, a1 as SecuritySeverity, J as JobType, ae as WithRetryOptions } from '../retry-CX-xw8l7.cjs';

declare const deliveryStatus: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const ledgerAdjustmentType: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const channelPlatform: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const companyChannelStatus: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const messageStatus: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const paymentMethod: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const approvalStatus: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const riderStatus: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const senderType: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const subscriptionTier: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const transactionStatus: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const transactionType: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const paymentProvider: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const subscriptionStatus: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const channelType: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const escalatedTo: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const escalationStatus: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const eventType: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const entityType: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const adminRoleEnum: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const dispatcherRoleEnum: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const metricDomain: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const metricGranularity: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const devicePlatform: drizzle_orm_pg_core.PgEnum<[string, ...string[]]>;
declare const users: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "users";
    schema: "auth";
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "users";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        phoneVerifiedAt: drizzle_orm_pg_core.PgColumn<{
            name: "phone_verified_at";
            tableName: "users";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const companies: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "companies";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        cac: drizzle_orm_pg_core.PgColumn<{
            name: "cac";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        nipostLicenseNumber: drizzle_orm_pg_core.PgColumn<{
            name: "nipost_license_number";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        contactPhone: drizzle_orm_pg_core.PgColumn<{
            name: "contact_phone";
            tableName: "companies";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        verificationStatus: drizzle_orm_pg_core.PgColumn<{
            name: "verification_status";
            tableName: "companies";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "companies";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deactivatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "deactivated_at";
            tableName: "companies";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "companies";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const companySettings: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "company_settings";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "company_settings";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "company_settings";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        tier: drizzle_orm_pg_core.PgColumn<{
            name: "tier";
            tableName: "company_settings";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        subscriptionStatus: drizzle_orm_pg_core.PgColumn<{
            name: "subscription_status";
            tableName: "company_settings";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        periodStart: drizzle_orm_pg_core.PgColumn<{
            name: "period_start";
            tableName: "company_settings";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        periodEnd: drizzle_orm_pg_core.PgColumn<{
            name: "period_end";
            tableName: "company_settings";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        squadTokenId: drizzle_orm_pg_core.PgColumn<{
            name: "squad_token_id";
            tableName: "company_settings";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        workingHours: drizzle_orm_pg_core.PgColumn<{
            name: "working_hours";
            tableName: "company_settings";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        bankDetails: drizzle_orm_pg_core.PgColumn<{
            name: "bank_details";
            tableName: "company_settings";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ledgerBalance: drizzle_orm_pg_core.PgColumn<{
            name: "ledger_balance";
            tableName: "company_settings";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyCode: drizzle_orm_pg_core.PgColumn<{
            name: "company_code";
            tableName: "company_settings";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        escalatedTo: drizzle_orm_pg_core.PgColumn<{
            name: "escalated_to";
            tableName: "company_settings";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "company_settings";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        autoAcceptTeam: drizzle_orm_pg_core.PgColumn<{
            name: "auto_accept_team";
            tableName: "company_settings";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        states: drizzle_orm_pg_core.PgColumn<{
            name: "states";
            tableName: "company_settings";
            dataType: "array";
            columnType: "PgArray";
            data: string[];
            driverParam: string | string[];
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: drizzle_orm.Column<{
                name: "";
                tableName: "company_settings";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            identity: undefined;
            generated: undefined;
        }, {}, {
            baseBuilder: drizzle_orm_pg_core.PgColumnBuilder<{
                name: "";
                dataType: "string";
                columnType: "PgText";
                data: string;
                enumValues: [string, ...string[]];
                driverParam: string;
            }, {}, {}, drizzle_orm.ColumnBuilderExtraConfig>;
            size: undefined;
        }>;
        interstateDeliveries: drizzle_orm_pg_core.PgColumn<{
            name: "interstate_deliveries";
            tableName: "company_settings";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "company_settings";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const companyChannels: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "company_channels";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "company_channels";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        platform: drizzle_orm_pg_core.PgColumn<{
            name: "platform";
            tableName: "company_channels";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        platformId: drizzle_orm_pg_core.PgColumn<{
            name: "platform_id";
            tableName: "company_channels";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "company_channels";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "company_channels";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "company_channels";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        aiDisabled: drizzle_orm_pg_core.PgColumn<{
            name: "ai_disabled";
            tableName: "company_channels";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        rejectionReason: drizzle_orm_pg_core.PgColumn<{
            name: "rejection_reason";
            tableName: "company_channels";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        rejectedAt: drizzle_orm_pg_core.PgColumn<{
            name: "rejected_at";
            tableName: "company_channels";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        removedAt: drizzle_orm_pg_core.PgColumn<{
            name: "removed_at";
            tableName: "company_channels";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "company_channels";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const conversations: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "conversations";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        platform: drizzle_orm_pg_core.PgColumn<{
            name: "platform";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        platformId: drizzle_orm_pg_core.PgColumn<{
            name: "platform_id";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastMessageAt: drizzle_orm_pg_core.PgColumn<{
            name: "last_message_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        escalatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "escalated_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        escalationStatus: drizzle_orm_pg_core.PgColumn<{
            name: "escalation_status";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        escalatedTo: drizzle_orm_pg_core.PgColumn<{
            name: "escalated_to";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        escalatedBy: drizzle_orm_pg_core.PgColumn<{
            name: "escalated_by";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        resolvedAt: drizzle_orm_pg_core.PgColumn<{
            name: "resolved_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        resolution: drizzle_orm_pg_core.PgColumn<{
            name: "resolution";
            tableName: "conversations";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "conversations";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        channelType: drizzle_orm_pg_core.PgColumn<{
            name: "channel_type";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastCustomerMessageAt: drizzle_orm_pg_core.PgColumn<{
            name: "last_customer_message_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        memory: drizzle_orm_pg_core.PgColumn<{
            name: "memory";
            tableName: "conversations";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        handledBy: drizzle_orm_pg_core.PgColumn<{
            name: "handled_by";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        handledByType: drizzle_orm_pg_core.PgColumn<{
            name: "handled_by_type";
            tableName: "conversations";
            dataType: "string";
            columnType: "PgText";
            data: ConversationHandlerType;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: ConversationHandlerType;
        }>;
        handledAt: drizzle_orm_pg_core.PgColumn<{
            name: "handled_at";
            tableName: "conversations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const messages: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "messages";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        conversationId: drizzle_orm_pg_core.PgColumn<{
            name: "conversation_id";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        body: drizzle_orm_pg_core.PgColumn<{
            name: "body";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        senderType: drizzle_orm_pg_core.PgColumn<{
            name: "sender_type";
            tableName: "messages";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        senderId: drizzle_orm_pg_core.PgColumn<{
            name: "sender_id";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        isDeleted: drizzle_orm_pg_core.PgColumn<{
            name: "is_deleted";
            tableName: "messages";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "messages";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        mediaUrl: drizzle_orm_pg_core.PgColumn<{
            name: "media_url";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        externalId: drizzle_orm_pg_core.PgColumn<{
            name: "external_id";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        replyToExternalId: drizzle_orm_pg_core.PgColumn<{
            name: "reply_to_external_id";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "messages";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        actionType: drizzle_orm_pg_core.PgColumn<{
            name: "action_type";
            tableName: "messages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "messages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "messages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const admins: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "admins";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "admins";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "admins";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        email: drizzle_orm_pg_core.PgColumn<{
            name: "email";
            tableName: "admins";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        fullName: drizzle_orm_pg_core.PgColumn<{
            name: "full_name";
            tableName: "admins";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        role: drizzle_orm_pg_core.PgColumn<{
            name: "role";
            tableName: "admins";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deactivatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "deactivated_at";
            tableName: "admins";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "admins";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const dispatchers: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "dispatchers";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        email: drizzle_orm_pg_core.PgColumn<{
            name: "email";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        fullName: drizzle_orm_pg_core.PgColumn<{
            name: "full_name";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        role: drizzle_orm_pg_core.PgColumn<{
            name: "role";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        approvalStatus: drizzle_orm_pg_core.PgColumn<{
            name: "approval_status";
            tableName: "dispatchers";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deactivatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "deactivated_at";
            tableName: "dispatchers";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "dispatchers";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "dispatchers";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const blockedIps: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "blocked_ips";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "blocked_ips";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ipAddress: drizzle_orm_pg_core.PgColumn<{
            name: "ip_address";
            tableName: "blocked_ips";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "blocked_ips";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        reason: drizzle_orm_pg_core.PgColumn<{
            name: "reason";
            tableName: "blocked_ips";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        blockedBy: drizzle_orm_pg_core.PgColumn<{
            name: "blocked_by";
            tableName: "blocked_ips";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        expiresAt: drizzle_orm_pg_core.PgColumn<{
            name: "expires_at";
            tableName: "blocked_ips";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "blocked_ips";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const phoneVerifications: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "phone_verifications";
    schema: undefined;
    columns: {
        userId: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "phone_verifications";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        phone: drizzle_orm_pg_core.PgColumn<{
            name: "phone";
            tableName: "phone_verifications";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        verifiedAt: drizzle_orm_pg_core.PgColumn<{
            name: "verified_at";
            tableName: "phone_verifications";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const refreshSessions: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "refresh_sessions";
    schema: undefined;
    columns: {
        jti: drizzle_orm_pg_core.PgColumn<{
            name: "jti";
            tableName: "refresh_sessions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "refresh_sessions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deviceId: drizzle_orm_pg_core.PgColumn<{
            name: "device_id";
            tableName: "refresh_sessions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        tokenHash: drizzle_orm_pg_core.PgColumn<{
            name: "token_hash";
            tableName: "refresh_sessions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        issuedAt: drizzle_orm_pg_core.PgColumn<{
            name: "issued_at";
            tableName: "refresh_sessions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        expiresAt: drizzle_orm_pg_core.PgColumn<{
            name: "expires_at";
            tableName: "refresh_sessions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastActiveAt: drizzle_orm_pg_core.PgColumn<{
            name: "last_active_at";
            tableName: "refresh_sessions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        revokedAt: drizzle_orm_pg_core.PgColumn<{
            name: "revoked_at";
            tableName: "refresh_sessions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        replacedBy: drizzle_orm_pg_core.PgColumn<{
            name: "replaced_by";
            tableName: "refresh_sessions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const deviceTokens: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "device_tokens";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "device_tokens";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "device_tokens";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deviceId: drizzle_orm_pg_core.PgColumn<{
            name: "device_id";
            tableName: "device_tokens";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        platform: drizzle_orm_pg_core.PgColumn<{
            name: "platform";
            tableName: "device_tokens";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        fcmToken: drizzle_orm_pg_core.PgColumn<{
            name: "fcm_token";
            tableName: "device_tokens";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "device_tokens";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "device_tokens";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const deliveries: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "deliveries";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdBy: drizzle_orm_pg_core.PgColumn<{
            name: "created_by";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        riderId: drizzle_orm_pg_core.PgColumn<{
            name: "rider_id";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pickupAddress: drizzle_orm_pg_core.PgColumn<{
            name: "pickup_address";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pickupState: drizzle_orm_pg_core.PgColumn<{
            name: "pickup_state";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dropOffAddress: drizzle_orm_pg_core.PgColumn<{
            name: "drop_off_address";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dropOffState: drizzle_orm_pg_core.PgColumn<{
            name: "drop_off_state";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        description: drizzle_orm_pg_core.PgColumn<{
            name: "description";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pickupLat: drizzle_orm_pg_core.PgColumn<{
            name: "pickup_lat";
            tableName: "deliveries";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pickupLng: drizzle_orm_pg_core.PgColumn<{
            name: "pickup_lng";
            tableName: "deliveries";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dropOffLat: drizzle_orm_pg_core.PgColumn<{
            name: "drop_off_lat";
            tableName: "deliveries";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dropOffLng: drizzle_orm_pg_core.PgColumn<{
            name: "drop_off_lng";
            tableName: "deliveries";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pickupPhone: drizzle_orm_pg_core.PgColumn<{
            name: "pickup_phone";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dropOffPhone: drizzle_orm_pg_core.PgColumn<{
            name: "drop_off_phone";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        paymentMethod: drizzle_orm_pg_core.PgColumn<{
            name: "payment_method";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        scheduledAt: drizzle_orm_pg_core.PgColumn<{
            name: "scheduled_at";
            tableName: "deliveries";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        scheduledAtEnd: drizzle_orm_pg_core.PgColumn<{
            name: "scheduled_at_end";
            tableName: "deliveries";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        assignedAt: drizzle_orm_pg_core.PgColumn<{
            name: "assigned_at";
            tableName: "deliveries";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deliveredAt: drizzle_orm_pg_core.PgColumn<{
            name: "delivered_at";
            tableName: "deliveries";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "deliveries";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "deliveries";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        trackingId: drizzle_orm_pg_core.PgColumn<{
            name: "tracking_id";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pin: drizzle_orm_pg_core.PgColumn<{
            name: "pin";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        price: drizzle_orm_pg_core.PgColumn<{
            name: "price";
            tableName: "deliveries";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "deliveries";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        creatorPlatform: drizzle_orm_pg_core.PgColumn<{
            name: "creator_platform";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: ChannelPlatform;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: ChannelPlatform;
        }>;
        pool: drizzle_orm_pg_core.PgColumn<{
            name: "pool";
            tableName: "deliveries";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        vehicleType: drizzle_orm_pg_core.PgColumn<{
            name: "vehicle_type";
            tableName: "deliveries";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const riders: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "riders";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        email: drizzle_orm_pg_core.PgColumn<{
            name: "email";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        fullName: drizzle_orm_pg_core.PgColumn<{
            name: "full_name";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        vehicleType: drizzle_orm_pg_core.PgColumn<{
            name: "vehicle_type";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        approvalStatus: drizzle_orm_pg_core.PgColumn<{
            name: "approval_status";
            tableName: "riders";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "riders";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastLat: drizzle_orm_pg_core.PgColumn<{
            name: "last_lat";
            tableName: "riders";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastLng: drizzle_orm_pg_core.PgColumn<{
            name: "last_lng";
            tableName: "riders";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        lastSeen: drizzle_orm_pg_core.PgColumn<{
            name: "last_seen";
            tableName: "riders";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        phoneNumber: drizzle_orm_pg_core.PgColumn<{
            name: "phone_number";
            tableName: "riders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "riders";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deactivatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "deactivated_at";
            tableName: "riders";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "riders";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "riders";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const paymentTransactions: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "payment_transactions";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "payment_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "payment_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        type: drizzle_orm_pg_core.PgColumn<{
            name: "type";
            tableName: "payment_transactions";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        amount: drizzle_orm_pg_core.PgColumn<{
            name: "amount";
            tableName: "payment_transactions";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        currency: drizzle_orm_pg_core.PgColumn<{
            name: "currency";
            tableName: "payment_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "payment_transactions";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        reference: drizzle_orm_pg_core.PgColumn<{
            name: "reference";
            tableName: "payment_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        provider: drizzle_orm_pg_core.PgColumn<{
            name: "provider";
            tableName: "payment_transactions";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        description: drizzle_orm_pg_core.PgColumn<{
            name: "description";
            tableName: "payment_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "payment_transactions";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        processedAt: drizzle_orm_pg_core.PgColumn<{
            name: "processed_at";
            tableName: "payment_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "payment_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const subscriptionTransactions: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "subscription_transactions";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        amount: drizzle_orm_pg_core.PgColumn<{
            name: "amount";
            tableName: "subscription_transactions";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        currency: drizzle_orm_pg_core.PgColumn<{
            name: "currency";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        status: drizzle_orm_pg_core.PgColumn<{
            name: "status";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        reference: drizzle_orm_pg_core.PgColumn<{
            name: "reference";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        provider: drizzle_orm_pg_core.PgColumn<{
            name: "provider";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        tier: drizzle_orm_pg_core.PgColumn<{
            name: "tier";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        periodStart: drizzle_orm_pg_core.PgColumn<{
            name: "period_start";
            tableName: "subscription_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        periodEnd: drizzle_orm_pg_core.PgColumn<{
            name: "period_end";
            tableName: "subscription_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        description: drizzle_orm_pg_core.PgColumn<{
            name: "description";
            tableName: "subscription_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "subscription_transactions";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        processedAt: drizzle_orm_pg_core.PgColumn<{
            name: "processed_at";
            tableName: "subscription_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "subscription_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const deliveryAllocations: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "delivery_allocations";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "delivery_allocations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deliveryId: drizzle_orm_pg_core.PgColumn<{
            name: "delivery_id";
            tableName: "delivery_allocations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        transactionId: drizzle_orm_pg_core.PgColumn<{
            name: "transaction_id";
            tableName: "delivery_allocations";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        amount: drizzle_orm_pg_core.PgColumn<{
            name: "amount";
            tableName: "delivery_allocations";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "delivery_allocations";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const ledgerTransactions: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "ledger_transactions";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "ledger_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "ledger_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        amount: drizzle_orm_pg_core.PgColumn<{
            name: "amount";
            tableName: "ledger_transactions";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        adjustmentType: drizzle_orm_pg_core.PgColumn<{
            name: "adjustment_type";
            tableName: "ledger_transactions";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        reference: drizzle_orm_pg_core.PgColumn<{
            name: "reference";
            tableName: "ledger_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        reason: drizzle_orm_pg_core.PgColumn<{
            name: "reason";
            tableName: "ledger_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        performedBy: drizzle_orm_pg_core.PgColumn<{
            name: "performed_by";
            tableName: "ledger_transactions";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "ledger_transactions";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "ledger_transactions";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const eventLogs: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "event_logs";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        eventType: drizzle_orm_pg_core.PgColumn<{
            name: "event_type";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        entityType: drizzle_orm_pg_core.PgColumn<{
            name: "entity_type";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        entityId: drizzle_orm_pg_core.PgColumn<{
            name: "entity_id";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        actorId: drizzle_orm_pg_core.PgColumn<{
            name: "actor_id";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        metadata: drizzle_orm_pg_core.PgColumn<{
            name: "metadata";
            tableName: "event_logs";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        severity: drizzle_orm_pg_core.PgColumn<{
            name: "severity";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: SecuritySeverity;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: SecuritySeverity;
        }>;
        ipAddress: drizzle_orm_pg_core.PgColumn<{
            name: "ip_address";
            tableName: "event_logs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        success: drizzle_orm_pg_core.PgColumn<{
            name: "success";
            tableName: "event_logs";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "event_logs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
declare const eventOutbox: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "event_outbox";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "event_outbox";
            dataType: "number";
            columnType: "PgBigInt53";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: "always";
            generated: undefined;
        }, {}, {}>;
        channel: drizzle_orm_pg_core.PgColumn<{
            name: "channel";
            tableName: "event_outbox";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        payload: drizzle_orm_pg_core.PgColumn<{
            name: "payload";
            tableName: "event_outbox";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "event_outbox";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Durable idempotency store. Backs cross-instance/restart-safe idempotency claims:
 * the `key` text PK is the atomic claim arbiter (INSERT ... ON CONFLICT DO NOTHING
 * wins one claim), `response` is NULL while a claim is in-flight and holds the
 * serialized result once execution completes, and `expires_at` implements the TTL
 * (expired rows are reclaimable). See backend src/core/services/idempotency.service.ts.
 */
declare const idempotencyKeys: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "idempotency_keys";
    schema: undefined;
    columns: {
        key: drizzle_orm_pg_core.PgColumn<{
            name: "key";
            tableName: "idempotency_keys";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        response: drizzle_orm_pg_core.PgColumn<{
            name: "response";
            tableName: "idempotency_keys";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        expiresAt: drizzle_orm_pg_core.PgColumn<{
            name: "expires_at";
            tableName: "idempotency_keys";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "idempotency_keys";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Unified metrics table. Single write target keyed by domain + granularity,
 * superseding the legacy company_daily_metrics / company_lifetime_metrics
 * tables (dropped after the one-time backfill into this table).
 *
 * - `company_id` NULL = system-wide pool bucket (all companies summed).
 * - `domain` = DELIVERIES | CONVERSATIONS | RIDERS | REVENUE; each domain only
 *   fills the columns that are meaningful for it (see metrics.config.ts for
 *   the per-domain mapping). Unused columns stay at their defaults.
 * - `granularity` = DAY | WEEK | MONTH | LIFETIME. Finer buckets are folded
 *   into coarser ones by the workers' compression ladder per METRICS_RETENTION.
 * - `bucket_start` = bucket boundary date in the Lagos timezone (Monday for
 *   WEEK, the 1st for MONTH). LIFETIME rows use the LIFETIME_BUCKET_START
 *   sentinel so the unique index yields exactly one row per scope+domain.
 *
 * A single UNIQUE NULLS NOT DISTINCT over (company_id, domain, granularity,
 * bucket_start) guarantees one row per company scope AND exactly one system
 * row (NULL company_id treated as equal, not DISTINCT).
 */
declare const metrics: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "metrics";
    schema: undefined;
    columns: {
        companyId: drizzle_orm_pg_core.PgColumn<{
            name: "company_id";
            tableName: "metrics";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        domain: drizzle_orm_pg_core.PgColumn<{
            name: "domain";
            tableName: "metrics";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        granularity: drizzle_orm_pg_core.PgColumn<{
            name: "granularity";
            tableName: "metrics";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        bucketStart: drizzle_orm_pg_core.PgColumn<{
            name: "bucket_start";
            tableName: "metrics";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        totalCount: drizzle_orm_pg_core.PgColumn<{
            name: "total_count";
            tableName: "metrics";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        deliveredCount: drizzle_orm_pg_core.PgColumn<{
            name: "delivered_count";
            tableName: "metrics";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        cancelledCount: drizzle_orm_pg_core.PgColumn<{
            name: "cancelled_count";
            tableName: "metrics";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        failedCount: drizzle_orm_pg_core.PgColumn<{
            name: "failed_count";
            tableName: "metrics";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        totalRevenueKobo: drizzle_orm_pg_core.PgColumn<{
            name: "total_revenue_kobo";
            tableName: "metrics";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        avgDeliveryTimeMinutes: drizzle_orm_pg_core.PgColumn<{
            name: "avg_delivery_time_minutes";
            tableName: "metrics";
            dataType: "number";
            columnType: "PgDoublePrecision";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        channelBreakdown: drizzle_orm_pg_core.PgColumn<{
            name: "channel_breakdown";
            tableName: "metrics";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        extraMetrics: drizzle_orm_pg_core.PgColumn<{
            name: "extra_metrics";
            tableName: "metrics";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        peakHour: drizzle_orm_pg_core.PgColumn<{
            name: "peak_hour";
            tableName: "metrics";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        uniqueRidersActive: drizzle_orm_pg_core.PgColumn<{
            name: "unique_riders_active";
            tableName: "metrics";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "metrics";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "metrics";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;

declare const companySettingsRelations: drizzle_orm.Relations<"company_settings", {
    company: drizzle_orm.One<"companies", true>;
}>;
declare const companiesRelations: drizzle_orm.Relations<"companies", {
    companySettings: drizzle_orm.One<"company_settings", false>;
    companyChannels: drizzle_orm.Many<"company_channels">;
    conversations: drizzle_orm.Many<"conversations">;
    dispatchers: drizzle_orm.Many<"dispatchers">;
    deliveries: drizzle_orm.Many<"deliveries">;
    riders: drizzle_orm.Many<"riders">;
    paymentTransactions: drizzle_orm.Many<"payment_transactions">;
    subscriptionTransactions: drizzle_orm.Many<"subscription_transactions">;
    eventLogs: drizzle_orm.Many<"event_logs">;
    ledgerTransactions: drizzle_orm.Many<"ledger_transactions">;
    metrics: drizzle_orm.Many<"metrics">;
}>;
declare const companyChannelsRelations: drizzle_orm.Relations<"company_channels", {
    company: drizzle_orm.One<"companies", true>;
}>;
declare const conversationsRelations: drizzle_orm.Relations<"conversations", {
    company: drizzle_orm.One<"companies", false>;
    messages: drizzle_orm.Many<"messages">;
}>;
declare const messagesRelations: drizzle_orm.Relations<"messages", {
    conversation: drizzle_orm.One<"conversations", true>;
}>;
declare const dispatchersRelations: drizzle_orm.Relations<"dispatchers", {
    company: drizzle_orm.One<"companies", false>;
}>;
declare const deliveriesRelations: drizzle_orm.Relations<"deliveries", {
    company: drizzle_orm.One<"companies", false>;
    rider: drizzle_orm.One<"riders", false>;
    deliveryAllocations: drizzle_orm.Many<"delivery_allocations">;
}>;
declare const ridersRelations: drizzle_orm.Relations<"riders", {
    deliveries: drizzle_orm.Many<"deliveries">;
    company: drizzle_orm.One<"companies", false>;
}>;
declare const deliveryAllocationsRelations: drizzle_orm.Relations<"delivery_allocations", {
    delivery: drizzle_orm.One<"deliveries", true>;
    transaction: drizzle_orm.One<"payment_transactions", true>;
}>;
declare const transactionsRelations: drizzle_orm.Relations<"payment_transactions", {
    company: drizzle_orm.One<"companies", false>;
    deliveryAllocations: drizzle_orm.Many<"delivery_allocations">;
}>;
declare const subscriptionTransactionsRelations: drizzle_orm.Relations<"subscription_transactions", {
    company: drizzle_orm.One<"companies", true>;
}>;
declare const eventLogsRelations: drizzle_orm.Relations<"event_logs", {
    company: drizzle_orm.One<"companies", false>;
}>;
declare const metricsRelations: drizzle_orm.Relations<"metrics", {
    company: drizzle_orm.One<"companies", false>;
}>;
declare const ledgerTransactionsRelations: drizzle_orm.Relations<"ledger_transactions", {
    company: drizzle_orm.One<"companies", true>;
}>;

type AlertLevel = 'info' | 'warning' | 'critical';
declare function sendAlert(level: AlertLevel, title: string, details: string, webhookUrl?: string): Promise<void>;
declare function resetAlertCooldownsForTest(): void;

interface EmailAttachment {
    filename: string;
    content: string;
}
interface SendEmailOptions {
    from: string;
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    attachments?: EmailAttachment[];
}
interface SendEmailResult {
    id: string;
}
interface SmtpConfig {
    host: string;
    port: number;
    user?: string;
    pass?: string;
}
interface SmtpEnvVars {
    SMTP_HOST?: string;
    SMTP_PORT?: string;
    SMTP_USER?: string;
    SMTP_PASS?: string;
}
declare function buildSmtpConfig(env: SmtpEnvVars): SmtpConfig | null;
declare class EmailService {
    private readonly smtp?;
    constructor(smtp?: (SmtpConfig | null) | undefined);
    sendEmail(options: SendEmailOptions): Promise<SendEmailResult>;
}

/**
 * AES-256-GCM encrypt/decrypt pair bound to a current key and an optional
 * rotated-out key. The previous key is a decrypt-only fallback for payloads
 * whose version does not match the current key — it is never used to encrypt.
 *
 * Pure crypto factory: it performs no config/env reads, so callers own key
 * resolution (env, Vault, etc.). Errors are plain `Error` instances with the
 * message `Invalid encrypted format`; callers in app layers map them to their
 * own error types if needed.
 */
declare function createEncryptor(currentKey: string, previousKey?: string): {
    encrypt: (plaintext: string) => string;
    decrypt: (payload: string) => string;
    decryptWithKeyVersion: (payload: string) => {
        plaintext: string;
        version: string;
    };
    reencryptIfNeeded: (payload: string) => string;
};
type Encryptor = ReturnType<typeof createEncryptor>;

/**
 * Lightweight FCM sender using the Firebase HTTP v1 REST API.
 * Works in Node.js (backend) and CF Workers (workers) — no firebase-admin dependency.
 *
 * Supports: single send, batch send, topic messaging, topic subscribe/unsubscribe.
 * Caches OAuth2 access tokens for 55 min (tokens valid for 60 min).
 */
interface FcmCredentials {
    projectId: string;
    clientEmail: string;
    privateKey: string;
}
interface FcmMessage {
    token: string;
    title: string;
    body: string;
    data?: Record<string, string>;
}
interface FcmResponse {
    success: boolean;
    messageId?: string;
    error?: string;
    errorCode?: string;
}
declare class FcmService {
    private readonly credentials;
    private cachedToken;
    constructor(credentials: FcmCredentials);
    /** Send a single push notification. */
    send(message: FcmMessage): Promise<FcmResponse>;
    /** Send to multiple tokens. One failure does not block others. */
    sendBatch(messages: FcmMessage[]): Promise<FcmResponse[]>;
    /** Send a notification to an FCM topic. */
    sendToTopic(topic: string, title: string, body: string, data?: Record<string, string>): Promise<FcmResponse>;
    /** Subscribe a token to an FCM topic. */
    subscribeToTopic(token: string, topic: string): Promise<FcmResponse>;
    /** Unsubscribe a token from an FCM topic. */
    unsubscribeFromTopic(token: string, topic: string): Promise<FcmResponse>;
    private topicAction;
    private getAccessToken;
}

type DrizzleDB = PgDatabase<any, any, any>;
interface JobRow {
    id: string;
    type: string;
    payload: Record<string, unknown>;
    status: string;
    priority: number;
    maxRetries: number;
    retryCount: number;
    lastError: string | null;
    scheduledAt: Date | null;
    startedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    companyId: string | null;
    dedupeKey: string | null;
}
interface EnqueueOptions {
    priority?: number;
    maxRetries?: number;
    scheduledAt?: Date;
}
interface EnqueueWithDedupeOptions extends EnqueueOptions {
    companyId?: string | null;
    dedupeKey?: string | null;
}
declare class PermanentJobError extends Error {
    constructor(message: string);
}
interface DrainOptions {
    maxJobs: number;
    timeBudgetMs?: number;
    batchSize?: number;
    onError?: (message: string, error?: unknown) => void;
}
interface DrainResult {
    processed: number;
    succeeded: number;
    failed: number;
}
type QueueHandler = (job: JobRow) => Promise<void>;
declare class QueueService {
    private lastPruneAtMs;
    enqueue(db: DrizzleDB, type: JobType, payload?: Record<string, unknown>, options?: EnqueueOptions): Promise<JobRow>;
    enqueueWithDedupe(db: DrizzleDB, type: JobType, payload?: Record<string, unknown>, options?: EnqueueWithDedupeOptions): Promise<JobRow | null>;
    countRecent(db: DrizzleDB, type: JobType, companyId: string, since: Date): Promise<number>;
    drain(db: DrizzleDB, type: JobType, handler: QueueHandler, options: DrainOptions): Promise<DrainResult>;
    pruneTerminal(db: DrizzleDB, queueName: string): Promise<number>;
}
declare const queueService: QueueService;

interface PaymentAllocationTransaction {
    id: string;
    amount: number;
    companyId: string | null;
    deliveryAllocations?: Array<{
        deliveryId: string;
    }>;
    metadata?: unknown;
}
interface PaymentAllocationResult {
    fullyPaidIds: string[];
    updatedDeliveryIds: string[];
    /** Company IDs whose ledgers were credited — callers invalidate caches on these. */
    creditedCompanyIds: string[];
}
/**
 * Total amount already successfully paid per delivery (across ALL transactions).
 * Must run inside the same transaction that holds the `FOR UPDATE` locks.
 */
declare function getTotalPaidForDeliveries(deliveryIds: string[], conn: DrizzleDB): Promise<Map<string, number>>;
/**
 * Mark fully-paid deliveries' `paymentStatus` → COMPLETED and restore their
 * status (ASSIGNED when a rider is attached, else PENDING). Only touches
 * deliveries still flagged `paymentStatus = AWAITING`.
 */
declare function applyPaymentStatusUpdate(tx: DrizzleDB, deliveryIds: string[], companyId: string | null): Promise<string[]>;
interface AllocationDeliveryInput {
    id: string;
    price: number | null;
}
interface AllocationTarget {
    deliveryId: string;
    amountToApply: number;
}
/**
 * Pure allocation algorithm: splits `remainingAmount` across deliveries
 * sorted by createdAt (oldest first), filling outstanding balances greedily.
 */
declare function computeAllocationTargets(deliveryRows: AllocationDeliveryInput[], paidAmounts: Map<string, number>, remainingAmount: number): {
    targets: AllocationTarget[];
    fullyPaidIds: string[];
    leftover: number;
};
/**
 * Consolidates a successful payment transaction into delivery allocations and
 * company ledger balances, atomically. This is the single shared implementation
 * for both the backend webhook path and the workers reconciliation cron.
 *
 * Behavior:
 * - Lock linked deliveries (`FOR UPDATE`), compute targets via
 *   `computeAllocationTargets`, rewrite `delivery_allocations` for the tx.
 * - Credit ledgers: the delivery owner, or the configured pool split
 *   (platform fee → owner share → fulfiller remainder) when a pool fulfiller
 *   is stamped; system-owned pool deliveries credit only the fulfiller.
 *   Leftover overpayment credits the payer's ledger.
 * - Write explicit CHANNEL_FEE ledger entries when `metadata.channelFeePerDelivery`.
 * - Restore fully-paid deliveries via `applyPaymentStatusUpdate`.
 *
 * Callers must invalidate caches for `creditedCompanyIds` AFTER the tx commits.
 */
declare function processPaymentAllocation(tx: DrizzleDB, transaction: PaymentAllocationTransaction): Promise<PaymentAllocationResult>;
/**
 * Cross-company pool fulfillment split for a single allocation target.
 * Order: platform fee first, then the owner share (only when an owner company
 * exists — system-owned deliveries retain it implicitly), fulfiller takes the
 * rest. Every step clamps to what remains, so tiny fares degrade gracefully.
 */
declare function computePoolSplit(amountToApply: number, hasOwnerCompany: boolean): {
    platformFee: number;
    ownerShare: number;
    fulfillerShare: number;
};

interface SquadClientOptions {
    baseUrl: string;
    secretKey: string;
    timeoutMs?: number;
    /** Custom fetch implementation (useful for testing). Resolved per call when omitted. */
    fetchImpl?: typeof globalThis.fetch;
    /** Retry policy applied to the HTTP attempt. Defaults: maxRetries 2, Squad-aware isRetryable. */
    retry?: WithRetryOptions;
}
declare class SquadRequestError extends Error {
    readonly status?: number;
    readonly body?: unknown;
    constructor(message: string, status?: number, body?: unknown);
}
interface ChargeCardParams {
    tokenId: string;
    /** Amount in kobo (lowest currency unit). Passed to Squad VERBATIM — never naira. */
    amountKobo: number;
    transactionRef: string;
    currency?: string;
    email?: string;
    metadata?: Record<string, unknown>;
}
interface ChargeCardResult {
    success: boolean;
    message?: string;
    transactionRef?: string;
}
declare class SquadClient {
    private readonly baseUrl;
    private readonly secretKey;
    private readonly timeoutMs;
    private readonly fetchImpl?;
    private readonly retry;
    constructor(options: SquadClientOptions);
    request<T>(path: string, init?: {
        method?: string;
        body?: Record<string, unknown>;
        query?: Record<string, string>;
        headers?: Record<string, string>;
    }): Promise<{
        status: number;
        data: T;
    }>;
    private attempt;
    /**
     * Charge a tokenized card for recurring payments.
     * amountKobo is sent to Squad VERBATIM — Squad interprets `amount` in the lowest
     * currency value (kobo), and dividing here was the historic 100x undercharge bug.
     */
    chargeCard(params: ChargeCardParams): Promise<ChargeCardResult>;
}

export { type AlertLevel, type AllocationDeliveryInput, type AllocationTarget, type ChargeCardParams, type ChargeCardResult, type DrainOptions, type DrainResult, type DrizzleDB, type EmailAttachment, EmailService, type Encryptor, type EnqueueOptions, type EnqueueWithDedupeOptions, type FcmCredentials, type FcmMessage, type FcmResponse, FcmService, type JobRow, type PaymentAllocationResult, type PaymentAllocationTransaction, PermanentJobError, type QueueHandler, type SendEmailOptions, type SmtpConfig, type SmtpEnvVars, SquadClient, type SquadClientOptions, SquadRequestError, adminRoleEnum, admins, applyPaymentStatusUpdate, approvalStatus, blockedIps, buildSmtpConfig, channelPlatform, channelType, companies, companiesRelations, companyChannelStatus, companyChannels, companyChannelsRelations, companySettings, companySettingsRelations, computeAllocationTargets, computePoolSplit, conversations, conversationsRelations, createEncryptor, deliveries, deliveriesRelations, deliveryAllocations, deliveryAllocationsRelations, deliveryStatus, devicePlatform, deviceTokens, dispatcherRoleEnum, dispatchers, dispatchersRelations, entityType, escalatedTo, escalationStatus, eventLogs, eventLogsRelations, eventOutbox, eventType, getTotalPaidForDeliveries, idempotencyKeys, ledgerAdjustmentType, ledgerTransactions, ledgerTransactionsRelations, messageStatus, messages, messagesRelations, metricDomain, metricGranularity, metrics, metricsRelations, paymentMethod, paymentProvider, paymentTransactions, phoneVerifications, processPaymentAllocation, queueService, refreshSessions, resetAlertCooldownsForTest, riderStatus, riders, ridersRelations, sendAlert, senderType, subscriptionStatus, subscriptionTier, subscriptionTransactions, subscriptionTransactionsRelations, transactionStatus, transactionType, transactionsRelations, users };
