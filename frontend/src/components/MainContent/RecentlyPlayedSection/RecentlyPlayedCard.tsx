import { useState } from "react"
import { usePlayer } from "@/context/PlayerContext"
import type { MusicDTO } from "@/types/music.types"
import PlayButton from "@/components/ui/PlayButton"
import TrackCover from "@/assets/track-cover2.png"
import PlayingAnimatedIcon1 from "@/assets/icons/playing-animated-icon1.svg"
import PlayingIconAnimation2 from "@/assets/icons/playing-animated-icon2.svg"
import PlayingIconAnimation from "@/utils/PlayingIconAnimation"

interface RecentlyPlayedCardProps {
  music: MusicDTO
  musics: MusicDTO[]
}

const frames = [PlayingAnimatedIcon1, PlayingIconAnimation2]

export default function RecentlyPlayedCard({ music, musics }: RecentlyPlayedCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { play, pause, currentTrack, isPlaying } = usePlayer()

  const frame = PlayingIconAnimation()

  const isThisTrack = currentTrack?.id === music.id
  const isThisPlaying = isThisTrack && isPlaying

  const handleTogglePlay = () => {
    if (isThisPlaying) {
      pause()
    } else {
      play(music, musics, { type: "search" })
    }
  }

  return (
    < div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center justify-between rounded-sm cursor-pointer ${isHovered ? "bg-[#5B5A5A99]" : "bg-bg-elements"}`}
    >
      <div className="w-8 h-8 md:w-15 md:h-15 shrink-0">
        <img
          src={TrackCover}
          className="w-full h-full rounded-xs"
        />
      </div>
      <span className=" text-white text-12-bold p-2.5 truncate">
        {music.title}
      </span>
      <div className={" transition ease-out duration-300"}>
        {isHovered && (
          <div className="pr-1">
            <PlayButton
              isPlaying={isThisPlaying}
              onToggle={handleTogglePlay}
            />
          </div>
        )}
        {isThisPlaying && !isHovered && (
          <div className="relative w-4 h-4 pr-2">
            <img
              src={frames[frame]}
              alt="Animated bars icon"
              className="absolute inset-0  "
            />
          </div>

        )}
      </div>
    </div >
  )
}