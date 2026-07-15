import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPlaylistById } from "@/services/api"
import { usePlayer } from "@/context/PlayerContext"
import { useMenuContext } from "@/context/useMenuContext"
import type { PlaylistDTO } from "@/services/types"
import PlaylistHeader from "@/components/PlaylistContent/PlaylistHeader"
import TracksTable from "@/components/PlaylistContent/TracksTable"
import PlayButton from "@/components/ui/PlayButton"

export default function PlaylistPage() {
  const { playlistId } = useParams<{ playlistId: string }>()
  const [playlist, setPlaylist] = useState<PlaylistDTO | null>(null)
  const { currentTrack, isPlaying, play, pause } = usePlayer()
  const { openEditModal, refreshKey } = useMenuContext()

  useEffect(() => {
    if (!playlistId) return
    getPlaylistById(playlistId).then(setPlaylist)
  }, [playlistId, refreshKey])

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

  const isLikedSongs = playlist.type === "liked_songs"

  if (playlist.musics.length === 0) {
    return (
      <div className="flex flex-col bg-bg-base rounded-lg ">
        <PlaylistHeader
          name={playlist.name}
          musicQtd={0}
          duration={0}
          isPublic={playlist.isPublic}
          type={playlist.type}
          onEditClick={isLikedSongs ? undefined : () => openEditModal(playlistId!)}
        />
        <div className="flex flex-col p-5 gap-3">
          <p className="text-white text-18-bold">Nenhuma música encontrada</p>
          {!isLikedSongs && (
            <p className="text-subdued text-16-medium">Adicione músicas para começar a ouvir</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-bg-base rounded-lg gap-8">
      <PlaylistHeader
        name={playlist.name}
        musicQtd={playlist.musics.length}
        duration={playlist.duration}
        isPublic={playlist.isPublic}
        type={playlist.type}
        onEditClick={isLikedSongs ? undefined : () => openEditModal(playlistId!)}
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
