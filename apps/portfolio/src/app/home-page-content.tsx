import { getProfile, getProjects, getSkills, getSiteContent } from '@/lib/data';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { SkillsPreview } from '@/components/sections/skills-preview';
import { HomeCtaSection } from '@/components/sections/home-cta-section';
import { HomeContentTransition } from '@/components/home-content-transition';

/**
 * Async server component — suspends until profile, projects, and skills resolve.
 * Wrapped in `Suspense` from `page.tsx` with `HomePageSkeleton` as fallback.
 */
export async function HomePageContent() {
  const [profile, projects, skills, siteContent] = await Promise.all([
    getProfile(),
    getProjects({ featured: true }),
    getSkills(),
    getSiteContent(),
  ]);

  return (
    <HomeContentTransition>
      <HeroSection profile={profile} />

      <FeaturedProjects
        projects={projects}
        featuredSection={siteContent.home.featured_section}
      />

      <SkillsPreview
        skills={skills}
        skillsPreview={siteContent.home.skills_preview}
      />

      <HomeCtaSection contactCta={siteContent.contact_cta} />
    </HomeContentTransition>
  );
}
