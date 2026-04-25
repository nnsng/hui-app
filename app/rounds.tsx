import { Button, Typography } from '@/components/common';
import { RoundItem } from '@/components/home';
import { palette } from '@/constants/palette';
import { fontSize } from '@/constants/typography';
import { useRoundsQuery } from '@/hooks/queries';
import type { Round } from '@/types';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoundsScreen() {
  const router = useRouter();

  const { data: rounds = [] } = useRoundsQuery();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <Button
          variant="soft"
          size="xs"
          icon="chevron-back"
          iconSize={22}
          iconColor={palette.primary}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
        />

        <Typography style={styles.title}>Tất cả kỳ hụi</Typography>

        <View style={styles.headerSpacer} />
      </View>

      <FlatList<Round>
        data={rounds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RoundItem item={item} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 8,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: 600,
    color: palette.textPrimary,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  separator: {
    height: 1,
    backgroundColor: palette.surface,
  },
});
