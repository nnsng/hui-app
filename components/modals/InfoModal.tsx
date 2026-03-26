import { Loading } from '@/components';
import { List, Modal } from '@/components/ui';
import { colors } from '@/constants/colors';
import { useModal } from '@/contexts/ModalContext';
import { useActiveCycleQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { formatDate } from '@/utils/date';
import { StyleSheet } from 'react-native';

export function InfoModal() {
  const { visible, onClose } = useModal('info');

  const { data: cycle, isLoading } = useActiveCycleQuery();

  const listData = [
    {
      label: 'Số người',
      value: cycle?.totalRounds ?? 0,
    },
    {
      label: 'Tiền hụi',
      value: formatCurrency(cycle?.totalAmount),
    },
    {
      label: 'Tiền dằn',
      value: formatCurrency(cycle?.minBidAmount),
    },
    {
      label: 'Tiền cò',
      value: formatCurrency(cycle?.commissionFee),
    },
  ];

  const receivedData = [
    {
      label: 'Ngày hốt hụi',
      value: formatDate(cycle!.receivedDate!),
    },
    {
      label: 'Tiền hốt hụi',
      value: formatCurrency(cycle?.receivedAmount),
    },
    {
      label: 'Chênh lệch',
      value: formatCurrency(cycle?.netProfit),
    },
  ];

  return (
    <Modal title="Thông tin hụi" visible={visible} onClose={onClose}>
      {isLoading ? (
        <Loading size="small" />
      ) : (
        <>
          <List data={listData} style={styles.list} />
          {cycle!.receivedDate && <List data={receivedData} style={styles.receiveList} />}
        </>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  list: {},
  receiveList: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
});
