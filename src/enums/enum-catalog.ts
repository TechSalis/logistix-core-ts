import {
  ApprovalStatus,
  ChannelPlatform,
  ChannelType,
  DeliveryStatus,
  ExportDataType,
  PaymentMethod,
  RiderStatus,
  SubscriptionStatus,
  SubscriptionTier,
  TransactionStatus,
  VehicleType,
} from './enums.js';
import { formatEnumToTitleCase } from '../utils/formatters.js';

export interface EnumValue {
  name: string;
  label: string;
}

export interface EnumCatalog {
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
}

function buildValues(enumObj: object): EnumValue[] {
  // Safe: enum member strings ARE the wire values per the wire standard.
  return (Object.values(enumObj) as string[]).map((name) => ({
    name,
    label: formatEnumToTitleCase(name),
  }));
}

export const ENUM_CATALOG: EnumCatalog = {
  exportDataTypes: buildValues(ExportDataType),
  vehicleTypes: buildValues(VehicleType),
  deliveryStatuses: buildValues(DeliveryStatus),
  riderStatuses: buildValues(RiderStatus),
  approvalStatuses: buildValues(ApprovalStatus),
  subscriptionTiers: buildValues(SubscriptionTier),
  subscriptionStatuses: buildValues(SubscriptionStatus),
  channelPlatforms: buildValues(ChannelPlatform),
  channelTypes: buildValues(ChannelType),
  paymentMethods: buildValues(PaymentMethod),
  transactionStatuses: buildValues(TransactionStatus),
};
