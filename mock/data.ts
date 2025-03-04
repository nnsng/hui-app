import type { HuyRound, Information } from '@/types/data';
import { randomNumber } from '@/utils/temp';

export const mockData: HuyRound[] = new Array(10).fill(0).map((_, index) => ({
  id: String(index + 1),
  date: `2022-01-${String(index + 1).padStart(2, '0')}`,
  bidAmount: randomNumber(400_000, 1_000_000),
}));

export const mockInformation: Information = {
  playerCount: 35,
  monthlyContribution: 3_000_000,
  minBidAmount: 400_000,
  commission: 900_000,
};
