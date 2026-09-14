import { StyleSheet, Text, View } from 'react-native';

import { BadgeGrid } from '../src/components/BadgeGrid';
import { ANGLE_150, Gradient } from '../src/components/Gradient';
import { Screen } from '../src/components/Screen';
import { ScreenTitle } from '../src/components/ScreenTitle';
import { Eyebrow, SectionHeading } from '../src/components/ui';
import { eventBadges, featuredBadge, performanceBadges, trophyRoomTotals } from '../src/data/mock';
import { useAppState } from '../src/state/AppState';
import { borders, colors } from '../src/theme/colors';
import { display, displayBold, fonts, leading } from '../src/theme/typography';

/** 08 · Badges / Trophy Room */
export default function TrophyRoomScreen() {
  const { qualified } = useAppState();
  const totals = trophyRoomTotals(qualified);

  return (
    <Screen variant="standalone">
      <ScreenTitle title="TROPHY ROOM" caption={`${totals.earned} / ${totals.total} earned`} />

      <Gradient colors={['#2A1113', colors.surface]} locations={[0, 0.7]} angle={ANGLE_150} style={styles.featured}>
        <View style={styles.featuredTile}>
          <Text style={styles.featuredGlyph}>{featuredBadge.glyph}</Text>
        </View>
        <View style={styles.featuredBody}>
          <Eyebrow color={colors.red} style={styles.featuredEyebrow}>
            {featuredBadge.eyebrow}
          </Eyebrow>
          <Text style={styles.featuredTitle}>{featuredBadge.title}</Text>
          <Text style={styles.featuredSubtitle}>{featuredBadge.subtitle}</Text>
        </View>
      </Gradient>

      <SectionHeading style={styles.section}>EVENT BADGES</SectionHeading>
      <View style={styles.grid}>
        <BadgeGrid badges={eventBadges} />
      </View>

      <SectionHeading style={styles.section}>PERFORMANCE</SectionHeading>
      <View style={styles.grid}>
        <BadgeGrid badges={performanceBadges(qualified)} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 24 },
  grid: { marginTop: 12 },

  featured: {
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: borders.redSoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  featuredTile: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    // `box-shadow:0 12px 32px rgba(224,32,42,.4)`
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  featuredGlyph: { ...display(30), color: colors.text },
  featuredBody: { flex: 1 },
  featuredEyebrow: { fontFamily: fonts.body700, fontSize: 11 },
  featuredTitle: {
    marginTop: 4,
    ...displayBold(24, { lineHeight: leading(1.05, 24) }),
    color: colors.text,
  },
  featuredSubtitle: { marginTop: 4, fontFamily: fonts.body400, fontSize: 13, color: colors.steel },
});
