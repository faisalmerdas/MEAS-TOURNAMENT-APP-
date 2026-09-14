import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ANGLE_135, ANGLE_160, Gradient } from '../../src/components/Gradient';
import { Screen } from '../../src/components/Screen';
import {
  Card,
  CutLineMarker,
  Eyebrow,
  GlassChip,
  ProgressBar,
  SectionHeader,
  SectionHeading,
} from '../../src/components/ui';
import {
  activeChallenges,
  challengeById,
  challengeProgressLabel,
  formatPoints,
  raceProgress,
} from '../../src/data/derived';
import {
  challenges,
  championshipRace,
  countdown,
  featuredTournament,
  homeChallengeIds,
  homeChallengeSubtitles,
  lastResult,
  liveMatch,
  player,
  season,
} from '../../src/data/mock';
import { useAppState } from '../../src/state/AppState';
import { percent } from '../../src/theme/layout';
import { borders, colors, fills } from '../../src/theme/colors';
import { display, displayBold, fonts, statCaption, tracking } from '../../src/theme/typography';

/** 02 · Home */
export default function HomeScreen() {
  const { eventLive } = useAppState();
  const race = raceProgress();

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.seasonLine}>
            Season {season.year} · Event {season.eventsPlayed} of {season.eventsTotal}
          </Text>
          <Text style={styles.greeting}>HEY, {player.gamertag}</Text>
        </View>
        <Gradient colors={['#2A2A30', '#141416']} angle={ANGLE_135} style={styles.rankBadge}>
          <Text style={styles.rankBadgeLabel}>#{player.seasonRank}</Text>
        </Gradient>
      </View>

      {eventLive ? <LiveEventCard /> : <NextEventCard />}

      <SectionHeader
        title="CHAMPIONSHIP RACE"
        action={`Top ${championshipRace.cutRank} qualify`}
        style={styles.section}
      />
      <Card style={styles.raceCard} onPress={() => router.push('/qualification')}>
        <View style={styles.raceRow}>
          <Text style={styles.raceStanding}>
            <Text style={styles.raceRank}>#{championshipRace.rank}</Text> ·{' '}
            {formatPoints(championshipRace.points)} pts
          </Text>
          <Text style={styles.raceCut}>
            Cut line #{championshipRace.cutRank} · {formatPoints(championshipRace.cutPoints)} pts
          </Text>
        </View>
        <View style={styles.raceBar}>
          <ProgressBar fraction={race.fraction} />
          <CutLineMarker left={percent(race.cutFraction)} />
        </View>
        <Text style={styles.raceNote}>
          Safe by {race.marginToCut} pts · {championshipRace.eventsRemaining} events remaining
        </Text>
      </Card>

      <SectionHeader
        title="ACTIVE CHALLENGES"
        action={`${activeChallenges().length} of ${challenges.length}`}
        onActionPress={() => router.push('/challenges')}
        style={styles.section}
      />
      <View style={styles.challengeList}>
        {homeChallengeIds.map((id) => {
          const challenge = challengeById(id);
          return (
            <Card key={id} style={styles.challengeCard} onPress={() => router.push('/challenges')}>
              <View style={styles.challengeIcon}>
                <Text style={styles.challengeIconLabel}>{challenge.icon}</Text>
              </View>
              <View style={styles.challengeBody}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeSubtitle}>
                  {homeChallengeSubtitles[id] ?? challenge.subtitle}
                </Text>
              </View>
              <Text style={styles.challengeProgress}>{challengeProgressLabel(challenge, true)}</Text>
            </Card>
          );
        })}
      </View>

      <SectionHeading style={styles.lastResultHeading}>LAST RESULT</SectionHeading>
      <Card style={styles.lastResultCard}>
        <View>
          <Text style={styles.lastResultEvent}>{lastResult.event}</Text>
          <Text style={styles.lastResultPlacement}>{lastResult.placement}</Text>
        </View>
        <View style={styles.lastResultScore}>
          <Text style={styles.lastResultPoints}>{lastResult.points}</Text>
          <Text style={styles.lastResultPointsLabel}>PTS</Text>
        </View>
      </Card>
    </Screen>
  );
}

/** The red "live now" hero, shown when `eventLive` is set. */
function LiveEventCard() {
  return (
    <View style={styles.liveCard}>
      <View style={styles.liveHeader}>
        <View style={styles.liveDot} />
        <Eyebrow color={colors.white} style={styles.liveEyebrow}>
          Live now · {liveMatch.eventName}
        </Eyebrow>
      </View>
      <Text style={styles.liveHeadline}>{liveMatch.headline}</Text>
      <Text style={styles.liveDetail}>{liveMatch.detail}</Text>
      <Pressable
        onPress={() => router.navigate('/events')}
        accessibilityRole="button"
        style={({ pressed }) => [styles.liveCta, pressed && styles.pressed]}
      >
        <Text style={styles.liveCtaLabel}>Enter Event Mode</Text>
      </Pressable>
    </View>
  );
}

/** The grey countdown hero, shown when the next event is still upcoming. */
function NextEventCard() {
  return (
    <Gradient colors={['#1E1E23', '#111113']} angle={ANGLE_160} style={styles.nextCard}>
      {/* `border:28px solid rgba(224,32,42,.18)` ring bleeding off the corner. */}
      <View style={styles.nextRing} pointerEvents="none" />

      <Eyebrow color={colors.red}>Next event · You&apos;re registered</Eyebrow>
      <Text style={styles.nextHeadline}>
        {featuredTournament.shortNameLines[0]}
        {'\n'}
        {featuredTournament.shortNameLines[1]}
      </Text>
      <Text style={styles.nextSubtitle}>
        {featuredTournament.dateRange} · {featuredTournament.venueShort}
      </Text>

      <View style={styles.countdown}>
        {countdown.map((part) => (
          <View key={part.label} style={styles.countdownTile}>
            <Text style={styles.countdownValue}>{part.value}</Text>
            <Text style={styles.countdownLabel}>{part.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.nextChips}>
        {featuredTournament.entries
          .filter((entry) => entry.state === 'in-pass')
          .map((entry) => (
            <GlassChip key={entry.game.code} label={entry.game.name} />
          ))}
        <Pressable
          onPress={() =>
            router.push({ pathname: '/tournament', params: { id: featuredTournament.id } })
          }
          accessibilityRole="button"
        >
          <GlassChip label="+ Add game" dashed />
        </Pressable>
      </View>
    </Gradient>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  /** Every section header in the design sits 24pt below the block above it. */
  section: { marginTop: 24 },
  seasonLine: { fontFamily: fonts.body400, fontSize: 13, color: colors.muted },
  greeting: { ...display(34), color: colors.text },
  rankBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: borders.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankBadgeLabel: { ...displayBold(16), color: colors.steel },

  /* Live hero */
  liveCard: { marginTop: 20, borderRadius: 18, padding: 18, backgroundColor: colors.red },
  liveHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.white },
  liveEyebrow: { fontFamily: fonts.body700 },
  liveHeadline: { marginTop: 8, ...display(36), color: colors.white },
  liveDetail: { marginTop: 6, fontFamily: fonts.body400, fontSize: 15, color: colors.white },
  liveCta: {
    marginTop: 14,
    height: 44,
    borderRadius: 11,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveCtaLabel: { fontFamily: fonts.body700, fontSize: 15, color: colors.red },

  /* Upcoming hero */
  nextCard: {
    marginTop: 20,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: borders.soft,
    overflow: 'hidden',
  },
  nextRing: {
    position: 'absolute',
    right: -30,
    top: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 28,
    borderColor: fills.redRing,
  },
  nextHeadline: { marginTop: 8, ...display(36), color: colors.text },
  nextSubtitle: { marginTop: 8, fontFamily: fonts.body400, fontSize: 14, color: colors.steel },

  countdown: { marginTop: 16, flexDirection: 'row', gap: 10 },
  countdownTile: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: fills.glassFaint,
    paddingVertical: 10,
    alignItems: 'center',
  },
  countdownValue: { ...displayBold(28), color: colors.text },
  countdownLabel: { ...statCaption, color: colors.muted, marginTop: 2 },

  nextChips: { marginTop: 14, flexDirection: 'row', gap: 8 },

  /* Championship race */
  raceCard: { marginTop: 12, paddingVertical: 14, paddingHorizontal: 16 },
  raceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  raceStanding: { fontFamily: fonts.body400, fontSize: 14, color: colors.text },
  raceRank: { fontFamily: fonts.body700 },
  raceCut: { fontFamily: fonts.body400, fontSize: 14, color: colors.muted },
  raceBar: { marginTop: 10 },
  raceNote: { marginTop: 8, fontFamily: fonts.body400, fontSize: 12, color: colors.muted },

  /* Challenges */
  challengeList: { marginTop: 12, gap: 8 },
  challengeCard: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  challengeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeIconLabel: { ...display(18), color: colors.red },
  challengeBody: { flex: 1, minWidth: 0 },
  challengeTitle: { fontFamily: fonts.body600, fontSize: 15, color: colors.text },
  challengeSubtitle: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted, marginTop: 2 },
  challengeProgress: { ...displayBold(18), color: colors.steel },

  /* Last result */
  lastResultHeading: { marginTop: 24 },
  lastResultCard: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastResultEvent: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted },
  lastResultPlacement: { fontFamily: fonts.body700, fontSize: 17, color: colors.text, marginTop: 2 },
  lastResultScore: { alignItems: 'flex-end' },
  lastResultPoints: { ...display(26), color: colors.red },
  lastResultPointsLabel: {
    fontFamily: fonts.body400,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: tracking(0.08, 11),
  },

  pressed: { opacity: 0.85 },
});
