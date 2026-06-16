import { useEffect, useState } from "react"
import type { ArtistDTO } from "@/services/types";
import { getMostPlayedArtists } from "@/services/api";
import ArtistCard from "../MainContent/ArtistSection/ArtistCard";
import { useNavigate } from "react-router-dom";

export default function TopArtists() {
  const navigate = useNavigate()
  const [artists, setArtists] = useState<ArtistDTO[]>([])

  useEffect(() => {
    getMostPlayedArtists().then(setArtists)
  }, [])

  return (
    <div className="flex flex-col gap-1 ">
      <span className="text-white text-12-bold md:text-16-bold">
        Artistas mais tocados este mês
      </span>
      <span className="text-subdued text-10-medium">
        Visíveis apenas para você
      </span>
      <section className="flex gap-3 overflow-x-auto overflow-y-clip">
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