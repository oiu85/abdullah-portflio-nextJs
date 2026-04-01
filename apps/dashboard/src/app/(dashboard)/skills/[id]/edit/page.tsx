import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SkillForm } from '@/components/forms/skill-form';
import { getAllSkillSections } from '@/lib/skill-sections-server';

async function getSkill(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from('skills').select('*').eq('id', id).single();
  return data;
}

export default async function EditSkillPage({ params }: { params: { id: string } }) {
  const [skill, sections] = await Promise.all([
    getSkill(params.id),
    getAllSkillSections(),
  ]);

  if (!skill) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Skill</h1>
        <p className="text-muted-foreground">Update skill details</p>
      </div>

      <SkillForm skill={skill} sections={sections} />
    </div>
  );
}
