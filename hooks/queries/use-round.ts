import { env } from '@/constants/env';
import api from '@/utils/api';
import { mapNotionRound } from '@/utils/notion';
import { useQuery } from '@tanstack/react-query';
import { useGetInformation } from './use-information';

const getData = async (informationId: string) => {
  const url = `/databases/${env.NOTION_DATABASE_ID.ROUND}/query`;
  const payload = {
    filter: {
      property: 'information',
      relation: {
        contains: informationId,
      },
    },
    sorts: [
      {
        property: 'date',
        direction: 'ascending',
      },
    ],
  };
  const data = await api.post(url, payload);
  return mapNotionRound(data);
};

export function useGetRound() {
  const { data: information } = useGetInformation();
  const informationId = information?.id || '';

  return useQuery({
    queryKey: ['data', informationId],
    queryFn: () => getData(informationId),
    enabled: !!informationId,
  });
}
