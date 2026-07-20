import type { MusicDTO } from "./music.types"

export interface PlaylistNoMusicDTO {
  id: string
  name: string
  description: string
  musicQtd: number
  duration: number
  isPublic: boolean
  type: string
  createdAt: string
  updatedAt: string | null
}

export interface PlaylistDTO {
  id: string
  name: string
  description: string
  musicQtd: number
  duration: number
  musics: MusicDTO[]
  isPublic: boolean
  type: string
  createdAt: string
  updatedAt: string | null
}

export interface CreatePlaylistDTO {
  name: string
  description: string
  isPublic?: boolean
}

export interface PutPlaylistDTO {
  name: string
  description: string
  isPublic?: boolean
}
