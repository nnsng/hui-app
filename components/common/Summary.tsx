import { palette } from '@/constants/palette';
import { fontSize } from '@/constants/typography';
import { StyleSheet, View } from 'react-native';
import { Typography } from './Typography';

export type SummaryItem = {
  label: string;
  value: string | number;
  enabled?: boolean;
};

type SummaryProps = {
  summary: SummaryItem[];
};

export function Summary({ summary }: SummaryProps) {
  if (summary.length === 0) return null;

  const filtered = summary.filter((item) => item.enabled !== false);

  return (
    <View style={styles.summary}>
      {filtered.map((item, index, array) => {
        const isLast = index === array.length - 1;
        return (
          <View key={item.label} style={[styles.summaryRow, !isLast && styles.summaryRowDivider]}>
            <Typography style={styles.summaryLabel}>{item.label}</Typography>
            <Typography style={styles.summaryValue}>{item.value}</Typography>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  summaryRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: palette.divider,
  },
  summaryLabel: {
    fontSize: fontSize.sm,
    color: palette.textPrimary,
  },
  summaryValue: {
    fontSize: fontSize.base,
    fontWeight: 500,
    color: palette.primary,
    fontVariant: ['tabular-nums'],
  },
});
