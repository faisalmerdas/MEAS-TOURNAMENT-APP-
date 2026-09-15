import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Screen, useScreenPadding } from '../src/components/Screen';
import { RegionPicker } from '../src/components/RegionPicker';
import { Chevron } from '../src/components/Texture';
import { gameChoices, homeRegion, homeRegions, player } from '../src/data/mock';
import { borders, colors } from '../src/theme/colors';
import { ONBOARDING } from '../src/theme/layout';
import { display, displayBold, fonts, leading, tracking } from '../src/theme/typography';

const LOGO = require('../assets/brand/meas-logo.jpg');

/**
 * 01 · Create Player ID
 *
 * `padding:76px 24px 44px` in the design; the 76 contains the status bar and
 * the 44 contains the home indicator, so both are inset-adjusted here.
 */
export default function OnboardingScreen() {
  const padding = useScreenPadding();
  const [gamertag, setGamertag] = useState(player.gamertag);
  const [region, setRegion] = useState<string>(homeRegion);
  const [pickingRegion, setPickingRegion] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(gameChoices.filter((c) => c.selected).map((c) => c.game.code)),
  );

  const toggleGame = (code: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  return (
    <Screen
      variant="bare"
      contentStyle={[
        styles.content,
        {
          paddingTop: padding.topOnboarding,
          paddingBottom: padding.insetBottom + ONBOARDING.paddingBottom,
        },
      ]}
    >
      <View style={styles.brand}>
        <Image source={LOGO} style={styles.logo} contentFit="cover" />
        <Text style={styles.brandName}>MEAS TOURNAMENTS</Text>
      </View>

      <Text style={styles.headline}>
        {'YOUR\nPLAYER ID\n'}
        <Text style={styles.headlineAccent}>STARTS HERE.</Text>
      </Text>

      <Text style={styles.intro}>
        One ID across every MEAS event. Your results, rank and badges follow you all season.
      </Text>

      <View style={styles.fields}>
        <View>
          <Text style={styles.fieldLabel}>Gamertag</Text>
          <View style={styles.field}>
            <TextInput
              value={gamertag}
              onChangeText={setGamertag}
              style={styles.fieldInput}
              placeholder="Pick a tag"
              placeholderTextColor={colors.muted}
              selectionColor={colors.red}
              cursorColor={colors.red}
              autoCapitalize="characters"
              autoCorrect={false}
              maxLength={16}
            />
          </View>
        </View>

        <View>
          <Text style={styles.fieldLabel}>Games you compete in</Text>
          <View style={styles.chips}>
            {gameChoices.map(({ game }) => {
              const on = selected.has(game.code);
              return (
                <Pressable
                  key={game.code}
                  onPress={() => toggleGame(game.code)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: on }}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: on ? colors.red : colors.surface,
                      borderColor: on ? colors.red : borders.strong,
                    },
                  ]}
                >
                  <Text style={[styles.chipLabel, { color: on ? colors.white : colors.steel }]}>
                    {game.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View>
          <Text style={styles.fieldLabel}>Home region</Text>
          <Pressable
            onPress={() => setPickingRegion(true)}
            accessibilityRole="button"
            accessibilityLabel={`Home region, ${region}`}
            style={({ pressed }) => [styles.field, styles.fieldRow, pressed && styles.pressed]}
          >
            <Text style={styles.fieldValue}>{region}</Text>
            <Chevron size={14} color={colors.muted} />
          </Pressable>
        </View>
      </View>

      <RegionPicker
        visible={pickingRegion}
        regions={homeRegions}
        selected={region}
        onSelect={setRegion}
        onClose={() => setPickingRegion(false)}
      />

      <View style={styles.spacer} />

      <Pressable
        onPress={() => router.replace('/home')}
        accessibilityRole="button"
        style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
      >
        <Text style={styles.ctaLabel}>GENERATE PLAYER ID</Text>
      </Pressable>

      <Text style={styles.footnote}>
        Already registered at an event?{' '}
        <Text style={styles.footnoteLink} onPress={() => router.replace('/home')}>
          Claim your ID
        </Text>
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // `flexGrow:1` keeps the design's spacer-driven layout while still allowing
  // the form to scroll on shorter devices than the 874pt design frame.
  content: { flexGrow: 1, paddingHorizontal: ONBOARDING.paddingHorizontal },

  brand: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: { width: 40, height: 40, borderRadius: 10 },
  brandName: {
    ...displayBold(18, { tracking: tracking(0.14, 18) }),
    color: colors.steel,
  },

  headline: {
    marginTop: 40,
    ...display(56, { tracking: tracking(0.01, 56), lineHeight: leading(0.92, 56) }),
    color: colors.text,
  },
  headlineAccent: { color: colors.red },

  intro: {
    marginTop: 14,
    fontFamily: fonts.body400,
    fontSize: 15,
    lineHeight: leading(1.45, 15),
    color: colors.muted,
  },

  fields: { marginTop: 32, gap: 18 },
  fieldLabel: {
    fontFamily: fonts.body400,
    fontSize: 12,
    letterSpacing: tracking(0.12, 12),
    textTransform: 'uppercase',
    color: colors.muted,
    marginBottom: 8,
  },
  field: {
    height: 52,
    borderWidth: 1,
    borderColor: borders.strong,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  fieldRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  fieldInput: {
    fontFamily: fonts.body600,
    fontSize: 17,
    color: colors.text,
    padding: 0,
  },
  fieldValue: { fontFamily: fonts.body400, fontSize: 16, color: colors.text },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipLabel: { fontFamily: fonts.body600, fontSize: 14 },

  spacer: { flex: 1, minHeight: 32 },

  cta: {
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: {
    ...displayBold(22, { tracking: tracking(0.08, 22) }),
    color: colors.white,
  },
  pressed: { opacity: 0.85 },

  footnote: {
    textAlign: 'center',
    fontFamily: fonts.body400,
    fontSize: 13,
    color: colors.muted,
    marginTop: 14,
  },
  footnoteLink: { fontFamily: fonts.body600, color: colors.text },
});
