'use client';

import { useEffect, useState } from 'react';

export type HomeSectionId =
  | 'home-hero'
  | 'home-work'
  | 'home-skills'
  | 'home-cta';

const SECTION_IDS: HomeSectionId[] = [
  'home-hero',
  'home-work',
  'home-skills',
  'home-cta',
];

/**
 * Tracks which home page section is most visible (IntersectionObserver).
 * Only meaningful when pathname is `/`.
 */
export function useHomeScrollSpy(enabled: boolean) {
  const [activeSection, setActiveSection] = useState<HomeSectionId | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') {
      setActiveSection(null);
      return;
    }

    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible.length > 0) {
          const id = visible[0].target.id as HomeSectionId;
          setActiveSection(id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [enabled]);

  return activeSection;
}
