import { colors } from '@/constants/colors';
import { usePayout } from '@/hooks/mutations';
import { useGetPool, useGetRounds } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, type TextInput } from 'react-native';
import { Button, Dialog, Input } from '../ui';

type PayoutDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export function PayoutDialog({ visible, onClose }: PayoutDialogProps) {
  const { data: rounds = [] } = useGetRounds();
  const { data: pool } = useGetPool();
  const { mutateAsync: onPayout, isPending } = usePayout();

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const bidAmount = Number(input);

  const totalContribution = useMemo(() => {
    if (!rounds || !pool) return 0;

    const { numberOfPlayers, monthlyContribution } = pool;

    const pastContribution = rounds.reduce((total, round) => {
      return total + (monthlyContribution - round.bidAmount);
    }, 0);
    const remainingPlayers = numberOfPlayers - rounds.length - 1;
    const futureContribution = remainingPlayers * monthlyContribution;

    return pastContribution + futureContribution;
  }, [rounds, pool]);

  const totalPayout = useMemo(() => {
    if (!rounds || !pool) return 0;

    const { numberOfPlayers, monthlyContribution, commission } = pool;

    const pastPayout = rounds.length * monthlyContribution;
    const remainingPlayers = numberOfPlayers - rounds.length - 1;
    const netContribution = monthlyContribution - bidAmount;
    const futurePayout = remainingPlayers * netContribution;

    return pastPayout + futurePayout - commission;
  }, [rounds, pool, bidAmount]);

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
            inputRef={inputRef}
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
    color: colors.text,
  },
  text: {
    color: colors.text,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
