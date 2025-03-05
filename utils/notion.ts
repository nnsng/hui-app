import type { HuiPool, Round } from '@/types/data';

export const mapNotionInformation = (data: any) => {
  return data.results.map((result: any) => {
    const { numberOfPlayers, monthlyContribution, minimumBid, commission, startDate } =
      result.properties;

    return {
      id: result.id,
      numberOfPlayers: numberOfPlayers.number ?? 0,
      monthlyContribution: monthlyContribution.number ?? 0,
      minimumBid: minimumBid.number ?? 0,
      commission: commission.number ?? 0,
      startDate: startDate.date.start,
    } satisfies HuiPool;
  });
};

export const mapNotionRound = (data: any) => {
  return data.results.map((result: any) => {
    const { date, bidAmount } = result.properties;

    return {
      id: result.id,
      date: date.date.start,
      bidAmount: bidAmount.number ?? 0,
    } satisfies Round;
  });
};
