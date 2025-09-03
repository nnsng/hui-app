import { queryKeys } from '@/constants/query-keys';
import { notionApi } from '@/utils/api';
import { env } from '@/utils/env';
import { mapNotionHuiGroup } from '@/utils/notion';
import { useQuery } from '@tanstack/react-query';

const getActiveGroup = async () => {
  const payload = {
    filter: {
      property: 'status',
      select: {
        equals: 'active',
      },
    },
  };
  const url = `/databases/${env.NOTION_GROUP_DATABASE_ID}/query`;
  const response = await notionApi.post(url, payload);
  return mapNotionHuiGroup(response);
};

export function useActiveGroupQuery() {
  return useQuery({
    queryKey: [queryKeys.group],
    queryFn: getActiveGroup,
  });
}
