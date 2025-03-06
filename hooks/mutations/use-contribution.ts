import { env } from '@/constants/env';
import api from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useGetInformation, useGetRound } from '../queries';

type ContributePayload = {
  name: string;
  amount: number;
  informationId: string;
};

const createEntry = async ({ name, amount, informationId }: ContributePayload) => {
  try {
    const url = '/pages';
    const payload = {
      parent: {
        database_id: env.NOTION_ROUND_DATABASE_ID,
      },
      properties: {
        name: { title: [{ text: { content: name } }] },
        bidAmount: { number: amount },
        date: { date: { start: dayjs().format('YYYY-MM-DD') } },
        information: { relation: [{ id: informationId }] },
      },
    };

    return api.post(url, payload);
  } catch (error) {
    console.error(error);
  }
};

export default function useContribution() {
  const queryClient = useQueryClient();

  const { data: rounds } = useGetRound();
  const { data: information } = useGetInformation();
  const informationId = information?.id || '';

  return useMutation({
    mutationFn: (amount: number) => {
      const nextRoundNumber = rounds ? rounds.length + 1 : 1;
      const payload = { name: String(nextRoundNumber), amount, informationId };
      return createEntry(payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['data', informationId] });
    },
  });
}
