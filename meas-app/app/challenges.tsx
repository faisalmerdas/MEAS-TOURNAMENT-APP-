import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '../src/components/Screen';
import { FilterChip, ProgressBar } from '../src/components/ui';
import { challengeFraction, challengeProgressLabel } from '../src/data/derived';
import { challenges, homeChallengeIds } from '../src/data/mock';
import type { Challenge } from '../src/data/types';
import { borders, colors, fills } from '../src/theme/colors';
import { display, displayBold, fonts, tracking } from '../src/theme/typography';

const FILTERS = [
  { id: 'season', label: 'Season' },
  { id: 'event', label: 'This event' },
  { id: 'completed', label: 'Completed' },
] as const;

type FilterId = (typeof FILTERS)[number]['id'];

/**
 * Card accent per challenge.
 *
 * Complete cards go green. Among the rest, the two challenges the Home screen
 * promotes carry a red icon; everything else stays neutral steel — which is
 * exactly the split the prototype hardcodes.
 */
function challengeTone(challenge: Challenge) {
  if (challenge.complete) {
    return {
      border: borders.greenSoft,
      bar: colors.green,
      iconBg: fills.greenTint,
      iconFg: colors.green,
      reward: colors.green,
    };
  }
  const promoted = (homeChallengeIds as readonly string[]).includes(challenge.id);
  return {
    border: borders.hairline,
    bar: colors.red,
    iconBg: promoted ? fills.redTint : colors.surfaceRaised,
    iconFg: promoted ? colors.red : colors.steel,
    reward: colors.text,
  };
}

function filterChallenges(filter: FilterId): Challenge[] {
  if (filter === 'completed') return challenges.filter((c) => c.complete);
  // No event-scoped challenges exist in the mock; a real API would scope these
  // to the tournament the player is currently registered for.
  if (filter === 'event') return [];
  return challenges;
}

/** 09 · Challenges */
export default function ChallengesScreen() {
  const [filter, setFilter] = useState<FilterId>('season');
  const visible = filterChallenges(filter);

  return (
    <Screen variant="standalone">
      <Text style={styles.title}>CHALLENGES</Text>
      <Text style={styles.subtitle}>Season-long goals. Each one pays out points and a badge.</Text>

      <View style={styles.filters}>
        {FILTERS.map((option) => (
          <FilterChip
            key={option.id}
            label={option.label}
            active={option.id === filter}
            onPress={() => setFilter(option.id)}
          />
        ))}
      </View>

      <View style={styles.list}>
        {visible.length === 0 ? (
          <Text style={styles.empty}>No challenges in this view yet.</Text>
        ) : (
          visible.map((challenge) => {
            const tone = challengeTone(challenge);
            return (
              <View key={challenge.id} style={[styles.card, { borderColor: tone.border }]}>
                <View style={styles.cardHeader}>
                  <View style={[styles.icon, { backgroundColor: tone.iconBg }]}>
                    <Text style={[styles.iconLabel, { color: tone.iconFg }]}>{challenge.icon}</Text>
                  </View>
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{challenge.title}</Text>
                    <Text style={styles.cardSubtitle}>{challenge.subtitle}</Text>
                  </View>
                  <View style={styles.reward}>
                    <Text style={[styles.rewardValue, { color: tone.reward }]}>+{challenge.reward}</Text>
                    <Text style={styles.rewardLabel}>PTS</Text>
                  </View>
                </View>

                <View style={styles.progressRow}>
                  <ProgressBar
                    fraction={challengeFraction(challenge)}
                    color={tone.bar}
                    style={styles.progressBar}
                  />
                  <Text style={styles.progressLabel}>{challengeProgressLabel(challenge)}</Text>
                </View>
              </View>
            );
          })
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...display(34), color: colors.text },
  subtitle: { marginTop: 6, fontFamily: fonts.body400, fontSize: 14, color: colors.muted },

  filters: { marginTop: 18, flexDirection: 'row', gap: 8 },

  list: { marginTop: 18, gap: 10 },
  empty: { fontFamily: fonts.body400, fontSize: 14, color: colors.muted, paddingVertical: 8 },

  card: { borderRadius: 16, backgroundColor: colors.surface, borderWidth: 1, padding: 14 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  iconLabel: { ...display(20) },
  cardBody: { flex: 1, minWidth: 0 },
  cardTitle: { fontFamily: fonts.body700, fontSize: 16, color: colors.text },
  cardSubtitle: { fontFamily: fonts.body400, fontSize: 13, color: colors.muted, marginTop: 2 },
  reward: { alignItems: 'flex-end' },
  rewardValue: { ...displayBold(20) },
  rewardLabel: {
    fontFamily: fonts.body400,
    fontSize: 10,
    color: colors.muted,
    letterSpacing: tracking(0.1, 10),
  },

  progressRow: { marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressBar: { flex: 1 },
  progressLabel: {
    fontFamily: fonts.body600,
    fontSize: 12,
    color: colors.steel,
    width: 44,
    textAlign: 'right',
  },
});
