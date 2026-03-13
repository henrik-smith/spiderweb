'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    // Detect touch device
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (hasCoarsePointer) {
      setIsTouch(true);
      return;
    }

    // Inject cursor-hiding style
    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setIsHovering(false);
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.15);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(raf.current);
      style.remove();
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white mix-blend-difference transition-[width,height] duration-200 ease-out"
      style={{
        width: isHovering ? 48 : 16,
        height: isHovering ? 48 : 16,
      }}
    />
  );
}
