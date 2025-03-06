import { env } from '@/constants/env';
import axios from 'axios';

const api = axios.create({
  baseURL: env.NOTION_API_URL,
  headers: {
    Authorization: `Bearer ${env.NOTION_API_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': env.NOTION_VERSION,
  },
});

api.interceptors.response.use((response) => {
  return response.data;
});

export default api;
