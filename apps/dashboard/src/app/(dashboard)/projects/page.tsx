import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { Button, Card, CardContent, Badge } from '@portfolio/ui';
import { createClient } from '@/lib/supabase/server';
import { DeleteButton } from '@/components/delete-button';

async function getProjects() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });
  return data || [];
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button asChild>
          <Link href="/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Link>
        </Button>
      </div>

      {/* Projects List */}
      {projects.length > 0 ? (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="flex items-center gap-4 p-4">
                {/* Status */}
                <div className="flex-shrink-0">
                  {project.is_published ? (
                    <Badge variant="success">
                      <Eye className="mr-1 h-3 w-3" />
                      Published
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <EyeOff className="mr-1 h-3 w-3" />
                      Draft
                    </Badge>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{project.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {project.short_description}
                  </p>
                </div>

                {/* Featured */}
                {project.is_featured && (
                  <Badge variant="default">Featured</Badge>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {project.live_url && (
                    <Button variant="ghost" size="icon" asChild>
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/projects/${project.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteButton
                    table="projects"
                    id={project.id}
                    title={project.title}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No projects yet</p>
            <Button asChild>
              <Link href="/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Project
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
