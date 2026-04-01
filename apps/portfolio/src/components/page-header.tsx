'use client';

import { motion } from 'framer-motion';
import { cn } from '@portfolio/ui';
import {
  motionDuration,
  motionEase,
  defaultViewport,
  pageHeaderContainer,
  pageHeaderEyebrow,
  pageHeaderTitle,
  pageHeaderLead,
} from '@/lib/motion';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'center' | 'left';
  maxWidthClassName?: string;
};

/**
 * Eyebrow + display title + lead — scroll-triggered stagger + tracking settle on title.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  align = 'center',
  maxWidthClassName = 'max-w-3xl',
}: PageHeaderProps) {
  return (
    <motion.header
      className={cn(
        'mx-auto mb-16',
        maxWidthClassName,
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={pageHeaderContainer}
    >
      <motion.p
        variants={pageHeaderEyebrow}
        className="mb-3 text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground md:text-xs"
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        variants={pageHeaderTitle}
        className="mb-6 text-balance text-4xl font-semibold tracking-display md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h1>
      {description ? (
        <motion.p
          variants={pageHeaderLead}
          className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.header>
  );
}
