import { colors } from '@/constants/colors';
import React, { type PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

type ButtonProps = PropsWithChildren<{
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  loading?: boolean;
}>;

export default function Button(props: ButtonProps) {
  const { children, onPress, style, textStyle, variant = 'contained', disabled, loading } = props;

  const disabledState = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={variant === 'text' ? 0.7 : 0.85}
      disabled={disabledState}
      style={[
        styles.button,
        variant === 'outlined' && styles.outlinedButton,
        variant === 'text' && styles.textButton,
        disabledState && styles.disabled,
        style,
      ]}
      onPress={disabledState ? undefined : onPress}
    >
      {loading && <ActivityIndicator color={colors.textDisabled} size={16} />}
      <Text
        style={[
          styles.text,
          variant === 'outlined' && styles.outlinedText,
          variant === 'text' && styles.textVariant,
          disabledState && styles.disabledText,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: '#d1d5db',
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  outlinedText: {
    color: colors.primary,
  },
  textVariant: {
    color: colors.primary,
  },
  disabledText: {
    color: colors.textDisabled,
  },
});
