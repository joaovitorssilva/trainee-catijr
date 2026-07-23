import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPlaylists } from "@/api";
import type { PlaylistNoMusicDTO } from "@/types/index.types";
import PlaylistCard from "./PlaylistCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Carousel from "@/components/ui/Carousel";

interface PlaylistSectionProps {
  activeFilter?: string
}

export default function PlaylistSection({ activeFilter }: PlaylistSectionProps) {
  const navigate = useNavigate()
  const [playlists, setPlaylists] = useState<PlaylistNoMusicDTO[]>([])

  useEffect(() => {
    getUserPlaylists().then(setPlaylists)
  }, [])

  if (activeFilter && activeFilter !== "Tudo" && activeFilter !== "Playlists") return null

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader title="Suas Playlists" />
      <Carousel>
        {playlists.map((p) => (
          <PlaylistCard
            key={p.id}
            id={p.id}
            name={p.name}
            musicQtd={p.musicQtd}
            type={p.type}
            onClick={() => navigate(`/playlist/${p.id}`)} />
        ))}
      </Carousel>
    </div>
  )
}