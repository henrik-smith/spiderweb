'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapContext(scope: React.RefObject<HTMLElement | null>) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {}, scope.current ?? undefined);
    return () => {
      ctx.current?.revert();
    };
  }, [scope]);

  return ctx;
}

export { gsap, ScrollTrigger };
