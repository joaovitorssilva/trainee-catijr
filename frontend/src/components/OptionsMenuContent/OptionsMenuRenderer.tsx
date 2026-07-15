import { useMenuContext } from "@/context/useMenuContext";
import TrackOptionsMenu from "./menus/TrackOptionsMenu";
import ArtistOptionsMenu from "./menus/ArtistOptionsMenu";
import AlbumOptionsMenu from "./menus/AlbumOptionsMenu";
import PlaylistOptionsMenu from "./menus/PlaylistOptionsMenu";

export default function OptionsMenuRenderer() {
  const { menu, closeMenu } = useMenuContext()

  if (!menu) return null

  const props = { x: menu.x, y: menu.y, onClose: closeMenu }

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
}