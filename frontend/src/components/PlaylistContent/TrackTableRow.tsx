import { useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import { formatDuration } from "@/utils/FormatDuration";
import type { MusicDTO } from "@/services/types";
import TrackCover3 from "@/assets/track-cover3.png"
import PlayIcon from "@/assets/icons/play-icon.svg"
import OptionsIcon from "@/assets/icons/options-icon.svg"

interface TrackTableRowProps {
  music: MusicDTO
  index: number
  musics: MusicDTO[]
}

export default function TrackTableRow({ music, index, musics }: TrackTableRowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { play, currentTrack, isPlaying } = usePlayer()

  const isThisTrack = currentTrack?.id === music.id
  const isThisPlaying = isThisTrack && isPlaying

  const handlePlay = () => {
    if (isThisPlaying) return
    play(music, musics)
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlay}
      className="grid items-center grid-cols-[16px_400px_1fr_1fr_80px] gap-4 px-4 py-2 cursor-pointer">
      <div className="flex items-center justify-center w-4">
        {isHovered || isThisPlaying ? (
          <span className="text-white text-sm">
            <img src={PlayIcon} />
          </span>
        ) :
          <span className="text-sm text-subdued tabular-nums">
            {index + 1}
          </span>}
      </div>

      <div className="flex gap-2 items-center">
        <img src={TrackCover3} className="w-9 h-9 rounded-xs bg-white/10" />

        <div className="flex flex-col gap-1">
          <span className={`text-10-medium font-bold ${isThisTrack ? "text-primary" : "text-white"}`}>
            {music.title}
          </span>
          <span className="text-subdued text-10-medium font-bold">
            Artist Name
          </span>
        </div>
      </div>

      <span className="text-subdued text-10-medium font-bold">
        Album Title
      </span>

      <span className="text-subdued text-10-medium font-bold">
        {new Date(music.releaseDate).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}
      </span>

      <div className="flex gap-2">
        <span className="text-subdued text-10-medium">
          {formatDuration(music.duration)}
        </span>
        <img src={OptionsIcon} />
      </div>
    </div>
  )
}
