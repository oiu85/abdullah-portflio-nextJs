/**
 * Motion design tokens — durations and easings used across the portfolio.
 * Keeps scroll reveals and interactions consistent (Stripe/Linear-style restraint).
 */

export const motionEase = {
  out: [0.16, 1, 0.3, 1] as const,
  outSoft: [0.22, 1, 0.36, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
} as const;

export const motionDuration = {
  xs: 0.2,
  sm: 0.35,
  md: 0.5,
  lg: 0.65,
  xl: 0.85,
} as const;

/** Snappy springs for buttons and small UI affordances. */
export const motionSpring = {
  snappy: { type: 'spring' as const, stiffness: 420, damping: 28 },
  soft: { type: 'spring' as const, stiffness: 280, damping: 32 },
} as const;

/**
 * Default viewport for whileInView — fire once as soon as any pixel intersects.
 * Avoid `amount` fractions on tall sections (e.g. multi-row grids): 25% of a
 * long grid can stay off-screen while the first row is visible, so content
 * never animates in until the user scrolls.
 */
export const defaultViewport = {
  once: true,
  amount: 'some' as const,
  margin: '0px',
} as const;
