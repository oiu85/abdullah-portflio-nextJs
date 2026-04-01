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
import { motionDuration, motionEase, staggerItem } from '@/lib/motion';

interface HeroSectionProps {
  profile: Profile | null;
}

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.18,
    },
  },
};

export function HeroSection({ profile }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const parallax = reduceMotion ? 0 : 1;
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, 120 * parallax]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 70 * parallax]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], [0, 40 * parallax]);
  const bgY4 = useTransform(scrollYProgress, [0, 1], [0, 55 * parallax]);
  /** Keep small — large values + overflow clip hid social icons behind the next section. */
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 18 * parallax]);
  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.65],
    [1, reduceMotion ? 1 : 0.15]
  );
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const name = profile?.full_name || 'John Doe';

  return (
    <section
      ref={sectionRef}
      id="home-hero"
      className="relative z-10 flex min-h-screen flex-col overflow-x-hidden pt-16 pb-28 md:pb-36 lg:pb-44"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-2xl"
          style={{ y: bgY1 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [-100, 100, -100],
                  y: [100, -100, 100],
                  scale: [1, 1.1, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 12, repeat: Infinity, ease: 'linear' }
          }
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-2xl"
          style={{ y: bgY2 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [100, -100, 100],
                  y: [-100, 100, -100],
                  scale: [1, 1.05, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : { duration: 15, repeat: Infinity, ease: 'linear' }
          }
        />
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-xl"
          style={{ y: bgY3 }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: [0, 180, 360], x: [50, -50, 50], y: [-50, 50, -50] }
          }
          transition={
            reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'linear' }
          }
        />
        <motion.div
          className="absolute right-1/3 top-1/3 h-32 w-32 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-lg"
          style={{ y: bgY4 }}
          animate={
            reduceMotion
              ? undefined
              : { x: [30, -30, 30], y: [-30, 30, -30], scale: [0.8, 1.2, 0.8] }
          }
          transition={
            reduceMotion ? undefined : { duration: 13, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto w-full max-w-4xl"
        style={{ y: contentY, opacity: heroOpacity }}
      >
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          {profile?.is_available_for_hire && (
            <motion.div variants={staggerItem} className="mb-6">
              <Badge variant="success" className="shadow-sm">
                <span className="relative mr-2 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available for hire
              </Badge>
            </motion.div>
          )}

          <motion.div variants={staggerItem} className="mb-10">
            <motion.div
              initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: motionDuration.lg,
                ease: motionEase.out,
              }}
              className="relative mx-auto h-[200px] w-[200px]"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-60 blur-2xl" />
              <Image
                src={profile?.avatar_url || '/images/avatar-placeholder.svg'}
                alt={profile?.full_name || 'Profile Picture'}
                width={200}
                height={200}
                className="relative rounded-full border-4 border-background object-cover shadow-xl"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              <span className="block text-muted-foreground">Hi, I&apos;m</span>
              <span className="mt-1 block text-primary">{name}</span>
            </h1>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="mb-4 text-xl text-muted-foreground md:text-2xl"
          >
            {profile?.title || 'Full-Stack Developer'}
          </motion.p>

          <motion.p
            variants={staggerItem}
            className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground/95"
          >
            {profile?.short_bio ||
              'Senior Flutter developer focused on clean architecture, scalable systems, and high-performance mobile apps.'}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mb-12 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="xl" className="shadow-lg shadow-primary/15">
                <Link href="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="xl" asChild>
                <Link href="/contact">
                  Contact Me
                  <Mail className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="flex justify-center gap-3 pb-2"
          >
            {profile?.social_links?.github && (
              <motion.a
                href={profile.social_links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-muted p-3 transition-colors hover:bg-muted/80"
                aria-label="GitHub"
                whileHover={{ y: -3, scale: 1.05 }}
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
                className="rounded-full bg-muted p-3 transition-colors hover:bg-muted/80"
                aria-label="LinkedIn"
                whileHover={{ y: -3, scale: 1.05 }}
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
                className="rounded-full bg-muted p-3 transition-colors hover:bg-muted/80"
                aria-label="Twitter"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 md:bottom-12"
        style={{ opacity: scrollHintOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: motionDuration.sm }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/30 p-1">
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
