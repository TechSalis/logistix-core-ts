import { z } from 'zod';
import { TEN_MINUTES_MS, FIVE_MINUTES_MS, MS_PER_MINUTE } from './time.js';

export interface AIConfig {
  readonly interpretation: {
    readonly maxTokens: number;
    readonly cooldownSeconds: number;
  };
  readonly synthesis: {
    readonly temperature: number;
    readonly maxTokens: number;
    readonly cooldownSeconds: number;
  };
  readonly heartbeatTtl: number;
  readonly heartbeatThresholdMs: number;
  readonly maxSingleMessageTokens: number;
  readonly maxMessagesPerResponse: number;
  readonly messageFetchLimit: {
    readonly default: number;
    readonly max: number;
  };
  readonly memoryCacheTtl: number;
  readonly maxIterations: number;
  readonly providerTimeoutMs: number;
}

const aiConfigSchema = z.object({
  interpretation: z.object({
    maxTokens: z.number(),
    cooldownSeconds: z.number().default(300),
  }),
  synthesis: z.object({
    temperature: z.number(),
    maxTokens: z.number(),
    cooldownSeconds: z.number().default(300),
  }),
  heartbeatTtl: z.number().default(TEN_MINUTES_MS),
  heartbeatThresholdMs: z.number().default(FIVE_MINUTES_MS),
  maxSingleMessageTokens: z.number().default(4096),
  maxMessagesPerResponse: z.number().default(3),
  messageFetchLimit: z.object({
    default: z.number().default(10),
    max: z.number().default(20),
  }),
  memoryCacheTtl: z.number().default(TEN_MINUTES_MS),
  maxIterations: z.number().default(2),
  providerTimeoutMs: z.number().default(30 * MS_PER_MINUTE),
});

const rawAiConfig = {
  interpretation: {
    maxTokens: 2500,
    cooldownSeconds: 300,
  },
  synthesis: {
    temperature: 0.7,
    maxTokens: 4096,
    cooldownSeconds: 300,
  },
  heartbeatTtl: TEN_MINUTES_MS,
  heartbeatThresholdMs: FIVE_MINUTES_MS,
  maxSingleMessageTokens: 4096,
  maxMessagesPerResponse: 3,
  messageFetchLimit: {
    default: 10,
    max: 20,
  },
  memoryCacheTtl: TEN_MINUTES_MS,
  maxIterations: 2,
  providerTimeoutMs: 30 * MS_PER_MINUTE,
} as const;

// Runtime validation guard — keeps config in sync with schema
export const AI_CONFIG: AIConfig = aiConfigSchema.parse(rawAiConfig);
