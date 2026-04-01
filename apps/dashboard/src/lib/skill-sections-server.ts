import { createClient } from '@/lib/supabase/server';
import type { SkillSection } from '@portfolio/types';

export async function getAllSkillSections(): Promise<SkillSection[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('skill_sections')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('getAllSkillSections', error);
    return [];
  }
  return (data || []) as SkillSection[];
}
