import { usePayout } from '@/hooks/mutations';
import { useGetInformation, useGetRound } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './ui/button';
import Dialog from './ui/dialog';
import Input from './ui/input';

type PayoutDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export default function PayoutDialog({ visible, onClose }: PayoutDialogProps) {
  const { data = [] } = useGetRound();
  const { data: information } = useGetInformation();
  const { mutateAsync: onPayout, isPending } = usePayout();

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const bidAmount = Number(input);

  const totalContribution = useMemo(() => {
    if (!data || !information) return 0;

    const { numberOfPlayers, monthlyContribution } = information;

    const pastContribution = data.reduce((total, round) => {
      return total + (monthlyContribution - round.bidAmount);
    }, 0);
    const remainingPlayers = numberOfPlayers - data.length - 1;
    const futureContribution = remainingPlayers * monthlyContribution;

    return pastContribution + futureContribution;
  }, [data, information]);

  const totalPayout = useMemo(() => {
    if (!data || !information) return 0;

    const { numberOfPlayers, monthlyContribution, commission } = information;

    const pastPayout = data.length * monthlyContribution;
    const remainingPlayers = numberOfPlayers - data.length - 1;
    const netContribution = monthlyContribution - bidAmount;
    const futurePayout = remainingPlayers * netContribution;

    return pastPayout + futurePayout - commission;
  }, [data, information, bidAmount]);

  const difference = totalPayout - totalContribution;

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
    await onPayout(totalPayout);
    setInput('');
    handleClose();
  };

  return (
    <Dialog
      title="Hốt hụi"
      visible={visible}
      onClose={handleClose}
      submitButton={
        <Button loading={isPending} disabled={!input || error} onPress={handleSubmit}>
          Đồng ý
        </Button>
      }
    >
      <View style={styles.container}>
        <View>
          <Input
            placeholder="Nhập số tiền kêu..."
            keyboardType="numeric"
            value={input}
            onChangeText={handleChangeText}
            error={error ? 'Vui lòng nhập số tiền hợp lệ' : ''}
          />
          {!error && (
            <View>
              <Text style={styles.currency}>Số tiền kêu: {formatCurrency(input)}</Text>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.text}>
            Bạn sẽ nhận được: <Text style={styles.boldText}>{formatCurrency(totalPayout)}</Text>
          </Text>

          <Text style={styles.text}>
            Chênh lệch: <Text style={styles.boldText}>{formatCurrency(difference)}</Text>
          </Text>
        </View>
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  currency: {
    marginTop: 5,
    fontSize: 12,
  },
  text: {},
  boldText: {
    fontWeight: 'bold',
  },
});
