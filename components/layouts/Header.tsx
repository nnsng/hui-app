import { colors } from '@/constants/colors';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

type HeaderProps = {
  style?: ViewStyle;
};

export function Header({ style }: HeaderProps) {
  return (
    <View style={[styles.header, style]}>
      <Text style={styles.title}>Hụi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    letterSpacing: 0.5,
  },
});
