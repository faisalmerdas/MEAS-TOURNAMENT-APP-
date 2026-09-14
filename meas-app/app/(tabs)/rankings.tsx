import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../../src/components/Screen';
import { Avatar, FilterChip, Movement } from '../../src/components/ui';
import { podium, rankingRows, rankingTabs } from '../../src/data/mock';
import { borders, colors } from '../../src/theme/colors';
import { display, displayBold, fonts } from '../../src/theme/typography';

/** Ring, pedestal fill, pedestal height and numeral colour for each place. */
const PODIUM_STYLE = {
  1: { ring: colors.red, avatar: 68, pedestal: 80, bg: colors.red, numeral: colors.text, size: 30, glow: true },
  2: { ring: colors.steel, avatar: 56, pedestal: 56, bg: colors.surfaceRaised, numeral: colors.steel, size: 24, glow: false },
  3: { ring: colors.bronze, avatar: 56, pedestal: 44, bg: colors.surfaceRaised, numeral: colors.bronzeText, size: 24, glow: false },
} as const;

/** 06 · Rankings */
export default function RankingsScreen() {
  const [activeTab, setActiveTab] = useState(rankingTabs[0].id);

  return (
    <Screen>
      <Text style={styles.title}>RANKINGS</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabs}
        contentContainerStyle={styles.tabsContent}
      >
        {/* The mock returns the same table for every tab; a real API would key
            the leaderboard by the selected game. */}
        {rankingTabs.map((tab) => (
          <FilterChip
            key={tab.id}
            label={tab.label}
            active={tab.id === activeTab}
            onPress={() => setActiveTab(tab.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.podium}>
        {podium.map((entry) => {
          const style = PODIUM_STYLE[entry.position as 1 | 2 | 3];
          return (
            <View key={entry.gamertag} style={styles.podiumSlot}>
              <Avatar
                size={style.avatar}
                ringColor={style.ring}
                ringWidth={2}
                emphasis={entry.position === 1}
                style={[styles.podiumAvatar, style.glow && styles.podiumGlow]}
              />
              <Text style={[styles.podiumName, entry.position === 1 && styles.podiumNameFirst]}>
                {entry.gamertag}
              </Text>
              <Text style={styles.podiumPoints}>{entry.points}</Text>
              <View style={[styles.pedestal, { height: style.pedestal, backgroundColor: style.bg }]}>
                <Text
                  style={[
                    display(style.size),
                    { color: style.numeral },
                  ]}
                >
                  {entry.position}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.podiumRule} />

      <View style={styles.rows}>
        {rankingRows.map((row) => (
          <View key={row.gamertag} style={styles.row}>
            <Text style={styles.rowPosition}>{row.position}</Text>
            <Avatar size={36} />
            <View style={styles.rowBody}>
              <Text style={styles.rowName}>{row.gamertag}</Text>
              <Text style={styles.rowMeta}>{row.meta}</Text>
            </View>
            <View style={styles.rowScore}>
              <Text style={styles.rowPoints}>{row.points}</Text>
              <Movement value={row.movement} />
            </View>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...display(34), color: colors.text },

  tabs: { marginTop: 14, flexGrow: 0 },
  tabsContent: { gap: 8 },

  podium: { marginTop: 22, flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  podiumSlot: { flex: 1, alignItems: 'center' },
  podiumAvatar: { alignSelf: 'center' },
  /* `box-shadow:0 0 24px rgba(224,32,42,.4)` on the leader's avatar. */
  podiumGlow: {
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  podiumName: { marginTop: 8, fontFamily: fonts.body700, fontSize: 14, color: colors.text },
  podiumNameFirst: { fontSize: 15 },
  podiumPoints: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted },
  pedestal: {
    marginTop: 10,
    alignSelf: 'stretch',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  podiumRule: { height: 1, backgroundColor: borders.medium },

  rows: { marginTop: 14 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  rowPosition: { ...displayBold(20), width: 30, color: colors.steel },
  rowBody: { flex: 1, minWidth: 0 },
  rowName: { fontFamily: fonts.body600, fontSize: 15, color: colors.text },
  rowMeta: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted },
  rowScore: { alignItems: 'flex-end' },
  rowPoints: { fontFamily: fonts.body700, fontSize: 15, color: colors.text },
});
