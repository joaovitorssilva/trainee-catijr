import { usePlayer } from "../../context/PlayerContext";
import TrackCover from "../../assets/track-cover1.png";

export default function TrackInfo() {
  const { currentTrack } = usePlayer();

  if (!currentTrack) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-sm bg-bg-highlight" />
        <div className="flex flex-col">
          <span className="text-subdued text-10-bold ">Nenhuma música</span>
          <span className="text-subdued text-10-bold">---</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <img
        src={TrackCover}
        alt="Track Cover Image"
        className="w-8 h-8 rounded-xs"
      />
      <div className="flex flex-col gap-1">
        <span className=" text-white text-10-bold">{currentTrack.title}</span>
        <span className="text-subdued text-10-bold">Nome do artista</span>
      </div>
    </div>
  );
}
