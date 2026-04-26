import { getFontFamilyForWeight } from '@/constants/typography';
import { StyleSheet, Text, type TextProps } from 'react-native';

export function Typography({ style, ...props }: TextProps) {
  const { fontWeight, ...rest } = StyleSheet.flatten([style]);
  const fontFamily = getFontFamilyForWeight(fontWeight);
  return <Text style={[rest, { fontFamily }]} {...props} />;
}
