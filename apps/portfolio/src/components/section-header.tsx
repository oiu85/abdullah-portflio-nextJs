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
      className={cn('mb-14 text-center md:mb-16', className)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={sectionHeaderContainer}
    >
      <div
        className="mx-auto mb-5 flex justify-center"
        aria-hidden
      >
        <span className="h-px w-12 bg-gradient-to-r from-transparent via-primary/50 to-transparent md:w-16" />
      </div>
      <motion.h2
        variants={sectionHeaderTitle}
        className="mb-4 text-balance text-3xl font-semibold tracking-display md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          variants={sectionHeaderSubtitle}
          className={cn(
            'mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg',
            subtitleClassName
          )}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
