'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@portfolio/ui';
import type { ContactCtaSiteContent } from '@portfolio/validation';
import { Reveal } from '@/components/motion/reveal';
import { motionDuration, motionEase } from '@/lib/motion';
import { useAccessibleMotionScale } from '@/hooks/use-accessible-motion-scale';

type HomeCtaSectionProps = {
  contactCta: ContactCtaSiteContent;
};

export function HomeCtaSection({ contactCta }: HomeCtaSectionProps) {
  const ctaMotion = useAccessibleMotionScale();

  return (
    <section
      id="home-cta"
      className="relative overflow-hidden py-section"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-surface-strong mx-auto max-w-3xl rounded-3xl p-8 text-center transition-shadow duration-500 hover:shadow-card-hover md:p-12">
          <Reveal>
            <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground md:text-xs">
              {contactCta.eyebrow}
            </p>
            <h2 className="mb-4 text-balance text-3xl font-semibold tracking-display md:text-4xl">
              {contactCta.title}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {contactCta.body}
            </p>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: motionDuration.md,
              ease: motionEase.out,
              delay: 0.08,
            }}
            className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-5"
          >
            <motion.div {...ctaMotion}>
              <Button
                asChild
                size="lg"
                className="min-w-[200px] shadow-card shadow-primary/15 transition-shadow hover:shadow-card-hover"
              >
                <Link href="/contact">
                  {contactCta.primary_label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div {...ctaMotion}>
              <Button variant="outline" size="lg" className="min-w-[200px]" asChild>
                <Link href="/projects">{contactCta.secondary_label}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
