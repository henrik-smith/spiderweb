'use client';

import { useEffect, useRef } from 'react';

export default function ScrollVelocity() {
  const lastScrollY = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY.current);
      lastScrollY.current = currentY;

      // Smooth the velocity (lerp toward target)
      const targetVelocity = Math.min(delta / 50, 1);
      velocityRef.current += (targetVelocity - velocityRef.current) * 0.1;

      document.documentElement.style.setProperty(
        '--scroll-velocity',
        velocityRef.current.toFixed(3)
      );

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return null;
}
