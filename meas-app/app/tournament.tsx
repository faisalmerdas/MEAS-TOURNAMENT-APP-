import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ANGLE_135, ANGLE_180, Gradient } from '../src/components/Gradient';
import { Screen, useScreenPadding } from '../src/components/Screen';
import { DiagonalHatch } from '../src/components/Texture';
import { Card, GameTile } from '../src/components/ui';
import { tournamentById } from '../src/data/mock';
import type { TournamentEntryState } from '../src/data/types';
import { borders, colors, fills } from '../src/theme/colors';
import { SCREEN } from '../src/theme/layout';
import { display, displayBold, fonts, leading, statCaption, tracking } from '../src/theme/typography';

/** The three sub-tabs beside "Games" have no designed pane, so the row is
 *  presentational until those screens exist. */
const DETAIL_TABS = ['Games', 'Schedule', 'Venue', 'Rules'] as const;

/** Entry button fill, from `tournamentGames`' `btnBg` / `btnFg` / `btnBorder`. */
const ENTRY_BUTTON: Record<TournamentEntryState, { bg: string; fg: string; border: string }> = {
  'in-pass': { bg: fills.redTint, fg: colors.red, border: borders.redSoft },
  open: { bg: colors.surfaceRaised, fg: colors.text, border: borders.strong },
  'almost-full': { bg: colors.surfaceRaised, fg: colors.text, border: borders.strong },
};

/** 03 · Tournament page */
export default function TournamentScreen() {
  const padding = useScreenPadding();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const t = tournamentById(id);

  return (
    <Screen
      variant="bare"
      contentStyle={{ paddingBottom: 20 }}
      footer={
        <View style={[styles.footer, { paddingBottom: padding.bottomStandalone }]}>
          <View>
            <Text style={styles.footerLabel}>Your pass</Text>
            <Text style={styles.footerValue}>{t.passSummary}</Text>
          </View>
          <View style={styles.footerSpacer} />
          <Pressable accessibilityRole="button" style={({ pressed }) => [styles.footerCta, pressed && styles.pressed]}>
            <Text style={styles.footerCtaLabel}>ADD TO PASS</Text>
          </Pressable>
        </View>
      }
    >
      {/* Hero: a 135° base gradient with a 180° scrim fading into the page. */}
      <Gradient
        colors={['#2A1113', '#151517', colors.bg]}
        locations={[0, 0.55, 1]}
        angle={ANGLE_135}
        style={[styles.hero, { paddingTop: padding.top, minHeight: padding.insetTop + 238 }]}
      >
        <DiagonalHatch />
        <Gradient
          colors={['rgba(10,10,11,0)', colors.bg]}
          locations={[0.3, 1]}
          angle={ANGLE_180}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        <View style={styles.heroTop}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Back"
            style={styles.backButton}
          >
            <Text style={styles.backChevron}>‹</Text>
          </Pressable>
          <View style={styles.tierTag}>
            <Text style={styles.tierTagLabel}>
              Event {t.eventNumber} · {t.tier}
            </Text>
          </View>
        </View>

        <View style={styles.heroBottom}>
          <Text style={styles.heroDate}>{t.dateRangeLong}</Text>
          <Text style={styles.heroTitle}>
            {t.nameLines[0]}
            {'\n'}
            {t.nameLines[1]}
          </Text>
          <Text style={styles.heroVenue}>{t.venue}</Text>
        </View>
      </Gradient>

      <View style={styles.body}>
        <View style={styles.detailTabs}>
          {DETAIL_TABS.map((tab, index) => {
            const active = index === 0;
            return (
              <View key={tab} style={[styles.detailTab, active && styles.detailTabActive]}>
                <Text style={[styles.detailTabLabel, active && styles.detailTabLabelActive]}>{tab}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.stats}>
          <StatCard label="Registered" value={String(t.registered)} />
          <StatCard label="Prize pool" value={t.prizePool} />
          <StatCard label="Points" value={t.pointsMultiplier} accent />
        </View>

        <View style={styles.entries}>
          {t.entries.map((entry) => {
            const button = ENTRY_BUTTON[entry.state];
            return (
              <Card key={entry.game.code} style={styles.entryCard}>
                <GameTile code={entry.game.code} size={46} radius={12} fontSize={18} />
                <View style={styles.entryBody}>
                  <Text style={styles.entryName}>{entry.game.name}</Text>
                  <Text style={styles.entryMeta}>{entry.meta}</Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${entry.cta} — ${entry.game.name}`}
                  style={({ pressed }) => [
                    styles.entryButton,
                    { backgroundColor: button.bg, borderColor: button.border },
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={[styles.entryButtonLabel, { color: button.fg }]}>{entry.cta}</Text>
                </Pressable>
              </Card>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <Card style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, accent && { color: colors.red }]}>{value}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: SCREEN.paddingHorizontal,
    paddingBottom: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between' },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: fills.glassSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backChevron: { fontFamily: fonts.body400, fontSize: 20, color: colors.text, lineHeight: 22 },
  tierTag: {
    height: 28,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.red,
    justifyContent: 'center',
  },
  tierTagLabel: {
    fontFamily: fonts.body700,
    fontSize: 11,
    letterSpacing: tracking(0.14, 11),
    textTransform: 'uppercase',
    color: colors.text,
  },
  heroBottom: { marginTop: 24 },
  heroDate: {
    fontFamily: fonts.body400,
    fontSize: 13,
    color: colors.steel,
    letterSpacing: tracking(0.1, 13),
    textTransform: 'uppercase',
  },
  heroTitle: {
    marginTop: 4,
    ...display(52, { lineHeight: leading(0.92, 52) }),
    color: colors.text,
  },
  heroVenue: { marginTop: 8, fontFamily: fonts.body400, fontSize: 14, color: colors.muted },

  body: { paddingHorizontal: SCREEN.paddingHorizontal },

  detailTabs: { flexDirection: 'row', gap: 24, borderBottomWidth: 1, borderBottomColor: borders.soft },
  detailTab: { paddingVertical: 10 },
  detailTabActive: { borderBottomWidth: 2, borderBottomColor: colors.red },
  detailTabLabel: { fontFamily: fonts.body500, fontSize: 15, color: colors.muted },
  detailTabLabelActive: { fontFamily: fonts.body700, color: colors.text },

  stats: { marginTop: 16, flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, borderRadius: 12, padding: 12 },
  statLabel: { ...statCaption, color: colors.muted },
  statValue: { ...displayBold(26, { lineHeight: leading(1.1, 26) }), color: colors.text },

  entries: { marginTop: 20, gap: 10 },
  entryCard: { padding: 14, flexDirection: 'row', alignItems: 'center', gap: 14 },
  entryBody: { flex: 1, minWidth: 0 },
  entryName: { fontFamily: fonts.body700, fontSize: 16, color: colors.text },
  entryMeta: { fontFamily: fonts.body400, fontSize: 13, color: colors.muted, marginTop: 2 },
  entryButton: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entryButtonLabel: { fontFamily: fonts.body700, fontSize: 13 },

  footer: {
    paddingTop: 12,
    paddingHorizontal: SCREEN.paddingHorizontal,
    backgroundColor: colors.chrome,
    borderTopWidth: 1,
    borderTopColor: borders.hairline,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footerLabel: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted },
  footerValue: { fontFamily: fonts.body700, fontSize: 15, color: colors.text },
  footerSpacer: { flex: 1 },
  footerCta: {
    height: 48,
    paddingHorizontal: 22,
    borderRadius: 12,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerCtaLabel: { ...displayBold(19, { tracking: tracking(0.08, 19) }), color: colors.text },

  pressed: { opacity: 0.85 },
});
