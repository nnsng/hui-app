import { Loading } from '@/components';
import { Dialog } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useActiveGroupQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import dayjs from 'dayjs';
import { StyleSheet, Text, View } from 'react-native';

type InformationDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export function InformationDialog({ visible, onClose }: InformationDialogProps) {
  const { data: group, isLoading } = useActiveGroupQuery();
  const isPayout = !isLoading && group?.status === 'finished';

  const listData = [
    {
      label: 'Số người',
      value: group?.totalMembers ?? 0,
    },
    {
      label: 'Tiền hụi',
      value: formatCurrency(group?.contributionAmount),
    },
    {
      label: 'Tiền dằn',
      value: formatCurrency(group?.minimumBid),
    },
    {
      label: 'Tiền cò',
      value: formatCurrency(group?.managerFee),
    },
  ];

  const payoutData = isPayout
    ? [
        {
          label: 'Ngày hốt hụi',
          value: dayjs(group.payoutDate).format('DD/MM/YYYY'),
        },
        {
          label: 'Tiền hốt hụi',
          value: formatCurrency(group?.payoutAmount),
        },
        {
          label: 'Chênh lệch',
          value: formatCurrency(group?.difference),
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
