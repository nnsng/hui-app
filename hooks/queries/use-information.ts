import api from '@/utils/api';
import env from '@/utils/env';
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
  const url = `/databases/${env.EXPO_PUBLIC_NOTION_INFORMATION_DATABASE_ID}/query`;
  const response = await api.post(url, payload);
  return mapNotionInformation(response);
};

export function useGetInformation() {
  return useQuery({
    queryKey: ['information'],
    queryFn: getCurrentInformation,
  });
}
