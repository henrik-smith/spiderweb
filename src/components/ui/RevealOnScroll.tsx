'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
}

export default function RevealOnScroll({ children, className, direction = 'up', delay = 0 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const x = direction === 'left' ? -40 : direction === 'right' ? 40 : 0;
    const y = direction === 'up' ? 40 : 0;

    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        x,
        y,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: ref.current!,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [direction, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
