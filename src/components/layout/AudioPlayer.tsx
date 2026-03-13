'use client';

import { useCallback, useRef } from 'react';
import useAudioPlayer from '@/hooks/useAudioPlayer';

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    pause,
    resume,
    next,
    prev,
    seek,
    setVolume,
  } = useAudioPlayer();

  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = progressBarRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      seek(Math.max(0, Math.min(1, pos)));
    },
    [seek],
  );

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVolume(parseFloat(e.target.value));
    },
    [setVolume],
  );

  if (!currentTrack) return null;

  const currentTime = duration * progress;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      {/* Progress bar at top of player */}
      <div
        ref={progressBarRef}
        className="h-1 w-full bg-ash cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-spark transition-[width] duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Player body */}
      <div className="bg-concrete/95 backdrop-blur-md border-t border-ash px-4 py-3">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto gap-4">
          {/* Left: Track info */}
          <div className="flex flex-col min-w-0 shrink-0 w-48">
            <span className="text-sm font-bold uppercase tracking-wide text-wire truncate">
              {currentTrack.title}
            </span>
            <span className="text-xs font-mono text-smoke truncate">
              {currentTrack.album}
            </span>
          </div>

          {/* Center: Controls + time */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="text-smoke hover:text-spark transition-colors text-sm font-mono"
              aria-label="Previous track"
            >
              ⏮
            </button>
            <button
              onClick={isPlaying ? pause : resume}
              className="text-wire hover:text-spark transition-colors text-lg"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button
              onClick={next}
              className="text-smoke hover:text-spark transition-colors text-sm font-mono"
              aria-label="Next track"
            >
              ⏭
            </button>
            <span className="text-xs font-mono text-smoke ml-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right: Volume + Spotify */}
          <div className="flex items-center gap-3 shrink-0">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 accent-spark cursor-pointer"
              aria-label="Volume"
            />
            {currentTrack.spotifyUrl && (
              <a
                href={currentTrack.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-smoke hover:text-spark transition-colors text-xs font-mono"
                aria-label="Open on Spotify"
              >
                ↗
              </a>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
