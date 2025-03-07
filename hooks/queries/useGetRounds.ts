import { env } from '@/constants/env';
import api from '@/utils/api';
import { mapNotionRound } from '@/utils/notion';
import { useQuery } from '@tanstack/react-query';
import { useGetPool } from './useGetPool';

const getRounds = async (poolId: string) => {
  const url = `/databases/${env.NOTION_ROUND_DATABASE_ID}/query`;
  const payload = {
    filter: {
      property: 'information',
      relation: {
        contains: poolId,
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

export function useGetRounds() {
  const { data: pool } = useGetPool();
  const poolId = pool?.id || '';

  return useQuery({
    queryKey: ['rounds', poolId],
    queryFn: () => getRounds(poolId),
    enabled: !!poolId,
  });
}
