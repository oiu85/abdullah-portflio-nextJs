import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SkillSectionForm } from '@/components/forms/skill-section-form';
import type { SkillSection } from '@portfolio/types';

async function getSection(id: string): Promise<SkillSection | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('skill_sections')
    .select('*')
    .eq('id', id)
    .single();
  return data as SkillSection | null;
}

export default async function EditSkillSectionPage({
  params,
}: {
  params: { id: string };
}) {
  const section = await getSection(params.id);
  if (!section) notFound();

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit skill section</h1>
        <p className="text-muted-foreground">Update label and order.</p>
      </div>
      <SkillSectionForm section={section} />
    </div>
  );
}
