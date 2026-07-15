import { useCallback, useEffect, useState } from "react"

type EntityType = "playlist" | "artist" | "album"

const STORAGE_KEYS: Record<EntityType, string> = {
  playlist: "lastAccessed_playlists",
  artist: "lastAccessed_artists",
  album: "lastAccessed_albums",
}

const EVENT_NAME = "last-accessed-changed"

type LastAccessedMap = Record<string, number>

function readStorage(key: string): LastAccessedMap {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "{}")
  } catch {
    return {}
  }
}

export function useLastAccessed(type: EntityType) {
  const storageKey = STORAGE_KEYS[type]
  const [map, setMap] = useState<LastAccessedMap>(() => readStorage(storageKey))

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as EntityType | undefined
      if (detail === type) {
        setMap(readStorage(storageKey))
      }
    }
    window.addEventListener(EVENT_NAME, handler)
    return () => window.removeEventListener(EVENT_NAME, handler)
  }, [storageKey, type])

  const recordAccess = useCallback((id: string) => {
    setMap((prev) => {
      const next = { ...prev, [id]: Date.now() }
      localStorage.setItem(storageKey, JSON.stringify(next))
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: type }))
      return next
    })
  }, [storageKey, type])

  const getLastAccessed = useCallback(
    (id: string) => map[id] ?? 0,
    [map]
  )

  return { recordAccess, getLastAccessed }
}
