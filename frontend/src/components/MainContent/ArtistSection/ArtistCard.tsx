import { useState } from "react"
import { usePlayer } from "@/context/PlayerContext"
import { getArtistPopularMusics } from "@/api"
import type { MusicDTO } from "@/types/index.types"
import ArtistCover from "@/assets/artist-cover.png"
import PlayButton from "@/components/ui/PlayButton"

interface ArtistCardProps {
  id: string
  name: string
  onClick?: () => void
}

export default function ArtistCard({ id, name, onClick }: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [cachedMusics, setCachedMusics] = useState<MusicDTO[] | null>(null)
  const { play, pause, currentTrack, isPlaying } = usePlayer()

  const isThisPlaying = Boolean(
    currentTrack && cachedMusics?.some(m => m.id === currentTrack.id) && isPlaying
  )

  const handleTogglePlay = async (e: React.MouseEvent) => {
    e.stopPropagation()

    let musics = cachedMusics
    if (!musics) {
      musics = await getArtistPopularMusics(id)
      setCachedMusics(musics)
    }

    const isCurrentlyPlaying = Boolean(
      currentTrack && musics.some(m => m.id === currentTrack.id) && isPlaying
    )

    if (isCurrentlyPlaying) {
      pause()
    } else if (musics.length > 0) {
      play(musics[0], musics)
    }
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="flex flex-col gap-2 cursor-pointer ">
      <div className="relative w-15 h-15 md:w-33 md:h-33">
        <img
          src={ArtistCover}
          alt="Artist Profile Image"
          className="rounded-full"
        />
        <div className={`absolute bottom-0.5 right-1 transition ease-out duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <PlayButton
            isPlaying={isThisPlaying}
            onToggle={handleTogglePlay}
          />
        </div>

      </div>
      <div className="flex flex-col gap-1">
        <span className="text-white text-12-medium">
          {name}
        </span>
        <span className="hidden md:block text-subdued text-10-medium">
          Artista
        </span>
      </div>
    </div>
  )
}