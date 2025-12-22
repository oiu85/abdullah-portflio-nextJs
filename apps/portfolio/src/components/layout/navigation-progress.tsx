'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from '@portfolio/ui';

export function NavigationProgress() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // Detect when pathname is about to change (navigation started)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]');
      
      if (link && link.getAttribute('href')?.startsWith('/')) {
        const href = link.getAttribute('href');
        // Only show loading if navigating to a different route
        if (href && href !== pathname) {
          setIsNavigating(true);
        }
      }
    };

    // Listen for link clicks
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [pathname]);

  useEffect(() => {
    // Hide loading when pathname actually changes (navigation complete)
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-sm border-b border-border"
        >
          <div className="flex items-center justify-center h-16">
            <Spinner size="md" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

