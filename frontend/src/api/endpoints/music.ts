import api from "../api"
import type { MusicDTO } from "../../types/index.types"

export async function toggleMusicLike(musicId: string): Promise<MusicDTO> {
  const response = await api.patch(`/music/${musicId}/like`)
  return response.data
}
