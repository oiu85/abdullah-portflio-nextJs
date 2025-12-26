'use client';

import { useState } from 'react';

interface SkillIconProps {
  icon?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  transparent?: boolean;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export function SkillIcon({ icon, name, size = 'md', className = '', transparent = false }: SkillIconProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const bgClass = transparent ? 'bg-transparent' : 'bg-muted';

  // Check if icon is a valid non-empty string
  const hasValidIcon = icon && typeof icon === 'string' && icon.trim().length > 0;

  if (!hasValidIcon || hasError) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-md ${bgClass} flex items-center justify-center flex-shrink-0 ${className}`}
        aria-label={`${name} icon`}
      >
        <span className={`text-xs font-medium ${transparent ? 'text-current opacity-70' : 'text-muted-foreground'}`}>
          {name.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-md overflow-hidden ${bgClass} flex items-center justify-center flex-shrink-0 ${className} relative`}
      aria-label={`${name} icon`}
    >
      {isLoading && !transparent && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <img
        src={icon}
        alt={`${name} icon`}
        className={`w-full h-full object-contain ${transparent ? 'p-0' : 'p-1'} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}

