'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BAND } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const STREAMING_LINKS = [
  { label: 'SPOTIFY', href: BAND.socials.spotify },
  { label: 'APPLE MUSIC', href: BAND.socials.appleMusic },
  { label: 'SOUNDCLOUD', href: BAND.socials.soundcloud },
] as const;

const SOCIAL_LINKS = [
  { label: 'INSTAGRAM', href: BAND.socials.instagram },
  { label: 'SPOTIFY', href: BAND.socials.spotify },
] as const;

export default function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const groups = el.querySelectorAll('.connect-group');
    const closing = el.querySelector('.connect-closing');

    const ctx = gsap.context(() => {
      gsap.from(groups, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      });

      if (closing) {
        gsap.from(closing, {
          scale: 0.95,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: closing,
            start: 'top 85%',
            once: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-32 text-center">
      <div className="mx-auto max-w-3xl space-y-20">
        {/* Label credit */}
        <div className="connect-group">
          <span className="font-mono text-xs tracking-[0.3em] text-smoke">
            RELEASED ON
          </span>
          <p className="mt-3 text-2xl font-bold uppercase tracking-wide text-wire md:text-3xl">
            {BAND.label.toUpperCase()}
          </p>
        </div>

        {/* Streaming platforms */}
        <div className="connect-group">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {STREAMING_LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center gap-6">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm tracking-[0.2em] text-smoke transition-colors hover:text-spark"
                >
                  {link.label}
                </a>
                {i < STREAMING_LINKS.length - 1 && (
                  <span className="text-ash">&middot;</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Social links */}
        <div className="connect-group">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {SOCIAL_LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center gap-6">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm tracking-[0.2em] text-smoke transition-colors hover:text-spark"
                >
                  {link.label}
                </a>
                {i < SOCIAL_LINKS.length - 1 && (
                  <span className="text-ash">&middot;</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Booking / Press */}
        <div className="connect-group">
          <span className="font-mono text-xs tracking-[0.3em] text-smoke">
            FOR BOOKINGS &amp; PRESS
          </span>
          <p className="mt-3">
            <a
              href="mailto:booking@nomdeguerre.no"
              className="font-mono text-sm tracking-[0.2em] text-smoke transition-colors hover:text-spark"
            >
              BOOKING@NOMDEGUERRE.NO
            </a>
          </p>
        </div>

        {/* Closing moment */}
        <div className="connect-closing pt-12">
          <h2
            className="text-7xl font-bold uppercase tracking-tight text-wire md:text-9xl"
            style={{
              WebkitTextStroke: '1px currentColor',
              color: 'transparent',
            }}
          >
            {BAND.name}
          </h2>
          <p className="mt-6 font-mono text-xs tracking-[0.3em] text-smoke">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
