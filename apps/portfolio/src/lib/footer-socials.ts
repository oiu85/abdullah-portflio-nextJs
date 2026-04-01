import type { Profile } from '@portfolio/types';
import type { FooterSocialItem } from '@/components/layout/footer';

/** Builds footer social + email actions from profile (single source for URLs). */
export function buildFooterSocialItems(profile: Profile | null): FooterSocialItem[] {
  const items: FooterSocialItem[] = [];
  const sl = profile?.social_links;
  if (sl?.github) {
    items.push({
      kind: 'link',
      href: sl.github,
      label: 'GitHub',
      iconKey: 'github',
    });
  }
  if (sl?.linkedin) {
    items.push({
      kind: 'link',
      href: sl.linkedin,
      label: 'LinkedIn',
      iconKey: 'linkedin',
    });
  }
  if (sl?.twitter) {
    items.push({
      kind: 'link',
      href: sl.twitter,
      label: 'Twitter',
      iconKey: 'twitter',
    });
  }
  if (profile?.email) {
    items.push({
      kind: 'email',
      email: profile.email,
      label: 'Email',
    });
  }
  return items;
}
