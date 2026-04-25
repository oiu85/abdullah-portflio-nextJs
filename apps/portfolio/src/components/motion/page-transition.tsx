'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { motionEase } from '@/lib/motion';

type PageTransitionProps = {
  children: React.ReactNode;
};

/**
 * Route segment transitions. Lives in root layout (not route template) so
 * AnimatePresence persists across navigations — Next.js remounts `template.tsx`
 * on each navigation, which would reset exit animations.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="min-h-0 w-full flex-1"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
        transition={{
          duration: 0.34,
          ease: motionEase.out,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
