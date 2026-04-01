'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Card, CardContent } from '@portfolio/ui';
import { cn } from '@portfolio/ui';
import type { Project } from '@portfolio/types';
import { SectionHeader } from '@/components/section-header';
import { ProjectCard } from '@/components/projects/project-card';
import { Reveal } from '@/components/motion/reveal';
import { motionDuration, motionEase } from '@/lib/motion';
import { useAccessibleMotionScale } from '@/hooks/use-accessible-motion-scale';

interface FeaturedProjectsProps {
  projects: Project[];
}

/** Auto-advance featured carousel every 3s when multiple projects exist. */
const FEATURED_AUTOPLAY_MS = 3_000;

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const ctaMotion = useAccessibleMotionScale();

  const emblaOptions = useMemo(
    () => ({
      align: 'start' as const,
      loop: projects.length > 1,
      dragFree: false,
    }),
    [projects.length]
  );

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: FEATURED_AUTOPLAY_MS,
        playOnInit: true,
        stopOnFocusIn: false,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );

  const emblaPlugins = useMemo(
    () => (projects.length > 1 ? [autoplayPlugin] : []),
    [projects.length, autoplayPlugin]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, emblaPlugins);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || projects.length <= 1) return;
    const plugin = emblaApi.plugins().autoplay as
      | { play: () => void; stop: () => void }
      | undefined;
    if (!plugin) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (mq.matches) plugin.stop();
      else plugin.play();
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [emblaApi, projects.length]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      id="home-work"
      className="relative scroll-mt-20 bg-background pt-section-tight pb-section"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Featured Projects"
          subtitle="Here are some of my recent projects that showcase my skills and experience."
        />

        {projects.length === 0 ? (
          <Reveal>
            <Card className="glass-surface-soft mx-auto max-w-lg border-dashed border-border/60">
              <CardContent className="space-y-4 py-10 px-6 text-center">
                <p className="text-muted-foreground">
                  No featured projects are highlighted yet. Browse the full list for case studies and
                  work samples.
                </p>
                <Button asChild>
                  <Link href="/projects">
                    View all projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        ) : (
          <div className="relative px-10 sm:px-12 md:px-14">
            <div
              className="glass-surface-strong overflow-hidden rounded-2xl ring-1 ring-border/35"
              role="region"
              aria-roledescription="carousel"
              aria-label="Featured projects"
              ref={emblaRef}
            >
              <div className="-ml-4 flex touch-pan-y">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Project ${index + 1} of ${projects.length}`}
                  >
                    <ProjectCard project={project} index={index} />
                  </div>
                ))}
              </div>
            </div>

            {projects.length > 1 && (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className={cn(
                    'glass-chip absolute left-1 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full transition-shadow hover:shadow-card-hover sm:left-2 md:-left-1 lg:-left-2',
                    !canPrev && 'pointer-events-none opacity-40'
                  )}
                  onClick={scrollPrev}
                  disabled={!canPrev}
                  aria-label="Previous featured projects"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className={cn(
                    'glass-chip absolute right-1 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full transition-shadow hover:shadow-card-hover sm:right-2 md:-right-1 lg:-right-2',
                    !canNext && 'pointer-events-none opacity-40'
                  )}
                  onClick={scrollNext}
                  disabled={!canNext}
                  aria-label="Next featured projects"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                <div
                  className="mt-6 flex justify-center gap-2"
                  aria-live="polite"
                >
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => emblaApi?.scrollTo(i)}
                      className={cn(
                        'h-2 min-w-2 rounded-full transition-all duration-300',
                        selectedIndex === i
                          ? 'w-7 bg-foreground shadow-sm'
                          : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      )}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={selectedIndex === i}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: motionDuration.md, ease: motionEase.out, delay: 0.12 }}
            className="mt-12 text-center"
          >
            <motion.div {...ctaMotion}>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
