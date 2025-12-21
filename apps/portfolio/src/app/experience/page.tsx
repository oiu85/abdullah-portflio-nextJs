import type { Metadata } from 'next';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@portfolio/ui';
import { getExperience } from '@/lib/data';
import { formatDateRange } from '@portfolio/lib/utils';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'My professional journey and work experience.',
};

export const revalidate = 3600;

export default async function ExperiencePage() {
  const experiences = await getExperience();

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Experience</h1>
          <p className="text-xl text-muted-foreground">
            My professional journey and the companies I&apos;ve had the pleasure to work with.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {experiences.length > 0 ? (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className={`relative grid md:grid-cols-2 gap-8 ${
                      index % 2 === 0 ? '' : 'md:text-right'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 top-8 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

                    {/* Content */}
                    <div
                      className={`md:col-span-1 pl-8 md:pl-0 ${
                        index % 2 === 0 ? 'md:pr-12' : 'md:order-2 md:pl-12'
                      }`}
                    >
                      <Card>
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="h-4 w-4" />
                            {formatDateRange(exp.start_date, exp.end_date)}
                            {exp.is_current && (
                              <Badge variant="success" className="ml-2">
                                Current
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-xl">{exp.position}</CardTitle>
                          <div className="flex items-center gap-2 text-primary">
                            {exp.company_url ? (
                              <a
                                href={exp.company_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline flex items-center gap-1"
                              >
                                {exp.company}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              exp.company
                            )}
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                              <MapPin className="h-3 w-3" />
                              {exp.location}
                            </div>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none mb-4">
                            {exp.description.split('\n\n').map((paragraph, i) => (
                              <p key={i} className="text-muted-foreground text-sm">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                          {exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className={`hidden md:block ${index % 2 === 0 ? 'md:order-2' : ''}`} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No experience entries found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
