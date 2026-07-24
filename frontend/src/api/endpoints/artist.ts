import api from "../api"
import type { AlbumDTO, ArtistDTO, MusicDTO } from "../../types/index.types"

export async function getArtistById(artistId: string): Promise<ArtistDTO> {
  const response = await api.get(`/artist/${artistId}`)
  return response.data
}

export async function getArtistPopularMusics(artistId: string): Promise<MusicDTO[]> {
  const response = await api.get(`/artist/${artistId}/popularMusics`)
  return response.data
}

export async function getArtistAlbums(artistId: string): Promise<AlbumDTO[]> {
  const response = await api.get(`/artist/${artistId}/albums`)
  return response.data
}
