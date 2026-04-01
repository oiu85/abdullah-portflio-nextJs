'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@portfolio/ui';
import type { Skill } from '@portfolio/types';
import { SkillIcon } from './skill-icon';
import {
  defaultViewport,
  motionDuration,
  motionEase,
  listStaggerContainer,
  listStaggerItem,
} from '@/lib/motion';
import { useReducedMotion } from 'framer-motion';

interface SkillsDisplayProps {
  title: string;
  skills: Skill[];
}

export function SkillsDisplay({ title, skills }: SkillsDisplayProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={defaultViewport}
      transition={{ duration: motionDuration.md, ease: motionEase.out }}
    >
      <div className="mb-6 flex items-center gap-3">
        <motion.span
          className="block h-px w-10 origin-left bg-gradient-to-r from-primary/60 to-transparent md:w-14"
          initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: motionDuration.md, ease: motionEase.out }}
        />
        <motion.h2
          className="text-balance text-xl font-semibold tracking-tight md:text-2xl"
          initial={reduceMotion ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: motionDuration.sm, ease: motionEase.out, delay: 0.06 }}
        >
          {title}
        </motion.h2>
      </div>
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12, margin: '-32px' }}
        variants={listStaggerContainer}
      >
        {skills.map((skill) => (
          <motion.div key={skill.id} variants={listStaggerItem} className="h-full">
            <motion.div
              className="h-full"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                      scale: 1.015,
                      transition: { type: 'spring', stiffness: 380, damping: 28 },
                    }
              }
              whileTap={
                reduceMotion ? undefined : { scale: 0.99 }
              }
            >
              <Card className="glass-surface h-full rounded-2xl transition-[box-shadow,border-color,transform] duration-300 hover:border-primary/25 hover:shadow-card-hover">
                <CardContent className="p-4 md:p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: motionDuration.sm, ease: motionEase.out }}
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
                        delay: 0.1,
                      }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
