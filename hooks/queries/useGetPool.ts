import { env } from '@/constants/env';
import api from '@/utils/api';
import { mapNotionInformation } from '@/utils/notion';
import { useQuery } from '@tanstack/react-query';

const getCurrentPool = async () => {
  const payload = {
    filter: {
      property: 'active',
      checkbox: {
        equals: true,
      },
    },
  };
  const url = `/databases/${env.NOTION_POOL_DATABASE_ID}/query`;
  const response = await api.post(url, payload);
  return mapNotionInformation(response);
};

export function useGetPool() {
  return useQuery({
    queryKey: ['pool'],
    queryFn: getCurrentPool,
  });
}
