import { appName } from '@/constants/app';
import { colors } from '@/constants/colors';
import { StyleSheet, Text, View } from 'react-native';

export function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{appName}</Text>
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
