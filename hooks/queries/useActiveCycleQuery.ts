import { queryKeys } from '@/constants/queryKeys';
import type { Cycle } from '@/types';
import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

const fetchActiveCycle = async (): Promise<Cycle> => {
  const cycles: Cycle[] = await api.get('/cycles?status=active');
  return cycles[0];
};

export function useActiveCycleQuery() {
  return useQuery({
    queryKey: [queryKeys.cycle],
    queryFn: fetchActiveCycle,
  });
}
