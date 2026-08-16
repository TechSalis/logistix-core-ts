export interface SessionConfig {
  readonly maxActiveSessions: number;
  readonly pruneRetentionDays: number;
}

const rawSessionConfig = {
  maxActiveSessions: 10,
  pruneRetentionDays: 30,
} as const;

export const SESSION_CONFIG: SessionConfig = rawSessionConfig;
