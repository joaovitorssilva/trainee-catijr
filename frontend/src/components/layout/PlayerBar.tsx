// import { useState } from "react"
import PlayIcon from "../../assets/icons/play-icon.png";
import SkipPrevIcon from "../../assets/icons/skip-prev-icon.svg";
import SkipNextIcon from "../../assets/icons/skip-next-icon.svg";
import TrackInfo from "../player/TrackInfo";
import { Volume1 } from "lucide-react";
// import ProgressBar from "../player/ProgressBar";
import Button from "../ui/Button";

export default function PlayerBar() {
  // const [progress, setProgress] = useState(0.35)
  const VolumeIcon = Volume1;

  return (
    <footer className="h-16 shrink-0 bg-bg  px-4 grid grid-cols-3 items-center gap-4 z-50 select-none">
      <TrackInfo />

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Button variant="icon" size="sm" >
            <img src={SkipPrevIcon} alt="Previous track" />
          </Button>
          <Button variant="icon" size="sm">
            <img src={PlayIcon} alt="Play track" />
          </Button>
          <Button variant="icon" size="sm">
            <img src={SkipNextIcon} alt="Next track" />
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full max-w-[480px]">
          <span className="text-[10px] text-subdued w-8">
            {"00:00"}
          </span>
          {/* <ProgressBar progress={progress} onChange={setProgress} /> */}
          <span className="text-[10px] text-subdued">
            {"3:00"}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button variant="icon" size="sm">
          <VolumeIcon />
        </Button>
      </div>
    </footer>
  );
}