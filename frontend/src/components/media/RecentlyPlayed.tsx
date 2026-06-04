// import { useEffect, useState } from "react"

// import { getRecentMusics } from "../../services/api"
import RecentlyPlayedCard from "./RecentlyPlayedCard"
// import type { MusicDTO } from "../../services/types"

export default function RecentlyPlayed() {
  // const [musics, setMusics] = useState<MusicDTO[]>([])
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   getRecentMusics()
  //     .then(setMusics)
  //     .finally(() => setLoading(false))
  // }, [])

  // if (loading) return <p className="text-subdued">carregando...</p>

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2">
      <RecentlyPlayedCard title="follow the beat (or die trying)" />
      <RecentlyPlayedCard title="follow the beat (or die trying)" />
      <RecentlyPlayedCard title="follow the beat (or die trying)" />
      <RecentlyPlayedCard title="follow the beat (or die trying)" />
      <RecentlyPlayedCard title="follow the beat (or die trying)" />
      <RecentlyPlayedCard title="follow the beat (or die trying)" />        
      <RecentlyPlayedCard title="follow the beat (or die trying)" />
      <RecentlyPlayedCard title="follow the beat (or die trying)" />
    </div>
  )
}