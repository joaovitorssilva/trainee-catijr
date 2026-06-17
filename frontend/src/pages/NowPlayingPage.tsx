import { PlayerProvider } from "@/context/PlayerContext";
import Topbar from "@/components/layout/Topbar";
import TrackCover from "@/assets/track-cover.png"

export default function NowPlayingPage() {

  return (
    <PlayerProvider>
      <div className="h-screen flex flex-col relative bg-linear-to-b from-[#8F0313] to-[#3D0007] overflow-hidden">
        <div className="absolute inset-0">
          <div className="md:hidden">
            <Topbar />
          </div>
          <div className="flex items-center justify-center">
            <img
              src={TrackCover}
              alt="Track Cover Image"
              className="w-[260px] h-[260px] md:w-[629px] md:h-[629px] rounded-2xl"
            />
          </div>
        </div>
      </div>
    </PlayerProvider>
  )
}