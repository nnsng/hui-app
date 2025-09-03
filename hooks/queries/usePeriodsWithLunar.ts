import { queryKeys } from '@/constants/query-keys';
import type { HuiPeriod } from '@/types';
import { dateApi } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { usePeriodsQuery } from '.';

type ConvertToLunarResponse = {
  day: number;
  month: number;
  year: number;
  date: string;
};

const getLunarDate = async (sonarDate: string) => {
  const [year, month, day] = sonarDate.split('-').map(Number);
  const url = '/convert-to-lunar';
  const payload = { year, month, day };
  const response: ConvertToLunarResponse = await dateApi.post(url, payload);
  const lunarDate = response.date;
  return dayjs(lunarDate, { format: 'YYY-MM-DD' }).format('DD/MM/YYYY');
};

const getPeriodsWithLunar = async (periods: HuiPeriod[]): Promise<HuiPeriod[]> => {
  const promises = periods.map(async (period) => {
    const lunarDate = await getLunarDate(period.contributionDate);
    return { ...period, contributionDateLunar: lunarDate };
  });
  return await Promise.all(promises);
};

export function usePeriodsWithLunar() {
  const { data: periods = [] } = usePeriodsQuery();

  return useQuery({
    queryKey: [queryKeys.periods, queryKeys.lunar, JSON.stringify(periods)],
    queryFn: () => getPeriodsWithLunar(periods),
    initialData: periods,
  });
}
