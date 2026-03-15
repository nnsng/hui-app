import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_NOTION_API_URL: z.string(),
  EXPO_PUBLIC_NOTION_VERSION: z.string(),
  EXPO_PUBLIC_NOTION_API_KEY: z.string(),
  EXPO_PUBLIC_NOTION_GROUP_DATA_SOURCE_ID: z.string(),
  EXPO_PUBLIC_NOTION_PERIOD_DATA_SOURCE_ID: z.string(),
  EXPO_PUBLIC_DATE_API_URL: z.string(),
});

export const env = envSchema.parse(process.env);
