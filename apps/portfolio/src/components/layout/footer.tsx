'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Copy, Check, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Input, Button } from '@portfolio/ui';
import type { FooterSiteContent } from '@portfolio/validation';

const iconByKey: Record<'github' | 'linkedin' | 'twitter', LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export type FooterSocialItem =
  | {
      kind: 'link';
      href: string;
      label: string;
      iconKey: 'github' | 'linkedin' | 'twitter';
    }
  | { kind: 'email'; email: string; label: string };

export type FooterProps = {
  copy: FooterSiteContent;
  /** Profile email drives copy-to-clipboard; optional social links from profile. */
  email: string;
  socialItems: FooterSocialItem[];
};

export function Footer({ copy, email, socialItems }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [showEmailCopy, setShowEmailCopy] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <footer className="glass-footer relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        aria-hidden
      />
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-baseline gap-1 text-lg font-semibold tracking-tight transition-colors hover:text-primary"
            >
              {copy.brand_mark}
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {copy.tagline}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              {copy.quick_links_heading}
            </h4>
            <nav className="flex flex-col gap-2">
              {copy.footer_nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
              {copy.connect_heading}
            </h4>
            <div className="flex flex-col gap-3">
              {socialItems.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {socialItems.map((item) => {
                    if (item.kind === 'email') {
                      return (
                        <button
                          key="email"
                          type="button"
                          onClick={() => setShowEmailCopy(!showEmailCopy)}
                          className="inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          aria-label={item.label}
                          title={item.label}
                        >
                          <Mail className="h-5 w-5" />
                        </button>
                      );
                    }
                    const Icon = iconByKey[item.iconKey];
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex cursor-pointer items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label={item.label}
                        title={item.label}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              )}

              {showEmailCopy && email && (
                <div className="flex items-center gap-2 transition-all duration-200">
                  <div className="flex flex-1 gap-2">
                    <Input
                      type="text"
                      value={email}
                      readOnly
                      className="cursor-text text-sm"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(email);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        } catch {
                          const input = document.createElement('input');
                          input.value = email;
                          document.body.appendChild(input);
                          input.select();
                          document.execCommand('copy');
                          document.body.removeChild(input);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }
                      }}
                      aria-label="Copy email"
                      title="Copy email"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setShowEmailCopy(false);
                        setCopied(false);
                      }}
                      aria-label="Close"
                      title="Close"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} {copy.copyright_holder}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
