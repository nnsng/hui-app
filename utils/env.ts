import { z } from 'zod';

const envSchema = {
  EXPO_PUBLIC_NOTION_API_URL: z.string(),
  EXPO_PUBLIC_NOTION_VERSION: z.string(),
  EXPO_PUBLIC_NOTION_API_KEY: z.string(),
  EXPO_PUBLIC_NOTION_INFORMATION_DATABASE_ID: z.string(),
  EXPO_PUBLIC_NOTION_ROUND_DATABASE_ID: z.string(),
};

export default z.object(envSchema).parse(process.env);
