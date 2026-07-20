import { useEffect, useState, useCallback } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { type SearchResult, type SearchFilterTab } from "@/types/index.types"
import { searchApi } from "@/api"
import { useRecentSearches } from "../hooks/useRecentSearches"
import SearchSkeleton from "../components/Search/SearchSkeleton/SearchSkeleton"
import SearchResultRow from "../components/Search/SearchResultRow"
import SearchFilterTabs from "../components/Search/SearchFilterTabs"

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") ?? ""
  const navigate = useNavigate()
  const { add: addRecent } = useRecentSearches()

  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<SearchFilterTab>("tudo")

  useEffect(() => {
    if (!query) return

    const controller = new AbortController()

    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const data = await searchApi(query, controller.signal)
        setResults(data)
      } catch (err) {
        if ((err as Error).name !== "AbortError") setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
    return () => controller.abort()
  }, [query])

  const filtered = results.filter(r => {
    if (activeTab === "tudo") return true
    if (activeTab === "musicas") return r.type === "track"
    if (activeTab === "albuns") return r.type === "album"
    if (activeTab === "artistas") return r.type === "artist"
    if (activeTab === "playlists") return r.type === "playlist"
    return true
  })

  const handleSelect = useCallback((result: SearchResult) => {
    addRecent({
      id: result.id,
      name: result.name,
      type: result.type,
      subtitle: result.subtitle,
    })
    switch (result.type) {
      case "artist": navigate(`/artist/${result.id}`); break
      case "track": navigate(`/album/${result.albumId ?? result.id}`); break
      case "album": navigate(`/album/${result.id}`); break
      case "playlist": navigate(`/playlist/${result.id}`); break
    }
  }, [addRecent, navigate])

  return (
    <div className="flex flex-col gap-4 p-4">

      <SearchFilterTabs
        active={activeTab}
        onChange={setActiveTab}
      />

      {isLoading && <SearchSkeleton rows={8} />}

      {!isLoading && filtered.length === 0 && (
        <p className="text-subdued text-12-bold px-2">
          Nenhum resultado para "{query}"
        </p>
      )}

      {!isLoading && filtered.length > 0 && (
        <div className="flex flex-col">
          {filtered.map(result => (
            <SearchResultRow
              key={result.id}
              result={result}
              onClick={() => handleSelect(result)}
            />
          ))}
        </div>
      )}

    </div>
  )
}
