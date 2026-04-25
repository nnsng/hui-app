import { palette } from '@/constants/palette';
import { fontSize } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Typography } from './Typography';

type IconProps = ComponentProps<typeof Ionicons>;

type ButtonVariant = 'primary' | 'secondary' | 'soft' | 'ghost';
type ButtonSize = 'xs' | 'sm' | 'md';

type ButtonProps = {
  label?: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconProps['name'];
  iconSize?: number;
  iconColor?: string;
  iconStyle?: IconProps['style'];
  iconWrapper?: (props: PropsWithChildren) => ReactNode;
  iconOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

type VariantTheme = {
  bg: string;
  fg: string;
  disabledBg: string;
  disabledFg: string;
};

const VARIANT_THEMES: Record<ButtonVariant, VariantTheme> = {
  primary: {
    bg: palette.primary,
    fg: palette.secondary,
    disabledBg: palette.divider,
    disabledFg: palette.textSecondary,
  },
  secondary: {
    bg: palette.secondary,
    fg: palette.primary,
    disabledBg: palette.surface,
    disabledFg: palette.textSecondary,
  },
  soft: {
    bg: palette.surface,
    fg: palette.primary,
    disabledBg: palette.surface,
    disabledFg: palette.textSecondary,
  },
  ghost: {
    bg: 'transparent',
    fg: palette.primary,
    disabledBg: 'transparent',
    disabledFg: palette.textSecondary,
  },
};

const SIZE_HEIGHTS: Record<ButtonSize, number> = {
  xs: 40,
  sm: 46,
  md: 52,
};

export function Button(props: ButtonProps) {
  const {
    label,
    onPress,
    variant = 'primary',
    size = 'md',
    icon,
    iconSize,
    iconColor,
    iconStyle,
    iconWrapper: IconWrapper = ({ children }) => children,
    disabled,
    loading,
    fullWidth,
    style,
  } = props;

  const theme = VARIANT_THEMES[variant];
  const height = SIZE_HEIGHTS[size];
  const isIconOnly = !label && !!icon;
  const isPressDisabled = disabled || loading;
  const isGhost = variant === 'ghost';

  const fg = isPressDisabled ? theme.disabledFg : theme.fg;
  const bg = isPressDisabled ? theme.disabledBg : theme.bg;

  const containerStyle: StyleProp<ViewStyle> = isGhost
    ? [styles.ghost, style]
    : [
        styles.base,
        {
          height,
          borderRadius: height / 2,
          backgroundColor: bg,
          paddingHorizontal: isIconOnly ? 0 : 20,
          width: isIconOnly ? height : undefined,
          alignSelf: fullWidth ? 'stretch' : undefined,
        },
        style,
      ];

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={fg} />;
    }
    const iconElement = (
      <IconWrapper>
        <Ionicons
          name={icon}
          size={iconSize}
          color={isPressDisabled ? theme.disabledFg : iconColor}
          style={iconStyle}
        />
      </IconWrapper>
    );

    if (isIconOnly) return iconElement;
    return (
      <>
        {label && (
          <Typography style={[isGhost ? styles.ghostLabel : styles.label, { color: fg }]}>
            {label}
          </Typography>
        )}
        {iconElement}
      </>
    );
  };

  return (
    <Pressable
      disabled={isPressDisabled}
      onPress={onPress}
      hitSlop={isGhost ? 10 : undefined}
      style={({ pressed }) => [containerStyle, pressed && !isPressDisabled && styles.pressed]}
    >
      {renderContent()}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ghost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: fontSize.base,
    fontWeight: 600,
  },
  ghostLabel: {
    fontSize: fontSize.sm,
    fontWeight: 600,
  },
  pressed: {
    opacity: 0.85,
  },
});
