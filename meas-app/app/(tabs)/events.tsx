import { EventMode } from '../../src/screens/EventMode';
import { SeasonOverview } from '../../src/screens/SeasonOverview';
import { useAppState } from '../../src/state/AppState';

/**
 * The Events tab.
 *
 * The design marks the Events tab active on screen 04 (Event Mode), which only
 * exists while the player is on site at a live event. The rest of the time the
 * tab shows the season overview (screen 07) — the same `eventLive` split the
 * Home hero uses.
 */
export default function EventsTab() {
  const { eventLive } = useAppState();
  return eventLive ? <EventMode /> : <SeasonOverview />;
}
