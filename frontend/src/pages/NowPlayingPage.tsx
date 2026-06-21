import { PlayerProvider } from "@/context/PlayerContext";
import Topbar from "@/components/layout/Topbar";
import TrackCover from "@/assets/track-cover.png"
import PlayerBar from "@/components/layout/PlayerBar";

export default function NowPlayingPage() {

  return (
    <PlayerProvider>
      <div className="h-screen flex flex-col justify-between bg-linear-to-b from-[#8F0313] to-[#3D0007] overflow-hidden">
          <div className="md:hidden">
            <Topbar />
          </div>
          <div className="flex items-center justify-center">
            <img
              src={TrackCover}
              alt="Track Cover Image"
              className="w-[260px] h-[260px] rounded-2xl"
            />
          </div>
          <PlayerBar/>
      </div>
    </PlayerProvider>
  )
}