import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPlaylistById } from "@/services/api"
import { usePlayer } from "@/context/PlayerContext"
import type { PlaylistDTO } from "@/services/types"
import PlaylistHeader from "@/components/PlaylistContent/PlaylistHeader"
import TracksTable from "@/components/PlaylistContent/TracksTable"
import PlayButton from "@/components/ui/PlayButton"

export default function PlaylistPage() {
  const { playlistId } = useParams<{ playlistId: string }>()
  const [playlist, setPlaylist] = useState<PlaylistDTO | null>(null)
  const { currentTrack, isPlaying, play, pause } = usePlayer()

  useEffect(() => {
    if (!playlistId) return
    getPlaylistById(playlistId).then(setPlaylist)
  }, [playlistId])

  if (!playlist) return <p className="text-subdued p-8">carregando...</p>

  const isThisPlaying = Boolean(
    currentTrack && playlist.musics.some(m => m.id === currentTrack.id) && isPlaying
  )

  const handleTogglePlay = () => {
    if (isThisPlaying) {
      pause()
    } else if (playlist.musics.length > 0) {
      play(playlist.musics[0], playlist.musics)
    }
  }

  return (
    <div className="flex flex-col bg-bg-base rounded-lg gap-8">
      <PlaylistHeader
        name={playlist.name}
        musicQtd={playlist.musics.length}
        duration={playlist.duration}
      />
      <div className="px-5">
        <PlayButton
          isPlaying={isThisPlaying}
          onToggle={handleTogglePlay}
        />
      </div>
      <TracksTable />
    </div>
  )
}
