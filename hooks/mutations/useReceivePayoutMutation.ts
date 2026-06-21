import { queryKeys } from '@/constants/queryKeys';
import { useActiveCycleQuery } from '@/hooks/queries';
import type { Cycle, ReceivePayload } from '@/types';
import { api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

const receivePayout = async (cycleId: Cycle['id'], payload: ReceivePayload) => {
  return api.patch(`/cycles/${cycleId}`, payload);
};

export function useReceivePayoutMutation() {
  const queryClient = useQueryClient();

  const { data: cycle } = useActiveCycleQuery();

  return useMutation({
    mutationFn: async (payload: Omit<ReceivePayload, 'receivedDate'>) => {
      const cycleId = cycle?.id || '';
      const today = dayjs().format('YYYY-MM-DD');
      await receivePayout(cycleId, { ...payload, receivedDate: today });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.cycle] });
    },
  });
}
