'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useCallback } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@portfolio/ui';
import type { Project } from '@portfolio/types';
import { motionDuration, motionEase } from '@/lib/motion';

const springConfig = { stiffness: 260, damping: 28 };

type ProjectCardProps = {
  project: Project;
  /** Featured badge on image (projects listing page). */
  showFeaturedBadge?: boolean;
  /** Stagger index for whileInView delay. */
  index?: number;
};

export function ProjectCard({
  project,
  showFeaturedBadge = false,
  index = 0,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rotateX.set(py * -6);
      rotateY.set(px * 6);
    },
    [rotateX, rotateY, reduceMotion]
  );

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const transform = useMotionTemplate`perspective(960px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '-48px' }}
      transition={{
        duration: motionDuration.md,
        ease: motionEase.out,
        delay: index * 0.08,
      }}
      className="h-full"
    >
      <motion.div
        className="h-full will-change-transform"
        style={reduceMotion ? undefined : { transform }}
        onMouseMove={reduceMotion ? undefined : handleMove}
        onMouseLeave={reduceMotion ? undefined : handleLeave}
      >
      <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border-border/60 shadow-card transition-[box-shadow,transform] duration-300 hover:shadow-card-hover">
        <div className="relative h-48 overflow-hidden bg-muted/80">
          {project.featured_image ? (
            <motion.div className="absolute inset-0" whileHover={{ scale: 1.06 }} transition={{ duration: 0.5, ease: motionEase.out }}>
              <Image
                src={project.featured_image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <span className="text-4xl font-bold text-primary/30">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {showFeaturedBadge && project.is_featured && (
            <Badge className="absolute right-3 top-3 shadow-md">Featured</Badge>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col p-6">
          <h2 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
            <Link href={`/projects/${project.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
              {project.title}
            </Link>
          </h2>

          <p className="mb-4 flex-1 text-muted-foreground">{project.short_description}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline">+{project.technologies.length - 4}</Badge>
            )}
          </div>

          <div className="mt-auto flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className={showFeaturedBadge ? 'flex-1' : undefined}
              asChild
            >
              <Link href={`/projects/${project.slug}`}>
                {showFeaturedBadge ? (
                  <>
                    View Details
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </>
                ) : (
                  'View Details'
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
