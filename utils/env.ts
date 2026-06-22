import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_NOTION_API_KEY: z.string(),
  EXPO_PUBLIC_NOTION_CYCLE_DATA_SOURCE_ID: z.string(),
  EXPO_PUBLIC_NOTION_ROUND_DATA_SOURCE_ID: z.string(),
});

export const env = envSchema.parse(process.env);
