import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@portfolio/ui';
import { getProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of Flutter and mobile development projects showcasing my skills and experience.',
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground">
            A collection of Flutter and mobile development projects I&apos;ve worked on, from personal experiments to production applications.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="h-full flex flex-col overflow-hidden group">
                {/* Project Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  {project.featured_image ? (
                    <Image
                      src={project.featured_image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                      <span className="text-4xl font-bold text-primary/30">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  {project.is_featured && (
                    <Badge className="absolute top-3 right-3">Featured</Badge>
                  )}
                </div>

                <CardContent className="flex-1 flex flex-col p-6">
                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 flex-1">
                    {project.short_description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline">+{project.technologies.length - 4}</Badge>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-auto">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <Link href={`/projects/${project.slug}`}>View Details</Link>
                    </Button>
                    {project.github_url && (
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.live_url && (
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
