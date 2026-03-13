'use client';

import dynamic from 'next/dynamic';
import { ALBUMS, TRACKS, BAND } from '@/lib/constants';
import TrackRow from '@/components/music/TrackRow';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const TrackShowcase = dynamic(
  () => import('@/components/music/TrackShowcase'),
  { ssr: false }
);

const PLATFORM_LINKS = [
  { label: 'SPOTIFY', href: BAND.socials.spotify },
  { label: 'APPLE MUSIC', href: BAND.socials.appleMusic },
  { label: 'SOUNDCLOUD', href: BAND.socials.soundcloud },
] as const;

export default function MusicPage() {
  return (
    <>
      {/* Horizontal scrolling track showcase */}
      <TrackShowcase />

      {/* Traditional album listing below */}
      <main className="min-h-screen bg-void px-6 pt-32 pb-24">
        <div className="mx-auto max-w-3xl">
          {/* Page header */}
          <RevealOnScroll>
            <h1 className="font-mono text-xs tracking-[0.3em] text-smoke">
              DISCOGRAPHY
            </h1>
          </RevealOnScroll>

          {/* Album sections */}
          {ALBUMS.map((album) => {
            const albumTracks = album.trackIds.map((id) =>
              TRACKS.find((t) => t.id === id)!
            );

            return (
              <RevealOnScroll key={album.id}>
              <section className="py-24">
                {/* Album title */}
                <h2 className="album-title text-5xl font-bold uppercase tracking-tight text-wire md:text-7xl">
                  {album.title}
                </h2>
                <p className="mt-3 font-mono text-xs tracking-[0.2em] text-smoke">
                  {album.type} &middot; {album.year} &middot;{' '}
                  {BAND.label.toUpperCase()}
                </p>

                {/* Track listing */}
                <div className="mt-10 border-t border-ash">
                  {albumTracks.map((track, i) => (
                    <TrackRow key={track.id} index={i} track={track} />
                  ))}
                </div>
              </section>
              </RevealOnScroll>
            );
          })}

          {/* Streaming links */}
          <section className="border-t border-ash pt-24">
            <h3 className="font-mono text-xs tracking-[0.3em] text-smoke">
              LISTEN EVERYWHERE
            </h3>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {PLATFORM_LINKS.map((link, i) => (
                <span key={link.label} className="flex items-center gap-6">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm tracking-[0.2em] text-smoke transition-colors hover:text-wire"
                  >
                    {link.label}
                  </a>
                  {i < PLATFORM_LINKS.length - 1 && (
                    <span className="text-ash">&middot;</span>
                  )}
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
