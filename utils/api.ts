import axios from 'axios';
import Constants from 'expo-constants';

const getBaseUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri;
  if (!debuggerHost) return '';
  const ip = debuggerHost.split(':')[0];
  return `http://${ip}:8081`; // 8081 is the default Metro bundler port
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use((response) => {
  return response.data;
});
