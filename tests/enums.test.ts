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
  MappingPlatform,
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
      expect(DeliveryStatus.EN_ROUTE).toBe('EN_ROUTE');
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
    it('has PREPAID and POD', () => {
      expect(PaymentMethod.PREPAID).toBe('PREPAID');
      expect(PaymentMethod.POD).toBe('POD');
    });
  });

  describe('SubscriptionTier', () => {
    it('has all three tiers in order', () => {
      const tiers = [
        SubscriptionTier.FREE,
        SubscriptionTier.STARTER,
        SubscriptionTier.PROFESSIONAL,
      ];
      expect(tiers).toEqual(['FREE', 'STARTER', 'PROFESSIONAL']);
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
    it('has UP, DOWN, DEGRADED', () => {
      expect(SystemStatus.UP).toBe('UP');
      expect(SystemStatus.DOWN).toBe('DOWN');
      expect(SystemStatus.DEGRADED).toBe('DEGRADED');
    });
  });

  describe('ActorType', () => {
    it('has SYSTEM, USER, ADMIN', () => {
      expect(ActorType.SYSTEM).toBe('SYSTEM');
      expect(ActorType.USER).toBe('USER');
      expect(ActorType.ADMIN).toBe('ADMIN');
    });
  });

  describe('MappingPlatform', () => {
    it('includes social platforms', () => {
      expect(MappingPlatform.WHATSAPP).toBe('WHATSAPP');
      expect(MappingPlatform.INSTAGRAM).toBe('INSTAGRAM');
    });
  });

  describe('LogLevel', () => {
    it('uses lowercase values', () => {
      expect(LogLevel.INFO).toBe('info');
      expect(LogLevel.ERROR).toBe('error');
    });
  });
});
