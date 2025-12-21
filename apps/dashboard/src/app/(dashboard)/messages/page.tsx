import { Mail, MailOpen, Archive } from 'lucide-react';
import { Card, CardContent, Badge } from '@portfolio/ui';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@portfolio/lib/utils';
import { MessageActions } from '@/components/message-actions';

async function getMessages() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .eq('is_archived', false)
    .order('created_at', { ascending: false });
  return data || [];
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Contact form submissions</p>
      </div>

      {messages.length > 0 ? (
        <div className="grid gap-4">
          {messages.map((message) => (
            <Card key={message.id} className={message.is_read ? 'opacity-75' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {message.is_read ? (
                      <MailOpen className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Mail className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{message.name}</span>
                      {!message.is_read && <Badge>New</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{message.email}</p>
                    <p className="font-medium mt-2">{message.subject}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {message.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDate(message.created_at)}
                    </p>
                  </div>
                  <MessageActions id={message.id} isRead={message.is_read} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No messages yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
