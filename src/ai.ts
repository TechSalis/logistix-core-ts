import { z } from 'zod';

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
  heartbeatTtl: z.number().default(600_000),
  heartbeatThresholdMs: z.number().default(300_000),
  maxSingleMessageTokens: z.number().default(4096),
  maxMessagesPerResponse: z.number().default(3),
  messageFetchLimit: z.object({
    default: z.number().default(10),
    max: z.number().default(20),
  }),
  memoryCacheTtl: z.number().default(600_000),
  maxIterations: z.number().default(2),
  providerTimeoutMs: z.number().default(30000),
});

const rawAiConfig = {
  interpretation: {
    maxTokens: 2500,
    cooldownSeconds: 300,
  },
  synthesis: {
    temperature: 0.9,
    maxTokens: 4096,
    cooldownSeconds: 300,
  },
  heartbeatTtl: 600000,
  heartbeatThresholdMs: 300000,
  maxSingleMessageTokens: 4096,
  maxMessagesPerResponse: 3,
  messageFetchLimit: {
    default: 10,
    max: 20,
  },
  memoryCacheTtl: 600_000,
  maxIterations: 2,
  providerTimeoutMs: 30000,
} as const;

export const AI_CONFIG: AIConfig = aiConfigSchema.parse(rawAiConfig);
