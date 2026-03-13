'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        bar.style.width = `${self.progress * 100}%`;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none">
      <div ref={barRef} className="h-full bg-spark" style={{ width: '0%' }} />
    </div>
  );
}
