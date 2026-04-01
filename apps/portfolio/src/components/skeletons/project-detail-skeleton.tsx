import { PageShell } from '@/components/page-shell';
import { SkeletonBlock } from '@/components/skeletons/skeleton-block';

export function ProjectDetailSkeleton() {
  return (
    <PageShell>
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="status"
        aria-busy="true"
        aria-label="Loading project"
      >
        <div className="mb-8">
          <SkeletonBlock rounded="lg" className="h-10 w-44" />
        </div>

        <div className="mx-auto max-w-4xl">
          <header className="mb-10">
            <SkeletonBlock rounded="md" className="mb-3 h-3 w-24" />
            <div className="mb-6 flex flex-wrap gap-3">
              <SkeletonBlock rounded="full" className="h-8 w-20" />
              <SkeletonBlock rounded="full" className="h-8 w-48" />
            </div>
            <SkeletonBlock
              rounded="lg"
              className="mb-4 h-12 w-full max-w-2xl md:h-14"
            />
            <div className="space-y-2">
              <SkeletonBlock rounded="md" className="h-6 w-full max-w-3xl" />
              <SkeletonBlock rounded="md" className="h-6 w-[92%] max-w-2xl" />
            </div>
          </header>

          <div className="mb-10 flex flex-wrap gap-3">
            <SkeletonBlock rounded="lg" className="h-11 w-36" />
            <SkeletonBlock rounded="lg" className="h-11 w-36" />
          </div>

          <div className="glass-surface-strong mb-10 rounded-2xl p-5 md:p-6">
            <SkeletonBlock rounded="md" className="mb-4 h-3 w-28" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonBlock key={i} rounded="full" className="h-7 w-20" />
              ))}
            </div>
          </div>

          <SkeletonBlock
            rounded="lg"
            className="mb-10 aspect-video w-full max-w-4xl"
          />

          <div className="glass-surface mt-10 rounded-2xl p-6 md:p-8">
            <SkeletonBlock rounded="md" className="mb-6 h-7 w-56" />
            <div className="space-y-3">
              <SkeletonBlock rounded="md" className="h-4 w-full" />
              <SkeletonBlock rounded="md" className="h-4 w-full" />
              <SkeletonBlock rounded="md" className="h-4 w-[95%]" />
              <SkeletonBlock rounded="md" className="h-4 w-full" />
              <SkeletonBlock rounded="md" className="h-4 w-[80%]" />
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
