import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@portfolio/ui';
import { getAllSkillSections } from '@/lib/skill-sections-server';
import { DeleteButton } from '@/components/delete-button';

export default async function SkillSectionsPage() {
  const sections = await getAllSkillSections();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Skill sections</h1>
          <p className="text-muted-foreground">
            Group skills on the public Skills page. Order follows display order.
          </p>
        </div>
        <Button asChild>
          <Link href="/skills/sections/new">
            <Plus className="mr-2 h-4 w-4" />
            Add section
          </Link>
        </Button>
      </div>

      {sections.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-muted-foreground">No sections yet.</p>
            <Button asChild>
              <Link href="/skills/sections/new">
                <Plus className="mr-2 h-4 w-4" />
                Create first section
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sections.map((s) => (
            <Card key={s.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{s.label}</span>
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      {s.slug}
                    </code>
                    {s.is_published ? (
                      <Badge variant="success">Published</Badge>
                    ) : (
                      <Badge variant="secondary">Hidden</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Order: {s.display_order}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/skills/sections/${s.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteButton
                    table="skill_sections"
                    id={s.id}
                    title={s.label}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        <Link href="/skills" className="text-primary underline-offset-4 hover:underline">
          Back to skills
        </Link>
      </p>
    </div>
  );
}
