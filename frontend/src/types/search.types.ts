export type SearchResultType = "track" | "artist" | "playlist" | "album"

export type SearchFilterTab = "tudo" | "musicas" | "albuns" | "artistas" | "playlists"

export interface SearchResult {
  id: string
  name: string
  type: SearchResultType
  subtitle: string
  albumId?: string
  isExplicit?: boolean
  isSaved?: boolean
  isFollowing?: boolean
  coverUrl?: string
}

export interface RecentSearch {
  id: string
  name: string
  type: SearchResultType
  subtitle: string
  coverUrl?: string
}
