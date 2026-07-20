import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { createPlaylist, getUserPlaylists, getRecentArtists, getRecentAlbums } from "@/api"
import { useMenuContext } from "@/context/useMenuContext";
import { usePinnedItems } from "@/hooks/usePinnedItems";
import { useLastAccessed } from "@/hooks/useLastAccessed";
import { NavMenu } from "../sidebar/NavMenu";
import { LibraryItem } from "../sidebar/LibraryItem";
import type { ArtistDTO } from "@/types/index.types"
import type { PlaylistNoMusicDTO } from "@/types/index.types"
import type { AlbumNoMusicsDTO } from "@/types/index.types"

interface LibraryFilter {
  id: string
  name: string
  type: "playlist" | "artist" | "album"
  subtitle?: string
  link: string
  playlistType?: string
  isPublic?: boolean
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeFilter, setActiveFilter] = useState("Tudo")
  const [searchQuery, setSearchQuery] = useState("")
  const [playlists, setPlaylists] = useState<PlaylistNoMusicDTO[]>([])
  const [artists, setArtists] = useState<ArtistDTO[]>([])
  const [albums, setAlbums] = useState<AlbumNoMusicsDTO[]>([])
  const { refreshKey } = useMenuContext()
  const { pinnedIds: pinnedPlaylists } = usePinnedItems("playlist")
  const { pinnedIds: pinnedArtists } = usePinnedItems("artist")
  const { pinnedIds: pinnedAlbums } = usePinnedItems("album")
  const { recordAccess: accessPlaylist, getLastAccessed: getPlaylistAccessed } = useLastAccessed("playlist")
  const { recordAccess: accessArtist, getLastAccessed: getArtistAccessed } = useLastAccessed("artist")
  const { recordAccess: accessAlbum, getLastAccessed: getAlbumAccessed } = useLastAccessed("album")

  useEffect(() => {
    getUserPlaylists().then(setPlaylists)
    getRecentArtists().then(setArtists)
    getRecentAlbums().then(setAlbums)
  }, [refreshKey])

  const allEntries: LibraryFilter[] = [
    ...playlists.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      type: "playlist" as const,
      subtitle: `Playlist • ${playlist.musicQtd} músicas`,
      link: `/playlist/${playlist.id}`,
      playlistType: playlist.type,
      isPublic: playlist.isPublic,
    })),
    ...artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      type: "artist" as const,
      link: `/artist/${artist.id}`,
    })),
    ...albums.map((album) => ({
      id: album.id,
      name: album.title,
      type: "album" as const,
      subtitle: album.artistName,
      link: `/album/${album.id}`,
    })),
  ]

  const query = searchQuery.toLowerCase().trim()

  const searchedEntries = query
    ? allEntries.filter((entry) => entry.name.toLowerCase().includes(query))
    : allEntries

  const filteredEntries = activeFilter === "Tudo"
    ? searchedEntries
    : searchedEntries.filter((entry) => {
      if (activeFilter === "Playlists") return entry.type === "playlist"
      if (activeFilter === "Artistas") return entry.type === "artist"
      if (activeFilter === "Albuns") return entry.type === "album"
      return true
    })

  const getPinnedIndex = (entry: LibraryFilter): number => {
    switch (entry.type) {
      case "playlist": return pinnedPlaylists.indexOf(entry.id)
      case "artist": return pinnedArtists.indexOf(entry.id)
      case "album": return pinnedAlbums.indexOf(entry.id)
    }
  }

  const isEntryPinned = (entry: LibraryFilter): boolean => getPinnedIndex(entry) !== -1

  const getLastAccessed = (entry: LibraryFilter): number => {
    switch (entry.type) {
      case "playlist": return getPlaylistAccessed(entry.id)
      case "artist": return getArtistAccessed(entry.id)
      case "album": return getAlbumAccessed(entry.id)
    }
  }

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    const aPinned = isEntryPinned(a)
    const bPinned = isEntryPinned(b)
    if (aPinned && !bPinned) return -1
    if (!aPinned && bPinned) return 1
    if (aPinned && bPinned) {
      return getPinnedIndex(a) - getPinnedIndex(b)
    }
    return getLastAccessed(b) - getLastAccessed(a)
  })

  const handleCreatePlaylist = async () => {
    try {
      const newPlaylist = await createPlaylist({
        name: `Minha Playlist #${playlists.length + 1}`,
        description: ""
      })
      setPlaylists((prev) => [...prev, newPlaylist])
      navigate(`/playlist/${newPlaylist.id}`)
    } catch {
      console.error("Falha ao criar playlist")
    }
  }

  const currentPath = location.pathname

  return (
    <aside className="flex flex-col gap-3 min-h-0 w-16 md:w-72 bg-bg-base playlist-4 shrink-0 rounded-lg">
      <div className="hidden md:flex md:flex-col">
        <NavMenu
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onCreatePlaylist={handleCreatePlaylist}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className="flex flex-col gap-2 md:gap-4 p-1.5 md:p-3 overflow-y-auto flex-1 min-h-0">
        {sortedEntries.map((filter) => (
          <LibraryItem
            key={`${filter.type}-${filter.id}`}
            id={filter.id}
            name={filter.name}
            type={filter.type}
            subtitle={filter.subtitle}
            isActive={currentPath === filter.link}
            onClick={() => {
              switch (filter.type) {
                case "playlist": accessPlaylist(filter.id); break
                case "artist": accessArtist(filter.id); break
                case "album": accessAlbum(filter.id); break
              }
              navigate(filter.link)
            }}
            playlistType={filter.playlistType}
            isPublic={filter.isPublic}
            isPinned={isEntryPinned(filter)}
          />
        ))}
      </div>
    </aside>
  )
}

