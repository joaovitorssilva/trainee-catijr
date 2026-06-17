import { useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import TrackInfo from "../player/TrackInfo";
import VolumeControl from "../player/VolumeControl";
import PlayerControls from "../player/PlayerControls";

export default function PlayerBar() {
  const { currentTrack, isPlaying, progress, togglePlay, next, previous, seek } = usePlayer();
  const [volume, setVolume] = useState(80)

  return (
    <footer className="h-16 shrink-0 bg-bg px-4 flex items-center justify-between md:grid md:grid-cols-3 ">
      <TrackInfo />
      <PlayerControls
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        progress={progress}
        togglePlay={togglePlay}
        next={next}
        previous={previous}
        seek={seek}
      />
      <div className="hidden md:flex items-center justify-end">
        <VolumeControl
          volume={volume}
          onChange={setVolume}
        />
      </div>

    </footer>
  );
}
