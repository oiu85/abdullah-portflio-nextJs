'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@portfolio/ui';
import type { Skill } from '@portfolio/types';
import { SkillIcon } from '../skill-icon';
import { SectionHeader } from '@/components/section-header';
import { motionDuration, motionEase } from '@/lib/motion';
import { useAccessibleMotionScale } from '@/hooks/use-accessible-motion-scale';

interface SkillsPreviewProps {
  skills: Skill[];
}

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/60 bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm transition-[border-color,box-shadow] hover:border-primary/25 hover:shadow-md sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm"
    >
      <SkillIcon icon={skill.icon} name={skill.name} size="sm" transparent />
      {skill.name}
    </span>
  );
}

function MarqueeRow({
  rowSkills,
  rowSuffix,
  animationDelaySec,
}: {
  rowSkills: Skill[];
  rowSuffix: string;
  /** Negative delay offsets the loop so the two rows feel less synced. */
  animationDelaySec?: string;
}) {
  if (rowSkills.length === 0) return null;

  /** Slightly slower scroll; scales with row length (higher s = slower). */
  const durationSeconds = Math.min(68, Math.max(16, rowSkills.length * 1.35));

  return (
    <div className="overflow-hidden py-1.5">
      <div
        className="skills-marquee-track flex w-max gap-2 sm:gap-3"
        style={{
          animationDuration: `${durationSeconds}s`,
          ...(animationDelaySec ? { animationDelay: animationDelaySec } : {}),
        }}
      >
        {rowSkills.map((skill) => (
          <SkillChip key={`${rowSuffix}-${skill.id}`} skill={skill} />
        ))}
        <div className="skills-marquee-dup">
          {rowSkills.map((skill) => (
            <SkillChip key={`${rowSuffix}-${skill.id}-dup`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsPreview({ skills }: SkillsPreviewProps) {
  const ctaMotion = useAccessibleMotionScale();

  if (skills.length === 0) return null;

  const mid = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, mid);
  const row2 = skills.slice(mid);

  return (
    <section
      id="home-skills"
      className="relative overflow-hidden bg-muted/25 py-section"
    >
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Skills & Technologies"
          subtitle="Technologies and tools I work with to bring ideas to life."
        />
      </div>

      <div className="container relative mx-auto mt-4 px-4 sm:px-6 lg:px-8">
        <div
          className="skills-marquee-section relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-3 shadow-card backdrop-blur-sm sm:p-4 dark:bg-card/40"
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-card to-transparent sm:w-12 md:w-16"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-card to-transparent sm:w-12 md:w-16"
            aria-hidden
          />

          <div className="space-y-2">
            <MarqueeRow rowSkills={row1} rowSuffix="r1" />
            {row2.length > 0 ? (
              <MarqueeRow
                rowSkills={row2}
                rowSuffix="r2"
                animationDelaySec="-4s"
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: motionDuration.md, ease: motionEase.out, delay: 0.1 }}
          className="mt-10 text-center"
        >
          <motion.div {...ctaMotion}>
            <Button variant="outline" size="lg" asChild>
              <Link href="/skills">
                View All Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
