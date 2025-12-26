'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, Badge } from '@portfolio/ui';
import type { Skill } from '@portfolio/types';
import { SkillIcon } from '../skill-icon';

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
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Skills & Technologies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Technologies and tools I work with to bring ideas to life.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-transform hover:scale-105 ${
                  categoryColors[skill.category] || categoryColors.other
                }`}
              >
                <SkillIcon icon={skill.icon} name={skill.name} size="sm" transparent />
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/skills">
              View All Skills
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
