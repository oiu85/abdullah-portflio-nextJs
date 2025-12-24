import { createClient } from './supabase/server';
import { createBuildClient } from './supabase/build';
import type { Profile, Project, Skill, Experience } from '@portfolio/types';

// Get profile data
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('profile').select('*').single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  return data;
}

// Get all published projects
export async function getProjects(options?: {
  featured?: boolean;
  limit?: number;
}): Promise<Project[]> {
  const supabase = await createClient();
  let query = supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data || [];
}

// Get single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  
  // First, try to find the project without the is_published filter to debug
  const { data: allData, error: allError } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (allError) {
    console.error('Error fetching project (all):', allError);
  }

  // If project exists but is not published, log it
  if (allData && !allData.is_published) {
    console.warn(`Project with slug "${slug}" exists but is not published. is_published: ${allData.is_published}`);
  }

  // Now try with the published filter
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    // PGRST116 means no rows found, which is expected if project doesn't exist or isn't published
    if (error.code !== 'PGRST116') {
      console.error('Error fetching project:', error);
    }
    return null;
  }
  
  if (!data) {
    console.warn(`No published project found with slug: "${slug}"`);
    return null;
  }
  
  return data;
}

// Get all project slugs for static generation (build-time safe)
export async function getAllProjectSlugs(): Promise<string[]> {
  try {
    const supabase = createBuildClient();
    const { data, error } = await supabase
      .from('projects')
      .select('slug')
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching project slugs:', error);
      return [];
    }
    return data?.map((p) => p.slug) || [];
  } catch (error) {
    console.error('Error in getAllProjectSlugs:', error);
    return [];
  }
}

// Get all published skills
export async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
  return data || [];
}

// Get skills grouped by category
export async function getSkillsByCategory(): Promise<Record<string, Skill[]>> {
  const skills = await getSkills();
  return skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );
}

// Get all published experience
export async function getExperience(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .eq('is_published', true)
    .order('start_date', { ascending: false });

  if (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
  return data || [];
}

// Submit contact message
export async function submitContactMessage(message: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from('contact_messages').insert([message]);

  if (error) {
    console.error('Error submitting contact message:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}
