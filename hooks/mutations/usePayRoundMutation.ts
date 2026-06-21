import { queryKeys } from '@/constants/queryKeys';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import type { PaymentPayload } from '@/types';
import { api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

const payRound = async (payload: PaymentPayload) => {
  return api.post('/rounds', payload);
};

export function usePayRoundMutation() {
  const queryClient = useQueryClient();

  const { data: rounds = [] } = useRoundsQuery();
  const { data: cycle } = useActiveCycleQuery();
  const cycleId = cycle?.id || '';

  return useMutation({
    mutationFn: async (payload: Omit<PaymentPayload, 'cycleId' | 'roundNumber' | 'date'>) => {
      const nextRound = rounds.length + 1;
      const today = dayjs().format('YYYY-MM-DD');
      await payRound({
        ...payload,
        roundNumber: String(nextRound),
        cycleId: cycleId,
        date: today,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.rounds, cycleId] });
    },
  });
}
