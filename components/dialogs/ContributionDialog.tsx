import { colors } from '@/constants/colors';
import { useContribute } from '@/hooks/mutations';
import { useGetPool } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, type TextInput } from 'react-native';
import { Button, Dialog, Input } from '../ui';

type ContributionDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export function ContributionDialog({ visible, onClose }: ContributionDialogProps) {
  const { mutateAsync: onContribute, isPending } = useContribute();
  const { data: pool, isLoading } = useGetPool();
  const isPayout = !isLoading && !!pool?.payoutDate;

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const bidAmount = Number(input);
  const contributedAmount = (pool?.monthlyContribution ?? 0) - bidAmount;

  useEffect(() => {
    if (visible && !isPayout) {
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
    await onContribute(bidAmount);
    setInput('');
    handleClose();
  };

  return (
    <Dialog
      title={isPayout ? 'Đóng hụi chết' : 'Đóng hụi'}
      visible={visible}
      onClose={handleClose}
      submitButton={
        <Button
          loading={isPending}
          disabled={!isPayout && (!input || error)}
          onPress={handleSubmit}
        >
          Đồng ý
        </Button>
      }
    >
      <Input
        inputRef={inputRef}
        placeholder="Nhập số tiền kêu..."
        keyboardType="numeric"
        value={input}
        onChangeText={handleChangeText}
        editable={!isPayout}
        error={error ? 'Vui lòng nhập số tiền hợp lệ' : ''}
      />
      <View>
        {!error && <Text style={styles.currency}>Số tiền kêu: {formatCurrency(input)}</Text>}
        <Text style={styles.currency}>Số tiền cần đóng: {formatCurrency(contributedAmount)}</Text>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  currency: {
    marginTop: 5,
    fontSize: 12,
    color: colors.text,
  },
});
