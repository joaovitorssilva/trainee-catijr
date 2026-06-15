import { useState } from "react"
import TrackCover from "@/assets/track-cover2.png"
import PlayButton from "@/components/ui/PlayButton"

interface RecentlyPlayedCardProps {
  title: string
  isPlaying?: boolean
  onToggle?: () => void
}

export default function RecentlyPlayedCard({ title, isPlaying, onToggle }: RecentlyPlayedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center justify-between  rounded-sm cursor-pointer ${isHovered ? "bg-[#5B5A5A99]" : "bg-bg-elements"}`}
    >
      <div className="w-8 h-8 md:w-12 md:h-12 shrink-0">
        <img src={TrackCover} className="w-full h-full rounded-xs" />
      </div>
      <span className=" text-white text-12-bold pl-2.5">
        {title}
      </span>
      <div className={`pr-1 transition ease-out duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
        <PlayButton isPlaying={isPlaying} onToggle={onToggle ?? (() => { })} />
      </div>
    </div>
  )
}