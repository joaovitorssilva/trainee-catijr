import axios from "axios"
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

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
})

api.interceptors.response.use(null, (error) => {
  const status = error.response?.status
  const msg = error.response?.data?.message ?? error.message
  return Promise.reject(new Error(`HTTP ${status ?? "??"} - ${msg}`))
})

export function getUserPlaylists(): Promise<PlaylistNoMusicDTO[]> {
  return api.get("/user/playlists").then((r) => r.data)
}

export function getRecentArtists(): Promise<ArtistDTO[]> {
  return api.get("/user/recentArtists").then((r) => r.data)
}

export function getMostPlayedArtists(): Promise<ArtistDTO[]> {
  return api.get("/user/mostPlayedArtists").then((r) => r.data)
}

export function getRecentMusics(): Promise<MusicDTO[]> {
  return api.get("/user/recentMusics").then((r) => r.data)
}

export function getMostPlayedMusics(): Promise<MusicDTO[]> {
  return api.get("/user/mostPlayedMusics").then((r) => r.data)
}

export function getRecentAlbums(): Promise<AlbumNoMusicsDTO[]> {
  return api.get("/user/recentAlbums").then((r) => r.data)
}

export function getUserFollowers(): Promise<string[]> {
  return api.get("/user/followers").then((r) => r.data)
}

export function getPlaylistById(id: string): Promise<PlaylistDTO> {
  return api.get(`/playlist/${id}`).then((r) => r.data)
}

export function createPlaylist(data: CreatePlaylistDTO): Promise<PlaylistNoMusicDTO> {
  return api.post("/playlist/", data).then((r) => r.data)
}

export function updatePlaylistAttributes(id: string, data: PutPlaylistDTO): Promise<PlaylistNoMusicDTO> {
  return api.put(`/playlist/${id}/attributes`, data).then((r) => r.data)
}

export function addMusicToPlaylist(playlistId: string, musicId: string): Promise<PlaylistDTO> {
  return api.patch(`/playlist/${playlistId}/${musicId}`).then((r) => r.data)
}

export function deletePlaylist(id: string): Promise<void> {
  return api.delete(`/playlist/${id}`)
}

export function removeMusicFromPlaylist(playlistId: string, musicId: string): Promise<void> {
  return api.delete(`/playlist/${playlistId}/${musicId}`)
}

export function getArtistPopularMusics(artistId: string): Promise<MusicDTO[]> {
  return api.get(`/artist/${artistId}/popularMusics`).then((r) => r.data)
}

export function getArtistAlbums(artistId: string): Promise<AlbumDTO[]> {
  return api.get(`/artist/${artistId}/albums`).then((r) => r.data)
}

export function getAlbumById(id: string): Promise<AlbumDTO> {
  return api.get(`/album/${id}`).then((r) => r.data)
}

export function getAlbumMusics(albumId: string): Promise<MusicDTO[]> {
  return api.get(`/album/${albumId}/musics`).then((r) => r.data)
}
