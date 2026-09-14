# MEAS Tournaments — Player App

React Native (Expo) implementation of the 11-screen iOS design in
`../project/MEAS Tournaments App.dc.html`, exported from Claude Design.

## Running it

```bash
npm install
npm run ios        # iOS simulator (needs macOS + Xcode)
npm run android
npm run web        # react-native-web preview — layout only, see the caveat below
npm run typecheck
```

## Screens

The design's numbering, and where each screen lives:

| # | Design screen | Route | File |
|---|---|---|---|
| 01 | Create Player ID | `/` | `app/index.tsx` |
| 02 | Home | `/home` | `app/(tabs)/home.tsx` |
| 03 | Tournament page | `/tournament` | `app/tournament.tsx` |
| 04 | Event Mode | `/events` (when live) | `src/screens/EventMode.tsx` |
| 05 | Player Passport | `/passport` | `app/(tabs)/passport.tsx` |
| 06 | Rankings | `/rankings` | `app/(tabs)/rankings.tsx` |
| 07 | Season overview | `/events` (when not live) | `src/screens/SeasonOverview.tsx` |
| 08 | Trophy Room | `/trophy-room` | `app/trophy-room.tsx` |
| 09 | Challenges | `/challenges` | `app/challenges.tsx` |
| 10 | Rivalry | `/rivalry` | `app/rivalry.tsx` |
| 11 | Qualification | `/qualification` | `app/qualification.tsx` |

Four tabs — Home, Events, Rankings, Passport — matching the bar the design draws
on screens 02, 04, 05 and 06. The Events tab follows the design's own split: it
shows Event Mode while an event is live and the season overview otherwise.

The other screens are pushed onto the stack from the places that link to them —
the Home race card opens Qualification, the Passport's "Trophy Room →" opens the
Trophy Room, the Home challenge rows open Challenges, the Event Mode matchup
opens Rivalry, and the Home next-event card and season rows open the Tournament
page.

## Layout

```
app/                 routes (expo-router)
src/theme/           colours, typography and the frame→inset conversions
src/data/            types, mock data, derived values
src/state/           the eventLive / qualified flags
src/components/      shared primitives (cards, chips, gradients, textures)
src/screens/         screens that are not a route of their own
```

### Where the design lives in the code

* `src/theme/colors.ts` — every hex in the prototype, named after the shorthands
  its `renderVals()` block used (`red`, `steel`, `muted`, `s1`, `s2`).
* `src/theme/typography.ts` — the two font families plus `tracking()` and
  `leading()`, which convert the design's `em` and unitless CSS values into the
  points React Native wants. Every call site passes the original CSS number.
* `src/theme/layout.ts` — the design is drawn in a fixed 402x874 frame, so its
  paddings bake in the 62pt status bar and 34pt home indicator. This module
  splits them back out; `useScreenPadding()` in `src/components/Screen.tsx`
  re-adds the real safe-area insets.

### Swapping in a backend

`src/data/mock.ts` is the only module that holds content. It exports plain data
typed by `src/data/types.ts`; the components own every colour and dimension. To
go live, replace that module (or wrap it in a query layer) — no screen changes.

## Deliberate deviations from the prototype

Places where following the design to the letter would ship a bug:

1. **Home progress bar.** The prototype hardcodes 72% fill / 52% cut line on
   Home but 54% / 38% on Qualification, for the same three numbers. Only the
   second pair matches the data (1,240 / 2,310 = 54%; 890 / 2,310 = 38%), so
   both screens derive from the data in `src/data/derived.ts` and the Home bar
   renders at 54%.
2. **Rivalry gamertags.** "KAZUYA_MO" at the design's 26px measures 168pt in a
   120pt slot and runs clean off the right edge of the frame. The slot keeps its
   120pt so the row's geometry is unchanged; the name scales down to fit.
3. **Figures written as literals are computed.** The Qualification headline
   ("SAFE BY 350 PTS"), path 1's subtitle and the Trophy Room's "11 / 28 earned"
   are constants in the prototype that restate data shown elsewhere. They are
   derived, so they cannot drift — the Trophy Room count in particular was wrong
   the moment `qualified` lit a twelfth tile.
4. **The region field's caret.** The design uses `⌵` (U+2335), which most font
   families do not contain. It is drawn as SVG instead.
5. **Season overview gains a tab bar**, since it is a tab destination here. The
   design draws it without one.
6. **"He's ahead" reads "They're ahead"** on the Rivalry summary. A rival's
   pronouns are not part of the data model, so the copy stays neutral.

## Known placeholders

These are placeholders in the design itself, carried over as-is:

* **Tab bar icons** are the design's 22pt rounded squares. `src/components/TabBar.tsx`
  is the only file to change when a real icon set lands.
* **Avatars** are the design's gradient circles. `Avatar` in `src/components/ui.tsx`
  is the single place to swap in real images.
* **The passport QR block** is the design's decorative 5x5 pattern, not a
  scannable code.
* **The tournament page's Schedule / Venue / Rules tabs** have no designed pane,
  so the row is presentational. The Challenges screen's "This event" filter has
  no data behind it and shows an empty message.
* **Screens 08, 09 and 11 have no back control**, because the design draws none.
  They rely on the stack's edge-swipe and the Android back button.

## Design states

The prototype exposed two canvas props that swap whole sections:

* `eventLive` — the Home hero (red "live now" vs. the countdown card) and what
  the Events tab shows.
* `qualified` — the Qualification hero (red "on track" vs. green "you're in"),
  path 1's state chip, and the Trophy Room's "Qualified" tile.

Both are real state in `src/state/AppState.tsx`. In development a small ⚙ button
above the tab bar (`src/components/DevToggles.tsx`) flips them; it is compiled
out of release builds.

## Verification status

Typechecked, and the iOS and web bundles both build. Every screen was rendered
and checked through `react-native-web` in both states of the `eventLive` and
`qualified` flags, which is where the fixes above came from. The diagonal-hatch
SVG was measured against Chromium's own `repeating-linear-gradient` to confirm
the stripe angle and 18pt period match.

**No screen has been run on an iOS simulator or device.** react-native-web
approximates but does not reproduce native text metrics, shadows or safe-area
insets, so the first pass on a real device should pay attention to:

* the tight display leading (`line-height:.92`–`1`) on the stacked headlines in
  onboarding, the tournament hero and the Qualification hero;
* the safe-area padding at the top of every screen and under the tab bar;
* card shadows, which use iOS `shadowRadius` at roughly half the CSS blur.
