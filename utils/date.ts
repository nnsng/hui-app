import dayjs from 'dayjs';
import { dateApi } from './api';

type ConvertToLunarResponse = {
  day: number;
  month: number;
  year: number;
  date: string;
};

export const formatDate = (date: string) => {
  if (!date) return '';
  return dayjs(date, { format: 'YYYY-MM-DD' }).format('DD/MM/YYYY');
};

export const getLunarDate = async (sonarDate: string) => {
  if (!sonarDate) return '';

  const [day, month, year] = sonarDate.split('/').map(Number);
  const payload = { year, month, day };
  const response: ConvertToLunarResponse = await dateApi.post('/convert-to-lunar', payload);
  const lunarDate = response.date;
  return formatDate(lunarDate);
};
