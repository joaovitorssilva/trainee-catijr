import { useMenuContext } from "@/context/useMenuContext";
import TrackOptionsMenu from "./menus/TrackOptionsMenu";
import ArtistOptionsMenu from "./menus/ArtistOptionsMenu";
import AlbumOptionsMenu from "./menus/AlbumOptionsMenu";
import PlaylistOptionsMenu from "./menus/PlaylistOptionsMenu";
import CreditsModal from "@/components/ui/CreditsModal";
import { mockCredits } from "@/utils/credits.mock";

export default function OptionsMenuRenderer() {
  const { menu, closeMenu, isCreditsModalOpen, closeCreditsModal } = useMenuContext()

  const props = { x: menu?.x ?? 0, y: menu?.y ?? 0, onClose: closeMenu }

  return (
    <>
      {menu && (() => {
        switch (menu.type) {
          case "track":
            return (
              <TrackOptionsMenu {...props}
                trackId={menu.id}
                artistId={menu.artistId}
                albumId={menu.albumId}
                liked={menu.liked}
                playlistId={menu.playlistId}
                isSaved={true}
              />
            )
          case "artist":
            return (
              <ArtistOptionsMenu {...props}
                artistId={menu.id} />
            )
          case "album":
            return (
              <AlbumOptionsMenu {...props}
                albumId={menu.id}
                artistId={menu.artistId}
              />
            )
          case "playlist":
            return (
              <PlaylistOptionsMenu {...props}
                playlistId={menu.id}
                playlistType={menu.playlistType}
                isPublic={menu.isPublic}
              />
            )
          default: return null
        }
      })()}

      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={closeCreditsModal}
        credits={mockCredits}
      />
    </>
  )
}