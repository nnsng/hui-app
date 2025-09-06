import { PayoutDialog } from '@/components/dialogs';
import { Button } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useActiveGroupQuery, usePeriodsQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

type FooterProps = {
  style?: ViewStyle;
};

export function Footer({ style }: FooterProps) {
  const { data: periods } = usePeriodsQuery();
  const { data: group, isLoading } = useActiveGroupQuery();

  const isPayout = !isLoading && !!group?.payoutDate;

  const [openDialog, setOpenDialog] = useState(false);

  const totalProfit = useMemo(() => {
    if (!periods) return 0;
    return periods.reduce((acc, item) => acc + item.bidAmount, 0);
  }, [periods]);

  return (
    <View style={[styles.footer, style]}>
      {isPayout ? (
        <>
          <View style={styles.content}>
            <Text style={styles.label}>Đã hốt hụi</Text>
            <Text style={styles.value}>{group.payoutDate}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.label}>Số tiền</Text>
            <Text style={styles.value}>{formatCurrency(group.payoutAmount ?? 0)}</Text>
          </View>
        </>
      ) : (
        <>
          <Button disabled={isPayout} onPress={() => setOpenDialog(true)}>
            Hốt hụi
          </Button>

          <View style={styles.content}>
            <Text style={styles.label}>Tiền lời ({periods?.length} tháng)</Text>
            <Text style={styles.value}>{formatCurrency(totalProfit)}</Text>
          </View>
        </>
      )}

      <PayoutDialog visible={openDialog} onClose={() => setOpenDialog(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.white,
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
