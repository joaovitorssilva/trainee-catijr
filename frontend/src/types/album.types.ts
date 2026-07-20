import type { MusicDTO } from "./music.types"

export interface AlbumNoMusicsDTO {
  id: string
  title: string
  year: string
  artistId: string
  artistName: string
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
  createdAt: string
  updatedAt: string
}
