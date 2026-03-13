'use client';

import { useRef, useEffect, useCallback } from 'react';

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // All animation state in refs to avoid re-renders
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const currentPosRef = useRef({ x: 0.5, y: 0.5 });
  const currentRadiusRef = useRef(0);
  const hasInteractedRef = useRef(false);
  const isRevealedRef = useRef(false);
  const animFrameRef = useRef<number>(0);
  const interactionTimeRef = useRef(0);
  const isMobileRef = useRef(false);
  const enterBtnRef = useRef<HTMLButtonElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // Detect mobile once
  useEffect(() => {
    isMobileRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isMobileRef.current) {
      // On mobile, start auto-reveal immediately with slow grow
      hasInteractedRef.current = true;
      interactionTimeRef.current = performance.now();
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      interactionTimeRef.current = performance.now();
      // Show enter button
      if (enterBtnRef.current) enterBtnRef.current.style.opacity = '1';
      if (hintRef.current) {
        const span = hintRef.current.querySelector('span');
        if (span) span.textContent = 'SCROLL';
      }
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: (e.touches[0].clientX - rect.left) / rect.width,
      y: (e.touches[0].clientY - rect.top) / rect.height,
    };
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      interactionTimeRef.current = performance.now();
    }
  }, []);

  const handleReveal = useCallback(() => {
    isRevealedRef.current = true;
    if (enterBtnRef.current) enterBtnRef.current.style.opacity = '0';
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!container || !canvas || !video) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Size canvas to container
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Events
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    const displayW = () => container.clientWidth;
    const displayH = () => container.clientHeight;

    const render = () => {
      const w = displayW();
      const h = displayH();

      // Reset transform before clearing (resize sets scale)
      ctx.setTransform(Math.min(window.devicePixelRatio, 2), 0, 0, Math.min(window.devicePixelRatio, 2), 0, 0);

      // Lerp mouse position for smooth following
      const lerpFactor = isMobileRef.current ? 0.02 : 0.06;
      currentPosRef.current.x += (mousePosRef.current.x - currentPosRef.current.x) * lerpFactor;
      currentPosRef.current.y += (mousePosRef.current.y - currentPosRef.current.y) * lerpFactor;

      // Calculate target radius
      let targetRadius: number;
      const now = performance.now();

      if (isRevealedRef.current) {
        // Full reveal — grow to cover entire screen
        targetRadius = Math.max(w, h) * 1.2;
      } else if (isMobileRef.current && hasInteractedRef.current) {
        // Mobile: slow auto-grow from center
        const elapsed = (now - interactionTimeRef.current) / 1000;
        targetRadius = Math.min(w * 0.5, 50 + elapsed * 40);
        // Auto-center on mobile
        mousePosRef.current.x += (0.5 - mousePosRef.current.x) * 0.01;
        mousePosRef.current.y += (0.45 - mousePosRef.current.y) * 0.01;
      } else if (hasInteractedRef.current) {
        targetRadius = Math.min(w * 0.35, 380);
      } else {
        targetRadius = 0;
      }

      // Smooth radius transition with breathing
      const radiusLerp = isRevealedRef.current ? 0.02 : 0.025;
      currentRadiusRef.current += (targetRadius - currentRadiusRef.current) * radiusLerp;

      // Breathing effect — subtle sine wave oscillation
      const breathe = isRevealedRef.current ? 0 : Math.sin(now * 0.002) * 8;
      const radius = Math.max(0, currentRadiusRef.current + breathe);

      // Clear to black
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);

      // Draw video with reveal mask
      if (video.readyState >= 2) {
        // Cover-fit calculations
        const videoAspect = video.videoWidth / video.videoHeight;
        const canvasAspect = w / h;
        let drawW: number, drawH: number, drawX: number, drawY: number;
        if (canvasAspect > videoAspect) {
          drawW = w;
          drawH = w / videoAspect;
          drawX = 0;
          drawY = (h - drawH) / 2;
        } else {
          drawH = h;
          drawW = h * videoAspect;
          drawY = 0;
          drawX = (w - drawW) / 2;
        }

        // Zoom-out effect when fully revealed
        if (isRevealedRef.current && currentRadiusRef.current > w * 0.5) {
          const zoomProgress = Math.min(1, (currentRadiusRef.current - w * 0.5) / (w * 0.7));
          const scale = 1.08 - 0.08 * zoomProgress;
          const cx = w / 2;
          const cy = h / 2;
          drawX = cx + (drawX - cx) * scale;
          drawY = cy + (drawY - cy) * scale;
          drawW *= scale;
          drawH *= scale;
        }

        const centerX = currentPosRef.current.x * w;
        const centerY = currentPosRef.current.y * h;

        if (isRevealedRef.current && currentRadiusRef.current > Math.max(w, h)) {
          // Fully revealed — direct draw, no mask
          ctx.drawImage(video, drawX, drawY, drawW, drawH);
        } else if (radius > 1) {
          ctx.save();

          // Draw video
          ctx.drawImage(video, drawX, drawY, drawW, drawH);

          // Apply radial mask via compositing
          ctx.globalCompositeOperation = 'destination-in';
          const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius
          );
          gradient.addColorStop(0, 'rgba(255,255,255,1)');
          gradient.addColorStop(0.6, 'rgba(255,255,255,0.8)');
          gradient.addColorStop(0.85, 'rgba(255,255,255,0.2)');
          gradient.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, w, h);

          // Red edge glow
          ctx.globalCompositeOperation = 'source-over';
          const glowGradient = ctx.createRadialGradient(
            centerX, centerY, radius * 0.6,
            centerX, centerY, radius * 1.1
          );
          glowGradient.addColorStop(0, 'rgba(204,17,17,0)');
          glowGradient.addColorStop(0.5, 'rgba(204,17,17,0.06)');
          glowGradient.addColorStop(1, 'rgba(204,17,17,0)');
          ctx.fillStyle = glowGradient;
          ctx.fillRect(0, 0, w, h);

          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    // Start
    video.play().catch(() => {});
    animFrameRef.current = requestAnimationFrame(render);

    // Auto-reveal after 8 seconds if no interaction (desktop)
    const autoRevealTimer = setTimeout(() => {
      if (!hasInteractedRef.current) {
        isRevealedRef.current = true;
        mousePosRef.current = { x: 0.5, y: 0.45 };
        currentPosRef.current = { x: 0.5, y: 0.45 };
        currentRadiusRef.current = 50;
      }
    }, 8000);

    // Mobile: auto full-reveal after 5 seconds
    const mobileRevealTimer = isMobileRef.current
      ? setTimeout(() => {
          isRevealedRef.current = true;
          if (enterBtnRef.current) enterBtnRef.current.style.opacity = '0';
        }, 5000)
      : undefined;

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(autoRevealTimer);
      if (mobileRevealTimer) clearTimeout(mobileRevealTimer);
    };
  }, [handleMouseMove, handleTouchMove]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-void cursor-none"
    >
      {/* Hidden video element — source for canvas */}
      <video
        ref={videoRef}
        src="/ndg-hero-720p.mp4"
        loop
        muted
        playsInline
        preload="auto"
        className="hidden"
      />

      {/* Canvas where the reveal effect renders */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Scroll hint */}
      <div
        ref={hintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-smoke">
          Move to reveal
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-smoke to-transparent animate-pulse" />
      </div>

      {/* Enter button — appears after interaction */}
      <button
        ref={enterBtnRef}
        onClick={handleReveal}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 font-mono text-xs uppercase tracking-[0.3em] text-smoke hover:text-spark transition-all duration-300 border border-ash hover:border-spark px-6 py-3 opacity-0"
      >
        Enter
      </button>
    </section>
  );
}
