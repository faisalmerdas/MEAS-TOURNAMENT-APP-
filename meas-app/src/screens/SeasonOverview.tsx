import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { season } from '../data/mock';
import type { SeasonEvent, SeasonEventState } from '../data/types';
import { borders, colors, fills } from '../theme/colors';
import { display, displayBold, fonts, leading, statCaption, tracking } from '../theme/typography';

/** Row fill, edge, dimming and points colour per state, from `seasonEvents`. */
const EVENT_TONE: Record<
  SeasonEventState,
  { bg: string; border: string; opacity: number; points: string }
> = {
  played: { bg: colors.surface, border: borders.hairline, opacity: 1, points: colors.text },
  registered: { bg: fills.redWash, border: borders.redMedium, opacity: 1, points: colors.red },
  upcoming: { bg: colors.surface, border: borders.hairline, opacity: 0.7, points: colors.muted },
  finals: { bg: colors.surface, border: borders.steelSoft, opacity: 0.7, points: colors.muted },
};

/** Tier tag colours, from the `tagBg` / `tagFg` pairs. */
const TIER_TAG: Record<SeasonEvent['tier'], { bg: string; fg: string }> = {
  Major: { bg: colors.red, fg: colors.white },
  Regional: { bg: colors.surfaceRaised, fg: colors.steel },
  Invite: { bg: colors.steel, fg: colors.black },
};

/**
 * The ten progress dots: red for each event played, steel for the finals and
 * `#3A3A42` for everything still ahead.
 */
function dotColor(index: number, event: SeasonEvent): string {
  if (index < season.eventsPlayed) return colors.red;
  if (event.state === 'finals') return colors.steel;
  return colors.surfaceInactive;
}

/**
 * 07 · Season overview
 *
 * Shown on the Events tab while no event is live. The design draws it without a
 * tab bar; here it keeps one, since it is a tab destination.
 */
export function SeasonOverview() {
  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.range}>{season.range}</Text>
          <Text style={styles.title}>SEASON {season.year}</Text>
        </View>
        <View style={styles.progress}>
          <Text style={styles.progressValue}>
            {season.eventsPlayed}
            <Text style={styles.progressTotal}>/{season.eventsTotal}</Text>
          </Text>
          <Text style={styles.progressLabel}>EVENTS DONE</Text>
        </View>
      </View>

      <View style={styles.dots}>
        {season.events.map((event, index) => (
          <View key={event.id} style={[styles.dot, { backgroundColor: dotColor(index, event) }]} />
        ))}
      </View>

      <View style={styles.events}>
        {season.events.map((event) => {
          const tone = EVENT_TONE[event.state];
          const tag = TIER_TAG[event.tier];
          const openable = Boolean(event.tournamentId);

          return (
            <Pressable
              key={event.id}
              disabled={!openable}
              onPress={() => router.push({ pathname: '/tournament', params: { id: event.tournamentId } })}
              accessibilityRole={openable ? 'button' : undefined}
              style={({ pressed }) => [
                styles.eventRow,
                { backgroundColor: tone.bg, borderColor: tone.border, opacity: tone.opacity },
                pressed && openable && styles.pressed,
              ]}
            >
              <View style={styles.eventDate}>
                <Text style={styles.eventMonth}>{event.month}</Text>
                <Text style={styles.eventDay}>{event.day}</Text>
              </View>
              <View style={styles.eventDivider} />

              <View style={styles.eventBody}>
                <View style={styles.eventNameRow}>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <View style={[styles.eventTag, { backgroundColor: tag.bg }]}>
                    <Text style={[styles.eventTagLabel, { color: tag.fg }]}>{event.tier}</Text>
                  </View>
                </View>
                <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
              </View>

              <View style={styles.eventScore}>
                <Text style={[styles.eventPoints, { color: tone.points }]}>{event.points}</Text>
                <Text style={styles.eventPointsLabel}>{event.pointsLabel}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  range: { fontFamily: fonts.body400, fontSize: 13, color: colors.muted },
  title: { ...display(34), color: colors.text },
  progress: { alignItems: 'flex-end' },
  progressValue: { ...display(34), color: colors.red },
  progressTotal: { ...display(22), color: colors.muted },
  progressLabel: {
    fontFamily: fonts.body400,
    fontSize: 12,
    color: colors.muted,
    letterSpacing: tracking(0.08, 12),
  },

  dots: { marginTop: 18, flexDirection: 'row', gap: 4 },
  dot: { flex: 1, height: 6, borderRadius: 3 },

  events: { marginTop: 20, gap: 10 },
  eventRow: {
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  eventDate: { width: 44, alignItems: 'center' },
  eventMonth: { ...statCaption, color: colors.muted },
  eventDay: { ...displayBold(24), color: colors.text },
  eventDivider: { width: 1, height: 36, backgroundColor: borders.soft },

  eventBody: { flex: 1, minWidth: 0 },
  eventNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eventName: { fontFamily: fonts.body700, fontSize: 15, color: colors.text, flexShrink: 1 },
  eventTag: { paddingVertical: 3, paddingHorizontal: 6, borderRadius: 5 },
  eventTagLabel: {
    fontFamily: fonts.body700,
    fontSize: 10,
    letterSpacing: tracking(0.12, 10),
    textTransform: 'uppercase',
  },
  eventSubtitle: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted, marginTop: 2 },

  eventScore: { alignItems: 'flex-end' },
  eventPoints: { ...displayBold(22, { lineHeight: leading(1, 22) }) },
  eventPointsLabel: { fontFamily: fonts.body400, fontSize: 11, color: colors.muted },

  pressed: { opacity: 0.7 },
});
