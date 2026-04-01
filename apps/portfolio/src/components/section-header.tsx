'use client';

import { motion } from 'framer-motion';
import { cn } from '@portfolio/ui';

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
    <div className={cn('text-center mb-16', className)}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            'text-lg text-muted-foreground max-w-2xl mx-auto',
            subtitleClassName
          )}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
