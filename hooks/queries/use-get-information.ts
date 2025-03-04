import { mockInformation } from '@/mock/data';
import { sleep } from '@/utils/temp';
import { useQuery } from '@tanstack/react-query';

export function useGetInformation() {
  return useQuery({
    queryKey: ['information'],
    queryFn: async () => {
      await sleep(2000);
      return mockInformation;
    },
  });
}
