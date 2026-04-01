'use client';

import { useReducedMotion } from 'framer-motion';

type ScaleOptions = {
  /** Default 1.02 */
  hover?: number;
  /** Default 0.98 */
  tap?: number;
};

/**
 * Framer Motion scale props that respect `prefers-reduced-motion`.
 */
export function useAccessibleMotionScale(options: ScaleOptions = {}) {
  const hover = options.hover ?? 1.02;
  const tap = options.tap ?? 0.98;
  const reduceMotion = useReducedMotion();

  return {
    whileHover: reduceMotion ? undefined : { scale: hover },
    whileTap: reduceMotion ? undefined : { scale: tap },
  };
}
