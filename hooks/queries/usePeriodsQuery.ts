import { queryKeys } from '@/constants/query-keys';
import { useActiveGroupQuery } from '@/hooks/queries/useActiveGroupQuery';
import { notionApi } from '@/utils/api';
import { env } from '@/utils/env';
import { mapNotionHuiPeriods } from '@/utils/notion';
import { useQuery } from '@tanstack/react-query';

const getPeriods = async (groupId: string) => {
  const url = `/data_sources/${env.EXPO_PUBLIC_NOTION_PERIOD_DATA_SOURCE_ID}/query`;
  const payload = {
    filter: {
      property: 'group_name',
      relation: {
        contains: groupId,
      },
    },
    sorts: [
      {
        property: 'contribution_date',
        direction: 'descending',
      },
    ],
  };
  const response: any = await notionApi.post(url, payload);
  return mapNotionHuiPeriods(response.results);
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
