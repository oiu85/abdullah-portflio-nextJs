import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, ExternalLink, Github } from 'lucide-react';
import { Button, Badge } from '@portfolio/ui';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/data';
import { formatDate } from '@portfolio/lib/utils';
import { ProjectImages, ProjectImagesProvider } from '@/components/project-images';
import { SafeHtml } from '@/components/safe-html';
import { PageShell } from '@/components/page-shell';
import { PageSectionEnter } from '@/components/motion/page-section-enter';
import { ProjectDetailHero } from '@/components/projects/project-detail-hero';

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    description: project.short_description,
    openGraph: {
      title: project.title,
      description: project.short_description,
      images: project.featured_image ? [project.featured_image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const revalidate = 3600;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
        <PageSectionEnter className="mb-8">
          <Button
            variant="ghost"
            className="glass-chip -ml-2 rounded-full px-3 transition-colors hover:border-primary/25"
            asChild
          >
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to projects
            </Link>
          </Button>
        </PageSectionEnter>

        <ProjectImagesProvider
          featuredImage={project.featured_image}
          galleryImages={project.images}
          projectTitle={project.title}
          dedupeFeaturedInCarousel
        >
          <PageSectionEnter delay={0.05}>
            <ProjectDetailHero project={project} />
          </PageSectionEnter>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:gap-x-14">
            <aside className="space-y-6 lg:col-span-4">
              <PageSectionEnter delay={0.1} className="lg:sticky lg:top-28">
                <div className="glass-surface-strong rounded-2xl p-5 md:p-6">
                  <h2 className="mb-4 text-caption font-semibold uppercase tracking-eyebrow text-muted-foreground">
                    Stack
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="border border-border/50 font-normal"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.start_date && (
                    <div className="mt-6 flex items-center gap-2 border-t border-border/50 pt-6 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <span>
                        {formatDate(project.start_date, { year: 'numeric', month: 'long' })}
                        {project.end_date &&
                          ` — ${formatDate(project.end_date, { year: 'numeric', month: 'long' })}`}
                      </span>
                    </div>
                  )}
                  <div className="mt-6 flex flex-col gap-2 border-t border-border/50 pt-6">
                    {project.live_url && (
                      <Button
                        asChild
                        className="w-full justify-center shadow-card transition-shadow hover:shadow-card-hover"
                      >
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live site
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button variant="outline" asChild className="w-full justify-center">
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Source
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </PageSectionEnter>
            </aside>

            <div className="lg:col-span-8">
              <PageSectionEnter delay={0.12}>
                <ProjectImages
                  featuredImage={project.featured_image}
                  galleryImages={project.images}
                  projectTitle={project.title}
                />
              </PageSectionEnter>

              <PageSectionEnter delay={0.14} className="mt-10">
                <div className="glass-surface prose prose-neutral max-w-none rounded-2xl p-6 dark:prose-invert md:p-8">
                  <h2 className="!mt-0 text-balance font-semibold tracking-tight">
                    Deep dive
                  </h2>
                  <SafeHtml content={project.description} />
                </div>
              </PageSectionEnter>
            </div>
          </div>
        </ProjectImagesProvider>
      </div>
    </PageShell>
  );
}
