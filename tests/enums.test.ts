import { describe, it, expect } from 'vitest';
import {
  UserRole,
  DeliveryStatus,
  RiderStatus,
  PaymentMethod,
  PaymentStatus,
  SubscriptionTier,
  EntityType,
  EventType,
  ErrorCode,
  SystemStatus,
  ChannelPlatform,
  LogLevel,
  MessageStatus,
} from '../src/enums/enums.js';

describe('Enums', () => {
  describe('UserRole', () => {
    it('has all three roles', () => {
      expect(UserRole.ADMIN).toBe('ADMIN');
      expect(UserRole.DISPATCHER).toBe('DISPATCHER');
      expect(UserRole.RIDER).toBe('RIDER');
    });

    it('values are strings matching their keys', () => {
      Object.entries(UserRole).forEach(([k, v]) => expect(v).toBe(k));
    });
  });

  describe('DeliveryStatus', () => {
    it('includes all lifecycle states', () => {
      expect(DeliveryStatus.PENDING).toBe('PENDING');
      expect(DeliveryStatus.ASSIGNED).toBe('ASSIGNED');
      expect(DeliveryStatus.IN_TRANSIT).toBe('IN_TRANSIT');
      expect(DeliveryStatus.DELIVERED).toBe('DELIVERED');
      expect(DeliveryStatus.CANCELLED).toBe('CANCELLED');
      expect(DeliveryStatus.FAILED).toBe('FAILED');
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

  describe('PaymentStatus', () => {
    it('uses uppercase wire values matching the backend enum', () => {
      expect(PaymentStatus.AWAITING).toBe('AWAITING');
      expect(PaymentStatus.COMPLETED).toBe('COMPLETED');
      expect(PaymentStatus.FAILED).toBe('FAILED');
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

  describe('ChannelPlatform', () => {
    it('includes social platforms', () => {
      expect(ChannelPlatform.WHATSAPP).toBe('WHATSAPP');
      expect(ChannelPlatform.INSTAGRAM).toBe('INSTAGRAM');
      expect(ChannelPlatform.FACEBOOK).toBe('FACEBOOK');
      expect(ChannelPlatform.TIKTOK).toBe('TIKTOK');
    });
  });

  describe('LogLevel', () => {
    it('uses lowercase values', () => {
      expect(LogLevel.DEBUG).toBe('debug');
      expect(LogLevel.INFO).toBe('info');
      expect(LogLevel.WARN).toBe('warn');
      expect(LogLevel.ERROR).toBe('error');
      expect(LogLevel.SILENT).toBe('silent');
    });
  });

  describe('MessageStatus', () => {
    it('has SENT, DELIVERED, READ, FAILED', () => {
      expect(MessageStatus.SENT).toBe('SENT');
      expect(MessageStatus.DELIVERED).toBe('DELIVERED');
      expect(MessageStatus.READ).toBe('READ');
      expect(MessageStatus.FAILED).toBe('FAILED');
    });
  });
});
