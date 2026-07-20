import { useState } from "react"
import { usePlayer } from "@/context/PlayerContext"
import { getAlbumMusics } from "@/api"
import type { MusicDTO } from "@/types/index.types"
import AlbumCover from "@/assets/album-cover.png"
import PlayButton from "@/components/ui/PlayButton"

interface AlbumCardProps {
  id: string
  title: string
  year: string
  onClick?: () => void
}

export default function AlbumCard({ id, title, year, onClick }: AlbumCardProps) {
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
      musics = await getAlbumMusics(id)
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
      className="flex flex-col gap-2  cursor-pointer">
      <div className="relative w-15 md:w-33 h-15 md:h-33">
        <img
          src={AlbumCover}
          alt="Artist Image"
          className="w-full aspect-square object-cover rounded-xs "
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
          {title}
        </span>
        <span className="hidden md:block text-subdued text-10-medium">
          {year} • Album
        </span>
      </div>
    </div>
  )
}