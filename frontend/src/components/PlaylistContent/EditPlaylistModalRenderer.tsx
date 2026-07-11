import { useEffect, useState } from "react"
import { useMenuContext } from "@/context/useMenuContext"
import { getPlaylistById, updatePlaylistAttributes } from "@/services/api"
import type { PlaylistDTO } from "@/services/types"
import EditPlaylistModal from "./EditPlaylistModal"

export default function EditPlaylistModalRenderer() {
  const { editingPlaylistId, closeEditModal, triggerRefresh } = useMenuContext()
  const [playlist, setPlaylist] = useState<PlaylistDTO | null>(null)

  useEffect(() => {
    if (!editingPlaylistId) return
    getPlaylistById(editingPlaylistId).then(setPlaylist)
  }, [editingPlaylistId])

  if (!editingPlaylistId || !playlist) return null

  return (
    <EditPlaylistModal
      isOpen
      onClose={closeEditModal}
      playlist={{ name: playlist.name, description: playlist.description, isPublic: playlist.isPublic }}
      onSave={(data) =>
        updatePlaylistAttributes(editingPlaylistId, data).then(() => { triggerRefresh() })
      }
    />
  )
}
