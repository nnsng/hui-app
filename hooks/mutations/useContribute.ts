import { env } from '@/constants/env';
import { notionApi } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useGetPool, useGetRounds } from '../queries';

type ContributePayload = {
  period: string;
  amount: number;
  poolId: string;
};

const onContribute = async ({ period, amount, poolId }: ContributePayload) => {
  try {
    const url = '/pages';
    const payload = {
      parent: {
        database_id: env.NOTION_ROUND_DATABASE_ID,
      },
      properties: {
        period: { title: [{ text: { content: period } }] },
        bidAmount: { number: amount },
        date: { date: { start: dayjs().format('YYYY-MM-DD') } },
        information: { relation: [{ id: poolId }] },
      },
    };

    return notionApi.post(url, payload);
  } catch (error) {
    console.error(error);
  }
};

export function useContribute() {
  const queryClient = useQueryClient();

  const { data: rounds } = useGetRounds();
  const { data: pool } = useGetPool();
  const poolId = pool?.id || '';

  return useMutation({
    mutationFn: (amount: number) => {
      const nextRoundNumber = rounds ? rounds.length + 1 : 1;
      const payload = { period: String(nextRoundNumber), amount, poolId };
      return onContribute(payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['rounds', poolId] });
    },
  });
}
