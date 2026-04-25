import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        section: 'var(--section-y)',
        'section-tight': 'var(--section-y-tight)',
        'block-gap': 'var(--block-gap)',
      },
      maxWidth: {
        editorial: '72rem',
        content: '42rem',
      },
      fontSize: {
        'display-xl': [
          'clamp(2.5rem, 1.25rem + 5.5vw, 4.5rem)',
          { lineHeight: '1.04', letterSpacing: 'var(--display-tracking)' },
        ],
        display: [
          'clamp(2rem, 1rem + 3.8vw, 3.25rem)',
          { lineHeight: '1.08', letterSpacing: 'var(--display-tracking)' },
        ],
        title: [
          'clamp(1.25rem, 0.9rem + 1.2vw, 1.5rem)',
          { lineHeight: '1.2', fontWeight: '600' },
        ],
        body: [
          'clamp(1rem, 0.95rem + 0.2vw, 1.0625rem)',
          { lineHeight: '1.6' },
        ],
        caption: [
          'clamp(0.75rem, 0.7rem + 0.15vw, 0.8125rem)',
          { lineHeight: '1.45', letterSpacing: '0.02em' },
        ],
      },
      letterSpacing: {
        display: 'var(--display-tracking)',
        eyebrow: 'var(--eyebrow-tracking)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to right, hsl(var(--border) / 0.35) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.35) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            '--tw-prose-body': 'hsl(var(--foreground) / 0.9)',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-lead': 'hsl(var(--muted-foreground))',
            '--tw-prose-links': 'hsl(var(--primary))',
            '--tw-prose-bold': 'hsl(var(--foreground))',
            '--tw-prose-quotes': 'hsl(var(--muted-foreground))',
            '--tw-prose-code': 'hsl(var(--foreground))',
            '--tw-prose-bullets': 'hsl(var(--muted-foreground))',
            a: {
              fontWeight: '500',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            },
            'a:hover': {
              color: 'hsl(var(--primary))',
              opacity: '0.9',
            },
          },
        },
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        surface: {
          elevated: 'hsl(var(--surface-elevated))',
          inset: 'hsl(var(--surface-inset))',
        },
        'accent-line': 'hsl(var(--accent-line))',
        'foreground-display': 'hsl(var(--foreground-display))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'shimmer-line': 'shimmerLine 2.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmerLine: {
          '0%, 100%': { opacity: '0.35', transform: 'scaleX(0.92)' },
          '50%': { opacity: '1', transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
