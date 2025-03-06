import type { HuiPool, Round } from '@/types/data';

export const mapNotionInformation = (data: any): HuiPool => {
  try {
    if (!Array.isArray(data?.results) || data.results.length === 0) return {} as HuiPool;

    const result = data.results[0];
    const {
      numberOfPlayers,
      monthlyContribution,
      minimumBid,
      commission,
      startDate,
      payoutDate,
      payoutAmount,
    } = result.properties;

    return {
      id: result.id,
      numberOfPlayers: numberOfPlayers.number ?? 0,
      monthlyContribution: monthlyContribution.number ?? 0,
      minimumBid: minimumBid.number ?? 0,
      commission: commission.number ?? 0,
      startDate: startDate.date?.start ?? '',
      payoutDate: payoutDate.date?.start ?? '',
      payoutAmount: payoutAmount.number ?? 0,
    };
  } catch (error) {
    console.error('Error mapping notion information:', error);
    return {} as HuiPool;
  }
};

export const mapNotionRound = (data: any) => {
  try {
    const results = data?.results;
    if (!Array.isArray(results) || results.length === 0) return [];

    return results.map((result: any): Round => {
      const { date, bidAmount } = result.properties;

      return {
        id: result.id ?? '',
        date: date.date?.start ?? '',
        bidAmount: bidAmount.number ?? 0,
      };
    });
  } catch (error) {
    console.error('Error mapping notion round:', error);
    return [];
  }
};
