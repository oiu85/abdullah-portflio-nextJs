'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Copy, Check, X } from 'lucide-react';
import { Input, Button } from '@portfolio/ui';

const socialLinks = [
  { href: 'https://github.com/oiu85', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/abdullah-alatrash-398803391', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://x.com/85oiu85', icon: Twitter, label: 'Website' },
  { href: 'mailto:abdullahalatrash.dev@gmail.com', icon: Mail, label: 'Email' },
];

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

const EMAIL = 'abdullahalatrash.dev@gmail.com';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showEmailCopy, setShowEmailCopy] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="text-xl font-bold tracking-tight">
              AA<span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Senior Mobile Developer specialized in building high-performance Flutter applications.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-1.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const isMailto = social.href.startsWith('mailto:');
                  
                  if (isMailto) {
                    return (
                      <button
                        key={social.label}
                        type="button"
                        onClick={() => setShowEmailCopy(!showEmailCopy)}
                        className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label={social.label}
                        title={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </button>
                    );
                  }
                  
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
              
              {/* Email Copy Field */}
              {showEmailCopy && (
                <div className="flex gap-2 items-center transition-all duration-200">
                  <div className="flex-1 flex gap-2">
                    <Input
                      type="text"
                      value={EMAIL}
                      readOnly
                      className="text-sm cursor-text"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(EMAIL);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        } catch (err) {
                          // Fallback for older browsers
                          const input = document.createElement('input');
                          input.value = EMAIL;
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

        {/* Copyright */}
        <div className="mt-6 border-t pt-5 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Abdullah Alatrash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
