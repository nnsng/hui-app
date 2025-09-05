import { colors } from '@/constants/colors';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  inputRef?: React.Ref<TextInput>;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Input(props: InputProps) {
  const { label, error, inputRef, containerStyle, style, ...inputProps } = props;

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          inputProps.editable === false ? styles.inputDisabled : {},
          error ? styles.inputError : {},
          style,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...inputProps}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: 'white',
    color: colors.text,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    borderColor: colors.border,
    color: '#aaa',
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
  },
});
