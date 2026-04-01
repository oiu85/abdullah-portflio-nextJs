import { PageHeaderSkeleton } from '@/components/skeletons/page-header-skeleton';
import { SkeletonBlock } from '@/components/skeletons/skeleton-block';

/**
 * Mirrors `/about` layout: PageHeader band + sidebar (avatar, quick info) + bio + experience.
 * Shown from `app/about/loading.tsx` during navigation and initial load.
 */
export function AboutPageSkeleton() {
  return (
    <div
      className="container mx-auto px-4 sm:px-6 lg:px-8"
      role="status"
      aria-busy="true"
      aria-label="Loading about page"
    >
      <PageHeaderSkeleton maxWidthClassName="max-w-4xl" />

      <div className="mx-auto max-w-4xl">
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              <SkeletonBlock
                rounded="lg"
                className="mx-auto h-48 w-48 ring-1 ring-border/30"
              />
              <div className="glass-surface space-y-3 rounded-xl border border-border/40 p-4">
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
              <SkeletonBlock rounded="lg" className="h-10 w-full" />
            </div>
          </div>

          {/* Bio + experience */}
          <div className="space-y-8 md:col-span-2">
            <div className="glass-surface-strong rounded-2xl p-6 md:p-8">
              <SkeletonBlock
                rounded="lg"
                className="mb-2 h-8 w-64 max-w-full"
              />
              <SkeletonBlock
                rounded="md"
                className="mb-6 h-6 w-72 max-w-full"
              />
              <div className="space-y-3">
                <SkeletonBlock rounded="md" className="h-4 w-full" />
                <SkeletonBlock rounded="md" className="h-4 w-full" />
                <SkeletonBlock rounded="md" className="h-4 w-[96%]" />
                <SkeletonBlock rounded="md" className="h-4 w-[88%]" />
                <SkeletonBlock rounded="md" className="h-4 w-full" />
              </div>
            </div>

            <div>
              <SkeletonBlock
                rounded="md"
                className="mb-6 h-7 w-40"
              />
              <div className="space-y-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="glass-surface rounded-2xl border border-border/40 p-5"
                  >
                    <SkeletonBlock
                      rounded="md"
                      className="mb-2 h-3 w-40"
                    />
                    <SkeletonBlock
                      rounded="md"
                      className="mb-1 h-5 w-3/4 max-w-md"
                    />
                    <SkeletonBlock rounded="md" className="h-4 w-48" />
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <SkeletonBlock rounded="lg" className="h-10 w-52" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
