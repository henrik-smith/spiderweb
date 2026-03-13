'use client';

import dynamic from 'next/dynamic';
import { BAND } from '@/lib/constants';
import AnimatedText from '@/components/ui/AnimatedText';

const BackgroundScene = dynamic(
  () => import('@/components/three/BackgroundScene'),
  { ssr: false }
);

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D background */}
      <div className="absolute inset-0 z-0">
        <BackgroundScene />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <AnimatedText
          text={BAND.name}
          className="hero-title text-center text-7xl font-bold uppercase tracking-tighter text-wire md:text-9xl"
        />

        <p className="hero-tagline mt-6 max-w-lg text-center font-mono text-sm tracking-wide text-smoke md:text-base">
          {BAND.tagline}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.3em] text-smoke">
            SCROLL
          </span>
          <div className="h-8 w-px animate-pulse bg-smoke/50" />
        </div>
      </div>
    </section>
  );
}
