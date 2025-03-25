import { colors } from '@/constants/colors';
import { useGetPool } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import dayjs from 'dayjs';
import { StyleSheet, Text, View } from 'react-native';
import { Loading } from '../Loading';
import { Dialog } from '../ui';

type InformationDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export function InformationDialog({ visible, onClose }: InformationDialogProps) {
  const { data: pool, isLoading } = useGetPool();
  const isPayout = !isLoading && !!pool?.payoutDate;

  const listData = [
    {
      label: 'Số người',
      value: pool?.numberOfPlayers ?? 0,
    },
    {
      label: 'Tiền hụi',
      value: formatCurrency(pool?.monthlyContribution),
    },
    {
      label: 'Tiền dằn',
      value: formatCurrency(pool?.minimumBid),
    },
    {
      label: 'Tiền cò',
      value: formatCurrency(pool?.commission),
    },
  ];

  const payoutData = isPayout
    ? [
        {
          label: 'Ngày hốt hụi',
          value: dayjs(pool.payoutDate).format('DD/MM/YYYY'),
        },
        {
          label: 'Tiền hốt hụi',
          value: formatCurrency(pool?.payoutAmount),
        },
        {
          label: 'Chênh lệch',
          value: formatCurrency(pool?.payoutDifference),
        },
      ]
    : [];

  return (
    <Dialog title="Thông tin hụi" visible={visible} onClose={onClose}>
      {isLoading ? (
        <Loading size="small" />
      ) : (
        <View style={styles.list}>
          {listData.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.label}>{item.label}: </Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}

          {payoutData.length > 0 && (
            <>
              <View>
                <Text>---</Text>
              </View>

              <View style={styles.list}>
                {payoutData.map((item, index) => (
                  <View key={index} style={styles.item}>
                    <Text style={styles.label}>{item.label}: </Text>
                    <Text style={styles.value}>{item.value}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      )}
    </Dialog>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 5,
  },
  item: {
    flexDirection: 'row',
  },
  label: {
    color: colors.text,
  },
  value: {
    color: colors.text,
  },
});
