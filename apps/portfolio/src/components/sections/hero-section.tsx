'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button, Badge } from '@portfolio/ui';
import type { Profile } from '@portfolio/types';

interface HeroSectionProps {
  profile: Profile | null;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Animated infinity moving background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating shapes */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-2xl"
          animate={{
            x: [-100, 100, -100],
            y: [100, -100, 100],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-2xl"
          animate={{
            x: [100, -100, 100],
            y: [-100, 100, -100],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Medium floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-xl"
          animate={{
            x: [50, -50, 50],
            y: [-50, 50, -50],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Small floating particles */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-lg"
          animate={{
            x: [30, -30, 30, -10],
            y: [-30, 30, -30, 10],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Additional floating elements for infinity pattern */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-xl"
          animate={{
            x: [-40, 40, -40, 20],
            y: [40, -40, 40, -20],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Subtle floating particles for depth */}
        <motion.div
          className="absolute top-1/5 right-1/4 w-20 h-20 bg-primary/5 rounded-full blur-md"
          animate={{
            x: [20, -20, 20],
            y: [-20, 20, -20],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Infinity path particles */}
        <motion.div
          className="absolute top-2/3 left-1/5 w-16 h-16 bg-secondary/5 rounded-full blur-sm"
          animate={{
            pathLength: [0, 1],
            x: [0, 150, 75, 0],
            y: [0, 0, 75, 75],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Availability Badge */}
          {profile?.is_available_for_hire && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="success" className="mb-6">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Available for hire
              </Badge>
            </motion.div>
          )}

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <Image
              src={profile?.avatar_url || '/images/my_image.jpg'}
              alt={profile?.full_name || 'Profile Picture'}
              width={200}
              height={200}
              className="rounded-full mx-auto border-4 border-background shadow-xl object-cover"
            />
          </motion.div>

          {/* Name & Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Hi, I&apos;m{' '}
            <span className="text-primary">
              {profile?.full_name || 'John Doe'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground mb-4"
          >
            {profile?.title || 'Full-Stack Developer'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            {profile?.short_bio ||
              'Senior Flutter developer focused on clean architecture, scalable systems, and high-performance mobile apps.'}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button asChild size="xl">
              <Link href="/projects">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="/contact">
                Contact Me
                <Mail className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            {profile?.social_links?.github && (
              <a
                href={profile.social_links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {profile?.social_links?.linkedin && (
              <a
                href={profile.social_links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {profile?.social_links?.twitter && (
              <a
                href={profile.social_links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-muted-foreground/50 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
