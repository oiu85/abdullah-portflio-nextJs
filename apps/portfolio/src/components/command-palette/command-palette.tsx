'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { useTheme } from 'next-themes';
import {
  Home,
  User,
  FolderKanban,
  Sparkles,
  Briefcase,
  Mail,
  Sun,
  Moon,
  CornerDownLeft,
} from 'lucide-react';
import { cn } from '@portfolio/ui';
import { toggleThemeWithTransition } from '@/lib/theme-transition';

const HOME_SECTIONS = [
  { id: 'home-hero', label: 'Home — Hero', href: '/#home-hero' },
  { id: 'home-work', label: 'Home — Featured work', href: '/#home-work' },
  { id: 'home-skills', label: 'Home — Skills', href: '/#home-skills' },
  { id: 'home-cta', label: 'Home — Contact CTA', href: '/#home-cta' },
] as const;

const ROUTES = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/skills', label: 'Skills', icon: Sparkles },
  { href: '/experience', label: 'Experience', icon: Briefcase },
  { href: '/contact', label: 'Contact', icon: Mail },
] as const;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const t = window.requestAnimationFrame(() => inputRef.current?.focus());
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('keydown', onEscape);
      document.body.style.overflow = '';
      window.cancelAnimationFrame(t);
    };
  }, [open]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      if (href.startsWith('/#')) {
        const hash = href.slice(1);
        if (pathname === '/') {
          const id = hash.replace('#', '');
          window.requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          });
        } else {
          router.push(href);
        }
        return;
      }
      router.push(href);
    },
    [pathname, router]
  );

  const toggleTheme = useCallback(() => {
    if (!resolvedTheme) return;
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    toggleThemeWithTransition(setTheme, next);
    setOpen(false);
  }, [resolvedTheme, setTheme]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200]">
      <button
        type="button"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        aria-label="Close command menu"
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          'glass-surface-strong pointer-events-auto absolute left-1/2 top-[min(22vh,8rem)] z-[201] w-[min(calc(100vw-2rem),440px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-border/50 shadow-card-hover'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-palette-title"
      >
        <Command className="bg-transparent" label="Command menu">
          <div className="border-b border-border/50 px-3 py-2">
            <p id="command-palette-title" className="sr-only">
              Command menu
            </p>
            <Command.Input
              ref={inputRef}
              placeholder="Go anywhere…"
              className="w-full border-0 bg-transparent py-3 text-base text-foreground outline-none placeholder:text-muted-foreground focus:ring-0"
            />
          </div>
          <Command.List className="max-h-[min(55vh,360px)] overflow-y-auto overscroll-contain p-2">
            <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
              No matches.
            </Command.Empty>

            <Command.Group
              heading="Navigate"
              className="px-1 py-1 text-caption font-medium uppercase tracking-eyebrow text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
            >
              {ROUTES.map(({ href, label, icon: Icon }) => (
                <Command.Item
                  key={href}
                  value={`${label} ${href}`}
                  onSelect={() => go(href)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground aria-selected:bg-muted/80 aria-selected:text-foreground"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  {label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="On this page (home)"
              className="px-1 py-1 text-caption font-medium uppercase tracking-eyebrow text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
            >
              {HOME_SECTIONS.map(({ id, label, href }) => (
                <Command.Item
                  key={id}
                  value={label}
                  onSelect={() => go(href)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground aria-selected:bg-muted/80 aria-selected:text-foreground"
                >
                  <CornerDownLeft className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  {label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Appearance"
              className="px-1 py-1 text-caption font-medium uppercase tracking-eyebrow text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2"
            >
              <Command.Item
                value="toggle theme dark light mode"
                onSelect={toggleTheme}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground aria-selected:bg-muted/80 aria-selected:text-foreground"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                ) : (
                  <Moon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                )}
                Toggle theme
              </Command.Item>
            </Command.Group>
          </Command.List>
          <div className="border-t border-border/50 px-4 py-2.5 text-caption text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <kbd className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5 font-mono text-[0.65rem]">
                Esc
              </kbd>
              close
              <span className="mx-1 text-border">·</span>
              <kbd className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5 font-mono text-[0.65rem]">
                ↵
              </kbd>
              open
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}
