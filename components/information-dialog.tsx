import { colors } from '@/constants/colors';
import { useGetInformation } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { StyleSheet, Text, View } from 'react-native';
import Loading from './loading';
import Dialog from './ui/dialog';

type InformationDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export default function InformationDialog({ visible, onClose }: InformationDialogProps) {
  const { data: information, isLoading } = useGetInformation();

  const listData = [
    {
      label: 'Số người',
      value: information?.numberOfPlayers ?? 0,
    },
    {
      label: 'Số tiền đóng',
      value: formatCurrency(information?.monthlyContribution),
    },
    {
      label: 'Tối thiểu',
      value: formatCurrency(information?.minimumBid),
    },
    {
      label: 'Tiền cò',
      value: formatCurrency(information?.commission),
    },
  ];

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
