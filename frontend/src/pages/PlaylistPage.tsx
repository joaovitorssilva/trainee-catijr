import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPlaylistById } from "@/services/api"
import type { PlaylistDTO } from "@/services/types"
import PlaylistHeader from "@/components/PlaylistContent/PlaylistHeader"
import TracksTable from "@/components/PlaylistContent/TracksTable"
import PlayButton from "@/components/ui/PlayButton"

export default function PlaylistPage() {
  const { playlistId } = useParams<{ playlistId: string }>()
  const [playlist, setPlaylist] = useState<PlaylistDTO | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!playlistId) return
    getPlaylistById(playlistId)
      .then(setPlaylist)
  }, [playlistId])

  if (!playlist) return <p className="text-subdued p-8">carregando...</p>

  return (
    <div className="flex flex-col bg-bg-base min-h-screen rounded-lg gap-8">
      <PlaylistHeader
        name={playlist.name}
        musicQtd={playlist.musicQtd}
        duration={playlist.duration}
      />

      <div className="px-5">
        <PlayButton
          isPlaying={isPlaying}
          onToggle={() => setIsPlaying(prev => !prev)}
        />
      </div>
      
      <TracksTable />
    </div>
  )
}