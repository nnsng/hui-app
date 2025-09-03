import { Button, Dialog, Input } from '@/components/ui';
import { colors } from '@/constants/colors';
import { usePayoutMutation } from '@/hooks/mutations';
import { useActiveGroupQuery, usePeriodsQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, type TextInput } from 'react-native';

type PayoutDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export function PayoutDialog({ visible, onClose }: PayoutDialogProps) {
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
    await onPayout({ amount: totalPayout, difference });
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
            Số tiền hốt hụi: <Text style={styles.boldText}>{formatCurrency(totalPayout)}</Text>
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
