import { Suspense } from 'react';
import { HomePageSkeleton } from '@/components/skeletons/home-page-skeleton';
import { HomePageContent } from './home-page-content';

export const revalidate = 600;

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePageContent />
    </Suspense>
  );
}
