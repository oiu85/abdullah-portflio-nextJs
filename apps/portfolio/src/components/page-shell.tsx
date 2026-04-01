import { cn } from '@portfolio/ui';

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  /** Subtle editorial grid behind content (low opacity). */
  showGrid?: boolean;
};

/**
 * Shared page wrapper: top hairline, section rhythm, optional grid texture.
 */
export function PageShell({ children, className, showGrid = true }: PageShellProps) {
  return (
    <div className={cn('relative pb-section pt-24', className)}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent"
        aria-hidden
      />
      {showGrid ? (
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-grid-fade bg-grid opacity-[0.07] dark:opacity-[0.05]"
          aria-hidden
        />
      ) : null}
      {children}
    </div>
  );
}
