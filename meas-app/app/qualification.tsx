import { StyleSheet, Text, View } from 'react-native';

import { ANGLE_150, ANGLE_90, Gradient } from '../src/components/Gradient';
import { Screen } from '../src/components/Screen';
import { ScreenTitle } from '../src/components/ScreenTitle';
import { DiagonalHatch } from '../src/components/Texture';
import { Card, SectionHeading } from '../src/components/ui';
import { formatPoints, raceProgress } from '../src/data/derived';
import { championshipRace, qualificationCopy } from '../src/data/mock';
import type { QualificationPathState } from '../src/data/types';
import { useAppState } from '../src/state/AppState';
import { borders, colors, fills } from '../src/theme/colors';
import { percent } from '../src/theme/layout';
import { display, displayBold, fonts, leading, statCaption, tracking } from '../src/theme/typography';

/** Path badge and state-label colours, from `qualPaths`. */
const PATH_TONE: Record<QualificationPathState, { bg: string; fg: string; border: string; state: string }> = {
  'ON TRACK': { bg: fills.greenTint, fg: colors.green, border: borders.greenSoft, state: colors.green },
  DONE: { bg: fills.greenTint, fg: colors.green, border: borders.greenSoft, state: colors.green },
  OPEN: { bg: colors.surfaceRaised, fg: colors.steel, border: borders.hairline, state: colors.steel },
  FALLBACK: { bg: colors.surfaceRaised, fg: colors.muted, border: borders.hairline, state: colors.muted },
};

/** 11 · Championship Qualification */
export default function QualificationScreen() {
  const { qualified } = useAppState();
  const race = raceProgress();
  const copy = qualificationCopy(qualified, race.marginToCut);
  const cutLeft = percent(race.cutFraction);

  return (
    <Screen variant="standalone">
      <ScreenTitle eyebrow={championshipRace.dates} title="QUALIFICATION" />

      <Gradient
        colors={qualified ? [colors.greenDark, colors.greenDeep] : [colors.redDark, colors.redDeep]}
        angle={ANGLE_150}
        style={[styles.hero, { borderColor: qualified ? colors.green : colors.red }]}
      >
        <DiagonalHatch color="rgba(255,255,255,0.04)" period={16} />
        <View>
          <Text style={[styles.heroLabel, { color: qualified ? colors.greenLight : colors.pinkLight }]}>
            {copy.label}
          </Text>
          <Text style={styles.heroHeadline}>{copy.headline}</Text>
          <Text style={styles.heroSubtitle}>{copy.subtitle}</Text>
        </View>
      </Gradient>

      <View style={styles.raceLegend}>
        <Text style={styles.raceStanding}>
          #{championshipRace.rank} · {formatPoints(championshipRace.points)} pts
        </Text>
        <Text style={styles.raceMuted}>
          Cut #{championshipRace.cutRank} · {formatPoints(championshipRace.cutPoints)} pts
        </Text>
        <Text style={styles.raceMuted}>#1 · {formatPoints(championshipRace.leaderPoints)}</Text>
      </View>

      <View style={styles.raceTrack}>
        <Gradient
          colors={[colors.redDark, colors.red]}
          angle={ANGLE_90}
          style={[styles.raceFill, { width: percent(race.fraction) }]}
        />
        <View style={[styles.cutTick, { left: cutLeft }]} />
        <Text style={[styles.cutLabel, { left: cutLeft }]}>Cut line</Text>
      </View>

      <SectionHeading style={styles.pathsHeading}>HOW YOU GET IN</SectionHeading>
      <View style={styles.paths}>
        {championshipRace.paths.map((path, index) => {
          // Path 1 flips from "on track" to "done" once the player qualifies.
          const state: QualificationPathState = index === 0 && qualified ? 'DONE' : path.state;
          const tone = PATH_TONE[state];
          return (
            <Card key={path.index} style={[styles.pathCard, { borderColor: tone.border }]}>
              <View style={[styles.pathBadge, { backgroundColor: tone.bg }]}>
                <Text style={[styles.pathBadgeLabel, { color: tone.fg }]}>{path.index}</Text>
              </View>
              <View style={styles.pathBody}>
                <Text style={styles.pathTitle}>{path.title}</Text>
                <Text style={styles.pathSubtitle}>
                  {path.subtitle ??
                    `Current #${championshipRace.rank} · cut is ${formatPoints(championshipRace.cutPoints)} pts`}
                </Text>
              </View>
              <Text style={[styles.pathState, { color: tone.state }]}>{state}</Text>
            </Card>
          );
        })}
      </View>

      <SectionHeading style={styles.remainingHeading}>REMAINING EVENTS</SectionHeading>
      <View style={styles.remaining}>
        {championshipRace.remaining.map((event) => (
          <Card key={`${event.month}-${event.name}`} style={styles.remainingCard}>
            <Text style={styles.remainingMonth}>{event.month}</Text>
            <Text style={styles.remainingName}>{event.name}</Text>
            <Text style={styles.remainingMax}>{event.maxPoints}</Text>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: 20, borderRadius: 22, padding: 22, borderWidth: 1, overflow: 'hidden' },
  heroLabel: {
    fontFamily: fonts.body700,
    fontSize: 12,
    letterSpacing: tracking(0.14, 12),
    textTransform: 'uppercase',
  },
  heroHeadline: {
    marginTop: 6,
    ...display(48, { lineHeight: leading(0.95, 48) }),
    color: colors.text,
  },
  heroSubtitle: {
    marginTop: 10,
    fontFamily: fonts.body400,
    fontSize: 14,
    lineHeight: leading(1.4, 14),
    color: fills.whiteText80,
  },

  raceLegend: { marginTop: 22, flexDirection: 'row', justifyContent: 'space-between' },
  raceStanding: { fontFamily: fonts.body700, fontSize: 13, color: colors.text },
  raceMuted: { fontFamily: fonts.body400, fontSize: 13, color: colors.muted },

  raceTrack: {
    marginTop: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: fills.track,
    // The cut-line caption hangs below the bar, so it must not be clipped.
    marginBottom: 34,
  },
  raceFill: { height: '100%', borderRadius: 5 },
  cutTick: { position: 'absolute', top: -5, width: 2, height: 20, backgroundColor: colors.text },
  /* `transform:translateX(-50%)` — a fixed width plus half of it as a negative
     offset centres the caption on the tick without measuring it. */
  cutLabel: {
    position: 'absolute',
    top: 22,
    width: 80,
    marginLeft: -40,
    textAlign: 'center',
    fontFamily: fonts.body400,
    fontSize: 10,
    letterSpacing: tracking(0.1, 10),
    textTransform: 'uppercase',
    color: colors.steel,
  },

  pathsHeading: { marginTop: 10 },
  paths: { marginTop: 12, gap: 8 },
  pathCard: { padding: 14, flexDirection: 'row', gap: 12, alignItems: 'center' },
  pathBadge: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  pathBadgeLabel: { ...display(16) },
  pathBody: { flex: 1, minWidth: 0 },
  pathTitle: { fontFamily: fonts.body700, fontSize: 15, color: colors.text },
  pathSubtitle: { fontFamily: fonts.body400, fontSize: 13, color: colors.muted, marginTop: 2 },
  pathState: { fontFamily: fonts.body700, fontSize: 12 },

  remainingHeading: { marginTop: 24 },
  remaining: { marginTop: 12, flexDirection: 'row', gap: 8 },
  remainingCard: { flex: 1, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 8, alignItems: 'center' },
  remainingMonth: { ...statCaption, color: colors.muted, letterSpacing: tracking(0.08, 11) },
  remainingName: {
    marginTop: 4,
    fontFamily: fonts.body700,
    fontSize: 13,
    lineHeight: leading(1.2, 13),
    color: colors.text,
    textAlign: 'center',
  },
  remainingMax: { marginTop: 6, ...displayBold(18), color: colors.red },
});
