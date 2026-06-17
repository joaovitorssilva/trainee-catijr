import type { MusicDTO } from "../../services/types";
import { formatDuration } from "../../utils/FormatDuration";
import ProgressBar from "./ProgressBar";
import PlayIcon from "@/assets/icons/play-icon.svg";
import PauseIcon from "@/assets/icons/pause-icon.svg";
import SkipPrevIcon from "@/assets/icons/skip-prev-icon.svg";
import SkipNextIcon from "@/assets/icons/skip-next-icon.svg";

interface PlayerControlsProps {
  currentTrack: MusicDTO | null;
  isPlaying: boolean;
  progress: number;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (progress: number) => void;
}

export default function PlayerControls({
  currentTrack,
  isPlaying,
  progress,
  togglePlay,
  next,
  previous,
  seek,
}: PlayerControlsProps) {
  const currentTime = currentTrack
    ? formatDuration(Math.floor(currentTrack.duration * progress))
    : "00:00";
  const totalTime = currentTrack
    ? formatDuration(currentTrack.duration)
    : "00:00";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2.5">
        <button className="hidden md:block cursor-pointer" onClick={previous}>
          <img
            src={SkipPrevIcon}
            alt="Previous track"
          />
        </button>
        <button
          onClick={togglePlay}
          className="bg-white w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition ease-out duration-300"
        >
          <img
            className="brightness-0 w-3 h-3"
            src={currentTrack && isPlaying ? PauseIcon : PlayIcon}
            alt={isPlaying ? "Pause" : "Play"}
          />
        </button>
        <button
          onClick={next}
          className="cursor-pointer"
        >
          <img
            src={SkipNextIcon}
            alt="Next track"
          />
        </button>
      </div>

      <div className="hidden md:flex items-center gap-1.5 w-full max-w-[454px]">
        <span className=" text-subdued text-10-medium ">{currentTime}</span>
        <ProgressBar progress={progress} onChange={seek} />
        <span className=" text-subdued text-10-medium">{totalTime}</span>
      </div>
    </div>
  );
}
