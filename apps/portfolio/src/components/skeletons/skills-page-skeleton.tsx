import { PageShell } from '@/components/page-shell';
import { PageHeaderSkeleton } from '@/components/skeletons/page-header-skeleton';
import { SkeletonBlock } from '@/components/skeletons/skeleton-block';

function SkillsCategorySkeleton() {
  return (
    <div className="mb-10">
      <div className="mb-6 flex items-center gap-3">
        <SkeletonBlock rounded="full" className="h-1 w-10 md:w-14" />
        <SkeletonBlock rounded="md" className="h-7 w-48 md:h-8 md:w-64" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="glass-surface rounded-2xl p-4 md:p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <SkeletonBlock rounded="md" className="h-10 w-10 shrink-0" />
              <div className="min-w-0 flex-1 space-y-2">
                <SkeletonBlock rounded="md" className="h-4 w-3/4" />
                <SkeletonBlock rounded="md" className="h-2 w-full" />
              </div>
            </div>
            <SkeletonBlock rounded="full" className="h-2 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillsPageSkeleton() {
  return (
    <PageShell>
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="status"
        aria-busy="true"
        aria-label="Loading skills"
      >
        <PageHeaderSkeleton />

        <div className="mx-auto max-w-5xl space-y-14">
          <SkillsCategorySkeleton />
          <SkillsCategorySkeleton />
          <SkillsCategorySkeleton />
        </div>
      </div>
    </PageShell>
  );
}
