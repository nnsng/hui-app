export type Round = {
  id: string;
  period: `${number}`;
  date: string;
  lunarDate: string;
  bidAmount: number;
};

export type HuiPool = {
  id: string;
  numberOfPlayers: number;
  monthlyContribution: number;
  minimumBid: number;
  commission: number;
  startDate: string;
  payoutDate?: string;
  payoutAmount?: number;
  payoutDifference?: number;
};
