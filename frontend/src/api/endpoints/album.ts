import api from "../api"
import type { AlbumDTO, MusicDTO } from "@/types/index.types"

export function getAlbumById(id: string): Promise<AlbumDTO> {
  return api.get(`/album/${id}`).then((r) => r.data)
}

export function getAlbumMusics(albumId: string): Promise<MusicDTO[]> {
  return api.get(`/album/${albumId}/musics`).then((r) => r.data)
}
