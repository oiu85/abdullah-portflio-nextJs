import Link from 'next/link';
import { Plus, Edit, Eye, EyeOff } from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@portfolio/ui';
import { createClient } from '@/lib/supabase/server';
import { DeleteButton } from '@/components/delete-button';
import type { Skill } from '@portfolio/types';

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  tools: 'Tools',
  design: 'Design',
  soft_skills: 'Soft Skills',
  other: 'Other',
};

async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('skills')
    .select('*')
    .order('category')
    .order('display_order');
  return (data || []) as Skill[];
}

export default async function SkillsPage() {
  const skills = await getSkills();

  // Group skills by category
  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground">Manage your skills and technologies</p>
        </div>
        <Button asChild>
          <Link href="/skills/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Link>
        </Button>
      </div>

      {/* Skills by Category */}
      {Object.keys(groupedSkills).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h2 className="text-xl font-semibold mb-4">{categoryLabels[category] || category}</h2>
              <div className="grid gap-3">
                {categorySkills.map((skill) => (
                  <Card key={skill.id}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
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
            <p className="text-muted-foreground mb-4">No skills yet</p>
            <Button asChild>
              <Link href="/skills/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Skill
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
