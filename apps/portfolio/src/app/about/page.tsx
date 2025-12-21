import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Phone, Download, Calendar } from 'lucide-react';
import { Button, Badge, Card, CardContent } from '@portfolio/ui';
import { getProfile, getExperience } from '@/lib/data';
import { formatDateRange } from '@portfolio/lib/utils';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me, my background, and what drives me as a developer.',
};

export const revalidate = 3600;

export default async function AboutPage() {
  const [profile, experiences] = await Promise.all([getProfile(), getExperience()]);

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground">
            Get to know the person behind the code
          </p>
        </div>

        {/* Profile Section */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Avatar & Quick Info */}
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Avatar */}
                <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden bg-muted">
                  {profile?.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt={profile.full_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground">
                      {profile?.full_name?.charAt(0) || 'J'}
                    </div>
                  )}
                </div>

                {/* Quick Info */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    {profile?.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {profile.location}
                      </div>
                    )}
                    {profile?.email && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {profile.email}
                      </div>
                    )}
                    {profile?.is_available_for_hire && (
                      <Badge variant="success" className="w-full justify-center">
                        Available for hire
                      </Badge>
                    )}
                  </CardContent>
                </Card>

                {/* Resume Download */}
                {profile?.resume_url && (
                  <Button className="w-full" asChild>
                    <a href={profile.resume_url} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {profile?.full_name || 'John Doe'}
                </h2>
                <p className="text-lg text-primary mb-4">
                  {profile?.title || 'Full-Stack Developer'}
                </p>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  {profile?.bio?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground">
                      {paragraph}
                    </p>
                  )) || (
                    <p className="text-muted-foreground">
                      A passionate developer with experience building modern web applications.
                    </p>
                  )}
                </div>
              </div>

              {/* Experience Timeline */}
              {experiences.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Experience</h3>
                  <div className="space-y-6">
                    {experiences.slice(0, 3).map((exp, index) => (
                      <div
                        key={exp.id}
                        className="relative pl-8 pb-6 border-l-2 border-muted last:pb-0"
                      >
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Calendar className="h-3 w-3" />
                          {formatDateRange(exp.start_date, exp.end_date)}
                        </div>
                        <h4 className="font-semibold">{exp.position}</h4>
                        <p className="text-sm text-primary">{exp.company}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-6" asChild>
                    <Link href="/experience">View Full Experience</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
