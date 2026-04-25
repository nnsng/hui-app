import { Button, Typography } from '@/components/common';
import { palette } from '@/constants/palette';
import { fontSize } from '@/constants/typography';
import { useRoundsQuery } from '@/hooks/queries';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { RoundItem } from './RoundItem';

type RecentRoundsProps = {
  maxItems: number;
};

export function RecentRounds({ maxItems }: RecentRoundsProps) {
  const router = useRouter();

  const { data: rounds = [] } = useRoundsQuery();
  const visible = rounds.slice(0, maxItems);

  return (
    <View style={styles.roundSection}>
      <View style={styles.roundHeader}>
        <Typography style={styles.roundTitle}>Kỳ hụi gần đây</Typography>

        {maxItems < rounds.length && (
          <Button
            variant="ghost"
            label="Xem tất cả"
            icon="chevron-forward"
            iconSize={14}
            iconColor={palette.primary}
            onPress={() => router.push('/rounds')}
          />
        )}
      </View>

      <View style={styles.roundList}>
        {visible.map((item) => (
          <RoundItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  roundSection: {},
  roundHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roundTitle: {
    fontSize: fontSize.base,
    fontWeight: 600,
    color: palette.textPrimary,
  },
  roundList: {
    paddingTop: 12,
    gap: 12,
  },
});
