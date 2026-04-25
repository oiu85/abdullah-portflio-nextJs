import { PageShell } from '@/components/page-shell';
import { SkeletonBlock } from '@/components/skeletons/skeleton-block';

export function ProjectDetailSkeleton() {
  return (
    <PageShell>
      <div
        className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8"
        role="status"
        aria-busy="true"
        aria-label="Loading project"
      >
        <div className="mb-8">
          <SkeletonBlock rounded="lg" className="h-10 w-44" />
        </div>

        <SkeletonBlock
          rounded="lg"
          className="mb-12 aspect-[16/10] w-full max-h-[min(56vh,560px)] rounded-[1.75rem]"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-4">
            <div className="glass-surface-strong rounded-2xl p-5 md:p-6">
              <SkeletonBlock rounded="md" className="mb-4 h-3 w-24" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonBlock key={i} rounded="full" className="h-7 w-20" />
                ))}
              </div>
              <div className="mt-6 border-t border-border/40 pt-6">
                <SkeletonBlock rounded="md" className="h-4 w-48" />
              </div>
              <div className="mt-6 flex flex-col gap-2 border-t border-border/40 pt-6">
                <SkeletonBlock rounded="lg" className="h-11 w-full" />
                <SkeletonBlock rounded="lg" className="h-11 w-full" />
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <SkeletonBlock rounded="lg" className="mb-10 aspect-video w-full" />
            <div className="glass-surface rounded-2xl p-6 md:p-8">
              <SkeletonBlock rounded="md" className="mb-6 h-7 w-48" />
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
      </div>
    </PageShell>
  );
}
