'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@portfolio/ui';
import { cn } from '@portfolio/ui';
import { useHomeScrollSpy, type HomeSectionId } from '@/hooks/use-home-scroll-spy';
import { toggleThemeWithTransition } from '@/lib/theme-transition';
import { motionEase } from '@/lib/motion';

type NavItem = {
  href: string;
  label: string;
  /** When set, this link is highlighted on `/` while this section is in view. */
  homeSection?: HomeSectionId;
};

const navItems: NavItem[] = [
  { href: '/', label: 'Home', homeSection: 'home-hero' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects', homeSection: 'home-work' },
  { href: '/skills', label: 'Skills', homeSection: 'home-skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/contact', label: 'Contact', homeSection: 'home-cta' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  const activeSection = useHomeScrollSpy(pathname === '/');
  const effectiveSection =
    activeSection ?? (pathname === '/' ? 'home-hero' : null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleThemeToggle = useCallback(() => {
    if (!resolvedTheme) return;
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    toggleThemeWithTransition(setTheme, next);
  }, [resolvedTheme, setTheme]);

  const isNavActive = (item: NavItem) => {
    if (item.homeSection && pathname === '/') {
      return effectiveSection === item.homeSection;
    }
    return pathname === item.href;
  };

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-[background,box-shadow,border-color,backdrop-filter] duration-500 ease-out',
        isScrolled || isMobileMenuOpen
          ? 'border-b glass-nav'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="group text-lg font-semibold tracking-tight transition-colors hover:text-primary"
          >
            <span className="inline-flex items-baseline gap-0.5">
              AA
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-125"
                aria-hidden
              />
            </span>
          </Link>

          <div className="glass-nav-pill hidden items-center rounded-full p-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200',
                  isNavActive(item)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isNavActive(item) ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-background shadow-sm ring-1 ring-border/60"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleThemeToggle}
                aria-label="Toggle theme"
                className="transition-colors duration-300"
              >
                <motion.span
                  key={resolvedTheme}
                  initial={reduceMotion ? false : { scale: 0.88, opacity: 0.75 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.28,
                    ease: motionEase.out,
                  }}
                  className="inline-flex"
                >
                  {resolvedTheme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t md:hidden"
            >
              <div className="glass-surface-strong space-y-1 rounded-2xl py-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block rounded-xl px-4 py-2.5 text-base font-medium transition-colors',
                      isNavActive(item)
                        ? 'bg-muted/80 text-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
