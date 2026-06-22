import { useState } from "react"
import { formatDuration } from "@/utils/FormatDuration"
import { formatPlayCount } from "@/utils/FormatPlayCount"
import { cn } from "@/utils/utils"
// import SavedIcon from "@/assets/icons/verified-icon.svg"
import PlayIcon from "@/assets/icons/play-icon.svg"
import OptionsIcon from "@/assets/icons/options-icon.svg"
import TrackCover from "@/assets/track-cover1.png"

interface PopularTrackRowProps {
  title: string
  timesListen: number
  duration: number
  index: number
  isExplit?: boolean
  isActive?: boolean
  onClick?: () => void
}

export default function PopularTrackRow({ title, timesListen, duration, index, isActive = false, onClick }: PopularTrackRowProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "grid grid-cols-[16px_36px_1fr] md:grid-cols-[16px_36px_1fr_auto_auto_auto_auto] w-full min-w-0 items-center gap-2.5 px-2 py-1 transition ease-in-out duration-300 cursor-pointer rounded-sm overflow-hidden",
        isActive && "bg-bg-elements"
      )}>

      <div className="flex items-center justify-center w-4">
        {isHovered ? (
          <span className="text-white text-sm">
            <img src={PlayIcon} />
          </span>
        ) :
          <span className="text-sm text-subdued tabular-nums">
            {index}
          </span>}
      </div>

      <img
        src={TrackCover}
        alt="Track Cover Image"
        className="w-9 h-9 rounded-xs"
      />

      <div className="flex flex-col gap-1 overflow-hidden">
        <span className="text-white font-bold text-10-medium truncate">
          {title}
        </span>

        {/* Todas as musicas estão retornando false para explit */}
        {/* {isExplit && ( */}
          <span className="text-[8px] font-bold bg-text-subdued text-black rounded-[1px] w-fit h-12px px-1 ">
            E
          </span>
        {/* )} */}


      </div>

      <span className="hidden md:block text-10-medium text-subdued">
        {formatPlayCount(timesListen ?? 0)}      
      </span>

      {/* todo: botao de adicionar à playlist  */}
      {/* <img src={SavedIcon} /> */}

      <span className="hidden md:block text-10-medium text-subdued">
        {formatDuration(duration)}
      </span>

      <span className="hidden md:block">
        <img src={OptionsIcon} />
      </span>
    </div>
  )
}