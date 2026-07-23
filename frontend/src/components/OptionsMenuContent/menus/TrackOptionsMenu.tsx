import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "@/context/useMenuContext";
import { removeMusicFromPlaylist, toggleMusicLike } from "@/api";
import OptionsMenuContainer from "../OptionsMenuContainer";
import OptionsMenuItem from "../OptionsMenuItem";
import OptionsMenuDivider from "../OptionsMenuDivider";
import PlaylistSubmenu from "../PlaylistSubmenu";
import PlusIcon from "@/assets/icons/plus-icon.svg"
import MinusIcon from "@/assets/icons/minus-icon.svg"
import AddIcon from "@/assets/icons/add-subdued-icon.svg"
import ArtistIcon from "@/assets/icons/artist-icon.svg"
import AlbumIcon from "@/assets/icons/album-icon.svg"
import CreditsIcon from "@/assets/icons/credits-icon.svg"
import RightClickMenuItemIcon from "@/assets/icons/right-click-menu-item.svg"

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
  const [showPlaylistSubmenu, setShowPlaylistSubmenu] = useState(false)

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
        rightIcon={RightClickMenuItemIcon}
        onClick={() => setShowPlaylistSubmenu((prev) => !prev)}
        isActive={showPlaylistSubmenu}
      />
      {showPlaylistSubmenu && (
        <PlaylistSubmenu
          trackId={trackId}
          onClose={onClose}
        />
      )}
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
      <OptionsMenuDivider/>
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