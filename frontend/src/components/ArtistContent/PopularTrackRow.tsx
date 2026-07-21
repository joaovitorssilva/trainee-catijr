import { useState } from "react"
import { formatDuration } from "@/utils/FormatDuration"
import { formatPlayCount } from "@/utils/FormatPlayCount"
import { toggleMusicLike } from "@/api"
import { useMenuContext } from "@/context/useMenuContext"
import { cn } from "@/utils/utils"
import PlayIcon from "@/assets/icons/play-icon.svg"
import TrackCover from "@/assets/track-cover1.png"
import SavedIcon from "@/assets/icons/verified-icon.svg"
import AddFillIcon from "@/assets/icons/add-fill-icon.svg"
import AddSubduedIcon from "@/assets/icons/add-subdued-icon.svg"
import OptionsButton from "@/components/ui/OptionsButton"

interface PopularTrackRowProps {
  trackId: string
  title: string
  timesListen: number
  duration: number
  index: number
  isExplit?: boolean
  isActive?: boolean
  liked?: boolean
  albumId?: string
  artistId?: string
  onClick?: () => void
}

export default function PopularTrackRow({ trackId, title, timesListen, duration, index, isActive = false, liked, albumId, artistId, onClick }: PopularTrackRowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(liked ?? false)
  const { openMenu, triggerRefresh } = useMenuContext()

  const handleToggleLike = () => {
    toggleMusicLike(trackId).then(() => {
      setIsLiked(prev => !prev)
      triggerRefresh()
    })
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "grid grid-cols-[16px_36px_1fr] md:grid-cols-[16px_36px_1fr_auto_auto_auto_auto] w-full md:w-lg  items-center gap-2.5 px-2 py-1 transition ease-in-out duration-300 cursor-pointer rounded-sm",
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

        <span className="text-[8px] font-bold bg-text-subdued text-black rounded-[1px] w-fit h-12px px-1 ">
          E
        </span>
      </div>

      <span className="hidden md:block text-10-medium text-subdued">
        {formatPlayCount(timesListen ?? 0)}
      </span>

      <span className="hidden md:block text-10-medium text-subdued">
        {formatDuration(duration)}
      </span>

      <button
        onClick={(e) => { e.stopPropagation(); handleToggleLike() }}
        className="hidden md:block transition ease-out duration-300 cursor-pointer outline-none"
      >
        {
          isLiked ? <img src={SavedIcon} /> :
            isHovered ? <img src={AddFillIcon} /> : <img src={AddSubduedIcon} />
        }
      </button>

      <div className="hidden md:block">
        <OptionsButton
          onClick={(e) => { e.stopPropagation(); openMenu(e, "track", trackId, artistId, albumId, liked) }}
        />
      </div>
    </div>
  )
}


