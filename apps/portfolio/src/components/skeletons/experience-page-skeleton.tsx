import { PageShell } from '@/components/page-shell';
import { PageHeaderSkeleton } from '@/components/skeletons/page-header-skeleton';
import { SkeletonBlock } from '@/components/skeletons/skeleton-block';

export function ExperiencePageSkeleton() {
  return (
    <PageShell>
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="status"
        aria-busy="true"
        aria-label="Loading experience"
      >
        <PageHeaderSkeleton />

        <div className="mx-auto max-w-5xl space-y-12">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass-surface rounded-2xl p-5 md:p-6">
              <div className="mb-4 flex gap-4">
                <SkeletonBlock rounded="lg" className="h-14 w-14 shrink-0" />
                <div className="min-w-0 flex-1 space-y-2">
                  <SkeletonBlock rounded="md" className="h-3 w-36" />
                  <SkeletonBlock rounded="md" className="h-6 w-full max-w-sm" />
                  <SkeletonBlock rounded="md" className="h-4 w-44" />
                </div>
              </div>
              <div className="space-y-2">
                <SkeletonBlock rounded="md" className="h-4 w-full" />
                <SkeletonBlock rounded="md" className="h-4 w-[95%]" />
                <SkeletonBlock rounded="md" className="h-4 w-[88%]" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <SkeletonBlock rounded="full" className="h-6 w-16" />
                <SkeletonBlock rounded="full" className="h-6 w-20" />
                <SkeletonBlock rounded="full" className="h-6 w-14" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
