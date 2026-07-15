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
  albumId: string 
  playlistsId: string[] | null
  duration: number
  releaseDate: string
  timesListen: number
  explicit: boolean
  liked: boolean
  createdAt: string
  updatedAt: string | null
}

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
  isPublic?: boolean
}

export interface PutPlaylistDTO {
  name: string
  description: string
  isPublic?: boolean
}
