'use client';

import { motion } from 'framer-motion';
import type { Project } from '@portfolio/types';
import { ProjectCard } from '@/components/projects/project-card';
import { motionDuration, motionEase } from '@/lib/motion';

type ProjectsPageContentProps = {
  projects: Project[];
};

export function ProjectsPageContent({ projects }: ProjectsPageContentProps) {
  return (
    <div className="pb-16 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionDuration.md, ease: motionEase.out }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Projects</h1>
          <p className="text-xl text-muted-foreground">
            A collection of Flutter and mobile development projects I&apos;ve worked on, from
            personal experiments to production applications.
          </p>
        </motion.header>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                showFeaturedBadge
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
