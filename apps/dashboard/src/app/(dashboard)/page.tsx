import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@portfolio/ui';
import {
  FolderKanban,
  Lightbulb,
  Briefcase,
  Mail,
  Eye,
  FileEdit,
} from 'lucide-react';

async function getStats() {
  const supabase = await createClient();

  const [projects, skills, experience, messages] = await Promise.all([
    supabase.from('projects').select('id, is_published', { count: 'exact' }),
    supabase.from('skills').select('id', { count: 'exact' }),
    supabase.from('experience').select('id', { count: 'exact' }),
    supabase.from('contact_messages').select('id, is_read', { count: 'exact' }),
  ]);

  const publishedProjects = projects.data?.filter((p) => p.is_published).length || 0;
  const unreadMessages = messages.data?.filter((m) => !m.is_read).length || 0;

  return {
    totalProjects: projects.count || 0,
    publishedProjects,
    draftProjects: (projects.count || 0) - publishedProjects,
    totalSkills: skills.count || 0,
    totalExperience: experience.count || 0,
    totalMessages: messages.count || 0,
    unreadMessages,
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      description: `${stats.publishedProjects} published, ${stats.draftProjects} drafts`,
      icon: FolderKanban,
      color: 'text-blue-500',
    },
    {
      title: 'Skills',
      value: stats.totalSkills,
      description: 'Technologies & tools',
      icon: Lightbulb,
      color: 'text-yellow-500',
    },
    {
      title: 'Experience',
      value: stats.totalExperience,
      description: 'Work history entries',
      icon: Briefcase,
      color: 'text-green-500',
    },
    {
      title: 'Messages',
      value: stats.totalMessages,
      description: `${stats.unreadMessages} unread`,
      icon: Mail,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <FileEdit className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">Add New Project</h3>
                <p className="text-sm text-muted-foreground">Create a new portfolio project</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Lightbulb className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Add New Skill</h3>
                <p className="text-sm text-muted-foreground">Add a technology or tool</p>
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Eye className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">View Portfolio</h3>
                <p className="text-sm text-muted-foreground">See your public site</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
