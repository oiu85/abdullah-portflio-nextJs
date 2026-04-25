/**
 * Route-level template segment (Next.js App Router).
 * Page enter/exit motion is implemented in {@link PageTransition} inside
 * `layout.tsx` because this file’s subtree remounts on navigation, which would
 * break `AnimatePresence` exit animations if placed here.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return children;
}
