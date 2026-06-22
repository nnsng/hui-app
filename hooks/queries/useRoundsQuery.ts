import { queryKeys } from '@/constants/queryKeys';
import { notion } from '@/lib/notionClient';
import type { Round } from '@/types';
import { env } from '@/utils/env';
import { mapNotionPageToRound } from '@/utils/notion';
import type { PageObjectResponse } from '@notionhq/client';
import { useQuery } from '@tanstack/react-query';
import { useActiveCycleQuery } from './useActiveCycleQuery';

const fetchRounds = async (cycleId: string): Promise<Round[]> => {
  const response = await notion.dataSources.query({
    data_source_id: env.EXPO_PUBLIC_NOTION_ROUND_DATA_SOURCE_ID,
    filter: {
      property: 'cycle',
      relation: {
        contains: cycleId,
      },
    },
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
  });

  const rounds = response.results.map((item) => mapNotionPageToRound(item as PageObjectResponse));
  return rounds;
};

export function useRoundsQuery() {
  const { data: cycle } = useActiveCycleQuery();

  const cycleId = cycle?.id || '';

  return useQuery({
    queryKey: [queryKeys.rounds, cycleId],
    queryFn: () => fetchRounds(cycleId),
    enabled: !!cycleId,
  });
}
