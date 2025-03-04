export type HuyRound = {
  id: string;
  date: string;
  bidAmount: number;
};

export type Information = {
  playerCount: number;
  monthlyContribution: number;
  minBidAmount: number;
  commission: number;
  paidOut?: {
    date: string;
    amount: number;
  };
};
