import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react';
import { Button, Badge } from '@portfolio/ui';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/data';
import { formatDate } from '@portfolio/lib/utils';
import { ProjectImages, ProjectImagesProvider } from '@/components/project-images';
import { SafeHtml } from '@/components/safe-html';
import { PageShell } from '@/components/page-shell';

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="-ml-2 rounded-full border border-transparent px-3 transition-colors hover:border-border/60 hover:bg-muted/50"
            asChild
          >
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <ProjectImagesProvider
          featuredImage={project.featured_image}
          galleryImages={project.images}
          projectTitle={project.title}
        >
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <header className="mb-10">
              <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground md:text-xs">
                Case study
              </p>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                {project.is_featured && (
                  <Badge className="border border-primary/20 shadow-sm">Featured</Badge>
                )}
                {project.start_date && (
                  <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
                    <Calendar className="h-4 w-4 shrink-0" />
                    {formatDate(project.start_date, { year: 'numeric', month: 'long' })}
                    {project.end_date &&
                      ` — ${formatDate(project.end_date, { year: 'numeric', month: 'long' })}`}
                  </div>
                )}
              </div>
              <h1 className="mb-4 text-balance text-4xl font-semibold tracking-display md:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="text-pretty text-xl leading-relaxed text-muted-foreground">
                {project.short_description}
              </p>
            </header>

            {/* Actions — stack and CTAs before deep content */}
            <div className="mb-10 flex flex-wrap gap-3">
              {project.live_url && (
                <Button
                  asChild
                  className="shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Site
                  </a>
                </Button>
              )}
              {project.github_url && (
                <Button variant="outline" asChild className="shadow-sm">
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Source
                  </a>
                </Button>
              )}
            </div>

            {/* Technologies */}
            <div className="mb-10 rounded-2xl border border-border/50 bg-card/40 p-5 shadow-card backdrop-blur-sm md:p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="border border-border/50 text-sm font-normal"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Image carousel (featured + gallery) */}
            <ProjectImages
              featuredImage={project.featured_image}
              galleryImages={project.images}
              projectTitle={project.title}
            />

            {/* Description */}
            <div className="prose prose-neutral mt-10 max-w-none rounded-2xl border border-border/40 bg-card/30 p-6 shadow-sm backdrop-blur-sm dark:prose-invert md:p-8">
              <h2 className="!mt-0 text-balance font-semibold tracking-tight">
                About This Project
              </h2>
              <SafeHtml content={project.description} />
            </div>
          </div>
        </ProjectImagesProvider>
      </div>
    </PageShell>
  );
}
