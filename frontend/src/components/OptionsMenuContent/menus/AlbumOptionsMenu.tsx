import { useMenuContext } from "@/context/useMenuContext";
import { usePinnedItems } from "@/hooks/usePinnedItems";
import OptionsMenuContainer from "../OptionsMenuContainer";
import OptionsMenuItem from "../OptionsMenuItem";
import AddIcon from "@/assets/icons/add-subdued-icon.svg"
import VerifiedIcon from "@/assets/icons/verified-icon.svg"
import PinIcon from "@/assets/icons/pin-icon.svg"
import ArtistIcon from "@/assets/icons/artist-icon.svg"
import { useNavigate } from "react-router-dom";

interface AlbumOptionsMenuProps {
  x: number
  y: number
  onClose: () => void
  albumId: string
  artistId?: string
}

export default function AlbumOptionsMenu({ x, y, onClose, albumId, artistId }: AlbumOptionsMenuProps) {
  const  navigate = useNavigate()
  const { triggerRefresh } = useMenuContext()
  const { isPinned, togglePin } = usePinnedItems("album")

  return (
    <OptionsMenuContainer x={x} y={y} onClose={onClose}>
      <OptionsMenuItem label="Adicionar à sua biblioteca" icon={AddIcon} />
      <OptionsMenuItem label="Remover da sua biblioteca" icon={VerifiedIcon} />
      <OptionsMenuItem
        label={isPinned(albumId) ? "Remover pin do álbum" : "Fixar álbum"}
        icon={PinIcon}
        onClick={() => {
          togglePin(albumId)
          triggerRefresh()
          onClose()
        }}
      />
      <OptionsMenuItem 
        label="Ir para o artista"
        icon={ArtistIcon}
        onClick={() => {
          navigate(`/artist/${artistId}`)
        }}
        
        />
    </OptionsMenuContainer>
  )
}
