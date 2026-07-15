import { useEffect, useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import { formatDuration } from "@/utils/FormatDuration";
import { useMenuContext } from "@/context/useMenuContext";
import { getAlbumById, toggleMusicLike } from "@/services/api";
import type { MusicDTO } from "@/services/types";
import TrackCover3 from "@/assets/track-cover3.png"
import PauseIcon from "@/assets/icons/pause-icon.svg"
import PlayIcon from "@/assets/icons/play-icon.svg"
import OptionsIcon from "@/assets/icons/options-icon.svg"
import SavedIcon from "@/assets/icons/verified-icon.svg"
import AddSubduedIcon from "@/assets/icons/add-subdued-icon.svg"
import AddFillIcon from "@/assets/icons/add-fill-icon.svg"

interface TrackTableRowProps {
  id: string
  music: MusicDTO
  index: number
  musics: MusicDTO[]
  albumId: string
  playlistId?: string
}

export default function TrackTableRow({ id, music, index, musics, albumId, playlistId }: TrackTableRowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [albumName, setAlbumName] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(music.liked ?? false)
  const { play, pause, currentTrack, isPlaying } = usePlayer()
  const { openMenu } = useMenuContext()

  const isThisTrack = currentTrack?.id === music.id
  const isThisPlaying = isThisTrack && isPlaying

  const handlePlay = () => {
    if (isThisPlaying) {
      pause()
      return
    }
    play(music, musics)
  }

  const handleToggleLike = () => {
    toggleMusicLike(id).then(() => {
      setIsLiked(prev => !prev)
    })
  }

  useEffect(() => {
    if (!albumId) return
    getAlbumById(albumId)
      .then(album => setAlbumName(album.title))
  }, [albumId])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlay}
      className="grid items-center grid-cols-[16px_400px_1fr_1fr_auto_80px] gap-4 px-4 py-2 cursor-pointer">
      <div className="flex items-center justify-center w-4">
        {isHovered ? (
          isThisPlaying ? (
            <img src={PauseIcon} />
          ) : (
            <span className="text-white text-sm">
              <img src={PlayIcon} />
            </span>
          )
        ) : (
          <span className="text-sm text-subdued tabular-nums">
            {index + 1}
          </span>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <img src={TrackCover3} className="w-9 h-9 rounded-xs" />

        <div className="flex flex-col gap-1">
          <span className={`text-10-medium font-bold ${isThisTrack ? "text-primary" : "text-white"}`}>
            {music.title}
          </span>
          <span className="text-subdued text-10-medium font-bold">
            {music.artistName ?? "Artist"}
          </span>
        </div>
      </div>

      <span className="text-subdued text-10-medium font-bold">
        {albumName ?? "—"}
      </span>

      <span className="text-subdued text-10-medium font-bold">
        {new Date(music.releaseDate).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}
      </span>

      {/* like button */}
      <div>
        <button
          onClick={(e) => { e.stopPropagation(); handleToggleLike() }}
          className="cursor-pointer"
        >
          {isLiked ?
            <img src={SavedIcon} /> :
            (isHovered ?
              <img src={AddFillIcon} /> :
              <img src={AddSubduedIcon} />
            )}
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <span className="text-subdued text-10-medium">
          {formatDuration(music.duration)}
        </span>

        {/* options button */}
        <button
          onClick={(e) => openMenu(e, "track", id, music.artistId ?? undefined, music.albumId ?? undefined, music.liked, playlistId)}
          className="p-1 rounded-sm hover:bg-bg-elements cursor-pointer outline-none"
        >
          <img src={OptionsIcon} />
        </button>
      </div>
    </div>
  )
}
