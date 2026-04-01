'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Document scroll progress (top hairline). Stays **below** the fixed header in
 * visual terms for the bar itself (2px) and uses `pointer-events-none` so the
 * navbar remains fully interactive.
 *
 * The previous full-width `h-12` route-transition overlay used `z-[99]` and sat
 * above the header (`z-50`), which hid the nav during loading — removed.
 */
export function NavigationProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-primary/80 via-primary to-primary/80"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
