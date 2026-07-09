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
    case "track": return <TrackOptionsMenu {...props} trackId={menu.id} isSaved={true} />
    case "artist": return <ArtistOptionsMenu {...props}  />
    case "album": return <AlbumOptionsMenu {...props} />
    case "playlist": return <PlaylistOptionsMenu {...props} playlistId={menu.id} />
    default: return null
  }
}