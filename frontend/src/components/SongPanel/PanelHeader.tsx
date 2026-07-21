import { useMenuContext } from "@/context/useMenuContext"
import { usePlayer } from "@/context/PlayerContext"
import { useNavigate } from "react-router-dom"
import type { MusicDTO } from "@/types/index.types"
import OptionsIcon from "@/assets/icons/options-icon.svg"

interface SongPanelHeaderProps {
  music: MusicDTO
}

export default function SongPanelHeader({ music }: SongPanelHeaderProps) {
  const { openMenu } = useMenuContext()
  const { playingFrom } = usePlayer()
  const navigate = useNavigate()

  const handleClick = () => {
    if (!playingFrom) return
    switch (playingFrom.type) {
      case "album": navigate(`/album/${playingFrom.albumId}`); break
      case "playlist": navigate(`/playlist/${playingFrom.playlistId}`); break
    }
  }

  const getLabel = () => {
    if (!playingFrom) return music.title
    switch (playingFrom.type) {
      case "album": return playingFrom.albumName
      case "playlist": return playingFrom.playlistName
      case "search": return music.title
    }
  }

  const isClickable = playingFrom && playingFrom.type !== "search"

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={handleClick}
        disabled={!isClickable}
        className={`text-white text-12-bold truncate ${isClickable ? "cursor-pointer" : "cursor-default"}`}>
        {getLabel()}
      </button>
      <span className="shrink-0">
        <button
          onClick={(e) => openMenu(e, "track", music.id, music.artistId ?? undefined, music.albumId, music.liked)}
          className="p-1.5 rounded-sm hover:bg-bg-elements cursor-pointer outline-none"
        >
          <img src={OptionsIcon} />
        </button>
      </span>
    </div>
  )
}
