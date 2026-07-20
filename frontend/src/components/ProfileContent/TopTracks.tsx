import { useEffect, useState } from "react";
import TrackTableRow from "../PlaylistContent/TrackTableRow";
import type { MusicDTO } from "@/types/index.types";
import { getMostPlayedMusics } from "@/api";

export default function TopTracks() {
  const [mostPlayedMusics, setMostPlayedMusics] = useState<MusicDTO[]>([])

  useEffect(() => {
    getMostPlayedMusics().then(setMostPlayedMusics)
  }, [])

  return (
    <div className="flex flex-col gap-1 md:gap-2.5">
      <div className="flex flex-col gap-1">
        <span className="text-white ">
          Músicas mais tocadas este mês
        </span>
        <span className="text-subdued text-10-medium">
          Visíveis apenas para você
        </span>
      </div>
      <section>
        {mostPlayedMusics.map((m, index) => (
          <TrackTableRow
            key={m.id}
            music={m}
            index={index}
            musics={mostPlayedMusics}
          />
        ))}
      </section>
    </div>
  )
}