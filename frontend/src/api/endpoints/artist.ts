import api from "../api"
import type { AlbumDTO, ArtistDTO, MusicDTO } from "../../types/index.types"

export function getArtistById(artistId: string): Promise<ArtistDTO> {
  return api.get(`/artist/${artistId}`).then((r) => r.data)
}

export function getArtistPopularMusics(artistId: string): Promise<MusicDTO[]> {
  return api.get(`/artist/${artistId}/popularMusics`).then((r) => r.data)
}

export function getArtistAlbums(artistId: string): Promise<AlbumDTO[]> {
  return api.get(`/artist/${artistId}/albums`).then((r) => r.data)
}
