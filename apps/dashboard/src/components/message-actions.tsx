'use client';

import { useRouter } from 'next/navigation';
import { MailOpen, Archive } from 'lucide-react';
import { Button } from '@portfolio/ui';
import { createClient } from '@/lib/supabase/client';

interface MessageActionsProps {
  id: string;
  isRead: boolean;
}

export function MessageActions({ id, isRead }: MessageActionsProps) {
  const router = useRouter();

  const markAsRead = async () => {
    const supabase = createClient();
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
    router.refresh();
  };

  const archive = async () => {
    const supabase = createClient();
    await supabase.from('contact_messages').update({ is_archived: true }).eq('id', id);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-1">
      {!isRead && (
        <Button variant="ghost" size="icon" onClick={markAsRead} title="Mark as read">
          <MailOpen className="h-4 w-4" />
        </Button>
      )}
      <Button variant="ghost" size="icon" onClick={archive} title="Archive">
        <Archive className="h-4 w-4" />
      </Button>
    </div>
  );
}
