import { useState } from "react"
import { usePlayer } from "@/context/PlayerContext"
import type { MusicDTO } from "@/services/types"
import PlayButton from "@/components/ui/PlayButton"
import TrackCover from "@/assets/track-cover2.png"
import PlayingAnimatedIcon from "@/assets/icons/playing-animated-icon.svg"

interface RecentlyPlayedCardProps {
  music: MusicDTO
  musics: MusicDTO[]
}

export default function RecentlyPlayedCard({ music, musics }: RecentlyPlayedCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { play, pause, currentTrack, isPlaying } = usePlayer()

  const isThisTrack = currentTrack?.id === music.id
  const isThisPlaying = isThisTrack && isPlaying

  const handleTogglePlay = () => {
    if (isThisPlaying) {
      pause()
    } else {
      play(music, musics)
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
      <span className=" text-white text-12-bold pl-2.5 ">
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
          <div className="pr-2">
            <img
              src={PlayingAnimatedIcon}
              alt="Animated bars icon"
              className="w-4"
            />
          </div>

        )}
      </div>
    </div >
  )
}