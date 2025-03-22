import { env } from '@/constants/env';
import axios from 'axios';

export const notionApi = axios.create({
  baseURL: env.NOTION_API_URL,
  headers: {
    Authorization: `Bearer ${env.NOTION_API_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': env.NOTION_VERSION,
  },
});

notionApi.interceptors.response.use((response) => {
  return response.data;
});

export const lunarApi = axios.create({
  baseURL: env.LUNAR_API_URL,
});

lunarApi.interceptors.response.use((response) => {
  return response.data;
});
