import { Summary, type SummaryItem } from '@/components/common';
import { Modal, ModalAmountInput } from '@/components/modal';
import { useMakePaymentMutation } from '@/hooks/mutations';
import { useActiveCycleQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useState } from 'react';

export function PaymentModal() {
  const { data: cycle } = useActiveCycleQuery();
  const { totalAmount, minBidAmount, isReceived } = cycle!;

  const { mutateAsync: onMakePayment, isPending } = useMakePaymentMutation();

  const [input, setInput] = useState('');
  const bidAmount = Number(input) || 0;

  const paymentAmount = totalAmount - bidAmount;
  const summary: SummaryItem[] = [
    { label: 'Số tiền bỏ hụi', value: formatCurrency(bidAmount), enabled: !isReceived },
    { label: 'Số tiền cần đóng', value: formatCurrency(paymentAmount) },
  ];

  const handleSubmit = async () => {
    await onMakePayment({
      bidAmount,
      paymentAmount,
      status: isReceived ? 'dead' : 'normal',
    });
  };

  return (
    <Modal
      modalKey="payment"
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
