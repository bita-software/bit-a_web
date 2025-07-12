'use client';

import { useSmoothScroll } from '../../lib/hooks/useSmoothScroll';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useSmoothScroll();
  
  return <>{children}</>;
} 