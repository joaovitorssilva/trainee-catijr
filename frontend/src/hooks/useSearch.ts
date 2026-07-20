import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useRecentSearches } from "./useRecentSearches"

export function useSearch() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<"closed" | "recent">("closed")
  const navigate = useNavigate()
  const { items: recentSearches, remove: removeRecent } = useRecentSearches()

  const handleFocus = useCallback(() => {
    if (!query) setStatus("recent")
  }, [query])

  const handleBlur = useCallback(() => {
    setTimeout(() => setStatus("closed"), 100)
  }, [])

  const handleChange = useCallback((value: string) => {
    setQuery(value)
    setStatus(value ? "closed" : "recent")
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || !query) return
    setStatus("closed")
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }, [query, navigate])

  const clearQuery = useCallback(() => {
    setQuery("")
    setStatus("recent")
  }, [])

  const handleSelectRecent = useCallback((name: string) => {
    setQuery(name)
    setStatus("closed")
    navigate(`/search?q=${encodeURIComponent(name)}`)
  }, [navigate])

  return {
    query,
    status,
    recentSearches,
    handleFocus,
    handleBlur,
    handleChange,
    handleKeyDown,
    handleSelectRecent,
    removeRecent,
    clearQuery,
  }
}
