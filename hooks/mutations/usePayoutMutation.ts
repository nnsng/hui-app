import { queryKeys } from '@/constants/query-keys';
import { useActiveGroupQuery } from '@/hooks/queries';
import { notionApi } from '@/utils/api';
import { mapValueToNotionProperty } from '@/utils/notion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useContributeMutation } from './useContributeMutation';

type PayoutPayload = {
  groupId: string;
  bidAmount: number;
  payoutAmount: number;
  difference: number;
};

type PayoutPayloadWithoutGroupId = Omit<PayoutPayload, 'groupId'>;

const payout = async ({ groupId, payoutAmount, difference }: PayoutPayload) => {
  const today = dayjs().format('YYYY-MM-DD');
  const payload = {
    properties: {
      payoutDate: mapValueToNotionProperty(today, 'date'),
      payoutAmount: mapValueToNotionProperty(payoutAmount, 'number'),
      difference: mapValueToNotionProperty(difference, 'number'),
    },
  };
  const url = `/pages/${groupId}`;
  return notionApi.patch(url, payload);
};

export function usePayoutMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync: onContribute } = useContributeMutation();
  const { data: group } = useActiveGroupQuery();
  const groupId = group?.id || '';

  return useMutation({
    mutationFn: async (payload: PayoutPayloadWithoutGroupId) => {
      await payout({ ...payload, groupId });
    },
    onMutate: async ({ bidAmount }) => {
      await onContribute({ bidAmount, isPayout: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.group] });
    },
  });
}
