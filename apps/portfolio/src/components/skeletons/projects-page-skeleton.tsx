import { PageShell } from '@/components/page-shell';
import { PageHeaderSkeleton } from '@/components/skeletons/page-header-skeleton';
import { SkeletonBlock } from '@/components/skeletons/skeleton-block';

export function ProjectsPageSkeleton() {
  return (
    <PageShell>
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="status"
        aria-busy="true"
        aria-label="Loading projects"
      >
        <PageHeaderSkeleton />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="glass-surface flex flex-col overflow-hidden rounded-2xl"
            >
              <SkeletonBlock rounded="none" className="aspect-video w-full rounded-none" />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <SkeletonBlock rounded="md" className="h-5 w-3/4" />
                <SkeletonBlock rounded="md" className="h-4 w-full" />
                <SkeletonBlock rounded="md" className="h-4 w-[70%]" />
                <div className="mt-2 flex gap-2">
                  <SkeletonBlock rounded="full" className="h-6 w-16" />
                  <SkeletonBlock rounded="full" className="h-6 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
