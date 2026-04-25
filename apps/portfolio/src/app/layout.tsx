import type { Metadata } from 'next';
import '@fontsource-variable/inter/wght.css';
import '@fontsource/jetbrains-mono/latin.css';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { NavigationProgress } from '@/components/layout/navigation-progress';
import { JsonLd } from '@/components/json-ld';
import { getProfile, getSiteContent } from '@/lib/data';
import { buildFooterSocialItems } from '@/lib/footer-socials';
import { ElevenLabsConvaiWidget } from '@/components/elevenlabs-convai-widget';

const defaultSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultSiteUrl),
  title: {
    default: 'Abdullah Alatrash | Senior Mobile Developer',
    template: '%s | Abdullah Alatrash',
  },
  description:
    'Senior Mobile Developer specialized in building high-performance Flutter applications using clean and scalable architectures.',
  keywords: ['developer', 'portfolio', 'flutter', 'mobile', 'dart', 'clean architecture'],
  authors: [{ name: 'Abdullah Alatrash' }],
  creator: 'Abdullah Alatrash',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Abdullah Alatrash Portfolio',
    title: 'Abdullah Alatrash | Senior Mobile Developer',
    description:
      'Senior Mobile Developer specialized in building high-performance Flutter applications using clean and scalable architectures.',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@oiu85',
    title: 'Abdullah Alatrash | Senior Mobile Developer',
    description:
      'Senior Mobile Developer specialized in building high-performance Flutter applications using clean and scalable architectures.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, siteContent] = await Promise.all([
    getProfile(),
    getSiteContent(),
  ]);
  const footerSocialItems = buildFooterSocialItems(profile);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <JsonLd profile={profile} siteUrl={defaultSiteUrl} />
        <Providers>
          <NavigationProgress />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer
              copy={siteContent.footer}
              email={profile?.email ?? ''}
              socialItems={footerSocialItems}
            />
          </div>
        </Providers>
        <ElevenLabsConvaiWidget />
      </body>
    </html>
  );
}
