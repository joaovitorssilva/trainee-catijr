import { useState } from "react"
import { useMenuContext } from "@/context/useMenuContext"
import { cn } from "@/utils/utils"
import { type SearchResult } from "@/types/index.types"
import OptionsIcon from "@/assets/icons/options-icon.svg"
import CoverFallback from "@/assets/playlist-cover.png"
import FollowButton from "../ui/FollowButton"

const TYPE_LABEL: Record<string, string> = {
  track: "Música",
  artist: "Artista",
  album: "Álbum",
  playlist: "Playlist",
}

interface SearchResultRowProps {
  result: SearchResult
  onClick: () => void
}

export default function SearchResultRow({ result, onClick }: SearchResultRowProps) {
  const [hovered, setHovered] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const { openMenu } = useMenuContext()

  const handleFollowingArtist = (following: boolean) => {
    setIsFollowing(following)
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "grid grid-cols-[36px_1fr_1fr_auto_auto] items-center justify-between gap-4 p-2 rounded-sm cursor-pointer transition-colors",
        hovered ? "bg-bg-elements " : "bg-transparent"
      )}
    >
      {/* Thumbnail */}
      <img
        src={CoverFallback}
        alt={result.name}
        className={cn(
          "w-9 h-9 object-cover",
          result.type === "artist" ? "rounded-full" : "rounded-sm"
        )}
      />

      {/* Name + subtitle */}
      <div className="flex flex-col gap-1 overflow-hidden">
        <span className="text-white text-16-bold truncate">
          {result.name}
        </span>
        <span className="text-subdued text-10-bold truncate">
          {result.subtitle}
        </span>
      </div>

      {/* Type badge */}
      <span className="text-subdued text-10-bold bg-bg-elements w-fit px-2 py-1 rounded-xs shrink-0">
        {TYPE_LABEL[result.type]}
      </span>

      {/* follow artist button */}
      {result.type === "artist" && (
        <FollowButton
          isFollowing={isFollowing}
          onToggle={(following) => handleFollowingArtist(following)}
        />
      )}

      {/* Options "..." */}
      <button
        onClick={(e) => { e.stopPropagation(); openMenu(e, result.type, result.id) }}
        className="p-2 rounded-sm hover:bg-bg-elements cursor-pointer outline-none"
      >
        <img src={OptionsIcon} />
      </button>

      {/* todo like musics button  */}
    </div>
  )
}