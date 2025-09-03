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
  if (data.length === 0) return null;

  return (
    <View style={[styles.list, style]}>
      {data
        .filter((item) => item.enabled !== false)
        .map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.text,
  },
  value: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
