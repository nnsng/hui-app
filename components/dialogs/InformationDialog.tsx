import { Loading } from '@/components';
import { Dialog, Divider, List } from '@/components/ui';
import { useActiveGroupQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { StyleSheet } from 'react-native';

type InformationDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export function InformationDialog({ visible, onClose }: InformationDialogProps) {
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
    <Dialog title="Thông tin hụi" visible={visible} onClose={onClose}>
      {isLoading ? (
        <Loading size="small" />
      ) : (
        <>
          <List data={listData} style={styles.list} />

          {isPayout && (
            <>
              <Divider />
              <List data={payoutData} />
            </>
          )}
        </>
      )}
    </Dialog>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: -5,
  },
});
