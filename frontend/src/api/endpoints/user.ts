import api from "../api"
import type { AlbumNoMusicsDTO, ArtistDTO, MusicDTO, PlaylistNoMusicDTO } from "../../types/index.types"

export async function getUserPlaylists(): Promise<PlaylistNoMusicDTO[]> {
  const response = await api.get("/user/playlists")
  return response.data
}

export async function getRecentArtists(): Promise<ArtistDTO[]> {
  const response = await api.get("/user/recentArtists")
  return response.data
}

export async function getMostPlayedArtists(): Promise<ArtistDTO[]> {
  const response = await api.get("/user/mostPlayedArtists")
  return response.data
}

export async function getRecentMusics(): Promise<MusicDTO[]> {
  const response = await api.get("/user/recentMusics")
  return response.data
}

export async function getMostPlayedMusics(): Promise<MusicDTO[]> {
  const response = await api.get("/user/mostPlayedMusics")
  return response.data
}

export async function getRecentAlbums(): Promise<AlbumNoMusicsDTO[]> {
  const response = await api.get("/user/recentAlbums")
  return response.data
}

export async function getUserFollowers(): Promise<string[]> {
  const response = await api.get("/user/followers")
  return response.data
}
