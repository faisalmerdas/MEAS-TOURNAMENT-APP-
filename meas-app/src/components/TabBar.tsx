// Expo Router 57 vendors React Navigation; the tab types come from the
// `js-tabs` entry point rather than from `@react-navigation/bottom-tabs`.
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { playerRankingRow, player } from '../data/mock';
import { borders, colors } from '../theme/colors';
import { TAB_BAR } from '../theme/layout';
import { fonts } from '../theme/typography';
import { Avatar, Movement } from './ui';

/** Route name → tab label, in the design's order. */
const TAB_LABELS: Record<string, string> = {
  home: 'Home',
  events: 'Events',
  rankings: 'Rankings',
  passport: 'Passport',
};

/**
 * `height:84px;padding:10px 20px 34px;background:#0E0E10;border-top:1px solid rgba(255,255,255,.08)`
 *
 * The icons are the design's own placeholders — 22pt rounded squares, red when
 * active and `#3A3A42` when not. Swap them for real glyphs when the icon set
 * lands; nothing else about the bar needs to change.
 */
export function MeasTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const activeRoute = state.routes[state.index]?.name;

  /**
   * On the Rankings tab the design pins the player's own row directly above the
   * bar, inside the same chrome, behind a red top border.
   */
  const showPlayerRow = activeRoute === 'rankings';

  return (
    <View
      style={[
        styles.chrome,
        {
          paddingBottom: insets.bottom,
          borderTopColor: showPlayerRow ? borders.redMedium : borders.hairline,
        },
      ]}
    >
      {showPlayerRow ? <PinnedPlayerRow /> : null}

      <View style={[styles.bar, showPlayerRow && styles.barWithPlayerRow]}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const label = TAB_LABELS[route.name] ?? route.name;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={label}
              onPress={() => {
                const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              }}
              style={styles.item}
            >
              <View
                style={[
                  styles.icon,
                  { backgroundColor: focused ? colors.red : colors.surfaceInactive },
                ]}
              />
              <Text style={[styles.label, { color: focused ? colors.text : colors.muted }]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/** The "you" row above the tab bar on Rankings. */
function PinnedPlayerRow() {
  return (
    <View style={styles.playerRow}>
      <Text style={styles.playerPosition}>{playerRankingRow.position}</Text>
      <Avatar size={36} emphasis ringColor={colors.red} ringWidth={2} />
      <View style={styles.playerIdentity}>
        <Text style={styles.playerName}>
          {player.gamertag} <Text style={styles.playerNameSuffix}>· you</Text>
        </Text>
        <Text style={styles.playerMeta}>{playerRankingRow.meta}</Text>
      </View>
      <View style={styles.playerScore}>
        <Text style={styles.playerPoints}>{playerRankingRow.points}</Text>
        <Movement value={playerRankingRow.movement} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chrome: {
    backgroundColor: colors.chrome,
    borderTopWidth: 1,
    paddingHorizontal: TAB_BAR.paddingHorizontal,
  },
  bar: {
    height: TAB_BAR.height,
    paddingTop: TAB_BAR.paddingTop,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  barWithPlayerRow: { borderTopWidth: 1, borderTopColor: borders.hairline },

  item: { width: TAB_BAR.itemWidth, alignItems: 'center', gap: 4 },
  icon: { width: TAB_BAR.iconSize, height: TAB_BAR.iconSize, borderRadius: TAB_BAR.iconRadius },
  label: { fontFamily: fonts.body600, fontSize: 11 },

  playerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 6, paddingBottom: 10 },
  playerPosition: { width: 30, fontFamily: fonts.display800, fontSize: 20, lineHeight: 20, color: colors.red },
  playerIdentity: { flex: 1 },
  playerName: { fontFamily: fonts.body700, fontSize: 15, color: colors.text },
  playerNameSuffix: { fontFamily: fonts.body500, color: colors.muted },
  playerMeta: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted },
  playerScore: { alignItems: 'flex-end' },
  playerPoints: { fontFamily: fonts.body700, fontSize: 15, color: colors.text },
});
