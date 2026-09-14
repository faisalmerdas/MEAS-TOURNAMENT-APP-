import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ANGLE_135, ANGLE_150, Gradient } from '../../src/components/Gradient';
import { Screen } from '../../src/components/Screen';
import { RadialGlow } from '../../src/components/Texture';
import { Card, GameTile, SectionAction, SectionHeader, SectionHeading } from '../../src/components/ui';
import { formatPoints } from '../../src/data/derived';
import { gameRatings, passportQr, player, recentBadges, season } from '../../src/data/mock';
import { borders, colors, fills } from '../../src/theme/colors';
import { display, displayBold, fonts, statCaption, tracking } from '../../src/theme/typography';

const LOGO = require('../../assets/brand/meas-logo.jpg');

/** The QR block is a 5x5 grid; explicit rows keep the columns exact. */
const QR_COLUMNS = 5;
const qrRows = Array.from({ length: QR_COLUMNS }, (_, r) =>
  passportQr.slice(r * QR_COLUMNS, (r + 1) * QR_COLUMNS),
);

/** Recent-badge tile tones. */
const BADGE_TONE = {
  red: { bg: colors.red, fg: colors.white },
  steel: { bg: colors.surfaceRaised, fg: colors.steel },
  gold: { bg: colors.surfaceRaised, fg: colors.gold },
} as const;

/** 05 · Player Passport */
export default function PassportScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>PASSPORT</Text>
        <SectionAction>Share</SectionAction>
      </View>

      <Gradient
        colors={['#26262C', '#141416', '#0F0F11']}
        locations={[0, 0.6, 1]}
        angle={ANGLE_150}
        style={styles.passport}
      >
        {/* radial-gradient(circle, rgba(224,32,42,.35), transparent 70%) */}
        <RadialGlow size={220} color={colors.red} opacity={0.35} style={styles.passportGlow} />

        <View style={styles.passportTop}>
          <View>
            <Text style={styles.passportIdLabel}>MEAS Player ID</Text>
            <Text style={styles.passportId}>{player.id}</Text>
          </View>
          <Image source={LOGO} style={styles.passportLogo} contentFit="cover" />
        </View>

        <View style={styles.passportIdentity}>
          <Gradient colors={['#3A3A42', '#1C1C20']} angle={ANGLE_135} style={styles.passportAvatar} />
          <View style={styles.passportIdentityBody}>
            <Text style={styles.passportTag}>{player.gamertag}</Text>
            <Text style={styles.passportName}>
              {player.fullName} · {player.city}
            </Text>
            <View style={styles.passportTags}>
              <View style={[styles.passportChip, { backgroundColor: colors.red }]}>
                <Text style={styles.passportChipLabel}>Season {season.year}</Text>
              </View>
              <View style={[styles.passportChip, { backgroundColor: fills.glassSoft }]}>
                <Text style={styles.passportChipLabel}>Since {player.memberSince}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.passportFooter}>
          <View style={styles.passportStats}>
            <PassportStat value={`#${player.seasonRank}`} label="Overall" />
            <PassportStat value={formatPoints(player.seasonPoints)} label="Points" />
            <PassportStat value={String(player.eventsPlayed)} label="Events" />
          </View>
          <View style={styles.qr}>
            {qrRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.qrRow}>
                {row.map((on, cellIndex) => (
                  <View
                    key={cellIndex}
                    style={[styles.qrCell, on && styles.qrCellOn]}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </Gradient>

      <SectionHeading style={styles.section}>GAME RATINGS</SectionHeading>
      <View style={styles.ratings}>
        {gameRatings.map((rating) => (
          <Card key={rating.game.code} style={styles.ratingCard}>
            <GameTile code={rating.game.code} size={40} radius={10} fontSize={15} />
            <View style={styles.ratingBody}>
              <Text style={styles.ratingName}>{rating.game.name}</Text>
              <Text style={styles.ratingRecord}>{rating.record}</Text>
            </View>
            <View style={styles.ratingScore}>
              <Text style={styles.ratingRank}>{rating.rank}</Text>
              <Text style={styles.ratingTier}>{rating.tier}</Text>
            </View>
          </Card>
        ))}
      </View>

      <SectionHeader
        title="RECENT BADGES"
        action="Trophy Room →"
        onActionPress={() => router.push('/trophy-room')}
        style={styles.section}
      />
      <View style={styles.badges}>
        {recentBadges.map((badge) => {
          const tone = BADGE_TONE[badge.tone];
          return (
            <View key={badge.glyph} style={[styles.badge, { backgroundColor: tone.bg }]}>
              <Text style={[styles.badgeGlyph, { color: tone.fg }]}>{badge.glyph}</Text>
            </View>
          );
        })}
      </View>
    </Screen>
  );
}

function PassportStat({ value, label }: { value: string; label: string }) {
  return (
    <View>
      <Text style={styles.passportStatValue}>{value}</Text>
      <Text style={styles.passportStatLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { ...display(34), color: colors.text },
  section: { marginTop: 24 },

  passport: {
    marginTop: 18,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: borders.strong,
    overflow: 'hidden',
  },
  passportGlow: { position: 'absolute', right: -40, bottom: -60 },
  passportTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  passportIdLabel: {
    fontFamily: fonts.body400,
    fontSize: 11,
    letterSpacing: tracking(0.16, 11),
    textTransform: 'uppercase',
    color: colors.steel,
  },
  passportId: { ...displayBold(26, { tracking: tracking(0.06, 26) }), color: colors.text, marginTop: 2 },
  passportLogo: { width: 40, height: 40, borderRadius: 10 },

  passportIdentity: { marginTop: 22, flexDirection: 'row', gap: 16, alignItems: 'center' },
  passportAvatar: {
    width: 84,
    height: 84,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: borders.boldest,
  },
  passportIdentityBody: { flex: 1, minWidth: 0 },
  passportTag: { ...display(40), color: colors.text },
  passportName: { fontFamily: fonts.body400, fontSize: 14, color: colors.steel, marginTop: 2 },
  passportTags: { marginTop: 8, flexDirection: 'row', gap: 6 },
  passportChip: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6 },
  passportChipLabel: {
    fontFamily: fonts.body700,
    fontSize: 11,
    letterSpacing: tracking(0.1, 11),
    textTransform: 'uppercase',
    color: colors.text,
  },

  passportFooter: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  passportStats: { flexDirection: 'row', gap: 22 },
  passportStatValue: { ...displayBold(28), color: colors.text },
  passportStatLabel: { ...statCaption, color: colors.muted },

  /* 64pt tile, 6pt padding, a 5-column grid with 2pt gaps. */
  qr: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: colors.text,
    padding: 6,
    gap: 2,
  },
  qrRow: { flex: 1, flexDirection: 'row', gap: 2 },
  qrCell: { flex: 1 },
  qrCellOn: { backgroundColor: colors.bg },

  ratings: { marginTop: 12, gap: 8 },
  ratingCard: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingBody: { flex: 1 },
  ratingName: { fontFamily: fonts.body600, fontSize: 15, color: colors.text },
  ratingRecord: { fontFamily: fonts.body400, fontSize: 12, color: colors.muted, marginTop: 2 },
  ratingScore: { alignItems: 'flex-end' },
  ratingRank: { ...displayBold(22), color: colors.text },
  ratingTier: {
    fontFamily: fonts.body400,
    fontSize: 11,
    color: colors.muted,
    letterSpacing: tracking(0.08, 11),
  },

  badges: { marginTop: 12, flexDirection: 'row', gap: 10 },
  badge: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: borders.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeGlyph: { ...display(20) },
});
