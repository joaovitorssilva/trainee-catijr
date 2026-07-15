import { useMenuContext } from "@/context/useMenuContext"
import PlaylistCover from "@/assets/playlist-cover.png"
import ArtistCover from "@/assets/artist-cover.png"
import AlbumCover from "@/assets/album-cover.png"
import PinIcon from "@/assets/icons/pin-icon.svg"
import HeartIcon from "@/assets/icons/heart-icon.png"

type LibraryItemType = "playlist" | "artist" | "album"

interface LibraryItemProps {
  id: string;
  name: string;
  type: LibraryItemType;
  subtitle?: string;
  isActive: boolean;
  onClick?: () => void;
  playlistType?: string;
  isPublic?: boolean;
  isPinned?: boolean;
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

export function LibraryItem({ id, name, type, subtitle, isActive, onClick, playlistType, isPublic, isPinned }: LibraryItemProps) {
  const { openMenu } = useMenuContext()

  const handleContextMenu = (e: React.MouseEvent) => {
    if (type === "playlist") {
      openMenu(e, type, id, undefined, undefined, undefined, undefined, playlistType, isPublic)
    } else {
      openMenu(e, type, id)
    }
  }

  return (
    <div
      onClick={onClick}
      onContextMenu={handleContextMenu}
      className={`flex items-center justify-center md:justify-start gap-2 cursor-pointer rounded-sm transition-colors duration-150 ${isActive ? "bg-bg-divider" : "hover:bg-bg-elements"}`}
    >
      <div className="w-9 h-9 shrink-0">
        {type === "playlist" && playlistType === "liked_songs" ? (
          <div className="flex items-center justify-center rounded-xs bg-liked-songs-gradient w-full h-full">
            <img
              src={HeartIcon}
              className="w-4 h-4 brightness-0 invert"
            />
          </div>
        ) : (
          <img
            src={imageCover[type]}
            className="rounded-xs w-full h-full object-cover"
          />
        )}
      </div>

      <div className="hidden md:flex md:flex-col md:gap-1 md:min-w-0">
        <div className="flex items-center gap-1 min-w-0">

          <span className="text-10-medium text-white font-bold truncate">
            {name}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {isPinned && (
            <img src={PinIcon} className="w-[10px] h-[10px] shrink-0 " />
          )}
          <span className="text-10-medium text-subdued font-normal truncate">
            {subtitle ?? typeLabel[type]}
          </span>
        </div>
      </div>
    </div>
  )
}