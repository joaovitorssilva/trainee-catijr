import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getUserPlaylists, getRecentArtists, getRecentAlbums } from "../../services/api"
import type { PlaylistNoMusicDTO } from "../../services/types"
import type { ArtistDTO } from "../../services/types"
import type { AlbumNoMusicsDTO } from "../../services/types"
import { LibraryItem } from "../sidebar/LibraryItem";
import { NavMenu } from "../sidebar/NavMenu";

interface LibraryFilter {
  id: string
  name: string
  type: "playlist" | "artist" | "album"
  subtitle?: string
  link: string
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeFilter, setActiveFilter] = useState("Tudo")
  const [playlists, setPlaylists] = useState<PlaylistNoMusicDTO[]>([])
  const [artists, setArtists] = useState<ArtistDTO[]>([])
  const [albums, setAlbums] = useState<AlbumNoMusicsDTO[]>([])

  useEffect(() => {
    getUserPlaylists().then(setPlaylists)
    getRecentArtists().then(setArtists)
    getRecentAlbums().then(setAlbums)
  }, [])

  const allEntries: LibraryFilter[] = [
    ...playlists.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      type: "playlist" as const,
      subtitle: `Playlist • ${playlist.musicQtd} músicas`,
      link: `/playlist/${playlist.id}`,
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

  const filteredEntries = activeFilter === "Tudo"
    ? allEntries
    : allEntries.filter((entry) => {
      if (activeFilter === "Playlists") return entry.type === "playlist"
      if (activeFilter === "Artistas") return entry.type === "artist"
      if (activeFilter === "Albuns") return entry.type === "album"
      return true
    })

  const currentPath = location.pathname

  return (
    <aside className="flex flex-col gap-3 min-h-0 w-16 md:w-72 bg-bg-base playlist-4 shrink-0 rounded-lg">
      <div className="hidden md:flex md:flex-col">
        <NavMenu activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      <div className="flex flex-col gap-2 md:gap-4 p-1.5 md:p-3 overflow-y-auto flex-1 min-h-0">
        {filteredEntries.map((filter) => (
          <LibraryItem
            key={`${filter.type}-${filter.id}`}
            id={filter.id}
            name={filter.name}
            type={filter.type}
            subtitle={filter.subtitle}
            isActive={currentPath === filter.link}
            onClick={() => navigate(filter.link)}
          />
        ))}
      </div>
    </aside>
  )
}

