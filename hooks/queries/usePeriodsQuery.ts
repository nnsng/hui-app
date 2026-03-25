import { queryKeys } from '@/constants/query-keys';
import { useActiveGroupQuery } from '@/hooks/queries/useActiveGroupQuery';
import { notionApi } from '@/utils/api';
import { getHuiPeriodsFromNotion } from '@/utils/notion';
import { useQuery } from '@tanstack/react-query';

const getPeriods = async (groupId: string) => {
  const url = `/data_sources/${process.env.EXPO_PUBLIC_NOTION_PERIOD_DATA_SOURCE_ID}/query`;
  const payload = {
    filter: {
      property: 'group',
      relation: {
        contains: groupId,
      },
    },
    sorts: [
      {
        property: 'contributionDate',
        direction: 'descending',
      },
    ],
  };
  const response: any = await notionApi.post(url, payload);
  return getHuiPeriodsFromNotion(response.results);
};

export function usePeriodsQuery() {
  const { data: group } = useActiveGroupQuery();
  const groupId = group?.id || '';

  return useQuery({
    queryKey: [queryKeys.periods, groupId],
    queryFn: () => getPeriods(groupId),
    enabled: !!groupId,
  });
}
