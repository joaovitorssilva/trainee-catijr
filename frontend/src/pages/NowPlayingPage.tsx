import { RecentSearchesProvider } from "@/hooks/useRecentSearches";
import Topbar from "@/components/layout/Topbar";
import TrackCover from "@/assets/track-cover.png"
import PlayerBar from "@/components/layout/PlayerBar";

export default function NowPlayingPage() {

  return (
    <RecentSearchesProvider>
      <div className="h-screen flex flex-col justify-between bg-linear-to-b from-[#8F0313] to-[#3D0007] overflow-hidden">
          <div className="md:hidden">
            <Topbar />
          </div>
          <div className="flex-1 items-center justify-center flex">
            <img
              src={TrackCover}
              alt="Track Cover Image"
              className="w-65 h-65 rounded-2xl"
            />
          </div>
          <PlayerBar/>
      </div>
    </RecentSearchesProvider>
  )
}