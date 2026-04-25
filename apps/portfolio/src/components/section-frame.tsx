import type { HTMLAttributes } from 'react';
import { cn } from '@portfolio/ui';

type SectionFrameProps = HTMLAttributes<HTMLDivElement>;

/**
 * Shared horizontal rhythm + max width for editorial pages and sections.
 */
export function SectionFrame({ children, className, ...props }: SectionFrameProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-editorial px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
