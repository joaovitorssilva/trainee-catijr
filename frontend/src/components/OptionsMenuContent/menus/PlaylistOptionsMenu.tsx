import { useState } from "react";
import { getPlaylistById, updatePlaylistAttributes } from "@/api";
import { useMenuContext } from "@/context/useMenuContext";
import { usePinnedItems } from "@/hooks/usePinnedItems";
import OptionsMenuContainer from "../OptionsMenuContainer";
import OptionsMenuItem from "../OptionsMenuItem";
import PencilIcon from "@/assets/icons/pencil-icon.svg"
import MinusCircle from "@/assets/icons/minus-icon.svg"
import PinIcon from "@/assets/icons/pin-icon.svg"
import LockIcon from "@/assets/icons/lock-icon.svg"

interface PlaylistOptionsMenuProps {
  x: number
  y: number
  onClose: () => void
  playlistId: string
  playlistType?: string
  isPublic?: boolean
}

export default function PlaylistOptionsMenu({ x, y, onClose, playlistId, playlistType, isPublic }: PlaylistOptionsMenuProps) {
  const { openEditModal, openDeleteModal, triggerRefresh } = useMenuContext()
  const { isPinned, togglePin } = usePinnedItems("playlist")
  const [isPublicState, setIsPublicState] = useState(isPublic ?? false)

  const isLikedSongs = playlistType === "liked_songs"

  const handleTogglePublic = () => {
    getPlaylistById(playlistId).then(playlist => {
      updatePlaylistAttributes(playlistId, {
        name: playlist.name,
        description: playlist.description,
        isPublic: !isPublicState,
      }).then(() => {
        setIsPublicState(prev => !prev)
        triggerRefresh()
        onClose()
      })
    })
  }

  return (
    <OptionsMenuContainer x={x} y={y} onClose={onClose}>
      {!isLikedSongs && (
        <OptionsMenuItem
          label="Editar os detalhes"
          icon={PencilIcon}
          onClick={() => {
            openEditModal(playlistId)
            onClose()
          }}
        />
      )}
      {!isLikedSongs && (
        <OptionsMenuItem
          label="Apagar playlist"
          icon={MinusCircle}
          onClick={() => {
            openDeleteModal(playlistId);
            onClose()
          }}
        />
      )}
      <OptionsMenuItem
        label={isPublicState ? "Tornar privada" : "Tornar pública"}
        icon={LockIcon}
        onClick={handleTogglePublic}
      />
      <OptionsMenuItem
        label={isPinned(playlistId) ? "Remover pin da playlist" : "Fixar playlist"}
        icon={PinIcon}
        onClick={() => {
          togglePin(playlistId)
          triggerRefresh()
          onClose()
        }}
      />
    </OptionsMenuContainer>
  )
}