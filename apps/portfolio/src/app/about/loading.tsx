import { PageShell } from '@/components/page-shell';
import { AboutPageSkeleton } from '@/components/skeletons/about-page-skeleton';

/**
 * Shown during client navigation to `/about` and while the server component resolves.
 * Replaces the generic spinner so layout stays stable with the real page.
 */
export default function AboutLoading() {
  return (
    <PageShell>
      <AboutPageSkeleton />
    </PageShell>
  );
}
