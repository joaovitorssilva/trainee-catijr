import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAlbumById, getArtistById } from "@/api"
import { usePlayer } from "@/context/PlayerContext"
import type { AlbumDTO } from "@/types/index.types"
import AlbumHeader from "@/components/AlbumContent/AlbumHeader"
import PlayButton from "@/components/ui/PlayButton"
import AlbumTracksTable from "@/components/AlbumContent/AlbumTracksTable"

export default function AlbumPage() {
  const { albumId } = useParams<{ albumId: string }>()
  const [album, setAlbum] = useState<AlbumDTO | null>(null)
  const [artistCover, setArtistCover] = useState<string | null>(null)
  const { currentTrack, isPlaying, play, pause } = usePlayer()

  useEffect(() => {
    if (!albumId) return
    getAlbumById(albumId).then((data) => {
      setAlbum(data)
      if (data.artistId) {
        getArtistById(data.artistId).then((artist) => {
          setArtistCover(artist.coverUrl)
        })
      }
    })
  }, [albumId])

  if (!album) return <p className="text-subdued p-8">carregando...</p>

  const totalDuration = album.musics.reduce((acc, m) => acc + m.duration, 0)

  const isThisPlaying = Boolean(
    currentTrack && album.musics.some(m => m.id === currentTrack.id) && isPlaying
  )

  const handleTogglePlay = () => {
    if (isThisPlaying) {
      pause()
    } else if (album.musics.length > 0) {
      play(album.musics[0], album.musics, { type: "album", albumId: album.id, albumName: album.title })
    }
  }

  return (
    <div className="flex flex-col bg-bg-base rounded-lg gap-8">
      <AlbumHeader
        name={album.title}
        musicQtd={album.musics.length}
        duration={totalDuration}
        coverUrl={album.coverUrl ?? undefined}
        artistName={album.artistName}
        artistCoverUrl={artistCover ?? undefined}
      />
      <div className="px-5">
        <PlayButton
          isPlaying={isThisPlaying}
          onToggle={handleTogglePlay}
        />
      </div>
      <AlbumTracksTable />
    </div>
  )
}
