import PlaylistCover from "@/assets/playlist-cover.png"
import ArtistCover from "@/assets/artist-cover.png"
import AlbumCover from "@/assets/album-cover.png"

type LibraryItemType = "playlist" | "artist" | "album"

interface LibraryItemProps {
  id: string;
  name: string;
  type: LibraryItemType;
  subtitle?: string;
  isActive: boolean;
  onClick?: () => void;
}

const coverMap: Record<LibraryItemType, string> = {
  playlist: PlaylistCover,
  artist: ArtistCover,
  album: AlbumCover,
}

const typeLabel: Record<LibraryItemType, string> = {
  playlist: "Playlist",
  artist: "Artista",
  album: "Álbum",
}

export function LibraryItem({ name, type, subtitle, isActive, onClick }: LibraryItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center md:justify-start gap-2 cursor-pointer rounded-sm transition-colors duration-150 ${isActive ? "bg-bg-divider" : "hover:bg-white/5"}`}
    >
      <div className="w-9 h-9 shrink-0">
        <img src={coverMap[type]} className="rounded-xs w-full h-full object-cover" />
      </div>
      <div className="hidden md:flex md:flex-col md:gap-1 md:min-w-0">
        <span className="text-10-medium text-white font-bold truncate">
          {name}
        </span>
        <span className="text-10-medium text-subdued font-normal truncate">
          {subtitle ?? typeLabel[type]}
        </span>
      </div>
    </div>
  )
}