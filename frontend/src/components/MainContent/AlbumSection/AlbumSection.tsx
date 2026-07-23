import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecentAlbums } from "@/api";
import type { AlbumNoMusicsDTO } from "@/types/index.types";
import AlbumCard from "./AlbumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Carousel from "@/components/ui/Carousel";

interface Props {
  activeFilter: string
}

export default function AlbumSection({ activeFilter }: Props) {
  const [albums, setAlbums] = useState<AlbumNoMusicsDTO[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getRecentAlbums()
      .then(setAlbums)
  }, [])

  if (activeFilter !== "Tudo") return null

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader title="Álbuns Recentes" />
      <Carousel>
        {albums.map((a) => (
          <AlbumCard
            key={a.id}
            id={a.id}
            title={a.title}
            year={a.year}
            onClick={() => navigate(`/album/${a.id}`)}
          />
        ))}
      </Carousel>
    </div>
  )
}