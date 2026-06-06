import PlaylistCover from "@/assets/playlist-cover.png"
import UserAvatar from "@/assets/user-avatar.png"
import { formatDurationText } from "@/utils/FormatDuration"

interface PlaylistHeaderProps {
  name: string
  musicQtd: number
  duration: number
}

export default function PlaylistHeader({ name, musicQtd, duration }: PlaylistHeaderProps) {
  return (
    <div className="flex gap-3 bg-linear-to-b from-[#938D8E] to-[#3E3939] rounded-lg pl-5 pb-4 pt-10">

      <div className="w-[174px]">
        <img src={PlaylistCover} className="rounded-sm" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-10-medium text-white font-medium">Playlist pública </span>
        <h1 className="text-white font-black text-[64px]">
          { name }
        </h1>

        <div className="flex items-center gap-2 ">
          <img src={UserAvatar} className="w-6 h-6 rounded-full" />
          <span className="text-white text-10-medium font-bold">João Vitor</span>
          <span className="text-subdued text-10-medium "> • {musicQtd} músicas,</span>
          <span className="text-subdued text-10-medium">{formatDurationText(duration)}</span>
        </div>

      </div>
    </div>
  )
}