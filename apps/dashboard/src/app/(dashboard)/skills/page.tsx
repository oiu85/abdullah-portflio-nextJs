import Link from 'next/link';
import { Plus, Edit, Eye, EyeOff } from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@portfolio/ui';
import { createClient } from '@/lib/supabase/server';
import { DeleteButton } from '@/components/delete-button';
import { SkillIcon } from '@/components/skill-icon';
import { getAllSkillSections } from '@/lib/skill-sections-server';
import type { Skill } from '@portfolio/types';

async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('skills')
    .select('*')
    .order('display_order');
  return (data || []) as Skill[];
}

export default async function SkillsPage() {
  const [skills, sections] = await Promise.all([
    getSkills(),
    getAllSkillSections(),
  ]);

  const grouped = sections
    .map((section) => ({
      section,
      skills: skills.filter((s) => s.section_id === section.id),
    }))
    .filter((g) => g.skills.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground">
            Manage your skills and technologies
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/skills/sections">Manage sections</Link>
          </Button>
          <Button asChild>
            <Link href="/skills/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Link>
          </Button>
        </div>
      </div>

      {grouped.length > 0 ? (
        <div className="space-y-8">
          {grouped.map(({ section, skills: sectionSkills }) => (
            <div key={section.id}>
              <h2 className="mb-4 text-xl font-semibold">{section.label}</h2>
              <div className="grid gap-3">
                {sectionSkills.map((skill) => (
                  <Card key={skill.id}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <SkillIcon icon={skill.icon} name={skill.name} size="md" />
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                      {skill.is_published ? (
                        <Badge variant="success">
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
                          <Link href={`/skills/${skill.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteButton table="skills" id={skill.id} title={skill.name} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="mb-4 text-muted-foreground">No skills yet</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild variant="outline">
                <Link href="/skills/sections">Manage sections</Link>
              </Button>
              <Button asChild>
                <Link href="/skills/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Skill
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
