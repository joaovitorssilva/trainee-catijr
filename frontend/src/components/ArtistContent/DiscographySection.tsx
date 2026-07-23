import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getArtistAlbums } from "@/api"
import type { AlbumDTO } from "@/types/index.types"
import AlbumCard from "../MainContent/AlbumSection/AlbumCard"
import Carousel from "../ui/Carousel"


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

      <Carousel>
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            id={album.id}
            title={album.title}
            year={album.year}
            onClick={() => navigate(`/album/${album.id}`)}
          />
        ))}
      </Carousel>
    </div>
  )
}