import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArtistPopularMusics } from "@/api";
import { usePlayer } from "@/context/PlayerContext";
import type { MusicDTO } from "@/types/index.types";
import PopularTrackRow from "./PopularTrackRow";

export default function PopularTracks() {
  const { artistId } = useParams<{ artistId: string }>()
  const [tracks, setTracks] = useState<MusicDTO[]>([])
  const { play, pause, currentTrack, isPlaying } = usePlayer()

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
            albumId={track.albumId}
            artistId={track.artistId ?? undefined}
            coverUrl={track.coverUrl ?? undefined}
            index={i + 1}
            isActive={currentTrack?.id === track.id}
            onClick={() => {
              if (currentTrack?.id === track.id && isPlaying) {
                pause()
                return
              }
              play(track, tracks)
            }}
          />

        ))}
      </div>

      <span className="text-10-medium text-subdued font-bold cursor-pointer">
        Mostrar tudo
      </span>
    </section>
  )
}