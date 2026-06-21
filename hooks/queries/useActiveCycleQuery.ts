import { queryKeys } from '@/constants/queryKeys';
import { api } from '@/utils/api';
import { getCycleFromNotion } from '@/utils/notion';
import type { PageObjectResponse, QueryDataSourceResponse } from '@notionhq/client';
import { useQuery } from '@tanstack/react-query';

const getActiveCycle = async () => {
  const response: QueryDataSourceResponse = await api.get('/api/cycle');
  return getCycleFromNotion(response.results as PageObjectResponse[]);
};

export function useActiveCycleQuery() {
  return useQuery({
    queryKey: [queryKeys.cycle],
    queryFn: getActiveCycle,
  });
}
