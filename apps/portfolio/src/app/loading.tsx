import { HomePageSkeleton } from '@/components/skeletons/home-page-skeleton';

/**
 * Fallback for the root segment (e.g. navigating to `/` while the home RSC loads).
 */
export default function RootLoading() {
  return <HomePageSkeleton />;
}
