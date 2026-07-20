import { useEffect, useState } from "react"
import { getRecentMusics } from "@/api"
import type { MusicDTO } from "@/types/index.types"
import RecentlyPlayedCard from "./RecentlyPlayedCard"

interface RecentlyPlayedProps {
  activeFilter: string
}

export default function RecentlyPlayed({ activeFilter }: RecentlyPlayedProps) {
  const [musics, setMusics] = useState<MusicDTO[]>([])

  useEffect(() => {
    getRecentMusics().then(setMusics)
  }, [])

  if (activeFilter !== "Tudo" && activeFilter !== "Música") return null

  return (
    <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-4 md:grid-rows-2 gap-1 md:gap-2">
      {musics.map((m) => (
        <RecentlyPlayedCard
          key={m.id}
          music={m}
          musics={musics}
        />
      ))}
    </div>
  )
}