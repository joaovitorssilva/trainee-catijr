import { createContext, useCallback, useContext, useState, type ReactNode } from "react"

type MenuContextType = "track" | "artist" | "playlist" | "album"

interface MenuContextState {
  type: MenuContextType
  x: number
  y: number
  id: string
}

interface MenuContextValue {
  menu: MenuContextState | null
  openMenu: (e: React.MouseEvent, type: MenuContextType, id: string) => void
  closeMenu: () => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<MenuContextState | null>(null)

  const openMenu = useCallback((
    e: React.MouseEvent,
    type: MenuContextType,
    id: string
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setMenu({ type, x: e.clientX, y: e.clientY, id })
  }, [])

  const closeMenu = useCallback(() => setMenu(null), [])

  return (
    <MenuContext.Provider value={{ menu, openMenu, closeMenu }}>
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
