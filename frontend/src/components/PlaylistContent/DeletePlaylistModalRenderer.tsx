import { useNavigate } from "react-router-dom"
import { useMenuContext } from "@/context/useMenuContext"
import { deletePlaylist, getPlaylistById } from "@/api"
import { useEffect, useState } from "react"
import DeletePlaylistModal from "./DeletePlaylistModal"

export default function DeletePlaylistModalRenderer() {
  const navigate = useNavigate()
  const { deletingPlaylistId, closeDeleteModal, triggerRefresh } = useMenuContext()
  const [playlistName, setPlaylistName] = useState("")

  useEffect(() => {
    if (!deletingPlaylistId) return
    getPlaylistById(deletingPlaylistId).then(p => {
      if (p.type === "liked_songs") {
        closeDeleteModal()
        return
      }
      setPlaylistName(p.name)
    })
  }, [deletingPlaylistId, closeDeleteModal])

  const handleConfirm = async () => {
    await deletePlaylist(deletingPlaylistId!)
    triggerRefresh()
    navigate("/")
    closeDeleteModal()
  }

  if (!deletingPlaylistId) return null

  return (
    <DeletePlaylistModal
      isOpen
      onClose={closeDeleteModal}
      onConfirm={handleConfirm}
      playlistName={playlistName}
    />
  )
}
