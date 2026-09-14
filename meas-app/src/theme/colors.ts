/**
 * Palette transcribed verbatim from `MEAS Tournaments App.dc.html`.
 * The design assigns most of these in its `renderVals()` block; the names here
 * match the shorthands used there (`red`, `steel`, `muted`, `s1`, `s2`).
 */
export const colors = {
  /** Screen background inside the device frame. */
  bg: '#0A0A0B',
  /** Chrome background — tab bar and the tournament action bar. */
  chrome: '#0E0E10',
  /** `s1` — the standard card fill. */
  surface: '#141416',
  /** `s2` — raised chips, badge tiles, inactive pills. */
  surfaceRaised: '#1C1C20',
  /** Unearned badge fill. */
  surfaceSunken: '#0F0F11',
  /** Inactive tab icon / timeline dot / empty season dot. */
  surfaceInactive: '#3A3A42',

  red: '#E0202A',
  redDark: '#8A1218',
  redDeep: '#3A0C0F',
  redTint: '#2A1113',

  text: '#F2F2F2',
  /** `steel` — secondary text and numerals. */
  steel: '#B9BCC4',
  /** `muted` — tertiary/label text. */
  muted: '#9A9AA3',
  /** Label colour for an unearned badge. */
  mutedDim: '#4A4A52',

  green: '#3DBE6E',
  greenLight: '#7FE0A8',
  greenDark: '#1B5E38',
  greenDeep: '#0E2A1B',

  gold: '#F2C230',
  bronze: '#7A5A3A',
  bronzeText: '#9A7A5A',

  white: '#FFFFFF',
  black: '#0A0A0B',

  /** Game-tile fills, from `tournamentGames` / `ratings`. */
  gameBlue: '#1E4FB8',
  gameGreen: '#0FA36B',

  pinkLight: '#FF8A90',
} as const;

/** Hairline and border values, kept as literal rgba strings to match the design. */
export const borders = {
  /** rgba(255,255,255,.06) — unearned badge edge. */
  faintest: 'rgba(255,255,255,0.06)',
  /** rgba(255,255,255,.08) — the default card edge. */
  hairline: 'rgba(255,255,255,0.08)',
  /** rgba(255,255,255,.1) */
  soft: 'rgba(255,255,255,0.1)',
  /** rgba(255,255,255,.12) */
  medium: 'rgba(255,255,255,0.12)',
  /** rgba(255,255,255,.14) — input fields, chips. */
  strong: 'rgba(255,255,255,0.14)',
  /** rgba(255,255,255,.16) — earned badge edge. */
  stronger: 'rgba(255,255,255,0.16)',
  /** rgba(255,255,255,.2) — dashed "add game" chip, passport avatar. */
  boldest: 'rgba(255,255,255,0.2)',

  redSoft: 'rgba(224,32,42,0.4)',
  redMedium: 'rgba(224,32,42,0.5)',
  greenSoft: 'rgba(61,190,110,0.4)',
  steelSoft: 'rgba(185,188,196,0.35)',
} as const;

/** Translucent fills used inside coloured cards. */
export const fills = {
  /** rgba(255,255,255,.06) — countdown tile. */
  glassFaint: 'rgba(255,255,255,0.06)',
  /** rgba(255,255,255,.08) — game chips on the next-event card. */
  glass: 'rgba(255,255,255,0.08)',
  /** rgba(255,255,255,.1) — back button, "Since 2024" tag. */
  glassSoft: 'rgba(255,255,255,0.1)',
  /** Track colour for every progress bar. */
  track: 'rgba(255,255,255,0.08)',

  redTint: 'rgba(224,32,42,0.15)',
  redWash: 'rgba(224,32,42,0.08)',
  redRing: 'rgba(224,32,42,0.18)',
  greenTint: 'rgba(61,190,110,0.15)',
  whiteText80: 'rgba(255,255,255,0.8)',
} as const;
