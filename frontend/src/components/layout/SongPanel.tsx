import { usePlayer } from "@/context/PlayerContext";
import { mockCredits } from "@/utils/credits.mock";
import SongPanelHeader from "../SongPanel/PanelHeader";
import SongPanelTrackInfo from "../SongPanel/PanelTrackInfo";
import SongPanelArtistCard from "../SongPanel/PanelArtistCard";
import PanelNextSong from "../SongPanel/PanelNextSong";
import SongPanelTourCard from "../SongPanel/PanelTourCard";
import SongPanelCreditsCard from "../SongPanel/PanelCreditsCard";

export default function SongPanel() {
  const { currentTrack } = usePlayer()

  if (!currentTrack) return null

  return (
    <aside className="hidden lg:flex flex-col gap-6 lg:w-60 xl:w-78.75 py-4 px-3 rounded-lg bg-bg-base overflow-y-auto overflow-x-hidden h-full min-h-0">
      <SongPanelHeader music={currentTrack} />
      <SongPanelTrackInfo />
      <SongPanelArtistCard />
      <SongPanelCreditsCard credits={mockCredits} />
      <SongPanelTourCard />
      <PanelNextSong />
    </aside>
  )
}