'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import {
  defaultViewport,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from '@/lib/motion';

type RevealProps = HTMLMotionProps<'div'> & {
  className?: string;
};

/**
 * Scroll-triggered reveal using shared variants (fade-in-up).
 */
export function Reveal({ className, children, ...props }: RevealProps) {
  const variants = fadeInUp;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerRevealProps = HTMLMotionProps<'div'> & {
  className?: string;
};

export function StaggerReveal({ className, children, ...props }: StaggerRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div className={className} variants={staggerItem} {...props}>
      {children}
    </motion.div>
  );
}
