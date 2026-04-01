// ============================================
// Database Types - Aligned with Supabase Schema
// ============================================

// Base types for all tables
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// Profile
// ============================================
/** Align `title`, `short_bio`, and `bio` with root layout metadata and hero copy. */
export interface Profile extends BaseEntity {
  full_name: string;
  title: string;
  bio: string;
  short_bio: string;
  email: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  resume_url?: string;
  social_links: SocialLinks;
  is_available_for_hire: boolean;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  dribbble?: string;
  behance?: string;
  youtube?: string;
  instagram?: string;
}

export type ProfileInsert = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
export type ProfileUpdate = Partial<ProfileInsert>;

// ============================================
// Projects
// ============================================
/**
 * CMS content tips: `short_description` = one-line value proposition.
 * `description` (HTML): problem → approach → measurable outcome → stack highlights.
 */
export interface Project extends BaseEntity {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  featured_image?: string;
  images: string[];
  technologies: string[];
  live_url?: string;
  github_url?: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  start_date?: string;
  end_date?: string;
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type ProjectUpdate = Partial<ProjectInsert>;

// ============================================
// Skills
// ============================================
/** Grouping for skills (replaces fixed enum categories). */
export interface SkillSection extends BaseEntity {
  slug: string;
  label: string;
  display_order: number;
  is_published: boolean;
}

export type SkillSectionInsert = Omit<
  SkillSection,
  'id' | 'created_at' | 'updated_at'
>;
export type SkillSectionUpdate = Partial<SkillSectionInsert>;

export interface Skill extends BaseEntity {
  name: string;
  section_id: string;
  proficiency: number; // 1-100
  icon?: string;
  is_published: boolean;
  display_order: number;
}

export type SkillInsert = Omit<Skill, 'id' | 'created_at' | 'updated_at'>;
export type SkillUpdate = Partial<SkillInsert>;

/** Skill row joined with section for admin lists. */
export type SkillWithSection = Skill & {
  skill_sections: Pick<SkillSection, 'id' | 'slug' | 'label'> | null;
};

// ============================================
// Experience
// ============================================
export interface Experience extends BaseEntity {
  company: string;
  position: string;
  description: string;
  location?: string;
  company_logo?: string;
  company_url?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  is_published: boolean;
  display_order: number;
  technologies: string[];
}

export type ExperienceInsert = Omit<Experience, 'id' | 'created_at' | 'updated_at'>;
export type ExperienceUpdate = Partial<ExperienceInsert>;

// ============================================
// Contact Messages
// ============================================
export interface ContactMessage extends BaseEntity {
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  is_archived: boolean;
}

export type ContactMessageInsert = Omit<
  ContactMessage,
  'id' | 'created_at' | 'updated_at' | 'is_read' | 'is_archived'
>;

// ============================================
// Media / Storage
// ============================================
export interface MediaItem {
  id: string;
  name: string;
  bucket: string;
  path: string;
  url: string;
  size: number;
  type: string;
  created_at: string;
}

// ============================================
// API Response Types
// ============================================
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================
// Site pages (CMS copy)
// ============================================
export interface SitePageRow {
  slug: string;
  content: Record<string, unknown>;
  updated_at: string;
}

export type SitePageInsert = Omit<SitePageRow, 'updated_at'>;
export type SitePageUpdate = Partial<Pick<SitePageRow, 'content'>>;

// ============================================
// Dashboard Stats
// ============================================
export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  totalSkills: number;
  totalExperiences: number;
  unreadMessages: number;
  totalMessages: number;
}

// ============================================
// Form States
// ============================================
export interface FormState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}
