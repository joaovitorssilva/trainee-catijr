import { useState } from "react"
import { cn } from "@/utils/utils"
import { type RecentSearch } from "@/types/index.types"
import XIcon from "@/assets/icons/x.svg"
import CoverFallback from "@/assets/playlist-cover.png"

interface RecentSearchRowProps {
  item: RecentSearch
  onRemove: (id: string) => void
  onSelect: (name: string) => void
}

export default function RecentSearchRow({ item, onRemove, onSelect }: RecentSearchRowProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onSelect(item.name)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "flex items-center gap-3 px-4 py-2 cursor-pointer rounded-sm transition-colors",
        hovered ? "bg-bg-recent-search" : "bg-transparent"
      )}
    >
      <img
        src={CoverFallback}
        alt={item.name}
        className={cn(
          "w-9 h-9 object-cover shrink-0",
          item.type === "artist" ? "rounded-full" : "rounded-xs"
        )}
      />
      <div className="flex flex-col gap-1 flex-1 overflow-hidden">
        <span className="text-white text-10-bold truncate">{item.name}</span>
        <span className="text-subdued text-10-regular truncate">{item.subtitle}</span>
      </div>
      {hovered && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(item.id) }}
          className="w-2.5 h-2.5 shrink-0 cursor-pointer"
        >
          <img src={XIcon} />
        </button>
      )}
    </div>
  )
}

