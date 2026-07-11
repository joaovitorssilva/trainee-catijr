import { formatDurationText } from "@/utils/FormatDuration"
import PlaylistCover from "@/assets/playlist-cover.png"
import UserAvatar from "@/assets/user-avatar.png"
import PencilIcon from "@/assets/icons/pencil-icon.svg"

interface PlaylistHeaderProps {
  name: string
  musicQtd: number
  duration: number
  isPublic: boolean
  onEditClick?: () => void
}

export default function PlaylistHeader({ name, musicQtd, duration, isPublic, onEditClick }: PlaylistHeaderProps) {
  return (
    <div className="flex items-center gap-3 bg-header-gradient rounded-lg pl-5 pb-4 pt-10">
      <button onClick={onEditClick} className="relative w-[174px] cursor-pointer outline-none group">
        <img src={PlaylistCover} className="rounded-sm" />

        {/* hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-sm">
          <img src={PencilIcon} className="w-8 h-8" />
        </div>
      </button>

      <div className="flex flex-col gap-1 md:gap-2.5">
        <span className="text-10-medium text-white font-medium">
          Playlist {isPublic ? "pública" : "privada"}
        </span>
        <button onClick={onEditClick} className="cursor-pointer outline-none">
          <h1 className="text-white text-64-black">
            {name}
          </h1>
        </button>
        
        <div className="flex items-center gap-2 ">
          <img src={UserAvatar} className="w-6 h-6 rounded-full" />
          <span className="text-white text-10-bold">João Vitor</span>
          <span className="text-subdued text-10-medium "> • {musicQtd} músicas,</span>
          <span className="text-subdued text-10-medium">{formatDurationText(duration)}</span>
        </div>
      </div>
    </div>
  )
}