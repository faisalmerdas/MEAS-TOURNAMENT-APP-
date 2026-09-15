import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Screen } from '../src/components/Screen';
import { Avatar, Card, Eyebrow, SectionHeading } from '../src/components/ui';
import { player, playerRivalryRank, rival } from '../src/data/mock';
import { colors } from '../src/theme/colors';
import {
  display,
  displayBold,
  fitDisplaySize,
  fonts,
  leading,
  statCaption,
  tracking,
} from '../src/theme/typography';

/**
 * The design's slot width for each side of the versus block. It is a cap rather
 * than a fixed width: two 120pt slots plus the ~109pt score block need 349pt,
 * which does not fit the 335pt of content width a 375pt phone offers, so the
 * slots shrink below it on small screens.
 */
const VERSUS_SLOT = 120;
const VERSUS_NAME_SIZE = 26;

/** 10 · Rivalry */
export default function RivalryScreen() {
  const game = rival.rank.split(' · ')[1] ?? '';
  const behind = rival.pointsGap < 0;

  return (
    <Screen variant="standalone">
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back"
          style={styles.backButton}
        >
          <Text style={styles.backChevron}>‹</Text>
        </Pressable>
        <Eyebrow style={styles.topBarTitle}>Rivalry · {game}</Eyebrow>
        <View style={styles.topBarSpacer} />
      </View>

      <View style={styles.versus}>
        <View style={styles.versusSide}>
          <Avatar size={88} emphasis ringColor={colors.red} ringWidth={3} style={styles.versusAvatar} />
          <VersusName name={player.gamertag} />
          <Text style={styles.versusRank}>{playerRivalryRank}</Text>
        </View>

        <View style={styles.versusCenter}>
          <Text style={styles.score}>
            <Text style={styles.scoreWin}>{rival.setsWon}</Text>
            <Text style={styles.scoreDash}> – </Text>
            <Text style={styles.scoreLoss}>{rival.setsLost}</Text>
          </Text>
          <Text style={styles.scoreCaption}>Sets · all time</Text>
        </View>

        <View style={styles.versusSide}>
          <Avatar size={88} ringColor={colors.steel} ringWidth={3} style={styles.versusAvatar} />
          <VersusName name={rival.gamertag} />
          <Text style={styles.versusRank}>{rival.rank}</Text>
        </View>
      </View>

      <Card style={styles.nextCard}>
        <View style={styles.nextHeader}>
          <Eyebrow style={styles.nextLabel}>Next meeting</Eyebrow>
          <View style={styles.likelihood}>
            <Text style={styles.likelihoodLabel}>{rival.nextMeeting.likelihood}</Text>
          </View>
        </View>
        <Text style={styles.nextEvent}>{rival.nextMeeting.event}</Text>
        <Text style={styles.nextReason}>{rival.nextMeeting.reason}</Text>
      </Card>

      <SectionHeading style={styles.section}>HEAD TO HEAD</SectionHeading>
      <View style={styles.history}>
        {rival.history.map((set) => {
          const won = set.result === 'W';
          return (
            <Card key={`${set.event}-${set.round}`} style={styles.historyRow}>
              <View
                style={[
                  styles.resultTile,
                  { backgroundColor: won ? colors.red : colors.surfaceRaised },
                ]}
              >
                <Text style={[styles.resultLabel, { color: won ? colors.white : colors.steel }]}>
                  {set.result}
                </Text>
              </View>
              <View style={styles.historyBody}>
                <Text style={styles.historyEvent}>{set.event}</Text>
                <Text style={styles.historyRound}>{set.round}</Text>
              </View>
              <Text style={styles.historyScore}>{set.score}</Text>
            </Card>
          );
        })}
      </View>

      <View style={styles.summary}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Season points gap</Text>
          <Text style={[styles.summaryValue, { color: behind ? colors.red : colors.green }]}>
            {behind ? '−' : '+'}
            {Math.abs(rival.pointsGap)}
          </Text>
          {/* The design reads "He's ahead"; the rival's pronouns are not part of
              the data model, so this stays neutral. */}
          <Text style={styles.summaryNote}>{behind ? "They're ahead" : "You're ahead"}</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Last 3 sets</Text>
          <Text style={styles.summaryValue}>{rival.lastThree.join(' ')}</Text>
          <Text style={styles.summaryNote}>
            {rival.lastThree.filter((r) => r === 'W').length >= 2 ? 'Momentum yours' : 'Momentum theirs'}
          </Text>
        </Card>
      </View>
    </Screen>
  );
}

/**
 * A gamertag set at the design's 26px overruns the 120pt slot from nine
 * characters up — in the prototype "KAZUYA_MO" runs clean off the right edge of
 * the frame. The name scales down to fit its slot instead of escaping it.
 *
 * The slot is measured rather than assumed: it is 120pt on the design's 402pt
 * frame, but narrower on a small phone, where the row has to share less space.
 */
function VersusName({ name }: { name: string }) {
  const [slotWidth, setSlotWidth] = useState(VERSUS_SLOT);
  const fontSize = fitDisplaySize(name, slotWidth, VERSUS_NAME_SIZE);
  return (
    <Text
      onLayout={(event) => setSlotWidth(event.nativeEvent.layout.width)}
      style={[styles.versusName, display(fontSize)]}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.6}
    >
      {name}
    </Text>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backChevron: { fontFamily: fonts.body400, fontSize: 20, color: colors.text, lineHeight: 22 },
  topBarTitle: { fontFamily: fonts.body700, color: colors.muted },
  topBarSpacer: { width: 36 },

  versus: { marginTop: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  versusSide: { flex: 1, maxWidth: VERSUS_SLOT, alignItems: 'center' },
  versusAvatar: { alignSelf: 'center' },
  versusName: { marginTop: 10, color: colors.text, textAlign: 'center', width: '100%' },
  versusRank: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted },

  versusCenter: { alignItems: 'center' },
  score: { ...display(56, { tracking: tracking(0.02, 56) }) },
  scoreWin: { color: colors.red },
  scoreDash: { color: colors.surfaceInactive },
  scoreLoss: { color: colors.steel },
  scoreCaption: {
    marginTop: 4,
    fontFamily: fonts.body400,
    fontSize: 11,
    letterSpacing: tracking(0.14, 11),
    textTransform: 'uppercase',
    color: colors.muted,
  },

  nextCard: { marginTop: 24, borderRadius: 16, padding: 16 },
  nextHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nextLabel: { fontFamily: fonts.body700, letterSpacing: tracking(0.12, 12) },
  likelihood: {
    height: 24,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: colors.red,
    justifyContent: 'center',
  },
  likelihoodLabel: {
    fontFamily: fonts.body700,
    fontSize: 11,
    letterSpacing: tracking(0.1, 11),
    color: colors.text,
  },
  nextEvent: { marginTop: 6, fontFamily: fonts.body700, fontSize: 17, color: colors.text },
  nextReason: { marginTop: 2, fontFamily: fonts.body400, fontSize: 13, color: colors.muted },

  section: { marginTop: 24 },
  history: { marginTop: 12, gap: 8 },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  resultTile: { width: 28, height: 28, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  resultLabel: { ...display(15) },
  historyBody: { flex: 1, minWidth: 0 },
  historyEvent: { fontFamily: fonts.body600, fontSize: 14, color: colors.text },
  historyRound: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted },
  historyScore: { ...displayBold(20), color: colors.steel },

  summary: { marginTop: 24, flexDirection: 'row', gap: 10 },
  summaryCard: { flex: 1, padding: 14 },
  summaryLabel: { ...statCaption, color: colors.muted },
  summaryValue: { ...displayBold(28, { lineHeight: leading(1.1, 28) }), color: colors.text },
  summaryNote: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted },
});
