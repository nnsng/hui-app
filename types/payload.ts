import type { Cycle, Round } from './data';

export type PaymentPayload = Required<
  Pick<Round, 'cycleId' | 'roundNumber' | 'bidAmount' | 'paymentAmount' | 'status'>
>;

export type ReceivePayload = Required<Pick<Cycle, 'receivedAmount' | 'netProfit'>>;
