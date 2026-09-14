import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { display, fonts } from '../theme/typography';

/**
 * The 34pt display title each screen opens with, optionally paired with a muted
 * caption on the same bottom edge (`TROPHY ROOM` / `11 / 28 earned`).
 */
export function ScreenTitle({
  title,
  caption,
  eyebrow,
}: {
  title: string;
  caption?: string;
  eyebrow?: string;
}) {
  return (
    <View>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <View style={styles.row}>
        <Text style={[styles.title, eyebrow ? styles.titleWithEyebrow : null]}>{title}</Text>
        {caption ? <Text style={styles.caption}>{caption}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  title: { ...display(34), color: colors.text },
  titleWithEyebrow: { marginTop: 6 },
  eyebrow: {
    fontFamily: fonts.body700,
    fontSize: 12,
    letterSpacing: 1.68,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  caption: { fontFamily: fonts.body400, fontSize: 13, color: colors.muted },
});
