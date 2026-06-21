import { Summary, type SummaryItem } from '@/components/common';
import { Modal, ModalAmountInput } from '@/components/modal';
import { useMakeReceiveMutation } from '@/hooks/mutations';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useMemo, useState } from 'react';

export default function ReceiveModalScreen() {
  const { data: rounds = [] } = useRoundsQuery();
  const { data: cycle } = useActiveCycleQuery();

  const { totalAmount, totalRounds, commissionFee } = cycle!;
  const isLastRound = rounds.length === totalRounds - 1;

  const { mutateAsync: onMakeReceive, isPending } = useMakeReceiveMutation();

  const [input, setInput] = useState('');
  const bidAmount = Number(input) || 0;

  const pastPayment = useMemo(() => {
    return rounds.reduce((total, round) => {
      return total + (totalAmount - round.bidAmount);
    }, 0);
  }, [rounds, totalAmount]);

  const pastRounds = rounds.length;
  const pastReceive = pastRounds * totalAmount;
  const remainingRounds = totalRounds - pastRounds - 1;
  const paymentAmount = totalAmount - bidAmount;
  const futureReceive = remainingRounds * paymentAmount;
  const totalReceive = pastReceive + futureReceive;

  const received = totalReceive - commissionFee;

  const futurePayment = remainingRounds * totalAmount;
  const totalPayment = pastPayment + futurePayment;
  const netProfit = totalReceive - totalPayment - commissionFee;

  const summary: SummaryItem[] = [
    { label: 'Số tiền bỏ hụi', value: formatCurrency(bidAmount), enabled: !isLastRound },
    { label: 'Số tiền hốt hụi', value: formatCurrency(totalReceive) },
    { label: 'Số tiền nhận được', value: formatCurrency(received) },
    { label: 'Chênh lệch', value: formatCurrency(netProfit) },
  ];

  const handleSubmit = async () => {
    await onMakeReceive({
      bidAmount,
      receivedAmount: totalReceive,
      netProfit,
    });
  };

  return (
    <Modal
      title="Hốt hụi"
      subtitle="Nhận tiền hốt hụi từ dây hụi"
      submitLabel="Hốt hụi"
      submitDisabled={!isLastRound && bidAmount < cycle!.minBidAmount}
      submitLoading={isPending}
      onSubmit={handleSubmit}
    >
      {!isLastRound && (
        <ModalAmountInput label="Số tiền bỏ hụi" value={input} onChange={setInput} autoFocus />
      )}

      <Summary summary={summary} />
    </Modal>
  );
}
