import { env } from '@/constants/env';
import type { HuiPool } from '@/types/data';
import api from '@/utils/api';
import { mapNotionInformation } from '@/utils/notion';
import { useQuery } from '@tanstack/react-query';

const getCurrentInformation = async () => {
  const payload = {
    filter: {
      property: 'active',
      checkbox: {
        equals: true,
      },
    },
  };
  const url = `/databases/${env.NOTION_DATABASE_ID.INFORMATION}/query`;
  const response = await api.post(url, payload);
  return mapNotionInformation(response);
};

export function useGetInformation() {
  return useQuery({
    queryKey: ['information'],
    queryFn: getCurrentInformation,
  });
}
