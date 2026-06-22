import { useEffect, useState } from "react"
import type { ArtistDTO } from "@/services/types";
import { getMostPlayedArtists } from "@/services/api";
import ArtistCard from "../MainContent/ArtistSection/ArtistCard";
import { useNavigate } from "react-router-dom";

interface TopArtistsProps {
  showAll?: boolean
  visibleCount?: number
}

export default function TopArtists({ showAll, visibleCount = 4 }: TopArtistsProps) {
  const navigate = useNavigate()
  const [artists, setArtists] = useState<ArtistDTO[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    getMostPlayedArtists().then(setArtists)
  }, [])

  const displayedArtists = showAll && !isExpanded
    ? artists.slice(0, visibleCount)
    : artists

  return (
    <div className="flex flex-col gap-1 ">

      <div className="flex items-center justify-between">
        <span className="text-white text-12-bold md:text-16-bold">
          Artistas mais tocados este mês
        </span>
        {showAll && artists.length > visibleCount && (
          <span
            className="text-subdued text-10-bold hover:text-white trantision-colors duration-150 cursor-pointer"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "Mostrar Menos" : "Mostrar Tudo"}
          </span>
        )}

      </div>
      <span className="text-subdued text-10-medium">
        Visíveis apenas para você
      </span>
      <section className={showAll && isExpanded ? "grid grid-cols-3 md:grid-cols-5 gap-3" : "flex gap-3 overflow-hidden"}>
        {displayedArtists.map((a) => (
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