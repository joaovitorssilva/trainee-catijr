import { deletePlaylist } from "@/services/api"
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
}

export default function PlaylistOptionsMenu({ x, y, onClose, playlistId }: PlaylistOptionsMenuProps) {
  return (
    <OptionsMenuContainer x={x} y={y} onClose={onClose}>
      <OptionsMenuItem label="Editar os detalhes" icon={PencilIcon} />
      <OptionsMenuItem 
        label="Apagar playlist"
        icon={MinusCircle}
        onClick={() => { deletePlaylist(playlistId);
        onClose() }} 
      />
      <OptionsMenuItem label="Tornar particular" icon={LockIcon} />
      <OptionsMenuItem label="Tornar pública" icon={LockIcon} />
      <OptionsMenuItem label="Fixar playlsit" icon={PinIcon} />
    </OptionsMenuContainer>
  )
}