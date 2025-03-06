import { colors } from '@/constants/colors';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

type HeaderProps = {
  style?: ViewStyle;
};

export default function Header({ style }: HeaderProps) {
  return (
    <View style={[styles.header, style]}>
      <Text style={styles.headerText}>Hụi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
});
