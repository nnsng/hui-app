import { queryKeys } from '@/constants/queryKeys';
import type { Cycle } from '@/types';
import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

const getActiveCycle = async (): Promise<Cycle> => {
  const cycles: Cycle[] = await api.get('/cycle?status=active');
  return cycles[0];
};

export function useActiveCycleQuery() {
  return useQuery({
    queryKey: [queryKeys.cycle],
    queryFn: getActiveCycle,
  });
}
