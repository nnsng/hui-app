import { colors } from '@/constants/colors';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export default function Input(props: InputProps) {
  const { label, error, style, ...inputProps } = props;

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          inputProps.editable === false ? styles.inputDisabled : {},
          error ? styles.inputError : {},
          style,
        ]}
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
  },
  inputError: {
    borderColor: colors.danger,
  },
});
