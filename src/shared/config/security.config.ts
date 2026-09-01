import { MS_PER_DAY } from '../utils/time.js';

export interface SecurityConfig {
  readonly blocks: {
    // Escalation ladder for temporary (in-memory) auto-blocks: offense #1 → #2 → #3+.
    readonly temporaryLadderMs: readonly number[];
    // Promote a repeat IP offender to a persistent (DB) block after this many
    // temporary blocks within `escalationWindowMs`.
    readonly escalateAfterBlocks: number;
    readonly escalationWindowMs: number;
    readonly persistentEscalatedMs: number;
    readonly maxPersistentMs: number;
  };
  readonly validation: {
    readonly maxEmailLength: number;
    readonly maxPasswordLength: number;
    readonly maxNameLength: number;
    readonly maxDescriptionLength: number;
    readonly maxPhoneLength: number;
    readonly maxAddressLength: number;
    readonly securityPinMinRange: number;
    readonly securityPinMaxRange: number;
  };
}

const rawSecurityConfig = {
  blocks: {
    temporaryLadderMs: [3_600_000, 6 * 3_600_000, 24 * 3_600_000],
    escalateAfterBlocks: 3,
    escalationWindowMs: 7 * MS_PER_DAY,
    persistentEscalatedMs: 7 * MS_PER_DAY,
    maxPersistentMs: 90 * MS_PER_DAY,
  },
  validation: {
    maxEmailLength: 254,
    maxPasswordLength: 128,
    maxNameLength: 150,
    maxDescriptionLength: 1000,
    maxPhoneLength: 20,
    maxAddressLength: 300,
    securityPinMinRange: 100000,
    securityPinMaxRange: 999999,
  },
} as const;

export const SECURITY_CONFIG: SecurityConfig = rawSecurityConfig;
