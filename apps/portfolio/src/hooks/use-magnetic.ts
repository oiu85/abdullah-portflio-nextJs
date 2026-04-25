'use client';

import { useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/**
 * Subtle pointer-follow for CTAs (desktop). Uses transform only; no state → no rerenders.
 */
export function useMagnetic(strength = 1) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !ref.current) return;
      const el = ref.current;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      const x = clamp(nx * 14 * strength, -12, 12);
      const y = clamp(ny * 10 * strength, -10, 10);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    [reduceMotion, strength]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate3d(0,0,0)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
