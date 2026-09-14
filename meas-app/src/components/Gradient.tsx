import { LinearGradient } from 'expo-linear-gradient';
import type { ComponentProps } from 'react';

/**
 * CSS gradient angles translated to the unit-square start/end points
 * `expo-linear-gradient` expects.
 *
 * A CSS angle is measured clockwise from "to top", so 0deg ends at the top,
 * 90deg at the right and 180deg at the bottom. Screen coordinates put y
 * downwards, which makes the end direction (sin θ, −cos θ).
 */
export function cssAngle(deg: number): { start: { x: number; y: number }; end: { x: number; y: number } } {
  const rad = (deg * Math.PI) / 180;
  const dx = Math.sin(rad);
  const dy = -Math.cos(rad);
  return {
    start: { x: 0.5 - dx / 2, y: 0.5 - dy / 2 },
    end: { x: 0.5 + dx / 2, y: 0.5 + dy / 2 },
  };
}

/** `linear-gradient(135deg, …)` — top-left to bottom-right. */
export const ANGLE_135 = { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } } as const;
/** `linear-gradient(150deg, …)` */
export const ANGLE_150 = cssAngle(150);
/** `linear-gradient(160deg, …)` */
export const ANGLE_160 = cssAngle(160);
/** `linear-gradient(180deg, …)` — straight down. */
export const ANGLE_180 = { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } } as const;
/** `linear-gradient(90deg, …)` — left to right. */
export const ANGLE_90 = { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } } as const;

type GradientProps = Omit<ComponentProps<typeof LinearGradient>, 'colors' | 'start' | 'end'> & {
  colors: readonly [string, string, ...string[]];
  angle: { start: { x: number; y: number }; end: { x: number; y: number } };
  locations?: readonly [number, number, ...number[]];
};

/** A `LinearGradient` addressed by CSS angle rather than by start/end points. */
export function Gradient({ colors, angle, locations, ...rest }: GradientProps) {
  return (
    <LinearGradient
      colors={colors as unknown as readonly [string, string, ...string[]]}
      locations={locations as unknown as readonly [number, number, ...number[]] | undefined}
      start={angle.start}
      end={angle.end}
      {...rest}
    />
  );
}
