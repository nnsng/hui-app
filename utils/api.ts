import axios from 'axios';

export const notionApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_NOTION_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_NOTION_API_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': process.env.EXPO_PUBLIC_NOTION_VERSION,
  },
});

notionApi.interceptors.response.use((response) => {
  return response.data;
});

export const dateApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_DATE_API_URL,
});

dateApi.interceptors.response.use((response) => {
  return response.data?.data || response.data;
});
