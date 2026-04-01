'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

/**
 * Document scroll progress (top bar) + lightweight route-transition hint.
 * Scroll progress uses spring smoothing to avoid jitter.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathnameRef = useRef(pathname);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]');

      if (link && link.getAttribute('href')?.startsWith('/')) {
        const href = link.getAttribute('href');
        if (href && href !== pathname && !href.includes('#')) {
          setIsNavigating(true);
        }
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname]);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      const timer = setTimeout(() => setIsNavigating(false), 220);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <>
      <motion.div
        className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-primary/90"
        style={{ scaleX }}
        aria-hidden
      />
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none fixed inset-x-0 top-0 z-[99] h-12 bg-gradient-to-b from-background/90 to-transparent backdrop-blur-[2px]"
            aria-hidden
          />
        )}
      </AnimatePresence>
    </>
  );
}
