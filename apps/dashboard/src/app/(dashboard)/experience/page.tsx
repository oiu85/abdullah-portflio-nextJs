import Link from 'next/link';
import { Plus, Edit, Eye, EyeOff, Calendar } from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@portfolio/ui';
import { createClient } from '@/lib/supabase/server';
import { DeleteButton } from '@/components/delete-button';
import { formatDateRange } from '@portfolio/lib/utils';

async function getExperience() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('experience')
    .select('*')
    .order('start_date', { ascending: false });
  return data || [];
}

export default async function ExperiencePage() {
  const experiences = await getExperience();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Experience</h1>
          <p className="text-muted-foreground">Manage your work history</p>
        </div>
        <Button asChild>
          <Link href="/experience/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Link>
        </Button>
      </div>

      {experiences.length > 0 ? (
        <div className="grid gap-4">
          {experiences.map((exp) => (
            <Card key={exp.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p className="text-sm text-primary">{exp.company}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3" />
                    {formatDateRange(exp.start_date, exp.end_date)}
                  </div>
                </div>
                {exp.is_current && <Badge variant="success">Current</Badge>}
                {exp.is_published ? (
                  <Badge variant="outline">
                    <Eye className="mr-1 h-3 w-3" />
                    Published
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <EyeOff className="mr-1 h-3 w-3" />
                    Hidden
                  </Badge>
                )}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/experience/${exp.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteButton table="experience" id={exp.id} title={exp.position} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No experience yet</p>
            <Button asChild>
              <Link href="/experience/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Experience
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
