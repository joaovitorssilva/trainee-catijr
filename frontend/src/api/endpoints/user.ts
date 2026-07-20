import api from "../api"
import type { AlbumNoMusicsDTO, ArtistDTO, MusicDTO, PlaylistNoMusicDTO } from "../../types/index.types"

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
