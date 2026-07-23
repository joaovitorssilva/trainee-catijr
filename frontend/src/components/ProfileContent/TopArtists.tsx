import { useEffect, useState } from "react"
import type { ArtistDTO } from "@/types/index.types";
import { getMostPlayedArtists } from "@/api";
import ArtistCard from "../MainContent/ArtistSection/ArtistCard";
import { useNavigate } from "react-router-dom";
import Carousel from "../ui/Carousel";
import SectionHeader from "../ui/SectionHeader";

export default function TopArtists() {
  const navigate = useNavigate()
  const [artists, setArtists] = useState<ArtistDTO[]>([])

  useEffect(() => {
    getMostPlayedArtists().then(setArtists)
  }, [])

  return (
    <div className="flex flex-col gap-1 ">
      <SectionHeader title="Artistas mais tocados este mês" showAllLabel="Mostrar mais" />
      <span className="text-subdued text-10-medium">
        Visíveis apenas para você
      </span>
      <Carousel>
        {artists.map((a) => (
          <ArtistCard
            key={a.id}
            id={a.id}
            name={a.name}
            onClick={() => navigate(`/artist/${a.id}`)}
          />
        ))}
      </Carousel>
    </div>
  )

}