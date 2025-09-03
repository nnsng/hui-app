import { queryKeys } from '@/constants/query-keys';
import { useActiveGroupQuery } from '@/hooks/queries';
import { notionApi } from '@/utils/api';
import { env } from '@/utils/env';
import { mapNotionHuiPeriods } from '@/utils/notion';
import { useQuery } from '@tanstack/react-query';

const getPeriods = async (groupId: string) => {
  const url = `/databases/${env.NOTION_PERIOD_DATABASE_ID}/query`;
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
  const data = await notionApi.post(url, payload);
  return await mapNotionHuiPeriods(data);
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
