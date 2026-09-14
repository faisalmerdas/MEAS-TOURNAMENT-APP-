import { challenges, championshipRace } from './mock';
import type { Challenge } from './types';

/** '1,240' — the design formats every points figure with a thousands separator. */
export const formatPoints = (points: number): string => points.toLocaleString('en-US');

/**
 * Championship race, as both the Home card and the Qualification screen draw it.
 *
 * NOTE — the prototype hardcodes 72% / 52% on the Home bar and 54% / 38% on the
 * Qualification bar for the same numbers. Only the second pair matches the data
 * (1,240 / 2,310 = 54%; 890 / 2,310 = 38%), so both screens derive from the data
 * here and the Home bar renders at 54% rather than the mock's 72%.
 */
export const raceProgress = () => {
  const { points, cutPoints, leaderPoints } = championshipRace;
  return {
    /** Fraction of the leader's total the player has earned. */
    fraction: points / leaderPoints,
    /** Where the top-32 cut line sits on the same scale. */
    cutFraction: cutPoints / leaderPoints,
    /** 'Safe by 350 pts' — how far clear of the cut the player is. */
    marginToCut: points - cutPoints,
  };
};

/** The challenges still in progress — the Home screen's "3 of 6". */
export const activeChallenges = (): Challenge[] => challenges.filter((c) => !c.complete);

export const challengeById = (id: string): Challenge => {
  const found = challenges.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown challenge: ${id}`);
  return found;
};

/** '6 / 5' while running, '6/5 ✓' once complete — the two forms in the design. */
export const challengeProgressLabel = (challenge: Challenge, compact = false): string => {
  const separator = compact ? '/' : ' / ';
  const base = `${challenge.current}${separator}${challenge.target}`;
  return challenge.complete && compact ? `${base} ✓` : base;
};

/**
 * Progress bar fill. The design floors an untouched challenge at 4% so the bar
 * still reads as a bar rather than an empty track.
 */
export const challengeFraction = (challenge: Challenge): number => {
  if (challenge.complete) return 1;
  if (challenge.target <= 0) return 0.04;
  const raw = challenge.current / challenge.target;
  return raw <= 0 ? 0.04 : Math.min(1, raw);
};
