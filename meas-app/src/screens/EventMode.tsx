import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../components/Screen';
import { Avatar, SectionHeading } from '../components/ui';
import { eventModeHeader, eventTimeline, matchCall, player } from '../data/mock';
import type { TimelineState } from '../data/types';
import { borders, colors, fills } from '../theme/colors';
import { display, eyebrow, fonts, statCaption, tracking } from '../theme/typography';

/** Timeline dot and text colours per state, from `eventTimeline`. */
const TIMELINE_TONE: Record<TimelineState, { dot: string; title: string; time: string }> = {
  done: { dot: colors.green, title: colors.muted, time: colors.muted },
  now: { dot: colors.red, title: colors.text, time: colors.red },
  upcoming: { dot: colors.surfaceInactive, title: colors.text, time: colors.text },
};

/**
 * 04 · Event Mode (live, on site)
 *
 * Reached through the Events tab while `eventLive` is set.
 */
export function EventMode() {
  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.liveBadge}>
          <View style={styles.liveDotRing}>
            <View style={styles.liveDot} />
          </View>
          <Text style={styles.liveLabel}>Event Mode</Text>
        </View>
        <View style={styles.checkIn}>
          <Text style={styles.checkInLabel}>Checked in · {eventModeHeader.checkedInAt}</Text>
        </View>
      </View>

      <Text style={styles.title}>{eventModeHeader.title}</Text>

      <View style={styles.callCard}>
        <View style={styles.callHeader}>
          <Text style={styles.callEyebrow}>You&apos;re called · Report now</Text>
          <Text style={styles.callTimer}>{matchCall.reportIn}</Text>
        </View>

        <Pressable
          onPress={() => router.push('/rivalry')}
          accessibilityRole="button"
          accessibilityLabel={`Rivalry with ${matchCall.opponent}`}
          style={styles.matchup}
        >
          <View style={styles.matchupSide}>
            <Avatar size={64} emphasis ringColor={colors.red} ringWidth={2} style={styles.matchupAvatar} />
            <Text style={styles.matchupName}>{player.gamertag}</Text>
            <Text style={styles.matchupSeed}>Seed {matchCall.playerSeed}</Text>
          </View>

          <View style={styles.matchupCenter}>
            <Text style={styles.matchupVs}>VS</Text>
            <Text style={styles.matchupFormat}>{matchCall.format}</Text>
          </View>

          <View style={styles.matchupSide}>
            <Avatar size={64} ringColor="rgba(255,255,255,0.15)" ringWidth={2} style={styles.matchupAvatar} />
            <Text style={styles.matchupName}>{matchCall.opponent}</Text>
            <Text style={styles.matchupSeed}>Seed {matchCall.opponentSeed}</Text>
          </View>
        </Pressable>

        <View style={styles.callFacts}>
          <CallFact label="Game" value={matchCall.game} />
          <CallFact label="Round" value={matchCall.round} />
          <View style={[styles.callFact, styles.callFactAccent]}>
            <Text style={[styles.callFactLabel, { color: fills.whiteText80 }]}>Station</Text>
            <Text style={styles.callFactStation}>{matchCall.station}</Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.callCta, pressed && styles.pressed]}
        >
          <Text style={styles.callCtaLabel}>I&apos;m at the station</Text>
        </Pressable>
      </View>

      <SectionHeading style={styles.timelineHeading}>YOUR DAY</SectionHeading>
      <View style={styles.timeline}>
        {eventTimeline.map((item, index) => {
          const tone = TIMELINE_TONE[item.state];
          const isLast = index === eventTimeline.length - 1;
          return (
            <View key={`${item.time}-${item.title}`} style={styles.timelineRow}>
              <Text style={[styles.timelineTime, { color: tone.time }]}>{item.time}</Text>
              <View style={styles.timelineRail}>
                <View style={[styles.timelineDot, { backgroundColor: tone.dot }]} />
                {!isLast ? <View style={styles.timelineLine} /> : null}
              </View>
              <View style={styles.timelineBody}>
                <Text style={[styles.timelineTitle, { color: tone.title }]}>{item.title}</Text>
                <Text style={styles.timelineSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

function CallFact({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.callFact}>
      <Text style={styles.callFactLabel}>{label}</Text>
      <Text style={styles.callFactValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  /* `box-shadow:0 0 0 4px rgba(224,32,42,.25)` becomes a ring view around the dot. */
  liveDotRing: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(224,32,42,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.red },
  liveLabel: { ...eyebrow, color: colors.red },

  checkIn: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: borders.soft,
    justifyContent: 'center',
  },
  checkInLabel: { fontFamily: fonts.body600, fontSize: 12, color: colors.steel },

  title: { marginTop: 8, ...display(34), color: colors.text },

  callCard: {
    marginTop: 22,
    borderRadius: 20,
    padding: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: borders.redMedium,
    // `0 24px 48px rgba(0,0,0,.5)` — CSS blur maps to roughly half the radius.
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  callHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  callEyebrow: { ...eyebrow, color: colors.red },
  callTimer: { ...display(26), color: colors.white },

  matchup: { marginTop: 14, flexDirection: 'row', alignItems: 'center', gap: 12 },
  matchupSide: { flex: 1, alignItems: 'center' },
  matchupAvatar: { alignSelf: 'center' },
  matchupName: { marginTop: 8, fontFamily: fonts.body700, fontSize: 16, color: colors.text },
  matchupSeed: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted },
  matchupCenter: { alignItems: 'center' },
  matchupVs: { ...display(30), color: colors.steel },
  matchupFormat: {
    fontFamily: fonts.body400,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: tracking(0.1, 11),
  },

  callFacts: { marginTop: 16, flexDirection: 'row', gap: 8 },
  callFact: { flex: 1, borderRadius: 12, backgroundColor: colors.bg, padding: 10, alignItems: 'center' },
  callFactAccent: { backgroundColor: colors.red },
  callFactLabel: { ...statCaption, color: colors.muted },
  callFactValue: { fontFamily: fonts.body700, fontSize: 15, color: colors.text, marginTop: 2 },
  callFactStation: { ...display(24), color: colors.text, marginTop: 2 },

  callCta: {
    marginTop: 14,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callCtaLabel: { fontFamily: fonts.body700, fontSize: 16, color: colors.bg },

  timelineHeading: { marginTop: 24 },
  timeline: { marginTop: 12 },
  timelineRow: { flexDirection: 'row', gap: 14, paddingVertical: 10 },
  timelineTime: { width: 48, fontFamily: fonts.body600, fontSize: 13, paddingTop: 2 },
  timelineRail: { alignItems: 'center' },
  timelineDot: { width: 10, height: 10, borderRadius: 5, marginTop: 5 },
  timelineLine: { flex: 1, width: 1, backgroundColor: borders.soft, marginTop: 4 },
  timelineBody: { flex: 1, paddingBottom: 6 },
  timelineTitle: { fontFamily: fonts.body600, fontSize: 15 },
  timelineSubtitle: { fontFamily: fonts.body400, fontSize: 13, color: colors.muted, marginTop: 2 },

  pressed: { opacity: 0.85 },
});
