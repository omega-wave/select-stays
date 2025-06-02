import { cn } from '@/lib/utils';
import type React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
