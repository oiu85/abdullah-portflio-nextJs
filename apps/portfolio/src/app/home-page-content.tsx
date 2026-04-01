import { getProfile, getProjects, getSkills } from '@/lib/data';
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
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getProjects({ featured: true }),
    getSkills(),
  ]);

  return (
    <HomeContentTransition>
      <HeroSection profile={profile} />

      <FeaturedProjects projects={projects} />

      <SkillsPreview skills={skills} />

      <HomeCtaSection />
    </HomeContentTransition>
  );
}
