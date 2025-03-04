import { useMutation } from '@tanstack/react-query';

export default function useContribute() {
  return useMutation({
    mutationKey: ['data'],
    mutationFn: async (amount: number) => {
      console.log('submit', amount, new Date().toISOString());
    },
  });
}
