'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@portfolio/ui';
import { Reveal } from '@/components/motion/reveal';
import { motionDuration, motionEase } from '@/lib/motion';

export function HomeCtaSection() {
  return (
    <section id="home-cta" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/20 via-muted/40 to-muted/20" />
      <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Let&apos;s Work Together
          </h2>
        </Reveal>
        <Reveal>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            I&apos;m always open to new Flutter development opportunities and
            interesting mobile projects. Whether you have a question or just want
            to say hi, feel free to reach out!
          </p>
        </Reveal>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: motionDuration.md, ease: motionEase.out, delay: 0.08 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="min-w-[200px] shadow-lg shadow-primary/10">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="outline" size="lg" className="min-w-[200px]" asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
