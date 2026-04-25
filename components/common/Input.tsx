import { getFontFamilyForWeight } from '@/constants/typography';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  ref?: React.RefObject<TextInput | null>;
};

export function Input({ style, ref, ...props }: InputProps) {
  const { fontWeight, ...rest } = StyleSheet.flatten([style]);
  const fontFamily = getFontFamilyForWeight(fontWeight);
  return <TextInput style={[rest, { fontFamily }]} {...props} />;
}
