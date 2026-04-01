import { cn } from '@portfolio/ui';
import { PageBackdropMotion } from '@/components/page-backdrop-motion';

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  /** Subtle editorial grid behind content (low opacity) + scroll parallax. */
  showGrid?: boolean;
};

/**
 * Shared page wrapper: top hairline, section rhythm, optional animated grid texture.
 */
export function PageShell({ children, className, showGrid = true }: PageShellProps) {
  return (
    <div className={cn('relative pb-section pt-24', className)}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-[11] overflow-hidden"
        aria-hidden
      >
        <div className="liquid-glass-layer" />
      </div>
      {showGrid ? <PageBackdropMotion /> : null}
      {children}
    </div>
  );
}
