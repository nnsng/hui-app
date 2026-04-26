import { Input, Typography } from '@/components/common';
import { palette } from '@/constants/palette';
import { fontSize } from '@/constants/typography';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type ModalAmountInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus: boolean;
};

export function ModalAmountInput(props: ModalAmountInputProps) {
  const { label, value, onChange, autoFocus } = props;

  const [error, setError] = useState(false);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      onChange('');
      inputRef.current.focus();
    }
  }, [autoFocus, onChange]);

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    onChange(cleaned);
    setError(text !== cleaned);
  };

  return (
    <View style={styles.amountBlock}>
      <Typography style={styles.amountLabel}>{label}</Typography>
      <View style={styles.amountRow}>
        <Input
          ref={inputRef}
          value={value}
          onChangeText={handleChange}
          placeholder="0"
          placeholderTextColor={palette.textSecondary}
          keyboardType="numeric"
          style={styles.amountInput}
        />
        <Typography style={styles.currency}>₫</Typography>
      </View>
      {error && <Typography style={styles.errorText}>Số tiền không hợp lệ</Typography>}
    </View>
  );
}

const styles = StyleSheet.create({
  amountBlock: {
    backgroundColor: palette.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: fontSize.xs,
    color: palette.textPrimary,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  amountInput: {
    flex: 1,
    fontSize: fontSize.xxxl,
    fontWeight: 600,
    color: palette.textPrimary,
    padding: 0,
    fontVariant: ['tabular-nums'],
  },
  currency: {
    fontSize: fontSize.xxl,
    fontWeight: 600,
    color: palette.textPrimary,
  },
  errorText: {
    marginTop: 6,
    fontSize: fontSize.xs,
    color: '#dc2626',
  },
});
