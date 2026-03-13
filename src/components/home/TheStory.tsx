'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TheStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const act1Ref = useRef<HTMLDivElement>(null);
  const act2Ref = useRef<HTMLDivElement>(null);
  const act3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const progress = progressRef.current;
    if (!section || !progress) return;

    const ctx = gsap.context(() => {
      // Progress bar tracks overall scroll
      gsap.to(progress, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=400%',
          scrub: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // ── ACT I ─────────────────────────────────
      // Label fades in first
      tl.fromTo(
        '#act1-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' },
      )
        // Title characters stagger in
        .fromTo(
          '#act1-title',
          { opacity: 0, y: 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.1',
        )
        // Body text fades in after title
        .fromTo(
          '#act1-body',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2',
        )
        // Subtitle last
        .fromTo(
          '#act1-subtitle',
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'power2.out' },
          '-=0.2',
        )
        // Hold for reading
        .to({}, { duration: 1.2 })
        // Fade out entire act
        .to(act1Ref.current, {
          opacity: 0,
          y: -60,
          scale: 0.97,
          duration: 0.5,
          ease: 'power2.in',
        })

        // ── ACT II ────────────────────────────────
        .fromTo(
          '#act2-label',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' },
        )
        .fromTo(
          '#act2-title',
          { opacity: 0, y: 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.1',
        )
        .fromTo(
          '#act2-body',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2',
        )
        .to({}, { duration: 1.2 })
        .to(act2Ref.current, {
          opacity: 0,
          y: -60,
          scale: 0.97,
          duration: 0.5,
          ease: 'power2.in',
        })

        // ── ACT III ───────────────────────────────
        .fromTo(
          '#act3-label',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' },
        )
        .fromTo(
          '#act3-title',
          { opacity: 0, y: 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.1',
        )
        .fromTo(
          '#act3-body',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2',
        )
        // Cities stagger in one by one
        .fromTo(
          '.city-name',
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.25,
            ease: 'power2.out',
          },
          '-=0.1',
        )
        // Hold the finale
        .to({}, { duration: 0.8 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-void overflow-hidden"
    >
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-concrete/5 to-void" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-spark/[0.02] blur-[120px]" />
      </div>

      {/* Drifting dots — pure CSS ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute w-px h-px bg-smoke rounded-full top-[20%] left-[15%] animate-[drift_25s_linear_infinite]" />
        <div className="absolute w-px h-px bg-smoke rounded-full top-[60%] left-[75%] animate-[drift_30s_linear_infinite_3s]" />
        <div className="absolute w-px h-px bg-smoke rounded-full top-[35%] left-[45%] animate-[drift_20s_linear_infinite_7s]" />
        <div className="absolute w-px h-px bg-smoke rounded-full top-[80%] left-[25%] animate-[drift_28s_linear_infinite_12s]" />
        <div className="absolute w-0.5 h-0.5 bg-smoke/50 rounded-full top-[10%] left-[60%] animate-[drift_35s_linear_infinite_5s]" />
        <div className="absolute w-0.5 h-0.5 bg-smoke/50 rounded-full top-[50%] left-[85%] animate-[drift_22s_linear_infinite_9s]" />
      </div>

      {/* ── ACT I ── */}
      <div
        ref={act1Ref}
        className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-8"
      >
        <span
          id="act1-label"
          className="font-mono text-[10px] tracking-[0.5em] text-spark mb-8 md:mb-10 opacity-0"
        >
          ACT I
        </span>
        <h2
          id="act1-title"
          className="text-[clamp(2.5rem,10vw,8rem)] font-bold uppercase leading-[0.9] tracking-tight text-wire text-center mb-6 md:mb-10 opacity-0"
        >
          BORN IN
          <br />
          REVOLUTION
        </h2>
        <p
          id="act1-body"
          className="max-w-lg text-center text-smoke/80 leading-relaxed text-base md:text-lg opacity-0"
        >
          Born in Zimbabwe to parents who stood alongside Mandela in the
          liberation movements. Death threats forced the family to flee —
          Vuyo grew up between South Africa, Zambia, and Norway, settling
          in Oslo as a teenager.
        </p>
        <p
          id="act1-subtitle"
          className="mt-6 font-mono text-[10px] tracking-[0.2em] text-spark/60 opacity-0"
        >
          &ldquo;VUYO&rdquo; MEANS HAPPINESS IN XHOSA
        </p>
      </div>

      {/* ── ACT II ── */}
      <div
        ref={act2Ref}
        className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-8 opacity-0"
      >
        <span
          id="act2-label"
          className="font-mono text-[10px] tracking-[0.5em] text-spark mb-8 md:mb-10 opacity-0"
        >
          ACT II
        </span>
        <h2
          id="act2-title"
          className="text-[clamp(2.5rem,10vw,8rem)] font-bold uppercase leading-[0.9] tracking-tight text-wire text-center mb-6 md:mb-10 opacity-0"
        >
          THE SONIC
          <br />
          ARCHITECT
        </h2>
        <p
          id="act2-body"
          className="max-w-lg text-center text-smoke/80 leading-relaxed text-base md:text-lg opacity-0"
        >
          Oslo-based producer Ole Petter Ålgård crafts dark basslines and
          pulsating beats as Ultraposh. The sound bridges underground club
          culture — from the basements of Oslo to the warehouses of Berlin
          to the townships of Johannesburg.
        </p>
      </div>

      {/* ── ACT III ── */}
      <div
        ref={act3Ref}
        className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-8 opacity-0"
      >
        <span
          id="act3-label"
          className="font-mono text-[10px] tracking-[0.5em] text-spark mb-8 md:mb-10 opacity-0"
        >
          ACT III
        </span>
        <h2
          id="act3-title"
          className="text-[clamp(2.5rem,10vw,8rem)] font-bold uppercase leading-[0.9] tracking-tight text-wire text-center mb-6 md:mb-10 opacity-0"
        >
          NOM DE
          <br />
          GUERRE
        </h2>
        <p
          id="act3-body"
          className="max-w-lg text-center text-smoke/80 leading-relaxed text-base md:text-lg opacity-0"
        >
          Step into the world of Mario Dante — an enigmatic figure whose
          life and travels transcend the boundaries between hip-hop and
          house music. A world shrouded in mystery and intrigue.
        </p>
        <div className="mt-10 md:mt-12 flex gap-6 md:gap-8 font-mono text-xs md:text-sm tracking-[0.3em] text-smoke">
          <span className="city-name opacity-0">OSLO</span>
          <span className="city-name opacity-0 text-spark/40">·</span>
          <span className="city-name opacity-0">BERLIN</span>
          <span className="city-name opacity-0 text-spark/40">·</span>
          <span className="city-name opacity-0">JOHANNESBURG</span>
        </div>
      </div>

      {/* Scroll progress indicator — right edge */}
      <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 h-24 w-px bg-ash/40 z-10">
        <div
          ref={progressRef}
          className="w-full bg-spark/60"
          style={{ height: 0 }}
        />
      </div>
    </section>
  );
}
