import api from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useGetPool } from '../queries';

type PayoutPayload = {
  amount: number;
  informationId: string;
};

const payout = async ({ amount, informationId }: PayoutPayload) => {
  const url = `/pages/${informationId}`;
  const payload = {
    properties: {
      payoutAmount: { number: amount },
      payoutDate: { date: { start: dayjs().format('YYYY-MM-DD') } },
    },
  };
  return api.patch(url, payload);
};

export function usePayout() {
  const queryClient = useQueryClient();

  const { data: information } = useGetPool();
  const informationId = information?.id || '';

  return useMutation({
    mutationFn: async (amount: number) => payout({ amount, informationId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['information'] });
    },
  });
}
