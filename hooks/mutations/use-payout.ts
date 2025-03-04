import { useMutation } from '@tanstack/react-query';

export function usePayout() {
  return useMutation({
    mutationKey: ['information'],
    mutationFn: async (amount: number) => {
      console.log('submit', amount, new Date().toISOString());
    },
  });
}
