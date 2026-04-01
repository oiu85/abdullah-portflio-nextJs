'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Subtle parallax + opacity drift on the editorial grid (respects reduced motion).
 */
export function PageBackdropMotion() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 48]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    reduceMotion ? [0.07, 0.07, 0.07] : [0.09, 0.06, 0.08]
  );

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 bg-grid-fade bg-grid will-change-transform"
      style={{ y, opacity }}
    />
  );
}
