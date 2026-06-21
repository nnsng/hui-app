import { queryKeys } from '@/constants/queryKeys';
import { api } from '@/utils/api';
import { getRoundsFromNotion } from '@/utils/notion';
import type { PageObjectResponse, QueryDataSourceResponse } from '@notionhq/client';
import { useQuery } from '@tanstack/react-query';
import { useActiveCycleQuery } from './useActiveCycleQuery';

const getRounds = async (cycleId: string) => {
  const response: QueryDataSourceResponse = await api.get(`/api/rounds?cycleId=${cycleId}`);
  return getRoundsFromNotion(response.results as PageObjectResponse[]);
};

export function useRoundsQuery() {
  const { data: cycle } = useActiveCycleQuery();

  const cycleId = cycle?.id || '';

  return useQuery({
    queryKey: [queryKeys.rounds, cycleId],
    queryFn: () => getRounds(cycleId),
    enabled: !!cycleId,
  });
}
