import dayjs from 'dayjs';
import { parse } from 'node-html-parser';
import { lunarApi } from './api';

export const formatDate = (date?: string) => {
  return dayjs(date).format('DD/MM/YYYY');
};

export const formatNotionDate = (date?: string) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const getLunarDate = async (sonarDate: string) => {
  const [year, month, day] = sonarDate.split('-');
  const url = `/nam/${year}/thang/${month}/ngay/${day}`;
  const htmlText: string = await lunarApi.get(url);
  const doc = parse(htmlText);
  const lunarDate = doc.querySelector('.lunar-date')?.textContent.trim() ?? '';
  const formattedDate = lunarDate
    .split('-')
    .map((part) => part.padStart(2, '0'))
    .join('/');
  return formattedDate;
};
