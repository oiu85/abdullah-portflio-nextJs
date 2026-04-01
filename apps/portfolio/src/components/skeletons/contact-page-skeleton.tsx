import { PageShell } from '@/components/page-shell';
import { SkeletonBlock } from '@/components/skeletons/skeleton-block';

export function ContactPageSkeleton() {
  return (
    <PageShell className="overflow-x-hidden">
      <div
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
        role="status"
        aria-busy="true"
        aria-label="Loading contact"
      >
        <section className="relative mx-auto mb-14 max-w-6xl lg:mb-16">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="relative z-10 w-full max-w-2xl text-center lg:max-w-xl lg:text-left">
              <SkeletonBlock rounded="md" className="mx-auto mb-3 h-3 w-24 lg:mx-0" />
              <SkeletonBlock
                rounded="lg"
                className="mx-auto mb-4 h-12 w-full max-w-md md:h-14 lg:mx-0"
              />
              <div className="space-y-2">
                <SkeletonBlock rounded="md" className="h-5 w-full" />
                <SkeletonBlock rounded="md" className="h-5 w-[92%] lg:mx-0" />
              </div>
            </div>
            <SkeletonBlock
              rounded="lg"
              className="h-48 w-full max-w-[min(100%,420px)] lg:h-56 lg:max-w-md"
            />
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-4 lg:col-span-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass-surface rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <SkeletonBlock rounded="lg" className="h-11 w-11 shrink-0" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <SkeletonBlock rounded="md" className="h-3 w-16" />
                    <SkeletonBlock rounded="md" className="h-4 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="glass-surface-strong rounded-2xl p-6 md:p-8">
              <SkeletonBlock rounded="md" className="mb-6 h-7 w-40" />
              <div className="space-y-5">
                <div className="space-y-2">
                  <SkeletonBlock rounded="md" className="h-4 w-20" />
                  <SkeletonBlock rounded="lg" className="h-11 w-full" />
                </div>
                <div className="space-y-2">
                  <SkeletonBlock rounded="md" className="h-4 w-16" />
                  <SkeletonBlock rounded="lg" className="h-11 w-full" />
                </div>
                <div className="space-y-2">
                  <SkeletonBlock rounded="md" className="h-4 w-24" />
                  <SkeletonBlock rounded="lg" className="h-11 w-full" />
                </div>
                <div className="space-y-2">
                  <SkeletonBlock rounded="md" className="h-4 w-20" />
                  <SkeletonBlock rounded="lg" className="h-28 w-full" />
                </div>
                <SkeletonBlock rounded="lg" className="h-11 w-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
