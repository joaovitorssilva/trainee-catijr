import { useState } from "react";
import { formatDuration } from "@/utils/FormatDuration";
import type { MusicDTO } from "@/services/types";
import TrackCover3 from "@/assets/track-cover3.png"
import PlayIcon from "@/assets/icons/play-icon.svg"
import OptionsIcon from "@/assets/icons/options-icon.svg"

export default function TrackTableRow({ music, index }: { music: MusicDTO; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="grid items-center grid-cols-[16px_400px_1fr_1fr_80px] gap-4 px-4 py-2 cursor-pointer">
      <div className="flex items-center justify-center w-4">
        {isHovered ? (
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
          <span className="text-white text-10-medium font-bold">
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