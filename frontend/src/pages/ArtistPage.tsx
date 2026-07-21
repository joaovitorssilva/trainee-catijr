import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { usePlayer } from "@/context/PlayerContext"
import { getArtistPopularMusics } from "@/api"
import type { MusicDTO } from "@/types/index.types"
import PopularTracks from "@/components/ArtistContent/PopularTrack"
import DiscographySection from "@/components/ArtistContent/DiscographySection"
import PlayButton from "@/components/ui/PlayButton"
import FollowButton from "@/components/ui/FollowButton"
import ArtistHeader from "@/components/ArtistContent/ArtistHeader"

export default function ArtistPage() {
  const { artistId } = useParams<{ artistId: string }>()
  const [isFollowing, setIsFollowing] = useState(false)
  const [popularTracks, setPopularTracks] = useState<MusicDTO[]>([])
  const { currentTrack, isPlaying, play, pause } = usePlayer()

  useEffect(() => {
    if (!artistId) return
    getArtistPopularMusics(artistId).then(setPopularTracks)
  }, [artistId])

  const handleFollowingArtist = (following: boolean) => {
    setIsFollowing(following)
  }

  const isThisPlaying = Boolean(
    currentTrack && popularTracks.some(t => t.id === currentTrack.id) && isPlaying
  )

  const handleTogglePlay = () => {
    if (isThisPlaying) {
      pause()
    } else if (popularTracks.length > 0) {
      play(popularTracks[0], popularTracks, { type: "search" })
    }
  }

  return (
    <div className="flex flex-col gap-2.5 bg-home-bg-gradient-variant pb-10 rounded-lg p">
      <ArtistHeader />

      <div className="flex items-center gap-2.5 px-4 ">
        <PlayButton
          onToggle={handleTogglePlay}
          isPlaying={isThisPlaying}
        />
        <FollowButton
          isFollowing={isFollowing}
          onToggle={(following) => handleFollowingArtist(following)}
        />
      </div>

      <div className="flex flex-col gap-6 px-4">
        <PopularTracks />
        <DiscographySection />
      </div>
    </div>
  )
}
