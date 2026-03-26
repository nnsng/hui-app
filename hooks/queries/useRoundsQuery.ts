import { queryKeys } from '@/constants/query-keys';
import { notionApi } from '@/utils/api';
import { getRoundsFromNotion } from '@/utils/notion';
import { useQuery } from '@tanstack/react-query';
import { useActiveCycleQuery } from './useActiveCycleQuery';

const getRounds = async (cycleId: string) => {
  const payload = {
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
  };
  const url = `/data_sources/${process.env.EXPO_PUBLIC_NOTION_ROUND_DATA_SOURCE_ID}/query`;
  const response: any = await notionApi.post(url, payload);
  return getRoundsFromNotion(response.results);
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
