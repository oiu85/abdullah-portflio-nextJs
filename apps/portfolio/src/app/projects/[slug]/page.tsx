import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react';
import { Button, Badge } from '@portfolio/ui';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/data';
import { formatDate } from '@portfolio/lib/utils';
import { ProjectImages, ProjectImagesProvider } from '@/components/project-images';
import { SafeHtml } from '@/components/safe-html';

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
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {project.is_featured && <Badge>Featured</Badge>}
                {project.start_date && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(project.start_date, { year: 'numeric', month: 'long' })}
                    {project.end_date &&
                      ` - ${formatDate(project.end_date, { year: 'numeric', month: 'long' })}`}
                  </div>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-muted-foreground">{project.short_description}</p>
            </div>

            {/* Featured Image */}
            <ProjectImages
              featuredImage={project.featured_image}
              galleryImages={project.images}
              projectTitle={project.title}
            />

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.live_url && (
                <Button asChild>
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Site
                  </a>
                </Button>
              )}
              {project.github_url && (
                <Button variant="outline" asChild>
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Source
                  </a>
                </Button>
              )}
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2>About This Project</h2>
              <SafeHtml content={project.description} />
            </div>

            {/* Gallery */}
            <ProjectImages
              featuredImage={project.featured_image}
              galleryImages={project.images}
              projectTitle={project.title}
              showGallery={true}
            />
          </div>
        </ProjectImagesProvider>
      </div>
    </div>
  );
}
