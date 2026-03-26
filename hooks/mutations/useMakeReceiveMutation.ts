import { queryKeys } from '@/constants/query-keys';
import { useActiveCycleQuery } from '@/hooks/queries';
import type { Cycle, CycleRound } from '@/types';
import { notionApi } from '@/utils/api';
import { mapValueToNotionProperty } from '@/utils/notion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMakePaymentMutation } from './useMakePaymentMutation';

type ReceivePayload = Pick<CycleRound, 'cycleId' | 'bidAmount'> &
  Pick<Cycle, 'receivedAmount' | 'netProfit'>;
type ReceivePayloadWithoutCycleId = Omit<ReceivePayload, 'cycleId'>;

const makeReceive = async ({ cycleId, receivedAmount, netProfit }: ReceivePayload) => {
  const today = dayjs().format('YYYY-MM-DD');
  const payload = {
    properties: {
      receivedDate: mapValueToNotionProperty(today, 'date'),
      receivedAmount: mapValueToNotionProperty(receivedAmount, 'number'),
      netProfit: mapValueToNotionProperty(netProfit, 'number'),
    },
  };
  const url = `/pages/${cycleId}`;
  return notionApi.patch(url, payload);
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
      await onMakePayment({ bidAmount, status: 'received' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.cycle] });
    },
  });
}
