import { Summary, type SummaryItem } from '@/components/common';
import { Modal } from '@/components/modal';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import type { RoundStatus } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { convertToLunarDate, formatDate } from '@/utils/date';
import { useLocalSearchParams } from 'expo-router';

export default function RoundModalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: cycle } = useActiveCycleQuery();
  const { data: rounds = [] } = useRoundsQuery();

  const round = rounds.find((r) => r.id === id);
  const { receivedAmount = 0 } = cycle || {};

  if (!round) return null;

  const STATUS_NAME: Record<RoundStatus, string> = {
    normal: 'Đóng hụi',
    received: 'Hốt hụi',
    dead: 'Đóng hụi chết',
  };

  const summary: SummaryItem[] = [
    {
      label: 'Kỳ hụi',
      value: round.roundNumber,
    },
    {
      label: 'Loại kỳ',
      value: STATUS_NAME[round.status],
    },
    {
      label: round.status === 'received' ? 'Ngày hốt' : 'Ngày đóng',
      value: formatDate(round.date),
    },
    {
      label: round.status === 'received' ? 'Ngày hốt (ÂL)' : 'Ngày đóng (ÂL)',
      value: convertToLunarDate(round.date, 'DD/MM/YYYY'),
    },
    {
      label: 'Tiền bỏ hụi',
      value: formatCurrency(round.bidAmount),
      enabled: round.status !== 'dead',
    },
    {
      label: 'Tiền phải đóng',
      value: formatCurrency(round.paymentAmount),
      enabled: round.status !== 'received',
    },
    {
      label: 'Tiền hốt hụi',
      value: formatCurrency(receivedAmount),
      enabled: round.status === 'received',
    },
  ];

  return (
    <Modal title="Chi tiết kỳ hụi" subtitle={`Thông tin chi tiết kỳ ${round.roundNumber}`}>
      <Summary summary={summary} />
    </Modal>
  );
}
