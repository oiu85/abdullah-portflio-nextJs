'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@portfolio/ui';
import type { Skill } from '@portfolio/types';
import { SkillIcon } from './skill-icon';
import { defaultViewport, motionDuration, motionEase } from '@/lib/motion';
import { useAccessibleMotionScale } from '@/hooks/use-accessible-motion-scale';

interface SkillsDisplayProps {
  title: string;
  skills: Skill[];
}

export function SkillsDisplay({ title, skills }: SkillsDisplayProps) {
  const cardMotion = useAccessibleMotionScale({ hover: 1.01, tap: 0.99 });

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: motionDuration.md, ease: motionEase.out }}
    >
      <div className="mb-2 flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-primary/50 to-transparent md:w-10" aria-hidden />
        <h2 className="text-balance text-xl font-semibold tracking-tight md:text-2xl">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: motionDuration.sm,
              ease: motionEase.out,
              delay: index * 0.04,
            }}
          >
            <motion.div {...cardMotion} className="h-full">
              <Card className="h-full rounded-2xl border-border/60 bg-card/80 shadow-card backdrop-blur-sm transition-shadow duration-300 hover:border-primary/20 hover:shadow-card-hover">
                <CardContent className="p-4 md:p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: motionDuration.sm,
                        ease: motionEase.out,
                        delay: index * 0.04,
                      }}
                    >
                      <SkillIcon icon={skill.icon} name={skill.name} size="md" />
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-medium">{skill.name}</span>
                        <span className="ml-2 flex-shrink-0 text-sm tabular-nums text-muted-foreground">
                          {skill.proficiency}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted/80">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.85,
                        ease: motionEase.out,
                        delay: 0.12 + index * 0.03,
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
