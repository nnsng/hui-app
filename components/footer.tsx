import { colors } from '@/constants/colors';
import { useGetInformation, useGetRound } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import PayoutDialog from './payout-dialog';
import Button from './ui/button';

type FooterProps = {
  style?: ViewStyle;
};

export default function Footer({ style }: FooterProps) {
  const { data } = useGetRound();
  const { data: information, isLoading } = useGetInformation();

  const isPayout = !isLoading && !!information?.payoutDate;

  const [openDialog, setOpenDialog] = useState(false);

  const totalProfit = useMemo(() => {
    if (!data) return 0;
    return data.reduce((acc, item) => acc + item.bidAmount, 0);
  }, [data]);

  return (
    <View style={[styles.footer, style]}>
      <Button disabled={isPayout} onPress={() => setOpenDialog(true)}>
        Hốt hụi
      </Button>
      {isPayout ? (
        <View>
          <Text style={styles.label}>Đã hốt hụi</Text>
          <Text style={styles.value}>{formatCurrency(information.payoutAmount ?? 0)}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Tiền lời ({data?.length} tháng)</Text>
          <Text style={styles.value}>{formatCurrency(totalProfit)}</Text>
        </View>
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
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  label: {
    fontSize: 12,
    color: colors.text,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
});
