import OptionsMenuContainer from "../OptionsMenuContainer";
import OptionsMenuItem from "../OptionsMenuItem";
import AddIcon from "@/assets/icons/add-subdued-icon.svg"
import VerifiedIcon from "@/assets/icons/verified-icon.svg"
import PinIcon from "@/assets/icons/pin-icon.svg"
import ArtistIcon from "@/assets/icons/artist-icon.svg"

interface AlbumOptionsMenuProps {
  x: number
  y: number
  onClose: () => void
}

export default function AlbumOptionsMenu({ x, y, onClose }: AlbumOptionsMenuProps) {
  return (
    <OptionsMenuContainer x={x} y={y} onClose={onClose}>
      <OptionsMenuItem label="Adicionar à sua biblioteca" icon={AddIcon} />
      <OptionsMenuItem label="Remover da sua biblioteca" icon={VerifiedIcon} />
      <OptionsMenuItem label="Fixar álbum" icon={PinIcon} />
      <OptionsMenuItem label="Remover pin do álbum" icon={PinIcon} />
      <OptionsMenuItem label="Ir para o artista" icon={ArtistIcon} />
    </OptionsMenuContainer>
  )
}