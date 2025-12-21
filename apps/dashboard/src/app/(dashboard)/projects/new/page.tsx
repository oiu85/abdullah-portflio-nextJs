import { ProjectForm } from '@/components/forms/project-form';

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Project</h1>
        <p className="text-muted-foreground">Create a new portfolio project</p>
      </div>

      <ProjectForm />
    </div>
  );
}
