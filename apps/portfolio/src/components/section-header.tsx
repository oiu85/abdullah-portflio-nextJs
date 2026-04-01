'use client';

import { motion } from 'framer-motion';
import { cn } from '@portfolio/ui';
import {
  defaultViewport,
  sectionHeaderContainer,
  sectionHeaderSubtitle,
  sectionHeaderTitle,
} from '@/lib/motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  subtitleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  className,
  subtitleClassName,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn('mb-16 text-center', className)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={sectionHeaderContainer}
    >
      <motion.h2
        variants={sectionHeaderTitle}
        className="mb-4 text-3xl font-bold md:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          variants={sectionHeaderSubtitle}
          className={cn(
            'mx-auto max-w-2xl text-lg text-muted-foreground',
            subtitleClassName
          )}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
