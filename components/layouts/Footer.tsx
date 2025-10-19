import { Button } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useModal } from '@/contexts/ModalContext';
import { useActiveGroupQuery, usePeriodsQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Footer() {
  const { data: periods } = usePeriodsQuery();
  const { data: group, isLoading } = useActiveGroupQuery();

  const isPayout = !isLoading && !!group?.payoutDate;

  const { onOpen: onOpenPayoutModal } = useModal('payout');

  const totalProfit = useMemo(() => {
    if (!periods) return 0;
    return periods.reduce((acc, item) => acc + item.bidAmount, 0);
  }, [periods]);

  if (isPayout) {
    return (
      <View style={styles.footer}>
        <View style={styles.content}>
          <Text style={styles.label}>Đã hốt hụi</Text>
          <Text style={styles.value}>{group.payoutDate}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Số tiền</Text>
          <Text style={styles.value}>{formatCurrency(group.payoutAmount ?? 0)}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.footer}>
      <Button disabled={isPayout} onPress={onOpenPayoutModal}>
        Hốt hụi
      </Button>

      <View style={styles.content}>
        <Text style={styles.label}>Tiền lời ({periods?.length} tháng)</Text>
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
