'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Button, Input, Textarea, Label } from '@portfolio/ui';
import { createClient } from '@/lib/supabase/client';
import { motionDuration, motionEase, listStaggerContainer, listStaggerItem } from '@/lib/motion';
import { useAccessibleMotionScale } from '@/hooks/use-accessible-motion-scale';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitMotion = useAccessibleMotionScale({ hover: 1.015, tap: 0.99 });
  const reduceMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const supabase = createClient();
      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([data]);

      if (submitError) throw submitError;

      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const rowProps = reduceMotion
    ? {}
    : {
        variants: listStaggerItem,
      };

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: motionDuration.md, ease: motionEase.out }}
          className="py-6 text-center"
        >
          <motion.div
            initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 0.05 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/10 shadow-inner"
          >
            <CheckCircle className="h-9 w-9 text-emerald-600 dark:text-emerald-400" />
          </motion.div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight">Message sent</h3>
          <p className="mb-6 text-muted-foreground">
            Thank you for reaching out. I&apos;ll get back to you as soon as possible.
          </p>
          <motion.div {...submitMotion} className="inline-block">
            <Button variant="outline" onClick={() => setIsSuccess(false)}>
              Send another message
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? undefined : 'visible'}
          variants={reduceMotion ? undefined : listStaggerContainer}
          exit={{ opacity: 0 }}
          transition={{ duration: motionDuration.sm }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <motion.div {...rowProps} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                required
                disabled={isSubmitting}
                className="border-border/60 bg-background/50 transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                disabled={isSubmitting}
                className="border-border/60 bg-background/50 transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </motion.div>

          <motion.div {...rowProps} className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="What is this about?"
              required
              disabled={isSubmitting}
              className="border-border/60 bg-background/50 transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
            />
          </motion.div>

          <motion.div {...rowProps} className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message..."
              className="min-h-[150px] border-border/60 bg-background/50 transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
              required
              disabled={isSubmitting}
            />
          </motion.div>

          {error ? (
            <motion.div
              role="alert"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </motion.div>
          ) : null}

          <motion.div {...rowProps} {...submitMotion} className="w-full">
            <Button
              type="submit"
              className="w-full shadow-card transition-shadow hover:shadow-card-hover"
              isLoading={isSubmitting}
            >
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
