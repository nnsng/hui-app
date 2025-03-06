import { colors } from '@/constants/colors';
import useContribution from '@/hooks/mutations/use-contribution';
import { useGetInformation } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './ui/button';
import Dialog from './ui/dialog';
import Input from './ui/input';

type ContributionDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export default function ContributionDialog(props: ContributionDialogProps) {
  const { visible, onClose } = props;

  const { mutateAsync: onContribute, isPending } = useContribution();
  const { data: information, isLoading } = useGetInformation();
  const isPayout = !isLoading && !!information?.payoutDate;

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const bidAmount = Number(input);
  const contributedAmount = (information?.monthlyContribution ?? 0) - bidAmount;

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
