import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppState } from '../state/AppState';
import { borders, colors } from '../theme/colors';
import { fonts } from '../theme/typography';

/**
 * Development-only stand-in for the two props the design canvas exposed
 * (`eventLive`, `qualified`), so both states of the Home hero, the Events tab
 * and the Qualification screen can be seen without a backend.
 *
 * Rendered only when `__DEV__` is set, so it never reaches a release build.
 */
export function DevToggles() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const { eventLive, qualified, setEventLive, setQualified } = useAppState();

  if (!__DEV__) return null;

  return (
    <View style={[styles.anchor, { bottom: insets.bottom + 92 }]} pointerEvents="box-none">
      {open ? (
        <View style={styles.panel}>
          <Row label="Event live" value={eventLive} onChange={setEventLive} />
          <Row label="Qualified" value={qualified} onChange={setQualified} />
        </View>
      ) : null}

      <Pressable
        onPress={() => setOpen((v) => !v)}
        accessibilityRole="button"
        accessibilityLabel="Toggle design states"
        style={styles.handle}
      >
        <Text style={styles.handleLabel}>{open ? '×' : '⚙'}</Text>
      </Pressable>
    </View>
  );
}

function Row({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.surfaceInactive, true: colors.red }}
        thumbColor={colors.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  anchor: { position: 'absolute', left: 12, alignItems: 'flex-start', gap: 8 },
  panel: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: borders.strong,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  rowLabel: { fontFamily: fonts.body600, fontSize: 13, color: colors.text },
  handle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: borders.strong,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.85,
  },
  handleLabel: { fontFamily: fonts.body600, fontSize: 15, color: colors.steel },
});
