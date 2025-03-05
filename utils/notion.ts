import type { HuiPool, Round } from '@/types/data';

export const mapNotionInformation = (data: any): HuiPool[] => {
  return data.results.map((result: any) => {
    const { playerCount, monthlyContribution, minimumBid, commission, startDate } =
      result.properties;

    return {
      id: result.id,
      playerCount: playerCount.number ?? 0,
      monthlyContribution: monthlyContribution.number ?? 0,
      minimumBid: minimumBid.number ?? 0,
      commission: commission.number ?? 0,
      startDate: startDate.date.start,
    };
  });
};

export const mapNotionRound = (data: any): Round[] => {
  return data.results.map((result: any) => {
    const { date, bidAmount } = result.properties;

    return {
      id: result.id,
      date: date.date.start,
      bidAmount: bidAmount.number ?? 0,
    };
  });
};
