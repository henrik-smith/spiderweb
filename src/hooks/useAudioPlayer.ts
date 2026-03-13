'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Howl, Howler } from 'howler';
import { TRACKS } from '@/lib/constants';
import { getTrackById, getNextTrackId, getPrevTrackId, type Track } from '@/lib/audio';

export interface AudioPlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
}

function useAudioPlayer() {
  const [state, setState] = useState<AudioPlayerState>({
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    duration: 0,
    volume: 0.8,
  });

  const howlRef = useRef<Howl | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>(0);
  const volumeRef = useRef(0.8);

  // Keep volumeRef in sync
  useEffect(() => {
    volumeRef.current = state.volume;
  }, [state.volume]);

  const updateProgress = useCallback(() => {
    const howl = howlRef.current;
    if (howl && howl.playing()) {
      const seek = howl.seek() as number;
      const duration = howl.duration();
      setState((s) => ({ ...s, progress: duration > 0 ? seek / duration : 0, duration }));
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  const destroyAnalyser = useCallback(() => {
    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect();
      } catch {
        // already disconnected
      }
      analyserRef.current = null;
    }
  }, []);

  const destroyHowl = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    destroyAnalyser();
    if (howlRef.current) {
      howlRef.current.unload();
      howlRef.current = null;
    }
  }, [destroyAnalyser]);

  const play = useCallback(
    (trackId: string) => {
      const track = getTrackById(trackId);
      if (!track) {
        console.warn('[AudioPlayer] Track not found:', trackId);
        return;
      }

      destroyHowl();

      try {
        const howl = new Howl({
          src: [track.audioSrc],
          html5: true,
          volume: volumeRef.current,
          onplay: () => {
            setState((s) => ({ ...s, isPlaying: true, duration: howl.duration() }));
            rafRef.current = requestAnimationFrame(updateProgress);

            // Connect analyser (only if not already connected)
            if (!analyserRef.current) {
              try {
                const audioCtx = Howler.ctx;
                if (audioCtx) {
                  const analyser = audioCtx.createAnalyser();
                  analyser.fftSize = 256;
                  Howler.masterGain.connect(analyser);
                  analyser.connect(audioCtx.destination);
                  analyserRef.current = analyser;
                }
              } catch {
                // Web Audio API not available
              }
            }
          },
          onpause: () => {
            setState((s) => ({ ...s, isPlaying: false }));
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
          },
          onend: () => {
            setState((s) => ({ ...s, isPlaying: false, progress: 0 }));
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            // Auto-advance
            const nextId = getNextTrackId(trackId);
            if (nextId) play(nextId);
          },
          onloaderror: (_id: number, err: unknown) => {
            console.warn('[AudioPlayer] Load error:', track.audioSrc, err);
            setState((s) => ({ ...s, isPlaying: false }));
          },
          onplayerror: (_id: number, err: unknown) => {
            console.warn('[AudioPlayer] Play error:', track.audioSrc, err);
            setState((s) => ({ ...s, isPlaying: false }));
          },
        });

        howlRef.current = howl;
        setState((s) => ({ ...s, currentTrack: track, progress: 0, duration: 0 }));
        howl.play();
      } catch (err) {
        console.warn('[AudioPlayer] Failed to create Howl:', err);
        setState((s) => ({ ...s, isPlaying: false }));
      }
    },
    [destroyHowl, updateProgress],
  );

  const pause = useCallback(() => {
    howlRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    howlRef.current?.play();
  }, []);

  const next = useCallback(() => {
    if (!state.currentTrack) return;
    const nextId = getNextTrackId(state.currentTrack.id);
    if (nextId) play(nextId);
  }, [state.currentTrack, play]);

  const prev = useCallback(() => {
    if (!state.currentTrack) return;
    const prevId = getPrevTrackId(state.currentTrack.id);
    if (prevId) play(prevId);
  }, [state.currentTrack, play]);

  const seek = useCallback(
    (position: number) => {
      const howl = howlRef.current;
      if (!howl) return;
      const time = position * howl.duration();
      howl.seek(time);
      setState((s) => ({ ...s, progress: position }));
    },
    [],
  );

  const setVolume = useCallback((level: number) => {
    const clamped = Math.max(0, Math.min(1, level));
    setState((s) => ({ ...s, volume: clamped }));
    if (howlRef.current) howlRef.current.volume(clamped);
  }, []);

  // Listen for 'play-track' custom events
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ trackId: string }>).detail;
      if (detail?.trackId) play(detail.trackId);
    };
    window.addEventListener('play-track', handler);
    return () => window.removeEventListener('play-track', handler);
  }, [play]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      destroyHowl();
    };
  }, [destroyHowl]);

  return {
    ...state,
    play,
    pause,
    resume,
    next,
    prev,
    seek,
    setVolume,
    analyserRef,
  };
}

export default useAudioPlayer;
