import { queryKeys } from '@/constants/queryKeys';
import { notion } from '@/lib/notionClient';
import type { Cycle } from '@/types';
import { env } from '@/utils/env';
import { mapNotionPageToCycle } from '@/utils/notion';
import type { PageObjectResponse } from '@notionhq/client';
import { useQuery } from '@tanstack/react-query';

const fetchActiveCycle = async (): Promise<Cycle> => {
  const response = await notion.dataSources.query({
    data_source_id: env.EXPO_PUBLIC_NOTION_CYCLE_DATA_SOURCE_ID,
    filter: {
      property: 'status',
      select: {
        equals: 'active',
      },
    },
    page_size: 1,
  });

  const cycle = mapNotionPageToCycle(response.results[0] as PageObjectResponse);
  return cycle;
};

export function useActiveCycleQuery() {
  return useQuery({
    queryKey: [queryKeys.cycle],
    queryFn: fetchActiveCycle,
  });
}
