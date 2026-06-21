import { queryKeys } from '@/constants/queryKeys';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import type { Round } from '@/types';
import { api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

type PaymentPayload = Omit<Round, 'id' | 'date' | 'lunarDate'>;

const makePayment = async ({
  cycleId,
  round,
  bidAmount,
  paymentAmount,
  status,
}: PaymentPayload) => {
  try {
    const today = dayjs().format('YYYY-MM-DD');

    const payload = {
      cycle: cycleId,
      round: round,
      date: today,
      bidAmount: bidAmount,
      paymentAmount: paymentAmount,
      status: status,
    };

    return api.post('/api/rounds', payload);
  } catch (error) {
    console.error(error);
  }
};

export function useMakePaymentMutation() {
  const queryClient = useQueryClient();

  const { data: rounds = [] } = useRoundsQuery();
  const { data: cycle } = useActiveCycleQuery();
  const cycleId = cycle?.id || '';

  return useMutation({
    mutationFn: async (payload: Pick<PaymentPayload, 'bidAmount' | 'paymentAmount' | 'status'>) => {
      const nextRound = rounds.length + 1;
      await makePayment({
        ...payload,
        round: String(nextRound),
        cycleId: cycleId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.rounds, cycleId] });
    },
  });
}
