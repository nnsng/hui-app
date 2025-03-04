import { useGetInformation } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dialog from './ui/dialog';
import Input from './ui/input';

type ContributionDialogProps = {
  visible: boolean;
  onSubmit: (value: number) => void;
  onClose: () => void;
};

export default function ContributionDialog(props: ContributionDialogProps) {
  const { visible, onSubmit, onClose } = props;

  const { data: information } = useGetInformation();
  const isPaidOut = !!information?.paidOut;

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

  const handleSubmit = () => {
    if (error) return;

    setError(false);
    onSubmit(bidAmount);
    setInput('');
    handleClose();
  };

  return (
    <Dialog
      title="Đóng hụi"
      visible={visible}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isValid={isPaidOut || (!!input && !error)}
    >
      <Input
        placeholder="Nhập số tiền kêu..."
        keyboardType="numeric"
        value={input}
        onChangeText={handleChangeText}
        editable={!isPaidOut}
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
  },
});
