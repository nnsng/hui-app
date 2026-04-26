import { PixelRatio } from 'react-native';

const BASE_REM = 14;

/**
 * Convert a rem value to device-independent pixels (1rem = 16px).
 *
 * Note: we intentionally do NOT multiply by `PixelRatio.getFontScale()` here.
 * React Native's <Text> already scales by the user's OS font size when
 * `allowFontScaling` is true (the default), so doing it here would
 * double-apply the scale.
 */
export function rem(value: number): number {
  return PixelRatio.roundToNearestPixel(value * BASE_REM);
}

export const fontSize = {
  xs: rem(0.75),
  sm: rem(0.875),
  base: rem(1),
  lg: rem(1.125),
  xl: rem(1.375),
  xxl: rem(1.5),
  xxxl: rem(1.75),
  xxxxl: rem(2.125),
};

/**
 * Montserrat is loaded as one font file per weight; React Native's
 * `fontWeight` prop does NOT pick the right variant automatically with custom
 * fonts. The render-time patch in `app/_layout.tsx` maps `fontWeight` to the
 * matching token below so existing styles (`fontWeight: 600`, `700`, etc.)
 * keep working without per-component changes.
 */
export const fontFamily = {
  regular: 'Montserrat_400Regular',
  medium: 'Montserrat_500Medium',
  semibold: 'Montserrat_600SemiBold',
  bold: 'Montserrat_700Bold',
};

export function getFontFamilyForWeight(weight: string | number | undefined): string {
  const w = String(weight ?? '400');
  if (w === '700' || w === '800' || w === '900' || w === 'bold') return fontFamily.bold;
  if (w === '600') return fontFamily.semibold;
  if (w === '500') return fontFamily.medium;
  return fontFamily.regular;
}
