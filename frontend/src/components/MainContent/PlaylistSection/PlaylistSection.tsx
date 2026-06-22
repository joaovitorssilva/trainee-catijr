import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPlaylists } from "@/services/api";
import type { PlaylistNoMusicDTO } from "@/services/types";
import PlaylistCard from "./PlaylistCard";

interface PlaylistSectionProps {
  title: string
  activeFilter?: string | null
  showAll?: boolean
  visibleCount?: number
}

export default function PlaylistSection({ title, activeFilter, showAll, visibleCount = 3 }: PlaylistSectionProps) {
  const navigate = useNavigate()
  const [playlists, setPlaylists] = useState<PlaylistNoMusicDTO[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    getUserPlaylists().then(setPlaylists)
  }, [])

  if (activeFilter && activeFilter !== "Tudo" && activeFilter !== "Playlists") return null

  const displayedPlaylists = showAll && !isExpanded
    ? playlists.slice(0, visibleCount)
    : playlists

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-white text-16-bold">
          {title}
        </span>
        {showAll && playlists.length > visibleCount && (
          <span
            className="text-subdued text-10-bold hover:text-white trantision-colors duration-150 cursor-pointer"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? "Mostrar Menos" : "Mostrar Tudo"}
          </span>
        )} 
      </div>

      <section className={showAll && isExpanded ? "grid grid-cols-3 md:grid-cols-5 gap-3" : "flex gap-3 overflow-hidden"}>
        {displayedPlaylists.map((p) => (
          <PlaylistCard
            key={p.id}
            id={p.id}
            name={p.name}
            musicQtd={p.musicQtd}
            onClick={() => navigate(`/playlist/${p.id}`)} />
        ))}
      </section>
    </div>
  )
}