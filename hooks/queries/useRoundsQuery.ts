import { queryKeys } from '@/constants/queryKeys';
import type { Round } from '@/types';
import { api } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useActiveCycleQuery } from './useActiveCycleQuery';

const fetchRounds = async (cycleId: string): Promise<Round[]> => {
  return api.get(`/rounds?cycleId=${cycleId}`);
};

export function useRoundsQuery() {
  const { data: cycle } = useActiveCycleQuery();

  const cycleId = cycle?.id || '';

  return useQuery({
    queryKey: [queryKeys.rounds, cycleId],
    queryFn: () => fetchRounds(cycleId),
    enabled: !!cycleId,
  });
}
