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
  coverUrl: string | null
  createdAt: string
  updatedAt: string | null
}
