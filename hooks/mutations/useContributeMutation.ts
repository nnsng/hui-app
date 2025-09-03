import { queryKeys } from '@/constants/query-keys';
import { useActiveGroupQuery, usePeriodsQuery } from '@/hooks/queries';
import { notionApi } from '@/utils/api';
import { env } from '@/utils/env';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

type ContributePayload = {
  period: string;
  amount: number;
  groupId: string;
};

const onContribute = async ({ period, amount, groupId }: ContributePayload) => {
  try {
    const url = '/pages';
    const payload = {
      parent: {
        database_id: env.NOTION_PERIOD_DATABASE_ID,
      },
      properties: {
        period: { title: [{ text: { content: period } }] },
        bid_amount: { number: amount },
        contribution_date: { date: { start: dayjs().format('YYYY-MM-DD') } },
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
    mutationFn: (amount: number) => {
      const nextPeriod = periods ? periods.length + 1 : 1;
      const payload = { period: String(nextPeriod), amount, groupId };
      return onContribute(payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.periods, groupId] });
    },
  });
}
