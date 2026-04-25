import type { Metadata } from 'next';
import { getExperience, getSiteContent } from '@/lib/data';
import { ExperiencePageContent } from '@/components/experience/experience-page-content';
import { PageShell } from '@/components/page-shell';
import { SectionFrame } from '@/components/section-frame';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'My professional journey as a Senior Mobile Developer specializing in Flutter and clean architecture.',
};

export const revalidate = 3600;

export default async function ExperiencePage() {
  const [experiences, siteContent] = await Promise.all([
    getExperience(),
    getSiteContent(),
  ]);

  return (
    <PageShell>
      <SectionFrame>
        <ExperiencePageContent
          experiences={experiences}
          pageHeader={siteContent.experience.page_header}
        />
      </SectionFrame>
    </PageShell>
  );
}
