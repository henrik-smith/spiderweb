'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function useLenis() {
  const lenis = useRef<Lenis | null>(lenisInstance);

  useEffect(() => {
    if (!lenisInstance) {
      lenisInstance = new Lenis({ autoRaf: true });
    }
    lenis.current = lenisInstance;

    return () => {
      // Don't destroy singleton here — SmoothScroll manages lifecycle
    };
  }, []);

  const scrollTo = (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
    lenis.current?.scrollTo(target, options);
  };

  return { lenis: lenis.current, scrollTo };
}
