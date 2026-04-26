import { getLunarDate } from '@/lib/lunar';
import dayjs from 'dayjs';

export const formatDate = (date: string, template = 'DD/MM/YYYY') => {
  return dayjs(date).format(template);
};

// YYYY-MM-DD
export const convertToLunarDate = (sonarDate: string, template?: string) => {
  const formattedDate = formatDate(sonarDate, 'YYYY-MM-DD');

  const [sonarYear, sonarMonth, sonarDay] = formattedDate.split('-').map(Number);
  const lunarDate = getLunarDate(sonarDay, sonarMonth, sonarYear);
  const lunarDay = `${lunarDate.day}`.padStart(2, '0');
  const lunarMonth = `${lunarDate.month}`.padStart(2, '0');
  const lunarYear = `${lunarDate.year}`;
  const fullDate = `${lunarYear}-${lunarMonth}-${lunarDay}`;
  if (!template) return fullDate;
  return formatDate(fullDate, template);
};

export const renderDate = (date: string) => {
  return `${formatDate(date)} (${convertToLunarDate(date, 'DD/MM')})`;
};
