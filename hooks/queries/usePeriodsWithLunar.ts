import { queryKeys } from '@/constants/query-keys';
import { usePeriodsQuery } from '@/hooks/queries/usePeriodsQuery';
import type { HuiPeriod } from '@/types';
import { getLunarDate } from '@/utils/date';
import { useQuery } from '@tanstack/react-query';

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
