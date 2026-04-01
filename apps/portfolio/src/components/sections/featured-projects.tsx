'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Card, CardContent } from '@portfolio/ui';
import { cn } from '@portfolio/ui';
import type { Project } from '@portfolio/types';
import { SectionHeader } from '@/components/section-header';
import { ProjectCard } from '@/components/projects/project-card';
import { Reveal } from '@/components/motion/reveal';
import { motionDuration, motionEase } from '@/lib/motion';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const emblaOptions = useMemo(
    () => ({
      align: 'start' as const,
      loop: projects.length > 1,
      dragFree: false,
    }),
    [projects.length]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      id="home-work"
      className="relative scroll-mt-20 bg-background py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Featured Projects"
          subtitle="Here are some of my recent projects that showcase my skills and experience."
        />

        {projects.length === 0 ? (
          <Reveal>
            <Card className="mx-auto max-w-lg border-dashed bg-muted/30">
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
              className="overflow-hidden rounded-xl"
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
                    'absolute left-1 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full border border-border/80 bg-background/95 shadow-md backdrop-blur-sm hover:bg-background sm:left-2 md:-left-1 lg:-left-2',
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
                    'absolute right-1 top-1/2 z-10 h-11 w-11 -translate-y-1/2 rounded-full border border-border/80 bg-background/95 shadow-md backdrop-blur-sm hover:bg-background sm:right-2 md:-right-1 lg:-right-2',
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
                        'h-2.5 min-w-2.5 rounded-full transition-all',
                        selectedIndex === i
                          ? 'w-6 bg-primary'
                          : 'w-2.5 bg-muted-foreground/35 hover:bg-muted-foreground/55'
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
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
