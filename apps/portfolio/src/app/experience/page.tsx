import type { Metadata } from 'next';
import { getExperience } from '@/lib/data';
import { ExperiencePageContent } from '@/components/experience/experience-page-content';
import { PageShell } from '@/components/page-shell';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'My professional journey as a Senior Mobile Developer specializing in Flutter and clean architecture.',
};

export const revalidate = 3600;

export default async function ExperiencePage() {
  const experiences = await getExperience();

  return (
    <PageShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ExperiencePageContent experiences={experiences} />
      </div>
    </PageShell>
  );
}
