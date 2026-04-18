export type Cycle = {
  id: string;
  name: string;
  totalAmount: number;
  totalRounds: number;
  startDate: string;
  commissionFee: number;
  minBidAmount: number;
  receivedDate?: string;
  receivedAmount?: number;
  netProfit?: number;
  status: 'active' | 'finished';
};

export type Round = {
  id: string;
  cycleId: string;
  round: string;
  date: string;
  lunarDate: string;
  bidAmount: number;
  paymentAmount: number;
  status: RoundStatus;
};

export type RoundWithoutLunarDate = Omit<Round, 'lunarDate'>;

export type RoundStatus = 'normal' | 'received' | 'dead';
