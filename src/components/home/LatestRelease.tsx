'use client';

import { ALBUMS, TRACKS, BAND } from '@/lib/constants';

export default function LatestRelease() {
  const album = ALBUMS[0]; // TOUGH TIMES is the latest
  const tracks = album.trackIds.map((id) =>
    TRACKS.find((t) => t.id === id)!
  );

  const handlePlay = (trackId: string) => {
    window.dispatchEvent(
      new CustomEvent('play-track', { detail: { trackId } })
    );
  };

  return (
    <section className="px-6 py-32">
      <div className="mx-auto max-w-3xl">
        <span className="font-mono text-xs tracking-[0.3em] text-smoke">
          LATEST RELEASE
        </span>

        <div className="mt-12 border border-ash bg-concrete p-8 md:p-12">
          {/* Album header */}
          <h2 className="text-4xl font-bold uppercase tracking-tight text-wire md:text-6xl">
            {album.title}
          </h2>
          <p className="mt-3 font-mono text-xs tracking-[0.2em] text-smoke">
            {album.type} &middot; {album.year} &middot; {BAND.label.toUpperCase()}
          </p>

          {/* Track listing */}
          <div className="mt-10 border-t border-ash">
            {tracks.map((track, i) => (
              <div
                key={track.id}
                onClick={() => handlePlay(track.id)}
                className="flex items-center gap-4 border-b border-ash/50 py-4 group cursor-pointer transition-colors hover:bg-steel/30"
              >
                <span className="w-6 font-mono text-xs text-smoke">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-smoke text-smoke transition-colors group-hover:border-spark group-hover:text-spark">
                  &#9654;
                </span>
                <span className="text-sm uppercase tracking-wide text-wire">
                  {track.title}
                </span>
              </div>
            ))}
          </div>

          {/* Spotify link */}
          <div className="mt-10">
            <a
              href={BAND.socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-smoke px-6 py-3 font-mono text-xs tracking-[0.2em] text-smoke transition-colors hover:border-wire hover:text-wire"
            >
              LISTEN ON SPOTIFY
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
