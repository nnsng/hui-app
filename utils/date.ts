import dayjs from 'dayjs';
import { dateApi } from './api';

type ConvertToLunarResponse = {
  day: number;
  month: number;
  year: number;
  date: string;
};

export const formatDate = (date: string, template = 'DD/MM/YYYY') => {
  return dayjs(date).format(template);
};

export const getLunarDate = async (sonarDate: string) => {
  const [year, month, day] = sonarDate.split('-').map(Number);
  const payload = { year, month, day };
  const response: ConvertToLunarResponse = await dateApi.post('/convert-to-lunar', payload);
  const lunarDate = response.date;
  return formatDate(lunarDate, 'YYYY-MM-DD');
};
