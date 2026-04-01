'use client';

import { Card, CardContent } from '@portfolio/ui';
import type { Project } from '@portfolio/types';
import { ProjectCard } from '@/components/projects/project-card';
import { PageShell } from '@/components/page-shell';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/motion/reveal';

type ProjectsPageContentProps = {
  projects: Project[];
};

export function ProjectsPageContent({ projects }: ProjectsPageContentProps) {
  return (
    <PageShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Work"
          title="Projects"
          description="A collection of Flutter and mobile development projects I've worked on, from personal experiments to production applications."
        />

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
          <Reveal>
            <Card className="mx-auto max-w-lg border-dashed border-border/70 bg-muted/25 shadow-card">
              <CardContent className="py-12 px-6 text-center">
                <p className="text-muted-foreground">No projects found.</p>
              </CardContent>
            </Card>
          </Reveal>
        )}
      </div>
    </PageShell>
  );
}
