import { queryKeys } from '@/constants/query-keys';
import { useActiveGroupQuery } from '@/hooks/queries';
import { notionApi } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

type PayoutPayload = {
  groupId: string;
  bidAmount: number;
  payoutAmount: number;
  difference: number;
};

const onPayout = async ({ groupId, payoutAmount, difference }: PayoutPayload) => {
  const url = `/pages/${groupId}`;
  const payload = {
    properties: {
      payout_date: { date: { start: dayjs().format('YYYY-MM-DD') } },
      payout_amount: { number: payoutAmount },
      difference: { number: difference },
    },
  };
  return notionApi.patch(url, payload);
};

export function usePayoutMutation() {
  const queryClient = useQueryClient();

  const { data: group } = useActiveGroupQuery();
  const groupId = group?.id || '';

  return useMutation({
    mutationFn: async (payload: Omit<PayoutPayload, 'groupId'>) => {
      await onPayout({ ...payload, groupId });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.group] });
    },
  });
}
