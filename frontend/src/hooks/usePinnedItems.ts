import { useCallback, useEffect, useState } from "react"

export type PinnedItemType = "playlist" | "artist" | "album"

const STORAGE_KEYS: Record<PinnedItemType, string> = {
  playlist: "pinnedPlaylists",
  artist: "pinnedArtists",
  album: "pinnedAlbums",
}

const EVENT_NAME = "pinned-items-changed"

function readStorage(key: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]")
  } catch {
    return []
  }
}

export function usePinnedItems(type: PinnedItemType) {
  const storageKey = STORAGE_KEYS[type]
  const [pinnedIds, setPinnedIds] = useState<string[]>(() => readStorage(storageKey))

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as PinnedItemType | undefined
      if (detail === type) {
        setPinnedIds(readStorage(storageKey))
      }
    }
    window.addEventListener(EVENT_NAME, handler)
    return () => window.removeEventListener(EVENT_NAME, handler)
  }, [storageKey, type])

  const togglePin = useCallback((id: string) => {
    setPinnedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
      localStorage.setItem(storageKey, JSON.stringify(next))
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: type }))
      return next
    })
  }, [storageKey, type])

  const isPinned = useCallback(
    (id: string) => pinnedIds.includes(id),
    [pinnedIds]
  )

  return { pinnedIds, togglePin, isPinned }
}
