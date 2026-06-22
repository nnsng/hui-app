import { Typography } from '@/components/common';
import { palette } from '@/constants/palette';
import { fontSize } from '@/constants/typography';
import { useActiveCycleQuery } from '@/hooks/queries';
import type { Round, RoundStatus } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { renderDate } from '@/utils/date';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

type RoundItemProps = {
  item: Round;
};

type ItemData = {
  name: string;
  amount: string;
  fg: string;
  bg: string;
};

export function RoundItem({ item }: RoundItemProps) {
  const router = useRouter();

  const { data: cycle } = useActiveCycleQuery();
  const { receivedAmount = 0 } = cycle!;

  const DATA: Record<RoundStatus, ItemData> = {
    normal: {
      name: 'Đóng hụi',
      amount: `-${formatCurrency(item.paymentAmount)}`,
      fg: palette.primary,
      bg: palette.surface,
    },
    received: {
      name: 'Hốt hụi',
      amount: `+${formatCurrency(receivedAmount)}`,
      fg: palette.primary,
      bg: palette.secondary,
    },
    dead: {
      name: 'Đóng hụi chết',
      amount: `-${formatCurrency(item.paymentAmount)}`,
      fg: palette.primary,
      bg: palette.surface,
    },
  };
  const data = DATA[item.status];

  return (
    <Pressable
      style={({ pressed }) => [styles.roundItem, pressed && styles.pressed]}
      onPress={() => router.push({ pathname: '/(modals)/round', params: { id: item.id } })}
    >
      <View style={[styles.avatar, { backgroundColor: data.bg }]}>
        <Typography style={[styles.avatarText, { color: data.fg }]}>{item.roundNumber}</Typography>
      </View>

      <View style={styles.roundInfo}>
        <Typography style={styles.roundName}>{data.name}</Typography>
        <Typography style={styles.roundDate}>{renderDate(item.date)}</Typography>
      </View>

      <View style={styles.roundAmountBlock}>
        <Typography style={[styles.roundAmount]}>{data.amount}</Typography>
        <Typography style={styles.roundType}>{formatCurrency(item.bidAmount)}</Typography>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  roundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: fontSize.sm,
    fontWeight: 600,
  },
  roundInfo: {
    flex: 1,
  },
  roundName: {
    fontSize: fontSize.base,
    fontWeight: 500,
    color: palette.textPrimary,
  },
  roundDate: {
    fontSize: fontSize.xs,
    color: palette.textPrimary,
    marginTop: 2,
  },
  roundAmountBlock: {
    alignItems: 'flex-end',
  },
  roundAmount: {
    fontSize: fontSize.base,
    fontWeight: 600,
  },
  roundType: {
    fontSize: fontSize.xs,
    color: palette.textPrimary,
    marginTop: 2,
  },
});
