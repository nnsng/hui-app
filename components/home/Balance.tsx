import { Typography } from '@/components/common';
import { palette } from '@/constants/palette';
import { fontSize } from '@/constants/typography';
import { useActiveCycleQuery, useRoundsQuery } from '@/hooks/queries';
import { formatCurrency } from '@/utils/currency';
import { renderDate } from '@/utils/date';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

export function Balance() {
  const { data: rounds = [] } = useRoundsQuery();
  const { data: cycle } = useActiveCycleQuery();
  const { startDate, receivedDate = '', receivedAmount = 0, netProfit = 0, isReceived } = cycle!;

  const balanceData = useMemo(() => {
    const totalBidAmount = rounds.reduce((sum, round) => sum + round.bidAmount, 0);
    const totalPaymentAmount = rounds.reduce((sum, round) => sum + round.paymentAmount, 0);

    return {
      top: {
        label: `Tiền lời (${rounds.length} kỳ)`,
        value: formatCurrency(totalBidAmount),
      },
      left: {
        label: 'Ngày bắt đầu',
        value: renderDate(startDate),
      },
      right: {
        label: 'Đã đóng',
        value: formatCurrency(totalPaymentAmount),
      },
    };
  }, [startDate, rounds]);

  const receivedData = {
    top: {
      label: 'Tiền hốt hụi',
      value: formatCurrency(receivedAmount),
    },
    left: {
      label: 'Ngày hốt hụi',
      value: renderDate(receivedDate),
    },
    right: {
      label: 'Chênh lệch',
      value: formatCurrency(netProfit),
    },
  };

  const data = isReceived ? receivedData : balanceData;

  return (
    <View style={styles.balanceBlock}>
      <View>
        <Typography style={styles.balanceLabel}>{data.top.label}</Typography>
        <View style={styles.balanceRow}>
          <Typography style={styles.balanceValue}>{data.top.value}</Typography>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Typography style={styles.footerLabel}>{data.left.label}</Typography>
          <Typography style={styles.footerValue}>{data.left.value}</Typography>
        </View>

        <View style={[styles.footerItem, styles.footerItemRight]}>
          <Typography style={styles.footerLabel}>{data.right.label}</Typography>
          <Typography style={styles.footerValue}>{data.right.value}</Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceBlock: {
    backgroundColor: palette.surface,
    padding: 16,
    borderRadius: 12,
  },
  balanceLabel: {
    fontSize: fontSize.sm,
    color: palette.primary,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
  },
  balanceValue: {
    fontSize: fontSize.xxxxl,
    fontWeight: 600,
    color: palette.primary,
    letterSpacing: -0.5,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  footerItem: {
    flex: 1,
  },
  footerItemRight: {
    alignItems: 'flex-end',
  },
  footerLabel: {
    fontSize: fontSize.xs,
    color: palette.primary,
  },
  footerValue: {
    marginTop: 4,
    fontSize: fontSize.base,
    fontWeight: 600,
    color: palette.primary,
    fontVariant: ['tabular-nums'],
  },
});
