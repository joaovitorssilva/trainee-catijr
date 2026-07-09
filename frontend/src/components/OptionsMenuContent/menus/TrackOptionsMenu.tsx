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
  isSaved: boolean
  onClose: () => void
}

export default function TrackOptionsMenu({ x, y, onClose }: TrackOptionsMenuProps) {
  return (
    <OptionsMenuContainer x={x} y={y} onClose={onClose}>
      <OptionsMenuItem label="Adicionar à playlist" icon={PlusIcon} />
      <OptionsMenuItem label="Remover desta playlist" icon={MinusIcon} />
      <OptionsMenuItem label="Salvar em músicas curtidas" icon={AddIcon} />

      <OptionsMenuItem label="Ir para o artista" icon={ArtistIcon} />
      <OptionsMenuItem label="Ir para o album" icon={AlbumIcon} />
      <OptionsMenuItem label="Ver créditos" icon={CreditsIcon} />
    </OptionsMenuContainer>
  )
}