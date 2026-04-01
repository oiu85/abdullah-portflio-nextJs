/**
 * Applies theme change with View Transitions API when supported (smooth root
 * cross-fade). Falls back to instant `setTheme`. Skips VT when reduced motion
 * is preferred.
 */
export function toggleThemeWithTransition(
  setTheme: (theme: string) => void,
  next: 'light' | 'dark'
): void {
  if (typeof document === 'undefined') {
    setTheme(next);
    return;
  }

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  const doc = document as Document & {
    startViewTransition?: (callback: () => void) => unknown;
  };

  if (!reduceMotion && typeof doc.startViewTransition === 'function') {
    doc.startViewTransition(() => {
      setTheme(next);
    });
  } else {
    setTheme(next);
  }
}
