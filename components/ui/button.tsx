import { colors } from '@/constants/colors';
import React, { type PropsWithChildren } from 'react';
import {
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
}>;

export default function Button(props: ButtonProps) {
  const { children, onPress, style, textStyle, variant = 'contained', disabled } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={disabled}
      style={[
        styles.button,
        variant === 'outlined' && styles.outlinedButton,
        variant === 'text' && styles.textButton,
        disabled && styles.disabled,
        style,
      ]}
      onPress={disabled ? undefined : onPress}
    >
      <Text
        style={[
          styles.text,
          variant === 'outlined' && styles.outlinedText,
          variant === 'text' && styles.textVariant,
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
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: colors.white,
    fontSize: 14,
  },
  outlinedText: {
    color: colors.primary,
  },
  textVariant: {
    color: colors.primary,
  },
});
