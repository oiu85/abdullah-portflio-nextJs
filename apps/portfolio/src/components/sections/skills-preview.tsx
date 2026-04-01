'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@portfolio/ui';
import type { Skill } from '@portfolio/types';
import { SkillIcon } from '../skill-icon';
import { SectionHeader } from '@/components/section-header';
import { StaggerItem, StaggerReveal } from '@/components/motion/reveal';
import { motionDuration, motionEase } from '@/lib/motion';

interface SkillsPreviewProps {
  skills: Skill[];
}

const categoryColors: Record<string, string> = {
  frontend: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  backend: 'bg-green-500/10 text-green-600 dark:text-green-400',
  database: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  devops: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  tools: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  design: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  soft_skills: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  other: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
};

export function SkillsPreview({ skills }: SkillsPreviewProps) {
  if (skills.length === 0) return null;

  return (
    <section id="home-skills" className="relative overflow-hidden py-24 bg-muted/30">
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Skills & Technologies"
          subtitle="Technologies and tools I work with to bring ideas to life."
        />

        <StaggerReveal className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <StaggerItem key={skill.id}>
              <motion.span
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: motionDuration.xs, ease: motionEase.out }}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm ${
                  categoryColors[skill.category] || categoryColors.other
                }`}
              >
                <SkillIcon icon={skill.icon} name={skill.name} size="sm" transparent />
                {skill.name}
              </motion.span>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: motionDuration.md, ease: motionEase.out, delay: 0.15 }}
          className="mt-12 text-center"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
