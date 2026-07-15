import { describe, it, expect } from 'vitest';
import {
  UserRole,
  DeliveryStatus,
  RiderStatus,
  PaymentMethod,
  SubscriptionTier,
  EntityType,
  EventType,
  ErrorCode,
  SystemStatus,
  ActorType,
  ChannelPlatform,
  LogLevel,
} from '../src/enums.js';

describe('Enums', () => {
  describe('UserRole', () => {
    it('has all four roles', () => {
      expect(UserRole.ADMIN).toBe('ADMIN');
      expect(UserRole.COMPANY).toBe('COMPANY');
      expect(UserRole.DISPATCHER).toBe('DISPATCHER');
      expect(UserRole.RIDER).toBe('RIDER');
    });

    it('values are strings matching their keys', () => {
      Object.entries(UserRole).forEach(([k, v]) => expect(v).toBe(k));
    });
  });

  describe('DeliveryStatus', () => {
    it('includes all lifecycle states', () => {
      expect(DeliveryStatus.AWAITING_PAYMENT).toBe('AWAITING_PAYMENT');
      expect(DeliveryStatus.PENDING).toBe('PENDING');
      expect(DeliveryStatus.ASSIGNED).toBe('ASSIGNED');
      expect(DeliveryStatus.IN_TRANSIT).toBe('IN_TRANSIT');
      expect(DeliveryStatus.DELIVERED).toBe('DELIVERED');
      expect(DeliveryStatus.CANCELLED).toBe('CANCELLED');
    });
  });

  describe('RiderStatus', () => {
    it('has ONLINE, OFFLINE, BUSY', () => {
      expect(RiderStatus.ONLINE).toBe('ONLINE');
      expect(RiderStatus.OFFLINE).toBe('OFFLINE');
      expect(RiderStatus.BUSY).toBe('BUSY');
    });
  });

  describe('PaymentMethod', () => {
    it('has PREPAID and PAY_ON_DELIVERY', () => {
      expect(PaymentMethod.PREPAID).toBe('PREPAID');
      expect(PaymentMethod.PAY_ON_DELIVERY).toBe('PAY_ON_DELIVERY');
    });
  });

  describe('SubscriptionTier', () => {
    it('has STARTER and PROFESSIONAL', () => {
      const tiers = [SubscriptionTier.STARTER, SubscriptionTier.PROFESSIONAL];
      expect(tiers).toEqual(['STARTER', 'PROFESSIONAL']);
    });
  });

  describe('EntityType', () => {
    it('includes DISPATCHER and SYSTEM', () => {
      expect(EntityType.DISPATCHER).toBe('DISPATCHER');
      expect(EntityType.SYSTEM).toBe('SYSTEM');
    });
  });

  describe('EventType', () => {
    it('has delivery and rider events', () => {
      expect(EventType.DELIVERY_CREATED).toBe('DELIVERY_CREATED');
      expect(EventType.DELIVERY_STATUS_CHANGED).toBe('DELIVERY_STATUS_CHANGED');
      expect(EventType.RIDER_ACCEPTED).toBe('RIDER_ACCEPTED');
    });
  });

  describe('ErrorCode', () => {
    it('has standard error codes', () => {
      expect(ErrorCode.UNAUTHORIZED).toBe('UNAUTHORIZED');
      expect(ErrorCode.FORBIDDEN).toBe('FORBIDDEN');
      expect(ErrorCode.NOT_FOUND).toBe('NOT_FOUND');
      expect(ErrorCode.VALIDATION_ERROR).toBe('VALIDATION_ERROR');
    });
  });

  describe('SystemStatus', () => {
    it('has UP, DOWN', () => {
      expect(SystemStatus.UP).toBe('UP');
      expect(SystemStatus.DOWN).toBe('DOWN');
    });
  });

  describe('ActorType', () => {
    it('has SYSTEM', () => {
      expect(ActorType.SYSTEM).toBe('SYSTEM');
    });
  });

  describe('ChannelPlatform', () => {
    it('includes social platforms', () => {
      expect(ChannelPlatform.WHATSAPP).toBe('WHATSAPP');
      expect(ChannelPlatform.INSTAGRAM).toBe('INSTAGRAM');
    });
  });

  describe('LogLevel', () => {
    it('uses lowercase values', () => {
      expect(LogLevel.INFO).toBe('info');
      expect(LogLevel.ERROR).toBe('error');
    });
  });
});
