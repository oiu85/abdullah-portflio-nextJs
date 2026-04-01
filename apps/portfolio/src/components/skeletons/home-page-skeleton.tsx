import { SkeletonBlock } from '@/components/skeletons/skeleton-block';

/**
 * Full-route placeholder for the home page while `HomePageContent` streams.
 * Mirrors hero → featured projects → skills → CTA layout and rhythm.
 */
export function HomePageSkeleton() {
  return (
    <div
      className="flex flex-col"
      role="status"
      aria-busy="true"
      aria-label="Loading home page"
    >
      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col overflow-x-hidden pt-16 pb-28 md:pb-36 lg:pb-44">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
            <SkeletonBlock
              rounded="full"
              className="mb-6 h-9 w-40 max-w-[90%]"
            />
            <SkeletonBlock
              rounded="full"
              className="mb-10 h-[200px] w-[200px] shrink-0"
            />
            <SkeletonBlock
              rounded="md"
              className="mb-3 h-3 w-24 max-w-[50%]"
            />
            <SkeletonBlock
              rounded="lg"
              className="mb-6 h-12 w-full max-w-md md:h-16"
            />
            <SkeletonBlock
              rounded="md"
              className="mb-4 h-7 w-full max-w-lg"
            />
            <div className="mb-8 flex w-full max-w-2xl flex-col gap-3">
              <SkeletonBlock rounded="md" className="h-5 w-full" />
              <SkeletonBlock rounded="md" className="h-5 w-[92%] mx-auto" />
              <SkeletonBlock rounded="md" className="h-5 w-[78%] mx-auto" />
            </div>
            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
              <SkeletonBlock rounded="lg" className="h-12 w-full min-w-[200px] sm:w-[200px]" />
              <SkeletonBlock rounded="lg" className="h-12 w-full min-w-[200px] sm:w-[200px]" />
            </div>
            <div className="flex justify-center gap-3 pb-2">
              <SkeletonBlock rounded="full" className="h-12 w-12" />
              <SkeletonBlock rounded="full" className="h-12 w-12" />
              <SkeletonBlock rounded="full" className="h-12 w-12" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 md:bottom-12">
          <SkeletonBlock rounded="full" className="h-10 w-6" />
        </div>
      </section>

      {/* Featured projects */}
      <section className="relative scroll-mt-20 bg-background py-section">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center md:mb-16">
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
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
      </section>

      {/* Skills preview */}
      <section className="relative overflow-hidden bg-muted/25 py-section">
        <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-secondary/5 blur-3xl" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center md:mb-16">
            <div className="mx-auto mb-5 flex justify-center">
              <SkeletonBlock rounded="full" className="h-1 w-12 md:w-16" />
            </div>
            <SkeletonBlock
              rounded="lg"
              className="mx-auto mb-4 h-10 w-72 max-w-[90%] md:h-12"
            />
            <SkeletonBlock
              rounded="md"
              className="mx-auto h-5 w-full max-w-xl"
            />
          </div>
        </div>
        <div className="container relative mx-auto mt-4 px-4 sm:px-6 lg:px-8">
          <div className="glass-surface relative overflow-hidden rounded-2xl p-3 sm:p-4">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonBlock
                    key={`s1-${i}`}
                    rounded="full"
                    className="h-9 w-24 sm:h-10 sm:w-28"
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonBlock
                    key={`s2-${i}`}
                    rounded="full"
                    className="h-9 w-28 sm:h-10 sm:w-32"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="container relative mx-auto mt-10 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <SkeletonBlock rounded="lg" className="h-11 w-48" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-section">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-surface-strong mx-auto max-w-3xl rounded-3xl p-8 md:p-12">
            <div className="text-center">
              <SkeletonBlock
                rounded="md"
                className="mx-auto mb-3 h-3 w-28"
              />
              <SkeletonBlock
                rounded="lg"
                className="mx-auto mb-6 h-10 w-80 max-w-full md:h-12"
              />
              <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-2">
                <SkeletonBlock rounded="md" className="h-5 w-full" />
                <SkeletonBlock rounded="md" className="h-5 w-full" />
                <SkeletonBlock rounded="md" className="h-5 w-[85%] mx-auto" />
              </div>
              <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-5">
                <SkeletonBlock rounded="lg" className="mx-auto h-11 w-full min-w-[200px] sm:mx-0" />
                <SkeletonBlock rounded="lg" className="mx-auto h-11 w-full min-w-[200px] sm:mx-0" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
