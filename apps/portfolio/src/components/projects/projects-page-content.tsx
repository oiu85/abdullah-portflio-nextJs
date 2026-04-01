'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@portfolio/ui';
import type { Project } from '@portfolio/types';
import { ProjectCard } from '@/components/projects/project-card';
import type { PageHeaderCopy } from '@portfolio/validation';
import { PageShell } from '@/components/page-shell';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/motion/reveal';
import {
  defaultViewport,
  listStaggerContainer,
  listStaggerItem,
} from '@/lib/motion';

type ProjectsPageContentProps = {
  projects: Project[];
  pageHeader: PageHeaderCopy;
};

export function ProjectsPageContent({
  projects,
  pageHeader,
}: ProjectsPageContentProps) {
  return (
    <PageShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow={pageHeader.eyebrow}
          title={pageHeader.title}
          description={pageHeader.description}
        />

        {projects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={listStaggerContainer}
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={listStaggerItem} className="h-full">
                <ProjectCard
                  project={project}
                  showFeaturedBadge
                  animateEntrance={false}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Reveal>
            <Card className="glass-surface-soft mx-auto max-w-lg border-dashed border-border/60">
              <CardContent className="px-6 py-12 text-center">
                <p className="text-muted-foreground">No projects found.</p>
              </CardContent>
            </Card>
          </Reveal>
        )}
      </div>
    </PageShell>
  );
}
