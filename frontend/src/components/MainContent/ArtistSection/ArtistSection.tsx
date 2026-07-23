import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecentArtists } from "@/api";
import type { ArtistDTO } from "@/types/index.types";
import ArtistCard from "./ArtistCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Carousel from "@/components/ui/Carousel";

interface ArtistSectionProps {
  activeFilter: string
}

export default function ArtistSection({ activeFilter }: ArtistSectionProps) {
  const navigate = useNavigate()
  const [artists, setArtists] = useState<ArtistDTO[]>([])

  useEffect(() => {
    getRecentArtists().then(setArtists)
  }, [])

  if (activeFilter !== "Tudo") return null

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader title="Artistas Recente" />
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