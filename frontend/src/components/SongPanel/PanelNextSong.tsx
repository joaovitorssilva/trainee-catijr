import { useState } from "react"
import { usePlayer } from "@/context/PlayerContext"
import { useMenuContext } from "@/context/useMenuContext"
import TrackCover from "@/assets/track-cover1.png"
import OptionsButton from "@/components/ui/OptionsButton"

export default function PanelNextSong() {
  const [isHovered, setIsHovered] = useState(false)
  const { queue, queueIndex, play } = usePlayer()
  const { openMenu } = useMenuContext()

  const nextTrack = queue[queueIndex + 1]

  if (!nextTrack) return null

  return (
    <div className="w-full flex flex-col gap-3 p-1 rounded-lg bg-bg-highlight">
      <span className="text-white text-12-bold pl-2 pt-2">
        A seguir
      </span>

      {/* next track info - image + title + artist name */}
      <div
        onClick={() => play(nextTrack, queue)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center gap-3 hover:bg-textbox-bg rounded-lg border-8 border-transparent hover:border-textbox-bg cursor-pointer"
      >
        <img
          src={TrackCover}
          alt="Track Cover Image"
          className="w-10.5 h-10.5 rounded-sm object-fit"
        />

        <div className="flex flex-col gap-1">
          <span className="text-white text-11-semibold truncate">
            {nextTrack.title}
          </span>
          <button
            className="text-subdued text-10-medium cursor-pointer text-left truncate disabled:cursor-default"
            disabled={!nextTrack.artistId}
          >
            {nextTrack.artistName || "Nome do Artista"}
          </button>
        </div>

        {/* options button - rendered on component hover*/}
        {isHovered && (
          <OptionsButton onClick={(e) => openMenu(e, "track", nextTrack.id, nextTrack.artistId ?? undefined, nextTrack.albumId, nextTrack.liked)} />
        )}
      </div>
    </div>
  )
}
