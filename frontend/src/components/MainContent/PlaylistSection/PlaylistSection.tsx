import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPlaylists } from "@/services/api";
import type { PlaylistNoMusicDTO } from "@/services/types";
import PlaylistCard from "./PlaylistCard";

interface PlaylistSectionProps {
  activeFilter: string
}

export default function PlaylistSection({ activeFilter }: PlaylistSectionProps) {
  const navigate = useNavigate()
  const [playlists, setPlaylists] = useState<PlaylistNoMusicDTO[]>([])

  useEffect(() => {
    getUserPlaylists().then(setPlaylists)
  }, [])

  if (activeFilter !== "Tudo" && activeFilter !== "Playlists") return null

  return (
    <div className="flex flex-col gap-3">
      <span className="text-white text-16-bold">
        Suas Playlists
      </span>
      <section className="flex gap-3 overflow-hidden">
        {playlists.map((p) => (
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