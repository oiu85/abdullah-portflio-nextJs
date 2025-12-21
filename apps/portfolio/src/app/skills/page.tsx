import type { Metadata } from 'next';
import { getSkillsByCategory } from '@/lib/data';
import { SkillsDisplay } from '@/components/skills-display';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Explore my technical skills and proficiency across various technologies.',
};

export const revalidate = 3600;

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
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Skills & Technologies</h1>
          <p className="text-xl text-muted-foreground">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        {/* Skills by Category */}
        <div className="max-w-5xl mx-auto space-y-12">
          {sortedCategories.map((category) => (
            <SkillsDisplay
              key={category}
              title={categoryLabels[category] || category}
              skills={skillsByCategory[category]}
            />
          ))}
        </div>

        {Object.keys(skillsByCategory).length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No skills found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
