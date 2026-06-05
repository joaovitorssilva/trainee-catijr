import AlbumSection from "@/components/MainContent/AlbumSection/AlbumSection";
import ArtistSection from "@/components/MainContent/ArtistSection/ArtistSection";
import PlaylistSection from "@/components/MainContent/PlaylistSection/PlaylistSection";
import RecentlyPlayed from "@/components/MainContent/RecentlyPlayedSection/RecentlyPlayed";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main className="flex flex-col bg-home-bg-gradient-variant rounded-lg overflow-hidden p-6">
      <nav className="flex gap-2  shrink-0">
        <Button variant="primary" size="md" isActive={true}>Home</Button>
        <Button variant="primary" size="md">Music</Button>
        <Button variant="primary" size="md">Playlist</Button>
      </nav>

      <div className="flex-1 overflow-y-auto scrollbar-thin  scrollbar-hide pt-3 flex flex-col gap-8">
        <RecentlyPlayed />
        <PlaylistSection />
        <ArtistSection />
        <AlbumSection />
      </div>
    </main>
  )
}