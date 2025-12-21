import { cn } from '../utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        {
          'bg-primary text-primary-foreground': variant === 'default',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
          'border border-input bg-background': variant === 'outline',
          'bg-destructive text-destructive-foreground': variant === 'destructive',
          'bg-green-500/10 text-green-600 dark:text-green-400': variant === 'success',
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
