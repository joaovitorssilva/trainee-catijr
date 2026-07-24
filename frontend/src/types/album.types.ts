import type { MusicDTO } from "./music.types"

export interface AlbumNoMusicsDTO {
  id: string
  title: string
  year: string
  artistId: string
  artistName: string
  coverUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface AlbumDTO {
  id: string
  title: string
  year: string
  artistId: string
  artistName: string
  musics: MusicDTO[]
  coverUrl: string | null
  createdAt: string
  updatedAt: string
}
