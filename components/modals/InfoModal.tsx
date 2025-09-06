import { Loading } from '@/components';
import { AppModel, List } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useActiveGroupQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { StyleSheet } from 'react-native';

type InfoModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function InfoModal({ visible, onClose }: InfoModalProps) {
  const { data: group, isLoading } = useActiveGroupQuery();
  const isPayout = !isLoading && !!group?.payoutDate;

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

  const payoutData = [
    {
      label: 'Ngày hốt hụi',
      value: group?.payoutDate ?? '',
    },
    {
      label: 'Tiền hốt hụi',
      value: formatCurrency(group?.payoutAmount),
    },
    {
      label: 'Chênh lệch',
      value: formatCurrency(group?.difference),
    },
  ];

  return (
    <AppModel title="Thông tin hụi" visible={visible} onClose={onClose}>
      {isLoading ? (
        <Loading size="small" />
      ) : (
        <>
          <List data={listData} style={styles.list} />
          {isPayout && <List data={payoutData} style={styles.payoutList} />}
        </>
      )}
    </AppModel>
  );
}

const styles = StyleSheet.create({
  list: {},
  payoutList: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
});
