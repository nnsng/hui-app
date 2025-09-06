import { queryKeys } from '@/constants/query-keys';
import { useActiveGroupQuery, usePeriodsQuery } from '@/hooks/queries';
import { notionApi } from '@/utils/api';
import { env } from '@/utils/env';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

type ContributePayload = {
  period: string;
  bidAmount: number;
  groupId: string;
  isPayout: boolean;
};

const addNewPeriod = async ({ period, bidAmount, isPayout, groupId }: ContributePayload) => {
  try {
    const url = '/pages';
    const payload = {
      parent: {
        database_id: env.NOTION_PERIOD_DATABASE_ID,
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

  const { data: periods } = usePeriodsQuery();
  const { data: group } = useActiveGroupQuery();
  const groupId = group?.id || '';

  return useMutation({
    mutationFn: async (payload: Pick<ContributePayload, 'bidAmount' | 'isPayout'>) => {
      const nextPeriod = (periods?.length ?? 0) + 1;
      await addNewPeriod({
        ...payload,
        period: String(nextPeriod),
        groupId,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.periods, groupId] });
    },
  });
}
