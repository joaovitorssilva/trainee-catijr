import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPlaylistById, reorderPlaylist } from "@/api";
import { useMenuContext } from "@/context/useMenuContext";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import type { PlaylistDTO, MusicDTO } from "@/types/index.types";
import type { DragEndEvent } from "@dnd-kit/core";

import ClockIcon from "@/assets/icons/clock-icon.svg"
import SortableTrackRow from "./SortableTrackRow"

export default function TracksTable() {
  const { playlistId } = useParams()
  const { refreshKey } = useMenuContext()
  const [playlist, setPlaylist] = useState<PlaylistDTO | null>(null)
  const [tracks, setTracks] = useState<MusicDTO[]>([])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  )

  useEffect(() => {
    if (!playlistId) return
    getPlaylistById(playlistId)
      .then((p) => {
        setPlaylist(p)
        setTracks(p.musics)
      })
  }, [playlistId, refreshKey])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id || !playlistId) return

    setTracks((prev) => {
      const oldIndex = prev.findIndex((m) => m.id === active.id)
      const newIndex = prev.findIndex((m) => m.id === over.id)
      if (oldIndex === -1 || newIndex === -1) return prev
      const reordered = arrayMove(prev, oldIndex, newIndex)

      reorderPlaylist(playlistId, reordered.map((m) => m.id)).catch(() => {
        setTracks(playlist?.musics ?? prev)
      })

      return reordered
    })
  }, [playlistId, playlist])


  if (!playlist) return null

  return (
    <div>
      <div className="grid items-center grid-cols-[16px_1fr] md:grid-cols-[16px_400px_1fr_1fr_80px] gap-4 px-4 py-2 border-b border-white/10 mb-2">
        <span className="text-subdued text-10-medium">#</span>
        <span className="text-subdued text-10-medium">
          Título
        </span>
        <span className="hidden md:block text-subdued text-10-medium">
          Álbum
        </span>
        <span className="hidden md:block text-subdued text-10-medium">
          Adicionada em
        </span>
        <img src={ClockIcon} className="hidden md:block" />
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
        <SortableContext items={tracks.map((m) => m.id)} strategy={verticalListSortingStrategy}>
          {tracks.map((music, index) => (
            <SortableTrackRow
              key={music.id}
              id={music.id}
              music={music}
              index={index}
              musics={tracks}
              albumId={music.albumId}
              playlistId={playlistId}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}