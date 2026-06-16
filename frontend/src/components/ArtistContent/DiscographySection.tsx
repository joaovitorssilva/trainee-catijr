import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getArtistAlbums } from "@/services/api"
import type { AlbumDTO } from "@/services/types"
import AlbumCard from "../MainContent/AlbumSection/AlbumCard"


export default function DiscographySection() {
  const { artistId } = useParams<{ artistId: string }>()
  const [albums, setAlbums] = useState<AlbumDTO[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!artistId) return
    getArtistAlbums(artistId)
      .then(setAlbums)
  }, [artistId])

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-white font-bold">
        Discografia
      </span>

      <section className="flex gap-4 overflow-x-auto overflow-y-clip">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            title={album.title}
            year={album.year}
            onClick={() => navigate(`/album/${album.id}`)}
          />
        ))}
      </section>


    </div>
  )
}