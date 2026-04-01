import { createClient } from './supabase/server';
import { createBuildClient } from './supabase/build';
import type { Profile, Project, Skill, Experience, SkillSection } from '@portfolio/types';
import {
  parseSiteContentFromRows,
  type SiteContentBundle,
} from '@portfolio/validation';

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

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Error fetching project:', error);
    }
    return null;
  }

  if (!data && process.env.NODE_ENV === 'development') {
    console.warn(`No published project found with slug: "${slug}"`);
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

/** CMS copy for all wired pages. */
export async function getSiteContent(): Promise<SiteContentBundle> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('site_pages').select('slug, content');

  if (error) {
    console.error('Error fetching site_pages:', error);
    return parseSiteContentFromRows([]);
  }

  return parseSiteContentFromRows(
    (data || []) as { slug: string; content: unknown }[]
  );
}

export type SkillGroup = {
  section: SkillSection;
  skills: Skill[];
};

/** Published skills grouped by section order (empty sections omitted). */
export async function getSkillsBySection(): Promise<SkillGroup[]> {
  const supabase = await createClient();
  const { data: sections, error: secErr } = await supabase
    .from('skill_sections')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (secErr) {
    console.error('Error fetching skill_sections:', secErr);
    return [];
  }
  if (!sections?.length) return [];

  const { data: skills, error: skErr } = await supabase
    .from('skills')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  if (skErr) {
    console.error('Error fetching skills:', skErr);
    return [];
  }

  const list = (skills || []) as Skill[];
  return sections
    .map((section) => ({
      section: section as SkillSection,
      skills: list.filter((s) => s.section_id === section.id),
    }))
    .filter((g) => g.skills.length > 0);
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
