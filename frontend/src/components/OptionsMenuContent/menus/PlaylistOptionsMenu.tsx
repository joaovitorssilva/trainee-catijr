import OptionsMenuContainer from "../OptionsMenuContainer";
import OptionsMenuItem from "../OptionsMenuItem";
import PencilIcon from "@/assets/icons/pencil-icon.svg"
import MinusCircle from "@/assets/icons/minus-icon.svg"
import PinIcon from "@/assets/icons/pin-icon.svg"
import LockIcon from "@/assets/icons/lock-icon.svg"
import { useMenuContext } from "@/context/useMenuContext";

interface PlaylistOptionsMenuProps {
  x: number
  y: number
  onClose: () => void
  playlistId: string
}

export default function PlaylistOptionsMenu({ x, y, onClose, playlistId }: PlaylistOptionsMenuProps) {
  const { openEditModal, openDeleteModal } = useMenuContext()

  return (
    <OptionsMenuContainer x={x} y={y} onClose={onClose}>
      <OptionsMenuItem 
        label="Editar os detalhes"
        icon={PencilIcon}
        onClick={() => {
          openEditModal(playlistId)
          onClose()
        }}   
      />
      <OptionsMenuItem 
        label="Apagar playlist"
        icon={MinusCircle}
        onClick={() => { openDeleteModal(playlistId);
        onClose() }} 
      />
      <OptionsMenuItem label="Tornar particular" icon={LockIcon} />
      <OptionsMenuItem label="Tornar pública" icon={LockIcon} />
      <OptionsMenuItem label="Fixar playlsit" icon={PinIcon} />
    </OptionsMenuContainer>
  )
}