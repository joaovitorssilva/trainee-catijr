import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { MusicDTO } from "@/types/index.types"
import TrackTableRow from "./TrackTableRow"

interface SortableTrackRowProps {
  id: string
  music: MusicDTO
  index: number
  musics: MusicDTO[]
  albumId: string
  playlistId?: string
}

export default function SortableTrackRow({ id, music, index, musics, albumId, playlistId }: SortableTrackRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TrackTableRow
        id={id}
        music={music}
        index={index}
        musics={musics}
        albumId={albumId}
        playlistId={playlistId}
        isDragging={isDragging}
      />
    </div>
  )
}
