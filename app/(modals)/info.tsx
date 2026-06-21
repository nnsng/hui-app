import { Summary, Typography, type SummaryItem } from '@/components/common';
import { Modal } from '@/components/modal';
import { palette } from '@/constants/palette';
import { fontSize } from '@/constants/typography';
import { useActiveCycleQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { convertToLunarDate, formatDate } from '@/utils/date';
import { StyleSheet } from 'react-native';

export default function InfoModalScreen() {
  const { data: cycle } = useActiveCycleQuery();
  const {
    totalRounds,
    totalAmount,
    minBidAmount,
    commissionFee,
    isReceived,
    receivedDate = '',
    receivedAmount = 0,
    netProfit = 0,
  } = cycle!;

  const cycleData: SummaryItem[] = [
    { label: 'Số người', value: totalRounds },
    { label: 'Tiền hụi', value: formatCurrency(totalAmount) },
    { label: 'Tiền dằn', value: formatCurrency(minBidAmount) },
    { label: 'Tiền cò', value: formatCurrency(commissionFee) },
  ];

  const receivedData: SummaryItem[] = [
    { label: 'Ngày hốt hụi', value: formatDate(receivedDate) },
    {
      label: 'Ngày hốt hụi (ÂL)',
      value: convertToLunarDate(receivedDate, 'DD/MM/YYYY'),
    },
    { label: 'Tiền hốt hụi', value: formatCurrency(receivedAmount) },
    { label: 'Tiền nhận được', value: formatCurrency(receivedAmount - commissionFee) },
    { label: 'Chênh lệch', value: formatCurrency(netProfit) },
  ];

  return (
    <Modal title="Thông tin hụi" subtitle="Chi tiết dây hụi hiện tại">
      <Summary summary={cycleData} />

      {isReceived && (
        <>
          <Typography style={styles.sectionTitle}>Đã hốt hụi</Typography>
          <Summary summary={receivedData} />
        </>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: fontSize.sm,
    fontWeight: 600,
    color: palette.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
