import { notionApi } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useGetPool } from '../queries';

type PayoutPayload = {
  amount: number;
  poolId: string;
};

const onPayout = async ({ amount, poolId }: PayoutPayload) => {
  const url = `/pages/${poolId}`;
  const payload = {
    properties: {
      payoutAmount: { number: amount },
      payoutDate: { date: { start: dayjs().format('YYYY-MM-DD') } },
    },
  };
  return notionApi.patch(url, payload);
};

export function usePayout() {
  const queryClient = useQueryClient();

  const { data: pool } = useGetPool();
  const poolId = pool?.id || '';

  return useMutation({
    mutationFn: async (amount: number) => onPayout({ amount, poolId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['pool'] });
    },
  });
}
