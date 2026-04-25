import { PageShell } from '@/components/page-shell';
import { SectionFrame } from '@/components/section-frame';
import { PageHeaderSkeleton } from '@/components/skeletons/page-header-skeleton';
import { SkeletonBlock } from '@/components/skeletons/skeleton-block';

export function ProjectsPageSkeleton() {
  return (
    <PageShell>
      <SectionFrame role="status" aria-busy="true" aria-label="Loading projects">
        <PageHeaderSkeleton />

        <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="glass-surface flex flex-col overflow-hidden rounded-2xl"
            >
              <SkeletonBlock
                rounded="none"
                className="aspect-[16/10] w-full rounded-none"
              />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <SkeletonBlock rounded="md" className="h-6 w-3/4" />
                <SkeletonBlock rounded="md" className="mb-1 h-3 w-16" />
                <div className="flex gap-2">
                  <SkeletonBlock rounded="full" className="h-6 w-16" />
                  <SkeletonBlock rounded="full" className="h-6 w-20" />
                </div>
                <div className="border-t border-border/40 pt-3">
                  <SkeletonBlock rounded="md" className="mb-2 h-3 w-20" />
                  <SkeletonBlock rounded="md" className="h-4 w-full" />
                  <SkeletonBlock rounded="md" className="mt-1 h-4 w-[85%]" />
                </div>
                <div className="mt-auto flex gap-2 pt-2">
                  <SkeletonBlock rounded="lg" className="h-9 flex-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionFrame>
    </PageShell>
  );
}
