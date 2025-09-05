import { colors } from '@/constants/colors';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

type ListItem = {
  label: string;
  value: string | number;
  enabled?: boolean;
};

type ListProps = {
  data: ListItem[];
  style?: StyleProp<ViewStyle>;
};

export function List({ data, style }: ListProps) {
  const filtered = data.filter((item) => item.enabled !== false);
  if (filtered.length === 0) return null;

  return (
    <View style={style}>
      {filtered.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    color: colors.text,
  },
  value: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
    includeFontPadding: false,
  },
});
