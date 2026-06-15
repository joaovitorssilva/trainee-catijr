import { useState } from "react"
import AlbumSection from "@/components/MainContent/AlbumSection/AlbumSection";
import ArtistSection from "@/components/MainContent/ArtistSection/ArtistSection";
import PlaylistSection from "@/components/MainContent/PlaylistSection/PlaylistSection";
import RecentlyPlayed from "@/components/MainContent/RecentlyPlayedSection/RecentlyPlayed";
import Button from "@/components/ui/Button";

type Filter = "Tudo" | "Música" | "Playlists"

const FILTERS: Filter[] = ["Tudo", "Música", "Playlists"]

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Tudo")

  return (
    <main className="flex flex-col bg-home-bg-gradient-variant rounded-lg px-1 py-2 md:px-5 md:py-6 overflow-hidden">
      <nav className="hidden md:flex gap-2 shrink-0">
        {FILTERS.map((filter) => (
          <Button
            key={filter}
            variant="primary"
            size="md"
            isActive={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </nav>

      <div className="flex flex-1 flex-col overflow-y-auto gap-8 pt-3">
        <RecentlyPlayed activeFilter={activeFilter} />
        <PlaylistSection activeFilter={activeFilter} />
        <ArtistSection activeFilter={activeFilter} />
        <AlbumSection activeFilter={activeFilter} />
      </div>
    </main>
  )
}