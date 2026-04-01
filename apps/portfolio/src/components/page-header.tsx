'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@portfolio/ui';
import { motionDuration, motionEase } from '@/lib/motion';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  /** Text alignment for title block */
  align?: 'center' | 'left';
  maxWidthClassName?: string;
};

/**
 * Eyebrow + display title + lead — matches home section hierarchy.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  align = 'center',
  maxWidthClassName = 'max-w-3xl',
}: PageHeaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionDuration.md, ease: motionEase.out }}
      className={cn(
        'mx-auto mb-16',
        maxWidthClassName,
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground md:text-xs">
        {eyebrow}
      </p>
      <h1 className="mb-6 text-balance text-4xl font-semibold tracking-display md:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          {description}
        </p>
      ) : null}
    </motion.header>
  );
}
