import { useEffect, useState } from "react"
import { getRecentMusics } from "@/services/api"
import type { MusicDTO } from "@/services/types"
import RecentlyPlayedCard from "./RecentlyPlayedCard"

export default function RecentlyPlayed() {
  const [musics, setMusics] = useState<MusicDTO[]>([])

  useEffect(() => {
    getRecentMusics()
      .then(setMusics)
  }, [])

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2">
      {musics.map((m) => (
        <RecentlyPlayedCard
          key={m.id}
          title={m.title} />
      ))}
    </div>
  )
}