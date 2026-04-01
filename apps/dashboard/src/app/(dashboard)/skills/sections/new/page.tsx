import { SkillSectionForm } from '@/components/forms/skill-section-form';

export default function NewSkillSectionPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New skill section</h1>
        <p className="text-muted-foreground">
          Create a group for skills (e.g. Mobile, Cloud).
        </p>
      </div>
      <SkillSectionForm />
    </div>
  );
}
