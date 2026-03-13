'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UPCOMING_SHOWS } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
}

const PAST_SHOWS = [
  {
    date: '2025-02-01',
    venue: 'Trondheim Calling',
    city: 'Trondheim',
    stage: null,
    time: null,
  },
];

const ENERGY_WORDS = 'HOUSE \u00B7 HIP-HOP \u00B7 OSLO \u00B7 BERLIN \u00B7 JOHANNESBURG \u00B7 DARK \u00B7 LUXURIOUS \u00B7 MARIO DANTE';

export default function LiveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const luxuriousRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quote2Ref = useRef<HTMLDivElement>(null);
  const showsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // "LUKSURIØS" scale and opacity reveal
      if (luxuriousRef.current) {
        gsap.fromTo(
          luxuriousRef.current,
          { scale: 0.8, opacity: 0.1 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: luxuriousRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );
      }

      // Quote fade in from below
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Second quote fade in
      if (quote2Ref.current) {
        gsap.fromTo(
          quote2Ref.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: quote2Ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Shows slide in from right
      if (showsRef.current) {
        gsap.fromTo(
          showsRef.current,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: showsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const energyRepeated = Array.from({ length: 10 }, () => ENERGY_WORDS).join(' \u00B7 ');

  return (
    <div ref={sectionRef}>
      {/* ── Quote Block ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32">
        {/* LUKSURIØS — massive text */}
        <h2
          ref={luxuriousRef}
          className="select-none text-center text-8xl font-bold uppercase leading-none tracking-tighter text-wire md:text-[12rem]"
          style={{ willChange: 'transform, opacity' }}
        >
          LUKSURI&Oslash;S
        </h2>

        {/* Primary quote */}
        <div ref={quoteRef} className="mx-auto mt-16 max-w-2xl">
          <blockquote className="border-l-2 border-spark pl-6 md:pl-10">
            <p className="text-lg italic leading-relaxed text-smoke md:text-2xl">
              &ldquo;Noe av det kuleste og mest unorske jeg har h&oslash;rt fra en norsk artist p&aring; lenge&rdquo;
            </p>
            <footer className="mt-4 font-mono text-xs tracking-[0.2em] text-smoke">
              &mdash; NRK P3
            </footer>
          </blockquote>
        </div>

        {/* Second quote */}
        <div ref={quote2Ref} className="mx-auto mt-12 max-w-2xl">
          <blockquote className="border-l-2 border-heat pl-6 md:pl-10">
            <p className="text-base italic leading-relaxed text-smoke md:text-xl">
              &ldquo;Passer like godt inn p&aring; en m&oslash;rk kjellerklubb i London, s&aring; vel som p&aring; catwalken&rdquo;
            </p>
            <footer className="mt-4 font-mono text-xs tracking-[0.2em] text-smoke">
              &mdash; NRK P3
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Shows Block ── */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-3xl">
          <span className="font-mono text-xs tracking-[0.3em] text-smoke">
            UPCOMING
          </span>

          <div ref={showsRef} className="mt-12 space-y-6">
            {UPCOMING_SHOWS.map((show) => (
              <div
                key={`${show.date}-${show.venue}`}
                className="border border-ash bg-concrete p-8 md:p-12"
              >
                <p className="font-mono text-6xl font-bold tracking-tight text-wire md:text-8xl">
                  {formatDate(show.date)}
                </p>
                <h3 className="mt-6 text-xl font-bold uppercase tracking-wide text-wire md:text-2xl">
                  {show.venue.toUpperCase()}
                </h3>
                <p className="mt-2 font-mono text-xs tracking-[0.2em] text-smoke">
                  {show.stage.toUpperCase()} &middot; {show.time} &middot; {show.city.toUpperCase()}
                </p>
                <div className="mt-8">
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-spark px-6 py-3 font-mono text-xs tracking-[0.2em] text-spark transition-all duration-300 hover:bg-spark hover:text-void hover:shadow-[0_0_20px_var(--color-glow)]"
                  >
                    TICKETS &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Past shows */}
          <div className="mt-20">
            <span className="font-mono text-xs tracking-[0.3em] text-smoke">
              PAST
            </span>
            <div className="mt-8 space-y-4">
              {PAST_SHOWS.map((show) => (
                <div
                  key={`${show.date}-${show.venue}`}
                  className="flex items-baseline justify-between border-b border-ash/50 py-4"
                >
                  <div>
                    <span className="text-sm font-bold uppercase tracking-wide text-smoke">
                      {show.venue.toUpperCase()}
                    </span>
                    <span className="ml-3 font-mono text-xs tracking-[0.2em] text-smoke/60">
                      {show.city.toUpperCase()}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-smoke/60">
                    {formatDate(show.date)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Energy Strip ── */}
      <div className="overflow-hidden border-y border-ash py-3">
        <div className="energy-track flex whitespace-nowrap">
          <span className="energy-segment font-mono text-xs tracking-[0.2em] text-spark uppercase">
            {energyRepeated} &middot;&nbsp;
          </span>
          <span className="energy-segment font-mono text-xs tracking-[0.2em] text-spark uppercase">
            {energyRepeated} &middot;&nbsp;
          </span>
        </div>

        <style>{`
          .energy-track {
            animation: energyScroll 15s linear infinite;
          }
          .energy-segment {
            flex-shrink: 0;
          }
          @keyframes energyScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </div>
  );
}
