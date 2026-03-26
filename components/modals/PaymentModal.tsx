import { Input, List, Modal } from '@/components/ui';
import { useModal } from '@/contexts/ModalContext';
import { useMakePaymentMutation } from '@/hooks/mutations';
import { useActiveCycleQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, type TextInput } from 'react-native';

export function PaymentModal() {
  const { visible, onClose } = useModal('payment');

  const { mutateAsync: onMakePayment, isPending } = useMakePaymentMutation();
  const { data: cycle } = useActiveCycleQuery();
  const isReceived = !!cycle!.receivedDate;

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const bidAmount = Number(input);
  const paymentAmount = (cycle?.totalAmount ?? 0) - bidAmount;

  useEffect(() => {
    if (visible && !isReceived) {
      inputRef.current?.focus();
    }
  }, [visible, isReceived]);

  const handleChangeText = (text: string) => {
    setInput(text);
    setError(isNaN(Number(text)));
  };

  const handleClose = () => {
    setInput('');
    setError(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (error) return;

    setError(false);
    await onMakePayment({ bidAmount, status: bidAmount === 0 ? 'dead' : 'normal' });
    setInput('');
    handleClose();
  };

  const listData = [
    {
      label: 'Số tiền bỏ hụi',
      value: formatCurrency(input),
      enabled: !isReceived,
    },
    {
      label: 'Số tiền cần đóng',
      value: formatCurrency(paymentAmount),
    },
  ];

  return (
    <Modal
      title={isReceived ? 'Đóng hụi chết' : 'Đóng hụi'}
      visible={visible}
      onClose={handleClose}
      submitButtonProps={{
        children: 'Đóng hụi',
        loading: isPending,
        disabled: !isReceived && (!input || error),
        onPress: handleSubmit,
      }}
    >
      {!isReceived && (
        <Input
          inputRef={inputRef}
          placeholder="Số tiền bỏ hụi"
          keyboardType="numeric"
          value={input}
          onChangeText={handleChangeText}
          error={error ? 'Số tiền không hợp lệ' : ''}
          autoFocus
        />
      )}

      {!error && <List data={listData} style={isReceived ? {} : styles.list} />}
    </Modal>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
  },
});
