'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useCallback, useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@portfolio/ui';
import { cn } from '@portfolio/ui';
import type { Project } from '@portfolio/types';
import { motionDuration, motionEase, motionSpring } from '@/lib/motion';

const springConfig = { stiffness: 260, damping: 28 };

type ProjectCardProps = {
  project: Project;
  showFeaturedBadge?: boolean;
  index?: number;
  animateEntrance?: boolean;
};

export function ProjectCard({
  project,
  showFeaturedBadge = false,
  index = 0,
  animateEntrance = true,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const [isHovering, setIsHovering] = useState(false);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rotateX.set(py * -5);
      rotateY.set(px * 5);
    },
    [rotateX, rotateY, reduceMotion]
  );

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovering(false);
  }, [rotateX, rotateY]);

  const transform = useMotionTemplate`perspective(960px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const entranceProps = animateEntrance
    ? {
        initial: { opacity: 0, y: 28 } as const,
        whileInView: { opacity: 1, y: 0 } as const,
        viewport: { once: true, amount: 0.2, margin: '-48px' } as const,
        transition: {
          duration: motionDuration.md,
          ease: motionEase.out,
          delay: index * 0.08,
        },
      }
    : {};

  return (
    <motion.div
      className="group/card h-full"
      {...entranceProps}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              transition: motionSpring.soft,
            }
      }
    >
      <motion.div
        className={cn(
          'h-full transition-[will-change] duration-200',
          isHovering && !reduceMotion && 'will-change-transform'
        )}
        style={reduceMotion ? undefined : { transform }}
        onMouseMove={reduceMotion ? undefined : handleMove}
        onMouseLeave={reduceMotion ? undefined : handleLeave}
        onMouseEnter={reduceMotion ? undefined : () => setIsHovering(true)}
      >
        <Card className="glass-surface flex h-full flex-col overflow-hidden rounded-2xl border-border/50 transition-[box-shadow] duration-300 hover:border-primary/20 hover:shadow-card-hover">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted/80">
            {project.featured_image ? (
              <>
                <div
                  className={cn(
                    'absolute inset-0 origin-center transition-transform duration-500 ease-out',
                    !reduceMotion && 'group-hover/card:scale-105'
                  )}
                >
                  <Image
                    src={project.featured_image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-background/25 opacity-70 transition-opacity duration-300 group-hover/card:opacity-95"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5 transition-opacity duration-300 group-hover/card:ring-foreground/10"
                  aria-hidden
                />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <span className="text-4xl font-bold text-primary/30">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
            {showFeaturedBadge && project.is_featured && (
              <Badge className="absolute right-3 top-3 shadow-md">Featured</Badge>
            )}
          </div>

          <CardContent className="flex flex-1 flex-col gap-3 p-6">
            <div>
              <h2 className="text-title text-balance font-semibold tracking-tight transition-colors group-hover/card:text-primary">
                <Link
                  href={`/projects/${project.slug}`}
                  className="rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {project.title}
                  <ArrowRight
                    className="ml-1.5 inline-block h-4 w-4 -translate-y-px opacity-0 transition-all duration-200 group-hover/card:translate-x-0.5 group-hover/card:opacity-100"
                    aria-hidden
                  />
                </Link>
              </h2>
              <p className="mt-1 text-caption font-medium uppercase tracking-eyebrow text-muted-foreground">
                Stack
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="secondary" className="font-normal">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge variant="outline">+{project.technologies.length - 4}</Badge>
                )}
              </div>
            </div>

            <div className="border-t border-border/50 pt-3">
              <p className="text-caption font-medium uppercase tracking-eyebrow text-muted-foreground">
                Summary
              </p>
              <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground/95">
                {project.short_description}
              </p>
            </div>

            <div className="mt-auto flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className={showFeaturedBadge ? 'flex-1' : undefined}
                asChild
              >
                <Link href={`/projects/${project.slug}`}>
                  {showFeaturedBadge ? (
                    <>
                      Case study
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </>
                  ) : (
                    'Case study'
                  )}
                </Link>
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
                    aria-label="Live site"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
