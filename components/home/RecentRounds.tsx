import { Button, Typography } from '@/components/common';
import { palette } from '@/constants/palette';
import { fontSize } from '@/constants/typography';
import { useRoundsQuery } from '@/hooks/queries';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { RoundItem } from './RoundItem';

export function RecentRounds() {
  const router = useRouter();

  const { data: rounds = [] } = useRoundsQuery();

  const [listHeight, setListHeight] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);

  const visible = useMemo(() => {
    if (itemHeight === 0) return rounds;
    const maxItems = Math.floor(listHeight / itemHeight);
    return rounds.slice(0, maxItems);
  }, [rounds, listHeight, itemHeight]);

  const handleListLayout = (e: LayoutChangeEvent) => {
    setListHeight(e.nativeEvent.layout.height);
  };

  const handleItemLayout = (e: LayoutChangeEvent) => {
    setItemHeight(e.nativeEvent.layout.height);
  };

  return (
    <View style={styles.roundSection}>
      <View style={styles.roundHeader}>
        <Typography style={styles.roundTitle}>Kỳ hụi gần đây</Typography>

        {visible.length < rounds.length && (
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

      <View style={styles.roundList} onLayout={handleListLayout}>
        {visible.map((item, index) => (
          <View key={item.id} onLayout={index === 0 ? handleItemLayout : undefined}>
            <RoundItem item={item} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  roundSection: {
    flex: 1,
  },
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
    flex: 1,
  },
});
