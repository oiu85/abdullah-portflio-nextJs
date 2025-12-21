import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProjectForm } from '@/components/forms/project-form';

async function getProject(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from('projects').select('*').eq('id', id).single();
  return data;
}

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground">Update project details</p>
      </div>

      <ProjectForm project={project} />
    </div>
  );
}
