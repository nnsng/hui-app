import { Input, List, Modal } from '@/components/ui';
import { usePayoutMutation } from '@/hooks/mutations';
import { useActiveGroupQuery, usePeriodsQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, type TextInput } from 'react-native';

type PayoutModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function PayoutModal({ visible, onClose }: PayoutModalProps) {
  const { data: periods = [] } = usePeriodsQuery();
  const { data: group } = useActiveGroupQuery();
  const { mutateAsync: onPayout, isPending } = usePayoutMutation();

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const bidAmount = Number(input);

  const totalContribution = useMemo(() => {
    if (!periods || !group) return 0;

    const { totalMembers, contributionAmount } = group;

    const pastContribution = periods.reduce((total, round) => {
      return total + (contributionAmount - round.bidAmount);
    }, 0);
    const remainingPlayers = totalMembers - periods.length - 1;
    const futureContribution = remainingPlayers * contributionAmount;

    return pastContribution + futureContribution;
  }, [periods, group]);

  const totalPayout = useMemo(() => {
    if (!periods || !group) return 0;

    const { totalMembers, contributionAmount, managerFee } = group;

    const pastPayout = periods.length * contributionAmount;
    const remainingPlayers = totalMembers - periods.length - 1;
    const netContribution = contributionAmount - bidAmount;
    const futurePayout = remainingPlayers * netContribution;

    return pastPayout + futurePayout - managerFee;
  }, [periods, group, bidAmount]);

  const difference = totalPayout - totalContribution;

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
    await onPayout({ bidAmount, payoutAmount: totalPayout, difference });
    setInput('');
    handleClose();
  };

  const listData = [
    {
      label: 'Số tiền kêu',
      value: formatCurrency(input),
    },
    {
      label: 'Số tiền hốt hụi',
      value: formatCurrency(totalPayout),
    },
    {
      label: 'Chênh lệch',
      value: formatCurrency(difference),
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
        disabled: !input || error,
        onPress: handleSubmit,
      }}
    >
      <Input
        inputRef={inputRef}
        placeholder="Số tiền kêu"
        keyboardType="numeric"
        value={input}
        onChangeText={handleChangeText}
        error={error ? 'Số tiền không hợp lệ' : ''}
      />

      {!error && <List data={listData} style={styles.list} />}
    </Modal>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
  },
});
