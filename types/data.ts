export type Round = {
  id: string;
  date: string;
  bidAmount: number;
};

export type Information = {
  id: string;
  playerCount: number;
  monthlyContribution: number;
  minBidAmount: number;
  commission: number;
  startedDate: string;
  paidOut?: {
    date: string;
    amount: number;
  };
};
