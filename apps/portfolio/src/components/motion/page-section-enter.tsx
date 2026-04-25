'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { motionDuration, motionEase } from '@/lib/motion';
import { cn } from '@portfolio/ui';

type PageSectionEnterProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds — stagger stacked sections on first paint. */
  delay?: number;
};

/**
 * Lightweight enter motion for a route segment (used inside pages that already
 * sit under root {@link PageTransition}).
 */
export function PageSectionEnter({
  children,
  className,
  delay = 0,
}: PageSectionEnterProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionDuration.md,
        ease: motionEase.out,
        delay: reduceMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
