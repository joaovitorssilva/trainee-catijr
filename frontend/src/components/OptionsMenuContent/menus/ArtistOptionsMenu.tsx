import { useMenuContext } from "@/context/useMenuContext";
import { usePinnedItems } from "@/hooks/usePinnedItems";
import OptionsMenuContainer from "../OptionsMenuContainer";
import OptionsMenuItem from "../OptionsMenuItem";
import PinIcon from "@/assets/icons/pin-icon.svg"
import XIcon from "@/assets/icons/x.svg"

interface ArtistOptionsMenuProps {
  x: number
  y: number
  onClose: () => void
  artistId: string
}

export default function ArtistOptionsMenu({ x, y, onClose, artistId }: ArtistOptionsMenuProps) {
  const { triggerRefresh } = useMenuContext()
  const { isPinned, togglePin } = usePinnedItems("artist")

  return (
    <OptionsMenuContainer x={x} y={y} onClose={onClose}>
      <OptionsMenuItem label="Deixar de seguir" icon={XIcon} />
      <OptionsMenuItem
        label={isPinned(artistId) ? "Remover pin do artista" : "Fixar artista"}
        icon={PinIcon}
        onClick={() => {
          togglePin(artistId)
          triggerRefresh()
          onClose()
        }}
      />
    </OptionsMenuContainer>
  )
}
