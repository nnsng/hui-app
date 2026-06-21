import { Button, Typography } from '@/components/common';
import { palette } from '@/constants/palette';
import { fontSize } from '@/constants/typography';
import { useTapUnlock } from '@/hooks/useTapUnlock';
import { renderDate } from '@/utils/date';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { StyleSheet, ToastAndroid, View } from 'react-native';

const appName = Constants.expoConfig?.name!;

export function Header() {
  const router = useRouter();

  const onShowVersion = useTapUnlock(() => {
    const version = Constants.expoConfig?.version ?? 'unknown';
    ToastAndroid.show(`${version}`, ToastAndroid.SHORT);
  });

  return (
    <View style={styles.header}>
      <View>
        <Typography style={styles.greeting} onPress={onShowVersion}>
          {appName}
        </Typography>
        <Typography style={styles.subGreeting}>{renderDate(new Date().toISOString())}</Typography>
      </View>

      <Button
        variant="soft"
        size="xs"
        icon="information"
        iconSize={22}
        iconColor={palette.primary}
        onPress={() => router.push('/info')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 8,
  },
  greeting: {
    fontSize: fontSize.xl,
    fontWeight: 600,
    color: palette.textPrimary,
  },
  subGreeting: {
    fontSize: fontSize.sm,
    color: palette.textPrimary,
    marginTop: 2,
  },
});
