import type { Metadata } from 'next';
import { getSiteContent, getSkillsBySection } from '@/lib/data';
import { SkillsDisplay } from '@/components/skills-display';
import { PageShell } from '@/components/page-shell';
import { PageHeader } from '@/components/page-header';
import { SectionFrame } from '@/components/section-frame';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Explore my technical skills and proficiency in Flutter, Dart, Clean Architecture, and mobile development technologies.',
};

export const revalidate = 0; // Revalidate on every request for now to see icons

export default async function SkillsPage() {
  const [skillGroups, siteContent] = await Promise.all([
    getSkillsBySection(),
    getSiteContent(),
  ]);
  const ph = siteContent.skills.page_header;

  return (
    <PageShell>
      <SectionFrame>
        <PageHeader
          eyebrow={ph.eyebrow}
          title={ph.title}
          description={ph.description}
        />

        <div className="mx-auto max-w-editorial space-y-block-gap pb-4">
          {skillGroups.map(({ section, skills }) => (
            <SkillsDisplay
              key={section.id}
              title={section.label}
              skills={skills}
            />
          ))}
        </div>

        {skillGroups.length === 0 && (
          <div className="glass-surface-soft mx-auto max-w-lg rounded-2xl py-16 text-center">
            <p className="text-muted-foreground">No skills found.</p>
          </div>
        )}
      </SectionFrame>
    </PageShell>
  );
}
