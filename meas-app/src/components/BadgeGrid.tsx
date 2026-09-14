import { StyleSheet, Text, View } from 'react-native';

import type { Badge } from '../data/types';
import { borders, colors } from '../theme/colors';
import { display, fonts, leading } from '../theme/typography';

/**
 * The `badge(glyph, label, earned, hot)` helper from the design, as a lookup:
 *
 *   earned + featured — filled red
 *   earned           — raised steel tile
 *   unearned         — sunken tile with a dimmed glyph and label
 */
function badgeTone(badge: Badge) {
  if (!badge.earned) {
    return {
      bg: colors.surfaceSunken,
      border: borders.faintest,
      fg: colors.surfaceInactive,
      label: colors.mutedDim,
    };
  }
  if (badge.featured) {
    return { bg: colors.red, border: colors.red, fg: colors.white, label: colors.steel };
  }
  return { bg: colors.surfaceRaised, border: borders.stronger, fg: colors.steel, label: colors.steel };
}

/** Splits a list into fixed-size rows, so the grid keeps exact 10pt gutters. */
function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

/**
 * `display:grid;grid-template-columns:repeat(4,1fr);gap:10px`
 *
 * React Native has no grid, so the badges are laid out as rows of four flexed
 * cells — identical geometry, and short final rows keep their column width.
 */
export function BadgeGrid({ badges, columns = 4, gap = 10 }: { badges: Badge[]; columns?: number; gap?: number }) {
  return (
    <View style={{ gap }}>
      {chunk(badges, columns).map((row, rowIndex) => (
        <View key={rowIndex} style={[styles.row, { gap }]}>
          {row.map((badge) => {
            const tone = badgeTone(badge);
            return (
              <View key={`${badge.glyph}-${badge.label}`} style={styles.cell}>
                <View style={[styles.tile, { backgroundColor: tone.bg, borderColor: tone.border }]}>
                  <Text style={[styles.glyph, { color: tone.fg }]}>{badge.glyph}</Text>
                </View>
                <Text style={[styles.label, { color: tone.label }]}>{badge.label}</Text>
              </View>
            );
          })}
          {/* Keeps a short final row aligned to the same column width. */}
          {row.length < columns
            ? Array.from({ length: columns - row.length }, (_, i) => (
                <View key={`filler-${i}`} style={styles.cell} />
              ))
            : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  cell: { flex: 1, alignItems: 'center', gap: 6 },
  tile: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: { ...display(22) },
  label: {
    fontFamily: fonts.body400,
    fontSize: 11,
    lineHeight: leading(1.2, 11),
    textAlign: 'center',
  },
});
