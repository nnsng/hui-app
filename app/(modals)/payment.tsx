import { Summary, type SummaryItem } from '@/components/common';
import { Modal, ModalAmountInput } from '@/components/modal';
import { usePayRoundMutation } from '@/hooks/mutations';
import { useActiveCycleQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useState } from 'react';

export default function PaymentModalScreen() {
  const { data: cycle } = useActiveCycleQuery();
  const { totalAmount = 0, minBidAmount = 0, isReceived } = cycle || {};

  const { mutateAsync: onPayRound, isPending } = usePayRoundMutation();

  const [input, setInput] = useState('');
  const bidAmount = Number(input) || 0;

  const paymentAmount = totalAmount - bidAmount;
  const summary: SummaryItem[] = [
    { label: 'Số tiền bỏ hụi', value: formatCurrency(bidAmount), enabled: !isReceived },
    { label: 'Số tiền cần đóng', value: formatCurrency(paymentAmount) },
  ];

  const handleSubmit = async () => {
    await onPayRound({
      bidAmount,
      paymentAmount,
      status: isReceived ? 'dead' : 'normal',
    });
  };

  return (
    <Modal
      title={isReceived ? 'Đóng hụi chết' : 'Đóng hụi'}
      subtitle="Đóng hụi cho dây hụi hiện tại"
      submitLabel="Đóng hụi"
      submitDisabled={!isReceived && bidAmount < minBidAmount}
      submitLoading={isPending}
      onSubmit={handleSubmit}
    >
      {!isReceived && (
        <ModalAmountInput label="Số tiền bỏ hụi" value={input} onChange={setInput} autoFocus />
      )}

      <Summary summary={summary} />
    </Modal>
  );
}
