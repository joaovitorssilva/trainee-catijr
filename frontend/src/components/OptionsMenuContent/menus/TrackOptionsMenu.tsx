import { useNavigate } from "react-router-dom";
import { useMenuContext } from "@/context/useMenuContext";
import { removeMusicFromPlaylist, toggleMusicLike } from "@/api";
import OptionsMenuContainer from "../OptionsMenuContainer";
import OptionsMenuItem from "../OptionsMenuItem";
import PlusIcon from "@/assets/icons/plus-icon.svg"
import MinusIcon from "@/assets/icons/minus-icon.svg"
import AddIcon from "@/assets/icons/add-subdued-icon.svg"
import ArtistIcon from "@/assets/icons/artist-icon.svg"
import AlbumIcon from "@/assets/icons/album-icon.svg"
import CreditsIcon from "@/assets/icons/credits-icon.svg"

interface TrackOptionsMenuProps {
  x: number
  y: number
  trackId: string
  artistId?: string
  albumId?: string
  liked?: boolean
  playlistId?: string
  isSaved: boolean
  onClose: () => void
}

export default function TrackOptionsMenu({ x, y, onClose, trackId, artistId, albumId, liked, playlistId }: TrackOptionsMenuProps) {
  const navigate = useNavigate()
  const { triggerRefresh } = useMenuContext()

  const handleRemoveMusicFromPlaylist = () => {
    if (!playlistId) return
    removeMusicFromPlaylist(playlistId, trackId).then(() => {
      triggerRefresh()
      onClose()
    })
  }

  const handleToggleLike = () => {
    toggleMusicLike(trackId).then(() => {
      triggerRefresh()
      onClose()
    })
  }

  return (
    <OptionsMenuContainer x={x} y={y} onClose={onClose}>
      <OptionsMenuItem
        label="Adicionar à playlist"
        icon={PlusIcon}
      />
      <OptionsMenuItem
        label="Remover desta playlist"
        icon={MinusIcon}
        onClick={handleRemoveMusicFromPlaylist}
      />
      <OptionsMenuItem
        label={liked ? "Remover de músicas curtidas" : "Salvar em músicas curtidas"}
        icon={AddIcon}
        onClick={handleToggleLike}
      />
      <OptionsMenuItem
        label="Ir para o artista"
        icon={ArtistIcon}
        onClick={() => {
          navigate(`/artist/${artistId}`)
          onClose()
        }}
      />
      <OptionsMenuItem
        label="Ir para o album"
        icon={AlbumIcon}
        onClick={() => {
          navigate(`/album/${albumId}`)
          onClose()
        }}
      />
      <OptionsMenuItem
        label="Ver créditos"
        icon={CreditsIcon}
      />
    </OptionsMenuContainer>
  )
}