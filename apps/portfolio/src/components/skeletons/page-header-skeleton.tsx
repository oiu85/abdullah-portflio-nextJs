import { cn } from '@portfolio/ui';
import { SkeletonBlock } from '@/components/skeletons/skeleton-block';

type PageHeaderSkeletonProps = {
  /** Matches `PageHeader` max width (e.g. `max-w-4xl` for About). */
  maxWidthClassName?: string;
  className?: string;
};

/**
 * Mirrors `PageHeader` rhythm: hairline, title, two-line lead.
 */
export function PageHeaderSkeleton({
  maxWidthClassName = 'max-w-3xl',
  className,
}: PageHeaderSkeletonProps) {
  return (
    <div
      className={cn('mx-auto mb-16 text-center', maxWidthClassName, className)}
    >
      <div className="mx-auto mb-5 flex justify-center">
        <SkeletonBlock rounded="full" className="h-1 w-12 md:w-16" />
      </div>
      <SkeletonBlock
        rounded="lg"
        className="mx-auto mb-4 h-10 w-64 max-w-[90%] md:h-12"
      />
      <div className="mx-auto flex max-w-2xl flex-col gap-2">
        <SkeletonBlock rounded="md" className="h-5 w-full" />
        <SkeletonBlock rounded="md" className="h-5 w-[88%] mx-auto" />
      </div>
    </div>
  );
}
