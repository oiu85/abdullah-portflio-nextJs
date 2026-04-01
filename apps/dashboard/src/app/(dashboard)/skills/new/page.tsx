import { SkillForm } from '@/components/forms/skill-form';
import { getAllSkillSections } from '@/lib/skill-sections-server';

export default async function NewSkillPage() {
  const sections = await getAllSkillSections();

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Skill</h1>
        <p className="text-muted-foreground">Add a new skill or technology</p>
      </div>

      <SkillForm sections={sections} />
    </div>
  );
}
