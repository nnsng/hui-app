import { notionApi } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useGetPool } from '../queries';

type PayoutPayload = {
  poolId: string;
  amount: number;
  difference: number;
};

const onPayout = async ({ poolId, amount, difference }: PayoutPayload) => {
  const url = `/pages/${poolId}`;
  const payload = {
    properties: {
      payoutDate: { date: { start: dayjs().format('YYYY-MM-DD') } },
      payoutAmount: { number: amount },
      payoutDifference: { number: difference },
    },
  };
  return notionApi.patch(url, payload);
};

export function usePayout() {
  const queryClient = useQueryClient();

  const { data: pool } = useGetPool();
  const poolId = pool?.id || '';

  return useMutation({
    mutationFn: async (payload: Omit<PayoutPayload, 'poolId'>) => onPayout({ ...payload, poolId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pool'] });
    },
  });
}
