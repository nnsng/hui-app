import { Loading } from '@/components';
import { List, Modal } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useModal } from '@/contexts/ModalContext';
import { useActiveGroupQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { StyleSheet } from 'react-native';

export function InfoModal() {
  const { visible, onClose } = useModal('info');

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
    <Modal title="Thông tin hụi" visible={visible} onClose={onClose}>
      {isLoading ? (
        <Loading size="small" />
      ) : (
        <>
          <List data={listData} style={styles.list} />
          {isPayout && <List data={payoutData} style={styles.payoutList} />}
        </>
      )}
    </Modal>
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
