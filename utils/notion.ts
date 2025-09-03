import type { HuiGroup, HuiPeriod } from '@/types';

export const mapNotionHuiGroup = (data: any): HuiGroup => {
  try {
    if (!Array.isArray(data?.results) || data.results.length === 0) return {} as HuiGroup;

    const result = data.results[0];
    const {
      name,
      total_members,
      contribution_amount,
      minimum_bid,
      manager_fee,
      start_date,
      payout_date,
      payout_amount,
      difference,
      status,
      note,
    } = result.properties;

    return {
      id: result.id,
      name: name.title?.[0]?.plain_text ?? '',
      totalMembers: total_members.number ?? 0,
      contributionAmount: contribution_amount.number ?? 0,
      minimumBid: minimum_bid.number ?? 0,
      managerFee: manager_fee.number ?? 0,
      startDate: start_date.date?.start ?? '',
      payoutDate: payout_date.date?.start ?? '',
      payoutAmount: payout_amount.number ?? 0,
      difference: difference.number ?? 0,
      status: status ?? '',
      note: note.rich_text?.[0]?.plain_text ?? '',
    };
  } catch (error) {
    console.error('Error mapping notion hui group:', error);
    return {} as HuiGroup;
  }
};

export const mapNotionHuiPeriods = (data: any) => {
  try {
    const results = data?.results;
    if (!Array.isArray(results) || results.length === 0) return [];

    return results.map((result: any): HuiPeriod => {
      const { period, contribution_date, bid_amount } = result.properties;

      return {
        id: result.id ?? '',
        period: period.title?.[0]?.plain_text ?? '0',
        contributionDate: contribution_date.date?.start ?? '',
        bidAmount: bid_amount.number ?? 0,
      };
    });
  } catch (error) {
    console.error('Error mapping notion hui periods:', error);
    return [];
  }
};
