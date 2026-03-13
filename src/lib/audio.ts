import { TRACKS, ALBUMS } from './constants';

export type Track = typeof TRACKS[number];

export function getTrackById(id: string): Track | undefined {
  return TRACKS.find((t) => t.id === id);
}

export function getNextTrackId(currentId: string): string | null {
  const idx = TRACKS.findIndex((t) => t.id === currentId);
  if (idx === -1 || idx === TRACKS.length - 1) return null;
  return TRACKS[idx + 1].id;
}

export function getPrevTrackId(currentId: string): string | null {
  const idx = TRACKS.findIndex((t) => t.id === currentId);
  if (idx <= 0) return null;
  return TRACKS[idx - 1].id;
}

export function getAlbumTracks(albumId: string): Track[] {
  const album = ALBUMS.find((a) => a.id === albumId);
  if (!album) return [];
  return album.trackIds
    .map((id) => TRACKS.find((t) => t.id === id))
    .filter((t): t is Track => t !== undefined);
}
