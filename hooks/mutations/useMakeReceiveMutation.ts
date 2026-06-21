import { queryKeys } from '@/constants/queryKeys';
import { useActiveCycleQuery } from '@/hooks/queries';
import type { Cycle, Round } from '@/types';
import { api } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMakePaymentMutation } from './useMakePaymentMutation';

type ReceivePayload = Pick<Round, 'cycleId' | 'bidAmount'> &
  Pick<Cycle, 'receivedAmount' | 'netProfit'>;
type ReceivePayloadWithoutCycleId = Omit<ReceivePayload, 'cycleId'>;

const makeReceive = async ({ cycleId, receivedAmount, netProfit }: ReceivePayload) => {
  const today = dayjs().format('YYYY-MM-DD');
  const payload = {
    receivedDate: today,
    receivedAmount: receivedAmount,
    netProfit: netProfit,
  };
  return api.patch(`/cycle/${cycleId}`, payload);
};

export function useMakeReceiveMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync: onMakePayment } = useMakePaymentMutation();
  const { data: cycle } = useActiveCycleQuery();
  const cycleId = cycle?.id || '';

  return useMutation({
    mutationFn: async (payload: ReceivePayloadWithoutCycleId) => {
      await makeReceive({ ...payload, cycleId });
    },
    onMutate: async ({ bidAmount }) => {
      await onMakePayment({
        bidAmount,
        paymentAmount: 0,
        status: 'received',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.cycle] });
    },
  });
}
