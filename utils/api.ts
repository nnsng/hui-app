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

export const dateApi = axios.create({
  baseURL: env.DATE_API_URL,
});

dateApi.interceptors.response.use((response) => {
  return response.data?.data || response.data;
});
