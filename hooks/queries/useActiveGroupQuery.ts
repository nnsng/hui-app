import { queryKeys } from '@/constants/query-keys';
import { notionApi } from '@/utils/api';
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
    page_size: 1,
  };
  const url = `/data_sources/${process.env.EXPO_PUBLIC_NOTION_GROUP_DATA_SOURCE_ID}/query`;
  const response: any = await notionApi.post(url, payload);
  return mapNotionHuiGroup(response.results);
};

export function useActiveGroupQuery() {
  return useQuery({
    queryKey: [queryKeys.group],
    queryFn: getActiveGroup,
  });
}
