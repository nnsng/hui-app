export type HuiPeriod = {
  id: string;
  period: `${number}`;
  contributionDate: string;
  contributionDateLunar: string;
  bidAmount: number;
  isPayout: boolean;
};

export type HuiGroup = {
  id: string;
  name: string;
  totalMembers: number;
  contributionAmount: number;
  minimumBid: number;
  managerFee: number;
  startDate: string;
  payoutDate?: string;
  payoutAmount?: number;
  difference?: number;
  status?: 'active' | 'finished';
  note?: string;
};
