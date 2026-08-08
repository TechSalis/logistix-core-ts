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
  JobType,
  SystemStatus,
  ChannelPlatform,
  CompanyChannelStatus,
  LogLevel,
  MessageStatus,
  MESSAGE_STATUS_RANK,
  SubscriptionHealth,
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

    it('locks the exact member set (additions must be explicit here)', () => {
      expect(Object.keys(EventType)).toEqual([
        'DELIVERY_ASSIGNED',
        'DELIVERY_UPDATED',
        'DELIVERY_CREATED',
        'DELIVERY_STATUS_CHANGED',
        'DELIVERY_DELETED',
        'RIDER_LOCATION_UPDATED',
        'RIDER_ACCEPTED',
        'RIDER_DELETED',
        'RIDER_DOCUMENTS_VERIFIED',
        'RIDER_DOCUMENTS_REJECTED',
        'CHANNEL_SETUP',
        'CHANNEL_ACTIVATED',
        'CHANNEL_DEACTIVATED',
        'CHANNEL_REJECTED',
        'CHANNEL_REMOVED',
        'SUBSCRIPTION_STATUS_CHANGED',
        'DISPATCHER_DELETED',
        'AI_EXECUTION',
        'SECURITY_INCIDENT',
        'COMPANY_ACTIVATED',
        'COMPANY_DEACTIVATED',
        'COMPANY_TIER_CHANGED',
        'COMPANY_VERIFIED',
        'COMPANY_VERIFICATION_REJECTED',
        'USER_PURGED',
        'CANCELLED_PAYMENT_TIMEOUT',
        'DOWNGRADE',
        'MESSAGE_DELETED',
        'LEDGER_ADJUSTED',
      ]);
    });
  });

  describe('ErrorCode', () => {
    it('has standard error codes', () => {
      expect(ErrorCode.UNAUTHORIZED).toBe('UNAUTHORIZED');
      expect(ErrorCode.FORBIDDEN).toBe('FORBIDDEN');
      expect(ErrorCode.NOT_FOUND).toBe('NOT_FOUND');
      expect(ErrorCode.VALIDATION_ERROR).toBe('VALIDATION_ERROR');
    });

    it('has business-rule and delivery codes as SCREAMING_SNAKE wire values', () => {
      expect(ErrorCode.BULK_DELIVERY_CREATION).toBe('BULK_DELIVERY_CREATION');
      expect(ErrorCode.OPERATIONAL_AVAILABILITY).toBe('OPERATIONAL_AVAILABILITY');
      expect(ErrorCode.CHAT_PROCESSOR_HYDRATION).toBe('CHAT_PROCESSOR_HYDRATION');
      expect(ErrorCode.CHAT_PROCESSOR_INFERENCE).toBe('CHAT_PROCESSOR_INFERENCE');
      expect(ErrorCode.CHAT_PROCESSOR_PIPELINE).toBe('CHAT_PROCESSOR_PIPELINE');
      expect(ErrorCode.PROVIDER_CONFIG_LOAD).toBe('PROVIDER_CONFIG_LOAD');
      expect(ErrorCode.PAYMENT_POST_PROCESSING).toBe('PAYMENT_POST_PROCESSING');
      expect(ErrorCode.LLM_FAILOVER).toBe('LLM_FAILOVER');
      expect(ErrorCode.INTER_STATE_DELIVERY).toBe('INTER_STATE_DELIVERY');
      expect(ErrorCode.COMPANY_CLOSED).toBe('COMPANY_CLOSED');
      expect(ErrorCode.COMPANY_NOT_OPEN_YET).toBe('COMPANY_NOT_OPEN_YET');
      expect(ErrorCode.COMPANY_NOT_OPERATING_TODAY).toBe('COMPANY_NOT_OPERATING_TODAY');
      expect(ErrorCode.TIER_LIMIT_EXCEEDED).toBe('TIER_LIMIT_EXCEEDED');
      expect(ErrorCode.NO_DELIVERIES_PROVIDED).toBe('NO_DELIVERIES_PROVIDED');
      expect(ErrorCode.INVALID_ACTOR).toBe('INVALID_ACTOR');
      expect(ErrorCode.CHANNEL_PLATFORM_ID_CONFLICT).toBe('CHANNEL_PLATFORM_ID_CONFLICT');
      expect(ErrorCode.CHANNEL_ACTIVATION_FAILED).toBe('CHANNEL_ACTIVATION_FAILED');
    });

    it('no longer ships the dead CLIENT_AUTH_REQUIRED member', () => {
      expect(ErrorCode).not.toHaveProperty('CLIENT_AUTH_REQUIRED');
    });
  });

  describe('JobType', () => {
    it('exposes job queue type wire values', () => {
      expect(JobType.DELIVERY_NOTIFICATION).toBe('delivery-notification');
      expect(JobType.SQUAD_WEBHOOK).toBe('squad-webhook');
      expect(JobType.EXPORT).toBe('export');
      expect(JobType.AI_BATCH).toBe('ai:batch');
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

  describe('CompanyChannelStatus', () => {
    it('exposes lifecycle states as wire values', () => {
      expect(CompanyChannelStatus.PENDING).toBe('PENDING');
      expect(CompanyChannelStatus.ACTIVE).toBe('ACTIVE');
      expect(CompanyChannelStatus.DEACTIVATED).toBe('DEACTIVATED');
      expect(CompanyChannelStatus.REJECTED).toBe('REJECTED');
      expect(CompanyChannelStatus.REMOVED).toBe('REMOVED');
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

  describe('SubscriptionHealth', () => {
    it('exposes wire values as UPPER_SNAKE members', () => {
      expect(SubscriptionHealth.HEALTHY).toBe('HEALTHY');
      expect(SubscriptionHealth.IN_TRIAL).toBe('IN_TRIAL');
      expect(SubscriptionHealth.PAST_DUE).toBe('PAST_DUE');
      expect(SubscriptionHealth.EXPIRING_SOON).toBe('EXPIRING_SOON');
      expect(SubscriptionHealth.CANCELLED).toBe('CANCELLED');
    });
  });

  describe('MESSAGE_STATUS_RANK', () => {
    it('orders SENT < DELIVERED < READ < FAILED monotonically', () => {
      expect(MESSAGE_STATUS_RANK[MessageStatus.SENT]).toBeLessThan(
        MESSAGE_STATUS_RANK[MessageStatus.DELIVERED],
      );
      expect(MESSAGE_STATUS_RANK[MessageStatus.DELIVERED]).toBeLessThan(
        MESSAGE_STATUS_RANK[MessageStatus.READ],
      );
      expect(MESSAGE_STATUS_RANK[MessageStatus.READ]).toBeLessThan(
        MESSAGE_STATUS_RANK[MessageStatus.FAILED],
      );
    });
  });
});
