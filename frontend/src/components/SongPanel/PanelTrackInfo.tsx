import { useNavigate } from "react-router-dom"
import { usePlayer } from "@/context/PlayerContext"
import TrackCover from "@/assets/panel-track.png"

export default function SongPanelTrackInfo() {
  const navigate = useNavigate()
  const { currentTrack } = usePlayer()

  return (
    <div className="flex flex-col gap-3">
      <div className="w-72.75 h-72.75 ">
        <img
          src={TrackCover}
          alt="Track Cover Image"
          onClick={() => currentTrack && navigate(`/album/${currentTrack.albumId}`)}
          className="w-full h-full rounded-sm object-fit cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-white text-20-extrabold truncate">
          {currentTrack?.title}
        </span>
        <button
          onClick={() => currentTrack?.artistId && navigate(`/artist/${currentTrack.artistId}`)}
          className="text-subdued text-12-semibold cursor-pointer text-left truncate disabled:cursor-default"
          disabled={!currentTrack?.artistId}
        >
          {currentTrack?.artistName || "Nome do Artista"}
        </button>
      </div>
    </div>

  )

}