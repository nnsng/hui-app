import { Button } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useModal } from '@/contexts/ModalContext';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Footer() {
  const { data: rounds = [] } = useRoundsQuery();
  const { data: cycle } = useActiveCycleQuery();
  const isReceived = !!cycle!.receivedDate;

  const { onOpen: onOpenReceiveModal } = useModal('receive');

  const totalProfit = useMemo(() => {
    return rounds.reduce((acc, item) => acc + item.bidAmount, 0);
  }, [rounds]);

  if (!cycle) return null;

  if (isReceived) {
    return (
      <View style={styles.footer}>
        <View style={styles.content}>
          <Text style={styles.label}>Đã hốt hụi</Text>
          <Text style={styles.value}>{formatDate(cycle.receivedDate!)}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Số tiền hốt hụi</Text>
          <Text style={styles.value}>{formatCurrency(cycle.receivedAmount)}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.footer}>
      <Button disabled={isReceived} onPress={onOpenReceiveModal}>
        Hốt hụi
      </Button>

      <View style={styles.content}>
        <Text style={styles.label}>Tiền lời ({rounds?.length} tháng)</Text>
        <Text style={styles.value}>{formatCurrency(totalProfit)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  content: {},
  label: {
    fontSize: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
