import { getLunarDate } from '@/lib/lunar';
import dayjs from 'dayjs';

export const formatDate = (date: string, template = 'DD/MM/YYYY') => {
  return dayjs(date).format(template);
};

// YYYY-MM-DD
export const convertToLunarDate = (sonarDate: string) => {
  const [sonarYear, sonarMonth, sonarDay] = sonarDate.split('-').map(Number);
  const lunarDate = getLunarDate(sonarDay, sonarMonth, sonarYear);
  const lunarDay = `${lunarDate.day}`.padStart(2, '0');
  const lunarMonth = `${lunarDate.month}`.padStart(2, '0');
  const lunarYear = `${lunarDate.year}`;
  return `${lunarYear}-${lunarMonth}-${lunarDay}`;
};
