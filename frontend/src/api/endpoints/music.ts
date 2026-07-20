import api from "../api"
import type { MusicDTO } from "../../types/index.types"

export function toggleMusicLike(musicId: string): Promise<MusicDTO> {
  return api.patch(`/music/${musicId}/like`).then((r) => r.data)
}
