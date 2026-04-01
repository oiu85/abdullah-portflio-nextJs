import { getProfile, getProjects, getSkills } from '@/lib/data';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { SkillsPreview } from '@/components/sections/skills-preview';
import { HomeCtaSection } from '@/components/sections/home-cta-section';

export const revalidate = 600; // ISR: refresh home every 10 minutes

export default async function HomePage() {
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getProjects({ featured: true, limit: 3 }),
    getSkills(),
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection profile={profile} />

      <FeaturedProjects projects={projects} />

      <SkillsPreview skills={skills.slice(0, 12)} />

      <HomeCtaSection />
    </div>
  );
}
