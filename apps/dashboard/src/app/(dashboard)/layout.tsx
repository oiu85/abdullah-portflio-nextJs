import { redirect } from 'next/navigation';
import { getUser } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
