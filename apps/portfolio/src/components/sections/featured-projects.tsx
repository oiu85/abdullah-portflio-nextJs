'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, Card, CardContent } from '@portfolio/ui';
import type { Project } from '@portfolio/types';
import { SectionHeader } from '@/components/section-header';
import { ProjectCard } from '@/components/projects/project-card';
import { Reveal } from '@/components/motion/reveal';
import { motionDuration, motionEase } from '@/lib/motion';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section
      id="home-work"
      className="relative scroll-mt-20 bg-background py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Featured Projects"
          subtitle="Here are some of my recent projects that showcase my skills and experience."
        />

        {projects.length === 0 ? (
          <Reveal>
            <Card className="mx-auto max-w-lg border-dashed bg-muted/30">
              <CardContent className="space-y-4 py-10 px-6 text-center">
                <p className="text-muted-foreground">
                  No featured projects are highlighted yet. Browse the full list for case studies and
                  work samples.
                </p>
                <Button asChild>
                  <Link href="/projects">
                    View all projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: motionDuration.md, ease: motionEase.out, delay: 0.12 }}
            className="mt-12 text-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
