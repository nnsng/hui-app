import { usePayout } from '@/hooks/mutations';
import { useGetData, useGetInformation } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PayoutDialog from './payout-dialog';
import Button from './ui/button';

export default function Footer() {
  const { data } = useGetData();
  const { data: information } = useGetInformation();
  const { mutate: onPayout } = usePayout();

  const isPaidOut = !!information?.paidOut;

  const [openDialog, setOpenDialog] = useState(false);

  const totalProfit = useMemo(() => {
    if (!data) return 0;
    return data.reduce((acc, item) => acc + item.bidAmount, 0);
  }, [data]);

  const handleSubmit = (amount: number) => {
    onPayout(amount);
  };

  return (
    <View style={styles.footer}>
      <Button disabled={isPaidOut} onPress={() => setOpenDialog(true)}>
        Hốt hụi
      </Button>
      {isPaidOut ? (
        <View>
          <Text style={styles.label}>Đã hốt hụi</Text>
          <Text style={styles.value}>{formatCurrency(information.paidOut?.amount ?? 0)}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Tiền lời ({data?.length} tháng)</Text>
          <Text style={styles.value}>{formatCurrency(totalProfit)}</Text>
        </View>
      )}

      <PayoutDialog
        visible={openDialog}
        onSubmit={handleSubmit}
        onClose={() => setOpenDialog(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    padding: 10,
  },
  label: {
    fontSize: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
