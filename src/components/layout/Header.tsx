"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BAND } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 border-b ${
        scrolled
          ? "bg-void/80 backdrop-blur-sm border-steel/50"
          : "bg-transparent border-transparent"
      }`}
    >
      {/* Left: NDG monogram */}
      <Link
        href="/"
        className="font-mono text-sm font-bold tracking-[0.3em] text-wire hover:text-spark transition-colors duration-300"
      >
        NDG
      </Link>

      {/* Center: Navigation */}
      <nav className="absolute left-1/2 -translate-x-1/2 flex gap-8">
        <Link
          href="/music"
          className="font-mono text-xs tracking-[0.2em] text-smoke hover:text-wire transition-colors duration-300"
        >
          MUSIC
        </Link>
        <Link
          href="/about"
          className="font-mono text-xs tracking-[0.2em] text-smoke hover:text-wire transition-colors duration-300"
        >
          ABOUT
        </Link>
      </nav>

      {/* Right: Social icons */}
      <div className="flex items-center gap-4">
        <a
          href={BAND.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-smoke hover:text-wire transition-colors duration-300"
          aria-label="Instagram"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a
          href={BAND.socials.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-smoke hover:text-wire transition-colors duration-300"
          aria-label="Spotify"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
