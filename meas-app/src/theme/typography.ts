import { Platform, type TextStyle } from 'react-native';

/**
 * The design uses two families:
 *   'Big Shoulders Display' 700/800/900 — every numeral, heading and CTA label
 *   'Barlow' 400/500/600/700            — body copy, labels, list rows
 */
export const fonts = {
  display700: 'BigShouldersDisplay_700Bold',
  display800: 'BigShouldersDisplay_800ExtraBold',
  display900: 'BigShouldersDisplay_900Black',
  body400: 'Barlow_400Regular',
  body500: 'Barlow_500Medium',
  body600: 'Barlow_600SemiBold',
  body700: 'Barlow_700Bold',
} as const;

/**
 * CSS `letter-spacing` is authored in `em`; React Native wants points.
 * Every call site passes the design's em value and its own font size so the
 * conversion stays visible next to the number it came from.
 */
export const tracking = (em: number, fontSize: number): number =>
  Math.round(em * fontSize * 100) / 100;

/**
 * CSS `line-height` in the design is a unitless multiplier.
 * React Native wants an absolute value.
 */
export const leading = (multiplier: number, fontSize: number): number =>
  Math.round(multiplier * fontSize * 100) / 100;

/**
 * Big Shoulders Display is a condensed face set on very tight leading
 * (`line-height:.92` … `1`). Android adds extra font padding that breaks those
 * stacked headlines, so it is switched off wherever the display face is used.
 */
const noExtraPadding: TextStyle = Platform.select({
  android: { includeFontPadding: false },
  default: {},
}) as TextStyle;

/** `font-family:'Big Shoulders Display';font-weight:900` */
export const display = (fontSize: number, opts?: { tracking?: number; lineHeight?: number }): TextStyle => ({
  fontFamily: fonts.display900,
  fontSize,
  lineHeight: opts?.lineHeight ?? fontSize,
  letterSpacing: opts?.tracking,
  ...noExtraPadding,
});

/** `font-family:'Big Shoulders Display';font-weight:800` */
export const displayBold = (fontSize: number, opts?: { tracking?: number; lineHeight?: number }): TextStyle => ({
  fontFamily: fonts.display800,
  fontSize,
  lineHeight: opts?.lineHeight ?? fontSize,
  letterSpacing: opts?.tracking,
  ...noExtraPadding,
});

/**
 * The section headings repeated across screens:
 * `font-weight:800;font-size:22px;letter-spacing:.04em`
 */
export const sectionHeading: TextStyle = {
  ...displayBold(22, { tracking: tracking(0.04, 22), lineHeight: leading(1.1, 22) }),
};

/**
 * The all-caps micro-labels: `font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:700`
 */
export const eyebrow: TextStyle = {
  fontFamily: fonts.body700,
  fontSize: 12,
  letterSpacing: tracking(0.14, 12),
  textTransform: 'uppercase',
};

/** `font-size:11px;letter-spacing:.1em;text-transform:uppercase` stat captions. */
export const statCaption: TextStyle = {
  fontFamily: fonts.body400,
  fontSize: 11,
  letterSpacing: tracking(0.1, 11),
  textTransform: 'uppercase',
};

/**
 * Big Shoulders Display is condensed: a character advances about 0.72x the font
 * size for a typical gamertag (measured across RYN, KAZUYA_MO, OMAR.GG,
 * NOURA_X). Narrow glyphs run to 0.39x and a solid run of Ws reaches 1.0x, so
 * this is a working average, not a bound.
 */
const DISPLAY_ADVANCE = 0.72;

/**
 * Largest size at or below `maxSize` at which `text` still fits `maxWidth` in
 * the display face.
 *
 * Pair it with `numberOfLines={1}` and `adjustsFontSizeToFit`: this keeps the
 * text inside its box everywhere (including react-native-web, which ignores
 * `adjustsFontSizeToFit`), and the native shrink-to-fit trims the remainder
 * exactly for unusually wide or narrow strings.
 */
export const fitDisplaySize = (text: string, maxWidth: number, maxSize: number): number => {
  if (!text.length) return maxSize;
  return Math.min(maxSize, Math.floor(maxWidth / (text.length * DISPLAY_ADVANCE)));
};
