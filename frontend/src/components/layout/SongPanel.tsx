import { usePlayer } from "@/context/PlayerContext";
import SongPanelHeader from "../SongPanel/PanelHeader";
import SongPanelTrackInfo from "../SongPanel/PanelTrackInfo";
import SongPanelArtistCard from "../SongPanel/PanelArtistCard";
import PanelNextSong from "../SongPanel/PanelNextSong";

export default function SongPanel() {
  const { currentTrack } = usePlayer()

  if (!currentTrack) return null

  return (
    <aside className="hidden xl:flex flex-col gap-6 w-78.75 py-4 px-3 rounded-lg bg-bg-base overflow-y-auto overflow-x-hidden h-full min-h-0">
      <SongPanelHeader music={currentTrack} />
      <SongPanelTrackInfo/>
      <SongPanelArtistCard/>
      <PanelNextSong/>
     
    </aside>
  )
}