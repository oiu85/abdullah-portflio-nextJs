import { PageHeaderSkeleton } from '@/components/skeletons/page-header-skeleton';
import { SectionFrame } from '@/components/section-frame';
import { SkeletonBlock } from '@/components/skeletons/skeleton-block';

/**
 * Mirrors `/about` storytelling layout while the server component resolves.
 */
export function AboutPageSkeleton() {
  return (
    <SectionFrame
      role="status"
      aria-busy="true"
      aria-label="Loading about page"
    >
      <PageHeaderSkeleton maxWidthClassName="max-w-3xl" />

      <div className="mt-4 grid gap-12 lg:grid-cols-12 lg:gap-14">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28 lg:space-y-6">
            <SkeletonBlock
              rounded="lg"
              className="mx-auto aspect-[3/4] w-full max-w-[280px] ring-1 ring-border/30 lg:mx-0 lg:max-w-none"
            />
            <div className="glass-surface mt-8 space-y-3 rounded-xl border border-border/40 p-5 lg:mt-0">
              <SkeletonBlock rounded="md" className="h-3 w-24" />
              <div className="flex items-center gap-2">
                <SkeletonBlock rounded="md" className="h-9 w-9 shrink-0" />
                <SkeletonBlock rounded="md" className="h-4 flex-1" />
              </div>
              <div className="flex items-center gap-2">
                <SkeletonBlock rounded="md" className="h-9 w-9 shrink-0" />
                <SkeletonBlock rounded="md" className="h-4 flex-1" />
              </div>
              <SkeletonBlock rounded="lg" className="h-9 w-full" />
            </div>
            <SkeletonBlock rounded="lg" className="mt-4 h-10 w-full" />
          </div>
        </aside>

        <div className="space-y-8 lg:col-span-8">
          <SkeletonBlock rounded="lg" className="min-h-[5rem] w-full" />
          <div className="space-y-6">
            <SkeletonBlock rounded="md" className="h-6 w-full max-w-xl" />
            <SkeletonBlock rounded="md" className="h-6 w-full max-w-xl" />
            <SkeletonBlock rounded="md" className="h-4 w-full" />
            <SkeletonBlock rounded="md" className="h-4 w-full" />
            <SkeletonBlock rounded="md" className="h-4 w-[92%]" />
          </div>
          <div>
            <SkeletonBlock rounded="md" className="mb-6 h-4 w-40" />
            <div className="space-y-4 pl-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="glass-surface rounded-2xl border border-border/40 p-5">
                  <SkeletonBlock rounded="md" className="mb-2 h-3 w-40" />
                  <SkeletonBlock rounded="md" className="mb-1 h-5 w-3/4 max-w-md" />
                  <SkeletonBlock rounded="md" className="h-4 w-48" />
                </div>
              ))}
            </div>
            <SkeletonBlock rounded="lg" className="mt-8 h-10 w-52" />
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
