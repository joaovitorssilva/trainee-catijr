import { useEffect, useState } from "react";
import type { MusicDTO } from "@/services/types";
import { getMostPlayedMusics } from "@/services/api";
import PopularTrackRow from "../ArtistContent/PopularTrackRow";

export default function TopTracks() {
  const [tracks, setTracks] = useState<MusicDTO[]>([])

  useEffect(() => {
    getMostPlayedMusics().then(setTracks)
  }, [])

  return (
    <div className="flex flex-col gap-1 md:gap-2.5">
      <div className="flex flex-col gap-1">
        <span className="text-white text-12-bold md:text-16-bold ">
          Músicas mais tocadas este mês
        </span>
        <span className="text-subdued text-10-medium">
          Visíveis apenas para você
        </span>
      </div>
      <section>
        {tracks.map((track, index) => (
          <PopularTrackRow
            key={track.id}
            title={track.title}
            timesListen={track.timesListen}
            duration={track.duration}
            isExplit={track.explicit}
            index={index + 1}
          />
        ))}
      </section>
    </div>
  )
}