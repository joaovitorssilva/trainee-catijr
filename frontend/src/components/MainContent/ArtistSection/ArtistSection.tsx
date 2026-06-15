import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecentArtists } from "@/services/api";
import type { ArtistDTO } from "@/services/types";
import ArtistCard from "./ArtistCard";

interface ArtistSectionProps {
  activeFilter: string
}

export default function ArtistSection({ activeFilter }: ArtistSectionProps) {
  const navigate = useNavigate()
  const [artists, setArtists] = useState<ArtistDTO[]>([])

  useEffect(() => {
    getRecentArtists()
      .then(setArtists)
  }, [])

  if (activeFilter !== "Tudo") return null

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <span className="text-white text-16-bold">
          Artistas Recente
        </span>
        <span className="text-subdued text-10-bold cursor-pointer">
          Mostrar tudo
        </span >

      </div>
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