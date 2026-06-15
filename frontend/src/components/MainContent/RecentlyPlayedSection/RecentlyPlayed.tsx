import { useEffect, useState } from "react"
import { getRecentMusics } from "@/services/api"
import type { MusicDTO } from "@/services/types"
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
    <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-1 md:gap-2">
      {musics.map((m) => (
        <RecentlyPlayedCard
          key={m.id}
          title={m.title} />
      ))}
    </div>
  )
}