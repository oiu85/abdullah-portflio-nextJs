import type { Metadata } from 'next';
import { getSkillsByCategory } from '@/lib/data';
import { SkillsDisplay } from '@/components/skills-display';
import { PageShell } from '@/components/page-shell';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Explore my technical skills and proficiency in Flutter, Dart, Clean Architecture, and mobile development technologies.',
};

export const revalidate = 0; // Revalidate on every request for now to see icons

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  database: 'Databases',
  devops: 'DevOps & Cloud',
  tools: 'Tools & Workflow',
  design: 'Design',
  soft_skills: 'Soft Skills',
  other: 'Other',
};

const categoryOrder = ['frontend', 'backend', 'database', 'devops', 'tools', 'design', 'soft_skills', 'other'];

export default async function SkillsPage() {
  const skillsByCategory = await getSkillsByCategory();

  const sortedCategories = categoryOrder.filter((cat) => skillsByCategory[cat]?.length > 0);

  return (
    <PageShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Expertise"
          title="Skills & Technologies"
          description="Technologies and tools I use to build high-performance Flutter applications."
        />

        {/* Skills by Category */}
        <div className="mx-auto max-w-5xl space-y-14">
          {sortedCategories.map((category) => (
            <SkillsDisplay
              key={category}
              title={categoryLabels[category] || category}
              skills={skillsByCategory[category]}
            />
          ))}
        </div>

        {Object.keys(skillsByCategory).length === 0 && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No skills found.</p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
