'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@portfolio/ui';
import type { Experience } from '@portfolio/types';
import { formatDateRange } from '@portfolio/lib/utils';
import { defaultViewport, motionDuration, motionEase, motionSpring } from '@/lib/motion';
import type { PageHeaderCopy } from '@portfolio/validation';
import { PageHeader } from '@/components/page-header';

type ExperiencePageContentProps = {
  experiences: Experience[];
  pageHeader: PageHeaderCopy;
};

export function ExperiencePageContent({
  experiences,
  pageHeader,
}: ExperiencePageContentProps) {
  const reduceMotion = useReducedMotion();

  const itemTransition = (index: number) => ({
    duration: reduceMotion ? 0 : motionDuration.md,
    ease: motionEase.out,
    delay: reduceMotion ? 0 : index * 0.07,
  });

  return (
    <>
      <PageHeader
        eyebrow={pageHeader.eyebrow}
        title={pageHeader.title}
        description={pageHeader.description}
      />

      <div className="mx-auto max-w-5xl">
        {experiences.length > 0 ? (
          <div className="relative">
            <div
              className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:left-1/2 md:-translate-x-1/2"
              aria-hidden
            />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`relative grid gap-8 md:grid-cols-2 ${
                    index % 2 === 0 ? '' : 'md:text-right'
                  }`}
                >
                  {/* Wrapper holds translate; motion inner uses scale — otherwise motion
                      overwrites transform and the dot drifts off the timeline line. */}
                  <div
                    className="pointer-events-none absolute left-0 top-8 z-10 h-4 w-4 -translate-x-1/2 md:left-1/2"
                    aria-hidden
                  >
                    <motion.div
                      className="h-full w-full rounded-full border-4 border-background bg-primary"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={defaultViewport}
                      transition={itemTransition(index)}
                    />
                  </div>

                  <motion.div
                    className={`md:col-span-1 pl-8 md:pl-0 ${
                      index % 2 === 0 ? 'md:pr-12' : 'md:order-2 md:pl-12'
                    }`}
                    initial={{
                      opacity: 0,
                      y: 28,
                      x: index % 2 === 0 ? -16 : 16,
                    }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={defaultViewport}
                    transition={itemTransition(index)}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -5,
                            transition: motionSpring.soft,
                          }
                    }
                    whileTap={reduceMotion ? undefined : { scale: 0.995 }}
                  >
                    <Card className="glass-surface w-full rounded-2xl transition-[box-shadow,border-color] hover:border-primary/25 hover:shadow-card-hover">
                      <CardHeader className="pb-4">
                        <div
                          className={`flex gap-4 ${
                            index % 2 === 1 ? 'md:flex-row-reverse md:text-right' : ''
                          }`}
                        >
                          {exp.company_logo ? (
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                              <Image
                                src={exp.company_logo}
                                alt={`${exp.company} logo`}
                                fill
                                className="object-contain p-1.5"
                                sizes="56px"
                              />
                            </div>
                          ) : (
                            <div
                              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 text-lg font-semibold text-muted-foreground"
                              aria-hidden
                            >
                              {exp.company.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div
                              className={`mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground ${
                                index % 2 === 1 ? 'md:justify-end' : ''
                              }`}
                            >
                              <Calendar className="h-4 w-4 shrink-0" />
                              {formatDateRange(exp.start_date, exp.end_date)}
                              {exp.is_current && (
                                <Badge variant="success" className="ml-0">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl">{exp.position}</CardTitle>
                            <div
                              className={`mt-1 flex items-center gap-2 text-primary ${
                                index % 2 === 1 ? 'md:justify-end' : ''
                              }`}
                            >
                              {exp.company_url ? (
                                <a
                                  href={exp.company_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 hover:underline"
                                >
                                  {exp.company}
                                  <ExternalLink className="h-3 w-3 shrink-0" />
                                </a>
                              ) : (
                                exp.company
                              )}
                            </div>
                            {exp.location && (
                              <div
                                className={`mt-1 flex items-center gap-1 text-sm text-muted-foreground ${
                                  index % 2 === 1 ? 'md:justify-end' : ''
                                }`}
                              >
                                <MapPin className="h-3 w-3 shrink-0" />
                                {exp.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm prose-neutral mb-4 max-w-none dark:prose-invert">
                          {exp.description.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        {exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  <div
                    className={`hidden md:block ${index % 2 === 0 ? 'md:order-2' : ''}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-surface-soft rounded-2xl border-dashed py-16 text-center">
            <p className="text-muted-foreground">No experience entries found.</p>
          </div>
        )}
      </div>
    </>
  );
}
