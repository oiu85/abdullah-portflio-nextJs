'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { motionDuration, motionEase } from '@/lib/motion';

type HomeContentTransitionProps = {
  children: React.ReactNode;
};

/**
 * Subtle fade-in when streamed home content replaces the Suspense skeleton.
 * Respects reduced motion (no opacity tween).
 */
export function HomeContentTransition({ children }: HomeContentTransitionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: motionDuration.md,
        ease: motionEase.out,
      }}
    >
      {children}
    </motion.div>
  );
}
