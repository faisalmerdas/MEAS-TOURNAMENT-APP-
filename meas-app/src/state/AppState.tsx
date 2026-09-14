import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

/**
 * The two design-time props exposed by the prototype's canvas
 * (`data-props` on the `<script data-dc-script>` tag):
 *
 *   eventLive — swaps the Home hero between the red "live now" card and the
 *               grey "next event" countdown card, and decides whether the
 *               Events tab shows Event Mode or the season overview.
 *   qualified — swaps the Qualification hero between "on track" (red) and
 *               "you're in" (green), and lights the 'Qualified' trophy tile.
 *
 * In the app they become real state so the screens can be driven from a
 * backend later; `DevToggles` flips them by hand in development.
 */
interface AppState {
  eventLive: boolean;
  qualified: boolean;
  setEventLive: (value: boolean) => void;
  setQualified: (value: boolean) => void;
}

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [eventLive, setEventLive] = useState(false);
  const [qualified, setQualified] = useState(false);

  const value = useMemo<AppState>(
    () => ({ eventLive, qualified, setEventLive, setQualified }),
    [eventLive, qualified],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppState {
  const value = useContext(AppStateContext);
  if (!value) throw new Error('useAppState must be used inside <AppStateProvider>');
  return value;
}
