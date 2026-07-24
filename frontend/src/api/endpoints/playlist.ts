import api from "../api"
import type { CreatePlaylistDTO, PlaylistDTO, PlaylistNoMusicDTO, PutPlaylistDTO } from "../../types/index.types"

export async function getPlaylistById(id: string): Promise<PlaylistDTO> {
  const response = await api.get<PlaylistDTO>(`/playlist/${id}`)
  return response.data
}

export async function createPlaylist(data: CreatePlaylistDTO): Promise<PlaylistNoMusicDTO> {
  const response = await api.post<PlaylistNoMusicDTO>("/playlist/", data)
  return response.data
}

export async function updatePlaylistAttributes(
  id: string,
  data: PutPlaylistDTO
):
  Promise<PlaylistNoMusicDTO> {
  const response = await api.put<PlaylistNoMusicDTO>(`/playlist/${id}/attributes`, data)
  return response.data
}

export async function addMusicToPlaylist(
  playlistId: string,
  musicId: string
): Promise<PlaylistDTO> {
  const response = await api.patch<PlaylistDTO>(`/playlist/${playlistId}/${musicId}`)
  return response.data
}


export async function deletePlaylist(id: string): Promise<void> {
  await api.delete(`/playlist/${id}`)
}

export async function removeMusicFromPlaylist(
  playlistId: string,
  musicId: string
): Promise<void> {
  await api.delete(`/playlist/${playlistId}/${musicId}`)
}

export async function reorderPlaylist(
  playlistId: string,
  musicIds: string[]
): Promise<PlaylistDTO> {
  const response = await api.put(`/playlist/${playlistId}/reorder`, { musicIds })
  return response.data
}
