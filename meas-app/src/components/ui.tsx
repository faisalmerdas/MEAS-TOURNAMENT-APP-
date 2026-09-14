import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type DimensionValue,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import type { GameCode } from '../data/types';
import { ANGLE_135, Gradient } from './Gradient';
import { borders, colors, fills } from '../theme/colors';
import { displayBold, eyebrow, fonts, leading, sectionHeading, tracking } from '../theme/typography';

/* ── Text ───────────────────────────────────────────────────────────── */

/** `font-family:'Big Shoulders Display';font-weight:800;font-size:22px;letter-spacing:.04em` */
export function SectionHeading({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[sectionHeading, styles.text, style]}>{children}</Text>;
}

/** The uppercase 12px micro-label used above most cards. */
export function Eyebrow({
  children,
  color = colors.muted,
  style,
}: {
  children: ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={[eyebrow, { color }, style]}>{children}</Text>;
}

/** `font-size:13px;color:#9A9AA3` — the trailing link on a section header row. */
export function SectionAction({ children, onPress }: { children: ReactNode; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <Text style={styles.sectionAction}>{children}</Text>
    </Pressable>
  );
}

/** A section heading with a right-aligned caption or link on the same baseline. */
export function SectionHeader({
  title,
  action,
  onActionPress,
  align = 'baseline',
  style,
}: {
  title: string;
  action?: string;
  onActionPress?: () => void;
  align?: 'baseline' | 'flex-end' | 'center';
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.sectionHeader, { alignItems: align }, style]}>
      <SectionHeading>{title}</SectionHeading>
      {action ? <SectionAction onPress={onActionPress}>{action}</SectionAction> : null}
    </View>
  );
}

/* ── Containers ─────────────────────────────────────────────────────── */

/**
 * `border-radius:14px;background:#141416;border:1px solid rgba(255,255,255,.08)`
 * — the default card, used on nearly every screen.
 */
export function Card({
  children,
  style,
  onPress,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}) {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.card, style, pressed && styles.pressed]}>
        {children}
      </Pressable>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

/** A row of `flex:1` cards with 10pt gaps — the tournament stat strip. */
export function Row({
  children,
  gap = 10,
  style,
}: {
  children: ReactNode;
  gap?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[{ flexDirection: 'row', gap }, style]}>{children}</View>;
}

/* ── Chips and pills ────────────────────────────────────────────────── */

/**
 * `height:34px;padding:0 14px;border-radius:9px` filter pills
 * (rankings tabs, challenge filters).
 */
export function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.filterChip,
        { backgroundColor: active ? colors.text : colors.surface },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.filterChipLabel, { color: active ? colors.bg : colors.muted }]}>{label}</Text>
    </Pressable>
  );
}

/** `height:34px;padding:0 12px;border-radius:9px;background:rgba(255,255,255,.08)` */
export function GlassChip({ label, dashed }: { label: string; dashed?: boolean }) {
  return (
    <View style={[styles.glassChip, dashed ? styles.glassChipDashed : styles.glassChipFilled]}>
      <Text style={[styles.glassChipLabel, dashed && { color: colors.muted, fontFamily: fonts.body400 }]}>
        {label}
      </Text>
    </View>
  );
}

/* ── Game tiles ─────────────────────────────────────────────────────── */

/** Tile fill and glyph colour per game, from `tournamentGames` / `ratings`. */
export const GAME_TILE: Record<GameCode, { bg: string; fg: string }> = {
  T8: { bg: colors.red, fg: colors.white },
  PT: { bg: colors.gold, fg: colors.black },
  OP: { bg: colors.gameBlue, fg: colors.white },
  FC: { bg: colors.gameGreen, fg: colors.white },
  SU: { bg: colors.steel, fg: colors.black },
};

/** The rounded square carrying a game's two-letter code. */
export function GameTile({
  code,
  size,
  radius,
  fontSize,
}: {
  code: GameCode;
  size: number;
  radius: number;
  fontSize: number;
}) {
  const tile = GAME_TILE[code];
  return (
    <View
      style={[styles.center, { width: size, height: size, borderRadius: radius, backgroundColor: tile.bg }]}
    >
      <Text style={[displayBold(fontSize), { color: tile.fg, fontFamily: fonts.display900 }]}>{code}</Text>
    </View>
  );
}

/* ── Avatars ────────────────────────────────────────────────────────── */

/**
 * Every avatar in the design is a placeholder: a `linear-gradient(135deg,…)`
 * circle with a coloured ring. The design alternates two gradients — the
 * brighter `#3A3A42 → #1C1C20` for the player, `#2A2A30 → #141416` for everyone
 * else — which `emphasis` selects between.
 *
 * Replace the gradient with the player's avatar image when one is available.
 */
export function Avatar({
  size,
  ringColor = borders.medium,
  ringWidth = 1,
  emphasis = false,
  radius,
  style,
}: {
  size: number;
  ringColor?: string;
  ringWidth?: number;
  emphasis?: boolean;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const fill: readonly [string, string] = emphasis ? ['#3A3A42', '#1C1C20'] : ['#2A2A30', '#141416'];
  return (
    <Gradient
      colors={fill}
      angle={ANGLE_135}
      style={[
        {
          width: size,
          height: size,
          borderRadius: radius ?? size / 2,
          borderWidth: ringWidth,
          borderColor: ringColor,
        },
        style,
      ]}
    />
  );
}

/* ── Progress ───────────────────────────────────────────────────────── */

/** `height:6px;border-radius:3px;background:rgba(255,255,255,.08)` with a fill. */
export function ProgressBar({
  fraction,
  color = colors.red,
  height = 6,
  style,
}: {
  fraction: number;
  color?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const clamped = Math.max(0, Math.min(1, fraction));
  return (
    <View style={[{ height, borderRadius: height / 2, backgroundColor: fills.track }, style]}>
      <View
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          borderRadius: height / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

/** The thin vertical tick marking a cut line on a progress bar. */
export function CutLineMarker({
  left,
  color = colors.steel,
  height = 14,
  top = -4,
}: {
  left: DimensionValue;
  color?: string;
  height?: number;
  top?: number;
}) {
  return <View style={{ position: 'absolute', left, top, width: 2, height, backgroundColor: color }} />;
}

/* ── Movement arrows ────────────────────────────────────────────────── */

/** `▲ 3` green, `▼ 2` red, `—` muted — the rankings delta column. */
export function Movement({ value }: { value: number }) {
  if (value === 0) return <Text style={styles.movementFlat}>—</Text>;
  const rising = value > 0;
  return (
    <Text style={[styles.movement, { color: rising ? colors.green : colors.red }]}>
      {rising ? '▲' : '▼'} {Math.abs(value)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: { color: colors.text },
  center: { alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.7 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  sectionAction: { fontFamily: fonts.body400, fontSize: 13, color: colors.muted },

  card: {
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: borders.hairline,
  },

  filterChip: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipLabel: { fontFamily: fonts.body600, fontSize: 13 },

  glassChip: {
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassChipFilled: { backgroundColor: fills.glass },
  glassChipDashed: { borderWidth: 1, borderStyle: 'dashed', borderColor: borders.boldest },
  glassChipLabel: { fontFamily: fonts.body600, fontSize: 13, color: colors.text },

  movement: { fontFamily: fonts.body400, fontSize: 12 },
  movementFlat: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted },
});

/** Re-exported so screens can keep using the conversion helpers inline. */
export { leading, tracking };
