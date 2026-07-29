import { useState } from "react"
import { useMenuContext } from "@/context/useMenuContext"
import { usePlayer } from "@/context/PlayerContext"
import { coverUrl } from "@/utils/coverUrl"
import { getPlaylistById, getAlbumMusics, getArtistPopularMusics } from "@/api"
import type { MusicDTO } from "@/types/index.types"

import EmptyPlaylistCover from "@/assets/empty-playlist-cover.png"
import ArtistCover from "@/assets/artist-cover.png"
import AlbumCover from "@/assets/album-cover.png"
import PinIcon from "@/assets/icons/pin-icon.svg"
import HeartIcon from "@/assets/icons/heart-icon.png"
import PlayIcon from "@/assets/icons/play-icon.svg"
import PauseIcon from "@/assets/icons/pause-icon.svg"
import SoundIcon from "@/assets/icons/green-volume-icon.svg"

type LibraryItemType = "playlist" | "artist" | "album"

interface LibraryItemProps {
  id: string;
  name: string;
  type: LibraryItemType;
  subtitle?: string;
  isActive: boolean;
  onClick?: () => void;
  playlistType?: string;
  isPublic?: boolean;
  isPinned?: boolean;
  coverUrl?: string;
}

const imageCover: Record<LibraryItemType, string> = {
  playlist: EmptyPlaylistCover,
  artist: ArtistCover,
  album: AlbumCover,
}

const typeLabel: Record<LibraryItemType, string> = {
  playlist: "Playlist",
  artist: "Artista",
  album: "Álbum",
}

export function LibraryItem({ id, name, type, subtitle, isActive, onClick, playlistType, isPublic, isPinned, coverUrl: cover }: LibraryItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [cachedMusics, setCachedMusics] = useState<MusicDTO[] | null>(null)
  const { openMenu } = useMenuContext()
  const { play, pause, currentTrack, isPlaying, playingFrom } = usePlayer()

  const isThisPlaying = Boolean(
    isPlaying && playingFrom && (
      (playingFrom.type === "playlist" && playingFrom.playlistId === id) ||
      (playingFrom.type === "album" && playingFrom.albumId === id) ||
      (playingFrom.type === "artist" && playingFrom.artistId === id)
    )
  )

  const handleContextMenu = (e: React.MouseEvent) => {
    if (type === "playlist") {
      openMenu(e, type, id, undefined, undefined, undefined, undefined, playlistType, isPublic)
    } else {
      openMenu(e, type, id)
    }
  }

  const handleTogglePlay = async (e: React.MouseEvent) => {
    e.stopPropagation()
    let musics = cachedMusics

    if (!musics) {
      if (type === "playlist") {
        const playlist = await getPlaylistById(id)
        musics = playlist.musics
      } else if (type === "album") {
        musics = await getAlbumMusics(id)
      } else if (type === "artist") {
        musics = await getArtistPopularMusics(id)
      }
      if (musics) setCachedMusics(musics)
    }

    if (!musics || musics.length === 0) return

    const isCurrentlyPlaying = Boolean(
      currentTrack && musics.some(m => m.id === currentTrack.id) && isPlaying
    )

    if (isCurrentlyPlaying) {
      pause()
    } else {
      const playingFrom = type === "playlist"
        ? { type: "playlist" as const, playlistId: id, playlistName: name }
        : type === "album"
          ? { type: "album" as const, albumId: id, albumName: name }
          : type === "artist"
            ? { type: "artist" as const, artistId: id, artistName: name }
            : undefined
      play(musics[0], musics, playingFrom)
    }
  }

  return (
    <div
      onClick={onClick}
      onContextMenu={handleContextMenu}
      className={`flex items-center  gap-2 cursor-pointer rounded-sm transition ease-out duration-150 ${isActive ? "bg-bg-divider ring-4 ring-bg-divider" : "hover:bg-bg-elements hover:ring-4 ring-bg-elements "}`}
    >
      <div
        className="relative w-9 h-9 shrink-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {type === "playlist" && playlistType === "liked_songs" ? (
          <div className="flex items-center justify-center rounded-xs bg-liked-songs-gradient w-full h-full">
            <img
              src={HeartIcon}
              className="w-4 h-4 brightness-0 invert"
            />
          </div>
        ) : (
          <img
            src={coverUrl(cover) ?? imageCover[type]}
            className={`${type === "artist" ? "rounded-full" : "rounded-xs"} w-full h-full object-cover`}
          />
        )}
        {isHovered && (
          <button
            onClick={handleTogglePlay}
            className={`absolute inset-0 flex items-center justify-center bg-black/45 ${type === "artist" ? "rounded-full" : "rounded-xs"} cursor-pointer`}
          >
            <img
              src={isThisPlaying ? PauseIcon : PlayIcon}
              className="w-4 h-4"
            />
          </button>
        )}
      </div>

      <div className="flex flex-1 min-w-0 items-center justify-between">
        <div className="hidden md:flex md:flex-col md:gap-1 md:min-w-0">
          <div className="flex items-center gap-1 min-w-0">
            <span className={`${isThisPlaying ? "text-primary" : "text-white"} text-10-bold truncate`}>
              {name}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {isPinned && (
              <img src={PinIcon} className="w-2.5 h-2.5 shrink-0 " />
            )}
            <span className="text-10-medium text-subdued font-normal truncate">
              {subtitle ?? typeLabel[type]}
            </span>
          </div>
        </div>
            <div>
            {isThisPlaying && (
              <img 
                src={SoundIcon} 
                className="w-3 h-3 shrink-0"
              />
            )}
          </div>
      </div>
    </div>
  )
}