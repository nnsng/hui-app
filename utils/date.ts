import dayjs from 'dayjs';

export const formatDate = (date: string) => {
  if (!date) return '';
  return dayjs(date, { format: 'YYYY-MM-DD' }).format('DD/MM/YYYY');
};
