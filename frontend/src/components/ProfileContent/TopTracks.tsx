import { useEffect, useState } from "react";
import { getMostPlayedMusics } from "@/api";
import type { MusicDTO } from "@/types/index.types";
import PopularTrackRow from "../ArtistContent/PopularTrackRow";

export default function TopTracks() {
  const [mostPlayedMusics, setMostPlayedMusics] = useState<MusicDTO[]>([])

  useEffect(() => {
    getMostPlayedMusics().then(setMostPlayedMusics)
  }, [])

  return (
    <div className="flex flex-col gap-1 md:gap-2.5">
      <div className="flex flex-col gap-1">
        <span className="text-white text-12-bold md:text-16-bold">
          Músicas mais tocadas este mês
        </span>
        <span className="text-subdued text-10-medium">
          Visíveis apenas para você
        </span>
      </div>
      <section>
        {mostPlayedMusics.map((m, index) => (
          <PopularTrackRow
            key={m.id}
            trackId={m.id}
            title={m.title}
            timesListen={m.timesListen}
            duration={m.duration}
            index={index + 1}
            isExplit={m.explicit}
            liked={m.liked}
            albumId={m.albumId}
            artistId={m.artistId ?? undefined}
          />
        ))}
      </section>
    </div>
  )
}