/**
 * Every value below is transcribed from the `renderVals()` block at the bottom
 * of `MEAS Tournaments App.dc.html`. Swap this module for an API client and the
 * screens need no changes.
 */
import type {
  Badge,
  Challenge,
  ChampionshipRace,
  CountdownPart,
  FeaturedBadge,
  Game,
  GameChoice,
  GameRating,
  MatchCall,
  Player,
  RankingRow,
  RankingTab,
  Rival,
  Season,
  TimelineItem,
  Tournament,
} from './types';

export const GAMES: Record<string, Game> = {
  tekken: { code: 'T8', name: 'Tekken 8' },
  pokemon: { code: 'PT', name: 'Pokémon TCG' },
  onePiece: { code: 'OP', name: 'One Piece TCG' },
  eafc: { code: 'FC', name: 'EA FC 26' },
  smash: { code: 'SU', name: 'Smash Ultimate' },
};

export const player: Player = {
  id: 'MEAS-04821',
  gamertag: 'RYN',
  fullName: 'Rayan Al-Sayed',
  city: 'Riyadh',
  memberSince: 2024,
  seasonRank: 14,
  seasonPoints: 1240,
  eventsPlayed: 6,
};

/** Onboarding — `gameChips`. */
export const gameChoices: GameChoice[] = [
  { game: GAMES.tekken, selected: true },
  { game: GAMES.pokemon, selected: true },
  { game: GAMES.onePiece, selected: false },
  { game: GAMES.eafc, selected: false },
  { game: GAMES.smash, selected: false },
];

export const homeRegion = 'Riyadh, Saudi Arabia';

/** Home — `countdown`. */
export const countdown: CountdownPart[] = [
  { value: '19', label: 'days' },
  { value: '06', label: 'hrs' },
  { value: '42', label: 'min' },
];

/** Home — the live-match strip on the red hero card. */
export const liveMatch = {
  eventName: 'MEAS Open Riyadh',
  headline: 'TEKKEN 8 · ROUND 3',
  detail: 'vs KAZUYA_MO · Station 12 · called 2 min ago',
} as const;

/** Home — `homeChallenges`, the first two of the full challenge list. */
export const homeChallengeIds = ['five-events', 'bracket-breaker'] as const;

/** Home — the last completed result card. */
export const lastResult = {
  event: 'JPEX Dubai · Tekken 8',
  placement: 'Top 8 · 5th',
  points: '+180',
} as const;

/** Tournament page — `tournamentGames` plus the hero and stat row. */
export const featuredTournament: Tournament = {
  id: 'open-riyadh-2026',
  name: 'MEAS Open Riyadh 2026',
  nameLines: ['MEAS OPEN', 'RIYADH 2026'],
  shortNameLines: ['MEAS OPEN', 'RIYADH'],
  tier: 'Major',
  eventNumber: 6,
  dateRange: 'Sat 3 – Sun 4 Oct',
  dateRangeLong: 'Sat 3 – Sun 4 October',
  venue: 'Riyadh Front Exhibition Centre · Hall 3',
  venueShort: 'Riyadh Front',
  registered: 412,
  prizePool: 'SAR 60K',
  pointsMultiplier: '1.5×',
  passSummary: '2 games · Sat + Sun',
  entries: [
    { game: GAMES.tekken, meta: 'Sat 11:00 · 128 cap · 96 in', state: 'in-pass', cta: 'In pass' },
    { game: GAMES.pokemon, meta: 'Sat 14:00 · Swiss + Top 8 · 71 in', state: 'in-pass', cta: 'In pass' },
    { game: GAMES.onePiece, meta: 'Sun 10:00 · Swiss · 54 in', state: 'open', cta: 'Add' },
    { game: GAMES.eafc, meta: 'Sun 12:00 · 64 cap · 63 in', state: 'almost-full', cta: '1 left' },
    { game: GAMES.smash, meta: 'Sun 15:00 · 96 cap · 80 in', state: 'open', cta: 'Add' },
  ],
};

/** Every tournament the app knows about, keyed by id. */
export const tournaments: Record<string, Tournament> = {
  [featuredTournament.id]: featuredTournament,
};

/**
 * Resolves a tournament route parameter. Only one tournament exists in the mock,
 * so an unknown id falls back to it rather than failing the screen.
 */
export const tournamentById = (id?: string): Tournament =>
  (id ? tournaments[id] : undefined) ?? featuredTournament;

/** Event Mode — the called-match card. */
export const matchCall: MatchCall = {
  opponent: 'KAZUYA_MO',
  opponentSeed: 6,
  playerSeed: 11,
  game: 'Tekken 8',
  round: 'Winners R3',
  station: '12',
  format: 'FT2',
  reportIn: '08:14',
};

export const eventModeHeader = {
  title: 'MEAS OPEN RIYADH · DAY 1',
  checkedInAt: '09:42',
} as const;

/** Event Mode — `eventTimeline`. */
export const eventTimeline: TimelineItem[] = [
  { time: '09:42', title: 'Checked in · Hall 3', subtitle: 'Badge scanned at gate B', state: 'done' },
  { time: '11:00', title: 'Tekken 8 · Pools', subtitle: 'Won R1 2–0 · Won R2 2–1', state: 'done' },
  { time: 'Now', title: 'Winners R3 · Station 12', subtitle: 'vs KAZUYA_MO', state: 'now' },
  { time: '14:00', title: 'Pokémon TCG · Round 1', subtitle: 'Table assignment posted 13:45', state: 'upcoming' },
  { time: '18:30', title: 'Tekken 8 · Top 8', subtitle: 'Main stage · if you make it', state: 'upcoming' },
];

/** Passport — `ratings`. */
export const gameRatings: GameRating[] = [
  { game: GAMES.tekken, record: '38–14 sets · 6 events', rank: '#9', tier: 'CONTENDER' },
  { game: GAMES.pokemon, record: '21–17 matches · 4 events', rank: '#41', tier: 'RISING' },
  { game: GAMES.eafc, record: '6–6 · 1 event', rank: '#88', tier: 'OPEN' },
];

/** Passport — `recentBadges`. The star is the one gold glyph in the set. */
export const recentBadges = [
  { glyph: 'T8', tone: 'red' },
  { glyph: 'JPX', tone: 'steel' },
  { glyph: '5', tone: 'steel' },
  { glyph: '★', tone: 'gold' },
] as const;

/** Passport — the QR block, drawn as a 5x5 on/off grid. */
export const passportQr: boolean[] = [
  true, true, false, true, true,
  true, false, true, false, true,
  false, true, true, true, false,
  true, false, true, false, true,
  true, true, false, true, true,
];

/** Rankings — `rankTabs`. */
export const rankingTabs: RankingTab[] = [
  { id: 'overall', label: 'Overall' },
  { id: 't8', label: 'Tekken 8' },
  { id: 'ptcg', label: 'Pokémon TCG' },
  { id: 'op', label: 'One Piece' },
];

/** Rankings — the three podium places. */
export const podium = [
  { position: 2, gamertag: 'NOURA_X', points: '1,980 pts' },
  { position: 1, gamertag: 'OMAR.GG', points: '2,310 pts' },
  { position: 3, gamertag: 'SAIF_TK', points: '1,870 pts' },
] as const;

/** Rankings — `rankRows`, positions 4 through 9. */
export const rankingRows: RankingRow[] = [
  { position: 4, gamertag: 'LAYLA.V', meta: 'PTCG #1 · Dubai', points: '1,790', movement: 1 },
  { position: 5, gamertag: 'KAZUYA_MO', meta: 'Tekken 8 #6 · Jeddah', points: '1,450', movement: -2 },
  { position: 6, gamertag: 'HMD_FC', meta: 'EA FC #2 · Doha', points: '1,410', movement: 4 },
  { position: 7, gamertag: 'ZED', meta: 'Smash #1 · Manama', points: '1,380', movement: 0 },
  { position: 8, gamertag: 'MARWAN', meta: 'One Piece #3 · Riyadh', points: '1,300', movement: 2 },
  { position: 9, gamertag: 'TARIQ_OP', meta: 'One Piece #5 · Kuwait', points: '1,270', movement: -1 },
];

/** Rankings — the pinned "you" row above the tab bar. */
export const playerRankingRow = {
  position: 14,
  meta: 'Tekken 8 #9 · PTCG #41',
  points: '1,240',
  movement: 3,
} as const;

/** Season overview — `seasonEvents` and the ten progress dots. */
export const season: Season = {
  year: 2026,
  range: 'Jan – Dec',
  eventsPlayed: 6,
  eventsTotal: 10,
  events: [
    { id: 'opener', month: 'Jan', day: '18', name: 'Season Opener', tier: 'Regional', subtitle: 'Jeddah · Tekken 8 · 9th', points: '+120', pointsLabel: 'earned', state: 'played' },
    { id: 'doha', month: 'Feb', day: '22', name: 'MEAS Cup Doha', tier: 'Regional', subtitle: 'PTCG 17th · Tekken 8 13th', points: '+140', pointsLabel: 'earned', state: 'played' },
    { id: 'spring', month: 'Apr', day: '05', name: 'Spring Major', tier: 'Major', subtitle: 'Riyadh · Tekken 8 · 7th', points: '+300', pointsLabel: 'earned', state: 'played' },
    { id: 'manama', month: 'May', day: '17', name: 'Manama Open', tier: 'Regional', subtitle: 'PTCG 9th', points: '+180', pointsLabel: 'earned', state: 'played' },
    { id: 'kuwait', month: 'Jun', day: '28', name: 'Kuwait Clash', tier: 'Regional', subtitle: 'EA FC 21st · Tekken 8 17th', points: '+120', pointsLabel: 'earned', state: 'played' },
    { id: 'jpex', month: 'Sep', day: '13', name: 'JPEX Dubai', tier: 'Major', subtitle: 'Tekken 8 · Top 8 · 5th', points: '+380', pointsLabel: 'earned', state: 'played' },
    { id: 'riyadh', month: 'Oct', day: '03', name: 'MEAS Open Riyadh', tier: 'Major', subtitle: 'Registered · 2 games', points: '≤450', pointsLabel: 'available', state: 'registered', tournamentId: 'open-riyadh-2026' },
    { id: 'abudhabi', month: 'Oct', day: '31', name: 'Abu Dhabi Showdown', tier: 'Regional', subtitle: 'Registration opens 6 Oct', points: '≤300', pointsLabel: 'available', state: 'upcoming' },
    { id: 'muscat', month: 'Nov', day: '21', name: 'Muscat Finale', tier: 'Regional', subtitle: 'Last points event', points: '≤300', pointsLabel: 'available', state: 'upcoming' },
    { id: 'championship', month: 'Dec', day: '12', name: 'MEAS Championship', tier: 'Invite', subtitle: 'Top 32 per game · Riyadh', points: '—', pointsLabel: 'finals', state: 'finals' },
  ],
};

/** Trophy Room — the newest-badge hero. */
export const featuredBadge: FeaturedBadge = {
  glyph: 'T8',
  eyebrow: 'Newest · JPEX Dubai',
  title: 'TOP 8 FINISHER',
  subtitle: 'Tekken 8 · 14 Sep 2026',
};

/**
 * The design states "11 / 28 earned" as a literal, which stops matching the
 * moment the `qualified` flag lights the twelfth tile. `trophyRoomTotals()`
 * counts the badge lists instead.
 *
 * `total` stays 28 because the design shows only 16 of the season's badges;
 * the remaining twelve are not drawn.
 */
export const TROPHY_BADGE_TOTAL = 28;

export const trophyRoomTotals = (qualified: boolean) => ({
  earned: [...eventBadges, ...performanceBadges(qualified)].filter((b) => b.earned).length,
  total: TROPHY_BADGE_TOTAL,
});

/** Trophy Room — `eventBadges`. */
export const eventBadges: Badge[] = [
  { glyph: 'JAN', label: 'Opener 26', earned: true },
  { glyph: 'DOH', label: 'Doha Cup', earned: true },
  { glyph: 'SPR', label: 'Spring Major', earned: true },
  { glyph: 'MNM', label: 'Manama', earned: true },
  { glyph: 'KWT', label: 'Kuwait', earned: true },
  { glyph: 'JPX', label: 'JPEX Dubai', earned: true, featured: true },
  { glyph: 'RUH', label: 'Open Riyadh', earned: false },
  { glyph: 'AUH', label: 'Abu Dhabi', earned: false },
];

/**
 * Trophy Room — `perfBadges`. The last tile ('Qualified') tracks the
 * `qualified` flag, so it is built per-render.
 */
export const performanceBadges = (qualified: boolean): Badge[] => [
  { glyph: 'T8', label: 'Top 8', earned: true, featured: true },
  { glyph: '5', label: 'Five events', earned: true },
  { glyph: '★', label: 'Upset', earned: true },
  { glyph: 'S', label: 'Seed 16+', earned: true },
  { glyph: '2G', label: 'Two games', earned: true },
  { glyph: 'T1', label: 'Champion', earned: false },
  { glyph: '10', label: 'Full season', earned: false },
  { glyph: 'Q', label: 'Qualified', earned: qualified, featured: true },
];

/** Challenges — `challenges`. */
export const challenges: Challenge[] = [
  { id: 'five-events', icon: '5', title: 'Five events, one season', subtitle: 'Attend 5 of 10 season events', reward: 150, current: 6, target: 5, complete: true },
  { id: 'bracket-breaker', icon: 'W', title: 'Bracket breaker', subtitle: 'Beat a higher seed 3 times', reward: 200, current: 2, target: 3, complete: false },
  { id: 'double-duty', icon: '2G', title: 'Double duty', subtitle: 'Top 16 in two games at one event', reward: 250, current: 0, target: 1, complete: false },
  { id: 'settle-score', icon: 'R', title: 'Settle the score', subtitle: 'Beat your rival in a bracket set', reward: 100, current: 1, target: 1, complete: true },
  { id: 'major-player', icon: 'M', title: 'Major player', subtitle: 'Top 8 at any Major', reward: 300, current: 1, target: 1, complete: true },
  { id: 'ironman', icon: '10', title: 'Ironman', subtitle: 'Attend every event this season', reward: 500, current: 6, target: 10, complete: false },
];

/**
 * The Home screen shows the first two challenges with a shorter subtitle than
 * the Challenges screen uses.
 */
export const homeChallengeSubtitles: Record<string, string> = {
  'five-events': 'Attend 5 of 10 events',
  'bracket-breaker': 'Beat a higher seed 3 times',
};

/** Rivalry — `h2h` plus the header and the two summary tiles. */
export const rival: Rival = {
  gamertag: 'KAZUYA_MO',
  rank: '#6 · Tekken 8',
  setsWon: 4,
  setsLost: 3,
  nextMeeting: {
    likelihood: 'LIKELY',
    event: 'MEAS Open Riyadh · Winners R3',
    reason: 'Same bracket quarter · both seeded top 12',
  },
  pointsGap: -210,
  lastThree: ['W', 'W', 'L'],
  history: [
    { result: 'W', event: 'JPEX Dubai', round: 'Winners R4 · Sep 2026', score: '2–1' },
    { result: 'W', event: 'Kuwait Clash', round: 'Losers R3 · Jun 2026', score: '2–0' },
    { result: 'L', event: 'Spring Major', round: 'Winners QF · Apr 2026', score: '1–3' },
    { result: 'L', event: 'MEAS Cup Doha', round: 'Pools · Feb 2026', score: '0–2' },
    { result: 'W', event: 'Season Opener', round: 'Pools · Jan 2026', score: '2–1' },
  ],
};

export const playerRivalryRank = '#9 · Tekken 8';

/** Qualification — `qualPaths`, `remaining` and the race numbers. */
export const championshipRace: ChampionshipRace = {
  rank: 14,
  points: 1240,
  cutRank: 32,
  cutPoints: 890,
  leaderPoints: 2310,
  eventsRemaining: 4,
  dates: 'MEAS Championship · 12–13 Dec',
  paths: [
    { index: '1', title: 'Finish top 32 in season points', subtitle: null, state: 'ON TRACK' },
    { index: '2', title: 'Win a Major', subtitle: 'Auto-qualifies · Open Riyadh is the last one', state: 'OPEN' },
    { index: '3', title: 'Last Chance Qualifier', subtitle: 'Day 1 of the Championship · 8 spots', state: 'FALLBACK' },
  ],
  remaining: [
    { month: 'Oct', name: 'Open Riyadh', maxPoints: '450' },
    { month: 'Oct', name: 'Abu Dhabi', maxPoints: '300' },
    { month: 'Nov', name: 'Muscat', maxPoints: '300' },
    { month: 'Dec', name: 'LCQ', maxPoints: '—' },
  ],
};

/**
 * Qualification hero copy, which swaps entirely on the `qualified` flag —
 * `qualLabel` / `qualHeadline` / `qualSub` in the design.
 *
 * The design writes "SAFE BY 350 PTS" as a literal. It is the same margin the
 * Home card states, so it is passed in rather than repeated.
 */
export const qualificationCopy = (qualified: boolean, marginToCut: number) =>
  qualified
    ? {
        label: 'Status · Qualified',
        headline: "YOU'RE IN.",
        subtitle: `Top ${championshipRace.cutRank} locked after Muscat. See you in Riyadh, 12–13 December.`,
      }
    : {
        label: 'Status · On track',
        headline: `SAFE BY ${marginToCut} PTS`,
        subtitle: `Hold #${championshipRace.cutRank} or better through Muscat. One more Top 16 finish locks it mathematically.`,
      };
