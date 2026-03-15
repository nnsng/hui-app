import { queryKeys } from '@/constants/query-keys';
import { useActiveGroupQuery, usePeriodsQuery } from '@/hooks/queries';
import { notionApi } from '@/utils/api';
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
    const url = '/pages';
    const payload = {
      parent: {
        data_source_id: process.env.EXPO_PUBLIC_NOTION_PERIOD_DATA_SOURCE_ID,
      },
      properties: {
        period: { title: [{ text: { content: period } }] },
        bid_amount: { number: bidAmount },
        contribution_date: { date: { start: dayjs().format('YYYY-MM-DD') } },
        is_payout: { checkbox: isPayout },
        group_name: { relation: [{ id: groupId }] },
      },
    };

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
