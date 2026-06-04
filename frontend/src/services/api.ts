import type {
  AlbumDTO,
  AlbumNoMusicsDTO,
  ArtistDTO,
  CreatePlaylistDTO,
  MusicDTO,
  PlaylistDTO,
  PlaylistNoMusicDTO,
  PutPlaylistDTO,
} from "./types"

async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`)
  if (res.status === 204) return undefined as T
  return res.json()
}

export function getUserPlaylists(): Promise<PlaylistNoMusicDTO[]> {
  return fetchJSON("/user/playlists")
}

export function getRecentArtists(): Promise<ArtistDTO[]> {
  return fetchJSON("/user/recentArtists")
}

export function getMostPlayedArtists(): Promise<ArtistDTO[]> {
  return fetchJSON("/user/mostPlayedArtists")
}

export function getRecentMusics(): Promise<MusicDTO[]> {
  return fetchJSON("/user/recentMusics")
}

export function getMostPlayedMusics(): Promise<MusicDTO[]> {
  return fetchJSON("/user/mostPlayedMusics")
}

export function getRecentAlbums(): Promise<AlbumNoMusicsDTO[]> {
  return fetchJSON("/user/recentAlbums")
}

export function getUserFollowers(): Promise<string[]> {
  return fetchJSON("/user/followers")
}

export function getPlaylistById(id: string): Promise<PlaylistDTO> {
  return fetchJSON(`/playlist/${id}`)
}

export function createPlaylist(data: CreatePlaylistDTO): Promise<PlaylistNoMusicDTO> {
  return fetchJSON("/playlist/", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function updatePlaylistAttributes(id: string, data: PutPlaylistDTO): Promise<PlaylistNoMusicDTO> {
  return fetchJSON(`/playlist/${id}/attributes`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export function addMusicToPlaylist(playlistId: string, musicId: string): Promise<PlaylistDTO> {
  return fetchJSON(`/playlist/${playlistId}/${musicId}`, {
    method: "PATCH",
  })
}

export function deletePlaylist(id: string): Promise<void> {
  return fetchJSON(`/playlist/${id}`, { method: "DELETE" })
}

export function removeMusicFromPlaylist(playlistId: string, musicId: string): Promise<void> {
  return fetchJSON(`/playlist/${playlistId}/${musicId}`, { method: "DELETE" })
}

export function getArtistPopularMusics(artistId: string): Promise<MusicDTO[]> {
  return fetchJSON(`/artist/${artistId}/popularMusics`)
}

export function getArtistAlbums(artistId: string): Promise<AlbumDTO[]> {
  return fetchJSON(`/artist/${artistId}/albums`)
}

export function getAlbumMusics(albumId: string): Promise<MusicDTO[]> {
  return fetchJSON(`/album/${albumId}/musics`)
}
