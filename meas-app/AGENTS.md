# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

Expo Router 57 vendors React Navigation rather than depending on it, so imports
come from the router's own entry points, not from `@react-navigation/*`:

```ts
import { Stack } from 'expo-router/stack';
import { Tabs, type BottomTabBarProps } from 'expo-router/js-tabs';
```
