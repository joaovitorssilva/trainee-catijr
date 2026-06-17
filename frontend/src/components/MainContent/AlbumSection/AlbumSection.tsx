import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecentAlbums } from "@/services/api";
import type { AlbumNoMusicsDTO } from "@/services/types";
import AlbumCard from "./AlbumCard";

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
      <span className="text-white text-16-bold">
        Álbuns Recentes
      </span>
      <section className="flex gap-3 overflow-hidden">
        {albums.map((a) => (
          <AlbumCard
            key={a.id}
            title={a.title}
            year={a.year}
            onClick={() => navigate(`/album/${a.id}`)}
          />
        ))}
      </section>
    </div>
  )
}