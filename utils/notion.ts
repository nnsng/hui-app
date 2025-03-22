import type { HuiPool, Round } from '@/types';
import { getLunarDate } from './date';

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

export const mapNotionRound = async (data: any) => {
  try {
    const results = data?.results;
    if (!Array.isArray(results) || results.length === 0) return [];

    const roundPromises = results.map(async (result: any): Promise<Round> => {
      const { date, bidAmount } = result.properties;
      const sonarDate = date.date?.start ?? '';

      return {
        id: result.id ?? '',
        date: sonarDate,
        lunarDate: await getLunarDate(sonarDate),
        bidAmount: bidAmount.number ?? 0,
      };
    });

    return await Promise.all(roundPromises);
  } catch (error) {
    console.error('Error mapping notion round:', error);
    return [];
  }
};
