import { mockData } from '@/mock/data';
import { sleep } from '@/utils/temp';
import { useQuery } from '@tanstack/react-query';

export function useGetData() {
  return useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      await sleep(2000);
      return mockData;
    },
  });
}
