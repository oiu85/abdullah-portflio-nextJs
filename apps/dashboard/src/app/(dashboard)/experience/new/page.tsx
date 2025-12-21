import { ExperienceForm } from '@/components/forms/experience-form';

export default function NewExperiencePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Experience</h1>
        <p className="text-muted-foreground">Add work experience</p>
      </div>
      <ExperienceForm />
    </div>
  );
}
