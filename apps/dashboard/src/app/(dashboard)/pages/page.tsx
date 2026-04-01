import { createClient } from '@/lib/supabase/server';
import { parseSiteContentFromRows } from '@portfolio/validation';
import { PagesEditor } from '@/components/pages/pages-editor';

export default async function PagesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('site_pages').select('slug, content');
  const initial = parseSiteContentFromRows((data || []) as { slug: string; content: unknown }[]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pages</h1>
        <p className="text-muted-foreground">
          Edit marketing copy for the public portfolio. Changes save per tab.
        </p>
      </div>
      <PagesEditor initial={initial} />
    </div>
  );
}
