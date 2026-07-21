import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePlayer } from "@/context/PlayerContext"
import { getArtistById } from "@/api"
import type { ArtistDTO } from "@/types/artist.types"
import PanelArtistCover from "@/assets/panel-artist-cover.png"
import VerifiedIcon from "@/assets/icons/artist-verified-icon.svg"
import FollowButton from "@/components/ui/FollowButton"

export default function SongPanelArtistCard() {
  const { currentTrack } = usePlayer()
  const [isFollowing, setIsFollowing] = useState(false)
  const [artist, setArtist] = useState<ArtistDTO | null>(null)
  const navigate = useNavigate()

  useEffect(() => {    
    if (!currentTrack?.artistId) return
    getArtistById(currentTrack.artistId).then(setArtist)
  }, [currentTrack?.artistId])

  const handleFollowingArtist = (following: boolean) => {
    setIsFollowing(following)
  }

  return (
    <div className="w-full max-w-sm rounded-lg bg-bg-highlight">
      <div
        onClick={() => currentTrack && navigate(`/artist/${currentTrack.artistId}`)}
        className="relative h-48 w-full cursor-pointer"
      >
        <img
          src={PanelArtistCover}
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 pointer-events-none">
          <p className="absolute text-white text-12-bold left-3 top-3">
            Sobre o artista
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-3">
        <div className="flex items-center justify-between gap-3">
          <div
            onClick={() => currentTrack && navigate(`/artist/${currentTrack.artistId}`)}
            className="flex items-center gap-1 cursor-pointer">
            <p className="text-white text-12-bold">
              {currentTrack?.artistName || "Nome do Artista"}
            </p>
            <img
              src={VerifiedIcon}
              className="w-4 h-4 shrink-0"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-subdued text-10-bold">
          {artist?.listeners?.toLocaleString("pt-br") || "-"} ouvintes mensais
          </p>
          <FollowButton
            isFollowing={isFollowing}
            onToggle={(following) => handleFollowingArtist(following)}
          />
        </div>

        <p className="text-subdued text-10-medium">
          {artist?.about || ""}
        </p>
      </div>
    </div>
  )
}