import type { Profile } from '@portfolio/types';

interface JsonLdProps {
  profile: Profile | null;
  siteUrl: string;
}

export function JsonLd({ profile, siteUrl }: JsonLdProps) {
  const name = profile?.full_name ?? 'Abdullah Alatrash';
  const jobTitle = profile?.title ?? 'Senior Mobile Developer';
  const sameAs = [
    profile?.social_links?.github,
    profile?.social_links?.linkedin,
    profile?.social_links?.twitter,
    profile?.social_links?.website,
  ].filter(Boolean) as string[];

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    url: siteUrl,
    ...(profile?.email && { email: profile.email }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${name} — Portfolio`,
    url: siteUrl,
    description:
      'Senior Mobile Developer portfolio — Flutter, clean architecture, and high-performance mobile applications.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
