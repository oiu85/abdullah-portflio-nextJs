import { z } from 'zod';

/** Matches `PageHeader` props (eyebrow, title, description). */
export const pageHeaderCopySchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export type PageHeaderCopy = z.infer<typeof pageHeaderCopySchema>;

export const homeSiteContentSchema = z.object({
  featured_section: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
  }),
  skills_preview: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
  }),
});

export type HomeSiteContent = z.infer<typeof homeSiteContentSchema>;

export const footerNavItemSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

export const footerSiteContentSchema = z.object({
  brand_mark: z.string().min(1),
  tagline: z.string().min(1),
  quick_links_heading: z.string().min(1),
  connect_heading: z.string().min(1),
  footer_nav: z.array(footerNavItemSchema).min(1),
  copyright_holder: z.string().min(1),
});

export type FooterSiteContent = z.infer<typeof footerSiteContentSchema>;

export const pageHeaderPageSchema = z.object({
  page_header: pageHeaderCopySchema,
});

export type ProjectsPageSiteContent = z.infer<typeof pageHeaderPageSchema>;
export type ExperiencePageSiteContent = z.infer<typeof pageHeaderPageSchema>;
export type SkillsPageSiteContent = z.infer<typeof pageHeaderPageSchema>;

export const contactCtaSiteContentSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
  primary_label: z.string().min(1),
  secondary_label: z.string().min(1),
});

export type ContactCtaSiteContent = z.infer<typeof contactCtaSiteContentSchema>;

export const SITE_PAGE_SLUGS = [
  'home',
  'footer',
  'projects',
  'experience',
  'skills',
  'contact_cta',
] as const;

export type SitePageSlug = (typeof SITE_PAGE_SLUGS)[number];

export const DEFAULT_HOME_CONTENT: HomeSiteContent = {
  featured_section: {
    title: 'Featured Projects',
    subtitle:
      'Here are some of my recent projects that showcase my skills and experience.',
  },
  skills_preview: {
    title: 'Skills & Technologies',
    subtitle: 'Technologies and tools I work with to bring ideas to life.',
  },
};

export const DEFAULT_FOOTER_CONTENT: FooterSiteContent = {
  brand_mark: 'AA',
  tagline:
    'Senior Mobile Developer specialized in building high-performance Flutter applications.',
  quick_links_heading: 'Quick Links',
  connect_heading: 'Connect',
  footer_nav: [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ],
  copyright_holder: 'Abdullah Alatrash',
};

export const DEFAULT_PROJECTS_PAGE: ProjectsPageSiteContent = {
  page_header: {
    eyebrow: 'Work',
    title: 'Projects',
    description:
      "A collection of Flutter and mobile development projects I've worked on, from personal experiments to production applications.",
  },
};

export const DEFAULT_EXPERIENCE_PAGE: ExperiencePageSiteContent = {
  page_header: {
    eyebrow: 'Journey',
    title: 'Experience',
    description:
      'My professional journey as a Senior Mobile Developer specializing in Flutter and clean architecture.',
  },
};

export const DEFAULT_SKILLS_PAGE: SkillsPageSiteContent = {
  page_header: {
    eyebrow: 'Expertise',
    title: 'Skills & Technologies',
    description:
      'Technologies and tools I use to build high-performance Flutter applications.',
  },
};

export const DEFAULT_CONTACT_CTA: ContactCtaSiteContent = {
  eyebrow: 'Next step',
  title: "Let's Work Together",
  body:
    "I'm always open to new Flutter development opportunities and interesting mobile projects. Whether you have a question or just want to say hi, feel free to reach out!",
  primary_label: 'Get in Touch',
  secondary_label: 'View All Projects',
};

function parseJson<T>(
  raw: unknown,
  schema: z.ZodType<T>,
  fallback: T,
  slug: string
): T {
  const r = schema.safeParse(raw);
  if (!r.success) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[site_pages] Invalid content for "${slug}":`, r.error.flatten());
    }
    return fallback;
  }
  return r.data;
}

export type SiteContentBundle = {
  home: HomeSiteContent;
  footer: FooterSiteContent;
  projects: ProjectsPageSiteContent;
  experience: ExperiencePageSiteContent;
  skills: SkillsPageSiteContent;
  contact_cta: ContactCtaSiteContent;
};

/**
 * Maps DB rows keyed by slug to a typed bundle; merges with defaults per slug.
 */
export function parseSiteContentFromRows(
  rows: { slug: string; content: unknown }[]
): SiteContentBundle {
  const bySlug = Object.fromEntries(rows.map((r) => [r.slug, r.content]));

  return {
    home: parseJson(
      bySlug.home,
      homeSiteContentSchema,
      DEFAULT_HOME_CONTENT,
      'home'
    ),
    footer: parseJson(
      bySlug.footer,
      footerSiteContentSchema,
      DEFAULT_FOOTER_CONTENT,
      'footer'
    ),
    projects: parseJson(
      bySlug.projects,
      pageHeaderPageSchema,
      DEFAULT_PROJECTS_PAGE,
      'projects'
    ),
    experience: parseJson(
      bySlug.experience,
      pageHeaderPageSchema,
      DEFAULT_EXPERIENCE_PAGE,
      'experience'
    ),
    skills: parseJson(
      bySlug.skills,
      pageHeaderPageSchema,
      DEFAULT_SKILLS_PAGE,
      'skills'
    ),
    contact_cta: parseJson(
      bySlug.contact_cta,
      contactCtaSiteContentSchema,
      DEFAULT_CONTACT_CTA,
      'contact_cta'
    ),
  };
}

export function parseContentForSlug(
  slug: SitePageSlug,
  content: unknown
): unknown {
  switch (slug) {
    case 'home':
      return parseJson(content, homeSiteContentSchema, DEFAULT_HOME_CONTENT, slug);
    case 'footer':
      return parseJson(
        content,
        footerSiteContentSchema,
        DEFAULT_FOOTER_CONTENT,
        slug
      );
    case 'projects':
      return parseJson(
        content,
        pageHeaderPageSchema,
        DEFAULT_PROJECTS_PAGE,
        slug
      );
    case 'experience':
      return parseJson(
        content,
        pageHeaderPageSchema,
        DEFAULT_EXPERIENCE_PAGE,
        slug
      );
    case 'skills':
      return parseJson(
        content,
        pageHeaderPageSchema,
        DEFAULT_SKILLS_PAGE,
        slug
      );
    case 'contact_cta':
      return parseJson(
        content,
        contactCtaSiteContentSchema,
        DEFAULT_CONTACT_CTA,
        slug
      );
    default:
      return content;
  }
}
