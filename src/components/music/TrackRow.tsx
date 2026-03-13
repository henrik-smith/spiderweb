'use client';

interface TrackRowProps {
  index: number;
  track: {
    id: string;
    title: string;
  };
}

export default function TrackRow({ index, track }: TrackRowProps) {
  return (
    <div
      className="track-row group flex items-center gap-4 border-b border-ash/50 py-4 cursor-pointer transition-colors hover:bg-steel/30"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent('play-track', { detail: { trackId: track.id } })
        );
      }}
    >
      <span className="w-8 font-mono text-xs text-smoke">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-smoke text-smoke transition-colors group-hover:border-spark group-hover:text-spark">
        &#9654;
      </span>
      <span className="text-sm uppercase tracking-wide text-wire">
        {track.title}
      </span>
    </div>
  );
}
