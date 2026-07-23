import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { getUserPlaylists, addMusicToPlaylist } from "@/api"
import { useMenuContext } from "@/context/useMenuContext"
import type { PlaylistNoMusicDTO } from "@/types/index.types"
import OptionsMenuDivider from "./OptionsMenuDivider"
import OptionsMenuItem from "./OptionsMenuItem"

interface PlaylistSubmenuProps {
  trackId: string
  onClose: () => void
}

export default function PlaylistSubmenu({ trackId, onClose }: PlaylistSubmenuProps) {
  const [playlists, setPlaylists] = useState<PlaylistNoMusicDTO[]>([])
  const [openLeft, setOpenLeft] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { triggerRefresh } = useMenuContext()

  useEffect(() => {
    getUserPlaylists().then((list) => {
      setPlaylists(list.filter((p) => p.type !== "liked_songs"))
    })
  }, [])

  // menu positioning
  useLayoutEffect(() => {
    if (!ref.current) return
    const submenu = ref.current
    const parent = submenu.parentElement
    if (!parent) return

    const parentRect = parent.getBoundingClientRect()
    const submenuWidth = submenu.offsetWidth
    const viewportWidth = window.innerWidth

    if (parentRect.right + submenuWidth > viewportWidth) {
      setOpenLeft(true)
    }
  }, [playlists])

  const handleAddToPlaylist = (playlistId: string) => {
    addMusicToPlaylist(playlistId, trackId).then(() => {
      triggerRefresh()
      onClose()
    })
  }

  return (
    <div
      ref={ref}
      className={`absolute top-0 min-w-53 bg-bg-popup rounded-sm z-50 ${openLeft ? "right-full mr-1" : "left-full ml-1"}`}
    >

      <span className="text-white text-10-bold px-3">
        Adicionar à playlist
      </span>
      <OptionsMenuDivider />
      <div className="max-h-50 overflow-y-auto">
        {playlists.map((playlist) => (
          <OptionsMenuItem
            key={playlist.id}
            label={playlist.name}
            onClick={() => handleAddToPlaylist(playlist.id)}
          />
        ))}
        {playlists.length === 0 && (
          <OptionsMenuItem label="Nenhuma playlist encontrada" />
        )}
      </div>
    </div>
  )
}
