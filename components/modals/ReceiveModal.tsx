import { Input, List, Modal } from '@/components/ui';
import { useModal } from '@/contexts/ModalContext';
import { useMakeReceiveMutation } from '@/hooks/mutations';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, type TextInput } from 'react-native';

export function ReceiveModal() {
  const { visible, onClose } = useModal('receive');

  const { data: rounds = [] } = useRoundsQuery();
  const { data: cycle } = useActiveCycleQuery();
  const { mutateAsync: onMakeReceive, isPending } = useMakeReceiveMutation();
  const isLasRound = rounds.length + 1 >= cycle!.totalRounds;

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const bidAmount = Number(input);

  const totalPayment = useMemo(() => {
    if (!cycle) return 0;

    const { totalRounds, totalAmount } = cycle;

    const pastPayment = rounds.reduce((total, round) => {
      return total + (totalAmount - round.bidAmount);
    }, 0);
    const remainingPlayers = totalRounds - rounds.length - 1;
    const futurePayment = remainingPlayers * totalAmount;

    return pastPayment + futurePayment;
  }, [cycle, rounds]);

  const totalReceive = useMemo(() => {
    if (!cycle) return 0;

    const { totalRounds, totalAmount } = cycle;

    const pastReceive = rounds.length * totalAmount;
    const remainingRounds = totalRounds - rounds.length - 1;
    const paymentAmount = totalAmount - bidAmount;
    const futureReceive = remainingRounds * paymentAmount;

    return pastReceive + futureReceive;
  }, [cycle, rounds, bidAmount]);

  const netProfit = totalReceive - totalPayment - cycle!.commissionFee;

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

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
    await onMakeReceive({ bidAmount, receivedAmount: totalReceive, netProfit });
    setInput('');
    handleClose();
  };

  const listData = [
    {
      label: 'Số tiền bỏ hụi',
      value: formatCurrency(input),
      enabled: !isLasRound,
    },
    {
      label: 'Số tiền hốt hụi',
      value: formatCurrency(totalReceive),
    },
    {
      label: 'Số tiền nhận được',
      value: formatCurrency(totalReceive - cycle!.commissionFee),
    },
    {
      label: 'Chênh lệch',
      value: formatCurrency(netProfit),
    },
  ];

  return (
    <Modal
      title="Hốt hụi"
      visible={visible}
      onClose={handleClose}
      submitButtonProps={{
        children: 'Hốt hụi',
        loading: isPending,
        disabled: (!input && !isLasRound) || error,
        onPress: handleSubmit,
      }}
    >
      {!isLasRound && (
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

      {!error && <List data={listData} style={isLasRound ? {} : styles.list} />}
    </Modal>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
  },
});
