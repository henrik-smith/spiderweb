'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof Pick<React.JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'>;
}

export default function AnimatedText({ text, className, delay = 0, as: Tag = 'h1' }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    const ctx = gsap.context(() => {
      gsap.from(chars, {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.03,
        delay,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text, delay]);

  const chars = text.split('').map((char, i) => (
    <span key={i} className="inline-block overflow-hidden">
      <span className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
    </span>
  ));

  return (
    <Tag ref={containerRef as React.Ref<HTMLHeadingElement>} className={className}>
      {chars}
    </Tag>
  );
}
