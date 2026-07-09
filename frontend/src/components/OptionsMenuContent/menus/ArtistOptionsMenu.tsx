import OptionsMenuContainer from "../OptionsMenuContainer";
import OptionsMenuItem from "../OptionsMenuItem";
import PinIcon from "@/assets/icons/pin-icon.svg"
import XIcon from "@/assets/icons/x.svg"

interface ArtistOptionsMenuProps {
  x: number
  y: number
  onClose: () => void
}

export default function ArtistOptionsMenu({ x, y, onClose }: ArtistOptionsMenuProps) {
  return (
    <OptionsMenuContainer x={x} y={y} onClose={onClose}>
      <OptionsMenuItem label="Deixar de seguir" icon={XIcon} />
      <OptionsMenuItem label="Fixar artista" icon={PinIcon} />
      <OptionsMenuItem label="Remover pin do artista" icon={PinIcon} />
    </OptionsMenuContainer>
  )
}