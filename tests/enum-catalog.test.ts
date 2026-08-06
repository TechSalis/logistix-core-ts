import { describe, it, expect } from 'vitest';
import { ENUM_CATALOG } from '../src/enums/enum-catalog.js';
import {
  DeliveryStatus,
  ExportDataType,
  VehicleType,
  SubscriptionStatus,
  ChannelType,
} from '../src/enums/enums.js';

describe('ENUM_CATALOG', () => {
  it('keeps ExportDataType exported', () => {
    expect(ExportDataType).toBeDefined();
  });

  it('serves every ExportDataType value as its wire name', () => {
    expect(ENUM_CATALOG.exportDataTypes.map((v) => v.name)).toEqual(Object.values(ExportDataType));
  });

  it('labels multi-word values in title case', () => {
    const chat = ENUM_CATALOG.exportDataTypes.find((v) => v.name === ExportDataType.CHAT);
    expect(chat?.label).toBe('Chat');
    const pastDue = ENUM_CATALOG.subscriptionStatuses.find(
      (v) => v.name === SubscriptionStatus.PAST_DUE,
    );
    expect(pastDue?.label).toBe('Past Due');
  });

  it('covers every VehicleType member', () => {
    expect(ENUM_CATALOG.vehicleTypes.map((v) => v.name)).toEqual(Object.values(VehicleType));
  });

  it('VehicleType is BIKE-only (trimmed)', () => {
    expect(Object.values(VehicleType)).toEqual([VehicleType.BIKE]);
  });

  it('covers every DeliveryStatus member', () => {
    expect(ENUM_CATALOG.deliveryStatuses.map((v) => v.name)).toEqual(Object.values(DeliveryStatus));
  });

  it('covers every ChannelType member', () => {
    expect(ENUM_CATALOG.channelTypes.map((v) => v.name)).toEqual(Object.values(ChannelType));
  });
});
