'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TRACKS } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function TrackShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
    const totalScroll = containerRef.current.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Horizontal scroll pin
      gsap.to(containerRef.current, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });

      // Per-panel reveal animations
      panels.forEach((panel) => {
        const content = panel.querySelector('.panel-content');
        const watermark = panel.querySelector('.panel-watermark');
        const divider = panel.querySelector('.panel-divider');

        if (content) {
          gsap.from(content, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById?.('hscroll') || undefined,
              start: 'left 80%',
              toggleActions: 'play none none none',
              // Use the horizontal scroll container as scroller context
              scroller: undefined,
            },
          });
        }

        if (watermark) {
          gsap.from(watermark, {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              start: 'left 90%',
              toggleActions: 'play none none none',
            },
          });
        }

        if (divider) {
          gsap.from(divider, {
            scaleY: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: panel,
              start: 'left 70%',
              toggleActions: 'play none none none',
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div
        ref={containerRef}
        className="flex"
        style={{ width: `${TRACKS.length * 100}vw` }}
      >
        {TRACKS.map((track, i) => (
          <div
            key={track.id}
            ref={(el) => { panelsRef.current[i] = el; }}
            className="relative flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden"
          >
            {/* Vertical divider on left edge (except first panel) */}
            {i > 0 && (
              <div
                className="panel-divider absolute left-0 top-[15%] h-[70%] w-px origin-top"
                style={{
                  background: 'linear-gradient(to bottom, transparent, var(--color-ash) 20%, var(--color-ash) 80%, transparent)',
                }}
              />
            )}

            {/* Giant watermark number behind everything */}
            <span
              className="panel-watermark pointer-events-none absolute select-none font-bold leading-none text-wire/[0.03]"
              style={{ fontSize: 'clamp(12rem, 30vw, 28rem)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Panel content */}
            <div className="panel-content relative z-10 px-8 md:px-16 max-w-xl">
              {/* Small track number */}
              <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-smoke">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Track title */}
              <h3
                className="font-bold uppercase tracking-tight text-wire"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                {track.title}
              </h3>

              {/* Album + year */}
              <p className="mt-3 font-mono text-xs tracking-[0.2em] text-smoke">
                {track.album} &middot; {track.year}
              </p>

              {/* Play button */}
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('play-track', { detail: { trackId: track.id } })
                  );
                }}
                className="mt-8 group flex items-center gap-4 transition-colors"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-smoke text-smoke transition-all duration-300 group-hover:border-spark group-hover:text-spark group-hover:scale-110 group-hover:shadow-[0_0_30px_var(--color-glow)]">
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
                    <polygon points="2,0 20,12 2,24" />
                  </svg>
                </span>
                <span className="font-mono text-xs tracking-[0.2em] text-smoke group-hover:text-spark transition-colors duration-300">
                  PLAY
                </span>
              </button>

              {/* Streaming link */}
              <div className="mt-8">
                <a
                  href={track.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs tracking-wider text-smoke hover:text-wire transition-colors duration-300"
                >
                  SPOTIFY ↗
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint at bottom */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-xs tracking-wider text-smoke/50">
        ← SCROLL →
      </div>
    </section>
  );
}
