import { env } from '@/constants/env';
import api from '@/utils/api';
import { mapNotionRound } from '@/utils/notion';
import { useQuery } from '@tanstack/react-query';
import { useGetPool } from './use-get-pool';

const getRounds = async (informationId: string) => {
  const url = `/databases/${env.NOTION_ROUND_DATABASE_ID}/query`;
  const payload = {
    filter: {
      property: 'information',
      relation: {
        contains: informationId,
      },
    },
    sorts: [
      {
        property: 'date',
        direction: 'ascending',
      },
      {
        timestamp: 'created_time',
        direction: 'ascending',
      },
    ],
  };
  const data = await api.post(url, payload);
  return mapNotionRound(data);
};

export function useGetRound() {
  const { data: information } = useGetPool();
  const informationId = information?.id || '';

  return useQuery({
    queryKey: ['data', informationId],
    queryFn: () => getRounds(informationId),
    enabled: !!informationId,
  });
}
