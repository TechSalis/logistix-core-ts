export interface SessionConfig {
  readonly maxActiveSessions: number;
  readonly pruneRetentionDays: number;
}

const rawSessionConfig = {
  // Max concurrent refresh sessions per user. Covers desktop + phone + one
  // re-login. Users needing more can contact support.
  maxActiveSessions: 3,
  pruneRetentionDays: 30,
} as const;

export const SESSION_CONFIG: SessionConfig = rawSessionConfig;
