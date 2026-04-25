'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button, Badge } from '@portfolio/ui';
import type { Profile } from '@portfolio/types';
import { motionDuration, motionEase, scaleIn, staggerItem } from '@/lib/motion';
import { ResumeDownloadButton } from '@/components/resume-download-button';
import { useMagnetic } from '@/hooks/use-magnetic';

interface HeroSectionProps {
  profile: Profile | null;
}

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

export function HeroSection({ profile }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const primaryMagnetic = useMagnetic(1);
  const secondaryMagnetic = useMagnetic(0.75);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const parallax = reduceMotion ? 0 : 1;
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, 100 * parallax]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 60 * parallax]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], [0, 36 * parallax]);
  const bgY4 = useTransform(scrollYProgress, [0, 1], [0, 48 * parallax]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 14 * parallax]);
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.62],
    [1, reduceMotion ? 1 : 0.2]
  );
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const name = profile?.full_name || 'John Doe';
  const hasResume = Boolean(profile?.resume_url);

  return (
    <section
      ref={sectionRef}
      id="home-hero"
      className="relative z-10 flex flex-col overflow-x-hidden pt-16 pb-20 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/85" />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-32 -top-32 h-[22rem] w-[22rem] rounded-full bg-primary/[0.07] blur-3xl"
          style={{ y: bgY1 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [-36, 36, -36],
                  y: [32, -32, 32],
                  scale: [1, 1.05, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 16, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <motion.div
          className="absolute -bottom-36 -left-36 h-[20rem] w-[20rem] rounded-full bg-primary/[0.05] blur-3xl"
          style={{ y: bgY2 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [32, -32, 32],
                  y: [-28, 28, -28],
                  scale: [1, 1.04, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 19, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <motion.div
          className="absolute left-1/4 top-1/3 h-56 w-56 rounded-full bg-primary/[0.04] blur-2xl"
          style={{ y: bgY3 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [-10, 10, -10],
                  y: [8, -8, 8],
                  scale: [1, 1.06, 1],
                }
          }
          transition={
            reduceMotion ? undefined : { duration: 22, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <motion.div
          className="absolute right-1/3 top-1/4 h-28 w-28 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-xl"
          style={{ y: bgY4 }}
          animate={
            reduceMotion
              ? undefined
              : { x: [10, -10, 10], y: [-10, 10, -10] }
          }
          transition={
            reduceMotion ? undefined : { duration: 11, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden"
        aria-hidden
      >
        <div className="liquid-glass-layer opacity-[0.4]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-editorial px-4 py-6 sm:px-6 md:py-10 lg:px-8">
        <motion.div
          className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12"
          style={{ y: contentY, opacity: heroOpacity }}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center lg:col-span-7 lg:text-left">
            {profile?.is_available_for_hire && (
              <motion.div variants={staggerItem} className="mb-5 flex justify-center lg:justify-start">
                <Badge
                  variant="success"
                  className="border border-emerald-500/20 shadow-sm shadow-emerald-500/10"
                >
                  <span className="relative mr-2 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  Available for hire
                </Badge>
              </motion.div>
            )}

            <motion.div variants={staggerItem}>
              <p className="mb-3 text-caption font-medium uppercase tracking-eyebrow text-muted-foreground">
                {profile?.title || 'Full-Stack Developer'}
              </p>
              <h1 className="text-balance">
                <span className="mb-1 block text-caption font-medium uppercase tracking-eyebrow text-muted-foreground/90">
                  Hi, I&apos;m
                </span>
                <span className="block bg-gradient-to-br from-foreground-display to-foreground/80 bg-clip-text text-display-xl font-semibold tracking-display text-transparent">
                  {name}
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={staggerItem}
              className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground/95 line-clamp-3 sm:line-clamp-none md:text-xl md:leading-relaxed lg:mx-0 lg:max-w-lg"
            >
              {profile?.short_bio ||
                'Senior Flutter developer focused on clean architecture, scalable systems, and high-performance mobile apps.'}
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
            >
              <div
                ref={primaryMagnetic.ref}
                onMouseMove={primaryMagnetic.onMouseMove}
                onMouseLeave={primaryMagnetic.onMouseLeave}
                className="transition-transform duration-200 ease-out will-change-transform sm:inline-flex"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    size="xl"
                    className="shadow-card shadow-primary/15 transition-shadow duration-300 hover:shadow-card-hover"
                  >
                    <Link href="/#home-work">
                      View work
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
              <div
                ref={secondaryMagnetic.ref}
                onMouseMove={secondaryMagnetic.onMouseMove}
                onMouseLeave={secondaryMagnetic.onMouseLeave}
                className="transition-transform duration-200 ease-out will-change-transform sm:inline-flex"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" size="xl" asChild>
                    <Link href="/contact">
                      Contact
                      <Mail className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
              {hasResume && (
                <motion.div
                  className="sm:inline-flex"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ResumeDownloadButton variant="ghost" size="xl" label="Résumé" />
                </motion.div>
              )}
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mt-8 flex justify-center gap-3 lg:justify-start"
            >
              {profile?.social_links?.github && (
                <motion.a
                  href={profile.social_links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-chip rounded-full p-3 transition-opacity hover:border-primary/30 hover:opacity-95"
                  aria-label="GitHub"
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
              )}
              {profile?.social_links?.linkedin && (
                <motion.a
                  href={profile.social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-chip rounded-full p-3 transition-opacity hover:border-primary/30 hover:opacity-95"
                  aria-label="LinkedIn"
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
              )}
              {profile?.social_links?.twitter && (
                <motion.a
                  href={profile.social_links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-chip rounded-full p-3 transition-opacity hover:border-primary/30 hover:opacity-95"
                  aria-label="Twitter"
                  whileHover={{ y: -2, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            variants={scaleIn}
            className="flex justify-center lg:col-span-5 lg:justify-end"
          >
            <div className="relative aspect-[4/5] w-full max-w-[280px] sm:max-w-[320px]">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-[hsl(var(--accent-line)/0.12)] opacity-80 blur-2xl" />
              <div className="glass-surface-soft relative h-full min-h-[240px] overflow-hidden rounded-[1.75rem] ring-1 ring-border/50 sm:min-h-[280px]">
                <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-foreground/5" />
                <Image
                  src={profile?.avatar_url || '/images/avatar-placeholder.svg'}
                  alt={profile?.full_name || 'Profile picture'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 280px, 320px"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:bottom-10"
        style={{ opacity: scrollHintOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: motionDuration.sm }}
      >
        <div className="glass-chip flex h-10 w-6 items-start justify-center rounded-full p-1">
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
            transition={
              reduceMotion ? undefined : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            }
            className="h-3 w-1.5 rounded-full bg-muted-foreground/50"
          />
        </div>
      </motion.div>
    </section>
  );
}
