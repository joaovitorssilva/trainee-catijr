import PlaylistCover from "@/assets/playlist-cover.png"
import ArtistCover from "@/assets/artist-cover.png"
import AlbumCover from "@/assets/album-cover.png"
import { useMenuContext } from "@/context/useMenuContext"

type LibraryItemType = "playlist" | "artist" | "album"

interface LibraryItemProps {
  id: string;
  name: string;
  type: LibraryItemType;
  subtitle?: string;
  isActive: boolean;
  onClick?: () => void;
}

const imageCover: Record<LibraryItemType, string> = {
  playlist: PlaylistCover,
  artist: ArtistCover,
  album: AlbumCover,
}

const typeLabel: Record<LibraryItemType, string> = {
  playlist: "Playlist",
  artist: "Artista",
  album: "Álbum",
}

export function LibraryItem({ id, name, type, subtitle, isActive, onClick }: LibraryItemProps) {
  const { openMenu } = useMenuContext()

  const handleContextMenu = (e: React.MouseEvent) => {
    openMenu(e, type, id)
  }

  return (
    <div
      onClick={onClick}
      onContextMenu={handleContextMenu}
      className={`flex items-center justify-center md:justify-start gap-2 cursor-pointer rounded-sm transition-colors duration-150 ${isActive ? "bg-bg-divider" : "hover:bg-bg-elements"}`}
    >
      <div className="w-9 h-9 shrink-0">
        <img src={imageCover[type]} className="rounded-xs w-full h-full object-cover" />
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