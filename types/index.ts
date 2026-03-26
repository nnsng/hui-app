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

export type CycleRound = {
  id: string;
  cycleId: string;
  round: string;
  date: string;
  lunarDate: string;
  bidAmount: number;
  paymentAmount: number;
  status: 'normal' | 'received' | 'dead';
};
