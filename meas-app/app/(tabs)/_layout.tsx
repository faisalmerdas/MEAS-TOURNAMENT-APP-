import { Tabs } from 'expo-router/js-tabs';

import { MeasTabBar } from '../../src/components/TabBar';
import { colors } from '../../src/theme/colors';

/**
 * The four tabs the design draws in every bottom bar:
 * Home · Events · Rankings · Passport.
 *
 * The bar itself is fully custom (`MeasTabBar`) because the design pins the
 * player's own ranking row inside the same chrome on the Rankings tab.
 */
export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      tabBar={(props) => <MeasTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="events" options={{ title: 'Events' }} />
      <Tabs.Screen name="rankings" options={{ title: 'Rankings' }} />
      <Tabs.Screen name="passport" options={{ title: 'Passport' }} />
    </Tabs>
  );
}
