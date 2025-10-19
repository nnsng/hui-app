import { appName } from '@/constants/app';
import { colors } from '@/constants/colors';
import { useTapUnlock } from '@/hooks/useTapUnlock';
import Constants from 'expo-constants';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';

export function Header() {
  const onShowVersion = useTapUnlock(() => {
    const version = Constants.expoConfig?.version ?? 'unknown';
    ToastAndroid.show(`${version}`, ToastAndroid.SHORT);
  });

  return (
    <View style={styles.header}>
      <Text style={styles.title} onPress={onShowVersion}>
        {appName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
