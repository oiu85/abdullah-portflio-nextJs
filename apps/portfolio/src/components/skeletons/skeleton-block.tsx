import { cn } from '@portfolio/ui';

type SkeletonBlockProps = {
  className?: string;
  /** Rounded style: line (default), pill, circle, or custom via className */
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
};

const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
} as const;

/**
 * Single shimmer block — uses global `.skeleton-base` + `.skeleton-shimmer`.
 */
export function SkeletonBlock({
  className,
  rounded = 'md',
}: SkeletonBlockProps) {
  return (
    <div
      className={cn(
        'skeleton-base skeleton-shimmer',
        rounded !== 'none' && roundedMap[rounded],
        className
      )}
      aria-hidden
    />
  );
}
