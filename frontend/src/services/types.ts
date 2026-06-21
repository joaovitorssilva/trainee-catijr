export interface ArtistDTO {
  id: string
  name: string
  listeners: number
  about: string
  createdAt: string
  updatedAt: string
}

export interface MusicDTO {
  id: string
  title: string
  artistId: string | null
  artistName: string | null
  albumId: string | null
  playlistsId: string[] | null
  duration: number
  releaseDate: string
  timesListen: number
  explicit: boolean
  createdAt: string
  updatedAt: string | null
}

export interface PlaylistNoMusicDTO {
  id: string
  name: string
  description: string
  musicQtd: number
  duration: number
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
  createdAt: string
  updatedAt: string | null
}

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

export interface CreatePlaylistDTO {
  name: string
  description: string
}

export interface PutPlaylistDTO {
  name: string
  description: string
}
