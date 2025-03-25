import { dateApi } from '@/utils/api';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';

type SonarDateObject = {
  day: number;
  month: number;
  year: number;
  date: string;
};

const convertToLunar = async (sonarDate: string): Promise<SonarDateObject> => {
  const [year, month, day] = sonarDate.split('-').map(Number);
  const url = '/convert-to-lunar';
  const payload = { year, month, day };
  return dateApi.post(url, payload);
};

export function useLunarDate() {
  return useMutation({
    mutationFn: async (sonarDate: string) => {
      const response = await convertToLunar(sonarDate);
      const lunarDate = response.date;
      return dayjs(lunarDate, { format: 'YYY-MM-DD' }).format('DD/MM/YYYY');
    },
  });
}
