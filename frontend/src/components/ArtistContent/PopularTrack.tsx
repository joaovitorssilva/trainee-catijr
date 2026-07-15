import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArtistPopularMusics } from "@/services/api";
import type { MusicDTO } from "@/services/types";
import PopularTrackRow from "./PopularTrackRow";

export default function PopularTracks() {
  const { artistId } = useParams<{ artistId: string }>()
  const [tracks, setTracks] = useState<MusicDTO[]>([])

  useEffect(() => {
    if (!artistId) return
    getArtistPopularMusics(artistId)
      .then(setTracks)
  }, [artistId])

  return (
    <section className="flex flex-col gap-2.5">
      <h2 className="text-white text-16-bold">
        Populares
      </h2>

      <div className="flex flex-col gap-2.5">
        {tracks.map((track, i) => (
          <PopularTrackRow
            key={track.id}
            trackId={track.id}
            title={track.title}
            timesListen={track.timesListen}
            duration={track.duration}
            isExplit={track.explicit}
            liked={track.liked}
            index={i + 1}
          />

        ))}
      </div>

      <span className="text-10-medium text-subdued font-bold cursor-pointer">
        Mostrar tudo
      </span>
    </section>
  )
}