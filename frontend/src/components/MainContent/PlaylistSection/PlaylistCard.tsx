import { useState } from "react"
import { usePlayer } from "@/context/PlayerContext"
import { getPlaylistById } from "@/api"
import type { MusicDTO } from "@/types/index.types"
import PlaylistCover from "@/assets/playlist-cover.png"
import PlayButton from "@/components/ui/PlayButton"

interface PlaylistCardProps {
  id: string
  name: string
  musicQtd: number
  onClick?: () => void
}

export default function PlaylistCard({ id, name, musicQtd, onClick }: PlaylistCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [cachedMusics, setCachedMusics] = useState<MusicDTO[] | null>(null)
  const { play, pause, currentTrack, isPlaying } = usePlayer()

  const isThisPlaying = Boolean(
    currentTrack && cachedMusics?.some(m => m.id === currentTrack.id) && isPlaying
  )

  const handleTogglePlay = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (musicQtd === 0) return

    let musics = cachedMusics
    if (!musics) {
      const playlist = await getPlaylistById(id)
      musics = playlist.musics
      setCachedMusics(musics)
    }

    const isCurrentlyPlaying = Boolean(
      currentTrack && musics.some(m => m.id === currentTrack.id) && isPlaying
    )

    if (isCurrentlyPlaying) {
      pause()
    } else {
      play(musics[0], musics, { type: "playlist", playlistId: id, playlistName: name })
    }
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col gap-2 cursor-pointer ">
      <div className="relative w-15 h-15 md:w-[132px] md:h-[132px]">
        <img
          src={PlaylistCover}
          className="w-full aspect-square object-cover rounded-xs "
        />
        <div className={`absolute bottom-0.5 right-1 trantision ease-out duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <PlayButton
            isPlaying={isThisPlaying}
            onToggle={handleTogglePlay}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 overflow-hidden">
        <span className="text-white text-12-medium ">
          {name}
        </span>
        <span className="hidden md:block text-subdued text-10-medium">
          Playlist • João Vitor
        </span>
      </div>
    </div>
  )

}