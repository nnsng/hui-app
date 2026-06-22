import { env } from '@/utils/env';
import { Client } from '@notionhq/client';

export const notion = new Client({
  auth: env.EXPO_PUBLIC_NOTION_API_KEY,
});
