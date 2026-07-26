import { RecentSearchesProvider } from "@/hooks/useRecentSearches";
import { usePlayer } from "@/context/PlayerContext";
import { coverUrl } from "@/utils/coverUrl";
import { useDominantColor } from "@/hooks/useDominantColor";
import Topbar from "@/components/layout/Topbar";
import TrackCover from "@/assets/track-cover.png"
import PlayerBar from "@/components/layout/PlayerBar";

export default function NowPlayingPage() {
  const { currentTrack } = usePlayer();
  const gradient = useDominantColor(coverUrl(currentTrack?.coverUrl));

  return (
    <RecentSearchesProvider>
      <div
        className="h-screen flex flex-col justify-between overflow-hidden transition-[background] duration-700 ease-in-out"
        style={{ background: `linear-gradient(to bottom, ${gradient.top}, ${gradient.bottom})` }}
      >
          <div className="md:hidden">
            <Topbar />
          </div>
          <div className="flex-1 items-center justify-center flex">
            <img
              src={coverUrl(currentTrack?.coverUrl) ?? TrackCover}
              alt="Track Cover Image"
              className="w-65 h-65 rounded-2xl"
            />
          </div>
          <PlayerBar/>
      </div>
    </RecentSearchesProvider>
  )
}