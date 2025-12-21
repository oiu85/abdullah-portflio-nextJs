import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ExperienceForm } from '@/components/forms/experience-form';

async function getExperience(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from('experience').select('*').eq('id', id).single();
  return data;
}

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
  const experience = await getExperience(params.id);
  if (!experience) notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Experience</h1>
        <p className="text-muted-foreground">Update experience details</p>
      </div>
      <ExperienceForm experience={experience} />
    </div>
  );
}
