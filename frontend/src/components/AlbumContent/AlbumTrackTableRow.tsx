import { useState } from "react";
import { usePlayer } from "@/context/PlayerContext";
import { formatDuration } from "@/utils/FormatDuration";
import { useMenuContext } from "@/context/useMenuContext";
import { toggleMusicLike } from "@/api";
import type { MusicDTO } from "@/types/index.types";

import TrackCover2 from "@/assets/track-cover2.png"
import PauseIcon from "@/assets/icons/pause-icon.svg"
import PlayIcon from "@/assets/icons/play-icon.svg"
import SavedIcon from "@/assets/icons/verified-icon.svg"
import AddSubduedIcon from "@/assets/icons/add-subdued-icon.svg"
import AddFillIcon from "@/assets/icons/add-fill-icon.svg"
import OptionsButton from "@/components/ui/OptionsButton"

interface AlbumTrackTableRowProps {
  id: string
  music: MusicDTO
  index: number
  musics: MusicDTO[]
  albumId: string
}

export default function AlbumTrackTableRow({ id, music, index, musics }: AlbumTrackTableRowProps) {
  const [isHovered, setIsHovered] = useState(false)
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

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlay}
      className="grid items-center grid-cols-[16px_1fr_16px] md:grid-cols-[16px_400px_1fr_auto_80px] gap-4 px-4 py-2 cursor-pointer">

      {/* track index + play/pause icon */}
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

      {/* track info - image + title + subtitle */}
      <div className="flex gap-2 items-center">
        <img src={TrackCover2} className="w-9 h-9 rounded-xs" />

        <div className="flex flex-col gap-1">
          <span className={`text-10-medium font-bold ${isThisTrack ? "text-primary" : "text-white"}`}>
            {music.title}
          </span>
          <span className="text-subdued text-10-medium font-bold">
            {music.artistName ?? "Artist"}
          </span>
        </div>
      </div>

      {/* release date */}
      <span className="hidden md:block text-subdued text-10-medium font-bold">
        {new Date(music.releaseDate).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" })}
      </span>

      {/* like button */}
      <button
        onClick={(e) => { e.stopPropagation(); handleToggleLike() }}
        className=" cursor-pointer outline-none"
      >
        {isLiked ?
          <img src={SavedIcon} /> :
          (isHovered ?
            <img src={AddFillIcon} /> :
            <img src={AddSubduedIcon} />
          )}
      </button>

      <div className="flex gap-2 items-center">
        {/* song duration */}
        <span className="hidden md:block text-subdued text-10-medium">
          {formatDuration(music.duration)}
        </span>

        {/* options button */}
        <div className="hidden md:block">
          <OptionsButton
          onClick={(e) => openMenu(e, "album", id, music.artistId ?? undefined, music.albumId ?? undefined, music.liked)}
        />
        </div>
      </div>
    </div>
  )
}
