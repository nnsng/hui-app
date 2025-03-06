import type { HuiPool, Round } from '@/types';
import { randomNumber } from '@/utils/temp';

export const mockData: Round[] = new Array(10).fill(0).map((_, index, arr) => ({
  id: String(index + 1),
  date: `2022-01-${String(index + 1).padStart(2, '0')}`,
  bidAmount: index < arr.length / 2 ? randomNumber(400_000, 1_000_000) : 0,
}));

export const mockInformation: HuiPool = {
  id: '1234',
  numberOfPlayers: 35,
  monthlyContribution: 3_000_000,
  minimumBid: 400_000,
  commission: 900_000,
  startDate: '2022-01-01',
};
