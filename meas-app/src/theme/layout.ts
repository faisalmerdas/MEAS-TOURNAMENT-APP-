/**
 * The design is drawn inside a fixed 402 x 874 iPhone frame, so its paddings
 * bake in the status bar and home indicator. On device those come from the safe
 * area insets instead, so the baked-in values are split into an inset part and
 * a real spacing part here.
 *
 * Reference frame (`ios-frame.jsx`): status bar block is 21 + 22 + 19 = 62pt
 * tall, home indicator block is 34pt tall.
 */
export const FRAME = {
  width: 402,
  height: 874,
  /** Status bar height baked into the design's top paddings. */
  statusBar: 62,
  /** Home indicator height baked into the design's bottom paddings. */
  homeIndicator: 34,
} as const;

/**
 * Most screens use `padding:70px 20px 20px`. 70 - 62 = 8pt of real space
 * between the status bar and the first row of content.
 */
export const SCREEN = {
  paddingHorizontal: 20,
  /** Added on top of the safe-area top inset. */
  paddingTop: 8,
  /** Bottom padding on screens that end in a tab bar. */
  paddingBottom: 20,
  /** Bottom padding on pushed screens with no tab bar (`padding:70px 20px 40px`). */
  paddingBottomStandalone: 40,
} as const;

/**
 * Onboarding uses `padding:76px 24px 44px`. 76 - 62 = 14pt top,
 * 44 - 34 = 10pt bottom.
 */
export const ONBOARDING = {
  paddingHorizontal: 24,
  paddingTop: 14,
  paddingBottom: 10,
} as const;

/**
 * Tab bar: `height:84px;padding:10px 20px 34px`.
 * 84 - 34 = 50pt of visible bar, with 10pt of top padding.
 */
export const TAB_BAR = {
  height: 50,
  paddingTop: 10,
  paddingHorizontal: 20,
  itemWidth: 64,
  iconSize: 22,
  iconRadius: 6,
} as const;

/**
 * Formats a 0..1 fraction as a CSS-style percentage React Native accepts.
 * The annotated return type keeps the template-literal type, which a plain
 * `string` would lose.
 */
export const percent = (fraction: number): `${number}%` => `${fraction * 100}%`;
