import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPlaylistById } from "@/services/api";
import { useMenuContext } from "@/context/useMenuContext";
import type { PlaylistDTO } from "@/services/types";
import ClockIcon from "@/assets/icons/clock-icon.svg"
import TrackTableRow from "./TrackTableRow"

export default function TracksTable() {
  const { playlistId } = useParams()
  const { refreshKey } = useMenuContext()
  const [playlist, setPlaylist] = useState<PlaylistDTO | null>(null)

  useEffect(() => {
    if (!playlistId) return
    getPlaylistById(playlistId)
      .then(setPlaylist)
  }, [playlistId, refreshKey])


  if (!playlist) return null

  return (
    <div>
      <div className="grid items-center grid-cols-[16px_400px_1fr_1fr_80px] gap-4 px-4 py-2 border-b border-white/10 mb-2">
        <span className="text-subdued text-10-medium">#</span>
        <span className="text-subdued text-10-medium">
          Título
        </span>
        <span className="text-subdued text-10-medium">
          Álbum
        </span>
        <span className="text-subdued text-10-medium">
          Adicionada em
        </span>
        <img src={ClockIcon} />
      </div>

      {playlist.musics.map((music, index) => (
        <TrackTableRow 
          key={music.id}
          id={music.id}
          music={music}
          index={index}
          musics={playlist.musics}
          albumId={music.albumId}
          playlistId={playlistId}
        />
      ))}
    </div>
  )
}