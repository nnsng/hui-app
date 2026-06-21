import type { Cycle, Round } from './data';

export type PaymentPayload = Required<
  Pick<Round, 'cycleId' | 'roundNumber' | 'date' | 'bidAmount' | 'paymentAmount' | 'status'>
>;

export type ReceivePayload = Required<Pick<Cycle, 'receivedDate' | 'receivedAmount' | 'netProfit'>>;
