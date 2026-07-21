export type PlayingFrom =
  | { type: "album"; albumId: string; albumName: string }
  | { type: "playlist"; playlistId: string; playlistName: string }
  | { type: "search" }
