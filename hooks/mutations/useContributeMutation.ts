import { queryKeys } from '@/constants/query-keys';
import { useActiveGroupQuery, usePeriodsQuery } from '@/hooks/queries';
import { notionApi } from '@/utils/api';
import { formatDate, getLunarDate } from '@/utils/date';
import { mapValueToNotionProperty } from '@/utils/notion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

type ContributePayload = {
  period: string;
  bidAmount: number;
  groupId: string;
  isPayout: boolean;
};

const contribute = async ({ period, bidAmount, isPayout, groupId }: ContributePayload) => {
  try {
    const today = dayjs().format('YYYY-MM-DD');
    const lunarToday = formatDate(await getLunarDate(today));

    const payload = {
      parent: {
        data_source_id: process.env.EXPO_PUBLIC_NOTION_PERIOD_DATA_SOURCE_ID,
      },
      properties: {
        period: mapValueToNotionProperty(period, 'title'),
        bidAmount: mapValueToNotionProperty(bidAmount, 'number'),
        contributionDate: mapValueToNotionProperty(today, 'date'),
        contributionDateLunar: mapValueToNotionProperty(lunarToday, 'rich_text'),
        isPayout: mapValueToNotionProperty(isPayout, 'checkbox'),
        group: mapValueToNotionProperty(groupId, 'relation'),
      },
    };

    const url = '/pages';
    return notionApi.post(url, payload);
  } catch (error) {
    console.error(error);
  }
};

export function useContributeMutation() {
  const queryClient = useQueryClient();

  const { data: periods = [] } = usePeriodsQuery();
  const { data: group } = useActiveGroupQuery();
  const groupId = group?.id || '';

  return useMutation({
    mutationFn: async (payload: Pick<ContributePayload, 'bidAmount' | 'isPayout'>) => {
      const nextPeriod = periods.length + 1;
      await contribute({
        ...payload,
        period: String(nextPeriod),
        groupId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.periods, groupId] });
    },
  });
}
