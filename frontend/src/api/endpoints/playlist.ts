import api from "../api"
import type { CreatePlaylistDTO, PlaylistDTO, PlaylistNoMusicDTO, PutPlaylistDTO } from "../../types/index.types"

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
