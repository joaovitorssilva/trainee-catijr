import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbumById } from "@/api";
import type { AlbumDTO } from "@/types/index.types";
import AlbumTrackTableRow from "./AlbumTrackTableRow";
import ClockIcon from "@/assets/icons/clock-icon.svg"

export default function AlbumTracksTable() {
  const { albumId } = useParams()
  const [album, setAlbum] = useState<AlbumDTO | null>(null)

  useEffect(() => {
    if (!albumId) return
    getAlbumById(albumId).then(setAlbum)
  }, [albumId])

  if (!album || !albumId) return null

  return (
    <div>
      <div className="grid items-center grid-cols-[16px_1fr] md:grid-cols-[16px_400px_1fr_auto_80px] gap-4 px-4 py-2 border-b border-white/10 mb-2">
        <span className="text-subdued text-10-medium">#</span>
        <span className="text-subdued text-10-medium">
          Título
        </span>
        <span className="hidden md:block text-subdued text-10-medium">
          Adicionada em
        </span>
        <img src={ClockIcon} className="hidden md:block" />
      </div>

      {album.musics.map((music, index) => (
        <AlbumTrackTableRow
          key={music.id}
          id={music.id}
          music={music}
          index={index}
          musics={album.musics}
          albumId={albumId}
        />
      ))}
    </div>
  )
}
