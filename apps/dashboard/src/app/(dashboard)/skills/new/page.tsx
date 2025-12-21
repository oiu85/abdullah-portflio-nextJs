import { SkillForm } from '@/components/forms/skill-form';

export default function NewSkillPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Skill</h1>
        <p className="text-muted-foreground">Add a new skill or technology</p>
      </div>

      <SkillForm />
    </div>
  );
}
