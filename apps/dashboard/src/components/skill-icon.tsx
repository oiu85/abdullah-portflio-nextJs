'use client';

import { useState } from 'react';

interface SkillIconProps {
  icon?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function SkillIcon({ icon, name, size = 'md', className = '' }: SkillIconProps) {
  const [hasError, setHasError] = useState(false);

  if (!icon || hasError) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-md bg-muted flex items-center justify-center flex-shrink-0 ${className}`}
        aria-label={`${name} icon`}
      >
        <span className="text-muted-foreground text-xs">?</span>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-md overflow-hidden bg-muted flex items-center justify-center flex-shrink-0 ${className}`}
      aria-label={`${name} icon`}
    >
      <img
        src={icon}
        alt={name}
        className="w-full h-full object-contain p-1"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

