import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { Button, Badge } from '@portfolio/ui';
import { getProfile, getProjects, getSkills } from '@/lib/data';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { SkillsPreview } from '@/components/sections/skills-preview';

export const revalidate = 0; // Revalidate on every request for now to see icons

export default async function HomePage() {
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getProjects({ featured: true, limit: 3 }),
    getSkills(),
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection profile={profile} />

      {/* Featured Projects */}
      <FeaturedProjects projects={projects} />

      {/* Skills Preview */}
      <SkillsPreview skills={skills.slice(0, 12)} />

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I&apos;m always open to new Flutter development opportunities and interesting mobile projects. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
