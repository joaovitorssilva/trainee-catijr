import { useEffect, useState } from "react"
import { useMenuContext } from "@/context/useMenuContext"
import { getPlaylistById, updatePlaylistAttributes, uploadPlaylistCover } from "@/api"
import type { PlaylistDTO } from "@/types/index.types"
import EditPlaylistModal from "./EditPlaylistModal"

export default function EditPlaylistModalRenderer() {
  const { editingPlaylistId, closeEditModal, triggerRefresh } = useMenuContext()
  const [playlist, setPlaylist] = useState<PlaylistDTO | null>(null)

  useEffect(() => {
    if (!editingPlaylistId) return
    getPlaylistById(editingPlaylistId).then(p => {
      if (p.type === "liked_songs") {
        closeEditModal()
        return
      }
      setPlaylist(p)
    })
  }, [editingPlaylistId, closeEditModal])

  if (!editingPlaylistId || !playlist) return null

  const handleSave = async (data: { name: string; description: string; isPublic?: boolean }, coverFile?: File | null) => {
    await updatePlaylistAttributes(editingPlaylistId, data)
    if (coverFile) {
      await uploadPlaylistCover(editingPlaylistId, coverFile)
    }
    triggerRefresh()
  }

  return (
    <EditPlaylistModal
      isOpen
      onClose={closeEditModal}
      playlist={{ name: playlist.name, description: playlist.description, isPublic: playlist.isPublic, coverUrl: playlist.coverUrl ?? undefined }}
      onSave={handleSave}
    />
  )
}
