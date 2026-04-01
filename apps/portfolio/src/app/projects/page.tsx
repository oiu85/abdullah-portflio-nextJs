import type { Metadata } from 'next';
import { getProjects } from '@/lib/data';
import { ProjectsPageContent } from '@/components/projects/projects-page-content';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of Flutter and mobile development projects showcasing my skills and experience.',
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsPageContent projects={projects} />;
}
