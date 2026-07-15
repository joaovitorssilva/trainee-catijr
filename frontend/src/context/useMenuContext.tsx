import { createContext, useCallback, useContext, useState, type ReactNode } from "react"

type MenuContextType = "track" | "artist" | "playlist" | "album"

interface MenuContextState {
  type: MenuContextType
  x: number
  y: number
  id: string
  artistId?: string
  albumId?: string
  liked?: boolean
  playlistId?: string
  playlistType?: string
  isPublic?: boolean
  callbacks?: MenuContextCallbacks
}

interface MenuContextValue {
  menu: MenuContextState | null
  openMenu: (e: React.MouseEvent, type: MenuContextType, id: string, artistId?: string, albumId?: string, liked?: boolean, playlistId?: string, playlistType?: string, isPublic?: boolean) => void
  closeMenu: () => void
  editingPlaylistId: string | null
  openEditModal: (id: string) => void
  closeEditModal: () => void
  deletingPlaylistId: string | null
  openDeleteModal: (id: string) => void
  closeDeleteModal: () => void
  refreshKey: number
  triggerRefresh: () => void
}

interface MenuContextCallbacks {
  onEditDetails?: () => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<MenuContextState | null>(null)
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null)
  const [deletingPlaylistId, setDeletingPlaylistId] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const openMenu = useCallback((
    e: React.MouseEvent,
    type: MenuContextType,
    id: string,
    artistId?: string,
    albumId?: string,
    liked?: boolean,
    playlistId?: string,
    playlistType?: string,
    isPublic?: boolean,
    callbacks?: MenuContextCallbacks
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setMenu({ type, x: e.clientX, y: e.clientY, id, artistId, albumId, liked, playlistId, playlistType, isPublic, callbacks })
  }, [])

  const closeMenu = useCallback(() => setMenu(null), [])

  const openEditModal = useCallback((id: string) => {
    setEditingPlaylistId(id)
  }, [])

  const closeEditModal = useCallback(() => {
    setEditingPlaylistId(null)
  }, [])

  const openDeleteModal = useCallback((id: string) => {
    setDeletingPlaylistId(id)
  }, [])

  const closeDeleteModal = useCallback(() => {
    setDeletingPlaylistId(null)
  }, [])

  const triggerRefresh = useCallback(() => {
    setRefreshKey(k => k + 1)
  }, [])

  return (
    <MenuContext.Provider value={{ menu, openMenu, closeMenu, editingPlaylistId, openEditModal, closeEditModal, deletingPlaylistId, openDeleteModal, closeDeleteModal, refreshKey, triggerRefresh }}>
      {children}
    </MenuContext.Provider>
  )
}

export function useMenuContext() {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider")
  }
  return context
}
