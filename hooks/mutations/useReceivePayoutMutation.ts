import { queryKeys } from '@/constants/queryKeys';
import { useActiveCycleQuery } from '@/hooks/queries';
import { notion } from '@/lib/notionClient';
import type { Cycle, ReceivePayload } from '@/types';
import { mapNotionPageToCycle } from '@/utils/notion';
import type { PageObjectResponse } from '@notionhq/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

const receivePayout = async (cycleId: Cycle['id'], payload: ReceivePayload) => {
  const { receivedAmount, netProfit } = payload;
  const today = dayjs().format('YYYY-MM-DD');

  const response = await notion.pages.update({
    page_id: cycleId,
    properties: {
      receivedDate: { date: { start: today } },
      receivedAmount: { number: receivedAmount },
      netProfit: { number: netProfit },
    },
  });

  const cycle = mapNotionPageToCycle(response as PageObjectResponse);
  return cycle;
};

export function useReceivePayoutMutation() {
  const queryClient = useQueryClient();

  const { data: cycle } = useActiveCycleQuery();
  const cycleId = cycle?.id || '';

  return useMutation({
    mutationFn: async (payload: ReceivePayload) => {
      await receivePayout(cycleId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.cycle] });
    },
  });
}
