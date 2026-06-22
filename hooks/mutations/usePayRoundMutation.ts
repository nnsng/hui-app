import { queryKeys } from '@/constants/queryKeys';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import { notion } from '@/lib/notionClient';
import type { PaymentPayload } from '@/types';
import { env } from '@/utils/env';
import { mapNotionPageToRound } from '@/utils/notion';
import type { PageObjectResponse } from '@notionhq/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

const payRound = async (payload: PaymentPayload) => {
  const { cycleId, roundNumber, bidAmount, paymentAmount, status } = payload;
  const today = dayjs().format('YYYY-MM-DD');

  const response = await notion.pages.create({
    parent: {
      data_source_id: env.EXPO_PUBLIC_NOTION_ROUND_DATA_SOURCE_ID,
    },
    properties: {
      cycle: { relation: [{ id: cycleId }] },
      round: { title: [{ text: { content: roundNumber } }] },
      date: { date: { start: today } },
      bidAmount: { number: bidAmount },
      paymentAmount: { number: paymentAmount },
      status: { select: { name: status } },
    },
  });

  const round = mapNotionPageToRound(response as PageObjectResponse);
  return round;
};

export function usePayRoundMutation() {
  const queryClient = useQueryClient();

  const { data: rounds = [] } = useRoundsQuery();
  const { data: cycle } = useActiveCycleQuery();
  const cycleId = cycle?.id || '';

  return useMutation({
    mutationFn: async (payload: Omit<PaymentPayload, 'cycleId' | 'roundNumber'>) => {
      const nextRound = rounds.length + 1;
      await payRound({
        ...payload,
        roundNumber: String(nextRound),
        cycleId: cycleId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.rounds, cycleId] });
    },
  });
}
