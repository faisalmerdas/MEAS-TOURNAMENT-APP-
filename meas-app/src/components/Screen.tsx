import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';
import { FRAME, SCREEN } from '../theme/layout';

/**
 * Translates the design's frame-relative paddings into device insets.
 *
 * The prototype draws into a fixed 402x874 frame, so `padding:70px 20px 20px`
 * already contains the 62pt status bar. On device that part comes from the safe
 * area instead.
 */
export function useScreenPadding() {
  const insets = useSafeAreaInsets();
  return {
    /** `70px` top → status bar + 8pt. */
    top: insets.top + SCREEN.paddingTop,
    /** `76px` top on onboarding → status bar + 14pt. */
    topOnboarding: insets.top + 14,
    /** `20px` bottom above a tab bar. */
    bottomTabbed: SCREEN.paddingBottom,
    /** `40px` bottom on a screen with no tab bar, 34pt of which is the indicator. */
    bottomStandalone: insets.bottom + (SCREEN.paddingBottomStandalone - FRAME.homeIndicator),
    /** Raw safe-area bottom, for bars that sit against the edge. */
    insetBottom: insets.bottom,
    insetTop: insets.top,
  };
}

interface ScreenProps {
  children: ReactNode;
  /**
   * `tabbed` — the screen sits above the tab bar (20pt of bottom padding).
   * `standalone` — pushed screen with no tab bar (40pt, inset-aware).
   * `bare` — no padding at all; the screen manages its own (tournament hero).
   */
  variant?: 'tabbed' | 'standalone' | 'bare';
  /** Rendered outside the scroll view, pinned to the bottom. */
  footer?: ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

/** The `height:100%;display:flex;flex-direction:column;background:#0A0A0B` wrapper. */
export function Screen({ children, variant = 'tabbed', footer, scroll = true, contentStyle }: ScreenProps) {
  const padding = useScreenPadding();

  const contentPadding: ViewStyle =
    variant === 'bare'
      ? {}
      : {
          paddingTop: padding.top,
          paddingHorizontal: SCREEN.paddingHorizontal,
          paddingBottom: variant === 'tabbed' ? padding.bottomTabbed : padding.bottomStandalone,
        };

  const body = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[contentPadding, contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, contentPadding, contentStyle]}>{children}</View>
  );

  return (
    <View style={styles.root}>
      {body}
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
});
