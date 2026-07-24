import api from "../api"
import type { AlbumDTO, MusicDTO } from "@/types/index.types"

export async function getAlbumById(id: string): Promise<AlbumDTO> {
  const response = await api.get<AlbumDTO>(`/album/${id}`)
  return response.data
}

export async function getAlbumMusics(albumId: string): Promise<MusicDTO[]> {
  const response = await api.get(`/album/${albumId}/musics`)
  return response.data
}
