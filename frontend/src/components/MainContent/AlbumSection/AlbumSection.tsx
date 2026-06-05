import { useEffect, useState } from "react";
import { getRecentAlbums } from "@/services/api";
import type { AlbumNoMusicsDTO } from "@/services/types";
import AlbumCard from "./AlbumCard";
import { useNavigate } from "react-router-dom";

export default function AlbumSection() {
  const [albums, setAlbums] = useState<AlbumNoMusicsDTO[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getRecentAlbums()
      .then(setAlbums)
  }, [])

  return (

    <div className="flex flex-col gap-2.5">
      <span className="text-base font-bold text-white">
        Álbuns Recentes
      </span>
      <section className="flex gap-4">
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