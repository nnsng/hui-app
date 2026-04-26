import { queryKeys } from '@/constants/queryKeys';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import type { Round } from '@/types';
import { notionApi } from '@/utils/api';
import { mapValueToNotionProperty } from '@/utils/notion';
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
      parent: {
        data_source_id: process.env.EXPO_PUBLIC_NOTION_ROUND_DATA_SOURCE_ID,
      },
      properties: {
        cycle: mapValueToNotionProperty(cycleId, 'relation'),
        round: mapValueToNotionProperty(round, 'title'),
        date: mapValueToNotionProperty(today, 'date'),
        bidAmount: mapValueToNotionProperty(bidAmount, 'number'),
        paymentAmount: mapValueToNotionProperty(paymentAmount, 'number'),
        status: mapValueToNotionProperty(status, 'select'),
      },
    };

    const url = '/pages';
    return notionApi.post(url, payload);
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
