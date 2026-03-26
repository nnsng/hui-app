import { queryKeys } from '@/constants/query-keys';
import { notionApi } from '@/utils/api';
import { getCycleFromNotion } from '@/utils/notion';
import { useQuery } from '@tanstack/react-query';

const getActiveCycle = async () => {
  const payload = {
    filter: {
      property: 'status',
      select: {
        equals: 'active',
      },
    },
    page_size: 1,
  };
  const url = `/data_sources/${process.env.EXPO_PUBLIC_NOTION_CYCLE_DATA_SOURCE_ID}/query`;
  const response: any = await notionApi.post(url, payload);
  return getCycleFromNotion(response.results);
};

export function useActiveCycleQuery() {
  return useQuery({
    queryKey: [queryKeys.cycle],
    queryFn: getActiveCycle,
  });
}
