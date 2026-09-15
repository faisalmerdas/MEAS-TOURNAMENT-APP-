import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { borders, colors } from '../theme/colors';
import { display, fonts, tracking } from '../theme/typography';

/**
 * Bottom sheet for the onboarding "Home region" field.
 *
 * The design draws the field but no picker, so this one is composed from the
 * app's own parts: the card surface, the hairline rule, the eyebrow label and
 * the display face for the title — nothing that isn't already on screen.
 */
export function RegionPicker({
  visible,
  regions,
  selected,
  onSelect,
  onClose,
}: {
  visible: boolean;
  regions: readonly string[];
  selected: string;
  onSelect: (region: string) => void;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />

        <View style={[styles.sheet, { paddingBottom: insets.bottom + 12 }]}>
          <View style={styles.handle} />
          <Text style={styles.eyebrow}>Home region</Text>
          <Text style={styles.title}>WHERE DO YOU PLAY?</Text>

          <ScrollView style={styles.list} bounces={false}>
            {regions.map((region, index) => {
              const on = region === selected;
              return (
                <Pressable
                  key={region}
                  onPress={() => {
                    onSelect(region);
                    onClose();
                  }}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: on }}
                  style={({ pressed }) => [
                    styles.row,
                    index > 0 && styles.rowRule,
                    pressed && styles.rowPressed,
                  ]}
                >
                  <Text style={[styles.rowLabel, on && styles.rowLabelOn]}>{region}</Text>
                  {on ? <View style={styles.rowMark} /> : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: borders.strong,
    paddingHorizontal: 20,
    paddingTop: 10,
    maxHeight: '72%',
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceInactive,
    marginBottom: 18,
  },
  eyebrow: {
    fontFamily: fonts.body400,
    fontSize: 12,
    letterSpacing: tracking(0.12, 12),
    textTransform: 'uppercase',
    color: colors.muted,
  },
  title: { marginTop: 4, ...display(28), color: colors.text },
  list: { marginTop: 14 },
  row: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowRule: { borderTopWidth: 1, borderTopColor: borders.hairline },
  rowPressed: { opacity: 0.6 },
  rowLabel: { fontFamily: fonts.body400, fontSize: 16, color: colors.text },
  rowLabelOn: { fontFamily: fonts.body600, color: colors.red },
  rowMark: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.red },
});
