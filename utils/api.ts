import axios from 'axios';
import env from './env';

const api = axios.create({
  baseURL: env.EXPO_PUBLIC_NOTION_API_URL,
  headers: {
    Authorization: `Bearer ${env.EXPO_PUBLIC_NOTION_API_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': env.EXPO_PUBLIC_NOTION_VERSION,
  },
});

api.interceptors.response.use((response) => {
  return response.data;
});

export default api;
