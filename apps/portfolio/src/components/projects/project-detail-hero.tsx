import Image from 'next/image';
import { Badge } from '@portfolio/ui';
import { formatDate } from '@portfolio/lib/utils';
import { Calendar } from 'lucide-react';
import type { Project } from '@portfolio/types';

type ProjectDetailHeroProps = {
  project: Project;
};

/**
 * Cinematic hero band for project detail (RSC-safe).
 */
export function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
  return (
    <section className="relative mb-12 overflow-hidden rounded-[1.75rem] ring-1 ring-border/45 aspect-[16/10] min-h-[220px] max-h-[min(56vh,560px)] w-full sm:min-h-[280px]">
      {project.featured_image ? (
        <Image
          src={project.featured_image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 80rem"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-muted/40 to-secondary/30" />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 sm:p-8 md:p-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {project.is_featured && (
            <Badge className="border border-primary/25 bg-background/70 shadow-sm backdrop-blur-md">
              Featured
            </Badge>
          )}
          {project.start_date && (
            <span className="glass-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {formatDate(project.start_date, { year: 'numeric', month: 'short' })}
              {project.end_date
                ? ` — ${formatDate(project.end_date, { year: 'numeric', month: 'short' })}`
                : ''}
            </span>
          )}
        </div>
        <p className="mb-2 text-caption font-medium uppercase tracking-eyebrow text-muted-foreground">
          Case study
        </p>
        <h1 className="text-balance text-display font-semibold tracking-display text-foreground drop-shadow-sm md:text-display-xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          {project.short_description}
        </p>
      </div>
    </section>
  );
}
