/**
 * Domain types for the MEAS player app.
 *
 * The design prototype stored presentation (hex fills, bar widths) alongside
 * content in its `renderVals()` block. Here the data carries facts only and the
 * components derive the colours, so a real API can drop into `mock.ts`
 * unchanged.
 */

/** Short code used for a game's square tile — 'T8', 'PT', 'OP', 'FC', 'SU'. */
export type GameCode = 'T8' | 'PT' | 'OP' | 'FC' | 'SU';

export interface Game {
  code: GameCode;
  name: string;
}

export interface Player {
  id: string;
  gamertag: string;
  fullName: string;
  city: string;
  memberSince: number;
  seasonRank: number;
  seasonPoints: number;
  eventsPlayed: number;
}

/** A game the player has opted into on the onboarding screen. */
export interface GameChoice {
  game: Game;
  selected: boolean;
}

export interface CountdownPart {
  value: string;
  label: string;
}

/** One game's entry on a tournament page. */
export type TournamentEntryState = 'in-pass' | 'open' | 'almost-full';

export interface TournamentEntry {
  game: Game;
  /** e.g. 'Sat 11:00 · 128 cap · 96 in' */
  meta: string;
  state: TournamentEntryState;
  /** Button label: 'In pass', 'Add', '1 left'. */
  cta: string;
}

export interface Tournament {
  id: string;
  name: string;
  /** Rendered as two lines in the tournament hero. */
  nameLines: [string, string];
  /** The shorter two-line form the Home card uses. */
  shortNameLines: [string, string];
  tier: 'Major' | 'Regional' | 'Invite';
  eventNumber: number;
  dateRange: string;
  dateRangeLong: string;
  venue: string;
  /** Venue without the hall detail, for the Home card. */
  venueShort: string;
  registered: number;
  prizePool: string;
  pointsMultiplier: string;
  entries: TournamentEntry[];
  /** Summary of what the player has already added. */
  passSummary: string;
}

export type TimelineState = 'done' | 'now' | 'upcoming';

export interface TimelineItem {
  time: string;
  title: string;
  subtitle: string;
  state: TimelineState;
}

export interface MatchCall {
  opponent: string;
  opponentSeed: number;
  playerSeed: number;
  game: string;
  round: string;
  station: string;
  format: string;
  /** Countdown to report, mm:ss. */
  reportIn: string;
}

export interface GameRating {
  game: Game;
  /** e.g. '38–14 sets · 6 events' */
  record: string;
  rank: string;
  tier: string;
}

export interface Badge {
  glyph: string;
  label: string;
  earned: boolean;
  /** Earned *and* highlighted — filled red rather than steel. */
  featured?: boolean;
}

export interface FeaturedBadge {
  glyph: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface RankingRow {
  position: number;
  gamertag: string;
  meta: string;
  points: string;
  /** Positive rises, negative falls, zero is unchanged. */
  movement: number;
}

export interface RankingTab {
  id: string;
  label: string;
}

export type SeasonEventState = 'played' | 'registered' | 'upcoming' | 'finals';

export interface SeasonEvent {
  id: string;
  month: string;
  day: string;
  name: string;
  tier: 'Major' | 'Regional' | 'Invite';
  subtitle: string;
  /** '+380' when played, '≤450' when still available, '—' for the finals. */
  points: string;
  pointsLabel: 'earned' | 'available' | 'finals';
  state: SeasonEventState;
  /** Set when the row opens a tournament page. */
  tournamentId?: string;
}

export interface Challenge {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  reward: number;
  current: number;
  target: number;
  complete: boolean;
}

export type SetResult = 'W' | 'L';

export interface HeadToHeadSet {
  result: SetResult;
  event: string;
  round: string;
  score: string;
}

export interface Rival {
  gamertag: string;
  rank: string;
  setsWon: number;
  setsLost: number;
  nextMeeting: {
    likelihood: string;
    event: string;
    reason: string;
  };
  pointsGap: number;
  lastThree: SetResult[];
  history: HeadToHeadSet[];
}

export type QualificationPathState = 'ON TRACK' | 'DONE' | 'OPEN' | 'FALLBACK';

export interface QualificationPath {
  index: string;
  title: string;
  /** `null` when the screen builds the line from the race numbers. */
  subtitle: string | null;
  state: QualificationPathState;
}

export interface RemainingEvent {
  month: string;
  name: string;
  maxPoints: string;
}

export interface Season {
  year: number;
  range: string;
  eventsPlayed: number;
  eventsTotal: number;
  events: SeasonEvent[];
}

export interface ChampionshipRace {
  /** Player's current rank and points. */
  rank: number;
  points: number;
  /** The cut line. */
  cutRank: number;
  cutPoints: number;
  leaderPoints: number;
  eventsRemaining: number;
  dates: string;
  paths: QualificationPath[];
  remaining: RemainingEvent[];
}
