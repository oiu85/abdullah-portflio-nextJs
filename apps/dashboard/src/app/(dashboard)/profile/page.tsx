import { createClient } from '@/lib/supabase/server';
import { ProfileForm } from '@/components/forms/profile-form';

async function getProfile() {
  const supabase = await createClient();
  const { data } = await supabase.from('profile').select('*').single();
  return data;
}

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}
