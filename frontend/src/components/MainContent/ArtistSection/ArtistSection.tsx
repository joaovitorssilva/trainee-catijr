import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecentArtists } from "@/services/api";
import type { ArtistDTO } from "@/services/types";
import ArtistCard from "./ArtistCard";

export default function ArtistSection() {
  const navigate = useNavigate()
  const [artists, setArtists] = useState<ArtistDTO[]>([])

  useEffect(() => {
    getRecentArtists()
      .then(setArtists)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <span className="text-base font-bold text-white">
        Artistas Recentes
      </span>
      <section className="flex gap-3">
        {artists.map((a) => (
          <ArtistCard
            key={a.id}
            id={a.id}
            name={a.name}
            onClick={() => navigate(`/artist/${a.id}`)}
          />
        ))}

      </section>
    </div>
  )
}