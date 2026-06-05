import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPlaylists } from "@/services/api";
import type { PlaylistNoMusicDTO } from "@/services/types";
import PlaylistCard from "./PlaylistCard";

export default function PlaylistSection() {
  const navigate = useNavigate()
  const [playlists, setPlaylists] = useState<PlaylistNoMusicDTO[]>([])

  useEffect(() => {
    getUserPlaylists()
      .then(setPlaylists)
  }, [])

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-base font-bold text-white">
        Suas Playlists
      </span>
      <section className="flex gap-3">
        {playlists.map((p) => (
          <PlaylistCard 
            key={p.id}
            id={p.id}
            name={p.name}
            onClick={() => navigate(`/playlist/${p.id}`)} />
        ))}
      </section>

    </div>
  )
}