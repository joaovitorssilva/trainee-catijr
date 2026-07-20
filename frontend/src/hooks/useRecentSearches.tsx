import { createContext, useContext, useState, type ReactNode } from "react"
import { type RecentSearch } from "../types/index.types"

const KEY = "recent_searches"
const MAX = 10

function load(): RecentSearch[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(items: RecentSearch[]) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

interface RecentSearchesContextValue {
  items: RecentSearch[]
  add: (item: RecentSearch) => void
  remove: (id: string) => void
}

const RecentSearchesContext = createContext<RecentSearchesContextValue | null>(null)

export function RecentSearchesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RecentSearch[]>(load)

  const add = (item: RecentSearch) => {
    setItems(prev => {
      const next = [item, ...prev.filter(r => r.id !== item.id)].slice(0, MAX)
      save(next)
      return next
    })
  }

  const remove = (id: string) => {
    setItems(prev => {
      const next = prev.filter(r => r.id !== id)
      save(next)
      return next
    })
  }

  return (
    <RecentSearchesContext.Provider value={{ items, add, remove }}>
      {children}
    </RecentSearchesContext.Provider>
  )
}

export function useRecentSearches() {
  const ctx = useContext(RecentSearchesContext)
  if (!ctx) throw new Error("useRecentSearches must be used within RecentSearchesProvider")
  return ctx
}
