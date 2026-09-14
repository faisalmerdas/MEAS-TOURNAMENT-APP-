import { useId } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, Path, Pattern, RadialGradient, Rect, Stop } from 'react-native-svg';

/**
 * The disclosure caret on the region field. The design uses the glyph `⌵`
 * (U+2335), which is missing from most system and webfont families, so it is
 * drawn rather than typed.
 */
export function Chevron({ size = 12, color, direction = 'down' }: { size?: number; color: string; direction?: 'down' | 'left' }) {
  const rotation = direction === 'left' ? '90' : '0';
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12">
      <Path
        d="M2 4.5 L6 8.5 L10 4.5"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        origin="6, 6"
        rotation={rotation}
      />
    </Svg>
  );
}

/**
 * `repeating-linear-gradient(135deg, rgba(255,255,255,.03) 0 2px, transparent 2px 18px)`
 *
 * A 135° axis puts the stripes at 45°, running bottom-left to top-right. The
 * SVG pattern draws a 2pt vertical bar on an 18pt tile and rotates the tile.
 */
export function DiagonalHatch({
  color = 'rgba(255,255,255,0.03)',
  period = 18,
  thickness = 2,
  style,
}: {
  color?: string;
  period?: number;
  thickness?: number;
  style?: StyleProp<ViewStyle>;
}) {
  // SVG ids share one document-wide namespace on web, so two hatches with
  // different periods would otherwise both paint with whichever mounted first.
  const id = `hatch-${useId()}`;
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, style]}>
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern
            id={id}
            patternUnits="userSpaceOnUse"
            width={period}
            height={period}
            patternTransform="rotate(45)"
          >
            <Rect x={0} y={0} width={thickness} height={period} fill={color} />
          </Pattern>
        </Defs>
        <Rect x={0} y={0} width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

/**
 * `radial-gradient(circle, rgba(224,32,42,.35), transparent 70%)`
 *
 * React Native has no radial gradient, so this draws one as SVG. The caller
 * positions it — the design places a 220pt circle bleeding off the bottom-right
 * corner of the passport card.
 */
export function RadialGlow({
  size,
  color,
  opacity = 0.35,
  /** Stop at which the glow reaches full transparency, as a fraction. */
  falloff = 0.7,
  style,
}: {
  size: number;
  color: string;
  opacity?: number;
  falloff?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const id = `glow-${useId()}`;
  return (
    <View pointerEvents="none" style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id={id} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={color} stopOpacity={opacity} />
            <Stop offset={String(falloff)} stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={size} height={size} fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}
